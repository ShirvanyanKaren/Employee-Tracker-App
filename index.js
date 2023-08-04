const inquirer = require("inquirer");
const mysql = require("mysql2");

let roles = [];
let departments = [];
let employees = [];
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee database')
   
);




const init = () => {
    departments = [];
    roles = [];
    employees = [];
  
    db.query("SELECT department_name FROM department", (err, data) => {
      departments = data.map((element) => element.department_name);
    });
  
    db.query("SELECT title FROM roles", (err, data) => {
        roles = data.map((element) => element.title);
    });
  
    db.query("SELECT last_name FROM employee", (err, data) => {
        employees = data.map((element) => element.last_name);
    });

  };
  

const displayMenu =  () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
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
            ],

        }
    ])
    .then((answers) => {
        choice = answers.choice;
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

const viewEmployees = () => {

let employeesQue =
`SELECT 
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
db.query(employeesQue, function (err, results) {
    console.table(results);
    displayMenu();

});
};

const viewDepartments = () => {
    let viewDepQue = `SELECT * FROM department;`
    
    db.query( viewDepQue, function (err, results) {
        console.table(results);
        displayMenu();
    });
    
    };





const viewRoles = () => {
    let viewRolesQue =
    `SELECT roles.title,
    roles.id, 
    roles.salary,
    department.department_name
    FROM department
    JOIN roles ON roles.department_id = department.id;
    `
    
    db.query( viewRolesQue, function (err, results) {
        console.table(results);
        displayMenu();
    });
    
    
    };

    const addEmployee = () => {
        inquirer.prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is their job title?",
            name: "title",
            choices: roles,
          },
          {
            type: "list",
            message: "What is their manager?",
            name: "manager",
            choices: employees,
          },
        ])
        .then((response) => {
          const { first_name, last_name, title, manager } = response;
      

          const role_id = roles.findIndex((role) => role === title) + 1;
          const manager_id = employees.findIndex((employee) => employee === manager) + 1;
      
       
          const employeeQue = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)
          `;
      
          db.query(employeeQue, [first_name, last_name, role_id, manager_id], (err, result) => {
            if (err) {
              console.error("Error adding the employee:", err);
            } else {
              console.log("Employee added successfully!");
            }
          
            displayMenu();
          });
        });
      };
      


// db.query( , function (err, results) {

// });


// };

// updateEmployeeRole = () => {

// let updateEmployeeQuerry = `

// `
// db.query( , function (err, results) {

// });


// };


// addRole = () => {


// db.query( , function (err, results) {

// });


// };



// addDepartment = () => {


// db.query( , function (err, results) {

// });


// };

// removeEmployee = () => {


// db.query( , function (err, results) {

// });


// };

// removeRole = () => {


// db.query( , function (err, results) {

// });


// }
init();
displayMenu();

// viewEmployees();