-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-jamaneffa.alwaysdata.net
-- Generation Time: Oct 11, 2023 at 03:42 PM
-- Server version: 10.6.14-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jamaneffa_beelegantmen`
--
CREATE DATABASE IF NOT EXISTS `jamaneffa_beelegantmen` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `jamaneffa_beelegantmen`;

-- --------------------------------------------------------

--
-- Table structure for table `Addresses`
--

CREATE TABLE `Addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `country` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `cp` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `street_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Addresses`
--

INSERT INTO `Addresses` (`id`, `country`, `state`, `city`, `cp`, `street`, `street_number`) VALUES
(1, 'Argentina', 'Buenos Aires', 'Don Torcuato', '7645', 'San Justo', '10'),
(2, 'Argentina', 'Buenos Aires', 'La Plata', '7463', 'Brandsen', '9'),
(3, 'Argentina', 'Buenos Aires', 'Bahia Blanca', '8000', 'Estomba', '331'),
(4, 'Argentina', 'Buenos Aires', 'CABA', '1452', 'Fuerte Apache', '749');

-- --------------------------------------------------------

--
-- Table structure for table `Brands`
--

CREATE TABLE `Brands` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Brands`
--

INSERT INTO `Brands` (`id`, `name`) VALUES
(1, 'Brooks Brothers'),
(2, 'Colantuono'),
(3, 'Devre'),
(4, 'Ermenegildo Zegna'),
(5, 'Hermes'),
(6, 'Luigi Di Carlo');

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`) VALUES
(1, 'Ambos'),
(2, 'Camisas'),
(3, 'Corbatas'),
(4, 'Pantalones'),
(5, 'Sacos'),
(6, 'Zapatos');

-- --------------------------------------------------------

--
-- Table structure for table `OrderDetails`
--

CREATE TABLE `OrderDetails` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `product_sku` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `OrderDetails`
--

