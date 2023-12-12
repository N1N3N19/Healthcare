-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 25, 2023 at 10:10 AM
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
-- Database: `healthcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `clinicalencounters`
--

CREATE TABLE `clinicalencounters` (
  `encounterID` int(11) NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `encounterDateTime` datetime DEFAULT NULL,
  `encounterType` varchar(50) DEFAULT NULL,
  `healthcareProvider` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `imagingreports`
--

CREATE TABLE `imagingreports` (
  `imagingReportID` int(11) NOT NULL,
  `encounterID` int(11) DEFAULT NULL,
  `imagingType` varchar(50) DEFAULT NULL,
  `report` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `immunizations`
--

CREATE TABLE `immunizations` (
  `immunizationID` int(11) NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `vaccineName` varchar(255) DEFAULT NULL,
  `dateAdministered` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `labresults`
--

CREATE TABLE `labresults` (
  `labResultID` int(11) NOT NULL,
  `encounterID` int(11) DEFAULT NULL,
  `testName` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `medicalhistory`
--

CREATE TABLE `medicalhistory` (
  `medicalHistoryID` int(11) NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `pastMedicalConditions` varchar(255) DEFAULT NULL,
  `surgicalHistory` varchar(255) DEFAULT NULL,
  `familyMedicalHistory` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `medications`
--

CREATE TABLE `medications` (
  `medicationID` int(11) NOT NULL,
  `encounterID` int(11) DEFAULT NULL,
  `medicationName` varchar(255) DEFAULT NULL,
  `dosage` varchar(50) DEFAULT NULL,
  `administrationInstructions` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patientID` int(11) NOT NULL,
  `fName` varchar(60) DEFAULT NULL,
  `lName` varchar(60) DEFAULT NULL,
  `gender` varchar(30) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vitalsigns`
--

CREATE TABLE `vitalsigns` (
  `vitalSignsID` int(11) NOT NULL,
  `encounterID` int(11) DEFAULT NULL,
  `bloodPressure` varchar(20) DEFAULT NULL,
  `heartRate` int(11) DEFAULT NULL,
  `respiratoryRate` int(11) DEFAULT NULL,
  `bodyTemperature` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clinicalencounters`
--
ALTER TABLE `clinicalencounters`
  ADD PRIMARY KEY (`encounterID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `imagingreports`
--
ALTER TABLE `imagingreports`
  ADD PRIMARY KEY (`imagingReportID`),
  ADD KEY `encounterID` (`encounterID`);

--
-- Indexes for table `immunizations`
--
ALTER TABLE `immunizations`
  ADD PRIMARY KEY (`immunizationID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `labresults`
--
ALTER TABLE `labresults`
  ADD PRIMARY KEY (`labResultID`),
  ADD KEY `encounterID` (`encounterID`);

--
-- Indexes for table `medicalhistory`
--
ALTER TABLE `medicalhistory`
  ADD PRIMARY KEY (`medicalHistoryID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `medications`
--
ALTER TABLE `medications`
  ADD PRIMARY KEY (`medicationID`),
  ADD KEY `encounterID` (`encounterID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patientID`);

--
-- Indexes for table `vitalsigns`
--
ALTER TABLE `vitalsigns`
  ADD PRIMARY KEY (`vitalSignsID`),
  ADD KEY `encounterID` (`encounterID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clinicalencounters`
--
ALTER TABLE `clinicalencounters`
  MODIFY `encounterID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `imagingreports`
--
ALTER TABLE `imagingreports`
  MODIFY `imagingReportID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `immunizations`
--
ALTER TABLE `immunizations`
  MODIFY `immunizationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `labresults`
--
ALTER TABLE `labresults`
  MODIFY `labResultID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicalhistory`
--
ALTER TABLE `medicalhistory`
  MODIFY `medicalHistoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medications`
--
ALTER TABLE `medications`
  MODIFY `medicationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vitalsigns`
--
ALTER TABLE `vitalsigns`
  MODIFY `vitalSignsID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clinicalencounters`
--
ALTER TABLE `clinicalencounters`
  ADD CONSTRAINT `clinicalencounters_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

--
-- Constraints for table `imagingreports`
--
ALTER TABLE `imagingreports`
  ADD CONSTRAINT `imagingreports_ibfk_1` FOREIGN KEY (`encounterID`) REFERENCES `clinicalencounters` (`encounterID`);

--
-- Constraints for table `immunizations`
--
ALTER TABLE `immunizations`
  ADD CONSTRAINT `immunizations_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

--
-- Constraints for table `labresults`
--
ALTER TABLE `labresults`
  ADD CONSTRAINT `labresults_ibfk_1` FOREIGN KEY (`encounterID`) REFERENCES `clinicalencounters` (`encounterID`);

--
-- Constraints for table `medicalhistory`
--
ALTER TABLE `medicalhistory`
  ADD CONSTRAINT `medicalhistory_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

--
-- Constraints for table `medications`
--
ALTER TABLE `medications`
  ADD CONSTRAINT `medications_ibfk_1` FOREIGN KEY (`encounterID`) REFERENCES `clinicalencounters` (`encounterID`);

--
-- Constraints for table `vitalsigns`
--
ALTER TABLE `vitalsigns`
  ADD CONSTRAINT `vitalsigns_ibfk_1` FOREIGN KEY (`encounterID`) REFERENCES `clinicalencounters` (`encounterID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
