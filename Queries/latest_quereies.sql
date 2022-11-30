-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2022 at 01:13 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `otp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`username`, `password`, `email`, `role`, `otp`) VALUES
('admin', '$2b$10$qsDcZQWupjgy/ql1yubwMOX9o1sq/dAW3ch2QFOx8LcDiNVJM7jaO', 'iamahmad9211@gmail.com', 'admin', '663768'),
('ahmed10', '$2b$10$RBUjz0X9Jw6Do5fyjz/iwObJjWaIrQiwXPVzVm94gH86i.Wqbo2hO', 'f200282@cfd.nu.edu.pk', 'user', '328353'),
('ahmednaz', '$2b$10$SLXBucEJtrowwZQAb3cCDOzim/exivTTkVMwfxyAHGCXMKSht6986', 'iamahmad9311@gmail.com', 'admin', '944008'),
('anwar1', '$2b$10$4pO8LTOWg/9pesNEg8IoYeakBWacA84arg5b7QedpFN8.ficttYx.', 'anwar.begum375@gmail.com', 'user', '411844'),
('aqsa12', '$2b$10$gFYswwBIG/E.p43J0HNDUunuJ68xomOQB6VqgVV7/N/EF.sL8CCAu', 'iamahmad9211@gmail.com', 'user', ''),
('ashher', '$2b$10$fGCDU8EFOGQFhcnO8bBLT.EJuXMcLBxva.Z/QkrmHyn4B9ESrze86', 'f200193@cfd.nu.edu.pk', 'user', '433205'),
('ayezad', '$2b$10$X2WngCP0C/ku8jIAhKpEw.4.OA/nN5sh4fqyyiwDjq3DmG5bS9r/O', 'f200186@cfd.nu.edu.pk', 'user', '780657'),
('esha', '$2b$10$VIGwFuO1GCxe.jhtMQ5YEO.scD9nBFGhhPcxQKiXOjmWFGe2ysVYm', 'f200322@cfd.nu.edu.pk', 'user', '867437'),
('mashood', '$2b$10$XJU74yYTrQrXFJNwoTPMw.STQt7zuHvHTos/OkUxoLi7sXK9vYeHG', 'f200219@cfd.nu.edu.pk', 'user', '211536');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `prodid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `prodimg` text NOT NULL,
  `prodprice` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `prodname` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `username`, `prodid`, `count`, `prodimg`, `prodprice`, `total`, `prodname`) VALUES
(16, 'esha', 13, 1, 'p2.jpg', 2000, 2000, 'super gold'),
(17, 'ahmed10', 17, 2, 'p2.jpg', 5000, 10000, 'Coffee supersteel');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `prodid` int(11) NOT NULL,
  `reply` text NOT NULL,
  `revid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `username`, `prodid`, `reply`, `revid`) VALUES
(1, 'ahmed10', 13, 'yeah you are right', 1),
(2, 'ahmed10 ', 13, 'great', 1),
(3, 'ayezad ', 13, 'exactly', 2),
(4, 'ahmed10 ', 13, 'okie dokiee', 1),
(5, 'ahmed10 ', 14, 'eggzactly', 4);

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `name` text NOT NULL,
  `email` text NOT NULL,
  `message` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`name`, `email`, `message`, `id`) VALUES
('Ahmed Naz', 'f200282@cfd.nu.edu.pk', 'hello niggas', 2),
('Izna Naveed', 'f200282@cfd.nu.edu.pk', 'ahmed', 3),
('Amna Nazeer', 'iamahmad9211@gmail.com', 'Hello!', 4),
('esha', 'f200322@cfd.nu.edu.pk', 'hiuhgfkjhyufhudhf', 10);

-- --------------------------------------------------------

--
-- Table structure for table `productdetails`
--

CREATE TABLE `productdetails` (
  `prodid` int(11) NOT NULL,
  `prodname` varchar(255) NOT NULL,
  `prodinstock` int(11) NOT NULL,
  `prodbrandname` varchar(255) NOT NULL,
  `prodimg` varchar(255) NOT NULL,
  `proddesc` varchar(255) NOT NULL,
  `prodprice` int(11) NOT NULL,
  `prodwrant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productdetails`
--

INSERT INTO `productdetails` (`prodid`, `prodname`, `prodinstock`, `prodbrandname`, `prodimg`, `proddesc`, `prodprice`, `prodwrant`) VALUES
(13, 'Coffee bronze', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 2000, 1),
(14, 'Coffee platinum', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 2000, 1),
(15, 'Coffee steel', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 2500, 1),
(16, 'Coffee supergold', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 4000, 1),
(17, 'Coffee supersteel', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 5000, 1),
(18, 'Coffee superclass', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 7000, 1),
(19, 'Coffee prestiege', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 120, 1),
(20, 'Coffee latte', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 120, 1),
(21, 'Coffee converse', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 1500, 1),
(22, 'Coffee titanium', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 1400, 1),
(23, 'Coffee granite', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 120, 1),
(24, 'Coffee anthracite', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 9000, 1),
(25, 'Coffee rubic', 100, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 10000, 1),
(26, 'Coffee Perish', 200, 'Esprego', 'p4.jpg', 'very good coffee', 1000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `prodid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `review` text NOT NULL,
  `star` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `prodid`, `username`, `review`, `star`) VALUES
