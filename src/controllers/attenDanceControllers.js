import * as hendleAttenDance from '../services/attenDanceServices.js';
const allFaculty = async (_, res) => {
  try {
    const respon = await hendleAttenDance.allFaculty();
    return res.status(200).json(respon);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Error from allFaculty',
    });
  }
};

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
      message: 'An Error from classByIdFaculty',
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
      message: 'An Error from classByIdFaculty',
    });
  }
};

const importAttendance = async (req, res) => {
  try {
    const data = req.body;
    const respon = await hendleAttenDance.importAttendance(data);
    return res.status(200).json(respon);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Error from importAttendance',
    });
  }
};

export { allFaculty, classByIdFaculty, courseByIdClass, importAttendance };
