-- BSAOS initial PostgreSQL schema draft.
-- IMPORTANT: This file has NOT been applied to Neon or any shared database.
-- Review against every module and test on a disposable PostgreSQL instance first.
BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE branches (
  code text PRIMARY KEY CHECK (code IN ('JAY','HBR','KOR','HUB')),
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE academic_years (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL UNIQUE,
  starts_on date NOT NULL,
  ends_on date NOT NULL,
  is_current boolean NOT NULL DEFAULT false,
  CHECK (starts_on <= ends_on),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX academic_years_one_current_idx ON academic_years (is_current) WHERE is_current;

CREATE TABLE app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  display_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('academic_in_charge','branch_academic_lead','teacher','director','system_admin','auditor')),
  is_active boolean NOT NULL DEFAULT true,
  email_verified_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email),
  CHECK (email = lower(trim(email)))
);

CREATE TABLE user_branch_access (
  user_id uuid NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  can_read boolean NOT NULL DEFAULT true,
  can_write boolean NOT NULL DEFAULT false,
  granted_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  granted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, branch_code),
  CHECK (NOT can_write OR can_read)
);

CREATE TABLE teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_code text NOT NULL,
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  full_name text NOT NULL,
  designation text NOT NULL DEFAULT '',
  department text NOT NULL DEFAULT '',
  qualification text NOT NULL DEFAULT '',
  experience_years numeric(4,1) NOT NULL DEFAULT 0 CHECK (experience_years >= 0),
  grade_bracket text NOT NULL CHECK (grade_bracket IN ('mother_teacher_1_2','grades_3_5','grades_6_10','montessori_pre_primary')),
  assigned_classes text[] NOT NULL DEFAULT '{}',
  subjects text[] NOT NULL DEFAULT '{}',
  approved_substitute_subjects text[] NOT NULL DEFAULT '{}',
  weekly_periods integer NOT NULL DEFAULT 0 CHECK (weekly_periods >= 0),
  contact_number text,
  email text,
  employment_status text NOT NULL DEFAULT 'active' CHECK (employment_status IN ('active','on_leave','probation','inactive')),
  joined_on date,
  coaching_stage text CHECK (coaching_stage IN ('developing','proficient','master_guide')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (branch_code, external_code)
);
CREATE INDEX teachers_branch_status_idx ON teachers(branch_code, employment_status);

CREATE TABLE teacher_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  attendance_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present','absent','on_duty','late','half_day')),
  check_in time,
  check_out time,
  leave_type text CHECK (leave_type IN ('casual','sick','academic_training','emergency')),
  remarks text NOT NULL DEFAULT '',
  recorded_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (teacher_id, attendance_date),
  CHECK (check_out IS NULL OR check_in IS NULL OR check_out >= check_in)
);
CREATE INDEX teacher_attendance_branch_date_idx ON teacher_attendance(branch_code, attendance_date);

CREATE TABLE timetable_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  academic_year_id uuid NOT NULL REFERENCES academic_years(id) ON DELETE RESTRICT,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 1 AND 6),
  period smallint NOT NULL CHECK (period BETWEEN 1 AND 20),
  grade text NOT NULL,
  section text NOT NULL DEFAULT '',
  subject text NOT NULL,
  starts_at time,
  ends_at time,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at > starts_at)
);
CREATE INDEX timetable_branch_year_day_idx ON timetable_entries(branch_code, academic_year_id, weekday, period) WHERE is_active;
CREATE INDEX timetable_teacher_day_idx ON timetable_entries(teacher_id, weekday, period) WHERE is_active;

CREATE TABLE substitution_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  absent_teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  request_date date NOT NULL,
  period smallint NOT NULL CHECK (period BETWEEN 1 AND 20),
  grade text NOT NULL,
  section text NOT NULL DEFAULT '',
  grade_bracket text NOT NULL CHECK (grade_bracket IN ('grades_1_2','grades_3_5','grades_6_10')),
  subject text NOT NULL,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('urgent','normal')),
  assigned_teacher_id uuid REFERENCES teachers(id) ON DELETE RESTRICT,
  assigned_rule_tier text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('assigned','pending','free_period_approved','cancelled')),
  created_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX substitution_branch_date_idx ON substitution_requests(branch_code, request_date, status);