(1, 13, 'ahmed10', 'nice product', 3),
(2, 13, 'ayezad', 'good product', 1),
(3, 13, 'ahmed10', 'yeahhhh', 5),
(4, 14, 'ahmed10', 'yes good product', 5);

-- --------------------------------------------------------

--
-- Table structure for table `teamdetails`
--

CREATE TABLE `teamdetails` (
  `workerid` int(11) NOT NULL,
  `workerfname` varchar(255) NOT NULL,
  `wrokerlname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cnic` bigint(20) NOT NULL,
  `workerpos` varchar(255) NOT NULL,
  `imgpath` varchar(255) NOT NULL,
  `workerdegree` varchar(255) NOT NULL,
  `workerphone` bigint(20) NOT NULL,
  `workerexperience` int(11) NOT NULL,
  `workercareerlevel` varchar(50) NOT NULL,
  `workerdesc` varchar(255) NOT NULL,
  `workerfax` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teamdetails`
--

INSERT INTO `teamdetails` (`workerid`, `workerfname`, `wrokerlname`, `email`, `cnic`, `workerpos`, `imgpath`, `workerdegree`, `workerphone`, `workerexperience`, `workercareerlevel`, `workerdesc`, `workerfax`) VALUES
(62, 'Amnaan', 'Nazeer', 'iamahas@gmail.com', 79789979, 'worker', 'temp3.jpg', 'bachelors in computer science', 798798, 12, 'low-level', '', 908087976),
(64, 'fatima', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(65, 'aqsa', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(66, 'anwar', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(67, 'taimoor', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(68, 'khawaja', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(69, 'ibrar', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(70, 'ayezad', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(71, 'awais', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(72, 'makki', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(73, 'ch', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(74, 'salman', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(75, 'shagufta', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(76, 'iram', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(77, 'maham', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(79, 'tayaba', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(80, 'alina', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(81, 'mehwish', 'aslam', 'iama@gmail.com', 87987988, 'worker', 'temp4.jpg', 'bachelors in computer science', 79798798, 10, 'low-level', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores reiciendis id, rerum iusto quasi soluta omnis architecto possimus officia?', 879989978),
(82, 'Amna', 'Ahmed', 'iamahmad9211@gmail.com', 798798, 'manager', 'temp5.jpg', 'bachelors in computer science', 79879878, 12, 'mid-level', 'undefined', 879879);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prodid` (`prodid`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `prodid` (`prodid`),
  ADD KEY `revid` (`revid`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`prodid`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prodid` (`prodid`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `teamdetails`
--
ALTER TABLE `teamdetails`
  ADD PRIMARY KEY (`workerid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productdetails`
--
ALTER TABLE `productdetails`
  MODIFY `prodid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teamdetails`
--
ALTER TABLE `teamdetails`
  MODIFY `workerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`),
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`revid`) REFERENCES `review` (`id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
