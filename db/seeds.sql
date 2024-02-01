INSERT INTO department (name)
VALUES  ("produce"),
        ("cosmetics"),
        ("bakery"),
        ("deli"),
        ("dairy"),
        ("customer service");

INSERT INTO roles (title, salary, department_id)
VALUES  ("cashier", 40000, 2),
        ("dairy associate", 40000, 5),
        ("stocker", 40000, 1),
        ("representative", 45000, 6),
        ("baker", 45000, 3),
        ("salesperson", 55000, 2),
        ("butcher", 65000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Matt", "Smith", 2, 2),
        ("Mark", "Hamill", 4, 3),
        ("Mitchell", "Musso", 3, 5),
        ("Mariah", "Carrey", 5, 2),
        ("Matthew", "Perry", 1, 1),
        ("Matthew", "McConaughey", 6),
        ("Michael", "Jackson", 4, 3);