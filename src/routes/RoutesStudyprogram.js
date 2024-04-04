import express from 'express';
const router = express.Router();
import * as hendleStudyProgramsController from '../controllers/studyProgramControllers.js';

router.get('/all-studyprograms', hendleStudyProgramsController.getAllStudyPrograms);

export default router;
// Path: src/routes/RoutesStudyprogram.js
// Compare this snippet from src/services/studentServices.js:
