-- Create types for One Piece Characters.
INSERT INTO department (id, department_name)
VALUES (1, "Strong Pirate"),
       (2, "Emperor of the Sea"),
       (3, "Navy"),
       (4, "ShiChibukai"), 
       (5, "Worst Generation"), 
       (6, "Civilian");

-- Create roles for One Piece Characters.
INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1, "Captain", 850000000, 1),
       (2, "Vice-Captain", 60000000, 1),
       (3, "The Big 5", 4000000000, 2),
       (4, "Admiral", 1000000000, 3),
       (5, "Vice-Admiral", 500000000, 3),
       (6, "Current", 650000000, 4)
       (7, "Former", 450000000, 4),
       (8, "Pirate", 300000000, 5),
       (9, "Bystander", 500, 6);

-- Create information for One Piece Characters.
INSERT INTO department_info (id, first_name, last_name, role_id)
VALUES (1, "Monkey D.", "Luffy", 3),
       (2, "Roronoa", "Zoro", 2),
       (3, "Marshall D.", "Teach", 3),
       (4, "Charolette", "LinLin", 3),
       (5, "Trafalgar D.", "Law", 1),
       (6, "Eustass", "Kidd", 1),
       (7, "Nico", "Robin", 8),
       (8, "Vinsmoke", "Sanji", 8),
       (9, "Dracule", "Mihawk", 7),
       (10, "Donquixote", "Doflamingo", 6),
       (11, "Sir", "Crocodile", 7),
       (12, "Borsalino", "Kizaru", 4),
       (13, "Sakazuki", "Akainu", 4),
       (14, "Issho", "Fujitora", 5),
       (15, "Kozuki", "Momonosuke", 9);