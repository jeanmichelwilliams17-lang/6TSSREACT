-- ===========================
--  LEADERS
-- ===========================
INSERT INTO leaders (leader_id, first_name, last_name, section, rank, clerk_id)
VALUES
(1, 'Alice', 'Johnson', 'Sea Scouts', 'Leader', 'clerk_001'),
(2, 'Bob', 'Smith', 'Sea Scouts', 'Leader', 'clerk_002'),
(3, 'Carol', 'Nguyen', 'Sea Scouts', 'Assistant Leader', 'clerk_003');

-- ===========================
--  SCOUTS
-- ===========================
INSERT INTO scouts (id, first_name, last_name, crew, rank, crew_leader_id, clerk_id)
VALUES
(1, 'Brandon', 'Ashby', 'Crew A', 'Tenderfoot', 1, 'clerk_101'),
(2, 'Noah', 'Little', 'Crew A', 'Second Class', 1, 'clerk_102'),
(3, 'Theron', 'George', 'Crew B', 'First Class', 2, 'clerk_103'),
(4, 'Aaban', 'Ali', 'Crew B', 'Tenderfoot', 2, 'clerk_104');

-- ===========================
--  BADGES
-- ===========================
INSERT INTO badges (badge_id, name, requirements, created_at, badge_type)
VALUES
(1, 'First Aid', 'Complete all first aid tasks', '2025-10-20', 'Skill'),
(2, 'Sailing', 'Demonstrate basic sailing skills', '2025-10-20', 'Activity'),
(3, 'Knot Tying', 'Tie 10 different knots', '2025-10-20', 'Skill');

-- ===========================
--  BADGES_SCOUTS
-- ===========================
INSERT INTO badges_scouts (id, badge_id, scout_id, date_earned, awarded_by, physically_obtained)
VALUES
(1, 1, 1, '2025-10-20', 1, 1),
(2, 2, 2, '2025-10-19', 2, 1),
(3, 3, 3, '2025-10-18', 1, 0);

-- ===========================
--  ATTENDANCE
-- ===========================
INSERT INTO attendance (id, activity, notes, date, activity_type, created_by_id, created_at)
VALUES
(1, 'Boat Trip', 'Smooth sailing', '2025-10-20', 'Outdoor', 1, '2025-10-20'),
(2, 'Knot Workshop', 'Learned 5 new knots', '2025-10-18', 'Indoor', 2, '2025-10-18'),
(3, 'First Aid Training', 'Practiced CPR', '2025-10-17', 'Indoor', 3, '2025-10-17');

-- ===========================
--  ATTENDANCE_SCOUTS
-- ===========================
INSERT INTO attendance_scouts (id, attendance_id, scout_id)
VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 1);

-- ===========================
--  ATTENDANCE_LEADERS
-- ===========================
INSERT INTO attendance_leaders (id, attendance_id, leader_id)
VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- ===========================
--  NOTICES
-- ===========================
INSERT INTO notices (id, title, description, created_at, created_by_id, active)
VALUES
(1, 'Meeting Reminder', 'Crew A meeting on Friday', '2025-10-20', 1, 1),
(2, 'Safety Notice', 'Wear life jackets during boat trip', '2025-10-19', 2, 1),
(3, 'Badge Event', 'Knot tying workshop next week', '2025-10-18', 3, 0);

-- ===========================
--  LEADERINFO
-- ===========================
INSERT INTO leaderinfo (id, content, created_at, created_by_id, active)
VALUES
(1, 'Leaders must submit attendance weekly', '2025-10-20', 1, 1),
(2, 'Update badge requirements quarterly', '2025-10-19', 2, 1);

-- ===========================
--  RANK_HISTORY
-- ===========================
INSERT INTO rank_history (id, scout_id, rank, date_assigned, awarded_by, start_date, end_date, new_value, old_value)
VALUES
(1, 1, 'Tenderfoot', '2025-09-01', 1, '2025-09-01', NULL, 'Tenderfoot', NULL),
(2, 2, 'Second Class', '2025-08-15', 2, '2025-08-15', NULL, 'Second Class', 'Tenderfoot');

-- ===========================
--  CREW_HISTORY
-- ===========================
INSERT INTO crew_history (id, scout_id, crew, date_assigned, awarded_by, start_date, end_date, new_value, old_value)
VALUES
(1, 1, 'Crew A', '2025-09-01', 1, '2025-09-01', NULL, 'Crew A', NULL),
(2, 3, 'Crew B', '2025-08-10', 2, '2025-08-10', NULL, 'Crew B', NULL);
