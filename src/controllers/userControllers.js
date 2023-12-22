import * as userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";
import { pool as connection } from "../config/db.js";

//Đăng nhập
const UserLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (Email && Password) {
            const responsive = await userServices.UserLogin({
                Email,
                Password,
            });
            return res.status(200).json(responsive);
        } else {
            return res.status(400).json({
                status: 400,
                message: "Please enter complete information to continue",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "An error occurred on the server",
        });
    }
};

// Đăng Ký
const UserRegister = async (req, res) => {
    try {
        const { UserName, Password, FullName, Email, Avatar } = req.body;
        if (UserName && Password && FullName && Email && Avatar) {
            const responsive = await userServices.UserRegister({
                UserName,
                Password,
                FullName,
                Email,
                Avatar,
            });
            return res.status(200).json(responsive);
        } else {
            return res.status(400).json({
                status: 400,
                message: "Please enter complete information to continue",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "An error occurred on the server",
        });
    }
};

// Sử dụng có các route cần xác thực

const AuthenticationJVW = (req, res, next) => {
    try {
        /// req.header()
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Did not receive token from header",
            });
        }
        jwt.verify(token, process.env.SECRETKEY, (err, userId) => {
            if (err) {
                return res.status(401).json({
                    status: 403,
                    message: "An error occurred while validating the token",
                });
            }
            connection.query(
                "select * from user where id = ?",
                [userId],
                (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            status: 500,
                            message: "An error from server",
                        });
                    }
                    if (result.length === 0) {
                        return res.status(401).json({
                            status: 401,
                            message: "User not found",
                        });
                    } else if (result.length > 0) {
                        req.user = result;
                        next();
                    }
                }
            );
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "An error occurred on the server",
        });
    }
};

export { UserLogin, UserRegister, AuthenticationJVW };
