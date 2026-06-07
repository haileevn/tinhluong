-- Lúa Payroll — SQLite schema
-- Chạy tự động khi khởi động server (server/db.js)

PRAGMA foreign_keys = ON;

-- Người dùng hệ thống
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('admin', 'accountant', 'manager', 'employee')),
  employee_id   INTEGER REFERENCES employees(id),
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Cài đặt hệ thống (key-value)
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Nhân viên
CREATE TABLE IF NOT EXISTS employees (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  code         TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  phone        TEXT,
  position     TEXT,
  salary_type  TEXT NOT NULL CHECK (salary_type IN ('monthly', 'daily', 'hourly')),
  base_salary  INTEGER NOT NULL DEFAULT 0,
  start_date   TEXT,
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes        TEXT,
  deleted_at   TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Chấm công / ngày công
CREATE TABLE IF NOT EXISTS attendances (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id     INTEGER NOT NULL REFERENCES employees(id),
  work_date       TEXT NOT NULL,
  work_units      REAL NOT NULL DEFAULT 1,
  hours           REAL NOT NULL DEFAULT 0,
  overtime_hours  REAL NOT NULL DEFAULT 0,
  notes           TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (employee_id, work_date)
);

-- Ngày nghỉ
CREATE TABLE IF NOT EXISTS leaves (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL REFERENCES employees(id),
  leave_date  TEXT NOT NULL,
  leave_type  TEXT NOT NULL CHECK (leave_type IN ('paid', 'unpaid', 'sick', 'personal')),
  days        REAL NOT NULL DEFAULT 1,
  notes       TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Ứng lương
CREATE TABLE IF NOT EXISTS salary_advances (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id  INTEGER NOT NULL REFERENCES employees(id),
  advance_date TEXT NOT NULL,
  amount       INTEGER NOT NULL CHECK (amount > 0),
  approved_by  TEXT,
  notes        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Thưởng / Phạt
CREATE TABLE IF NOT EXISTS bonuses_penalties (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL REFERENCES employees(id),
  record_date TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('bonus', 'penalty')),
  amount      INTEGER NOT NULL CHECK (amount > 0),
  reason      TEXT,
  notes       TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Bảng lương theo tháng (header)
CREATE TABLE IF NOT EXISTS payrolls (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  year         INTEGER NOT NULL,
  month        INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'locked', 'paid')),
  total_amount INTEGER NOT NULL DEFAULT 0,
  locked_at    TEXT,
  paid_at      TEXT,
  unlocked_at  TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (year, month)
);

-- Chi tiết lương từng nhân viên trong kỳ
CREATE TABLE IF NOT EXISTS payroll_items (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  payroll_id          INTEGER NOT NULL REFERENCES payrolls(id) ON DELETE CASCADE,
  employee_id         INTEGER NOT NULL REFERENCES employees(id),
  base_salary         INTEGER NOT NULL DEFAULT 0,
  total_work_units    REAL NOT NULL DEFAULT 0,
  total_hours         REAL NOT NULL DEFAULT 0,
  total_paid_leave    REAL NOT NULL DEFAULT 0,
  total_unpaid_leave  REAL NOT NULL DEFAULT 0,
  total_advance       INTEGER NOT NULL DEFAULT 0,
  total_bonus         INTEGER NOT NULL DEFAULT 0,
  total_penalty       INTEGER NOT NULL DEFAULT 0,
  overtime_amount     INTEGER NOT NULL DEFAULT 0,
  unpaid_deduction    INTEGER NOT NULL DEFAULT 0,
  gross_salary        INTEGER NOT NULL DEFAULT 0,
  net_salary          INTEGER NOT NULL DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'locked', 'paid')),
  snapshot_json       TEXT,
  UNIQUE (payroll_id, employee_id)
);

CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employees_deleted ON employees(deleted_at);
CREATE INDEX IF NOT EXISTS idx_attendances_date ON attendances(work_date);
CREATE INDEX IF NOT EXISTS idx_leaves_date ON leaves(leave_date);
CREATE INDEX IF NOT EXISTS idx_advances_date ON salary_advances(advance_date);
CREATE INDEX IF NOT EXISTS idx_bonuses_date ON bonuses_penalties(record_date);
