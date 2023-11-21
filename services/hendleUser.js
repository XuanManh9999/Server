import { connection } from "../config/db.js";
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            connection.query(
                "SELECT * from user",
                function (err, results, fields) {
                    if (results) {
                        resolve({
                            errCode: 1,
                            errMessege: "OK",
                            data: results,
                        });
                    } else {
                        resolve({
                            errCode: 1,
                            errMessege: "NO DATA",
                            data: [],
                        });
                    }
                }
            );
        } catch (e) {
            reject(e);
        }
    });
};
export { getAllUser };
