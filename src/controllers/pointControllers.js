import * as hendlePoint from "../services/pointServices.js";

const importPoint = async (req, res) => {
  try {
    const {
      Course,
      Class,
      Teacher,
      Faculity,
      TotalHours,
      NumberOfCredits,
      FinalExamDate,
      DataStudents,
      DataPoint,
    } = req.body;
    if (
      Course &&
      Teacher &&
      Faculity &&
      TotalHours &&
      NumberOfCredits &&
      FinalExamDate &&
      DataStudents &&
      DataPoint &&
      Class
    ) {
      const response = await hendlePoint.importPoint(req.body);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message:
          "The data submitted is invalid, please check the data and try again",
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

const selectSeculty = async (_, res) => {
  try {
    const response = await hendlePoint.selectSeculty();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Err from Server",
    });
  }
};

const selectClassByID = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const response = await hendlePoint.selectClassByID(id);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "ID Is undefine or null. Check please",
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

export { importPoint, selectSeculty, selectClassByID };
