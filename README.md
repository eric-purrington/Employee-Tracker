# Employee-Tracker
A node command-line application for keeping track of employees


![Gif Demonstration](assets/Employee-Tracker.gif)


## Table of Contents 

* [Description](#description)

* [Installation](#installation)

* [Usage](#usage)

* [Technologies](#technologies)

* [Languages/Libraries](#languages/libraries)

* [Questions](#questions)


## Description

This CLI allows a user to view and manage departments, roles, and employees through a database with just three tables.                                  
Each row of the departments table holds a department and id.                                                       
Each row of the roles table holds a title, salary, id, and department_id which links to the departments table.                                                  
Each row in the employees table holds a first and last name, a role_id which links to the roles table, a manager_id that links to a different employee, and an id.                      
[Video demonstration](https://eric-purrington.github.io/Employee-Tracker)

## Installation

To install necessary dependencies run the following command:
````
npm i
````
Next, navigate to .env to define your enviromental variables.        
Finally, run the schema.sql file in MySql Workbench to create the database.


## Usage

To start the application, run 
````
node server.js
````
You will be able to do any of the following options to manipulate the database: 
- "Add Department"
- "Add Role"
- "Add Employee"
- "View All Employees"
- "View All Employees By Department"
- "View All Employees By Role"
- "View All Employees By Manager"
- "View Roles"
- "View Departments"
- "View a Department's Budget"
- "Update Employee's Role"
- "Update Employee's Manager"
- "Remove Employee"
- "Remove Department"
- "Remove Role"
- "Exit"
    

## Technologies
                           
- [Node.js](https://nodejs.org/)
- [Inquirer (npm package)](https://www.npmjs.com/package/inquirer)                                               
- [MySql (npm package)](https://www.npmjs.com/package/mysql)
- [MySql Workbench](https://www.mysql.com/)
- [Console.Table (npm package)](https://www.npmjs.com/package/console.table)
- [Bootstrap](https://getbootstrap.com/)


## Languages/Libraries

- JavaScript
- MySql
- HTML
- CSS


## Questions

If you have any questions about the repo, please open an issue 
