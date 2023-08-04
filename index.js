const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee database')

);

const displayMenu =  () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "Please select an option",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All departments",
                "Add Department",
                "Remove Employee",
                "Remove Role",
                "Exit"
            ]

        }
    ])
    .then((answer) => {
        choice = answer.action;
        switch (choice) {
          case "View All Employees":
            viewEmployees();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "View All Roles":
            viewRoles();
            break;
          case "Add Role":
            addRole();
            break;
          case "View All departments":
            viewDepartments();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "Remove Employee":
            removeEmployee();
            break;
          case "Remove Role":
            removeRole();
            break;
          case "Exit":
            console.log("Thank you for using our program!");
            return;
        }
    });
};

viewEmployees = () => {

let employeeQuerry = `
SELECT 
employee.id AS employee_id,
employee.first_name,
employee.last_name,
roles.title AS job_title,
department.department_name AS department,
roles.salary,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM
employee
JOIN
roles ON employee.role_id = roles.id
JOIN
department ON roles.department_id = department.id
LEFT JOIN
employee manager ON employee.manager_id = manager.id;`
db.query(employeeQuerry, function (err, results) {
    console.log(results);
    displayMenu();
});


};

addEmployee = () => {


db.query( , function (err, results) {

});


};

updateEmployeeRole = () => {

let updateEmployeeQuerry = `

`
db.query( , function (err, results) {

});


};

viewRoles = () => {


db.query( , function (err, results) {

});


};

addRole = () => {


db.query( , function (err, results) {

});


};

viewDepartments = () => {


db.query( , function (err, results) {

});


};

addDepartment = () => {


db.query( , function (err, results) {

});


};

removeEmployee = () => {


db.query( , function (err, results) {

});


};

removeRole = () => {


db.query( , function (err, results) {

});


}