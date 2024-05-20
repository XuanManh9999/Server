import { handleYearsStudent } from "../services/index.js";

export const selectYearsStudent = async (req, res) => {
  try {
    const { facultyId } = req.query;
    if (facultyId) {
      const response = await handleYearsStudent({ facultyId });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Faculty is not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error from server with API handleYearsStudent",
    });
  }
};
