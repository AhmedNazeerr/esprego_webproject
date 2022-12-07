-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2022 at 08:29 PM
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
  `otp` text NOT NULL,
  `cardno` bigint(20) NOT NULL,
  `imgpath` varchar(255) NOT NULL,
  `cardname` varchar(255) NOT NULL,
  `cvv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`username`, `password`, `email`, `role`, `otp`, `cardno`, `imgpath`, `cardname`, `cvv`) VALUES
('admin', '$2b$10$qsDcZQWupjgy/ql1yubwMOX9o1sq/dAW3ch2QFOx8LcDiNVJM7jaO', 'iamahmad9211@gmail.com', 'admin', '663768', 0, 'user.png', '0', 0),
('ahmed10', '$2b$10$RBUjz0X9Jw6Do5fyjz/iwObJjWaIrQiwXPVzVm94gH86i.Wqbo2hO', 'f200282@cfd.nu.edu.pk', 'user', '328353', 111111111111111, 'user.png', 'ahmed10', 1234),
('esha', '$2b$10$VIGwFuO1GCxe.jhtMQ5YEO.scD9nBFGhhPcxQKiXOjmWFGe2ysVYm', 'f200322@cfd.nu.edu.pk', 'user', '867437', 0, '', '0', 0);

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
-- Table structure for table `eachearndetails`
--

CREATE TABLE `eachearndetails` (
  `id` int(11) NOT NULL,
  `prodid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `prodcount` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `prodname` text NOT NULL,
  `earnid` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `date` text NOT NULL,
  `orderid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `eachorderdetails`
--

CREATE TABLE `eachorderdetails` (
  `id` int(11) NOT NULL,
  `prodid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `prodcount` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `prodname` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `state` text NOT NULL,
  `zip` int(11) NOT NULL,
  `city` text NOT NULL,
  `cardno` int(100) NOT NULL,
  `carddate` text NOT NULL,
  `cvv` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `date` text NOT NULL,
  `subtotal` int(11) NOT NULL,
  `orderstatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eachorderdetails`
--

INSERT INTO `eachorderdetails` (`id`, `prodid`, `username`, `prodcount`, `total`, `prodname`, `address`, `state`, `zip`, `city`, `cardno`, `carddate`, `cvv`, `orderid`, `date`, `subtotal`, `orderstatus`) VALUES
(75, 14, 'ahmed10', 1, 2000, 'Coffee platinum', 'utyutyu', 'yut', 122, 'tyutyutyut', 4444, '0.5454545454545454', 222, 73, '2022/12/3', 2000, 'ordered'),
(77, 15, 'ahmed10', 1, 2500, 'Coffee steel', 'yiuytutyut', 'yutuy', 12, 'yututyut', 6, 'NaN', 0, 75, '2022/12/3', 2500, 'ordered'),
(79, 14, 'esha', 1, 2000, 'Coffee platinum', 'uyiuyiu', 'yiuyiuy', 0, 'yiuyiuyiu', 4444, '0.5454545454545454', 222, 77, '2022/12/3', 2000, 'shipped');

-- --------------------------------------------------------

--
-- Table structure for table `earndetails`
--

CREATE TABLE `earndetails` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `date` text NOT NULL,
  `subtotal` int(11) NOT NULL,
  `orderid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `cartid` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `orderstatus` varchar(255) NOT NULL,
  `cardno` int(11) NOT NULL,
  `carddate` text NOT NULL,
  `cvv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `username`, `cartid`, `date`, `subtotal`, `orderstatus`, `cardno`, `carddate`, `cvv`) VALUES
