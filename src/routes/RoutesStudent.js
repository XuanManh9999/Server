import express from "express";
import { importStudent } from "../controllers/index.js";
const router = express.Router();

router.post("/import-student", importStudent);

export default router;
