PRAGMA foreign_keys = ON;

-- ===========================
--  TABLE: SCOUTS
-- ===========================
CREATE TABLE scouts (
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  crew TEXT,
  rank TEXT,
  crew_leader_id INTEGER,
  clerk_id TEXT,
  FOREIGN KEY (crew_leader_id) REFERENCES scouts(id) ON DELETE SET NULL
);

-- ===========================
--  TABLE: LEADERS
-- ===========================
CREATE TABLE leaders (
  leader_id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  section TEXT,
  rank TEXT,
  clerk_id TEXT
);

-- ===========================
--  TABLE: ATTENDANCE
-- ===========================
CREATE TABLE attendance (
  id INTEGER PRIMARY KEY,
  activity TEXT,
  notes TEXT,
  date TEXT,
  activity_type TEXT,
  created_by_id INTEGER,
  created_at TEXT,
  FOREIGN KEY (created_by_id) REFERENCES leaders(leader_id) ON DELETE SET NULL
);

-- ===========================
--  TABLE: BADGES
-- ===========================
CREATE TABLE badges (
  badge_id INTEGER PRIMARY KEY,
  name TEXT,
  requirements TEXT,
  created_at TEXT,
  badge_type TEXT
);

-- ===========================
--  TABLE: ATTENDANCE_SCOUTS
-- ===========================
CREATE TABLE attendance_scouts (
  id INTEGER PRIMARY KEY,
  attendance_id INTEGER,
  scout_id INTEGER,
  FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
  FOREIGN KEY (scout_id) REFERENCES scouts(id) ON DELETE CASCADE
);

-- ===========================
--  TABLE: ATTENDANCE_LEADERS
-- ===========================
CREATE TABLE attendance_leaders (
  id INTEGER PRIMARY KEY,
  attendance_id INTEGER,
  leader_id INTEGER,
  FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
  FOREIGN KEY (leader_id) REFERENCES leaders(leader_id) ON DELETE CASCADE
);

-- ===========================
--  TABLE: BADGES_SCOUTS
-- ===========================
CREATE TABLE badges_scouts (
  id INTEGER PRIMARY KEY,
  badge_id INTEGER,
  scout_id INTEGER,
  date_earned TEXT,
  awarded_by INTEGER,
  physically_obtained BOOLEAN,
  FOREIGN KEY (badge_id) REFERENCES badges(badge_id) ON DELETE CASCADE,
  FOREIGN KEY (scout_id) REFERENCES scouts(id) ON DELETE CASCADE,
  FOREIGN KEY (awarded_by) REFERENCES leaders(leader_id) ON DELETE SET NULL
);

-- ===========================
--  TABLE: NOTICES
-- ===========================
CREATE TABLE notices (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  created_at TEXT,
  created_by_id INTEGER,
  active BOOLEAN,
  FOREIGN KEY (created_by_id) REFERENCES leaders(leader_id) ON DELETE SET NULL
);

-- ===========================
--  TABLE: LEADERINFO
-- ===========================
CREATE TABLE leaderinfo (
  id INTEGER PRIMARY KEY,
  content TEXT,
  created_at TEXT,
  created_by_id INTEGER,
  active BOOLEAN,
  FOREIGN KEY (created_by_id) REFERENCES leaders(leader_id) ON DELETE SET NULL
);

-- ===========================
--  TABLE: RANK_HISTORY
-- ===========================
CREATE TABLE rank_history (
  id INTEGER PRIMARY KEY,
  scout_id INTEGER,
  rank TEXT,
  date_assigned TEXT,
  awarded_by INTEGER,
  start_date TEXT,
  end_date TEXT,
  new_value TEXT,
  old_value TEXT,
  FOREIGN KEY (scout_id) REFERENCES scouts(id) ON DELETE CASCADE,
  FOREIGN KEY (awarded_by) REFERENCES leaders(leader_id) ON DELETE SET NULL
);

-- ===========================
--  TABLE: CREW_HISTORY
-- ===========================
CREATE TABLE crew_history (
  id INTEGER PRIMARY KEY,
  scout_id INTEGER,
  crew TEXT,
  date_assigned TEXT,
  awarded_by INTEGER,
  start_date TEXT,
  end_date TEXT,
  new_value TEXT,
  old_value TEXT,
  FOREIGN KEY (scout_id) REFERENCES scouts(id) ON DELETE CASCADE,
  FOREIGN KEY (awarded_by) REFERENCES leaders(leader_id) ON DELETE SET NULL
);
