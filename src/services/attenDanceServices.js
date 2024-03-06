import { pool as connection } from "../config/db.js";

const allFaculty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "select ID, FacultyName from faculty"
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: "Get data faculty done",
          data: result,
        });
      } else {
        resolve({
          status: 403,
          message: "Data faculty is empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const classByIdFaculty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT ID, NameClass from class where IDFaculty = ?",
        [id]
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: "Get data class done",
          data: result,
        });
      } else {
        resolve({
          status: 403,
          message: "Data class is empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const courseByIdClass = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT DISTINCT course.ID, course.NameCourse from class INNER JOIN  class_course on class_course.IDClass = ? INNER JOIN course on course.ID = class_course.IDCourse",
        [id]
      );
      if (result?.length > 0) {
        resolve({
          status: 200,
          message: "Get Data Courses By Id Class Done",
          data: result,
        });
      } else {
        resolve({
          status: 200,
          message: "Get Data Courses By Id Class Is Empty",
          data: [],
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

export { allFaculty, classByIdFaculty, courseByIdClass };
