INSERT INTO department (id, department_name)
VALUES (1, "Strong Pirate"),
       (2, "Emperor of the Sea"),
       (3, "Navy"),
       (4, "ShiChibukai"), 
       (5, "Worst Generation"), 
       (6, "Civilian");

INSERT INTO employee_role (id, title, berries, department_id)
VALUES (1, "Captain", 850000000, 1),
       (2, "Vice-Captain", 60000000, 1),
       (3, "The Big 5", 4000000000, 2),
       (4, "Admiral", 1000000000, 3),
       (5, "Vice-Admiral", 500000000, 3),
       (6, "Current", 650000000, 4)
       (7, "Former", 450000000, 4),
       (8, "Pirate", 300000000, 5),
       (9, "Bystander", 500, 6)