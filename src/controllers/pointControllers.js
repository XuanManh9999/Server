import * as hendlePoint from "../services/pointServices.js";

const importPoint = async (req, res) => {
  try {
    const {
      Course,
      Class,
      Teacher,
      Faculty,
      TotalHours,
      NumberOfCredits,
      FinalExamDate,
      DataStudents,
      DataPoint,
    } = req.body;
    console.log(
      Course,
      Class,
      Teacher,
      Faculty,
      TotalHours,
      NumberOfCredits,
      FinalExamDate,
      DataStudents,
      DataPoint
    );
    if (
      Course &&
      Teacher &&
      Faculty &&
      TotalHours &&
      Class &&
      NumberOfCredits &&
      FinalExamDate &&
      DataStudents &&
      DataPoint
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
      message: "An Err from selectClassByID ",
    });
  }
};

const selectCourseByIdClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const response = await hendlePoint.selectCourseByIdClass(id);
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
      message: "An Error from selectCourseByIdClass",
    });
  }
};

const selectPointClass = async (req, res) => {
  try {
    const { IdFaculty, IdClass, IdCourse } = req.query;
    if (IdFaculty && IdClass && IdCourse) {
      const response = await hendlePoint.selectPointClass({
        IdFaculty,
        IdClass,
        IdCourse,
      });
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Please transmit enough data to be able to retrieve the data",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Error from selectPointClass",
    });
  }
};

const selectPointStudents = async (req, res) => {
  try {
    const { Key, IDFaculty, IDClass, IDCourse, Semester } = req.query;
    // check
    if (Key && IDFaculty && IDClass && IDCourse && Semester) {
      const response = await hendlePoint.HandleSelectPointStudents(
        Key,
        IDFaculty,
        IDClass,
        IDCourse,
        Semester
      );
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message:
          "Please transmit enough data to be able to retrieve the data withAPI selectPointStudents",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An Error from selectPointStudents",
    });
  }
};

export {
  importPoint,
  selectClassByID,
  selectCourseByIdClass,
  selectPointClass,
  selectPointStudents,
};
