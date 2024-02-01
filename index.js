const inquirer = require('inquirer');
// const express = require('express');
const db = require('./server')

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

const askQs = (questions) => {
    return inquirer.prompt(questions)
}

// const viewEmp = () => {
//   askQs(viewEmpQs)
//     .then(response => {
//       db.query('SELECT * FROM employee', function (err, results) {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(results);
//         }
//       });
//     });
// }

const initialChoice = async () => {
    await askQs(mainMenu)
        .then(response => { console.log(response)})}
            // switch (response.firstChoice) {
            //     case "View All Employees": viewEmp()

            //         break;
            //     case "Add Employee": { }
            //         break;
            //     case "Update Employee Role": { }
            //         break;
            //     case "View All Roles": { }
            //         break;
            //     case "Add Role": { }
            //         break;
            //     case "View All Departments": { }
            //         break;
            //     case "Add Department": { }
            //         break;
            //     case "Exit": { }
            //         break;
//             }
//         })
// }

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