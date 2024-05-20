// Viết những api dùng chung trong dự án
import express from "express";
import { selectYearsStudent, selectFaculty } from "../controllers/index.js";
const router = express.Router();

router.get("/select-all-faculty", selectFaculty);
// Lấy tất cả khóa học của sinh viên theo faculty
router.get("/select-years-by-faculty", selectYearsStudent);

export default router;
