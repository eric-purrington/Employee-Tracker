var mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "employeeTrackerDB",
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});

const startScreenQ = [
    {
        type = "list",
        name = "todo",
        message = "What would you like to do?",
        choices = ["Add Department", "Add Role", "Add Employee", "View All Employees", "View All Employees By Department", "View All Employees By Role", "View All Employees By Manager", "Update Employee", "Remove Employee", "Remove Department", "Remove Role"]
    }
];

function init() {
    inquirer.prompt(startScreenQ).then(answer => {
        switch (answer.todo) {
            case startScreenQ.choices[0]:
                addDepartment();
                break;
            case startScreenQ.choices[1]:
                addRole();
                break;
            case startScreenQ.choices[2]:
                addEmployee();
                break;
            case startScreenQ.choices[3]:
                viewAllEmployees();
                break;
            case startScreenQ.choices[4]:
                viewAllEmployeesByDepartment();
                break;
            case startScreenQ.choices[5]:
                viewAllEmployeesByRole();
                break;
            case startScreenQ.choices[6]:
                viewAllEmployeesByManager();
                break;
            case startScreenQ.choices[7]:
                updateEmployee();
                break;
            case startScreenQ.choices[8]:
                removeEmployee();
                break;
            case startScreenQ.choices[9]:
                removeDepartment();
                break;
            case startScreenQ.choices[10]:
                removeRole();
                break;
            default:
                console.log("Bye!")
                connection.end();
        }
    });
}

function viewAllEmployees() {
    
}