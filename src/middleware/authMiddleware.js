import jwt from "jsonwebtoken";
// Admin
const authMiddlewareAdmin = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({
      status: 404,
      message: "Token is valid",
    });
  }
  console.log(process.env.ACCESS_TOKEN_SECRET);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
    if (err) {
      return res.status(404).json({
        status: 404,
        message: "The user is not authenticated, maybe the token has expired ",
      });
    }
    if (admin?.role === "Admin") {
      req.admin = admin?.id;
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
  let token = req.headers.authorization.split(" ")[1];
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
        message: "The user is not authenticated, maybe the token has expired ",
      });
    }
    if (user?.name === "Lecturers") {
      next();
    } else {
      return res.status(404).json({
        status: 404,
        message: "The user is not authentication ",
      });
    }
  });
};

// Người dùng JWT
const authMiddlewareStudent = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
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
        message: "The user is not authenticated, maybe the token has expired ",
      });
    }
    if (user?.role === "User") {
      req.user = user?.id;
      next();
    } else {
      return res.status(404).json({
        status: 404,
        message: "The user is not authentication ",
      });
    }
  });
};

export { authMiddlewareAdmin, authMiddlewareLecturers, authMiddlewareStudent };
