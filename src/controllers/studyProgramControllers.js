import {
  handleGetAllStudyPrograms,
  handleImportStudyPrograms,
  handleSelectBlockKnowledgeByKeyFaculty,
  handleSelectCourseByKeyFacultyBlockKnowledge
} from "../services/index.js";

const getAllStudyPrograms = async (_, res) => {
  try {
    const response = await handleGetAllStudyPrograms();
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

export const selectBlockKnowledgeByKeyFaculty = async (req, res) => {
  try {
    const { IDFaculty, Key } = req.query;
    if (!IDFaculty && !Key) {
      return res.status(400).json({
        status: 400,
        message:
          "All fields are required with API selectBlockKnowledgeByKeyFaculty",
      });
    } else {
      const response = await handleSelectBlockKnowledgeByKeyFaculty(
        IDFaculty,
        Key
      );
      return res.status(200).json(response);
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An Error from selectBlockKnowledgeByKeyFaculty",
    });
  }
};

export const selectCourseByKeyFacultyBlockKnowledge = async (req, res) => {
  try {
    const { IDFaculty, Key, IDBlockknowledge } = req.query;
    if (!IDFaculty && !Key && !IDBlockknowledge) {
      return res.status(400).json({
        status: 400,
        message:
          "All fields are required with API selectCourseByKeyFacultyBlockKnowledge",
      });
    } else {
      const response = await handleSelectCourseByKeyFacultyBlockKnowledge(
        IDFaculty,
        Key,
        IDBlockknowledge
      );
      return res.status(200).json(response);
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "An Error from selectCourseByKeyFacultyBlockKnowledge",
    });
  }
};

export { getAllStudyPrograms, importStudyPrograms };
