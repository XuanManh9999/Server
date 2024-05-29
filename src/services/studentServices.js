import { pool as connection } from "../config/db.js";
import bcrypt from "bcrypt";
const tinhKhoa = (msv) => {
  const date = new Date();
  const getYear = date.getFullYear();
  return getYear - Number(msv.slice(0, 4));
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
            const hashPassword = bcrypt.hashSync("123456@aA", salt);
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
