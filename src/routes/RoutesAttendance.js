import express from 'express';
import * as hendleAttenDance from '../controllers/attenDanceControllers.js';

const router = express.Router();
router.get('/all-faculty', hendleAttenDance.allFaculty);
router.get('/class-by-id-faculty/:id', hendleAttenDance.classByIdFaculty);
router.get('/course-by-id-class/:id', hendleAttenDance.courseByIdClass);

export default router;
