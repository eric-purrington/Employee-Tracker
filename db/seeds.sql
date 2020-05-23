insert into departments (department) values 
("Accounting"), 
("Sales"), 
("Human Resources"), 
("IT");

insert into roles (title, salary, department_id) values 
("Head of Accounting", 90000, 1), 
("Accountant", 70000, 1), 
("Head of Sales", 80000, 2), 
("Salesperson", 60000, 2), 
("HR Rep", 75000, 3), 
("Head of IT", 75000, 4), 
("IT Technician", 65000, 4);

insert into employees (first_name, last_name, role_id, manager_id) values 
("Sam", "Paulson", 1, null),
("Kevin", "Melon", 2, 1),
("Annie", "Wrinehart", 2, 1),
("Jim", "Hambag", 3, null),
("Andy", "Davidson", 4, 4),
("Toby", "McDonald", 5, null),
("Jen", "Barber", 6, null),
("Maurice", "Moss", 7, 7),
("Roy", "Trenneman", 7, 7),
("Richmond", "Avenal", 7, 7);
