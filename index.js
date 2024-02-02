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
    name:"roleID",
    message: "What is the employee's role ID?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
},
{
    type: "list",
    name:"managerID",
    message: "What is the employee's manager's ID?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "null"]
}
]


const askQs = (questions) => {
    return inquirer.prompt(questions)
}

const viewEmp = () => {
      db.query('SELECT * FROM employee', function (err, results) {
         if (err) {
             console.error(err);
            } else {
                console.log("\n")
                console.table(results);
            }
        });
    }

    const addEmp = async () => {
        try {
            const response = await askQs(addEmpQs);
    
            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [response.firstName, response.lastName, response.roleID, response.managerID],
                async function(err, results) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("\nEmployee added successfully!\n");
                        console.table(db.query('SELECT * FROM employee'))
                        
                    }
                    initialChoice();
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
    

const initialChoice = async () => {
    await askQs(mainMenu)
        .then (async response => {
            switch (response.firstChoice) {
                case "View All Employees": 
                    viewEmp(),
                    initialChoice();
                    break;
                case "Add Employee": 
                    await addEmp()
                    break;
                case "Update Employee Role": { }
                    break;
                case "View All Roles": { }
                    break;
                case "Add Role": { }
                    break;
                case "View All Departments": { }
                    break;
                case "Add Department": { }
                    break;
                case "Exit": { }
                    break;
            }
        }
        )
    }

initialChoice();

// Departments
//         1 produce,
//         2 cosmetics,
//         3 bakery,
//         4 deli,
//         5 dairy,
//         6 customer service

//         Roles
//         1 cashier,
//         2 dairy associate,
//         3 representative,
//         4 baker,
//         5 salesperson,
//         6 butcher