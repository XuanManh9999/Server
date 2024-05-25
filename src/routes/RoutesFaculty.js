import express from "express";
import {
  addFaculty,
  updateFaculty,
  deleteFaculty,
  importFaculty,
  selectFaculty
} from "../controllers/index.js";
const router = express.Router();

router.post('/import-faculty', importFaculty);
router.get('/select-faculty', selectFaculty)
router.post("/add", addFaculty);
router.put("/update", updateFaculty);
router.delete("/delete/:idFaculty", deleteFaculty);

export default router;
