import { pool as connection } from "../config/db.js";

export const handleAddFaculty = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { facultyName, founding, desc, email, phoneNumber } = data;
      const [result] = await connection.execute(
        "INSERT INTO faculty (FacultyName, Founding, `Describe`, Email, PhoneNumber) VALUES (?, ?, ?, ?, ?)",
        [facultyName, founding, desc, email, phoneNumber]
      );
      resolve({
        status: result?.affectedRows > 0 ? 200 : 400,
        message:
          result?.length > 0 ? "Success Add Faculty" : "Failed Add Faculty",
        data: result,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const handleUpdateFaculty = async (data) => {
  try {
    const { facultyName, founding, desc, email, phoneNumber, idFaculty } = data;
    const [result] = await connection.execute(
      "UPDATE faculty SET FacultyName = ?, Founding = ?, `Describe` = ?, Email = ?, PhoneNumber = ? WHERE ID = ?",
      [facultyName, founding, desc, email, phoneNumber, idFaculty]
    );
    return {
      status: result?.affectedRows > 0 ? 200 : 400,
      message:
        result?.length > 0 ? "Success Update Faculty" : "Failed Update Faculty",
      data: result,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An Error From Server With API updateFaculty",
    };
  }
};

export const handleDeleteFaculty = async (idFaculty) => {
  try {
    const [result] = await connection.execute(
      "DELETE FROM faculty WHERE ID = ?",
      [idFaculty]
    );
    return {
      status: result?.affectedRows > 0 ? 200 : 400,
      message:
        result?.length > 0 ? "Success Delete Faculty" : "Failed Delete Faculty",
      data: result,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An Error From Server With API deleteFaculty",
    };
  }
};
export const handleImportFaculty = (listFaculty) =>
  new Promise(async (resolve, reject) => {
    let connect;
    let IDFaculty;
    try {
      connect = await connection.getConnection();
      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();
      for (let i = 0; i < listFaculty.length; i++) {
        // Destructuring data from listFaculty
        const { FacultyName, Founding, Describe, Email, PhoneNumber } =
          listFaculty[i];
        // check if FacultyName already exists in the database
        if (FacultyName) {
          const [result] = await connect.execute(
            "SELECT ID FROM faculty WHERE FacultyName = ?",
            [FacultyName]
          );
          IDFaculty = result[0]?.ID ? result[0]?.ID : null;
        } else {
          continue;
        }
        if (IDFaculty) {
          // validate
          if (Founding && Email && PhoneNumber) {
            await connect.execute(
              "UPDATE faculty SET Founding = ?, `Describe` = ?, Email = ?, PhoneNumber = ? WHERE FacultyName = ?",
              [Founding, Describe, Email, PhoneNumber, FacultyName]
            );
          }
        } else {
          // validate
          if (Founding && Email && PhoneNumber) {
            await connect.execute(
              "INSERT INTO faculty (FacultyName, Founding, `Describe`, Email, PhoneNumber) VALUES (?, ?, ?, ?, ?)",
              [FacultyName, Founding, Describe, Email, PhoneNumber]
            );
          }
        }
      }
      await connect.commit();
      resolve({
        status: 200,
        message: "Success Import Faculty",
      });
    } catch (err) {
      if (connect) {
        await connect.rollback();
      }
      reject(err);
    }
  });

export const handleSelectAllFaculty = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT ID, FacultyName, Founding, `Describe`, Email, PhoneNumber FROM faculty"
      );
      resolve({
        status: 200,
        message: "Success Select All Faculty",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
