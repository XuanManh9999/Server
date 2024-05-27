// Viết những api dùng chung trong dự án
import express from "express";
import {
  selectYearsStudent,
  selectFaculty,
  selectClassByFacultyAndKey,
  selectSemesterByKey,
  selectCourseByFacultyAndSemester,
} from "../controllers/index.js";
const router = express.Router();
// Lấy khoa theo khóa
router.get("/select-all-faculty", selectFaculty);

// Lấy tất cả khóa của sinh viên có trong hệ thống
router.get("/select-years-by-faculty", selectYearsStudent);

// Lấy lớp theo khóa, theo khoa
router.get("/select-class-by-faculty-and-key", selectClassByFacultyAndKey);

// Lấy kỳ học theo khóa
router.get("/select-semester-by-key", selectSemesterByKey);

// Lấy các môn học theo khoa, khoa, ky
router.get(
  "/select-courses-by-faculty-and-semester-and-key",
  selectCourseByFacultyAndSemester
);

export default router;
