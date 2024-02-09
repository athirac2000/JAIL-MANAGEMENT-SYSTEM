-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2023 at 05:55 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_jail`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendence`
--

CREATE TABLE `attendence` (
  `id` int(11) NOT NULL,
  `date` text DEFAULT NULL,
  `prisoner_id` int(11) DEFAULT NULL,
  `attendance` varchar(100) DEFAULT NULL,
  `jail_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendence`
--

INSERT INTO `attendence` (`id`, `date`, `prisoner_id`, `attendance`, `jail_id`) VALUES
(25, '2023-07-13', 2, 'Present', 1),
(26, '2023-07-13', 7, 'Absent', 1),
(27, '2023-07-15', 2, 'Present', 1),
(28, '2023-07-15', 7, 'Present', 1),
(29, '2023-07-26', 2, 'Present', 1),
(30, '2023-07-26', 7, 'Present', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dig`
--

CREATE TABLE `dig` (
  `id` int(11) NOT NULL,
  `username` varchar(222) NOT NULL,
  `contact` bigint(14) NOT NULL,
  `gender` varchar(22) NOT NULL,
  `place` text NOT NULL,
  `loginid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dig`
--

INSERT INTO `dig` (`id`, `username`, `contact`, `gender`, `place`, `loginid`) VALUES
(2, 'Mishal Kumar IPS', 7845124578, 'Male', 'Kannur', 2),
(6, 'Prathap Metha', 9078654332, 'Male', 'trivandrum', 10),
(22, 'Sreelekha IPS', 9563263526, 'Female', 'Kochi', 22),
(24, 'kishore', 1234567890, 'Female', 'kannur', 30);

-- --------------------------------------------------------

--
-- Table structure for table `generalduty`
--

CREATE TABLE `generalduty` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `jailid` varchar(100) DEFAULT NULL,
  `loginid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generalduty`
--

INSERT INTO `generalduty` (`id`, `name`, `contact`, `jailid`, `loginid`) VALUES
(18, 'Sathyapalan', '9087907865', '1', 18),
(21, 'Fana Farhan', '986789764', '1', 21);

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`id`, `title`, `description`) VALUES
(2, 'Remand Case', 'In common law jurisdictions, remand refers to the adjournment (continuance) of criminal proceedings'),
(7, 'Petty Case', '“petty offence” means any offence punishable only with fine not exceeding one thousand rupees.');

-- --------------------------------------------------------

--
-- Table structure for table `jails`
--

CREATE TABLE `jails` (
  `id` int(11) NOT NULL,
  `jailname` varchar(222) DEFAULT NULL,
  `place` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(222) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jails`
--

INSERT INTO `jails` (`id`, `jailname`, `place`, `description`, `type`) VALUES
(1, 'Kannur Central Jail', 'Kannur', 'Central Prison, Kannur, is situated in Pallikkunnu in Kannur, Kerala state of India. It was the first Central Jail established in Kerala in the year of 1869.', 'Central Jail'),
(3, 'Poojappura Central Jail', 'trivandrum', 'Poojappura is a suburb of Thiruvananthapuram in India. It is located in the south-east part of the city, surrounded by Jagathi, Karamana, Mudavanmugal and Thirumala.', 'Central Jail'),
(11, 'Ernakulam Central jail', 'Kochi', 'It located east west part', 'Sub Jail');

-- --------------------------------------------------------

--
-- Table structure for table `jailsuperintendent`
--

CREATE TABLE `jailsuperintendent` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `jailid` int(11) NOT NULL,
  `loginid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jailsuperintendent`
--

INSERT INTO `jailsuperintendent` (`id`, `username`, `place`, `contact`, `jailid`, `loginid`) VALUES
(7, 'Muhammed Aslam', 'Kannur', '831929293', 1, 7),
(17, 'ann maria', 'aluva', '9653698569', 3, 26),
(29, 'Kiran', 'Anchal', '9653698569', 3, 29);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `charge` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `title`, `description`, `charge`) VALUES
(2, 'Sweeper', 'Cleaning all the cells and jail surroundings', '340'),
(3, 'Farming', 'Farming vegetables for prisoners', '125'),
(4, 'Rock Crashing', 'This money is saved as prisoner\'s personal savings', '250');

-- --------------------------------------------------------

--
-- Table structure for table `job_assign`
--

CREATE TABLE `job_assign` (
  `id` int(11) NOT NULL,
  `prisoner_id` int(11) DEFAULT NULL,
  `stime` text DEFAULT NULL,
  `etime` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_assign`
--

INSERT INTO `job_assign` (`id`, `prisoner_id`, `stime`, `etime`, `date`, `job_id`) VALUES
(4, 3, '03:12', '05:20', '2023-07-06', 3),
(6, 2, '17:29', '18:29', '2023-06-30', 3),
(7, 2, '09:15', '16:17', '2023-07-13', 2),
(8, 7, '01:00', '05:00', '2023-07-13', 4),
(9, 6, '20:56', '22:58', '2023-07-17', 2);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `usertype` int(11) NOT NULL COMMENT '0:admin, 1:DIG, 2: Superindent, 3:GD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `usertype`) VALUES
(2, 'suresh@gmail.com', '12345678', 1),
(7, 'aslam@gmail.com', '12345678', 2),
(9, 'admin@gmail.com', '12345678', 0),
(10, 'prathap@gmail.com', '12345678', 1),
(17, 'test@gmail.com', '12345678', 3),
(18, 'sathya@gmail.com', '12345678', 3),
(19, 'cggvhhh', '12345678', 3),
(20, 'xcvb', '12345678', 3),
(21, 'fana@gmail.com', '12345678', 3),
(30, 'as@gmail.com', '123456789', 1),
(35, 'ads@gmail.com', '12365478', 3);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `subject`, `message`, `user_id`) VALUES
(1, 'Need New Lists', 'I want new Check and share new prisoners list please.It necessory for the next meeting', 7),
(5, 'I need minar rahman\'s file for cross check it', 'Need File', 7);

-- --------------------------------------------------------

--
-- Table structure for table `prisoner`
--

CREATE TABLE `prisoner` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `crime` text DEFAULT NULL,
  `sdate` date DEFAULT NULL,
  `edate` date DEFAULT NULL,
  `jail_id` int(11) DEFAULT NULL,
  `grade_id` int(11) DEFAULT NULL,
  `cell` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `releavestatus` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prisoner`
--

INSERT INTO `prisoner` (`id`, `name`, `location`, `crime`, `sdate`, `edate`, `jail_id`, `grade_id`, `cell`, `image`, `age`, `gender`, `releavestatus`) VALUES
(2, 'Minar M.s', 'kavalayoor', 'Stole Electrical Equipments', '2023-06-01', '2024-06-13', 1, 2, '13', '1687694540_pris.jpg', '44', 'male', 1),
(3, 'Srintha Mehal', 'Chennai', 'Foeticide', '2023-06-08', '2024-10-03', 3, 2, '95', '1687691038_sav1.jpg', '24', 'female', 0),
(6, 'Keyal T.Peter', 'Trissur', 'Kill Her Toddler', '2023-06-07', '2023-06-15', 3, 2, '13', '1687699171_Kinjal-Patel.jpg', '27', 'female', 0),
(7, 'omana S', 'ootti', 'Killing Her husband', '2023-07-04', '2024-12-11', 1, 2, '112', '1689750496_11-1407735750-edadan-omana.jpg', '33', 'female', 0);

-- --------------------------------------------------------

--
-- Table structure for table `releavingremarks`
--

CREATE TABLE `releavingremarks` (
  `id` int(11) NOT NULL,
  `prisoner_id` int(11) DEFAULT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `releavingremarks`
--

INSERT INTO `releavingremarks` (`id`, `prisoner_id`, `remarks`) VALUES
(1, 2, 'His behavior is good');

-- --------------------------------------------------------

--
-- Table structure for table `replay`
--

CREATE TABLE `replay` (
  `id` int(11) NOT NULL,
  `mid` int(11) DEFAULT NULL,
  `replay` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `replay`
--

INSERT INTO `replay` (`id`, `mid`, `replay`) VALUES
(1, 1, 'Its processing,will send soon');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `requeststatus` int(11) DEFAULT NULL COMMENT '0:initial status\r\n2:passed to dgp\r\n1:approved by dgp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `title`, `description`, `date`, `userid`, `requeststatus`) VALUES
(2, 'Urgent need for an attender in cellno:11', 'Some issues are there.So can\'t handle alone', '2023-07-05', 7, 0),
(4, 'Clean cell:14', 'It\'s too dusty and need staffs for clean it', '2023-07-14', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_procedures`
--

CREATE TABLE `tbl_procedures` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stime` text DEFAULT NULL,
  `etime` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_procedures`
--

INSERT INTO `tbl_procedures` (`id`, `name`, `description`, `stime`, `etime`) VALUES
(1, 'Regular routines', 'Regular routines of prisoners', '08:00', '10:30');

-- --------------------------------------------------------

--
-- Table structure for table `visitorgate`
--

CREATE TABLE `visitorgate` (
  `id` int(11) NOT NULL,
  `prisoner_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `vname` varchar(100) DEFAULT NULL,
  `contact` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitorgate`
--

INSERT INTO `visitorgate` (`id`, `prisoner_id`, `date`, `purpose`, `vname`, `contact`) VALUES
(2, 2, '2023-07-06', 'Visit her husband', 'Anshitha T', '9087906722'),
(4, 7, '2023-07-19', 'collect some details with lawyer', 'Symon', '9788567865');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendence`
--
ALTER TABLE `attendence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dig`
--
ALTER TABLE `dig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generalduty`
--
ALTER TABLE `generalduty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jails`
--
ALTER TABLE `jails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jailsuperintendent`
--
ALTER TABLE `jailsuperintendent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_assign`
--
ALTER TABLE `job_assign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prisoner`
--
ALTER TABLE `prisoner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `releavingremarks`
--
ALTER TABLE `releavingremarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replay`
--
ALTER TABLE `replay`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_procedures`
--
ALTER TABLE `tbl_procedures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitorgate`
--
ALTER TABLE `visitorgate`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendence`
--
ALTER TABLE `attendence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `dig`
--
ALTER TABLE `dig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `generalduty`
--
ALTER TABLE `generalduty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `jails`
--
ALTER TABLE `jails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jailsuperintendent`
--
ALTER TABLE `jailsuperintendent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `job_assign`
--
ALTER TABLE `job_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `prisoner`
--
ALTER TABLE `prisoner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `releavingremarks`
--
ALTER TABLE `releavingremarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `replay`
--
ALTER TABLE `replay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_procedures`
--
ALTER TABLE `tbl_procedures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `visitorgate`
--
ALTER TABLE `visitorgate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
