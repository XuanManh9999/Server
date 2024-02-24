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
router.get("/users", userControllers.UserData);
router.get("/:id", userControllers.UserById);
router.post("/test", userControllers.hendleTest);



export default router;
