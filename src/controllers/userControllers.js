import * as userServices from "../services/userServices.js";

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
        if (UserName && Password && FullName && Email) {
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

const ForgotPassword = async (req, res) => {
    try {
        const { Email } = req.body;
        if (Email) {
            const responsive = await userServices.ForgotPassword(Email);
            return res.status(200).json(responsive);
        } else {
            return res.status(404).json({
                status: 404,
                message:
                    "The user has not entered enough information to continue",
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

const UserData = async (req, res) => {
    try {
        const responsive = await userServices.UserData();
        return res.status(200).json(responsive);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "An error occurred on the server",
        });
    }
};

export { UserLogin, UserRegister, ForgotPassword, UserData };
