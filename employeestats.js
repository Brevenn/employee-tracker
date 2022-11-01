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
            
        })
}