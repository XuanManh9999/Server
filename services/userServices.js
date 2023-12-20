import { pool as connection } from "../config/db.js";
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            connection.query(
                "SELECT * from user",
                function (err, results, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve({
                                code: 200,
                                message: "OK",
                                data: results,
                            });
                        } else {
                            resolve({
                                code: 404,
                                message: "DATA NOT FOUND",
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
const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            connection.query(
                `SELECT * from user where id = ${id}`,
                function (err, results, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve({
                                code: 200,
                                message: "OK",
                                data: results,
                            });
                        } else {
                            resolve({
                                code: 404,
                                message: "DATA NOT FOUND",
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
export { getAllUser, getUserById };
