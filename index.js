const inquirer = require('inquirer');
const express = require('express');

const initialQs = () => {
    input= "list",
    message= "What would you like to do?",
    choices= [
    "View All Employees", 
    "Add Employee", 
    "Update Employee Role", 
    "View All Roles", 
    "Add Role", 
    "View All Departments", 
    "Add Department", 
    "Exit"]
}