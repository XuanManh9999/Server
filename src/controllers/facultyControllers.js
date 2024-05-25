import {
  handleAddFaculty,
  handleUpdateFaculty,
  handleDeleteFaculty,
  handleImportFaculty,
} from "../services/index.js";

export const addFaculty = async (req, res) => {
  try {
    const { facultyName, founding, desc, email, phoneNumber } = req.body;
    if (!facultyName || !founding || !desc || !email || !phoneNumber) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    } else {
      const response = await handleAddFaculty(req.body);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API addFaculty",
    });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { facultyName, founding, desc, email, phoneNumber, idFaculty } =
      req.body;
    if (
      !facultyName ||
      !founding ||
      !desc ||
      !email ||
      !phoneNumber ||
      !idFaculty
    ) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    } else {
      const response = await handleUpdateFaculty(req.body);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API updateFaculty",
    });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const { idFaculty } = req.params;
    if (!idFaculty) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    } else {
      const response = await handleDeleteFaculty(idFaculty);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API deleteFaculty",
    });
  }
};

export const importFaculty = async (req, res) => {
  try {
    const listFaculty = req.body;
    if (listFaculty && listFaculty?.length > 0) {
      const response = await handleImportFaculty(listFaculty);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "All fields are required With API importFaculty",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API importFaculty",
    });
  }
};