import express from "express";
import { authMiddlewareAdmin } from "../middleware/authMiddleware.js";
import {
  selectAllWarnings,
  selectWarningByID,
  insertWarning,
  updateWarning,
  deleteWarning,
  sendWarning,
  selectAllUserWarning,
  selectAllUserWarningByID
} from "../controllers/index.js";
const router = express.Router();
// CRUD Warning
router.get("/select-all-warning", selectAllWarnings);
router.get("/select-warning-by-id/:id", selectWarningByID);
router.post("/insert-warning", authMiddlewareAdmin, insertWarning);
router.put("/update-warning", authMiddlewareAdmin, updateWarning);
router.delete("/delete-warning/:id", deleteWarning);

// SEND WARNING
router.get("/select-all-student-by-warning", selectAllUserWarning);
router.get("/select-all-student-by-warning/:IDWarning", selectAllUserWarningByID);
router.post("/send-all-student-by-warning", sendWarning);

export default router;
