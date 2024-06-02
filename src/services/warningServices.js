import { pool as connection } from "../config/db.js";
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

export const handleSendWarning = (condition) =>
  new Promise(async (resolve, reject) => {
    const { IDWarning, Key, IDFaculty, IDClass, IDUser, list_student } =
      condition;
    const dk = {};
    try {
      if (IDWarning) {
        dk.IDWarning = IDWarning;
      }
      if (Key) {
        dk.Key = Key;
      }
      if (IDFaculty) {
        dk.IDFaculty = IDFaculty;
      }
      if (IDClass) {
        dk.IDClass = IDClass;
      }
      if (IDUser) {
        dk.IDUser = IDUser;
      }
      if (list_student) {
        dk.list_student = list_student;
      }
      // Xử lý trường hợp truyền xuống mỗi IDWarning
      
    } catch (err) {
      reject(err);
    }
  });
