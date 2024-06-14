-- Populating the events table with dummy data
INSERT INTO events (id, created_at, name, date, venue_id, is_starred, private, cancelled) VALUES
(1, '2023-01-01 10:00:00', 'Event 1', '2023-01-10', 1, false, false, false),
(2, '2023-01-02 11:00:00', 'Event 2', '2023-01-11', 2, true, false, false),
(3, '2023-01-03 12:00:00', 'Event 3', '2023-01-12', 3, false, true, false),
(4, '2023-01-04 13:00:00', 'Event 4', '2023-01-13', 4, true, false, true),
(5, '2023-01-05 14:00:00', 'Event 5', '2023-01-14', 5, false, false, false);

-- Populating the comments table with dummy data
INSERT INTO comments (id, created_at, content, event_id) VALUES
(1, '2023-01-01 10:00:00', 'This is a comment for Event 1', 1),
(2, '2023-01-02 11:00:00', 'This is a comment for Event 2', 2),
(3, '2023-01-03 12:00:00', 'This is a comment for Event 3', 3),
(4, '2023-01-04 13:00:00', 'This is a comment for Event 4', 4),
(5, '2023-01-05 14:00:00', 'This is a comment for Event 5', 5);