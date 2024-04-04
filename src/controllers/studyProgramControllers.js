import * as hendleStudyProgramServices from '../services/studyProgramServices.js';

const getAllStudyPrograms = async (_, res) => {
  try {
    const respon = await hendleStudyProgramServices.getAllStudyPrograms();
    return res.status(200).json(respon);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'An Error from getAllStudyPrograms',
    });
  }
};

export { getAllStudyPrograms };
