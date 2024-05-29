const fake = {
  Faculty: 'Công Nghệ Thông Tin',
  Class: 'DCCNTT12.10.3',
  Course: 'Lập trình C++',
  Semester: 2,
  SchoolYear: '2021-2022',
  DataAttendance: [
    {
      Msv: '20210794',
      FullName: 'Nguyễn Xuân Mạnh',
      DateOfBirth: '2002-07-01',
      Comment: 'Nhà có việc',
      Attendance: [
        {
          Day: '2021-10-01',
          AttendanceStatus: '3',
        },
        {
          Day: '2022-10-01',
          AttendanceStatus: '',
        },
      ],
    },
  ],
};
// Thêm Day vào bảng attendance
// Sửa SchoolYear thành Date
// Tạo ra thêm bảng comment
 
const fakeJSON =  {
  "Faculty": "Công Nghệ Thông Tin",
  "Class": "DCCNTT12.10.3",
  "Course": "Lập trình C++",
  "Semester": 2,
  "SchoolYear": "2021-2022",
  "DataAttendance": [
    {
      "Msv": "20210794",
      "FullName": "Nguyễn Xuân Mạnh",
      "DateOfBirth": "2002-07-01",
      "Comment": "Nhà có việc",
      "Attendance": [
        {
          "Day": "2021-10-01",
          "AttendanceStatus": "2" 
        },
        {
          "Day": "2022-10-01",
          "AttendanceStatus": ""
        }
      ]
    }
  ]
}

