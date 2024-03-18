import { pool as connection } from '../config/db.js';

const allFaculty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        'select ID, FacultyName from faculty'
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: 'Get data faculty done',
          data: result,
        });
      } else {
        resolve({
          status: 403,
          message: 'Data faculty is empty',
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const classByIdFaculty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        'SELECT ID, NameClass from class where IDFaculty = ?',
        [id]
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: 'Get data class done',
          data: result,
        });
      } else {
        resolve({
          status: 403,
          message: 'Data class is empty',
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
        'SELECT DISTINCT course.ID, course.NameCourse from class INNER JOIN  class_course on class_course.IDClass = ? INNER JOIN course on course.ID = class_course.IDCourse',
        [id]
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: 'Get Data Courses By Id Class Done',
          data: result,
        });
      } else {
        resolve({
          status: 200,
          message: 'Get Data Courses By Id Class Is Empty',
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
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
        throw new Error('Connection is undefined or null.');
      }
      await connect.beginTransaction();
      // check khoa
      const [faculty] = await connect.execute(
        'SELECT DISTINCT ID FROM faculty WHERE FacultyName = ?',
        [Faculty]
      );

      idFaculty = faculty.length > 0 ? faculty[0].ID : null;
      if (idFaculty === null) {
        // them khoa
        const [result] = await connect.execute(
          'insert into faculty (FacultyName) values (?)',
          [Faculty]
        );
        idFaculty = result.insertId;
      }
      // check class
      const [classs] = await connect.execute(
        'SELECT ID FROM class WHERE NameClass = ?',
        [Class]
      );
      idClass = classs.length > 0 ? classs[0].ID : null;
      if (idClass === null) {
        // them class
        const [result] = await connect.execute(
          'insert into class (NameClass, IDFaculty) values (?, ?)',
          [Class, idFaculty]
        );
        idClass = result.insertId;
      }
      // check course
      const [course] = await connect.execute(
        'SELECT ID FROM course WHERE NameCourse = ?',
        [Course]
      );
      idCourse = course.length > 0 ? course[0].ID : null;
      if (idCourse === null) {
        // them course
        const [result] = await connect.execute(
          'insert into course (NameCourse) values (?)',
          [Course]
        );
        idCourse = result.insertId;

        //them class_course học môn học đó
        await connect.execute(
          'insert into class_course (IDClass, IDCourse) values (?, ?)',
          [idClass, idCourse]
        );
      }
      if (DataAttendance?.length > 0) {
        for (let i = 0; i < DataAttendance.length; i++) {
          const { Msv, FullName, DateOfBirth, Comment, Attendance } =
            DataAttendance[i];
          // check student
          const [student] = await connect.execute(
            'SELECT ID FROM user WHERE Msv = ?',
            [Msv]
          );
          idStudent = student.length > 0 ? student[0].ID : null;
          if (idStudent === null) {
            // them student
            const [result] = await connect.execute(
              'insert into user (Msv, FullName, DateOfBirth, IDClass) values (?, ?, ?, ?)',
              [Msv, FullName, DateOfBirth, idClass]
            );
            idStudent = result.insertId;

            // thêm quyền
            await connect.execute(
              'insert into userinrole (UserID, RoleID) values (?, ?)',
              [idStudent, 3]
            );

            // thêm người dùng học môn học đó
            await connect.execute(
              'insert into user_course (IDUser, IDCourse) values (?, ?)',
              [idStudent, idCourse]
            );
          }

          // them diem danh
          if (Attendance?.length > 0) {
            for (let j = 0; j < Attendance.length; j++) {
              const { Day, AttendanceStatus } = Attendance[j];
              // check xem đã có sinh viên đó chưa?
              const [existingRecord] = await connect.execute(
                'SELECT ID FROM attendance WHERE IDStudent = ? AND Day = ? AND IDCourse = ?',
                [idStudent, Day, idCourse]
              );

              if (existingRecord?.length === 0) {
                await connect.execute(
                  'insert into attendance (Semester, SchoolYear, IDStudent, IDCourse, Day, AttendanceStatus) values (?, ?, ?, ?, ?, ?)',
                  [
                    Semester,
                    SchoolYear,
                    idStudent,
                    idCourse,
                    Day,
                    AttendanceStatus,
                  ]
                );
              } else {
                await connect.execute(
                  'update attendance set Semester = ?, SchoolYear = ?, AttendanceStatus = ? where IDStudent = ? and Day = ? and IDCourse = ?',
                  [
                    Semester,
                    SchoolYear,
                    AttendanceStatus,
                    idStudent,
                    Day,
                    idCourse,
                  ]
                );
              }
            }
          }
          // thêm comment
          if (Comment) {
            // cần update comment
            // check comment
            const [check] = await connect.execute(
              'SELECT * FROM commentattendance WHERE IDStudent = ? AND IDCourse = ?',
              [idStudent, idCourse]
            );
            if (!check.length) {
              await connect.execute(
                'insert into commentattendance (IDStudent, IDCourse, Comment) values (?, ?, ?)',
                [idStudent, idCourse, Comment]
              );
            } else {
              await connect.execute(
                'update commentattendance set Comment = ? where IDStudent = ? and IDCourse = ?',
                [Comment, idStudent, idCourse]
              );
            }
          } else {
            await connect.execute(
              'insert into commentattendance (IDStudent, IDCourse, Comment) values (?, ?, ?)',
              [idStudent, idCourse, '']
            );
          }
        }
      }

      connect.commit();
      resolve({
        status: 200,
        message: 'Import dữ liệu thành công',
      });
    } catch (err) {
      if (connect) {
        await connect.rollback();
      }
      reject(err);
    }
  });
};

