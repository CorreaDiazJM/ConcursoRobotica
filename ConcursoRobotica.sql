-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-11-2023 a las 03:35:26
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
(31, 'Zuo2', 36),
(34, 'Zum', 46),
(37, 'Zuo1', 52),
(42, 'Zuo103234', 49),
(43, 'asdf', 59),
(44, 'Zuo10', 60);

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
(20, 31, 22),
(25, 31, 16),
(37, 37, 25);

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
(16, 'a', 7),
(17, 'r', 7),
(21, 'le coq copia', 16),
(22, 'e', 12),
(24, 'o', 1),
(25, 'de nuevo', 17),
(29, 'u', 1),
(34, 'Drk', 7),
(38, 'Zuo2', 7),
(42, 'equipo', 7);

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
(59, 'nueva'),
(60, 'otra'),
(52, 'P'),
(54, 'Soluciones'),
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
(22, 'mois', 'tera', 16),
(24, 'moi', 'tera', 17),
(32, 'tera', 'mois', 25),
(33, 'tera', 'mois', 16),
(34, 'copia', 'copia', 21);

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
(16, 'KEL copia'),
(17, 'nuevo'),
(14, 'Otr'),
(12, 'Otro'),
(1, 'polar'),
(10, 'Trululu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol`
--

CREATE TABLE `Rol` (
  `id` int(32) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Rol`
--

INSERT INTO `Rol` (`id`, `rol`) VALUES
(2, 'Administrador'),
(1, 'Editor'),
(3, 'Espectador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int(32) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `rol_id` int(32) NOT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id`, `usuario`, `nombre`, `rol_id`, `password`) VALUES
(6, 'jose121correa', 'José Correa', 1, '$2b$10$X5zxtSCwkmav28w1GhSN5.fIKgGX6hnZp8DfEj5.ADxCKAjRso8oS'),
(10, 'ricardoBricenio', 'Ricardo Briceño', 1, '$2b$10$LK4ORPwaQvXa9UDlETuUeuKXM7IgTiMUGgqn.LG4GGCcpjKw4T14a'),
(12, 'asdf', 'asdf', 1, '$2b$10$5gMJiRuVAXdfJ/exJIHoX.FOf.lqT.nFjCQZKZs5gEAgvPvgeprU6'),
(24, 'mcorrea', 'Manuel Correa', 3, '$2b$10$Fv1umM748XSApiBglTW98.6tDsDlSlilzB501KXNON/Y4pziI4Ncu'),
(25, 'jose', 'José', 3, '$2b$10$IYyrqhzo0WLl/DewEmbD6OjmzRbZvmf8KxJND9193zCYPf7aekWhi'),
(26, 'admin', 'Jose Admin', 2, '$2b$10$.n6cCXE6e6th/9nh2D/Q3uoDy58bV0K.Du.2y59/br8KdFbv2p9Vm'),
(27, 'algo', 'algo aglo', 3, '$2b$10$23p7aJRMekV6vtDPKdY51udmdKPpaWkVRoCf2liIsHl26GLF/.USq');

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
-- Indices de la tabla `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rol` (`rol`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `Categoria_Equipo`
--
ALTER TABLE `Categoria_Equipo`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `Equipo`
--
ALTER TABLE `Equipo`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `Modalidad`
--
ALTER TABLE `Modalidad`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `Participante`
--
ALTER TABLE `Participante`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `Patrocinador`
--
ALTER TABLE `Patrocinador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `Rol`
--
ALTER TABLE `Rol`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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

--
-- Filtros para la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `Rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
