import express from "express";
import {
  createClass,
  updateClass,
  deleteClass,
  selectClassByIdFaculty,
  importClass,
  countClass,
} from "../controllers/index.js";

const router = express.Router();

router.post("/import-class", importClass);
router.post("/add-class-by-faculty", createClass);
router.get("/select-class-by-faculty", selectClassByIdFaculty);
router.get("/count-class", countClass);
router.put("/update-class", updateClass);
router.delete("/delete-class-by-id/:IDClass", deleteClass);

export default router;
