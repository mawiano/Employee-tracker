const connection = require("./db/connection");

class Queries {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllDepartments() {
        console.log()
        return this.connection.promise().query("SELECT * FROM department");
    }

    viewAllRoles() {
        return this.connection.promise().query(` SELECT role.title, role.id, role.salary, department.name AS department_name FROM role
        LEFT JOIN department
        ON role.department_id = department.id`);
    }

    viewAllEmployees() {
        return this.connection.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
        );
    }


    addDepartment (departmentName) {
        return this.connection
        .promise()
        .query("INSERT INTO DEPARTMENT (name) VALUES (?)", [departmentName]);
    }

    addRole(title, salary, departmentChoices) {
        return this.connection
        .promise()
        .query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [title, salary, departmentChoices]);
    }

    addEmployee(first_name, last_name, role, manager) {
        return this.connection
        .promise()
        .query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [first_name, last_name, role, manager]);
    }
}