CREATE TABLE daily_academic_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  report_date date NOT NULL,
  academic_year_id uuid NOT NULL REFERENCES academic_years(id) ON DELETE RESTRICT,
  term text NOT NULL,
  submitted_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  submitter_name text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  review_status text NOT NULL DEFAULT 'pending_review' CHECK (review_status IN ('verified','pending_review','flagged')),
  student_enrolled integer NOT NULL CHECK (student_enrolled > 0),
  student_present integer NOT NULL CHECK (student_present BETWEEN 0 AND student_enrolled),
  faculty_total integer NOT NULL CHECK (faculty_total > 0),
  faculty_present integer NOT NULL CHECK (faculty_present BETWEEN 0 AND faculty_total),
  events_and_celebrations text NOT NULL DEFAULT '',
  rrr_summary jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(rrr_summary) = 'array'),
  classroom_observations_summary jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(classroom_observations_summary) = 'array'),
  grade_support_summary jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(grade_support_summary) = 'array'),
  syllabus_highlights jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(syllabus_highlights) = 'array'),
  teacher_discussion jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(teacher_discussion) = 'object'),
  branch_visits text NOT NULL DEFAULT '',
  additional_work text NOT NULL DEFAULT '',
  closing_message text NOT NULL DEFAULT '',
  principal_remarks text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (branch_code, report_date, term)
);
CREATE INDEX dar_branch_date_idx ON daily_academic_reports(branch_code, report_date DESC);

CREATE TABLE classroom_observations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  observer_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  observation_date date NOT NULL,
  grade text NOT NULL,
  subject text NOT NULL,
  lesson_topic text NOT NULL DEFAULT '',
  observer_role text NOT NULL,
  domain_scores jsonb NOT NULL CHECK (jsonb_typeof(domain_scores) = 'object'),
  glows text NOT NULL DEFAULT '',
  grows text NOT NULL DEFAULT '',
  overall_rating text NOT NULL CHECK (overall_rating IN ('exceeds_standards','proficient','needs_coaching_support')),
  next_follow_up_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX observations_branch_date_idx ON classroom_observations(branch_code, observation_date DESC);

CREATE TABLE coaching_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  coach_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  cycle text NOT NULL,
  target_skill text NOT NULL,
  smart_goal text NOT NULL,
  action_steps jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(action_steps) = 'array'),
  resources_provided jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(resources_provided) = 'array'),
  start_date date NOT NULL,
  review_date date NOT NULL,
  progress_percent smallint NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  status text NOT NULL CHECK (status IN ('in_progress','achieved','needs_extension')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (review_date >= start_date)
);

