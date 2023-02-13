const inquirer = require("inquirer");
const consoleTable = require("console.table");
const Queries = require ("/Queries");

// Initial questions array 
const choices = [
    {
        type: "list",
        message: "What would you like to do?",
        options: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role",
            "Restart",
        ];
        name: "choiceSelection",
    },
];
// view all departments, view all roles, view all employees, add a department, add a role,
//  add an employee, and update an employee role
function init() {
    askPromptQuestions();
}
    function askPromptQuestions() {
        inquirer.prompt(choices)
        // If statements for every choice they pick
        .then((answers) => {
            if(answers.choiceSelection === "view all departments") {
                viewAllDepartments();
            }
            if(answers.choiceSelection === "view all roles") {
                viewAllRoles();
            }
            if(answers.choiceSelection === "view all employees") {
                viewAllEmployees();
            }
            if(answers.choiceSelection === "add a department") {
                addDepartment();
            }
            if(answers.choiceSelection === "add a role") {
                addRole();
            }
            if(answers.choiceSelection === "dd an employee") {
                addEmployee();
            }
            if(answers.choiceSelection === "update an employee role") {
                updateEmployeeRole();
            }
            if(answers.choiceSelection === "Restart") {
                return askPromptQuestions();
            }
        });
    }
   
    function viewAllDepartments() {
        Queries.viewAllDepartments().then(([rows]) => {
            let departments = rows;
            console.table(departments);
            askPromptQuestions();
        });
    }
    
    function viewAllRoles() {
        Queries.viewAllRoles().then(([rows]) => {
            let roles = rows;
            console.table(rows);
            askPromptQuestions();
        });
    }

    function viewAllEmployees() {
        Queries.viewAllEmployees().then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => askPromptQuestions());
    }

    function addDepartment() {
        inquirer.prompt([
            {
                name: "departmentName",
                message: "What is the name of the department?",
                type: "input",
            },
        ])
        .then((answers) => {
            Queries.addDepartment(answers.departmentName)
            .then(response) => { 
                console.log (`Added ${answers.departmentName}`);
                askPromptQuestions();
            }
        })
    }