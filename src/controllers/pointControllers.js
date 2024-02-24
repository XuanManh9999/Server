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

export { importPoint };
