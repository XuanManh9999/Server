import { pool as connection } from "../config/db.js";
const handleGetAllStudyPrograms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute("select * from studyprogram");
      resolve({
        status: 200,
        message: `Get data all data studyPrograms done. Is data ${
          result.length > 0 ? "available" : "empty"
        }`,
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const handleImportStudyPrograms = (data) =>
  new Promise(async (resolve, reject) => {
    let IDPrograms;
    let IDBlockKnowledge;
    let connect;
    const Key = "`Key`";
    try {
      connect = await connection.getConnection();

      if (!connect) {
        throw new Error("Connection is undefined or null.");
      }
      await connect.beginTransaction();

      // Kiểm tra xem có tồn tại chưa, nêu tồn tại rồi thì không thêm nữa
      const [nameStudyPrograms] = await connection.execute(
        `SELECT ID FROM studyprogram WHERE ProgramName = ?`,
        [data?.NameStudyPrograms]
      );

      IDPrograms = nameStudyPrograms[0]?.ID || null;

      if (nameStudyPrograms?.length === 0) {
        const [result] = await connection.execute(
          `INSERT INTO studyprogram 
          (ProgramName, ${Key}, CodeStudyProgram,
            EducationalLevel, TypeOfEducation, Diploma, LanguageOfInstruction,
            CompletionTime, CreditNumber, GradingScale, GraduationRequirements, Extend, idFaculty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            data?.NameStudyPrograms,
            data?.Key,
            data?.CodeStudyProgram,
            data?.EducationalLevel,
            data?.TypeOfEducation,
            data?.Diploma,
            data?.LanguageOfInstruction,
            data?.CompletionTime,
            data?.CreditNumber,
            data?.GradingScale,
            data?.GraduationRequirements,
            data?.Extend,
            data?.IDFaculty,
          ]
        );
        IDPrograms = result?.insertId;
        // them Equivalent
        for (let i = 0; i < data?.Equivalent.length; i++) {
          await connection.execute(
            `INSERT INTO equivalent (IDStudyProgram, StudyProgramEquivaletName) VALUES (?, ?)`,
            [IDPrograms, data?.Equivalent[i]]
          );
        }
        // them JobPosition
        for (let i = 0; i < data?.JobPosition.length; i++) {
          await connection.execute(
            `INSERT INTO jobposition (IDStudyProgram, StudyProgramJobPosition) VALUES (?, ?)`,
            [IDPrograms, data?.JobPosition[i]]
          );
        }
        // them DataCourse
        for (let i = 0; i < data?.DataCourse?.length; i++) {
          // check NameBlockKnowledge da ton tai chua
          const [blockKnowledgeCheck] = await connection.execute(
            `SELECT ID FROM blockknowledge WHERE NameBlockKnowledge = ?`,
            [data?.DataCourse[i]?.BlockKnowledge]
          );
          if (blockKnowledgeCheck.length > 0) {
            IDBlockKnowledge = blockKnowledgeCheck[0]?.ID;
          } else {
            // them NameBlockKnowledge
            const [resultBlockKnowledge] = await connection.execute(
              `INSERT INTO blockknowledge (IDStudyProgram, NameBlockKnowledge, Credits) VALUES (?, ?, ?)`,
              [
                IDPrograms,
                data?.DataCourse[i]?.BlockKnowledge,
                data?.DataCourse[i]?.STC,
              ]
            );
            IDBlockKnowledge = resultBlockKnowledge?.insertId;
          }

          // them value (course)
          for (let j = 0; j < data?.DataCourse[i]?.value?.length; j++) {
            // check xem mon hoc da ton tai chua
            const [courseCheck] = await connection.execute(
              `SELECT ID FROM course WHERE CourseCode = ?`,
              [data?.DataCourse[i]?.value[j]?.MHP]
            );

            if (courseCheck.length > 0) {
              await connection.execute(
                `UPDATE course SET IDBlockKnowledge = ?, STT = ?, CourseCode = ?,
                NameCourse = ?, NumberOfCredits = ?, ExerciseTheory = ?, Practice = ?, BigExercise = ?,
                SpecializedProjects = ?, SelfLearning = ?, Semester = ? WHERE ID = ?`,
                [
                  IDBlockKnowledge,
                  data?.DataCourse[i]?.value[j]?.STT,
                  data?.DataCourse[i]?.value[j]?.MHP,
                  data?.DataCourse[i]?.value[j]?.TENHP,
                  data?.DataCourse[i]?.value[j]?.STC,
                  data?.DataCourse[i]?.value[j]?.LT_BT,
                  data?.DataCourse[i]?.value[j]?.TH,
                  data?.DataCourse[i]?.value[j]?.DAMH_BTL,
                  data?.DataCourse[i]?.value[j]?.KLTN_DATN_TT,
                  data?.DataCourse[i]?.value[j]?.GIO_TH,
                  data?.DataCourse[i]?.value[j]?.HK,
                  courseCheck[0]?.ID,
                ]
              );
              // update codecourseprerequisite
              if (data?.DataCourse[i]?.value[j]?.MHPKQ) {
                await connection.execute(
                  `UPDATE codecourseprerequisite SET CodeName = ? WHERE IDCourse = ?`,
                  [data?.DataCourse[i]?.value[j]?.MHPKQ, courseCheck[0]?.ID]
                );
              }
            } else {
              let [course] = await connection.execute(
                `INSERT INTO course
              (IDBlockKnowledge, STT, CourseCode, 
              NameCourse, NumberOfCredits, ExerciseTheory, Practice, BigExercise, 
              SpecializedProjects, SelfLearning, Semester) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  IDBlockKnowledge,
                  data?.DataCourse[i]?.value[j]?.STT,
                  data?.DataCourse[i]?.value[j]?.MHP,
                  data?.DataCourse[i]?.value[j]?.TENHP,
                  data?.DataCourse[i]?.value[j]?.STC,
                  data?.DataCourse[i]?.value[j]?.LT_BT,
                  data?.DataCourse[i]?.value[j]?.TH,
                  data?.DataCourse[i]?.value[j]?.DAMH_BTL,
                  data?.DataCourse[i]?.value[j]?.KLTN_DATN_TT,
                  data?.DataCourse[i]?.value[j]?.GIO_TH,
                  data?.DataCourse[i]?.value[j]?.HK,
                ]
              );
              // them codecourseprerequisite
              if (data?.DataCourse[i]?.value[j]?.MHPKQ) {
                await connection.execute(
                  `INSERT INTO codecourseprerequisite (IDCourse, CodeName) VALUES (?, ?)`,
                  [course?.insertId, data?.DataCourse[i]?.value[j]?.MHPKQ]
                );
              }
              // them course_studyprogram
              await connection.execute(
                `INSERT INTO course_studyprogram (IDCourse, IDStudyProgram) VALUES (?, ?)`,
                [course?.insertId, IDPrograms]
              );
            }
          }
        }
      } else {
        // update data
        await connection.execute(
          `UPDATE studyprogram SET ProgramName = ?, ${Key} = ?, CodeStudyProgram = ?,
          EducationalLevel = ?, TypeOfEducation = ?, Diploma = ?, LanguageOfInstruction = ?,
          CompletionTime = ?, CreditNumber = ?, GradingScale = ?, GraduationRequirements = ?, Extend = ?,
          idFaculty = ?
          WHERE ID = ?`,
          [
            data?.NameStudyPrograms,
            data?.Key,
            data?.CodeStudyProgram,
            data?.EducationalLevel,
            data?.TypeOfEducation,
            data?.Diploma,
            data?.LanguageOfInstruction,
            data?.CompletionTime,
            data?.CreditNumber,
            data?.GradingScale,
            data?.GraduationRequirements,
            data?.Extend,
            data?.IDFaculty,
            IDPrograms,
          ]
        );

        // xoa tat ca mon hoc cua chuong trinh
        await connection.execute(
          `DELETE FROM course_studyprogram WHERE IDStudyProgram = ?`,
          [IDPrograms]
        );

        // xoa trong codecourseprerequisite
        await connection.execute(
          `DELETE FROM codecourseprerequisite WHERE IDCourse IN (
            SELECT ID FROM course WHERE IDBlockKnowledge IN (
              SELECT ID FROM blockknowledge WHERE IDStudyProgram = ?
            )
          )`,
          [IDPrograms]
        );
        // xoa tat ca mon hoc
        await connection.execute(
          `DELETE FROM course 
          WHERE IDBlockKnowledge IN (
              SELECT ID 
              FROM blockknowledge 
              WHERE IDStudyProgram = ?
          )
          `,
          [IDPrograms]
        );
        // xoa tat ca blockknowledge
        await connection.execute(
          `DELETE FROM blockknowledge WHERE IDStudyProgram = ?`,
          [IDPrograms]
        );
        // xoa tat ca equivalent
        await connection.execute(
          `DELETE FROM equivalent WHERE IDStudyProgram = ?`,
          [IDPrograms]
        );
        // xoa tat ca jobposition
        await connection.execute(
          `DELETE FROM jobposition WHERE IDStudyProgram = ?`,
          [IDPrograms]
        );
        // them moi tu dau

        // them Equivalent
        for (let i = 0; i < data?.Equivalent.length; i++) {
          await connection.execute(
            `INSERT INTO equivalent (IDStudyProgram, StudyProgramEquivaletName) VALUES (?, ?)`,
            [IDPrograms, data?.Equivalent[i]]
          );
        }
        // them JobPosition
        for (let i = 0; i < data?.JobPosition.length; i++) {
          await connection.execute(
            `INSERT INTO jobposition (IDStudyProgram, StudyProgramJobPosition) VALUES (?, ?)`,
            [IDPrograms, data?.JobPosition[i]]
          );
        }
        // them DataCourse
        for (let i = 0; i < data?.DataCourse?.length; i++) {
          // check NameBlockKnowledge da ton tai chua
          const [blockKnowledgeCheck] = await connection.execute(
            `SELECT ID FROM blockknowledge WHERE NameBlockKnowledge = ?`,
            [data?.DataCourse[i]?.BlockKnowledge]
          );
          if (blockKnowledgeCheck.length > 0) {
            IDBlockKnowledge = blockKnowledgeCheck[0]?.ID;
          } else {
            // them NameBlockKnowledge
            const [resultBlockKnowledge] = await connection.execute(
              `INSERT INTO blockknowledge (IDStudyProgram, NameBlockKnowledge, Credits) VALUES (?, ?, ?)`,
              [
                IDPrograms,
                data?.DataCourse[i]?.BlockKnowledge,
                data?.DataCourse[i]?.STC,
              ]
            );
            IDBlockKnowledge = resultBlockKnowledge?.insertId;
          }

          // them value (course)
          for (let j = 0; j < data?.DataCourse[i]?.value?.length; j++) {
            // check xem mon hoc da ton tai chua
            const [courseCheck] = await connection.execute(
              `SELECT ID FROM course WHERE CourseCode = ?`,
              [data?.DataCourse[i]?.value[j]?.MHP]
            );

            if (courseCheck.length > 0) {
              await connection.execute(
                `UPDATE course SET IDBlockKnowledge = ?, STT = ?, CourseCode = ?,
                NameCourse = ?, NumberOfCredits = ?, ExerciseTheory = ?, Practice = ?, BigExercise = ?,
                SpecializedProjects = ?, SelfLearning = ?, Semester = ? WHERE ID = ?`,
                [
                  IDBlockKnowledge,
                  data?.DataCourse[i]?.value[j]?.STT,
                  data?.DataCourse[i]?.value[j]?.MHP,
                  data?.DataCourse[i]?.value[j]?.TENHP,
                  data?.DataCourse[i]?.value[j]?.STC,
                  data?.DataCourse[i]?.value[j]?.LT_BT,
                  data?.DataCourse[i]?.value[j]?.TH,
                  data?.DataCourse[i]?.value[j]?.DAMH_BTL,
                  data?.DataCourse[i]?.value[j]?.KLTN_DATN_TT,
                  data?.DataCourse[i]?.value[j]?.GIO_TH,
                  data?.DataCourse[i]?.value[j]?.HK,
                  courseCheck[0]?.ID,
                ]
              );
              // update codecourseprerequisite
              if (data?.DataCourse[i]?.value[j]?.MHPKQ) {
                await connection.execute(
                  `UPDATE codecourseprerequisite SET CodeName = ? WHERE IDCourse = ?`,
                  [data?.DataCourse[i]?.value[j]?.MHPKQ, courseCheck[0]?.ID]
                );
              }
            } else {
              let [course] = await connection.execute(
                `INSERT INTO course
              (IDBlockKnowledge, STT, CourseCode, 
              NameCourse, NumberOfCredits, ExerciseTheory, Practice, BigExercise, 
              SpecializedProjects, SelfLearning, Semester) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  IDBlockKnowledge,
                  data?.DataCourse[i]?.value[j]?.STT,
                  data?.DataCourse[i]?.value[j]?.MHP,
                  data?.DataCourse[i]?.value[j]?.TENHP,
                  data?.DataCourse[i]?.value[j]?.STC,
                  data?.DataCourse[i]?.value[j]?.LT_BT,
                  data?.DataCourse[i]?.value[j]?.TH,
                  data?.DataCourse[i]?.value[j]?.DAMH_BTL,
                  data?.DataCourse[i]?.value[j]?.KLTN_DATN_TT,
                  data?.DataCourse[i]?.value[j]?.GIO_TH,
                  data?.DataCourse[i]?.value[j]?.HK,
                ]
              );
              // them codecourseprerequisite
              if (data?.DataCourse[i]?.value[j]?.MHPKQ) {
                await connection.execute(
                  `INSERT INTO codecourseprerequisite (IDCourse, CodeName) VALUES (?, ?)`,
                  [course?.insertId, data?.DataCourse[i]?.value[j]?.MHPKQ]
                );
              }
              // them course_studyprogram
              await connection.execute(
                `INSERT INTO course_studyprogram (IDCourse, IDStudyProgram) VALUES (?, ?)`,
                [course?.insertId, IDPrograms]
              );
            }
          }
        }
      }
      await connect.commit();
      resolve({
        status: 200,
        message: "Import dữ liệu thành công",
      });
    } catch (err) {
      await connect.rollback();

      reject(err);
    }
  });

export { handleGetAllStudyPrograms, handleImportStudyPrograms };
