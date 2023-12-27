import express from "express";
const router = express.Router();
import * as tokenControllers from "../controllers/tokenControllers.js";

router.post("/refreshToken", tokenControllers.UserRefreshToken);

export default router;
