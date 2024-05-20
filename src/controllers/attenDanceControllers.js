import * as hendleAttenDance from "../services/attenDanceServices.js";

const classByIdFaculty = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (id) {
      const respon = await hendleAttenDance.classByIdFaculty(id);
      return res.status(200).json(respon);
    } else {
      return res.status(400).json({
        status: 400,
        message: "id isn't found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Error from classByIdFaculty",
    });
  }
};
const courseByIdClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respon = await hendleAttenDance.courseByIdClass(id);
      return res.status(200).json(respon);
    } else {
      return res.status(400).json({
        status: 400,
        message: "id isn't found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Error from classByIdFaculty",
    });
  }
};

const importAttendance = async (req, res) => {
  try {
    const { Faculty, Class, Course, Semester, SchoolYear, DataAttendance } =
      req.body;
    if (
      Faculty &&
      Class &&
      Course &&
      Semester &&
      SchoolYear &&
      DataAttendance
    ) {
      const respon = await hendleAttenDance.importAttendance(req.body);
      return res.status(200).json(respon);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Data is not enough",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Error from importAttendance",
    });
  }
};

const selectAttendance = async (req, res) => {
  try {
    const { IdFaculty, IdClass, IdCourse } = req.query;
    if (IdFaculty && IdClass && IdCourse) {
      const respon = await hendleAttenDance.selectAttendance(
        IdFaculty,
        IdClass,
        IdCourse
      );
      return res.status(200).json(respon);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Data is not enough",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Error from selectAttendance",
    });
  }
};

export {
  classByIdFaculty,
  courseByIdClass,
  importAttendance,
  selectAttendance,
};
