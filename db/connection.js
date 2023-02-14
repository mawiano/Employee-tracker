const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user:"root", 
    password: "password123",
    database: "employees_db"
});

module.exports = connection;