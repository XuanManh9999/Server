import { pool as connection } from "../config/db.js";

export const HandleFollowReportClass = () =>
  new Promise(async (resolve, reject) => {
    const data = {};
    try {
      const [dataFaculty] = await connection.execute(
        "select ID from faculty where FacultyName = ?",
        ["Công Nghệ Thông Tin"]
      );
      if (dataFaculty.length === 0) {
        resolve({
          status: 404,
          message: "Data Not found",
        });
      }
      const [studentInFaculty] = await connection.execute(
        "SELECT COUNT(*) as sl_sv FROM user_faculty WHERE user_faculty.IDFaculty = ?",
        [dataFaculty[0].ID]
      );
      data.totalStudent = studentInFaculty[0]?.sl_sv;
      // list_student
      const [list_student_in_faculty] = await connection.execute(
        "SELECT user_faculty.IDUser from user_faculty WHERE user_faculty.IDFaculty = ?;",
        [dataFaculty[0].ID]
      );
      // check point
      for (let i = 0; i < list_student_in_faculty?.length; i++) {}
    } catch (err) {
      reject(err);
    }
  });

export const HandleFollowReportFaculty = () =>
  Promise(async (resolve, reject) => {
    try {
    } catch (err) {
      reject(err);
    }
  });
