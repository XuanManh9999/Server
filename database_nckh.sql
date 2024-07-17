-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2024 at 06:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo_dakh`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ID` int(11) NOT NULL,
  `ActivityName` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Time` datetime DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `categoryId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articlecategory`
--

CREATE TABLE `articlecategory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `ID` int(11) NOT NULL,
  `AttendanceStatus` varchar(255) DEFAULT NULL,
  `Day` date DEFAULT NULL,
  `Semester` int(255) DEFAULT NULL,
  `SchoolYear` varchar(255) DEFAULT NULL,
  `IDStudent` int(11) DEFAULT NULL,
  `IDTeacher` int(11) DEFAULT NULL,
  `IDCourse` int(11) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blockknowledge`
--

CREATE TABLE `blockknowledge` (
  `ID` int(11) NOT NULL,
  `NameBlockKnowledge` varchar(255) DEFAULT NULL,
  `Credits` int(11) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `ID` int(11) NOT NULL,
  `NameClass` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IDFaculty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_course`
--

CREATE TABLE `class_course` (
  `IDCourse` int(11) DEFAULT NULL,
  `IDClass` int(11) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `codecourseprerequisite`
--

CREATE TABLE `codecourseprerequisite` (
  `IDCourse` int(11) DEFAULT NULL,
  `CodeName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `ID` int(11) NOT NULL,
  `NameCourse` varchar(255) DEFAULT NULL,
  `NumberOfCredits` int(11) DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `Schedule` text DEFAULT NULL,
  `TotalHours` int(11) DEFAULT NULL,
  `FinalExamDate` date DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `IDBlockKnowledge` int(11) DEFAULT NULL,
  `STT` int(11) DEFAULT NULL,
  `CourseCode` varchar(255) DEFAULT NULL,
  `ExerciseTheory` int(11) DEFAULT NULL,
  `Practice` int(11) DEFAULT NULL,
  `BigExercise` int(11) DEFAULT NULL,
  `SpecializedProjects` int(11) DEFAULT NULL,
  `SelfLearning` int(11) DEFAULT NULL,
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_documentlibrary`
--

CREATE TABLE `course_documentlibrary` (
  `IDCourse` int(11) NOT NULL,
  `IDDocumentLibrary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_studyprogram`
--

CREATE TABLE `course_studyprogram` (
  `IDCourse` int(11) NOT NULL,
  `IDStudyProgram` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documentlibrary`
--

CREATE TABLE `documentlibrary` (
  `ID` int(11) NOT NULL,
  `NameDOC` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Source` varchar(255) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equivalent`
--

CREATE TABLE `equivalent` (
  `StudyProgramEquivaletName` varchar(255) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `ID` int(11) NOT NULL,
  `FacultyName` varchar(255) DEFAULT NULL,
  `Founding` date DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `function`
--

CREATE TABLE `function` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `ModuleID` int(11) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `functioninrole`
--

CREATE TABLE `functioninrole` (
  `ID` int(11) NOT NULL,
  `FunctionID` int(11) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobposition`
--

CREATE TABLE `jobposition` (
  `StudyProgramJobPosition` varchar(255) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `point`
--

CREATE TABLE `point` (
  `ID` int(11) NOT NULL,
  `Frequent` varchar(255) DEFAULT NULL,
  `MidtermScore` float DEFAULT NULL,
  `FinalExamScore` float DEFAULT NULL,
  `AverageScore` float DEFAULT NULL,
  `Scores` float DEFAULT NULL,
  `LetterGrades` varchar(255) DEFAULT NULL,
  `ScoreScale10` float DEFAULT NULL,
  `ScoreScale4` float DEFAULT NULL,
  `ExcludingTBC` tinyint(1) DEFAULT NULL,
  `Semester` int(11) DEFAULT NULL,
  `Note` text DEFAULT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDCourse` int(11) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relatives`
--

CREATE TABLE `relatives` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `permanentResidence` varchar(255) DEFAULT NULL,
  `ethnicity` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Role` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reward`
--

CREATE TABLE `reward` (
  `ID` int(11) NOT NULL,
  `RewardName` varchar(255) DEFAULT NULL,
  `ReceivedDate` date DEFAULT NULL,
  `Achievements` text DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `Contact` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`ID`, `Name`, `Order`) VALUES
(1, 'Admin', 1),
(2, 'Lecturers', 2),
(3, 'User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `studyprogram`
--

CREATE TABLE `studyprogram` (
  `ID` int(11) NOT NULL,
  `ProgramName` varchar(255) DEFAULT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `CreditNumber` varchar(255) DEFAULT NULL,
  `CompletionTime` varchar(255) DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `IdFaculty` int(11) DEFAULT NULL,
  `CodeStudyProgram` varchar(255) DEFAULT NULL,
  `EducationalLevel` varchar(255) DEFAULT NULL,
  `TypeOfEducation` varchar(255) DEFAULT NULL,
  `Diploma` varchar(255) DEFAULT NULL,
  `LanguageOfInstruction` varchar(255) DEFAULT NULL,
  `GradingScale` int(11) DEFAULT NULL,
  `GraduationRequirements` text DEFAULT NULL,
  `Extend` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Msv` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Avatar` varchar(255) DEFAULT NULL,
  `RefreshToken` varchar(255) DEFAULT NULL,
  `Locked` tinyint(1) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `IDClass` int(11) DEFAULT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `EthnicGroup` varchar(255) DEFAULT NULL,
  `Hometown` text DEFAULT NULL,
  `PermanentResidence` text DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Msv`, `FirstName`, `LastName`, `FullName`, `UserName`, `Password`, `Gender`, `Email`, `Avatar`, `RefreshToken`, `Locked`, `DateOfBirth`, `IDClass`, `Key`, `status`, `EthnicGroup`, `Hometown`, `PermanentResidence`, `PhoneNumber`, `CreateAt`, `UpdateAt`) VALUES
(352, NULL, NULL, NULL, 'admin', 'admin', '$2b$10$9gKuwbDjqnpvwqcJ9z8gjuc1zOyIdc2dr.tz6F7PSEcFFg5ZIpB82', NULL, 'admin@eaut.edu.vn', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUyLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTc2NDg2NzgsImV4cCI6MTc0OTE4NDY3OH0._3yBoFnYJ5ws6v7ibtwUlyCwAw5B_f8q9WdcVn0ItEk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 04:35:40', '2024-06-06 04:37:58'),
(353, NULL, NULL, NULL, 'cvhteaut', 'cvhteaut', '$2b$10$lvOXh4S3FmQ2owQbbYQEi.DHSJuZEQvUgMo7/Rw8wrJlGBAcWHIX6', NULL, 'cvhteaut@eaut.edu.vn', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUzLCJyb2xlIjoiTGVjdHVyZXJzIiwiaWF0IjoxNzE3NjQ4NjQ2LCJleHAiOjE3NDkxODQ2NDZ9.nVsxfeKzN2d87qcGQuzzYX9H8QIjsbFT8ohV2N_Defk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 04:36:29', '2024-06-06 04:37:26');

-- --------------------------------------------------------

--
-- Table structure for table `userinrole`
--

CREATE TABLE `userinrole` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userinrole`
--

INSERT INTO `userinrole` (`ID`, `UserID`, `RoleID`) VALUES
(355, 352, 1),
(356, 353, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDActive` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDCourse` int(11) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_faculty`
--

CREATE TABLE `user_faculty` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDFaculty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_reward`
--

CREATE TABLE `user_reward` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDReward` int(11) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_studyprogram`
--

CREATE TABLE `user_studyprogram` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_warning`
--

CREATE TABLE `user_warning` (
  `IDUser` int(11) NOT NULL,
  `IDWarning` int(11) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `warnings`
--

CREATE TABLE `warnings` (
  `ID` int(11) NOT NULL,
  `NameWarning` varchar(255) DEFAULT NULL,
  `SBN` int(11) DEFAULT NULL,
  `TTHP` varchar(255) DEFAULT NULL,
  `STC_NO` int(11) DEFAULT NULL,
  `GPA` float DEFAULT NULL,
  `LevelWarning` int(11) DEFAULT NULL,
  `ContentWarning` text DEFAULT NULL,
  `Author` int(11) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `articlecategory`
--
ALTER TABLE `articlecategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDStudent` (`IDStudent`),
  ADD KEY `IDTeacher` (`IDTeacher`),
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `blockknowledge`
--
ALTER TABLE `blockknowledge`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NameClass` (`NameClass`),
  ADD KEY `fk_IDFaculty` (`IDFaculty`);

--
-- Indexes for table `class_course`
--
ALTER TABLE `class_course`
  ADD KEY `IDCourse` (`IDCourse`),
  ADD KEY `IDClass` (`IDClass`);

--
-- Indexes for table `codecourseprerequisite`
--
ALTER TABLE `codecourseprerequisite`
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NameCourse` (`NameCourse`),
  ADD KEY `IDBlockKnowledge` (`IDBlockKnowledge`);

--
-- Indexes for table `course_documentlibrary`
--
ALTER TABLE `course_documentlibrary`
  ADD PRIMARY KEY (`IDCourse`,`IDDocumentLibrary`),
  ADD KEY `IDDocumentLibrary` (`IDDocumentLibrary`);

--
-- Indexes for table `course_studyprogram`
--
ALTER TABLE `course_studyprogram`
  ADD PRIMARY KEY (`IDCourse`,`IDStudyProgram`),
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `documentlibrary`
--
ALTER TABLE `documentlibrary`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `equivalent`
--
ALTER TABLE `equivalent`
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `function`
--
ALTER TABLE `function`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ModuleID` (`ModuleID`);

--
-- Indexes for table `functioninrole`
--
ALTER TABLE `functioninrole`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FunctionID` (`FunctionID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `jobposition`
--
ALTER TABLE `jobposition`
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `relatives`
--
ALTER TABLE `relatives`
  ADD PRIMARY KEY (`id`,`studentId`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `reward`
--
ALTER TABLE `reward`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `studyprogram`
--
ALTER TABLE `studyprogram`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IdFaculty` (`IdFaculty`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Msv` (`Msv`),
  ADD KEY `FK_user_class` (`IDClass`);

--
-- Indexes for table `userinrole`
--
ALTER TABLE `userinrole`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDActive` (`IDActive`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `user_faculty`
--
ALTER TABLE `user_faculty`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDFaculty` (`IDFaculty`);

--
-- Indexes for table `user_reward`
--
ALTER TABLE `user_reward`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDReward` (`IDReward`);

--
-- Indexes for table `user_studyprogram`
--
ALTER TABLE `user_studyprogram`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `user_warning`
--
ALTER TABLE `user_warning`
  ADD PRIMARY KEY (`IDUser`,`IDWarning`),
  ADD KEY `IDWarning` (`IDWarning`);

--
-- Indexes for table `warnings`
--
ALTER TABLE `warnings`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articlecategory`
--
ALTER TABLE `articlecategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8076;

--
-- AUTO_INCREMENT for table `blockknowledge`
--
ALTER TABLE `blockknowledge`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `documentlibrary`
--
ALTER TABLE `documentlibrary`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `function`
--
ALTER TABLE `function`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `functioninrole`
--
ALTER TABLE `functioninrole`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `point`
--
ALTER TABLE `point`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=698;

--
-- AUTO_INCREMENT for table `relatives`
--
ALTER TABLE `relatives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `reward`
--
ALTER TABLE `reward`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `studyprogram`
--
ALTER TABLE `studyprogram`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;

--
-- AUTO_INCREMENT for table `userinrole`
--
ALTER TABLE `userinrole`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=357;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=843;

--
-- AUTO_INCREMENT for table `user_faculty`
--
ALTER TABLE `user_faculty`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `user_reward`
--
ALTER TABLE `user_reward`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_studyprogram`
--
ALTER TABLE `user_studyprogram`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warnings`
--
ALTER TABLE `warnings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `articlecategory` (`id`),
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`ID`);

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`IDStudent`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`IDTeacher`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `blockknowledge`
--
ALTER TABLE `blockknowledge`
  ADD CONSTRAINT `blockknowledge_ibfk_1` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `fk_IDFaculty` FOREIGN KEY (`IDFaculty`) REFERENCES `faculty` (`ID`);

--
-- Constraints for table `class_course`
--
ALTER TABLE `class_course`
  ADD CONSTRAINT `class_course_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`),
  ADD CONSTRAINT `class_course_ibfk_2` FOREIGN KEY (`IDClass`) REFERENCES `class` (`ID`);

--
-- Constraints for table `codecourseprerequisite`
--
ALTER TABLE `codecourseprerequisite`
  ADD CONSTRAINT `codecourseprerequisite_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`IDBlockKnowledge`) REFERENCES `blockknowledge` (`ID`);

--
-- Constraints for table `course_documentlibrary`
--
ALTER TABLE `course_documentlibrary`
  ADD CONSTRAINT `course_documentlibrary_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`),
  ADD CONSTRAINT `course_documentlibrary_ibfk_2` FOREIGN KEY (`IDDocumentLibrary`) REFERENCES `documentlibrary` (`ID`);

--
-- Constraints for table `course_studyprogram`
--
ALTER TABLE `course_studyprogram`
  ADD CONSTRAINT `course_studyprogram_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`),
  ADD CONSTRAINT `course_studyprogram_ibfk_2` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `equivalent`
--
ALTER TABLE `equivalent`
  ADD CONSTRAINT `equivalent_ibfk_1` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `function`
--
ALTER TABLE `function`
  ADD CONSTRAINT `function_ibfk_1` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ID`);

--
-- Constraints for table `functioninrole`
--
ALTER TABLE `functioninrole`
  ADD CONSTRAINT `functioninrole_ibfk_1` FOREIGN KEY (`FunctionID`) REFERENCES `function` (`ID`),
  ADD CONSTRAINT `functioninrole_ibfk_2` FOREIGN KEY (`RoleID`) REFERENCES `role` (`ID`);

--
-- Constraints for table `jobposition`
--
ALTER TABLE `jobposition`
  ADD CONSTRAINT `jobposition_ibfk_1` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `point`
--
ALTER TABLE `point`
  ADD CONSTRAINT `point_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `point_ibfk_2` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `relatives`
--
ALTER TABLE `relatives`
  ADD CONSTRAINT `relatives_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `user` (`ID`);

--
-- Constraints for table `studyprogram`
--
ALTER TABLE `studyprogram`
  ADD CONSTRAINT `studyprogram_ibfk_1` FOREIGN KEY (`IdFaculty`) REFERENCES `faculty` (`ID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_class` FOREIGN KEY (`IDClass`) REFERENCES `class` (`ID`);

--
-- Constraints for table `userinrole`
--
ALTER TABLE `userinrole`
  ADD CONSTRAINT `userinrole_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `userinrole_ibfk_2` FOREIGN KEY (`RoleID`) REFERENCES `role` (`ID`);

--
-- Constraints for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_activity_ibfk_2` FOREIGN KEY (`IDActive`) REFERENCES `activity` (`ID`);

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `user_faculty`
--
ALTER TABLE `user_faculty`
  ADD CONSTRAINT `user_faculty_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_faculty_ibfk_2` FOREIGN KEY (`IDFaculty`) REFERENCES `faculty` (`ID`);

--
-- Constraints for table `user_reward`
--
ALTER TABLE `user_reward`
  ADD CONSTRAINT `user_reward_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_reward_ibfk_2` FOREIGN KEY (`IDReward`) REFERENCES `reward` (`ID`);

--
-- Constraints for table `user_studyprogram`
--
ALTER TABLE `user_studyprogram`
  ADD CONSTRAINT `user_studyprogram_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_studyprogram_ibfk_2` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `user_warning`
--
ALTER TABLE `user_warning`
  ADD CONSTRAINT `user_warning_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_warning_ibfk_2` FOREIGN KEY (`IDWarning`) REFERENCES `warnings` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
