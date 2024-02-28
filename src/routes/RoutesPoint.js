import express from "express";
const router = express.Router();
import * as hendlePoint from "../controllers/pointControllers.js";

router.get("/select-all-faculty", hendlePoint.selectSeculty);

router.get("/select-class-by-id/:id", hendlePoint.selectClassByID);

router.post("/import-point", hendlePoint.importPoint);


router.get("/select-courses-by-id-class/:id", hendlePoint.selectCourseByIdClass)

export default router;
