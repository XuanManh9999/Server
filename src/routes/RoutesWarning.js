import express from "express";
import {
  selectAllWarnings,
  selectWarningByID,
  insertWarning,
  updateWarning,
  deleteWarning,
  sendWarning,
} from "../controllers/index.js";
const router = express.Router();
// CRUD Warning
router.get("/select-all-warning", selectAllWarnings);
router.get("/select-warning-by-id/:id", selectWarningByID);
router.post("/insert-warning", insertWarning);
router.put("/update-warning", updateWarning);
router.delete("/delete-warning/:id", deleteWarning);

// SEND WARNING
router.post("/send-all-student-by-warning", sendWarning);

export default router;

