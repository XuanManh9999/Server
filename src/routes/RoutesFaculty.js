import express from "express";
import {
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/index.js";
const router = express.Router();

router.post("/add", addFaculty);
router.put("/update", updateFaculty);
router.delete("/delete/:idFaculty", deleteFaculty);

export default router;
