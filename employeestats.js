// create requirements for dependencies
var inquirer = require("inquirer");
var promisemysql = require("promise-mysql");
var mysql = require("mysql");
require("console.table");

// create connection to both mysql packages
var connectPack = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeetracker_db"
};

var connection = mysql.createConnection(connectPack);
connection.connect(function(){

});