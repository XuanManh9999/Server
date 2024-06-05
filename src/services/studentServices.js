import { pool as connection } from "../config/db.js";
import bcrypt from "bcrypt";
const tinhKhoa = (msv) => {
  return Number(msv.slice(0, 4)) - process.env.START_YEAR - 1;
};

export const handleImportStudent = (data) =>
  new Promise(async (resolve, reject) => {
    let connect;
    let IDFaculty;
    let IDClass;
    let IDStudent;
    const Key = "`Key`";
    try {
      connect = await connection.getConnection();
      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();
      // check faculty
      for (let i = 0; i < data.length; i++) {
        const {
          TenKhoa,
          TenLop,
          Msv,
          HoTen,
          NgaySinh,
          GioiTinh,
          DanToc,
          QueQuan,
          NTT,
          Email,
          SDT,
          NguoiThan,
        } = data[i];
        // validate data
        if (TenKhoa) {
          // check faculty
          const [faculty] = await connect.query(
            `SELECT ID FROM faculty WHERE FacultyName = ?`,
            [TenKhoa]
          );
          if (faculty.length === 0) {
            const [resultFaculty] = await connect.query(
              `INSERT INTO faculty (FacultyName) VALUES (?)`,
              [TenKhoa]
            );
            IDFaculty = resultFaculty.insertId;
          } else {
            IDFaculty = faculty[0]?.ID;
          }
          // check class
          if (TenLop) {
            const [classData] = await connect.query(
              `SELECT ID FROM class WHERE NameClass = ?`,
              [TenLop]
            );
            if (classData.length === 0) {
              const [resultClass] = await connect.query(
                `INSERT INTO class (NameClass, IDFaculty) VALUES (?, ?)`,
                [TenLop, IDFaculty]
              );
              IDClass = resultClass.insertId;
            } else {
              IDClass = classData[0]?.ID;
            }

            // check student with MSV
            const [student] = await connect.execute(
              `SELECT ID FROM user WHERE Msv = ?`,
              [Msv]
            );
            IDStudent = student[0]?.ID;
            // neu co thi update, khong thi insert
            const key = tinhKhoa(Msv);
            const salt = +process.env.SALT;
            const hashPassword = bcrypt.hashSync(
              process.env.DEFAULT_FASSWORD,
              salt
            );
            if (student.length === 0) {
              const [result] = await connect.execute(
                `INSERT INTO user (Msv, FullName, UserName, Password, 
                Gender, EthnicGroup, DateOfBirth, Hometown, PermanentResidence, 
                Email, PhoneNumber, ${Key}, status, IDClass) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  Msv,
                  HoTen,
                  `${Msv}@eaut.edu.vn`,
                  hashPassword,
                  GioiTinh,
                  DanToc,
                  NgaySinh,
                  QueQuan,
                  NTT,
                  Email,
                  SDT,
                  key,
                  "active",
                  IDClass,
                ]
              );
              IDStudent = result.insertId;
            } else {
              await connect.execute(
                `UPDATE user SET Msv = ?, FullName = ?, UserName = ?, Password = ?, Gender = ?, EthnicGroup = ?, DateOfBirth = ?, Hometown = ?, PermanentResidence = ?, Email = ?, PhoneNumber = ?, ${Key} = ?, status = ?, IDClass = ? WHERE ID = ?`,
                [
                  Msv,
                  HoTen,
                  Msv && `${Msv}${process.env.DOMAIN_DEFAULT_EMAIL}`,
                  Msv && hashPassword,
                  GioiTinh,
                  DanToc,
                  NgaySinh,
                  QueQuan,
                  NTT,
                  Email,
                  SDT,
                  key,
                  "active",
                  IDClass,
                  IDStudent,
                ]
              );
            }
            // check student
            if (IDStudent) {
              // them userinrole
              await connect.execute(
                "INSERT INTO userinrole (UserID, RoleID) VALUES (?, ?)",
                [IDStudent, 3]
              );
              // them userFaculty
              await connect.execute(
                "INSERT INTO user_faculty (IDUser, IDFaculty) VALUES (?, ?)",
                [IDStudent, IDFaculty]
              );
              // them nguoi than
              if (NguoiThan && NguoiThan?.length >= 0) {
                // check xem co nguoi than do chua
                const [relatives] = await connect.query(
                  `SELECT ID FROM relatives WHERE studentid = ?`,
                  [IDStudent]
                );
                if (relatives.length > 0) {
                  // update
                  for (let j = 0; j < NguoiThan.length; j++) {
                    const { TenNT, QuanHe, SDT } = NguoiThan[j];
                    await connect.execute(
                      "UPDATE relatives SET Name = ?, Role = ?, PhoneNumber = ? WHERE studentid = ?",
                      [TenNT, QuanHe, SDT, IDStudent]
                    );
                  }
                } else {
                  // insert
                  for (let j = 0; j < NguoiThan.length; j++) {
                    const { TenNT, QuanHe, SDT } = NguoiThan[j];
                    await connect.execute(
                      "INSERT INTO relatives (Name, Role, PhoneNumber, studentid) VALUES (?, ?, ?, ?)",
                      [TenNT, QuanHe, SDT, IDStudent]
                    );
                  }
                }
              }
            } else {
              continue;
            }
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
      await connect.commit();
      resolve({
        status: 200,
        message: "Import student success",
      });
    } catch (err) {
      await connect.rollback();
      reject(err);
    }
  });

export const handleStudentById = (IDStudent) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = {};
      const [student] = await connection.execute(
        "SELECT  user.FullName, user.Gender, user.Email, user.DateOfBirth, user.Key, user.status, user.EthnicGroup, user.Hometown, user.PermanentResidence, user.PhoneNumber FROM user WHERE ID = ?",
        [IDStudent]
      );
      data.student = student[0];
      const [relatives] = await connection.execute(
        "SELECT relatives.Name, relatives.Role, relatives.PhoneNumber FROM relatives WHERE studentid = ?",
        [IDStudent]
      );
      data.relatives = relatives;
      resolve({
        status: 200,
        data,
      });
    } catch (err) {
      reject(err);
    }
  });
export const handleAllStudent = (Key, IDFaculty, IDClass) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = [];
      // const list_point_false = [];
      const [result] = await connection.execute(
        `SELECT user.ID, user.Msv, user.FullName, user.Gender, user.Email, user.DateOfBirth, user.Key, user.status, user.PhoneNumber from user INNER JOIN userinrole on 
        userinrole.UserID = user.ID INNER JOIN role on
         role.ID = userinrole.RoleID and role.ID = 3 INNER JOIN
          faculty on faculty.ID = ?  WHERE user.IDClass = ? and user.Key = ?`,
        [IDFaculty, IDClass, Key]
      );
      for (let i = 0; i < result?.length; i++) {
        const student = {};
        let stcno = 0;
        if (result[i]?.ID) {
          const [relatives] = await connection.execute(
            `SELECT * from relatives where relatives.studentId = ?`,
            [result[i]?.ID]
          );
          const [list_point_false] = await connection.execute(
            `
            SELECT point.IDCourse from point where point.IDUser 
            = ? and point.AverageScore < 4 
          `,
            [result[i]?.ID]
          );
          for (let i = 0; i < list_point_false.length; i++) {
            if (list_point_false[i]?.IDCourse) {
              const [course] = await connection.execute(
                `
                SELECT course.NumberOfCredits as STC from course where course.ID = ?
              `,
                [list_point_false[i]?.IDCourse]
              );
              stcno += Number(course[0]?.STC);
            }
          }
          // student.student.STCNO = stcno;
          student.student = result[i];
          student.student = { ...student.student, STC_NO: stcno, NO_HP: 0 };
          student.relatives = relatives;
          data.push(student);
        }
      }
      resolve({
        status: 200,
        data,
      });
    } catch (err) {
      reject(err);
    }
  });

function handleDay(dbDateStr) {
  // Chuyển đổi chuỗi ngày thành đối tượng Date
  let dbDate = new Date(dbDateStr);

  // Lấy ngày hiện tại
  let currentDate = new Date();

  // Tính toán sự chênh lệch giữa hai ngày bằng miliseconds
  let diffInMs = currentDate - dbDate;

  // Chuyển đổi sự chênh lệch từ milliseconds thành ngày
  let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

export const handleWarningStudent = (IDStudent) =>
  new Promise(async (resolve, reject) => {
    const dataWarning = {};
    try {
      // check xem user co data trong canh bao do khong
      const [data] = await connection.execute(
        "SELECT * from user_warning WHERE user_warning.IDUser = ?",
        [IDStudent]
      );
      if (data?.length > 0) {
        // lay warning
        const [warning] = await connection.execute(
          "SELECT * from warnings where warnings.ID = ?",
          [data[data.length - 1]?.IDWarning]
        );
        const { NameWarning, SBN, TTHP, STC_NO, GPA, LevelWarning } =
          warning[0];

        // find data cua user do
        dataWarning.NameWarning = NameWarning;
        dataWarning.LevelWarning = LevelWarning;
        dataWarning.TTHP = "Chưa có thông tin";
        if (SBN) {
          const [data_di_muon] = await connection.execute(
            `SELECT 
          course.NameCourse, 
          course.NumberOfCredits
      FROM 
          attendance 
      INNER JOIN 
          course 
      ON 
          attendance.IDCourse = course.ID
      WHERE 
          attendance.IDStudent = ?
          AND attendance.AttendanceStatus = '3'
      GROUP BY 
          course.NameCourse
      HAVING 
          COUNT(attendance.AttendanceStatus) >= ?;
      `,
            [IDStudent, SBN]
          );
          if (data_di_muon.length > 0) dataWarning.SBN = data_di_muon;
        }
        if (STC_NO) {
          const [data_mh_no_tin_chi] = await connection.execute(
            `
            SELECT 
                course.NameCourse, 
                course.NumberOfCredits
            FROM 
                point 
            INNER JOIN 
                course 
            ON 
                point.IDCourse = course.ID
            WHERE 
                point.IDUser = ?
                AND point.AverageScore < 5
            GROUP BY 
                course.NameCourse
            HAVING 
              sum(course.NumberOfCredits) >= ?
          `,
            [IDStudent, STC_NO]
          );
          if (data_mh_no_tin_chi.length > 0) {
            dataWarning.STC_NO = data_mh_no_tin_chi;
          }
        }
        if (GPA) {
          const [data_gpa] = await connection.execute(
            `SELECT DISTINCT point.IDUser, sum(point.AverageScore * course.NumberOfCredits)
             as tc_diem, sum(course.NumberOfCredits) as stc, (sum(point.AverageScore * course.NumberOfCredits) / sum(course.NumberOfCredits))
              as diem_thang_10 from point INNER JOIN course on point.IDCourse = course.ID  WHERE point.IDUser = ? GROUP BY
               point.IDUser HAVING (sum(point.AverageScore * course.NumberOfCredits) / sum(course.NumberOfCredits)) < ?;`,
            [IDStudent, GPA]
          );
          if (data_gpa.length > 0) dataWarning.GPA = data_gpa[0];
        }
        // viet them nhung dk o day neu co
        resolve({
          status: 200,
          message: "Get warning success",
          data: dataWarning,
        });
      } else {
        resolve({
          status: 204,
          message: "Student not found in warning list",
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const handleSelectProfileStudent = (IDStudent) =>
  new Promise(async (resolve, reject) => {
    const data_student = {};
    try {
      const [result] = await connection.execute(
        `SELECT DISTINCT user.ID, user.Msv, user.FullName, 
        user.Gender, user.Email, user.Avatar, user.DateOfBirth, 
        user.PhoneNumber, user.PermanentResidence, user.Hometown, 
        user.Key from user INNER JOIN userinrole on user.ID = userinrole.UserID 
        INNER JOIN role on role.ID = userinrole.RoleID and role.ID = 3 WHERE user.ID = ? 
        GROUP BY user.ID`,
        [IDStudent]
      );
      if (result?.length > 0) {
        data_student.student = result[0];
        const [data_nt] = await connection.execute(
          "SELECT * from relatives WHERE relatives.studentId = ?",
          [IDStudent]
        );
        data_student.relatives = data_nt;
      } else {
        return res.status(400).json({
          status: 400,
          message: "Can't not found user",
        });
      }
      resolve({
        status: 200,
        message: "Get profile user done",
        data: data_student,
      });
    } catch (err) {
      reject(err);
    }
  });

export const handleUpdateImageProfile = (IDStudent, UrlImage) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "UPDATE user set user.Avatar = ? WHERE user.ID = ?",
        [UrlImage, IDStudent]
      );
      resolve({
        status: result?.affectedRows ? 200 : 400,
        message: result?.affectedRows ? "Update Done" : "Update Error",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
