import { pool as connection } from "../config/db.js";
// Hàm để lấy bốn chữ cái đầu tiên và loại bỏ các phần tử trùng lặp
function getUniqueFirstFourChars(dataArray) {
  const uniqueSet = new Set();
  dataArray.forEach((item) => {
    const firstFourChars = item?.Msv?.substring(0, 4);
    if (firstFourChars && firstFourChars >= process.env.START_YEAR)
      uniqueSet.add(firstFourChars);
  });

  return Array.from(uniqueSet);
}

function getKhoaHoc(dataArray) {
  return dataArray.map((item) => +item - process.env.START_YEAR - 1).sort();
}

// handleSVThuocKey
function handleSVThuocKey(dataArray, key) {
  const data = [];
  dataArray?.forEach((item) => {
    if (
      item?.Msv?.substring(0, 4) - +process.env.START_YEAR - 1 === +key &&
      item?.Msv?.substring(0, 4) >= +process.env.START_YEAR
    )
      data.push(item);
  });
  return data;
}
export const handleYearsStudent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT DISTINCT Msv from user"
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

export const selectfaculty = ({ key }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [list_msv] = await connection.execute(
        `SELECT DISTINCT user.ID, user.Msv FROM USER INNER JOIN 
        userinrole ON USER.ID = userinrole.UserID INNER
        JOIN role ON userinrole.RoleID = role.ID AND role.ID = 3`
      );

      const [user_faculty] = await connection.execute(
        "select * from user_faculty;"
      );
      const newData = handleSVThuocKey(list_msv, key);
      let set_unique_name_faculty = new Set();
      for (let i = 0; i < user_faculty.length; i++) {
        for (let j = 0; j < newData.length; j++) {
          if (user_faculty[i]?.IDUser === newData[j]?.ID) {
            set_unique_name_faculty.add(user_faculty[i]?.IDFaculty);
          }
        }
      }
      const listIDFaculty = Array.from(set_unique_name_faculty);
      const listNameFaculty = [];
      for (let i = 0; i < listIDFaculty.length; i++) {
        const [faculty] = await connection.execute(
          `SELECT ID, FacultyName FROM faculty WHERE ID = ${listIDFaculty[i]}`
        );
        listNameFaculty.push(faculty[0]);
      }

      resolve({
        status: 200,
        message: "Success",
        data: listNameFaculty,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const handleSelectClassByFacultyAndKey = (key, faculty) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "SELECT * FROM class WHERE IDFaculty = ?",
        [faculty]
      );

      const newData = result.filter((item) => {
        const keyClass = item?.NameClass.split(".")[0].match(/\d+/g);
        return keyClass && keyClass[0] === key; // return true or false
      });

      resolve({
        status: 200,
        message: "Success",
        data: newData,
      });
    } catch (err) {
      reject(err);
    }
  });
