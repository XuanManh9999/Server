import { pool as connection } from "../config/db.js";

export const handleAddFaculty = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(new Date());
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
    try {
      for (let i = 0; i < listFaculty.length; i++) {
        const [result] = await connection.execute(
          "SELECT * FROM faculty WHERE FacultyName = ?",
          [listFaculty[i]?.facultyName]
        );
        if (result.length === 0) {
          await connection.execute(
            "INSERT INTO faculty (FacultyName, Founding, `Describe`, Email, PhoneNumber) VALUES (?, ?, ?, ?, ?)",
            [
              listFaculty[i]?.facultyName,
              listFaculty[i]?.founding,
              listFaculty[i]?.desc,
              listFaculty[i]?.email,
              listFaculty[i]?.phoneNumber,
            ]
          );
        }
      }
      resolve({
        status: 200,
        message: "Success Import Faculty",
      });
    } catch (err) {
      reject(err);
    }
  });
