import jwt from "jsonwebtoken";
import {
  handleSelectAllWarnings,
  handleSelectWarningByID,
  handleInsertWarning,
  handleUpdateWarning,
  handleDeleteWarning,
  handleSendWarning,
} from "../services/index.js";

const handleVerifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return false;
    } else {
      return user?.id;
    }
  });
};
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
    let token = req.headers.authorization.split(" ")[1];
    let IDAuthor = await handleVerifyToken(token);
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
    let token = req.headers.authorization.split(" ")[1];
    let IDAuthor = await handleVerifyToken(token);
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
    if (Object.keys(req.body)?.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "Please enter complete information to continue",
      });
    }
    const response = await handleSendWarning(req.body);
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error sendAllWarningByID on the server",
    });
  }
};
