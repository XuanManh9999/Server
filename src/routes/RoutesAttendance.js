import express from 'express';
import * as hendleAttenDance from '../controllers/attenDanceControllers.js';

const router = express.Router();
router.get('/all-faculty', hendleAttenDance.allFaculty);
router.get('/class-by-id-faculty/:id', hendleAttenDance.classByIdFaculty);
router.get('/course-by-id-class/:id', hendleAttenDance.courseByIdClass);
router.post('/import-attendance', hendleAttenDance.importAttendance);
router.get('/select-attendance', hendleAttenDance.selectAttendance);



export default router;
