import express from "express";
import {
  followReportFaculty,
  followReportClass,
} from "../controllers/index.js";
const router = express.Router();

router.get("/follow-report-faculty", followReportFaculty);
router.get("/follow-report-class", followReportClass);
export default router;
