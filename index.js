var mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require("dotenv").config();

// Empty-ish arrays for manipulating database on a smaller scale
var departmentObjArr = [];
var departmentArr = [];
var roleObjArr = [];
var roleArr = [];
var employeeObjArr = [];
var employeeArrNone = ["None"];
var employeeArr = [];
var employeeDummyArr = [];

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "employeeTrackerDB",
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});

const startScreenOptions = ["Add Department", "Add Role", "Add Employee", "View All Employees", "View All Employees By Department", "View All Employees By Role", "View All Employees By Manager", "View Roles", "View Departments", "View a Department's Budget", "Update Employee's Role", "Update Employee's Manager", "Remove Employee", "Remove Department", "Remove Role", "Exit"];

// Questions
const startScreenQ = {
    type: "list",
    name: "todo",
    message: "What would you like to do?",
    choices: startScreenOptions
};

const addDepartmentQ = {
    type: "input",
    name: "toAddDepartment",
    message: "What department would you like to add?"
};

const addRoleQs = [
    {
        type: "input",
        name: "toAddRoleTitle",
        message: "What role would you like to add?"
    }, {
        type: "input",
        name: "toAddRoleSalary",
        message: "What should this role's salary be?"
    }, {
        type: "list",
        name: "toAddRoleDep",
        message: "Which department would you like this role to be in?",
        choices: departmentArr
    }
];

const addEmployeeQs = [
    {
        type: "input",
        name: "toAddEmployeeFN",
        message: "What is the employee's first name?"
    }, {
        type: "input",
        name: "toAddEmployeeLN",
        message: "What is the employee's last name?"
    }, {
        type: "list",
        name: "toAddEmployeeRole",
        message: "What is the employee's role?",
        choices: roleArr
    }, {
        type: "list",
        name: "toAddEmployeeManager",
        message: "Who is the employee's manager?",
        choices: employeeArrNone
    }
];

const viewByDepartmentQ = {
    type: "list",
    name: "toViewByDepartment",
    message: "Which department of employees would you like to view?",
    choices: departmentArr
};

const viewByRoleQ = {
    type: "list",
    name: "toViewByRole",
    message: "Which role of employees would you like to view?",
    choices: roleArr
};

const viewByManagerQ = {
    type: "list",
    name: "toViewByManager",
    message: "Which manager's employees would you like to view?",
    choices: employeeArr
};

const viewTotalUtilizedBudgetQ = {
    type: "list",
    name: "toViewDepartmentTotal",
    message: "Which department's total utilized budget which you like to see?",
    choices: departmentArr
};

const updateEmployeeRoleQs = [
    {
        type: "list",
        name: "toUpdateEmployee",
        message: "Which employee would you like to update?",
        choices: employeeArr
    }, {
        type: "list",
        name: "toUpdateEmployeeRole",
        message: "What is the employee's role?",
        choices: roleArr
    }
];

const updateEmployeeManagerQs = [
    {
        type: "list",
        name: "toUpdateEmployee",
        message: "Which employee would you like to update?",
        choices: employeeArr
    }, {
        type: "list",
        name: "toUpdateEmployeeManager",
        message: "Who is the employee's manager?",
        choices: employeeArrNone
    }
];

const removeEmployeeQ = {
    type: "list",
    name: "toRemoveEmployee",
    message: "Which employee would you like to remove?",
    choices: employeeArr
};

const removeDepartmentQ = {
    type: "list",
    name: "toRemoveDepartment",
    message: "Which department would you like to remove?",
    choices: departmentArr
};

const removeRoleQ = {
    type: "list",
    name: "toRemoveRole",
    message: "Which role would you like to remove?",
    choices: roleArr
};

