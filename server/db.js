const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'lua_payroll.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function initDb() {
  ensureDir();
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
  migrate(db);

  return db;
}

/** Migration nhẹ — không xóa dữ liệu cũ */
function migrate(db) {
  const cols = db.prepare('PRAGMA table_info(users)').all().map((c) => c.name);
  if (!cols.includes('employee_id')) {
    db.exec('ALTER TABLE users ADD COLUMN employee_id INTEGER REFERENCES employees(id)');
  }

  const ddl = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'").get();
  if (ddl?.sql && !ddl.sql.includes("'employee'")) {
    db.exec(`
      CREATE TABLE users_v2 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'accountant', 'manager', 'employee')),
        employee_id INTEGER REFERENCES employees(id),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO users_v2 (id, username, password_hash, name, role, employee_id, created_at)
        SELECT id, username, password_hash, name, role, employee_id, created_at FROM users;
      DROP TABLE users;
      ALTER TABLE users_v2 RENAME TO users;
    `);
  }
}

let _db = null;

function getDb() {
  if (!_db) _db = initDb();
  return _db;
}

function getSettings() {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const map = {};
  for (const r of rows) map[r.key] = r.value;
  return map;
}

function getSetting(key, fallback = null) {
  const row = getDb().prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : fallback;
}

function setSetting(key, value) {
  getDb().prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
  ).run(key, String(value));
}

const DEFAULT_SETTINGS = {
  company_name: 'Ông Mập by H2T',
  company_logo: '/assets/ong-map-mark.svg',
  standard_work_days: '26',
  overtime_multiplier: '1.5',
  unpaid_leave_deduction_type: 'daily_rate',
  advance_limit_percent: '50',
  annual_leave_days: '12',
};

function ensureDefaultSettings() {
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    const existing = getSetting(key);
    if (existing === null) setSetting(key, value);
  }
}

module.exports = { getDb, getSettings, getSetting, setSetting, ensureDefaultSettings, DB_PATH };
