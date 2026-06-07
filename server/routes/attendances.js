const express = require('express');
const { getDb } = require('../db');
const { requirePermission } = require('../middleware/auth');

const router = express.Router();

function monthPrefix(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

router.get('/', requirePermission('attendance:read'), (req, res) => {
  const { year, month, employee_id, date } = req.query;
  let sql = `
    SELECT a.*, e.code as employee_code, e.name as employee_name, e.salary_type
    FROM attendances a
    JOIN employees e ON e.id = a.employee_id
    WHERE e.deleted_at IS NULL
  `;
  const params = [];

  if (employee_id) { sql += ' AND a.employee_id = ?'; params.push(employee_id); }
  if (date) { sql += ' AND a.work_date = ?'; params.push(date); }
  if (year && month) { sql += ' AND a.work_date LIKE ?'; params.push(`${monthPrefix(year, month)}%`); }

  sql += ' ORDER BY a.work_date DESC, e.name ASC';
  res.json(getDb().prepare(sql).all(...params));
});

router.get('/summary', requirePermission('attendance:read'), (req, res) => {
  const { year, month } = req.query;
  if (!year || !month) return res.status(400).json({ error: 'Cần year và month' });

  const rows = getDb().prepare(`
    SELECT e.id as employee_id, e.code, e.name, e.salary_type,
      COALESCE(SUM(a.work_units),0) as total_work_units,
      COALESCE(SUM(a.hours),0) as total_hours,
      COALESCE(SUM(a.overtime_hours),0) as total_overtime_hours,
      COUNT(a.id) as attendance_days
    FROM employees e
    LEFT JOIN attendances a ON a.employee_id = e.id AND a.work_date LIKE ?
    WHERE e.deleted_at IS NULL AND e.status = 'active'
    GROUP BY e.id
    ORDER BY e.name
  `).all(`${monthPrefix(year, month)}%`);

  res.json(rows);
});

router.post('/', requirePermission('attendance:write'), (req, res) => {
  const { employee_id, work_date, work_units, hours, overtime_hours, notes } = req.body || {};
  if (!employee_id || !work_date) {
    return res.status(400).json({ error: 'Nhân viên và ngày làm việc là bắt buộc' });
  }

  const emp = getDb().prepare("SELECT id FROM employees WHERE id=? AND deleted_at IS NULL AND status='active'").get(employee_id);
  if (!emp) return res.status(400).json({ error: 'Nhân viên không hợp lệ' });

  const dup = getDb().prepare('SELECT id FROM attendances WHERE employee_id=? AND work_date=?').get(employee_id, work_date);
  if (dup) return res.status(409).json({ error: 'Đã có công cho nhân viên này trong ngày này', duplicate: true });

  const r = getDb().prepare(`
    INSERT INTO attendances (employee_id, work_date, work_units, hours, overtime_hours, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(employee_id, work_date, Number(work_units) || 1, Number(hours) || 0, Number(overtime_hours) || 0, notes || '');

  const row = getDb().prepare(`
    SELECT a.*, e.code as employee_code, e.name as employee_name
    FROM attendances a JOIN employees e ON e.id = a.employee_id WHERE a.id = ?
  `).get(r.lastInsertRowid);
  res.status(201).json(row);
});

router.put('/:id', requirePermission('attendance:write'), (req, res) => {
  const existing = getDb().prepare('SELECT * FROM attendances WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Không tìm thấy bản ghi công' });

  const locked = isMonthLocked(existing.work_date);
  if (locked) return res.status(403).json({ error: 'Kỳ lương đã chốt, không thể sửa công. Hãy mở khóa kỳ lương trước.' });

  const { work_units, hours, overtime_hours, notes, work_date } = req.body || {};
  if (work_date && work_date !== existing.work_date) {
    const dup = getDb().prepare('SELECT id FROM attendances WHERE employee_id=? AND work_date=? AND id!=?')
      .get(existing.employee_id, work_date, req.params.id);
    if (dup) return res.status(409).json({ error: 'Đã có công cho nhân viên này trong ngày này', duplicate: true });
  }

  getDb().prepare(`
    UPDATE attendances SET work_date=?, work_units=?, hours=?, overtime_hours=?, notes=?
    WHERE id=?
  `).run(
    work_date || existing.work_date,
    Number(work_units ?? existing.work_units),
    Number(hours ?? existing.hours),
    Number(overtime_hours ?? existing.overtime_hours),
    notes ?? existing.notes,
    req.params.id
  );

  const row = getDb().prepare('SELECT * FROM attendances WHERE id = ?').get(req.params.id);
  res.json(row);
});

router.delete('/:id', requirePermission('attendance:write'), (req, res) => {
  const existing = getDb().prepare('SELECT * FROM attendances WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });
  if (isMonthLocked(existing.work_date)) {
    return res.status(403).json({ error: 'Kỳ lương đã chốt, không thể xóa công' });
  }
  getDb().prepare('DELETE FROM attendances WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

function isMonthLocked(isoDate) {
  const [y, m] = isoDate.split('-').map(Number);
  const p = getDb().prepare("SELECT status FROM payrolls WHERE year=? AND month=?").get(y, m);
  return p && (p.status === 'locked' || p.status === 'paid');
}

module.exports = router;
