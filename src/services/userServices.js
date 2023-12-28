import { pool as connection } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
const generateAcessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m",
    });
    return access_token;
};

const generateRefreshToken = (data) => {
    const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "365d",
    });
    return refresh_token;
};

// đăng nhập
const UserLogin = ({ Email, Password, res }) => {
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
                            const _idUser = results[0].ID;
                            connection.query(
                                "select user.id, name  from user INNER JOIN userinrole on user.ID = userinrole.UserID INNER JOIN role on userinrole.RoleID = role.ID and user.ID = ?",
                                [_idUser],
                                (err, roleUser) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (roleUser.length === 0) {
                                        resolve({
                                            status: 500,
                                            message:
                                                "There is an error on the server side. The error is in the database, which cannot find administrator permissions to authenticate",
                                        });
                                    } else if (roleUser.length > 0) {
                                        const access_token = generateAcessToken(
                                            {
                                                id: roleUser[0].id,
                                                role: roleUser[0].name,
                                            }
                                        );
                                        const refresh_token =
                                            generateRefreshToken({
                                                id: roleUser[0].id,
                                                role: roleUser[0].name,
                                            });
                                        // Cập nhật Refresh lưu vào DB
                                        connection.query(
                                            "update user set RefreshToken = ? where ID = ?",
                                            [refresh_token, roleUser[0].id],
                                            (err) => {
                                                if (err) {
                                                    resolve({
                                                        status: 500,
                                                        message:
                                                            "An error occurred while saving refresh_token to the db",
                                                    });
                                                }
                                            }
                                        );

                                        // Lưu Refresh Token vào cookie
                                        res.cookie(
                                            "refreshToken",
                                            refresh_token,
                                            {
                                                httpOnly: false,
                                                maxAge:
                                                    60 * 60 * 24 * 365 * 1000, // 365 ngày, đơn vị là miligiây
                                                path: "/",
                                                sameSite: "strict",
                                            }
                                        );

                                        resolve({
                                            status: 200,
                                            message: "OK",
                                            UserName: results[0].UserName,
                                            FullName: results[0].FullName,
                                            Email: results[0].Email,
                                            Avatar: results[0].Avatar,
                                            access_token,
                                        });
                                    }
                                }
                            );
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
                        connection.query(
                            "insert into userinrole (UserID, RoleID) values (?, ?)",
                            [+results.insertId, 3],
                            (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                resolve({
                                    status: 200,
                                    message: "Account registration successful",
                                    data: result,
                                });
                            }
                        );
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

// Quên mật khẩu
// Băm mật khẩu mới
const generateRandomPassword = (length) => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const password = Array.from(crypto.randomFillSync(new Uint32Array(length)))
        .map((value) => characters[value % characters.length])
        .join("");
    return password;
};

const ForgotPassword = (Email) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                "select * from user where email = ?",
                [Email],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else if (results.length === 0) {
                        return resolve({
                            status: 401,
                            message: "No account exists in the system",
                        });
                    } else if (results.length > 0) {
                        return resolve({
                            status: 200,
                            message: "OK",
                            newPassword: generateRandomPassword(12),
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const UserData = () => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                "select ID, UserName, FullName, Email, Avatar from user",
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    if (results.length === 0) {
                        resolve({
                            status: 401,
                            message: "Data is empty",
                            data: results,
                        });
                    } else if (results.length > 0) {
                        resolve({
                            status: 200,
                            message: "OK",
                            data: results,
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const UserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                "select ID, UserName, FullName, Email, Avatar from user where ID = ?",
                [id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length === 0) {
                        resolve({
                            status: 401,
                            message: "The user does not exist in the system",
                        });
                    } else if (result.length > 0) {
                        resolve({
                            status: 400,
                            message: "OK",
                            data: result,
                        });
                    }
                }
            );
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

export { UserLogin, UserRegister, ForgotPassword, UserData, UserById };
