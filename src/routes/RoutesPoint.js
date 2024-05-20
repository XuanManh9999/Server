import express from "express";
const router = express.Router();
import * as hendlePoint from "../controllers/pointControllers.js";

router.get("/select-class-by-id/:id", hendlePoint.selectClassByID);

router.post("/import-point", hendlePoint.importPoint);
router.get(
  "/select-courses-by-id-class/:id",
  hendlePoint.selectCourseByIdClass
);

router.get(
  "/select-point-by-id-class-id-faculty-id-course",
  hendlePoint.selectPointClass
);

export default router;
