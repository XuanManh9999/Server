import { pool as connection } from "../config/db.js";

export const heandleCreateClass = ({ NameClass, IDFaculty }) =>
  new Promise(async (resolve, reject) => {
    try {
      // check xem co du lieu trung khop hay khong
      const [check] = await connection.execute(
        "SELECT * FROM class WHERE NameClass = ? AND IDFaculty = ?",
        [NameClass, IDFaculty]
      );
      if (check.length > 0) {
        return resolve({
          status: 400,
          message: "Class is already exists",
        });
      } else {
        const [result] = await connection.execute(
          `INSERT INTO class (NameClass, IDFaculty) VALUES (?, ?)`,
          [NameClass, IDFaculty]
        );
        // check xem co them thanh cong hay khong
        if (result.affectedRows === 0) {
          return resolve({
            status: 400,
            message: "Create Class Failed",
          });
        }
        resolve({
          status: 200,
          message: "Create Class Success",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
export const heandleUpdateClass = ({ IDClass, NameClass, IDFaculty }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "UPDATE class SET NameClass = ?, IDFaculty = ? WHERE ID = ?",
        [NameClass, IDFaculty, IDClass]
      );
      // check xem co update thanh cong hay khong
      if (result?.affectedRows === 0) {
        return resolve({
          status: 400,
          message: "Update Class Failed",
        });
      }
      resolve({
        status: 200,
        message: "Update Class Success",
      });
    } catch (err) {
      reject(err);
    }
  });
export const heandleDeleteClass = ({ IDClass }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "DELETE FROM class WHERE ID = ?",
        [IDClass]
      );
      // check xem co xoa thanh cong hay khong
      if (result.affectedRows === 0) {
        return resolve({
          status: 400,
          message: "Delete Class Failed",
        });
      }
      resolve({
        status: 200,
        message: "Delete Class Success",
      });
    } catch (err) {
      reject(err);
    }
  });
export const heandleSelectClassByIdFaculty = ({ IDFaculty }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT * FROM class WHERE IDFaculty = ?",
        [IDFaculty]
      );
      // check xem co lay duoc du lieu hay khong
      if (result.length === 0) {
        return resolve({
          status: 400,
          message: "Select Class By IDFaculty Failed",
        });
      }
      resolve({
        status: 200,
        message: "Select Class By IDFaculty Success",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
