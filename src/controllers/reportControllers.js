import {
  HandleFollowReportFaculty,
  HandleFollowReportClass,
} from "../services/index.js";
export const followReportFaculty = async (_, res) => {
  try {
    const {Key, IDFaculty} = req.query;
    const response = await HandleFollowReportFaculty();
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({});
  }
};

export const followReportClass = async (req, res) => {
  try {
    const response = await HandleFollowReportClass();
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({});
  }
};
