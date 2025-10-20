PRAGMA foreign_keys = ON;

-- ===========================
--  TABLE: SCOUTS
-- ===========================
CREATE TABLE scouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  leader_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  badge_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  requirements TEXT,
  created_at TEXT,
  badge_type TEXT
);

-- ===========================
--  TABLE: ATTENDANCE_SCOUTS
-- ===========================
CREATE TABLE attendance_scouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attendance_id INTEGER,
  scout_id INTEGER,
  FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
  FOREIGN KEY (scout_id) REFERENCES scouts(id) ON DELETE CASCADE
);

-- ===========================
--  TABLE: ATTENDANCE_LEADERS
-- ===========================
CREATE TABLE attendance_leaders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attendance_id INTEGER,
  leader_id INTEGER,
  FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE,
  FOREIGN KEY (leader_id) REFERENCES leaders(leader_id) ON DELETE CASCADE
);

-- ===========================
--  TABLE: BADGES_SCOUTS
-- ===========================
CREATE TABLE badges_scouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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

-- ===========================
--  INDEXES FOR SCOUTS
-- ===========================
-- Index on crew_leader_id for fast lookup of scouts by their leader
CREATE INDEX idx_scouts_crew_leader_id ON scouts(crew_leader_id);

-- ===========================
--  INDEXES FOR ATTENDANCE_SCOUTS
-- ===========================
CREATE INDEX idx_attendance_scouts_scout_id ON attendance_scouts(scout_id);
CREATE INDEX idx_attendance_scouts_attendance_id ON attendance_scouts(attendance_id);

-- ===========================
--  INDEXES FOR ATTENDANCE_LEADERS
-- ===========================
CREATE INDEX idx_attendance_leaders_attendance_id ON attendance_leaders(attendance_id);
CREATE INDEX idx_attendance_leaders_leader_id ON attendance_leaders(leader_id);

-- ===========================
--  INDEXES FOR BADGES_SCOUTS
-- ===========================
CREATE INDEX idx_badges_scouts_scout_id ON badges_scouts(scout_id);
CREATE INDEX idx_badges_scouts_badge_id ON badges_scouts(badge_id);
CREATE INDEX idx_badges_scouts_awarded_by ON badges_scouts(awarded_by);

-- ===========================
--  INDEXES FOR ATTENDANCE
-- ===========================
CREATE INDEX idx_attendance_created_by_id ON attendance(created_by_id);

-- ===========================
--  INDEXES FOR NOTICES
-- ===========================
CREATE INDEX idx_notices_created_by_id ON notices(created_by_id);

-- ===========================
--  INDEXES FOR LEADERINFO
-- ===========================
CREATE INDEX idx_leaderinfo_created_by_id ON leaderinfo(created_by_id);

-- ===========================
--  INDEXES FOR RANK_HISTORY
-- ===========================
CREATE INDEX idx_rank_history_scout_id ON rank_history(scout_id);
CREATE INDEX idx_rank_history_awarded_by ON rank_history(awarded_by);

-- ===========================
--  INDEXES FOR CREW_HISTORY
-- ===========================
CREATE INDEX idx_crew_history_scout_id ON crew_history(scout_id);
CREATE INDEX idx_crew_history_awarded_by ON crew_history(awarded_by);
