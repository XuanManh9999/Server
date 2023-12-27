import jwt from "jsonwebtoken";
const authMiddlewareAdmin = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(404).json({
            status: 404,
            message: "Token is valid",
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 404,
                message:
                    "The user is not authenticated, maybe the token has expired ",
            });
        }
        if (user.role === "Admin") {
            next();
        } else {
            return res.status(404).json({
                status: 404,
                message: "The user is not authentication ",
            });
        }
    });
};
// Giảng viên JWT
const authMiddlewareLecturers = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(404).json({
            status: 404,
            message: "Token is valid",
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 404,
                message:
                    "The user is not authenticated, maybe the token has expired ",
            });
        }
        if (user.role === "Lecturers") {
            next();
        } else {
            return res.status(404).json({
                status: 404,
                message: "The user is not authentication ",
            });
        }
    });
};

export { authMiddlewareAdmin, authMiddlewareLecturers };