(73, 'ahmed10', 130, '2022/12/3', 2000, 'ordered', 0, '', 0),
(75, 'ahmed10', 132, '2022/12/3', 2500, 'ordered', 0, '', 0),
(77, 'esha', 134, '2022/12/3', 2000, 'shipped', 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pastorder`
--

CREATE TABLE `pastorder` (
  `id` int(11) NOT NULL,
  `prodid` int(11) NOT NULL,
  `prodname` text NOT NULL,
  `imgpath` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `prodcount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pastorder`
--

INSERT INTO `pastorder` (`id`, `prodid`, `prodname`, `imgpath`, `username`, `prodcount`) VALUES
(5, 14, 'Coffee platinum', 'p2.jpg', 'ahmed10', 63),
(6, 13, 'Coffee bronze', 'p2.jpg', 'ahmed10', 0),
(7, 15, 'Coffee steel', 'p2.jpg', 'ahmed10', 58),
(8, 13, 'Coffee bronze', 'p2.jpg', 'esha', 0),
(9, 14, 'Coffee platinum', 'p2.jpg', 'ahmed10', 63);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `orderid` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `cardno` int(100) NOT NULL,
  `cvv` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `username`, `orderid`, `subtotal`, `cardno`, `cvv`, `status`) VALUES
(41, 'ahmed10', 73, 2000, 4444, 222, 'Successfull'),
(42, 'ahmed10', 74, 2000, 5555, 222, 'Successfull'),
(45, 'esha', 77, 2000, 4444, 222, 'Successfull'),
(46, 'ahmed10', 78, 2000, 4444, 222, 'Successfull'),
(48, 'ahmed10', 80, 2000, 5555, 222, 'Successfull');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `price` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(13, 'Coffee bronze', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 2000, 1),
(14, 'Coffee platinum', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 2000, 1),
(15, 'Coffee steel', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 2500, 1),
(16, 'Coffee supergold', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 4000, 1),
(17, 'Coffee supersteel', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 5000, 1),
(18, 'Coffee superclass', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 7000, 1),
(19, 'Coffee prestiege', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 120, 1),
(20, 'Coffee latte', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 120, 1),
(21, 'Coffee converse', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 1500, 1),
(22, 'Coffee titanium', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 1400, 1),
(23, 'Coffee granite', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 120, 1),
(24, 'Coffee anthracite', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 9000, 1),
(25, 'Coffee rubic', 63, 'nescafe', 'p2.jpg', 'very tasty coffee when you need to get a boost', 10000, 1),
(26, 'Coffee Perish', 63, 'Esprego', 'p4.jpg', 'very good coffee', 1000, 2);

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
  ADD KEY `cart_ibfk_1` (`prodid`),
  ADD KEY `cart_ibfk_2` (`username`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_ibfk_1` (`username`),
  ADD KEY `comment_ibfk_2` (`prodid`),
  ADD KEY `comment_ibfk_3` (`revid`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eachearndetails`
--
ALTER TABLE `eachearndetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prodid` (`prodid`),
  ADD KEY `username` (`username`),
  ADD KEY `earnid` (`earnid`);

--
-- Indexes for table `eachorderdetails`
--
ALTER TABLE `eachorderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eachorderdetails_ibfk_1` (`orderid`),
  ADD KEY `eachorderdetails_ibfk_3` (`username`),
  ADD KEY `eachorderdetails_ibfk_2` (`prodid`);

--
-- Indexes for table `earndetails`
--
ALTER TABLE `earndetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderdetails_ibfk_2` (`username`);

--
-- Indexes for table `pastorder`
--
ALTER TABLE `pastorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pastorder_ibfk_1` (`prodid`),
  ADD KEY `pastorder_ibfk_2` (`username`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `payment_ibfk_2` (`orderid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
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
  ADD KEY `review_ibfk_1` (`prodid`),
  ADD KEY `review_ibfk_2` (`username`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

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
-- AUTO_INCREMENT for table `eachearndetails`
--
ALTER TABLE `eachearndetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `eachorderdetails`
--
ALTER TABLE `eachorderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `earndetails`
--
ALTER TABLE `earndetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `pastorder`
--
ALTER TABLE `pastorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=441;

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
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`revid`) REFERENCES `review` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `eachearndetails`
--
ALTER TABLE `eachearndetails`
  ADD CONSTRAINT `eachearndetails_ibfk_1` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`) ON DELETE CASCADE,
  ADD CONSTRAINT `eachearndetails_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `eachearndetails_ibfk_3` FOREIGN KEY (`earnid`) REFERENCES `earndetails` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `eachorderdetails`
--
ALTER TABLE `eachorderdetails`
  ADD CONSTRAINT `eachorderdetails_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orderdetails` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eachorderdetails_ibfk_2` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `eachorderdetails_ibfk_3` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `earndetails`
--
ALTER TABLE `earndetails`
  ADD CONSTRAINT `earndetails_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `pastorder`
--
ALTER TABLE `pastorder`
  ADD CONSTRAINT `pastorder_ibfk_1` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`) ON DELETE CASCADE,
  ADD CONSTRAINT `pastorder_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`prodid`) REFERENCES `productdetails` (`prodid`) ON DELETE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`username`) REFERENCES `account` (`username`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
