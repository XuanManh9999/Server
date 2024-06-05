import {
  HandleFollowReportFaculty,
  HandleFollowReportClass,
} from "../services/index.js";
export const followReportFaculty = async (req, res) => {
  try {
    const { Key, IDFaculty, Semester } = req.query;
    //validate
    if (!Key || !IDFaculty || !Semester) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const response = await HandleFollowReportFaculty(Key, IDFaculty, Semester);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "GET REPORT By Faculty Failed",
    });
  }
};

export const followReportClass = async (req, res) => {
  try {
    const { Key, IDFaculty, IDClass, Semester } = req.query;
    // validate
    if (!Key || !IDFaculty || !IDClass || !Semester) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const response = await HandleFollowReportClass(
      Key,
      IDFaculty,
      IDClass,
      Semester
    );
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({});
  }
};
