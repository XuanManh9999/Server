import jwt from "jsonwebtoken";
import {
  handleSelectAllWarnings,
  handleSelectWarningByID,
  handleInsertWarning,
  handleUpdateWarning,
  handleDeleteWarning,
  handleSendWarning,
  handleSelectAllUserWarning,
  handleSelectAllUserWarningByID
} from "../services/index.js";

export const selectAllWarnings = async (req, res) => {
  try {
    const response = await handleSelectAllWarnings();
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error selectAllWarnings on the server",
    });
  }
};

export const selectWarningByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && id !== "") {
      const response = await handleSelectWarningByID(id);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Please enter complete information to continue",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error selectWarningByID on the server",
    });
  }
};

export const insertWarning = async (req, res) => {
  try {
    let IDAuthor = req.admin;
    const {
      NameWarning,
      SBN,
      TTHP,
      STC_NO,
      GPA,
      LevelWarning,
      ContentWarning,
    } = req.body;

    // validate
    if (
      !NameWarning ||
      !SBN ||
      !TTHP ||
      !STC_NO ||
      !GPA ||
      !LevelWarning ||
      !ContentWarning ||
      !IDAuthor
    ) {
      return res.status(400).json({
        status: 400,
        message: "Please enter complete information to continue",
      });
    } else {
      const response = await handleInsertWarning(
        NameWarning,
        SBN,
        TTHP,
        STC_NO,
        GPA,
        LevelWarning,
        ContentWarning,
        IDAuthor
      );
      return res.status(200).json(response);
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error insertWarning on the server",
    });
  }
};

export const updateWarning = async (req, res) => {
  try {
    let IDAuthor = req.admin;
    const {
      NameWarning,
      SBN,
      TTHP,
      STC_NO,
      GPA,
      LevelWarning,
      ContentWarning,
      IDWarning,
    } = req.body;

    // validate
    if (
      !NameWarning ||
      !SBN ||
      !TTHP ||
      !STC_NO ||
      !GPA ||
      !LevelWarning ||
      !ContentWarning ||
      !IDAuthor ||
      !IDWarning
    ) {
      return res.status(400).json({
        status: 400,
        message: "Please enter complete information to continue",
      });
    } else {
      const response = await handleUpdateWarning(
        NameWarning,
        SBN,
        TTHP,
        STC_NO,
        GPA,
        LevelWarning,
        ContentWarning,
        IDAuthor,
        IDWarning
      );
      return res.status(200).json(response);
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error updateWarning on the server",
    });
  }
};

export const deleteWarning = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && id !== "") {
      const response = await handleDeleteWarning(id);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Please enter complete information to continue",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error deleteWarning on the server",
    });
  }
};

export const sendWarning = async (req, res) => {
  try {
    const response = await handleSendWarning(req.body);
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error sendAllWarningByID on the server",
    });
  }
};

export const selectAllUserWarning = async (req, res) => {
  try {
    const response = await handleSelectAllUserWarning();
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error selectAllUserWarning on the server",
    });
  }
};

export const selectAllUserWarningByID = async (req, res) => {
  try {
    const { IDWarning } = req.params;
    if (IDWarning && IDWarning !== "") {
      const response = await handleSelectAllUserWarningByID(IDWarning);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Please enter complete information to continue",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error selectAllUserWarningByID on the server",
    });
  }
};
