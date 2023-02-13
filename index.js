const inquirer = require("inquirer");
const consoleTable = require("console.table");
const Queries = require ("/Queries");

// Initial questions array 
const choices = [
    {
        type: "list",
        message: "What would you like to do?",
        options: [
            "View all Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "Add Department",
        ];
        name: "choiceSelection",
    },
];

