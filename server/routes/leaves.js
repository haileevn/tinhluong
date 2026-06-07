const express = require('express');
const { getDb } = require('../db');
const { requirePermission } = require('../middleware/auth');

const router = express.Router();

const LEAVE_TYPES = ['paid', 'unpaid', 'sick', 'personal'];

router.get('/', requirePermission('leaves:read'), (req, res) => {
  const { year, month, employee_id } = req.query;
  let sql = `
    SELECT l.*, e.code as employee_code, e.name as employee_name
    FROM leaves l JOIN employees e ON e.id = l.employee_id
    WHERE e.deleted_at IS NULL
  `;
  const params = [];
  if (employee_id) { sql += ' AND l.employee_id = ?'; params.push(employee_id); }
  if (year && month) {
    sql += ' AND l.leave_date LIKE ?';
    params.push(`${year}-${String(month).padStart(2, '0')}%`);
  }
  sql += ' ORDER BY l.leave_date DESC';
  res.json(getDb().prepare(sql).all(...params));
});

router.get('/summary', requirePermission('leaves:read'), (req, res) => {
  const { year, month } = req.query;
  if (!year || !month) return res.status(400).json({ error: 'Cần year và month' });

  const rows = getDb().prepare(`
    SELECT e.id as employee_id, e.code, e.name,
      COALESCE(SUM(l.days),0) as total_days,
      COALESCE(SUM(CASE WHEN l.leave_type='paid' THEN l.days ELSE 0 END),0) as paid_days,
      COALESCE(SUM(CASE WHEN l.leave_type='unpaid' THEN l.days ELSE 0 END),0) as unpaid_days,
      COALESCE(SUM(CASE WHEN l.leave_type='sick' THEN l.days ELSE 0 END),0) as sick_days,
      COALESCE(SUM(CASE WHEN l.leave_type='personal' THEN l.days ELSE 0 END),0) as personal_days
    FROM employees e
    LEFT JOIN leaves l ON l.employee_id = e.id AND l.leave_date LIKE ?
    WHERE e.deleted_at IS NULL AND e.status = 'active'
    GROUP BY e.id ORDER BY total_days DESC
  `).all(`${year}-${String(month).padStart(2, '0')}%`);

  res.json(rows);
});

router.post('/', requirePermission('leaves:write'), (req, res) => {
  const { employee_id, leave_date, leave_type, days, notes } = req.body || {};
  if (!employee_id || !leave_date || !leave_type) {
    return res.status(400).json({ error: 'Nhân viên, ngày nghỉ và loại nghỉ là bắt buộc' });
  }
  if (!LEAVE_TYPES.includes(leave_type)) {
    return res.status(400).json({ error: 'Loại nghỉ không hợp lệ' });
  }
  if (Number(days) <= 0) return res.status(400).json({ error: 'Số ngày nghỉ phải lớn hơn 0' });

  const r = getDb().prepare(`
    INSERT INTO leaves (employee_id, leave_date, leave_type, days, notes) VALUES (?, ?, ?, ?, ?)
  `).run(employee_id, leave_date, leave_type, Number(days), notes || '');

  const row = getDb().prepare(`
    SELECT l.*, e.code as employee_code, e.name as employee_name
    FROM leaves l JOIN employees e ON e.id = l.employee_id WHERE l.id = ?
  `).get(r.lastInsertRowid);
  res.status(201).json(row);
});

router.put('/:id', requirePermission('leaves:write'), (req, res) => {
  const existing = getDb().prepare('SELECT * FROM leaves WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });

  const { leave_date, leave_type, days, notes } = req.body || {};
  getDb().prepare(`
    UPDATE leaves SET leave_date=?, leave_type=?, days=?, notes=? WHERE id=?
  `).run(
    leave_date || existing.leave_date,
    leave_type || existing.leave_type,
    Number(days ?? existing.days),
    notes ?? existing.notes,
    req.params.id
  );
  res.json(getDb().prepare('SELECT * FROM leaves WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requirePermission('leaves:write'), (req, res) => {
  const r = getDb().prepare('DELETE FROM leaves WHERE id = ?').run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json({ ok: true });
});

module.exports = router;
