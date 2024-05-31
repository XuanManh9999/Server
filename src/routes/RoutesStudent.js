import express from "express";
import {
  importStudent,
  allStudent,
  studentById,
} from "../controllers/index.js";
const router = express.Router();

router.post("/import-student", importStudent);
router.get("/all-student", allStudent);
router.get("/:IDStudent", studentById);

export default router;
