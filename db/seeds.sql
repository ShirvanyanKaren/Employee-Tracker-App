INSERT INTO department (depatment_name)
VALUES ("Sales"),
       ("Finance"),
       ("Software Engineering"),
       ("Accounting");
      

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Sales Person", 75000, 1),
       ("Financial Analyst", 100000, 2),
       ("Quant Finance Analyst", 150000, 2),
       ("Lead Software Engineer", 150000, 3),
       ("Software Engineer", 120000, 3),
       ("CPA", 100000, 4);
       


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael","Scott", 1, null),
       ("Bruce","Wayne", 4, null),
       ("Erik","Jones", 2, 1),
       ("Michael","Fox", 5, null),
       ("Joe","Rogan", 6, 4),
       ("Robert","Patinson", 3, 2),
       ("Dwight","Shrute", 2, 1),
       ("Natalie","Smith", 7, null);
       