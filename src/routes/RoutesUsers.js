import express from "express";
import * as userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", userControllers.UserRegister);
router.post("/login", userControllers.UserLogin);
router.post('/authenticationJWT', userControllers.AuthenticationJVW);

export default router;
