// create requirements for dependencies
var inquirer = require("inquirer");
var promisemysql = require("promise-mysql");
var mysql = require("mysql");
require("console.table");

// create connection to both mysql packages
var connectPack = {}