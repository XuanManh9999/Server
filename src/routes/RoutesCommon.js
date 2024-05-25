// Viết những api dùng chung trong dự án
import express from "express";
import { selectYearsStudent, selectFaculty, selectClassByFacultyAndKey } from "../controllers/index.js";
const router = express.Router();
// Lấy khoa theo khóa
router.get("/select-all-faculty", selectFaculty);

// Lấy tất cả khóa của sinh viên có trong hệ thống
router.get("/select-years-by-faculty", selectYearsStudent);

// Lấy lớp theo khóa, theo khoa
router.get('/select-class-by-faculty-and-key', selectClassByFacultyAndKey);

export default router;
