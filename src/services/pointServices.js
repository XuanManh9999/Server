import _ from "lodash";
import { pool as connection } from "../config/db.js";

const importPoint = ({
  Course,
  Teacher,
  Faculty,
  TotalHours,
  NumberOfCredits,
  FinalExamDate,
  DataStudents,
  DataPoint,
  Class,
}) =>
  new Promise(async (resolve, reject) => {
    let connect;
    let idClass;
    let idTeacher;
    let idFaculty;
    let idCourse;
    try {
      connect = await connection.getConnection();
      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();

      // check khoa
      const [dataFaculty] = await connect.execute(
        "select DISTINCT ID from faculty where FacultyName = ?",
        [Faculty]
      );
      idFaculty = dataFaculty.length > 0 ? dataFaculty[0].ID : null; // Update index here
      if (idFaculty === null) {
        // them khoa
        const [result] = await connect.execute(
          "insert into faculty (FacultyName) values (?)",
          [Faculty]
        );
        idFaculty = result.insertId;
      }
      {
      }
      // check class
      const [dataClass] = await connect.execute(
        "select ID from class where NameClass = ?",
        [Class]
      );

      idClass = dataClass.length > 0 ? dataClass[0].ID : null; // Update index here
      if (idClass === null) {
        // creat Class
        const [result] = await connect.execute(
          "insert into class (NameClass, IDFaculty) values (?, ?)",
          [Class, idFaculty]
        );
        idClass = result.insertId;
      }

      // check user
      const [dataUsers] = await connect.execute(
        "select DISTINCT user.ID from user INNER JOIN userinrole on user.ID = userinrole.UserID INNER JOIN role on userinrole.RoleID = role.ID and role.ID = 2 and user.FullName = ?",
        [Teacher]
      );
      idTeacher = dataUsers.length > 0 ? dataUsers[0].ID : null; // Update index here
      if (idTeacher === null) {
        const [result] = await connect.execute(
          "INSERT INTO user (FullName, IDClass)  VALUES (?, ?)",
          [Teacher, idClass]
        );
        idTeacher = result.insertId;
        await connect.execute(
          "INSERT INTO userinrole (UserID, RoleID) VALUES (?, ?)",
          [idTeacher, 2] // Wrap IDs in an array
        );
      }

      // check course
      const [dataCourse] = await connect.execute(
        "select DISTINCT ID from course where NameCourse = ?",
        [Course]
      );

      idCourse = dataCourse.length > 0 ? dataCourse[0].ID : null; // Update index here
      if (idCourse === null) {
        // thêm course
        const [result] = await connect.execute(
          "insert into course (NameCourse, NumberOfCredits, TotalHours, FinalExamDate) values (?, ?, ?, ?)",
          [Course, NumberOfCredits, TotalHours, FinalExamDate]
        );
        idCourse = result.insertId;
        await connect.execute(
          "insert into user_course (IDUser, IDCourse) values (?, ?)",
          [idTeacher, idCourse]
        );
      } else {
        const [result] = await connect.execute(
          "SELECT DISTINCT IDUser, IDCourse from user_course where user_course.IDUser = ? and user_course.IDCourse = ?",
          [idTeacher, idCourse]
        );
        if (result?.length === 0) {
          await connect.execute(
            "insert into user_course (IDUser, IDCourse) values (?, ?)",
            [+idTeacher, +idCourse]
          );
        }
      }
      // check class_course
      const [dataCourseClass] = await connect.execute(
        "SELECT * from class_course where class_course.IDCourse = ? and class_course.IDClass = ?",
        [idCourse, idClass]
      );
      // create class_course
      if (!dataCourseClass.length > 0) {
        await connect.execute(
          "insert into class_course (IDCourse, IDClass) values (?, ?)",
          [idCourse, idClass]
        );
      }

      if (
        DataStudents?.length > 0 &&
        DataPoint.length > 0 &&
        idCourse &&
        idClass
      ) {
        for (var i = 0; i < DataStudents.length; i++) {
          let idStudent;
          // check user xem đã có student đó chưa?
          const [checkStudent] = await connect.execute(
            "SELECT DISTINCT user.ID, user.FullName from user INNER JOIN userinrole on user.ID = userinrole.UserID INNER JOIN role on role.ID = userinrole.RoleID and role.id = 3 and user.FullName = ? and user.Msv = ?",
            [DataStudents[i]?.FullName, DataStudents[i]?.Msv]
          );

          idStudent = checkStudent.length > 0 ? checkStudent[0].ID : null; // Update index here
          if (idStudent === null) {
            let [result] = await connect.execute(
              "insert into user (Msv, FullName, Gender, IDClass) values (?, ?, ?, ?)",
              [
                DataStudents[i]?.Msv,
                DataStudents[i]?.FullName,
                DataStudents[i]?.Gender,
                idClass,
              ]
            );
            idStudent = result.insertId;
          }
          // Kiểm tra xem người dùng đó có đang ở trong khoa đó hay không?
          const [checkFaculty] = await connect.execute(
            "SELECT * from user_faculty as f where f.IDUser = ? and f.IDFaculty = ?",
            [idStudent, idFaculty]
          );
          if (checkFaculty.length === 0) {
            await connect.execute(
              "INSERT INTO user_faculty (IDUser, IDFaculty) values (?, ?)",
              [idStudent, idFaculty]
            );
          }
          // kiểm tra người dùng đó đã có trong userinrole chưa?
          const [checkUserinRole] = await connect.execute(
            "SELECT * from user INNER JOIN userinrole on user.ID = userinrole.UserID INNER JOIN role on role.ID = userinrole.RoleID and role.ID = 3 and user.ID = ?",
            [idStudent]
          );
          if (checkUserinRole.length === 0) {
            await connect.execute(
              "INSERT INTO userinrole (UserID, RoleID) VALUES (?, ?)",
              [idStudent, 3] // Wrap IDs in an array
            );
          }

          const [checkUserCourse] = await connect.execute(
            "SELECT * from user_course as q where q.IDUser = ? and q.IDCourse = ?",
            [idStudent, idCourse]
          );

          if (checkUserCourse.length === 0) {
            await connect.execute(
              "insert into user_course (IDUser, IDCourse) values (?, ?)",
              [idStudent, idCourse]
            );
          }

          const [checkPoint] = await connect.execute(
            "SELECT * from point where point.IDUser = ? and point.IDCourse = ?",
            [idStudent, idCourse]
          );
          if (checkPoint?.length > 0) {
            console.log(
              "update",
              DataPoint[i]?.Frequent,
              DataPoint[i]?.MidtermScore,
              DataPoint[i]?.FinalExamScore,
              DataPoint[i]?.AverageScore,
              DataPoint[i]?.Scores,
              DataPoint[i]?.LetterGrades,
              DataPoint[i]?.Note,
              idStudent,
              idCourse
            );

            await connect.execute(
              "update point set Frequent = ?, MidtermScore = ?, FinalExamScore = ?, AverageScore = ?, Scores = ?, LetterGrades = ?, Note = ? where IDUser = ? and IDCourse = ?",
              [
                DataPoint[i]?.Frequent,
                DataPoint[i]?.MidtermScore,
                DataPoint[i]?.FinalExamScore,
                DataPoint[i]?.AverageScore,
                DataPoint[i]?.Scores,
                DataPoint[i]?.LetterGrades,
                DataPoint[i]?.Note,
                idStudent,
                idCourse,
              ]
            );
          } else {
            if (DataPoint[i]) {
              await connect.execute(
                "insert into point (Frequent, MidtermScore, FinalExamScore, AverageScore, Scores, LetterGrades, Note, IDUser, IDCourse) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  +DataPoint[i]?.Frequent.toFixed(2),
                  +DataPoint[i]?.MidtermScore.toFixed(2),
                  +DataPoint[i]?.FinalExamScore.toFixed(2),
                  (+DataPoint[i]?.AverageScore).toFixed(2),
                  DataPoint[i]?.Scores,
                  DataPoint[i]?.LetterGrades,
                  DataPoint[i]?.Note,
                  idStudent,
                  idCourse,
                ]
              );
            }
          }
        }
      }

      await connect.commit();

      resolve({
        status: 200,
        message: "Import dữ liệu thành công",
      });
    } catch (err) {
      await connect.rollback();
      reject(err);
    }
  });

const selectClassByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT DISTINCT ID, NameClass from class where IDFaculty = ?",
        [id]
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: "Get data class done",
          data: result,
        });
      } else {
        resolve({
          status: 403,
          message: "Data class is empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const selectCourseByIdClass = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT DISTINCT course.ID, course.NameCourse from class INNER JOIN  class_course on class_course.IDClass = ? INNER JOIN course on course.ID = class_course.IDCourse",
        [id]
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: "Get Data Courses By Id Class Done",
          data: result,
        });
      } else {
        resolve({
          status: 200,
          message: "Get Data Courses By Id Class Is Empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const selectPointClass = ({ IdFaculty, IdClass, IdCourse }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT DISTINCT user.Msv, user.FullName, user.Gender, point.Frequent, point.MidtermScore, point.FinalExamScore, point.AverageScore, point.Scores, point.LetterGrades, point.Note from user INNER JOIN userinrole on userinrole.UserID = user.ID and user.IDClass = ?  INNER JOIN role on role.ID = userinrole.RoleID and role.ID = 3 INNER JOIN user_faculty on user_faculty.IDUser = user.ID INNER JOIN faculty on faculty.ID = ? INNER JOIN user_course on user.ID = user_course.IDUser INNER JOIN course on course.ID = user_course.IDCourse INNER JOIN point on point.IDUser = user.ID and point.IDCourse = ?",
        [IdClass, IdFaculty, IdCourse]
      );

      const [teacherData] = await connection.execute(
        `SELECT user.FullName, class.NameClass, faculty.FacultyName 
        FROM user 
        INNER JOIN userinrole ON user.ID = userinrole.UserID 
        INNER JOIN role ON role.ID = userinrole.RoleID AND role.ID = 3
        INNER JOIN class ON class.ID = user.IDClass and class.ID = ?
        INNER JOIN faculty ON faculty.ID = class.IDFaculty and faculty.id = ?
        INNER JOIN user_course ON user_course.IDUser = user.ID 
        INNER JOIN course ON course.ID = user_course.IDCourse AND course.id = ?;  
      `,
        [IdClass, IdFaculty, IdCourse]
      );

      if (
        result &&
        result.length > 0 &&
        teacherData &&
        teacherData.length > 0
      ) {
        resolve({
          status: 200,
          message: "Get Data Point Student Done",
          dataTeacher: teacherData,
          dataStudents: result,
        });
      } else {
        resolve({
          status: 200,
          message: "Get Data Point Student Done Is Data Empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const HandleSelectPointStudents = (
  Key,
  IDFaculty,
  IDClass,
  IDCourse,
  Semester
) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        `WITH UniquePoints AS (
          SELECT DISTINCT point.IDUser, point.Frequent, point.MidtermScore, 
                          point.FinalExamScore, point.AverageScore, 
                          point.Scores, point.LetterGrades, 
                          point.Note, point.ExcludingTBC, 
                          course.Semester 
          FROM point 
          INNER JOIN course ON point.IDCourse = course.ID
          WHERE course.ID = ? AND course.Semester = ?
      )
      SELECT DISTINCT user.Msv, user.FullName, user.Gender, 
                      up.Frequent, up.MidtermScore, up.FinalExamScore, 
                      up.AverageScore, up.Scores, 
                      up.LetterGrades, up.Note, up.ExcludingTBC, 
                      up.Semester
      FROM user 
      INNER JOIN userinrole ON user.ID = userinrole.UserID 
      INNER JOIN role ON userinrole.RoleID = role.ID AND role.ID = 3 
      INNER JOIN class ON class.ID = user.IDClass AND class.ID = ? 
      INNER JOIN faculty ON faculty.ID = ?
      INNER JOIN studyprogram ON studyprogram.IdFaculty = faculty.ID AND studyprogram.Key = ? 
      INNER JOIN course_studyprogram ON course_studyprogram.IDStudyProgram = studyprogram.ID 
      INNER JOIN course ON course.ID = course_studyprogram.IDCourse AND course.ID = ? AND course.Semester = ?
      INNER JOIN user_course ON user_course.IDCourse = course.ID AND user_course.IDUser = user.ID 
      INNER JOIN UniquePoints up ON up.IDUser = user.ID
       `,
        [IDCourse, Semester, IDClass, IDFaculty, Key, IDCourse, Semester]
      );

      resolve({
        status: result?.length > 0 ? 200 : 204,
        message:
          result?.length > 0 ? "Get Data Point Students Done" : "Data Empty",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });

export {
  importPoint,
  selectClassByID,
  selectCourseByIdClass,
  selectPointClass,
  HandleSelectPointStudents,
};
