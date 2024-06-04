import {
  handleImportStudent,
  handleStudentById,
  handleAllStudent,
  handleWarningStudent,
  handleSelectProfileStudent,
  handleUpdateImageProfile,
} from "../services/index.js";

export const importStudent = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await handleImportStudent(data);
      return res.status(200).json(result);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Data is required from api importStudent",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from API importStudent",
    });
  }
};

export const allStudent = async (req, res) => {
  try {
    // Len Thong Nhat Nhau
    const { Key, IDFaculty, IDClass } = req.query;
    // validate
    if (!Key || !IDFaculty || !IDClass) {
      return res.status(400).json({
        status: 400,
        message: "Key, IDFaculty, IDClass is required from api allStudent",
      });
    } else {
      const response = await handleAllStudent(Key, IDFaculty, IDClass);
      return res.status(200).json(response);
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from API allStudent",
    });
  }
};
export const studentById = async (req, res) => {
  try {
    const { IDStudent } = req.params;
    if (!IDStudent) {
      return res.status(400).json({
        status: 400,
        message: "IDStudent is required from api studentById",
      });
    }
    const response = await handleStudentById(IDStudent);
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from API studentById",
    });
  }
};

export const WarningStudent = async (req, res) => {
  try {
    const { IDStudent } = req.params;
    if (!IDStudent) {
      return res.status(400).json({
        status: 400,
        message: "IDStudent is required from api WarningStudent",
      });
    }
    const response = await handleWarningStudent(IDStudent);
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from API WarningStudent",
    });
  }
};

export const selectProfileStudent = async (req, res) => {
  try {
    const { IDStudent } = req.params;
    if (!IDStudent) {
      return res.status(400).json({
        status: 400,
        message: "IDStudent is required from api selectProfileStudent",
      });
    }
    const response = await handleSelectProfileStudent(IDStudent);
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from API selectProfileStudent",
    });
  }
};

export const updateImageProfile = async (req, res) => {
  try {
    const { IDStudent, UrlImage } = req.body;
    if (!IDStudent && !UrlImage) {
      return res.status(400).json({
        status: 400,
        message:
          "IDStudent or UrlImage is required from api updateImageProfile",
      });
    }
    const response = await handleUpdateImageProfile(IDStudent, UrlImage);
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from API updateImageProfile",
    });
  }
};
