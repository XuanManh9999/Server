import { pool as connection } from "../config/db.js";
import nodemailer from "nodemailer";
export const handleSelectAllWarnings = () =>
  new Promise(async (resolve, reject) => {
    const [result] = await connection.execute("SELECT * FROM warnings");
    resolve({
      status: 200,
      message: "Get all warnings successfully",
      data: result,
    });
    try {
    } catch (err) {
      reject(err);
    }
  });

export const handleSelectWarningByID = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT * FROM warnings WHERE ID = ?",
        [id]
      );
      resolve({
        status: result.length === 0 ? 404 : 200,
        message:
          result.length === 0
            ? "Warning not found"
            : "Get warning by ID successfully",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });

export const handleInsertWarning = (
  NameWarning,
  SBN,
  TTHP,
  STC_NO,
  GPA,
  LevelWarning,
  ContentWarning,
  Author
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "INSERT INTO warnings (NameWarning, SBN, TTHP, STC_NO, GPA, LevelWarning, ContentWarning, Author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          NameWarning,
          SBN,
          TTHP,
          STC_NO,
          GPA,
          LevelWarning,
          ContentWarning,
          Author,
        ]
      );
      resolve({
        status: result.affectedRows === 0 ? 400 : 200,
        message:
          result.affectedRows === 0
            ? "Insert warning failed"
            : "Insert warning successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const handleUpdateWarning = (
  NameWarning,
  SBN,
  TTHP,
  STC_NO,
  GPA,
  LevelWarning,
  ContentWarning,
  Author,
  IDWarning
) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "UPDATE warnings SET NameWarning = ?, SBN = ?, TTHP = ?, STC_NO = ?, GPA = ?, LevelWarning = ?, ContentWarning = ?, Author = ? WHERE ID = ?",
        [
          NameWarning,
          SBN,
          TTHP,
          STC_NO,
          GPA,
          LevelWarning,
          ContentWarning,
          Author,
          IDWarning,
        ]
      );
      resolve({
        status: result.affectedRows === 0 ? 400 : 200,
        message:
          result.affectedRows === 0
            ? "Update warning failed"
            : "Update warning successfully",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const handleDeleteWarning = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "DELETE FROM warnings WHERE ID = ?",
        [id]
      );
      resolve({
        status: result.affectedRows === 0 ? 400 : 200,
        message:
          result.affectedRows === 0
            ? "Delete warning failed"
            : "Delete warning successfully",
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

const handleSendEmailByUserID = (list_id_student, IDWarning) =>
  new Promise(async (resolve, reject) => {
    try {
      // query msv
      let list_email = [];
      for (let i = 0; i < list_id_student.length; i++) {
        if (!list_id_student[i]) continue;
        const [student] = await connection.execute(
          "select user.Email from user where user.ID = ?",
          [list_id_student[i]]
        );
        if (student?.length > 0 && student?.[0]?.Email) {
          list_email.push(student[0]?.Email);
        }
      }

      // join lai theo dinh dang 20210794@eaut.edu.vn,20210795@eaut.edu.vn
      const list_email_send = list_email.join(",");

      const [warning] = await connection.execute(
        "select * from warnings where warnings.ID = ?",
        [IDWarning]
      );
      // handle send_email
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: '"Cộng tác sinh viên EAUT" <congtacsinhvieneaut.@eaut.edu.vn>', // sender address
        to: list_email_send || "nguyenxuanmanh2992003@gmail.com", // list of receivers student[0]?.Email
        subject: warning[0]?.NameWarning, // Subject line
        text: "Hello world?", // plain text body
        html: warning[0]?.ContentWarning, // html body
      });
      resolve(info);
    } catch (err) {
      reject(err);
    }
  });

export const handleSendWarning = ({ list_id_warning }) =>
  new Promise(async (resolve, reject) => {
    const condition = [];
    let connect;
    try {
      connect = await connection.getConnection();
      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();
      if (list_id_warning && list_id_warning.length > 0) {
        for (let i = 0; i < list_id_warning.length; i++) {
          const [result] = await connection.execute(
            "SELECT warnings.ID, warnings.NameWarning, warnings.SBN, warnings.TTHP, warnings.STC_NO, warnings.GPA FROM warnings WHERE ID = ?",
            [list_id_warning[i]]
          );
          condition.push(...result);
        }
      } else {
        const [result] = await connection.execute(
          "SELECT warnings.ID, warnings.NameWarning, warnings.SBN, warnings.TTHP, warnings.STC_NO, warnings.GPA FROM warnings"
        );
        condition.push(...result);
      }
      console.log("CHECK CONDITION: ", condition);
      // tim sv trong
      for (let i = 0; i < condition.length; i++) {
        // distructuring
        const { ID, NameWarning, SBN, TTHP, STC_NO, GPA } = condition[i];
        let ds_email_send = [];
        let list_sv_send_warning = new Set();
        // check sbn
        if (SBN) {
          // Quy định sẵn nếu nghỉ quá 2 buổi trong một môn học thì add vào list_sv_send_warning
          const [data_sbn] = await connection.execute(
            `SELECT IDStudent FROM attendance WHERE AttendanceStatus = '3' GROUP BY IDStudent, IDCourse HAVING COUNT(IDStudent) >= ?;`,
            [SBN]
          );
          for (let i = 0; i < data_sbn?.length; i++) {
            list_sv_send_warning.add(data_sbn[i].IDStudent);
          }
        }
        // check stc_no
        if (STC_NO) {
          const [data_stc_no] = await connection.execute(
            "SELECT point.IDUser, sum(course.NumberOfCredits) as stc_no from point INNER JOIN course on point.IDCourse = course.ID WHERE point.AverageScore < ? GROUP BY IDUser",
            [STC_NO]
          );
          for (let i = 0; i < data_stc_no.length; i++) {
            list_sv_send_warning.add(data_stc_no[i]?.IDUser);
          }
        }
        // check dtb
        if (GPA) {
          const [data_gpa] = await connection.execute(
            "SELECT point.IDUser, sum(point.AverageScore * course.NumberOfCredits), sum(course.NumberOfCredits) from point INNER JOIN course on point.IDCourse = course.ID GROUP BY point.IDUser HAVING (sum(point.AverageScore * course.NumberOfCredits) / sum(course.NumberOfCredits)) < ?",
            [GPA]
          );
          // add IDUser vao list_sv_send_warning
          for (let i = 0; i < data_gpa?.length; i++) {
            list_sv_send_warning.add(data_gpa[i]?.IDUser);
          }
        }
        // check user_warning
        for (let value of list_sv_send_warning) {
          if (value && ID) {
            const [check_user_warning] = await connection.execute(
              "SELECT * from user_warning WHERE user_warning.IDUser = ? and user_warning.IDWarning = ?",
              [value, ID]
            );
            if (check_user_warning?.length > 0) {
              // check date
              let resultDate = handleDay(
                check_user_warning[check_user_warning?.length - 1]?.CreateAt
              );
              if (Number(resultDate) >= 90) {
                // create
                await connection.execute(
                  "INSERT INTO user_warning (IDUser, IDWarning) VALUES(?, ?)",
                  [value, ID]
                );
                ds_email_send.push(value);
              }
            } else {
              // create
              await connection.execute(
                "INSERT INTO user_warning (IDUser, IDWarning) VALUES(?, ?)",
                [value, ID]
              );
              ds_email_send.push(value);
            }
          }
        }
        // send email
        await handleSendEmailByUserID(ds_email_send, ID);
      }
      await connect.commit();
      resolve({
        status: "200",
        message: "Send warning successfully",
      });
    } catch (err) {
      await connect.rollback();
      console.log(err);
      reject(err);
    }
  });
