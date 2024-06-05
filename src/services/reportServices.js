import { pool as connection } from "../config/db.js";

export const HandleFollowReportClass = (Key, IDFaculty, IDClass, Semester) =>
  new Promise(async (resolve, reject) => {
    let dataStudent = [];
    try {
      // check select_all_user_in_faculty
      const [list_student_in_faculty] = await connection.execute(
        "SELECT user_faculty.IDUser from user_faculty WHERE user_faculty.IDFaculty = ?;",
        [IDFaculty]
      );
      for (let i = 0; i < list_student_in_faculty?.length; i++) {
        const response = await connection.execute(
          "SELECT * FROM user WHERE ID = ? and `Key` = ? and IDClass = ?;",
          [list_student_in_faculty[i]?.IDUser, Key, IDClass]
        );
        dataStudent.push(...response[0]);
      }
      let data = {};
      let khong_du_dk_thi = 0; // diem chuyen can < 3 hoac giua ki < 3
      let co_nguy_co_hoc_lai = 0; // diem cuoi ki < 5
      let co_nguy_co_khong_tot_nghiep = 0; // gpa <= 2.0
      let sv_no_hoc_phi = 0;
      for (let i = 0; i < dataStudent?.length; i++) {
        // check point
        const [point] = await connection.execute(
          "SELECT * FROM point WHERE IDUser = ? and Semester = ?;",
          [dataStudent[i]?.ID || -1, Semester]
        );
        for (let j = 0; j < point?.length; j++) {
          if (point[j]?.Frequent < 3 || point[j]?.MidtermScore < 3) {
            khong_du_dk_thi++;
          }
          if (point[j]?.FinalExamScore <= 5) {
            co_nguy_co_hoc_lai++;
          }
          if (point[j]?.AverageScore < 4) {
            co_nguy_co_khong_tot_nghiep++;
          }
        }
      }
      data = {
        total_student_in_class: dataStudent?.length,
        khong_du_dk_thi,
        co_nguy_co_hoc_lai,
        co_nguy_co_khong_tot_nghiep,
        sv_no_hoc_phi,
        sv_trong_nhom_an_toan:
          dataStudent?.length -
          khong_du_dk_thi -
          co_nguy_co_hoc_lai -
          co_nguy_co_khong_tot_nghiep -
          sv_no_hoc_phi,
      };
      resolve({
        status: 200,
        message: "GET REPORT By Class Success",
        data: data,
      });
    } catch (err) {
      reject(err);
    }
  });

export const HandleFollowReportFaculty = (Key, IDFaculty, Semester) =>
  new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let dataStudent = [];
      let khong_du_dk_thi = 0; // diem chuyen can < 3 hoac giua ki < 3
      let co_nguy_co_hoc_lai = 0; // diem cuoi ki < 5
      let co_nguy_co_khong_tot_nghiep = 0; // gpa <= 2.0
      let sv_no_hoc_phi = 0;
      // check select_all_user_in_faculty
      const [list_student_in_faculty] = await connection.execute(
        "SELECT user_faculty.IDUser from user_faculty WHERE user_faculty.IDFaculty = ?;",
        [IDFaculty]
      );
      for (let i = 0; i < list_student_in_faculty?.length; i++) {
        const response = await connection.execute(
          "SELECT * FROM user WHERE ID = ? and `Key` = ?;",
          [list_student_in_faculty[i]?.IDUser, Key]
        );
        dataStudent.push(...response[0]);
      }
      for (let i = 0; i < dataStudent?.length; i++) {
        // check point
        const [point] = await connection.execute(
          "SELECT * FROM point WHERE IDUser = ? and Semester = ?;",
          [dataStudent[i]?.ID || -1, Semester]
        );

        for (let j = 0; j < point?.length; j++) {
          if (point[j]?.Frequent < 3 || point[j]?.MidtermScore < 3) {
            khong_du_dk_thi++;
          }
          if (point[j]?.FinalExamScore <= 5) {
            co_nguy_co_hoc_lai++;
          }
          if (point[j]?.AverageScore < 4) {
            co_nguy_co_khong_tot_nghiep++;
          }
        }
      }
      data = {
        total_student_in_faculty: dataStudent?.length,
        khong_du_dk_thi,
        co_nguy_co_hoc_lai,
        co_nguy_co_khong_tot_nghiep,
        sv_no_hoc_phi,
        sv_trong_nhom_an_toan:
          dataStudent?.length -
          khong_du_dk_thi -
          co_nguy_co_hoc_lai -
          co_nguy_co_khong_tot_nghiep -
          sv_no_hoc_phi,
      };
      resolve({
        status: 200,
        message: "GET REPORT By Faculty Success",
        data: data,
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
