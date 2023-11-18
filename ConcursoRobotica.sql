-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-11-2023 a las 15:02:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ConcursoRobotica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--

CREATE TABLE `Categoria` (
  `id` int(32) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `id_mod` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Categoria`
--

INSERT INTO `Categoria` (`id`, `categoria`, `id_mod`) VALUES
(31, 'Dos', 46),
(32, 'Zumo', 46);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria_Equipo`
--

CREATE TABLE `Categoria_Equipo` (
  `id` int(32) NOT NULL,
  `id_cat` int(32) NOT NULL,
  `id_equ` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Categoria_Equipo`
--

INSERT INTO `Categoria_Equipo` (`id`, `id_cat`, `id_equ`) VALUES
(12, 32, 15),
(13, 32, 16),
(14, 32, 17),
(15, 32, 18),
(16, 31, 15),
(17, 31, 16),
(18, 31, 24),
(19, 31, 23),
(20, 31, 22),
(21, 32, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Equipo`
--

CREATE TABLE `Equipo` (
  `id` int(32) NOT NULL,
  `equipo` varchar(40) NOT NULL,
  `id_pat` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Equipo`
--

INSERT INTO `Equipo` (`id`, `equipo`, `id_pat`) VALUES
(14, 'Dark', 7),
(15, 'uno', 7),
(16, 'a', 7),
(17, 'r', 7),
(18, 'k', 7),
(20, 'le coq', 12),
(21, 'l', 12),
(22, 'e', 12),
(23, 'c', 12),
(24, 'o', 1),
(25, 'q', 1),
(29, 'u', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Modalidad`
--

CREATE TABLE `Modalidad` (
  `id` int(32) NOT NULL,
  `modalidad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Modalidad`
--

INSERT INTO `Modalidad` (`id`, `modalidad`) VALUES
(49, 'B'),
(46, 'Batallas'),
(52, 'P'),
(36, 'Soluciones Industriales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Participante`
--

CREATE TABLE `Participante` (
  `id` int(32) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `id_equ` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Participante`
--

INSERT INTO `Participante` (`id`, `nombre`, `apellido`, `id_equ`) VALUES
(3, 'Pepe', 'Pedro', 14),
(9, 'Moises', 'Terán', 20),
(10, 'm', 't', 20),
(11, 'mo', 'te', 20),
(12, 'mo', 'te', 14),
(13, 'moi', 'te', 14),
(14, 'mois', 'te', 14),
(15, 'moise', 'te', 14),
(16, 'moise', 'te', 15),
(17, 'moises', 'te', 15),
(18, 'moises', 'ter', 15),
(19, 'moises', 'tera', 15),
(20, 'moises', 'tera', 16),
(21, 'moiss', 'tera', 16),
(22, 'mois', 'tera', 16),
(23, 'moi', 'tera', 16),
(24, 'moi', 'tera', 17),
(25, 'moi', 'tera', 18),
(26, 'mois', 'tera', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Patrocinador`
--

CREATE TABLE `Patrocinador` (
  `id` int(11) NOT NULL,
  `patrocinador` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Patrocinador`
--

INSERT INTO `Patrocinador` (`id`, `patrocinador`) VALUES
(7, 'KEL'),
(12, 'Otro'),
(1, 'polar'),
(10, 'Trululu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categoria` (`categoria`),
  ADD KEY `id_mod` (`id_mod`);

--
-- Indices de la tabla `Categoria_Equipo`
--
ALTER TABLE `Categoria_Equipo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cat` (`id_cat`),
  ADD KEY `id_equ` (`id_equ`);

--
-- Indices de la tabla `Equipo`
--
ALTER TABLE `Equipo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `equipo` (`equipo`),
  ADD KEY `id_pat` (`id_pat`);

--
-- Indices de la tabla `Modalidad`
--
ALTER TABLE `Modalidad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `modalidad` (`modalidad`);

--
-- Indices de la tabla `Participante`
--
ALTER TABLE `Participante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_equ` (`id_equ`);

--
-- Indices de la tabla `Patrocinador`
--
ALTER TABLE `Patrocinador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `patrocinador` (`patrocinador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `Categoria_Equipo`
--
ALTER TABLE `Categoria_Equipo`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `Equipo`
--
ALTER TABLE `Equipo`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `Modalidad`
--
ALTER TABLE `Modalidad`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `Participante`
--
ALTER TABLE `Participante`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `Patrocinador`
--
ALTER TABLE `Patrocinador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Categoria`
--
ALTER TABLE `Categoria`
  ADD CONSTRAINT `Categoria_ibfk_1` FOREIGN KEY (`id_mod`) REFERENCES `Modalidad` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Categoria_Equipo`
--
ALTER TABLE `Categoria_Equipo`
  ADD CONSTRAINT `Categoria_Equipo_ibfk_1` FOREIGN KEY (`id_cat`) REFERENCES `Categoria` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Categoria_Equipo_ibfk_2` FOREIGN KEY (`id_equ`) REFERENCES `Equipo` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Equipo`
--
ALTER TABLE `Equipo`
  ADD CONSTRAINT `Equipo_ibfk_1` FOREIGN KEY (`id_pat`) REFERENCES `Patrocinador` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Participante`
--
ALTER TABLE `Participante`
  ADD CONSTRAINT `Participante_ibfk_1` FOREIGN KEY (`id_equ`) REFERENCES `Equipo` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
