import { pool as connection } from "../config/db.js";
import bcrypt from "bcrypt";

const classByIdFaculty = (id) => {
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
const courseByIdClass = (id) => {
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
const tinhKhoa = (msv) => {
  return Number(msv + ""?.slice(0, 4)) - process.env.START_YEAR - 1;
};

const importAttendance = ({
  Faculty,
  Class,
  Course,
  Semester,
  SchoolYear,
  DataAttendance,
}) => {
  return new Promise(async (resolve, reject) => {
    let connect;
    let idFaculty;
    let idClass;
    let idCourse;
    let idStudent;
    try {
      connect = await connection.getConnection();
      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();
      // check khoa
      const [faculty] = await connect.execute(
        "SELECT DISTINCT ID FROM faculty WHERE FacultyName = ?",
        [Faculty]
      );

      idFaculty = faculty.length > 0 ? faculty[0].ID : null;
      if (idFaculty === null) {
        // them khoa
        const [result] = await connect.execute(
          "insert into faculty (FacultyName) values (?)",
          [Faculty]
        );
        idFaculty = result.insertId;
      }
      // check class
      const [classs] = await connect.execute(
        "SELECT ID FROM class WHERE NameClass = ?",
        [Class]
      );
      idClass = classs.length > 0 ? classs[0].ID : null;
      if (idClass === null) {
        // them class
        const [result] = await connect.execute(
          "insert into class (NameClass, IDFaculty) values (?, ?)",
          [Class, idFaculty]
        );
        idClass = result.insertId;
      }
      // check course
      const [course] = await connect.execute(
        "SELECT ID FROM course WHERE NameCourse = ?",
        [Course]
      );
      idCourse = course.length > 0 ? course[0].ID : null;
      if (idCourse === null) {
        // them course
        const [result] = await connect.execute(
          "insert into course (NameCourse) values (?)",
          [Course]
        );
        idCourse = result.insertId;
      }

      const [checkClass_course] = await connect.execute(
        "select * from class_course where  class_course.IDClass = ? and class_course.IDCourse = ?",
        [idClass, idCourse]
      );

      if (checkClass_course.length === 0) {
        await connect.execute(
          "insert into class_course (IDClass, IDCourse) values (?, ?)",
          [idClass, idCourse]
        );
      }
      if (DataAttendance?.length > 0) {
        for (let i = 0; i < DataAttendance.length; i++) {
          const { Msv, FullName, DateOfBirth, Attendance } = DataAttendance[i];
          // check student
          const [student] = await connect.execute(
            "SELECT ID FROM user WHERE Msv = ?",
            [Msv]
          );
          idStudent = student.length > 0 ? student[0].ID : null;
          if (idStudent === null) {
            const salt = +process.env.SALT;
            const hashPassword = bcrypt.hashSync(
              process.env.DEFAULT_FASSWORD,
              salt
            );
            // them student
            const [result] = await connect.execute(
              "insert into user (Msv, FullName, DateOfBirth, Email, Password, `Key`, IDClass, status) values (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                Msv,
                FullName,
                DateOfBirth,
                Msv && `${Msv + process.env.DOMAIN_DEFAULT_EMAIL}`,
                hashPassword,
                Msv && tinhKhoa(Msv),
                idClass,
                "active",
              ]
            );
            idStudent = result.insertId;

            // thêm quyền
            await connect.execute(
              "insert into userinrole (UserID, RoleID) values (?, ?)",
              [idStudent, 3]
            );

            // thêm người dùng học môn học đó
            await connect.execute(
              "insert into user_course (IDUser, IDCourse) values (?, ?)",
              [idStudent, idCourse]
            );
            // them user_faculty
            await connect.execute(
              "insert into user_faculty (IDUser, IDFaculty) values (?, ?)",
              [idStudent, idFaculty]
            );
          } else {
            const salt = +process.env.SALT;
            const hashPassword = bcrypt.hashSync(
              process.env.DEFAULT_FASSWORD,
              salt
            );
            // update thông tin sinh viên
            await connect.execute(
              "update user set FullName = ?, DateOfBirth = ?, Email = ?, Password = ?, `Key` = ?, status = ? where ID = ?",
              [
                FullName,
                DateOfBirth,
                Msv && `${Msv + process.env.DOMAIN_DEFAULT_EMAIL}`,
                hashPassword,
                Msv && tinhKhoa(Msv),
                "active",
                idStudent,
              ]
            );

            // check quyen
            const [checkRole] = await connect.execute(
              "SELECT * FROM userinrole WHERE UserID = ? AND RoleID = 3",
              [idStudent]
            );
            if (checkRole.length === 0) {
              await connect.execute(
                "insert into userinrole (UserID, RoleID) values (?, ?)",
                [idStudent, 3]
              );
            }

            // checl xem sinh vien da hoc mon hoc do chua
            const [checkUser_course] = await connect.execute(
              "SELECT * FROM user_course WHERE IDUser = ? AND IDCourse = ?",
              [idStudent, idCourse]
            );
            if (checkUser_course.length === 0) {
              await connect.execute(
                "insert into user_course (IDUser, IDCourse) values (?, ?)",
                [idStudent, idCourse]
              );
            }
            // check xem sinh vien da hoc khoa do chua
            const [checkUser_faculty] = await connect.execute(
              "SELECT * FROM user_faculty WHERE IDUser = ? AND IDFaculty = ?",
              [idStudent, idFaculty]
            );
            if (checkUser_faculty.length === 0) {
              await connect.execute(
                "insert into user_faculty (IDUser, IDFaculty) values (?, ?)",
                [idStudent, idFaculty]
              );
            }
          }

          // them diem danh
          if (Attendance?.length > 0) {
            for (let j = 0; j < Attendance.length; j++) {
              const { Day, AttendanceStatus, Comment } = Attendance[j];
              // check-xem-ngay-hom-do-da-diem-danh-chua
              const [existingRecord] = await connect.execute(
                "SELECT ID FROM attendance WHERE IDStudent = ? AND Day = ? AND IDCourse = ?",
                [idStudent, Day, idCourse]
              );

              if (existingRecord?.length === 0) {
                await connect.execute(
                  "insert into attendance (Semester, SchoolYear, IDStudent, IDCourse, Day, AttendanceStatus, Comment) values (?, ?, ?, ?, ?, ?, ?)",
                  [
                    Semester,
                    SchoolYear,
                    idStudent,
                    idCourse,
                    Day,
                    AttendanceStatus,
                    Comment ?? "",
                  ]
                );
              } else {
                await connect.execute(
                  "update attendance set Semester = ?, SchoolYear = ?, AttendanceStatus = ? where IDStudent = ? and Day = ? and `Comment` = ? and IDCourse = ?",
                  [
                    Semester,
                    SchoolYear,
                    AttendanceStatus,
                    idStudent,
                    Day,
                    Comment || "",
                    idCourse,
                  ]
                );
              }
            }
          }
        }
      }

      connect.commit();
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
};

const selectAttendance = (IdFaculty, IdClass, IdCourse, Key, Semester) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        `
      SELECT  user.Msv, user.FullName, user.DateOfBirth, attendance.AttendanceStatus, attendance.Comment, course.NumberOfCredits
      FROM user 
      INNER JOIN userinrole ON userinrole.UserID = user.ID 
      INNER JOIN role ON role.ID = userinrole.RoleID AND role.ID = 3 
      INNER JOIN class ON user.IDClass = class.ID AND class.ID = ? AND class.IDFaculty = ?
      INNER JOIN faculty ON faculty.ID = ? 
      INNER JOIN studyprogram ON studyprogram.Key = ? AND studyprogram.IdFaculty = ? 
      INNER JOIN course_studyprogram ON studyprogram.ID = course_studyprogram.IDStudyProgram 
      INNER JOIN course ON course.ID = course_studyprogram.IDCourse AND course.ID = ? AND course.Semester = ? 
      INNER JOIN user_course ON user.ID = user_course.IDUser AND course.ID = user_course.IDCourse 
      INNER JOIN attendance ON attendance.IDCourse = course.ID AND attendance.IDStudent = user.ID
      WHERE class.ID = ? AND faculty.ID = ? AND studyprogram.Key = ? AND course.ID = ? AND course.Semester = ?;
      `,
        [
          IdClass,
          IdFaculty,
          IdFaculty,
          Key,
          IdFaculty,
          IdCourse,
          Semester,
          IdClass,
          IdFaculty,
          Key,
          IdCourse,
          Semester,
        ]
      );
      resolve({
        status: result?.length > 0 ? 200 : 404,
        message: result?.length > 0 ? "Get data done" : "Data is empty",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });

export {
  classByIdFaculty,
  courseByIdClass,
  importAttendance,
  selectAttendance,
};
// lấy ra sinh viên
