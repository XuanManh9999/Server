import express from "express";
import {
  importStudent,
  allStudent,
  studentById,
  WarningStudent,
} from "../controllers/index.js";
const router = express.Router();

router.post("/import-student", importStudent);
router.get("/all-student", allStudent);
router.get("/:IDStudent", studentById);
// Lấy thông tin cảnh báo của sinh viên
router.get("/warning/:IDStudent", WarningStudent);

export default router;
