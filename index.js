const inquirer = require('inquirer');
const db = require('./db/connection');

const mainMenu = {
    name: "firstChoice",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Exit"]
}

const addEmpQs = [{
    name: "firstName",
    message: "What is the employee's first name?",
},
{
    name: "lastName",
    message: "What is the employee's last name?"
},
{
    type: "list",
    name: "roleID",
    message: "What is the employee's role ID?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
},
{
    type: "list",
    name: "managerID",
    message: "What is the employee's manager's ID?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "null"]
}
]

const updateQs = [{
    type: "list",
    name: "empName",
    message: "Which employee would you like to update their role?",
    choices: ["Matt", "Mark", "Mitchell", "Mariah", "Matthew", "Michael"]
},
{
    type: "list",
    name: "newRole",
    message: "What is their new role ID?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}]

const addRoleQs = [{
    message: "What is the title of the new position?",
    name: "title"
},
{
    message: "What is the salary of this role?",
    name: "salary"
},
{
    type: "list",
    message: "What is the department ID for the new role?",
    name: "depID",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}]

//function to use the inquirer package to prompt the user for input
const askQs = (questions) => {
    return inquirer.prompt(questions)
}

//function to grab all data from employee table with the manager names replacing their ids
const viewEmp = () => {
    db.query("SELECT e.id, e.first_name, e.last_name, e.role_id, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id", function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("\n")
            console.table(results);
        }
        initialChoice();
    });
}

//function to add employee based on user input to the employee table
const addEmp = async () => {
    try {
        const response = await askQs(addEmpQs);
        db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [response.firstName, response.lastName, response.roleID, response.managerID],
            async function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("\nEmployee added successfully!\n");
                }
            }
        )
    }
    catch (error) {
        console.error(error);
    }
}

//function to view the recent added employee/ only to be used after adding an employee with addEmp()
const recentAdd = () => {
    db.query('SELECT * FROM employee ORDER BY id DESC LIMIT 1', function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("\n")
            console.table(results);
        }
        initialChoice();
    });
}

//function to update employee's role in employee table
const updateEmp = async () => {
    response = await askQs(updateQs),
        updatedRole = db.query(`UPDATE employee SET role_id = '${response.newRole}' WHERE employee.first_name = '${response.empName}'`);
}

//function to view all data from roles table
const viewRoles = async () => {
    db.query('SELECT r.id, r.title, r.salary, d.name AS department FROM roles r JOIN department d ON r.department_id = d.id', function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("\n")
            console.table(results);
        }
        initialChoice();
    });
}

//function to add role to roles table based on user input
const addRole = async () => {
    try {
        const response = await askQs(addRoleQs);
        db.query(
            `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
            [response.title, response.salary, response.depID],
            async function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("\nRole added successfully!\n");
                }
                initialChoice();
            }
        )
    }
    catch (error) {
        console.error(error);
    }
}

//function to pull all department names from the department table
const viewDep = async () => {
    db.query('SELECT department.name FROM department', function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("\n")
            console.table(results);
        }
        initialChoice();
    });
}

//function to add departments to the department table based on user input
const addDep = async () => {
    try {
        const response = await askQs(
            {
                message: "What is the new department name?",
                name: "name"
            });
        db.query(
            `INSERT INTO department (department.name) VALUES ('${response.name}')`,
            async function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("\nDepartment added successfully!\n");
                }
                initialChoice();
            }
        )
    }
    catch (error) {
        console.error(error);
    }
}

//switch case for all instances of the initial prompts from mainMenu
const initialChoice = async () => {
    await askQs(mainMenu)
        .then(async response => {
            switch (response.firstChoice) {
                case "View All Employees":
                    await viewEmp()
                    break;
                case "Add Employee":
                    await addEmp()
                    recentAdd();
                    break;
                case "Update Employee Role":
                    await updateEmp();
                    await viewEmp();
                    break;
                case "View All Roles":
                    await viewRoles();
                    break;
                case "Add Role":
                    await addRole();
                    break;
                case "View All Departments":
                    viewDep();
                    break;
                case "Add Department":
                    addDep();
                    break;
                case "Exit":
                    db.end();
                    break;
            }
        }
        )
}

initialChoice();
