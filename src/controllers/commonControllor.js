import {
  handleYearsStudent,
  selectfaculty,
  handleSelectClassByFacultyAndKey,
  handleSelectSemesterByKey
} from "../services/index.js";

export const selectYearsStudent = async (req, res) => {
  try {
    const response = await handleYearsStudent();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error from server with API handleYearsStudent",
    });
  }
};
export const selectFaculty = async (req, res) => {
  try {
    const { key } = req.query;
    if (key) {
      const response = await selectfaculty({ key });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Key is not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Err from Server",
    });
  }
};

export const selectClassByFacultyAndKey = async (req, res) => {
  try {
    const { key, faculty } = req.query;
    if (key && faculty) {
      const response = await handleSelectClassByFacultyAndKey(key, faculty);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Key or Faculty is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error from server with API selectClassByFacultyAndKey",
    });
  }
};

export const selectSemesterByKey = async (req, res) => {
  try {
    const { key } = req.query;
    if (key) {
      const response = await handleSelectSemesterByKey(key);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Key is not found",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An error from server with API selectSemesterByKey",
    });
  }
};
