-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 27 2019 г., 12:50
-- Версия сервера: 5.7.23-log
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `yii2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `dtime_registration` int(10) UNSIGNED NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `telefon` int(11) DEFAULT NULL,
  `role` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `dtime_registration`, `username`, `password`, `email`, `status`, `telefon`, `role`) VALUES
(1, 1554976168, 'demo', '$2y$10$zpaFJpXEtoc0c.evdDBsROOjQZFlFFFUyTjJpCT26wodmWlag0CT2', 'resintegra@mail.ru', 0, 0, NULL),
(3, 1567754207, 'resintegra', '$2y$10$Rko.RLVPSNp5QqTquIb5YOgbXI39MqlJo/5rjE9fiwgUPPLEHWwzq', 'resintegra78@gmail.com', 0, NULL, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT '10',
  `role` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_at` int(10) UNSIGNED NOT NULL,
  `updated_at` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `auth_key`, `password_reset_token`, `email`, `status`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$Rko.RLVPSNp5QqTquIb5YOgbXI39MqlJo/5rjE9fiwgUPPLEHWwzq', 'JrD_irZbai5YrDJUVqGfidMYhM4duIZ-', NULL, '', 10, 10, 0, 255),
(2, 'resintegra', '$2y$10$Rko.RLVPSNp5QqTquIb5YOgbXI39MqlJo/5rjE9fiwgUPPLEHWwzq', '34SfPMsevOUIryUVUoBNMJEj0KpdEFcw', 'fMWQiZh6mrEJPVRtaeDBQ20-KcM_Kl2X_1479291540', 'user@mail.com', 10, 1, 123, 255),
(3, 'user2', '$2y$13$TLN2wmC.y25n6XHHTY2Gx.9SMcm8Gwjmd4DIcPmtDhHFXvaLAEPzW', 'SP_fKAuMVy4SsZeyJrbvSCVT0WDbvgPh', NULL, 'user2@mail.com', 10, 1, 0, 255),
(4, 'user3', '$2y$13$tnTbMFzGCpQs6z8X7y3kju0saq5gjGx6grDoOZEy3BZP0DIC.k3ae', 'zR9c7Tj02DJ7Bt7gp7pPlMB1COjyb1TT', 'ri0RzZ_zOBjAQVREo3glBXJxSUTzRl52_1479288527', 'user3@gmail.com', 10, 1, 1479286550, 255),
(5, 'user4', '$2y$13$cG3niqb3mIoYHMkK4wYsmu3Yb2fh8BOZAfjq0snoBnAl3gcagf.aC', '', NULL, 'user4@mail.com', 10, 1, 1479298455, 255),
(6, 'user5', '$2y$13$l4K7khoBJJMM4U4zMQz72O5W6ONmt2/SZ8K.OxzYfZoNsLgtGTWK6', '', NULL, 'user5@mail.com', 10, 1, 1479300334, 255),
(16, 'Velizar', '$2y$13$iKTwS8GJod4K1lJB0n5Tz.22bDShuB3LHe/Ia8l9GAj.r0PF2lgs2', 'MVGUFqE8RqQEE2ayoo3YDU4gePk8zhgK', NULL, 'velizar@mail.com', 10, 1, 1479981661, 255);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
