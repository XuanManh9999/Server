const fake = {
  Course: "Lập trình C",
  Teacher: "Nguyễn Đức Thiện",
  Faculity: "Khoa Công Nghệ Thông Tin",
  Class: "DCCNTT12.10.3",
  TotalHours: 30,
  NumberOfCredits: 3,
  FinalExamDate: new Date(),
  DataStudents: [
    { Msv: "20210794", FullName: "Nguyễn Xuân Mạnh", Gender: "Nam" },
  ],
  DataPoint: [
    {
      Frequent: 10,
      MidtermScore: 10,
      FinalExamScore: 10,
      AverangeScore: 10,
      Scores: 4,
      LetterGrades: "A+",
      Note: "ABC",
    },
  ],
};
// Chia nhỏ
/**
 * Đầu tiên lưu giảng viên, Lưu môn học
 * Thêm  User_Course ();
 * Sau đó tiến hành thêm Sinh Viên
 * Rồi Lưu điểm
 * Course (nameCourse, NumberOfCredits, TotalHours, FinalExamDate)
 * User (Msv, FullName, Gender, Role)
 *
 *
 */