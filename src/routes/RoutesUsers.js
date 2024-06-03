import express from "express";
import * as userController from "../controllers/userControllers.js";
const router = express.Router();

// Common
router.post("/register", userController.UserRegister);
router.post("/login", userController.UserLogin);
router.post("/forgot-password", userController.ForgotPassword);

// lấy toàn bộ
router.get("/users", userController.UserData);

// Lấy theo ID
router.get("/:id", userController.UserById);

router.post("/test", userController.hendleTest);

export default router;
