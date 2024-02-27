import express from "express";
import * as userControllers from "../controllers/userControllers.js";
const router = express.Router();
import {
  authMiddlewareAdmin,
  authMiddlewareLecturers,
} from "../middleware/authMiddleware.js";
// Common
router.post("/register", userControllers.UserRegister);
router.post("/login", userControllers.UserLogin);
router.post("/forgot-password", userControllers.ForgotPassword);

// lấy toàn bộ
router.get("/users", userControllers.UserData);

// Lấy theo ID
router.get("/:id", userControllers.UserById);


router.post("/test", userControllers.hendleTest);



export default router;
