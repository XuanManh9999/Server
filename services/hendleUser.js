import { connection } from "../config/db.js";
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            connection.query(
                "SELECT * from user",
                function (err, results, fields) {
                    if (err) {
                       reject(err)
                    } else {
                        if (results.length > 0) {
                            resolve({
                                errCode: 1,
                                errMessage: "OK",
                                data: results,
                            });
                        } else {
                            resolve({
                                errCode: 1,
                                errMessage: "NO DATA",
                                data: [],
                            });
                        }
                    }
                }
            );
        } catch (e) {
            reject(e);
        }
    });
};
export { getAllUser };
