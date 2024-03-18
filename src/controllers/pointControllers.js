import * as hendlePoint from '../services/pointServices.js';

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
          'The data submitted is invalid, please check the data and try again',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Err from Server',
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
      message: 'An Err from Server',
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
        message: 'ID Is undefine or null. Check please',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Err from selectClassByID ',
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
        message: 'ID Is undefine or null. Check please',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Error from selectCourseByIdClass',
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
        message: 'Please transmit enough data to be able to retrieve the data',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Error from selectPointClass',
    });
  }
};

export {
  importPoint,
  selectSeculty,
  selectClassByID,
  selectCourseByIdClass,
  selectPointClass,
};