INSERT INTO `OrderDetails` (`id`, `order_id`, `product_sku`, `quantity`, `unit_price`, `total_amount`) VALUES
(1, 1, 7, 1, 6418.50, 6418.50),
(2, 2, 46, 1, 12896.00, 12896.00),
(3, 3, 8, 2, 2387.00, 4774.00);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`id`, `user_id`, `created_date`) VALUES
(1, 3, '2023-10-02 13:13:07'),
(2, 1, '2023-10-04 16:52:25'),
(3, 4, '2023-10-11 13:39:16');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `sku` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `detail` text NOT NULL,
  `price` decimal(10,2) UNSIGNED NOT NULL,
  `discount` int(10) NOT NULL,
  `stock` int(10) NOT NULL,
  `image` varchar(200) NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `brand_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`sku`, `name`, `detail`, `price`, `discount`, `stock`, `image`, `category_id`, `brand_id`) VALUES
(1, 'Traje Zanetti', 'Ut ultrices vel augue vestibulum et ultrices posuere cubilia curae.', 10682.50, 0, 7, 'ambo1.jpg', 1, 1),
(2, 'Pantalon Crudo', 'Jas at meon un polit franes dim est frid saca esta es mun', 12355.50, 50, 4, 'pantalon7.jpg', 4, 2),
(3, 'Traje Rudi', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 2133.50, 50, 7, 'ambo2.jpg', 1, 1),
(4, 'Corbata Azul', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 12301.50, 0, 3, 'corbata4.jpg', 3, 6),
(5, 'Camisa Anglet', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 3420.50, 40, 3, 'camisa1.jpg', 2, 1),
(6, 'Traje Gorks', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 6521.00, 50, 6, 'ambo3.jpg', 1, 1),
(7, 'Saco Rudi', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 6418.50, 10, 4, 'saco1.jpg', 5, 6),
(8, 'Corbata Marron', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 2387.00, 10, 8, 'corbata1.jpg', 3, 2),
(9, 'Camisa Bibineca', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 11631.00, 20, 7, 'camisa2.jpg', 2, 2),
(10, 'Corbata Negra', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 12498.99, 30, 3, 'corbata2.jpg', 3, 6),
(11, 'Traje Classic FX', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 3569.50, 40, 9, 'ambo4.jpg', 1, 1),
(12, 'Saco Romperi', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 13100.50, 40, 0, 'saco2.jpg', 5, 1),
(13, 'Corbata Roja', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 2614.00, 20, 7, 'corbata3.jpg', 3, 6),
(14, 'Pantalon Pata', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 7358.50, 50, 2, 'pantalon1.jpg', 4, 4),
(15, 'Traje Trench Coat', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 12971.00, 20, 0, 'ambo5.jpg', 1, 3),
(16, 'Corbata Rosada', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 8216.50, 0, 5, 'corbata5.jpg', 3, 2),
(17, 'Pantalon Algodon', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 5842.00, 30, 3, 'pantalon2.jpg', 4, 5),
(18, 'Saco Gaulle', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 3963.50, 10, 2, 'saco3.jpg', 5, 6),
(19, 'Traje Blue Navy', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 13039.50, 30, 1, 'ambo6.jpg', 1, 6),
(20, 'Saco Vichii', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 13084.50, 10, 0, 'saco4.jpg', 5, 2),
(21, 'Camisa Baster', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 5682.50, 30, 8, 'camisa3.jpg', 2, 2),
(22, 'Pantalon Comfort', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 10279.00, 40, 2, 'pantalon3.jpg', 4, 6),
(23, 'Zapato Marron Classic', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 10414.00, 10, 2, 'zapato1.jpg', 6, 1),
(24, 'Saco Armani', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 9346.99, 0, 10, 'saco5.jpg', 5, 3),
(25, 'Saco Exchange', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 12333.00, 20, 1, 'saco6.jpg', 5, 6),
(26, 'Zapato Negro Classic', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 12508.00, 10, 8, 'zapato2.jpg', 6, 4),
(27, 'Traje Grey Ash', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 4655.00, 50, 3, 'ambo7.jpg', 1, 4),
(28, 'Pantalon Classic', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 9889.99, 30, 4, 'pantalon4.jpg', 4, 2),
(29, 'Corbata Azul Marino', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 11741.50, 30, 2, 'corbata6.jpg', 3, 2),
(30, 'Corbata Polska', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 9226.50, 40, 9, 'corbata7.jpg', 3, 2),
(31, 'Saco Tarkov', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 5058.50, 50, 7, 'saco7.jpg', 5, 5),
(32, 'Saco Customs', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 12575.50, 20, 5, 'saco8.jpg', 5, 3),
(33, 'Camisa Rovira', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 11397.50, 20, 10, 'camisa4.jpg', 2, 5),
(34, 'Pantalon Rudi', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 13197.00, 20, 2, 'pantalon5.jpg', 4, 3),
(35, 'Zapato Old Money', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 11268.99, 20, 5, 'zapato3.jpg', 6, 2),
(36, 'Saco Woods', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 12505.99, 20, 5, 'saco9.jpg', 5, 5),
(37, 'Corbata Rayada', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 7119.50, 50, 3, 'corbata8.jpg', 3, 6),
(38, 'Zapatos New Age', 'asdfasdf asdf asdf sdf asdf asdf asasd fasdfasd fasd gghdfgh tr yerhjghktyfj', 12000.00, 0, 7, 'image-1696265451128.jpg', 6, 5),
(39, 'Pantalon Old Cl', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 10921.99, 20, 8, 'pantalon6.jpg', 4, 6),
(40, 'Zapatos Carpincho', 'At moure kijmu frestion sable ap tanos repor junti es dim cas', 7450.00, 50, 5, 'zapato4.jpg', 6, 2),
(41, 'Camisa Sebbe', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 5432.99, 0, 0, 'camisa5.jpg', 2, 3),
(42, 'Pantalon Antic', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 9745.50, 10, 6, 'pantalon7.jpg', 4, 3),
(43, 'Saco Old CI', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 8919.99, 50, 1, 'saco10.jpg', 5, 3),
(44, 'Pantalon Menswear', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 8371.50, 40, 1, 'pantalon8.jpg', 4, 5),
(45, 'Zapato Carpincho', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 5711.00, 50, 4, 'zapato5.jpg', 6, 4),
(46, 'Camisa Rot', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 12896.00, 50, 3, 'camisa6.jpg', 2, 5),
(47, 'Saco Bibeneca', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 5319.50, 10, 3, 'saco11.jpg', 5, 3),
(48, 'Pantalon XLC', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 3261.50, 40, 7, 'pantalon9.jpg', 4, 2),
(49, 'Botas Lisas', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 13282.50, 40, 2, 'zapato4.jpg', 6, 2),
(50, 'Traje Azul Suecia', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 12517.50, 20, 2, 'ambo8.jpg', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(200) NOT NULL,
  `admin` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `first_name`, `last_name`, `address_id`, `email`, `password`, `avatar`, `admin`) VALUES
(1, 'Juan Roman', 'Riquelme', 1, 'jrriquelme@email.com', '$2a$10$uhUHu/3Gha6ZLjb0ibndG.tvtXT3yjtQQgf5rgn/3wzM2Xe48adkG', 'avatar-1696260650320.jpg', 0),
(2, 'Martin', 'Palermo', 2, 'mpalermo@email.com', '$2a$10$b0FdSV2TtAnyWaXVN4wna.SH.NGc0nFmo/T67NQ.bzKFqf2I1orLa', 'avatar-1696260699665.jpg', 0),
(3, 'Admin', 'BEM', 3, 'admin@beelegantmen.com', '$2a$10$xG8yvS8PwTAv02ZtP2DUdOfmm4I87mpOqfKfCVhwpfEV7CJezGSCy', 'avatar-1696260533019.png', 1),
(4, 'Carlitos', 'Tevez', 4, 'ctevez@gmail.com', '$2a$10$Xv92tAePzSpfDSm3iFeAOuf5uXxoGhF/TISR1kk9uhPKu7CyHb5im', 'avatar-1696436204722.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Addresses`
--
ALTER TABLE `Addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Brands`
--
ALTER TABLE `Brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrdersDetails_ibfk_1` (`product_sku`) USING BTREE,
  ADD KEY `OrderDetails_ibfk_1` (`order_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`sku`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Users_ibfk_1` (`address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Addresses`
--
ALTER TABLE `Addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Brands`
--
ALTER TABLE `Brands`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `sku` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD CONSTRAINT `OrderDetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
  ADD CONSTRAINT `OrderDetails_ibfk_2` FOREIGN KEY (`product_sku`) REFERENCES `Products` (`sku`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`),
  ADD CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `Brands` (`id`);

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `Addresses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
