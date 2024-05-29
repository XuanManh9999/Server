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

export const handleDataClass = (data) =>
  new Promise(async (resolve, reject) => {
    let IDFaculty;
    let connect;
    try {
      connect = await connection.getConnection();
      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();

      for (let i = 0; i < data?.length; i++) {
        // check faculty
        const [checkFaculty] = await connect.execute(
          "SELECT ID from faculty WHERE FacultyName = ?",
          [data[i]?.title ?? ""]
        );
        IDFaculty = checkFaculty[0]?.ID ? checkFaculty[0]?.ID : null;
        if (!IDFaculty) {
          // them khoa
          const [resultFaculty] = await connect.execute(
            `INSERT INTO faculty (FacultyName) VALUES (?)`,
            [data[i]?.title]
          );
          IDFaculty = resultFaculty.insertId;
        }

        const dataClass = data[i]?.dataClass;

        // loop
        for (let i = 0; i < dataClass?.length; i++) {
          // check class
          const [checkClass] = await connect.execute(
            "SELECT * FROM class WHERE NameClass = ? AND IDFaculty = ?",
            [dataClass[i], IDFaculty]
          );
          if (checkClass.length === 0) {
            if (dataClass[i] !== "") {
              await connect.execute(
                `INSERT INTO class (NameClass, IDFaculty) VALUES (?, ?)`,
                [dataClass[i], IDFaculty]
              );
            }
          }
        }
      }
      await connect.commit();
      resolve({
        status: 200,
        message: "Import Class Success",
      });
    } catch (err) {
      console.log(err);
      if (connect) {
        await connect.rollback();
      }
      reject(err);
    }
  });

export const heandleCountClass = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT count(NameClass) AS totalClass from class"
      );
      resolve({
        status: 200,
        message: "Count Class Success",
        data: result[0],
      });
    } catch (err) {
      reject(err);
    }
  });
