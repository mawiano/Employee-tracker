-- Write all my seed 

USE employees_db;

INSERT INTO department (name)
VALUES
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Sales Lead', 100000, 1),
(2, 'Salesperson', 80000, 4),
(3, 'Lead Engineer', 150000, 1),
(4, 'Software Engineer', 120000, 1),
(5, 'Account Manager', 160000, 2),
(6, 'Accountant', 125000, 2),
(7, 'Legal Team Lead', 250000, 3),
(8, 'Lawyer', 190000, 3);

    INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
    (1, "Mariano", "Rojano", 1, null),
    (2, "Josh", "Jacobs", 2, 1 ),
    (3, "Luke" , "Skywalker", 3,1);