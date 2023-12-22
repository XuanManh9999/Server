import { pool as connection } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// đăng nhập
const UserLogin = ({ Email, Password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm
            connection.query(
                "select * from user where Email = ?",
                [Email],
                async (err, results) => {
                    if (err) {
                        reject(err);
                    } else if (results.length === 0) {
                        resolve({
                            status: 404,
                            message: "Email does not exist in the system",
                        });
                    } else if (results.length > 0) {
                        const IsCheckPassword = bcrypt.compareSync(
                            Password,
                            results[0].Password
                        );
                        if (IsCheckPassword) {
                            const token = await jwt.sign(
                                results[0].ID,
                                process.env.SECRETKEY
                            );
                            resolve({
                                status: 200,
                                message: "OK",
                                token,
                            });
                        } else {
                            resolve({
                                status: 404,
                                message:
                                    "The password does not match the email provided",
                            });
                        }
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

// Đăng Ký
const UserRegister = ({ UserName, Password, FullName, Email, Avatar }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = +process.env.SALT;
            const hashPassword = bcrypt.hashSync(Password, salt);
            connection.query(
                "insert into user (UserName, Password, FullName, Email, Avatar) VALUES (?, ?, ?, ?, ?)",
                [UserName, hashPassword, FullName, Email, Avatar],
                (err, results) => {
                    try {
                        if (err) {
                            reject(err);
                        }
                        resolve({
                            status: 200,
                            message: "Account registration successful",
                            data: results,
                        });
                    } catch (err) {
                        reject(err);
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

export { UserLogin, UserRegister };
