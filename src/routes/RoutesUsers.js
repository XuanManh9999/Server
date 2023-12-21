import express from "express";
import * as userControllers from "../controllers/userControllers.js";


const router = express.Router();

router.get("/", userControllers.getAllUser);

router.get("/:userId", userControllers.getUserById);

export default router;