// Reads DB and pushes info into previously empty arrays
function readTrackerDB() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (departmentArr.indexOf(res[i].department) === -1) {
                departmentArr.push(res[i].department);
                departmentObjArr.push(res[i]);
            }
        }
    });

    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (roleArr.indexOf(res[i].title) === -1) {
                roleArr.push(res[i].title);
                roleObjArr.push(res[i]);
            }
        }
    });

    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (employeeDummyArr.indexOf(res[i].first_name) === -1) {
                employeeObjArr.push(res[i]);
                employeeDummyArr.push(res[i].first_name);
            }
        }
    });

    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS fullname FROM employees", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (employeeArrNone.indexOf(res[i].fullname) === -1 && employeeArr.indexOf(res[i].fullname) === -1) {
                employeeArrNone.push(res[i].fullname);
                employeeArr.push(res[i].fullname);
            }
        }
    });
}

function init() {
    readTrackerDB();

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
                viewTotalUtilizedBudget();
                break;
            case startScreenOptions[10]:
                updateEmployeeRole();
                break;
            case startScreenOptions[11]:
                updateEmployeeManager();
                break;
            case startScreenOptions[12]:
                removeEmployee();
                break;
            case startScreenOptions[13]:
                removeDepartment();
                break;
            case startScreenOptions[14]:
                removeRole();
                break;
            case startScreenOptions[15]:
                console.log("Bye!");
                connection.end();
                break;
            default:
                console.log("Bye!");
                connection.end();
        }
    });
}

function addDepartment() {
    inquirer.prompt(addDepartmentQ).then(answer => {

        connection.query("INSERT INTO departments SET ?",
            { department: answer.toAddDepartment },
            function (err, res) {
            if (err) throw err;
            init();
        });

    });

}

function addRole() {
    inquirer.prompt(addRoleQs).then(answers => {

        for (let i = 0; i < departmentObjArr.length; i++) {
            if (departmentObjArr[i].department == answers.toAddRoleDep) {
                var toAddRoleDepID = departmentObjArr[i].id;
            }
        }

        connection.query("INSERT INTO roles SET ?",
            {
                title: answers.toAddRoleTitle,
                salary: answers.toAddRoleSalary,
                department_id: toAddRoleDepID
            },
            function (err, res) {
            if (err) throw err;
            init();
        });
    });

}

function addEmployee() {
    inquirer.prompt(addEmployeeQs).then(answers => {

        for (let i = 0; i < roleObjArr.length; i++) {
            if (roleObjArr[i].title == answers.toAddEmployeeRole) {
                var toAddEmployeeRoleID = roleObjArr[i].id;
            }
        }

        for (let i = 0; i < employeeArrNone.length; i++) {
            if (answers.toAddEmployeeManager == "None") {
                var toAddEmployeeManagerID = null;
            } else if (employeeArr[i] == answers.toAddEmployeeManager) {
                var toAddEmployeeManagerID = employeeObjArr[i].id;
            }
        }

        connection.query("INSERT INTO employees SET ?",
            {
                first_name: answers.toAddEmployeeFN,
                last_name: answers.toAddEmployeeLN,
                role_id: toAddEmployeeRoleID,
                manager_id: toAddEmployeeManagerID
            },
            function (err, res) {
            if (err) throw err;
            init();
        });
    });
}

function viewAllEmployees() {
    let query = "SELECT a.id, a.first_name, a.last_name, title, department, salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employees a JOIN roles ON role_id=roles.id JOIN departments ON department_id=departments.id LEFT JOIN employees b on a.manager_id=b.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        init();
    });
}

function viewAllEmployeesByDepartment() {
    inquirer.prompt(viewByDepartmentQ).then(answer => {
        let query = "SELECT a.id, a.first_name, a.last_name, title, department, salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employees a JOIN roles ON role_id=roles.id JOIN departments ON department_id=departments.id LEFT JOIN employees b on a.manager_id=b.id WHERE ?";

        connection.query(query, { department: answer.toViewByDepartment }, function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            init();
        });
    });
}

function viewAllEmployeesByRole() {
    inquirer.prompt(viewByRoleQ).then(answer => {
        let query = "SELECT a.id, a.first_name, a.last_name, title, department, salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employees a JOIN roles ON role_id=roles.id JOIN departments ON department_id=departments.id LEFT JOIN employees b on a.manager_id=b.id WHERE ?";

        connection.query(query, { title: answer.toViewByRole }, function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            init();
        });
    });
}

