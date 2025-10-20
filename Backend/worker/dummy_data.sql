PRAGMA foreign_keys = ON;

-- ===========================
--  LEADERS
-- ===========================
INSERT INTO leaders (first_name, last_name, section, rank, clerk_id)
VALUES
('Alice', 'Johnson', 'Sea Scouts', 'Leader', 'clerk_001'),
('Bob', 'Smith', 'Sea Scouts', 'Leader', 'clerk_002'),
('Carol', 'Nguyen', 'Sea Scouts', 'Assistant Leader', 'clerk_003');

-- ===========================
--  SCOUTS
-- ===========================
-- Crew leaders must exist first; assign crew_leader_id after insert if needed
INSERT INTO scouts (first_name, last_name, crew, rank, crew_leader_id, clerk_id)
VALUES
('Brandon', 'Ashby', 'Crew A', 'Tenderfoot', 1, 'clerk_101'),
('Noah', 'Little', 'Crew A', 'Second Class', 1, 'clerk_102'),
('Theron', 'George', 'Crew B', 'First Class', 2, 'clerk_103'),
('Aaban', 'Ali', 'Crew B', 'Tenderfoot', 2, 'clerk_104');

-- ===========================
--  BADGES
-- ===========================
INSERT INTO badges (name, requirements, created_at, badge_type)
VALUES
('First Aid', 'Complete all first aid tasks', '2025-10-20', 'Skill'),
('Sailing', 'Demonstrate basic sailing skills', '2025-10-20', 'Activity'),
('Knot Tying', 'Tie 10 different knots', '2025-10-20', 'Skill');

-- ===========================
--  BADGES_SCOUTS
-- ===========================
INSERT INTO badges_scouts (badge_id, scout_id, date_earned, awarded_by, physically_obtained)
VALUES
(1, 1, '2025-10-20', 1, 1),
(2, 2, '2025-10-19', 2, 1),
(3, 3, '2025-10-18', 1, 0);

-- ===========================
--  ATTENDANCE
-- ===========================
INSERT INTO attendance (activity, notes, date, activity_type, created_by_id, created_at)
VALUES
('Boat Trip', 'Smooth sailing', '2025-10-20', 'Outdoor', 1, '2025-10-20'),
('Knot Workshop', 'Learned 5 new knots', '2025-10-18', 'Indoor', 2, '2025-10-18'),
('First Aid Training', 'Practiced CPR', '2025-10-17', 'Indoor', 3, '2025-10-17');

-- ===========================
--  ATTENDANCE_SCOUTS
-- ===========================
INSERT INTO attendance_scouts (attendance_id, scout_id)
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 1);

-- ===========================
--  ATTENDANCE_LEADERS
-- ===========================
INSERT INTO attendance_leaders (attendance_id, leader_id)
VALUES
(1, 1),
(2, 2),
(3, 3);

-- ===========================
--  NOTICES
-- ===========================
INSERT INTO notices (title, description, created_at, created_by_id, active)
VALUES
('Meeting Reminder', 'Crew A meeting on Friday', '2025-10-20', 1, 1),
('Safety Notice', 'Wear life jackets during boat trip', '2025-10-19', 2, 1),
('Badge Event', 'Knot tying workshop next week', '2025-10-18', 3, 0);

-- ===========================
--  LEADERINFO
-- ===========================
INSERT INTO leaderinfo (content, created_at, created_by_id, active)
VALUES
('Leaders must submit attendance weekly', '2025-10-20', 1, 1),
('Update badge requirements quarterly', '2025-10-19', 2, 1);

-- ===========================
--  RANK_HISTORY
-- ===========================
INSERT INTO rank_history (scout_id, rank, date_assigned, awarded_by, start_date, end_date, new_value, old_value)
VALUES
(1, 'Tenderfoot', '2025-09-01', 1, '2025-09-01', NULL, 'Tenderfoot', NULL),
(2, 'Second Class', '2025-08-15', 2, '2025-08-15', NULL, 'Second Class', 'Tenderfoot');

-- ===========================
--  CREW_HISTORY
-- ===========================
INSERT INTO crew_history (scout_id, crew, date_assigned, awarded_by, start_date, end_date, new_value, old_value)
VALUES
(1, 'Crew A', '2025-09-01', 1, '2025-09-01', NULL, 'Crew A', NULL),
(3, 'Crew B', '2025-08-10', 2, '2025-08-10', NULL, 'Crew B', NULL);
