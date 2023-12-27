import express from "express";
import * as userControllers from "../controllers/userControllers.js";
const router = express.Router();
import { authMiddlewareAdmin } from "../middleware/authMiddleware.js";

router.post("/register", userControllers.UserRegister);
router.post("/login", userControllers.UserLogin);
router.post("/forgot-password", userControllers.ForgotPassword);
router.get("/users", authMiddlewareAdmin, userControllers.UserData);

export default router;
