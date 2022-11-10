// create requirements for dependencies
require("dotenv").config();
var inquirer = require("inquirer");
var promisemysql = require("mysql2/promise");
var mysql = require("mysql2");
require("console.table");

// create connection to both mysql packages
var connectPack = {
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

var connection = mysql.createConnection(connectPack);
connection.connect(function (err) {
  if (err) throw err;
  start();
});

// Create function to begin prompt for user actions in the command-line.
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "beginningOptions",
        message: "What would you like to do?",
        choices: [
          "Add New Department Type",
          "Add New Department Role",
          "Add New Department",
          "View all Department Types",
          "View all Department Roles",
          "View all Departments",
          "Change the Role of a Department",
          "Exit Simulation",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers.beginningOptions);
      switch (answers.beginningOptions) {
        case "Add New Department Type":
          addCharType();
          break;
        case "Add New Department Role":
          addCharRole();
          break;
        case "Add New Department":
          addNewChar();
          break;
        case "View all Department Types":
          viewCharTypes();
          break;
        case "View all Department Roles":
          viewCharRoles();
          break;
        case "View all Departments":
          viewAllChar();
          break;
        case "Change the Role of a Department":
          changeRole();
          break;
        default:
          console.log("Until Next Time!");
          process.exit();
      }
    });
}

// Create a function to view all character types (departments)
function viewCharTypes() {
  connection.query("SELECT * FROM department;", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

// Create a function function to view all characters (employees)
function viewAllChar() {
  connection.query("SELECT * FROM department_info;", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}
// Creat a function to view all character roles (employee roles)
function viewCharRoles() {
  connection.query(
    "SELECT employee_role.id, employee_role.title, department.department_name AS department, employee_role.salary FROM employee_role LEFT JOIN department on employee_role.department_id = department.id;",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}

// Create a function to add character types to the type seed.
function addCharType() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Add Department Type: ",
      },
    ])
    .then((answers) => {
      // console.log(answers);
      connection.query(
        "INSERT INTO department SET?",
        {
          department_name: answers.department,
        },
        function (err) {
          if (err) throw err;
          console.log("New Department added to database");
          start();
        }
      );
    });
}

// Create a function to add roles to the employee_role database.
function addCharRole() {
  let departmentName = [];
  let departments = [];
  promisemysql
    .createConnection(connectPack)
    .then((dbconnection) => {
      return dbconnection.query("SELECT * FROM department");
    })
    .then(([department]) => {
      departments = department;
      for (var i = 0; i < department.length; i++) {
        departmentName.push(department[i].department_name);
      }
      // console.log(departmentName)
      return departmentName;
    })
    .then((departmentNames) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "role",
            message: "Add Employee Role: ",
            validate: function (input) {
              if (input === "") {
                console.log("Employee Role Required to Proceed");
                return false;
              } else {
                return true;
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "Employee Role Salary: ",
            validate: function (value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            },
          },
          {
            type: "list",
            name: "department",
            message: "Department for this Role: ",
            choices: departmentNames,
          },
        ])
        .then((answers) => {
          let departmentID;
          departmentID = departments.find(
            (department) => department.department_name === answers.department
          ).id;

          connection.query(
            "INSERT INTO employee_role SET ?",
            {
              title: answers.role,
              salary: answers.salary,
              department_id: departmentID,
            },
            function (err) {
              if (err) throw err;
              console.log("Employee Role added successfully!");
              start();
            }
          );
        });
    });
}

// Create a function to add characters to the character database.
function addNewChar() {
  let employeeRole = [];
  let employees = [];
  let roles = [];
  promisemysql
    .createConnection(connectPack)
    .then((dbconnection) => {
      return Promise.all([
        dbconnection.query("SELECT * FROM employee_role"),
        dbconnection.query(
          "SELECT department_info.id, concat(department_info.first_name, ' ' , department_info.last_name) AS fullName FROM department_info ORDER BY fullName ASC"
        ),
      ]);
    })
    .then(([[role], [name]]) => {
      for (var i = 0; i < role.length; i++) {
        employeeRole.push(role[i].title);
      }

      for (var i = 0; i < name.length; i++) {
        console.log(name[i]);
        employees.push(name[i].fullName);
      }

      return Promise.all([role, name]);
    })
    .then(([role, name]) => {
      roles = role;
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstname",
            message: "First Name: ",
            validate: function (input) {
              if (input === "") {
                console.log("First Name Required");
                return false;
              } else {
                return true;
              }
            },
          },
          {
            type: "input",
            name: "lastname",
            message: "Last Name: ",
            validate: function (input) {
              if (input === "") {
                console.log("Last Name Required");
                return false;
              } else {
                return true;
              }
            },
          },
          {
            type: "list",
            name: "currentRole",
            message: "Role within the company: ",
            choices: employeeRole,
          },
          {
            type: "list",
            name: "manager",
            message: "Name of their manager: ",
            choices: employees,
          },
        ])
        .then((answer) => {
          let roleID = roles.find((role) => {
            return role.title === answer.currentRole;
          }).id;

          let managerID = null;

          for (var i = 0; i < name.length; i++) {
            if (answer.manager == name[i].fullName) {
              captainID = name[i].id;
            }
          }

          connection.query(
            "INSERT INTO department_info SET ?",
            {
              first_name: answer.firstname,
              last_name: answer.lastname,
              role_id: roleID,
              captain_id: captainID,
            },
            function (err) {
              if (err) throw err;
              console.log("Employee added successfully");
              start();
            }
          );
        });
    });
}

// Create a function to change the role of a character
function changeRole() {
  let employeeRole = [];
  let employees = [];

  promisemysql
    .createConnection(connectPack)
    .then((dbconnection) => {
      return Promise.all([
        dbconnection.query("SELECT * FROM employee_role"),
        dbconnection.query(
          "SELECT department_info.id, concat(department_info.first_name, ' ' , department_info.last_name) AS fullName FROM department_info ORDER BY fullName ASC"
        ),
      ]);
    })
    .then(([[role], [name]]) => {
      for (var i = 0; i < role.length; i++) {
        employeeRole.push(role[i].title);
      }
      for (var i = 0; i < name.length; i++) {
        console.log(name[i]);
        employees.push(name[i].fullName);
      }
      return Promise.all([role, name]);
    })
    .then(([role, name]) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeName",
            message: "Employee Name: ",
            choices: employees,
          },
          {
            type: "list",
            name: "currentRole",
            message: "New Role: ",
            choices: employeeRole,
          },
        ])
        .then((answers) => {
          let roleID;
          let employeeID;
          for (var i = 0; i < role.length; i++) {
            if (answers.currentRole == role[i].title) {
              roleID = role[i].id;
            }
          }
          for (var i = 0; i < name.length; i++) {
            if (answers.employeeName == name[i].fullName) {
              employeeID = name[i].id;
            }
          }
          connection.query(
            `UPDATE department_info SET role_id = ${roleID} WHERE id = ${employeeID}`,
            function (err) {
              if (err) throw err;
              console.log("Employee role changed succcessfully");
              start();
            }
          );
        });
    });
}
