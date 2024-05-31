import {
  handleGetAllStudyPrograms,
  handleImportStudyPrograms,
} from "../services/index.js";

const getAllStudyPrograms = async (_, res) => {
  try {
    const response = await getAllStudyPrograms();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An Error from getAllStudyPrograms",
    });
  }
};

const importStudyPrograms = async (req, res) => {
  try {
    const { NameStudyPrograms, Key, IDFaculty, DataCourse } = req.body;
    if (!NameStudyPrograms || !IDFaculty || !Key || !DataCourse) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required with API importStudyPrograms",
      });
    } else {
      const response = await handleImportStudyPrograms({
        CodeStudyProgram: "",
        EducationalLevel: "",
        TypeOfEducation: "",
        Diploma: "",
        LanguageOfInstruction: "",
        CompletionTime: "",
        CreditNumber: "",
        GradingScale: 0,
        GraduationRequirements: "",
        Extend: "",
        Equivalent: [],
        JobPosition: [],
        DataCourse: [],
        ...req.body,
      });
      return res.status(200).json(response);
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An Error from importStudyPrograms",
    });
  }
};

export { getAllStudyPrograms, importStudyPrograms };
