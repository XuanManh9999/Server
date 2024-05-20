import { pool as connection } from "../config/db.js";
// Hàm để lấy bốn chữ cái đầu tiên và loại bỏ các phần tử trùng lặp
function getUniqueFirstFourChars(dataArray) {
  const uniqueSet = new Set();

  dataArray.forEach((item) => {
    const firstFourChars = item.Msv.substring(0, 4);
    uniqueSet.add(firstFourChars);
  });

  return Array.from(uniqueSet);
}
function getKhoaHoc(dataArray) {
  return dataArray.map((item) => +item - process.env.START_YEAR - 1);
}
export const handleYearsStudent = ({ facultyId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        `
        SELECT DISTINCT user.Msv FROM USER INNER JOIN 
        userinrole ON USER.ID = userinrole.UserID INNER
        JOIN role ON userinrole.RoleID = role.ID AND role.ID = 3 
        INNER JOIN user_faculty on user.ID = user_faculty.IDUser INNER JOIN
         faculty on faculty.ID = user_faculty.IDFaculty and faculty.ID = ?`,
        [facultyId]
      );
      const handleData = getUniqueFirstFourChars(result);
      const formatData = getKhoaHoc(handleData);
      resolve({
        status: 200,
        message: "Success",
        data: formatData,
      });
    } catch (err) {
      reject(err);
    }
  });
