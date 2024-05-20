// Viết những api dùng chung trong dự án
import express from "express";
import { selectYearsStudent } from "../controllers/index.js";
const router = express.Router();

// Lấy tất cả khóa học của sinh viên theo faculty
router.get("/select-years-by-faculty", selectYearsStudent);

export default router;
