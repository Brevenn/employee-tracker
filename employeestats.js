// create requirements for dependencies
var inquirer = require("inquirer");
var promisemysql = require("promise-mysql");
var mysql = require("mysql");
const { start } = require("repl");
require("console.table");

// create connection to both mysql packages
var connectPack = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeetracker_db",
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
        case "View All Department Types":
          viewCharTypes();
          break;
        case "View All Department Roles":
          viewCharRoles();
          break;
        case "View All Departments":
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
    connection.query("SELECT department.id, department.department_name, SUM(employee_role.salary)")
}

// Create a function to add character types to the type seed.
function addCharType() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department type",
        message: "Add Department Type: ",
      },
    ])
    .then((answers) => {
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

  promisemysql
    .createConnection(connectPack)
    .then((dbconnection) => {
      return Promise.all([dbconnection.query("SELECT * FROM department")]);
    })
    .then(([department]) => {
      for (var i = 0; i < department.length; i++) {
        departmentName.push(department[i].department_name);
      }
      return Promise.all([department]);
    })
    .then(([department]) => {
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
            name: "berries",
            message: "Employee Role Berries: ",
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
            choices: departmentName,
          },
        ])
        .then((answers) => {
          let departmentID;

          for (var i = 0; i < answers.length; i++) {
            if (answers.department === department[i].department_name) {
              departmentID = department[i].id;
            }
          }

          connection.query(
            "INSERT INTO employee_role SET ?",
            {
              title: answers.role,
              berries: answers.berries,
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

  promisemysql.createConnection(connectPack).then((dbconnection) => {
    return Promise.all([
      dbconnection.query("SELECT * FROM employee_role"),

      dbconnection.query(
        "SELECT employee.id, concat(employee.first_name, ' ' , employee.last_name) AS fullName FROM employee ORDER BY fullName ASC"
      )
    ]);
  })
  .then(([role, name]) => {
    for (var i = 0; i < role.length; i++) {
        employeeRole.push(role[i].title);
    }

    for (var i = 0; i < name.length; i++) {
        employees.push(name[i].fullName)
    }

    return Promise.all(([role,name]));
  })
  .then(([role,name]) => {

    employees.push('null')

    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "First Name: ",
            validate: function(input){
                if (input === ""){
                    console.log("First Name Required");
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "lastname",
            message: "Last Name: ",
            validate: function(input) {
                if (input === ""){
                    console.log("Last Name Required");
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        {
            type: "list",
            name: "currentRole",
            message: "Role within the company: ",
            choices: employeeRole
        },
        {
            type: "list",
            name: "manager",
            message: "Name of their manager: ",
            choices: employees
        }
    ]).tehn(answer => {

        let roleID;

        let managerID = null;

        for (var i = 0; i < roleID.length; i++) {
            if (answers.manager == name[i].fullName) {
                managerID = name[i].id;
            }
        }

        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.firstname,
                last_name: answers.lastname,
                role_id: roleID,
                manager_id: managerID
            },
            function(err){
                if (err) throw err;
                console.log("Employee added successfully");
                start();
            }
        );
    });
  })
};




