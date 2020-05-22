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

const startScreenOptions = ["Add Department", "Add Role", "Add Employee", "View All Employees", "View All Employees By Department", "View All Employees By Role", "View All Employees By Manager", "View Roles", "View Departments", "Update Employee", "Remove Employee", "Remove Department", "Remove Role", "Exit"];
const startScreenQ = [
    {
        type: "list",
        name: "todo",
        message: "What would you like to do?",
        choices: startScreenOptions
    }
];

function init() {
    inquirer.prompt(startScreenQ).then(answer => {
        switch (answer.todo) {
            case startScreenOptions[0]:
                addDepartment();
                break;
            case startScreenOptions[1]:
                addRole();
                break;
            case startScreenOptions[2]:
                addEmployee();
                break;
            case startScreenOptions[3]:
                viewAllEmployees();
                break;
            case startScreenOptions[4]:
                viewAllEmployeesByDepartment();
                break;
            case startScreenOptions[5]:
                viewAllEmployeesByRole();
                break;
            case startScreenOptions[6]:
                viewAllEmployeesByManager();
                break;
            case startScreenOptions[7]:
                viewRoles();
                break;
            case startScreenOptions[8]:
                viewDepartments();
                break;
            case startScreenOptions[9]:
                updateEmployee();
                break;
            case startScreenOptions[10]:
                removeEmployee();
                break;
            case startScreenOptions[11]:
                removeDepartment();
                break;
            case startScreenOptions[12]:
                removeRole();
                break;
            case startScreenOptions[13]:
                console.log("Bye!");
                connection.end();
                break;
            default:
                console.log("Bye!");
                connection.end();
        }
    });
}

function viewAllEmployees() {
    connection.query("select employees.id, first_name, last_name, title, department, salary from employees join roles on role_id=roles.id join departments on department_id=departments.id", function (err, res) {
        console.table(res);
    });
    init();
}