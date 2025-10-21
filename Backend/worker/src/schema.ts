import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ===========================
// SCOUTS
// ===========================
export const scouts = sqliteTable("scouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  first_name: text("first_name"),
  last_name: text("last_name"),
  crew: text("crew"),
  rank: text("rank"),
  clerk_id: text("clerk_id"),
  // self-reference removed for TypeScript safety
  crew_leader_id: integer("crew_leader_id"),
});

// ===========================
// LEADERS
// ===========================
export const leaders = sqliteTable("leaders", {
  leader_id: integer("leader_id").primaryKey({ autoIncrement: true }),
  first_name: text("first_name"),
  last_name: text("last_name"),
  section: text("section"),
  rank: text("rank"),
  clerk_id: text("clerk_id"),
});

// ===========================
// ATTENDANCE
// ===========================
export const attendance = sqliteTable("attendance", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activity: text("activity"),
  notes: text("notes"),
  date: text("date"),
  activity_type: text("activity_type"),
  created_by_id: integer("created_by_id"), // FK in DB exists
  created_at: text("created_at"),
});

// ===========================
// BADGES
// ===========================
export const badges = sqliteTable("badges", {
  badge_id: integer("badge_id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  requirements: text("requirements"),
  created_at: text("created_at"),
  badge_type: text("badge_type"),
});

// ===========================
// ATTENDANCE_SCOUTS
// ===========================
export const attendance_scouts = sqliteTable("attendance_scouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  attendance_id: integer("attendance_id"),
  scout_id: integer("scout_id"),
});

// ===========================
// ATTENDANCE_LEADERS
// ===========================
export const attendance_leaders = sqliteTable("attendance_leaders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  attendance_id: integer("attendance_id"),
  leader_id: integer("leader_id"),
});

// ===========================
// BADGES_SCOUTS
// ===========================
export const badges_scouts = sqliteTable("badges_scouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  badge_id: integer("badge_id"),
  scout_id: integer("scout_id"),
  date_earned: text("date_earned"),
  awarded_by: integer("awarded_by"),
  physically_obtained: integer("physically_obtained", { mode: "boolean" }),
});

// ===========================
// NOTICES
// ===========================
export const notices = sqliteTable("notices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title"),
  description: text("description"),
  created_at: text("created_at"),
  created_by_id: integer("created_by_id"),
  active: integer("active", { mode: "boolean" }),
});

// ===========================
// LEADERINFO
// ===========================
export const leaderinfo = sqliteTable("leaderinfo", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content"),
  created_at: text("created_at"),
  created_by_id: integer("created_by_id"),
  active: integer("active", { mode: "boolean" }),
});

// ===========================
// RANK_HISTORY
// ===========================
export const rank_history = sqliteTable("rank_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  scout_id: integer("scout_id"),
  rank: text("rank"),
  date_assigned: text("date_assigned"),
  awarded_by: integer("awarded_by"),
  start_date: text("start_date"),
  end_date: text("end_date"),
  new_value: text("new_value"),
  old_value: text("old_value"),
});

// ===========================
// CREW_HISTORY
// ===========================
export const crew_history = sqliteTable("crew_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  scout_id: integer("scout_id"),
  crew: text("crew"),
  date_assigned: text("date_assigned"),
  awarded_by: integer("awarded_by"),
  start_date: text("start_date"),
  end_date: text("end_date"),
  new_value: text("new_value"),
  old_value: text("old_value"),
});
