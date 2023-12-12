-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 12, 2023 at 06:49 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_ID` varchar(30) NOT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_ID`, `name`, `dept`, `password`) VALUES
(122344, 'asdas', 'cardiology', '$2b$10$xIf0M0y8ahrQIdq9JDN3Ieqkl1TPBsex32C8ifhWGA8Qe3ibgd7bm');

-- --------------------------------------------------------

--
-- Table structure for table `examination`
--

CREATE TABLE `examination` (
  `examination_ID` int(11) NOT NULL,
  `paitent` varchar(30) NOT NULL,
  `doctor` int(11) NOT NULL,
  `symptom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_ID` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `occupation` varchar(50) DEFAULT NULL,
  `city` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_ID`, `password`, `name`, `DOB`, `email`, `phone`, `gender`, `occupation`, `city`) VALUES
('123213', '$2b$10$7o2jzJ6MJ.hbnTmkb4w2V.UcpFeHML2TspTw.4FDrFwR5MLR68.I.', '123123', '2023-11-03', '12312', '123', 'Female', '123123', '123213'),
('1408237458963', '$2b$10$t3OqiBckxOfV.cw16shQPOOVP/Fu.w3sDKmKltshwA0w1cZJfhOdO', 'Pannathat Akkaratornsakul', '2002-11-25', 'pannathat@mail.com', '0807614928', 'Male', 'Student', 'Rangsit'),
('14099031682972', '$2b$10$CCnGcXgHIfNIi3BdLK4VUe3t9358zqJwL1O/Dfefi9NLThq.WSch.', 'Pannarhas aswdkskc', '2002-11-25', 'asdp@mail.com', '0802378572', 'male', 'Student', 'Khonkaen'),
('140990316829722', '$2b$10$mlPT.1SpOsANTAyL5Z/.AOm0T5YQIRSX1eenj8GJok6foc1kh8Zam', 'Pannarhas aswdkskc', '2002-11-25', 'asdp@mail.com', '0802378572', 'male', 'Student', 'Khonkaen'),
('456245876882', '$2b$10$D3EzqvP/suxPT3yKAVo0BeDgjDbRInPZaCr0cbfxFLYzAPHZeCziS', 'Pannathat Akkaratornsakul', '2002-11-25', 'pannathat@mail.com', '0807614928', 'Male', 'Student', 'Rangsit');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_ID`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_ID`);

--
-- Indexes for table `examination`
--
ALTER TABLE `examination`
  ADD PRIMARY KEY (`examination_ID`),
  ADD KEY `paitent` (`paitent`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122345;

--
-- AUTO_INCREMENT for table `examination`
--
ALTER TABLE `examination`
  MODIFY `examination_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `examination`
--
ALTER TABLE `examination`
  ADD CONSTRAINT `examination_ibfk_1` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctor_ID`),
  ADD CONSTRAINT `examination_ibfk_2` FOREIGN KEY (`paitent`) REFERENCES `patients` (`patient_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
