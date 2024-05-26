import express from "express";
const router = express.Router();
import {
  getAllStudyPrograms,
  importStudyPrograms,
} from "../controllers/index.js";

router.get("/all-studyprograms", getAllStudyPrograms);

router.post("/import-studyprograms", importStudyPrograms);

export default router;
// Path: src/routes/RoutesStudyprogram.js
// Compare this snippet from src/services/studentServices.js:
