-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema deezGradesDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `deezGradesDB`;
-- -----------------------------------------------------
-- Schema deezGradesDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `deezGradesDB` DEFAULT CHARACTER SET utf8 ;
USE `deezGradesDB` ;

-- -----------------------------------------------------
-- Table `deezGradesDB`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deezGradesDB`.`Student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deezGradesDB`.`Course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deezGradesDB`.`Course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `bms` BOOLEAN NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deezGradesDB`.`Grades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `deezGradesDB`.`Grade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `grade` FLOAT NULL,
  `Student_id` INT NOT NULL,
  `Course_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Grade_Student_idx` (`Student_id` ASC),
  INDEX `fk_Grade_Course1_idx` (`Course_id` ASC),
  CONSTRAINT `fk_Grade_Student`
    FOREIGN KEY (`Student_id`)
    REFERENCES `deezGradesDB`.`Student` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Grades_Course1`
    FOREIGN KEY (`Course_id`)
    REFERENCES `deezGradesDB`.`Course` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