CREATE TABLE training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  module_category text NOT NULL,
  trainer text NOT NULL,
  session_date date NOT NULL,
  duration text NOT NULL,
  mode text NOT NULL CHECK (mode IN ('in_campus_workshop','hybrid_session','certification_pathway')),
  status text NOT NULL CHECK (status IN ('upcoming','completed','open_for_enrolment')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE training_enrolments (
  session_id uuid NOT NULL REFERENCES training_sessions(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled','completed','cancelled')),
  completed_at timestamptz,
  PRIMARY KEY(session_id, teacher_id)
);

CREATE TABLE syllabus_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  academic_year_id uuid NOT NULL REFERENCES academic_years(id) ON DELETE RESTRICT,
  grade text NOT NULL,
  subject text NOT NULL,
  teacher_id uuid REFERENCES teachers(id) ON DELETE SET NULL,
  total_chapters integer NOT NULL CHECK (total_chapters >= 0),
  completed_chapters integer NOT NULL CHECK (completed_chapters BETWEEN 0 AND total_chapters),
  planned_chapters_to_date integer NOT NULL DEFAULT 0 CHECK (planned_chapters_to_date >= 0),
  status text NOT NULL CHECK (status IN ('on_track','delayed','ahead_of_schedule')),
  last_lesson_logged date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(branch_code, academic_year_id, grade, subject)
);

CREATE TABLE student_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  external_student_id text NOT NULL,
  student_display_name text NOT NULL,
  grade text NOT NULL,
  trigger_category text NOT NULL,
  subject_area text NOT NULL,
  assigned_educator_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  strategy_summary text NOT NULL,
  session_frequency text NOT NULL,
  target_review_date date NOT NULL,
  outcome_status text NOT NULL CHECK (outcome_status IN ('active_intervention','demonstrating_gains','resolved_exited')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX interventions_branch_grade_idx ON student_interventions(branch_code, grade, outcome_status);

CREATE TABLE support_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  grade text NOT NULL CHECK (grade IN ('Grade 9','Grade 10')),
  subject text NOT NULL,
  topic text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  mentor_teacher_id uuid REFERENCES teachers(id) ON DELETE SET NULL,
  target_group text NOT NULL,
  registered_count integer NOT NULL DEFAULT 0 CHECK (registered_count >= 0),
  attended_count integer NOT NULL DEFAULT 0 CHECK (attended_count BETWEEN 0 AND registered_count),
  status text NOT NULL CHECK (status IN ('scheduled','completed','ongoing')),
  venue text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE rrr_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  tier text NOT NULL CHECK (tier IN ('remedial_r1','revision_r2','retention_mastery_r3')),
  grade text NOT NULL,
  subject text NOT NULL,
  concept_focus text NOT NULL,
  lead_teacher_id uuid REFERENCES teachers(id) ON DELETE SET NULL,
  session_date date NOT NULL,
  student_count integer NOT NULL CHECK (student_count >= 0),
  mastery_rate numeric(5,2) NOT NULL CHECK (mastery_rate BETWEEN 0 AND 100),
  status text NOT NULL CHECK (status IN ('completed','scheduled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ptm_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  grade text NOT NULL,
  meeting_date date NOT NULL,
  scheduled_slots integer NOT NULL CHECK (scheduled_slots >= 0),
  attended_slots integer NOT NULL CHECK (attended_slots BETWEEN 0 AND scheduled_slots),
  average_parent_rating numeric(4,2) CHECK (average_parent_rating BETWEEN 0 AND 5),
  status text NOT NULL CHECK (status IN ('completed','scheduled')),
  coordinator_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  agenda text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE parent_communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  communication_date date NOT NULL,
  external_student_id text,
  student_display_name text NOT NULL,
  grade text NOT NULL,
  parent_display_name text NOT NULL,
  communication_type text NOT NULL CHECK (communication_type IN ('phone_consultation','in_person_conference','official_circular','counselling_sync')),
  subject text NOT NULL,
  summary text NOT NULL,
  initiated_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE parent_concerns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  ticket_code text NOT NULL,
  external_student_id text,
  student_display_name text NOT NULL,
  grade text NOT NULL,
  parent_display_name text NOT NULL,
  parent_contact text,
  logged_date date NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  assigned_officer_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  priority text NOT NULL CHECK (priority IN ('high','medium','low')),
  status text NOT NULL CHECK (status IN ('open','under_investigation','resolution_communicated','closed')),
  resolution_summary text,
  sla_days_remaining integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(branch_code, ticket_code)
);

CREATE TABLE leadership_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_code text NOT NULL REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  title text NOT NULL,
  category text NOT NULL,
  owner_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  due_date date NOT NULL,
  priority text NOT NULL CHECK (priority IN ('critical','high','routine')),
  status text NOT NULL CHECK (status IN ('pending_review','in_progress','awaiting_approval','closed')),
  created_by uuid REFERENCES app_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leadership_actions_branch_status_due_idx ON leadership_actions(branch_code, status, due_date);

CREATE TABLE magic_link_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at)
);
CREATE INDEX magic_link_tokens_expiry_idx ON magic_link_tokens(expires_at);

CREATE TABLE app_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at)
);
CREATE INDEX app_sessions_user_expiry_idx ON app_sessions(user_id, expires_at) WHERE revoked_at IS NULL;

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES app_users(id) ON DELETE SET NULL,
  branch_code text REFERENCES branches(code) ON UPDATE RESTRICT ON DELETE RESTRICT,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  request_id text,
  outcome text NOT NULL CHECK (outcome IN ('allowed','denied','failed')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_events_branch_created_idx ON audit_events(branch_code, created_at DESC);
CREATE INDEX audit_events_actor_created_idx ON audit_events(actor_user_id, created_at DESC);

-- Seed only canonical branch codes; names/locations should be owner-reviewed before application.
INSERT INTO branches (code, name, location) VALUES
  ('JAY', 'Jayanagar Main Campus', 'Bengaluru'),
  ('HBR', 'HBR Campus', 'Bengaluru'),
  ('KOR', 'Koramangala Campus', 'Bengaluru'),
  ('HUB', 'Hub Campus', 'Bengaluru');

COMMIT;