function viewAllEmployeesByManager() {
    inquirer.prompt(viewByManagerQ).then(answer => {

        for (let i = 0; i < employeeArr.length; i++) {
            if (employeeArr[i] == answer.toViewByManager) {
               var toViewByManagerID = employeeObjArr[i].id;
           }
        }

        let query = "SELECT a.id, a.first_name, a.last_name, title, department, salary, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employees a JOIN roles ON role_id=roles.id JOIN departments ON department_id=departments.id LEFT JOIN employees b on a.manager_id=b.id WHERE a.manager_id =" + toViewByManagerID;

        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            init();
        });
    });
}

function viewRoles() {
    connection.query("SELECT roles.id, title, salary, department FROM roles JOIN departments ON department_id=departments.id", function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        init();
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        init();
    });
}

function viewTotalUtilizedBudget() {
    inquirer.prompt(viewTotalUtilizedBudgetQ).then(answer => {
        connection.query("SELECT SUM(salary) AS total_utilized_budget FROM employees JOIN roles ON role_id=roles.id JOIN departments ON department_id=departments.id WHERE ?", { department: answer.toViewDepartmentTotal }, function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            init();
        })
    })
}
function updateEmployeeRole() {
    inquirer.prompt(updateEmployeeRoleQs).then(answers => {

        for (let i = 0; i < roleObjArr.length; i++) {
            if (roleObjArr[i].title == answers.toUpdateEmployeeRole) {
                var toUpdateEmployeeRoleID = roleObjArr[i].id;
            }
        }
    
        connection.query("UPDATE employees SET ? WHERE ? AND ?",
            [
                {
                    role_id: toUpdateEmployeeRoleID
                }, {
                    first_name: answers.toUpdateEmployee.split(" ")[0]
                }, {
                    last_name: answers.toUpdateEmployee.split(" ")[1]
                }
            ],
            function (err, res) {
            if (err) throw err;
            init();
        });
    });
}

function updateEmployeeManager() {
    inquirer.prompt(updateEmployeeManagerQs).then(answers => {

        for (let i = 0; i < employeeArrNone.length; i++) {
            if (answers.toUpdateEmployeeManager == "None") {
                var toUpdateEmployeeManagerID = null;
            } else if (employeeArr[i] == answers.toUpdateEmployeeManager) {
                var toUpdateEmployeeManagerID = employeeObjArr[i].id;
            }
        }
    
        connection.query("UPDATE employees SET ? WHERE ? AND ?",
            [
                {
                    manager_id: toUpdateEmployeeManagerID
                }, {
                    first_name: answers.toUpdateEmployee.split(" ")[0]
                }, {
                    last_name: answers.toUpdateEmployee.split(" ")[1]
                }
            ],
            function (err, res) {
            if (err) throw err;
            init();
        });
    });
}

// Remove functions empty arrays used for temp storage
function removeEmployee() {
    inquirer.prompt(removeEmployeeQ).then(answer => {
        connection.query("DELETE FROM employees WHERE ? AND ?",
            [
                {
                    first_name: answer.toRemoveEmployee.split(" ")[0]
                }, {
                    last_name: answer.toRemoveEmployee.split(" ")[1]
                }
            ],
            function (err, res) {
                if (err) throw err;
                employeeObjArr = [];
                employeeArrNone = ["None"];
                employeeArr = [];
                employeeDummyArr = [];
                init();
        });
    });
}

function removeDepartment() {
    inquirer.prompt(removeDepartmentQ).then(answer => {
        connection.query("DELETE FROM departments WHERE ?",
            {
                department: answer.toRemoveDepartment
            }, function (err, res) {
                if (err) throw err;
                departmentObjArr = [];
                departmentArr = [];
                init();
        });
    });
}

function removeRole() {
    inquirer.prompt(removeRoleQ).then(answer => {
        connection.query("DELETE FROM roles WHERE ?",
            {
                title: answer.toRemoveRole
            }, function (err, res) {
                if (err) throw err;
                roleObjArr = [];
                roleArr = [];
                init();
        });
    });
}