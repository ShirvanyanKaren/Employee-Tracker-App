const chalk = require("chalk");
const figlet = require("figlet");
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

console.log(chalk.blue.bold(`=============================================================================================================`));
  console.log(``);
  console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker App')));
  console.log(``);
  console.log(`                                                                                     ` + chalk.blueBright.bold('By: Karen Shirvanyan'));
  console.log(``);
  console.log(chalk.blue.bold(`=============================================================================================================`));




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


const displayMenu = () => {
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
                "Remove Department",
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
                case "Remove Department":
                    removeDepartment();
                    break;
                case "Exit":
                    console.log("Thank you for using our program!");
                    process.exit();
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

    db.query(viewDepQue, function (err, results) {
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

    db.query(viewRolesQue, function (err, results) {
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
            message: "Who is their manager?",
            name: "manager",
            choices: employees, none,
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




const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Role?",
            name: "title",
        },
        {
            type: "input",
            message: "What is the salary of the Role?",
            name: "salary",
        },
        {
            type: "list",
            message: "Which department does the role belong to?",
            name: "department",
            choices: departments,
        },

    ])
        .then((response) => {
            const { title, salary, department } = response;

            const department_id = departments.findIndex((dept) => dept === department) + 1;

            const addRoleQue = `
            INSERT INTO roles (title, salary, department_id)
            VALUES (?, ?, ?)
            `;

            db.query( addRoleQue, [title, salary, department_id], (err, results) => {
                if (err) {
                    console.error("Error adding the role:", err);
                } else {
                    console.log("Role added successfully!");
                }
                displayMenu();
            });

            });

        };





const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employees role would you like to update?",
            name: "employee",
            choices: employees,
        },
        {
            type: "list",
            message: "Which role would you like to assign to this employee?",
            name: "title",
            choices: roles,
        },
        {
            type: "list",
            message: "Who is their manager?",
            name: "manager",
            choices: employees,
        },

    ])
    .then((response)=> {
        const { employee, title, manager } = response;
        const role_id = roles.findIndex((role) => role === title) + 1;
        const manager_id = employees.findIndex((employee) => employee === manager) + 1;

        const updateEmployeeQue = `
        UPDATE employee
        SET role_id = ?, manager_id = ?
        WHERE last_name = ?;
        `;

        db.query(updateEmployeeQue, [role_id, manager_id, employee], (err, result) => { 
            if (err) {
                console.error("Error updating the employee:", err);
            } else {
                console.log("Employee updated successfully!");
            }
            displayMenu();
        });
    });
};



const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What Department would you like to add?",
            name: "department",
        },
    ])
    .then((response) => {
        const { department } = response;

        const addDepQue = `
        INSERT INTO department (department_name)
        VALUES (?)
        `;
        db.query( addDepQue, [department], (err, results) =>{
            if(err){
                console.error("Error adding the department:", err);
            } else {
                console.log("Department added successfully!");
            }
            displayMenu()
         });
        });
    };


const removeEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to remove?",
            name: "employee",
            choices: employees,
        }
    ])
    .then((response) => {
        const { employee } = response;


        const employee_id = employees.findIndex((emp) => emp === employee) + 1; 
 

        const removeEmpQue = `
        DELETE FROM employee
        WHERE employee.id = ?
        `;

        db.query(removeEmpQue, [employee_id], (err, result) => {
            if (err) {
                console.error("Error removing the employee:", err);
            } else {
                console.log("Employee removed successfully!");
            }
            displayMenu();
        });
    })



};

const removeRole = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which role would you like to remove?",
            name: "title",
            choices: roles,
        }
    ])
    .then((response) => {
        const { title } = response;

        const roles_id = roles.findIndex((role) => role === title) + 1; 
 

        const removeRoleQue = `
        DELETE FROM roles
        WHERE roles.id = ?
        `;

        db.query(removeRoleQue, [roles_id], (err, result) => {
            if (err) {
                console.error("Error removing the role:", err);
            } else {
                console.log("Role removed successfully!");
            }
            displayMenu();
        });
    })
};

const removeDepartment = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to remove?",
            name: "department",
            choices: departments,
        }
    ])
    .then((response) => {
        const { department } = response;

        const department_id = departments.findIndex((dept) => dept === department) + 1; 
 

        const removeDepQue = `
        DELETE FROM department
        WHERE department.id = ?
        `;

        db.query(removeDepQue, [department_id], (err, result) => {
            if (err) {
                console.error("Error removing the department:", err);
            } else {
                console.log("Department removed successfully!");
            }
            displayMenu();
        });
    });

};


init();
displayMenu();

