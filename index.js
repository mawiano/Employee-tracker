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
            if(answers.choiceSelection === "add an employee") {
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
            console.table(roles);
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
            .then((response) => { 
                console.log (`Added ${answers.departmentName}`);
                askPromptQuestions();
            })
            .catch((error) => {
                console.log(error);
                askPromptQuestions;
            });
        });
    }

    function addRole() {
        Queries.viewAllDepartments().then(([rows]) => {
            let department = rows;
            const departmentChoices = department.map(({id, name}) => {
                return{
                    name: `${name}`,
                    value: id,
                }
            });

            inquirer.prompt([
                {
                    name: "title",
                    message: "What is the name of the role?",
                    type: "input",
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?",
                    type: "input",
                },
                {
                    name: "list",
                    message: "What department does the role belong to?",
                    type: departmentChoices,
                },
            ])

            .then((answers) => {
                Queries.addRole(answers.title, answers.salary, answers.department_id)
                .then((response) => {
                    console.log(`Added Role to the database`);
                    askPromptQuestions();
                })
                .catch((error) => {
                    console.log(error);
                    askPromptQuestions();
                });
            });
        })
    };

    function addEmployee() {
        Queries.viewAllRoles().then(([rows]) => {
            let role = rows;
            const roleOptions = role.map(({ id, title}) => {
                return {
                    name: `${title}`,
                    value: id,
                }
            })
            Queries.viewManager().then(([rows]) => {
                let manager = rows;
                const managerOptions = manager.map(({ id, first_name, last_name}) => {
                    return {
                        name: `${first_name} ${last_name}`,
                        value: id,
                    }
                })
                const employee = [
                    {
                        name: "firstName",
                        message: "What is the employee's first name?",
                        type: "input",
                    },
                    {
                        name: "lastName",
                        message: "What is the employee's last name?",
                        type: "input",
                    },
                    {
                        name: "role",
                        message: "What is the employee's role?",
                        type: "roleOptions",
                        options: roleOptions
                    },
                    {
                        name: "manager",
                        message: "Who is the employees manager?",
                        type: "list",
                        options: managerOptions
                    },
                ];
    
                inquirer.prompt(employee).then((answers) => {
                    Queries.addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager)
                    .then((response) => {
                        console.log(`Added employee`);
                        askPromptQuestions();
                    });
                })
            })
            });
            
    }
    
    function updateEmployeeRole() {
        Queries.viewAllEmployees().then(([employees]) => {
            const employeeArray = employees.map(({ id, first_name, last_name}) => {
                return {
                    name: `${first_name} ${last_name}`,
                    value: id,
                };
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee role would you like to update?",
                    options: employeeArray,
                },
            ])
            .then(({ employeeId }) => {
                Queries.viewAllRoles().then(([roles]) => {
                    const roleArray = roles.map(({ id, title}) => {
                        return {
                            name: title,
                            value: id,
                        };
                    });
                    inquirer.prompt(([
                        {
                            type: "list",
                            name: "roleId",
                            message: "Which role would you like to update the employee to?",
                            options: roleArray,
                        },
                    ])
                    .then(({ roleId}) => {
                        Queries.updateEmployeeRole(employeeId, roleId)
                        .then(() => console.log("updated employees role"))
                        .then(() => askPromptQuestions());
                    })
                    )
                })
            })
        })
    }

    init();