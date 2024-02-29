import { pool as connection } from "../config/db.js";

const importPoint = ({
  Course,
  Teacher,
  Faculity,
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
        "select DISTINCT  id from faculty where FacultyName = ?",
        [Faculity]
      );
      idFaculty = dataFaculty.length > 0 ? dataFaculty[0].id : null; // Update index here
      if (!idFaculty) {
        // them khoa
        const [result] = await connect.execute(
          "insert into faculty (FacultyName) values (?)",
          [Faculity]
        );
        idFaculty = result.insertId;
      }
      // check class
      const [dataClass] = await connect.execute(
        "select ID from class where NameClass = ?",
        [Class]
      );

      idClass = dataClass.length > 0 ? dataClass[0].ID : null; // Update index here
      if (!idClass) {
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
      if (!idTeacher) {
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
        "select DISTINCT id from course where NameCourse = ?",
        [Course]
      );
      idCourse = dataCourse.length > 0 ? dataCourse[0].id : null; // Update index here
      if (!idCourse) {
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
      }

      // check class_course
      const [dataCourseClass] = await connect.execute(
        "SELECT * from class_course where class_course.IDCourse = ? and class_course.IDClass = ?",
        [idCourse, idClass]
      );
      // create class_course
      if (!(dataCourseClass?.length > 0)) {
        await connect.execute("insert into class_course values (?, ?)", [
          idCourse,
          idClass,
        ]);
      }

      if (
        DataStudents?.length > 0 &&
        DataPoint.length > 0 &&
        idCourse &&
        idClass
      ) {
        for (let i = 0; i < DataStudents.length; i++) {
          let [result] = await connect.execute(
            "insert into user (Msv, FullName, Gender, IDClass) values (?, ?, ?, ?)",
            [
              DataStudents[i]?.Msv,
              DataStudents[i]?.FullName,
              DataStudents[i]?.Gender,
              idClass,
            ]
          );
          await connect.execute(
            "INSERT INTO userinrole (UserID, RoleID) VALUES (?, ?)",
            [result.insertId, 3] // Wrap IDs in an array
          );

          await connect.execute(
            "insert into user_course (IDUser, IDCourse) values (?, ?)",
            [result.insertId, idCourse]
          );

          await connect.execute(
            "insert into point (Frequent, MidtermScore, FinalExamScore, AverageScore, Scores, LetterGrades, Note, IDUser, IDCourse) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              DataPoint[i]?.Frequent,
              DataPoint[i]?.MidtermScore,
              DataPoint[i]?.FinalExamScore,
              DataPoint[i]?.AverageScore,
              DataPoint[i]?.Scores,
              DataPoint[i]?.LetterGrades,
              DataPoint[i]?.Note,
              result.insertId,
              idCourse,
            ]
          );
        }
      }
      await connect.commit();

      resolve({
        status: 200,
        message: "Import dữ liệu thành công",
      });
    } catch (err) {
      if (connect) {
        await connect.rollback();
      }
      reject(err);
    }
  });

const selectSeculty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "select ID, FacultyName from faculty"
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: "Get data faculty done",
          data: result,
        });
      } else {
        resolve({
          status: 403,
          message: "Data faculty is empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const selectClassByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT ID, NameClass from class where IDFaculty = ?",
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
        "SELECT DISTINCT course.id, course.NameCourse from class INNER JOIN  class_course on class_course.IDClass = ? INNER JOIN course on course.ID = class_course.IDCourse",
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

export { importPoint, selectSeculty, selectClassByID, selectCourseByIdClass };
