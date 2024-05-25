import {
  heandleCreateClass,
  heandleUpdateClass,
  heandleDeleteClass,
  heandleSelectClassByIdFaculty,
  handleDataClass,
} from "../services/index.js";

export const createClass = async (req, res) => {
  try {
    const { NameClass, IDFaculty } = req.body;
    if (NameClass && IDFaculty) {
      const response = await heandleCreateClass({ NameClass, IDFaculty });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: NameClass
          ? "IDFaculty is not found"
          : "NameClass is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API createClass",
    });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { IDClass, NameClass, IDFaculty } = req.body;
    if (IDClass && NameClass && IDFaculty) {
      const response = await heandleUpdateClass({
        IDClass,
        NameClass,
        IDFaculty,
      });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "IDClass or NameClass or IDFaculty is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API updateClass",
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { IDClass } = req.params;
    if (IDClass) {
      const response = await heandleDeleteClass({ IDClass });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "IDClass is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API deleteClass",
    });
  }
};

export const selectClassByIdFaculty = async (req, res) => {
  try {
    const { IDFaculty } = req.query;
    if (IDFaculty) {
      const response = await heandleSelectClassByIdFaculty({ IDFaculty });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "IDFaculty is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API selectClassByIdFaculty",
    });
  }
};

export const importClass = async (req, res) => {
  try {
    const dataClass = req.body;
    if (dataClass && dataClass?.length > 0) {
      const response = await handleDataClass(dataClass);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "DataClass is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An Error From Server With API importClass",
    });
  }
};
