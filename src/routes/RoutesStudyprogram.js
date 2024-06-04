import express from "express";
const router = express.Router();
import {
  getAllStudyPrograms,
  importStudyPrograms,
  selectBlockKnowledgeByKeyFaculty,
  selectCourseByKeyFacultyBlockKnowledge
} from "../controllers/index.js";

router.get("/all-studyprograms", getAllStudyPrograms);

router.post("/import-studyprograms", importStudyPrograms);

router.get(
  "/select-blockknowledge-by-key-faculty",
  selectBlockKnowledgeByKeyFaculty
);

router.get(
  "/select-course-by-key-faculty-blockknowledge",
  selectCourseByKeyFacultyBlockKnowledge
);

export default router;
// Path: src/routes/RoutesStudyprogram.js
// Compare this snippet from src/services/studentServices.js:
