import { pool as connection } from '../config/db.js';
const getAllStudyPrograms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute('select * from studyprogram');
      resolve({
        status: 200,
        message: `Get data all data studyPrograms done. Is data ${
          result.length > 0 ? 'available' : 'empty'
        }`,
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export { getAllStudyPrograms };
