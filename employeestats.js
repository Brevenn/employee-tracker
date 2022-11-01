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
                    "Add New Character Type",
                    "Add New Character Role",
                    "Add New Character",
                    "View all Character Types",
                    "View all Character Roles",
                    "View all Characters",
                    "Change the Role of a Character",
                    "Exit Simulation"
                ]
            }
        ])
        .then(answers => {
            switch(answers.beginningOptions) {
                case "Add New Character Type":
                    addCharType();
                    break;
                case "Add New Character Role":
                    addCharRole();
                    break;
                case "Add New Character":
                    addNewChar();
                    break;
                case "View All Character Types":
                    viewCharTypes();
                    break;
                case "View All Character Roles":
                    viewCharRoles();
                    break;
                case "View All Characters":
                    viewAllChar();
                    break;
                case "Change the Role of a Character":
                    changeRole();
                    break;
                default:
                    console.log("Until Next Time!");
                    process.exit();
            };
        });
};

// Create a function to add character types to the type seed.
function addCharType() {
    inquirer.prompt([
        {
            type: "input",
            name: "department type",
            message: "Add Department Type: "
        }
    ]).then(answers => {
        connection.query(
            "INSERT INTO department SET?",
            {
                department_name: answers.department,
            },
            function(err) {
                if (err) throw err;
                console.log("New Department added to database");
                start();
            }
        );
    });
};