const selectAttendance = (IdFaculty, IdClass, IdCourse) =>
  new Promise(async (resolve, reject) => {
    let idStudent = [];
    let listAttendance = [];
    let listComment = [];
    let data = {};

    try {
      let [listStudent] = await connection.execute(
        `SELECT DISTINCT faculty.FacultyName, class.NameClass, course.NameCourse, user.ID, user.Msv, user.FullName, user.DateOfBirth from user INNER JOIN userinrole on user.ID = userinrole.UserID INNER JOIN role on role.ID = userinrole.RoleID and role.ID = 3 INNER JOIN faculty on faculty.ID = ? INNER JOIN class on class.IDFaculty = ? and class.ID = ? INNER JOIN user_course on user_course.IDUser = user.ID INNER JOIN course on course.ID = user_course.IDCourse and course.ID = ?`,
        [IdFaculty, IdFaculty, IdClass, IdCourse]
      );

      // getIDStudent
      for (let i = 0; i < listStudent.length; i++) {
        idStudent.push(listStudent[i].ID);
      }
      // lấy thông tin điểm danh

      for (let i = 0; i < idStudent.length; i++) {
        const [resultAttendance] = await connection.execute(
          `SELECT  attendance.SchoolYear, attendance.Semester,  attendance.AttendanceStatus, attendance.Day FROM attendance WHERE IDStudent = ? and IDCourse = ?`,
          [idStudent[i], IdCourse]
        );
        const [resultComment] = await connection.execute(
          `SELECT commentattendance.Comment FROM commentattendance WHERE IDStudent = ? and IDCourse = ?`,
          [idStudent[i], IdCourse]
        );
        listAttendance.push(resultAttendance);
        listComment.push(resultComment[0]);
      }

      // gom dữ liệu lại
      if (idStudent?.length > 0) {
        data = {
          Faculty: listStudent[0].FacultyName,
          Class: listStudent[0].NameClass,
          Course: listStudent[0].NameCourse,
          DataAttendance: [],
        };
      }

      if (listAttendance.length > 0) {
        for (let i = 0; i < listAttendance.length; i++) {
          let temp = {
            Msv: listStudent[i].Msv,
            FullName: listStudent[i].FullName,
            DateOfBirth: listStudent[i].DateOfBirth,
            Comment: listComment[i]?.Comment ?? '',
            Attendance: listAttendance[i],
          };
          data.DataAttendance.push(temp);
        }
      }
      resolve({
        status: 200,
        message: 'Lấy dữ liệu điểm danh thành công',
        data: data,
      });
    } catch (err) {
      reject(err);
    }
  });

export {
  allFaculty,
  classByIdFaculty,
  courseByIdClass,
  importAttendance,
  selectAttendance,
};
// lấy ra sinh viên
// Lấy ra thông tin điểm danh và cho vào một mảng
