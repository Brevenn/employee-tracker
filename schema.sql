DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)