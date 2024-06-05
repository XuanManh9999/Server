import express from "express";
import { authMiddlewareStudent } from "../middleware/authMiddleware.js";
import {
  importStudent,
  allStudent,
  studentById,
  WarningStudent,
  selectProfileStudent,
  updateImageProfile,
} from "../controllers/index.js";
const router = express.Router();

router.post("/import-student", importStudent);
router.get("/all-student", allStudent);
// router.get("/:IDStudent", studentById);
// Lấy thông tin cảnh báo của sinh viên
router.get("/warning", authMiddlewareStudent, WarningStudent);
// lay profile
router.get("/profile", authMiddlewareStudent, selectProfileStudent);
// update image
router.put("/images-profile", authMiddlewareStudent, updateImageProfile);

export default router;
