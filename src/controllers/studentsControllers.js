import { handleImportStudent } from "../services/index.js";

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
