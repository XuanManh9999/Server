import express from "express";
const router = express.Router();
import * as hendlePoint from '../controllers/pointControllers.js'



router.post('/import-point', hendlePoint.importPoint)


export default router;
