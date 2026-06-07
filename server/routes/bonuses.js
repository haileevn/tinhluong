const express = require('express');
const { getDb } = require('../db');
const { requirePermission } = require('../middleware/auth');

const router = express.Router();

router.get('/', requirePermission('bonuses:read'), (req, res) => {
  const { year, month, employee_id, type } = req.query;
  let sql = `
    SELECT bp.*, e.code as employee_code, e.name as employee_name
    FROM bonuses_penalties bp
    JOIN employees e ON e.id = bp.employee_id
    WHERE e.deleted_at IS NULL
  `;
  const params = [];
  if (employee_id) { sql += ' AND bp.employee_id = ?'; params.push(employee_id); }
  if (type) { sql += ' AND bp.type = ?'; params.push(type); }
  if (year && month) {
    sql += ' AND bp.record_date LIKE ?';
    params.push(`${year}-${String(month).padStart(2, '0')}%`);
  }
  sql += ' ORDER BY bp.record_date DESC';
  res.json(getDb().prepare(sql).all(...params));
});

router.get('/summary', requirePermission('bonuses:read'), (req, res) => {
  const { year, month } = req.query;
  if (!year || !month) return res.status(400).json({ error: 'Cần year và month' });

  const row = getDb().prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN type='bonus' THEN amount ELSE 0 END),0) as total_bonus,
      COALESCE(SUM(CASE WHEN type='penalty' THEN amount ELSE 0 END),0) as total_penalty,
      COUNT(*) as total_records
    FROM bonuses_penalties WHERE record_date LIKE ?
  `).get(`${year}-${String(month).padStart(2, '0')}%`);

  res.json(row);
});

router.post('/', requirePermission('bonuses:write'), (req, res) => {
  const { employee_id, record_date, type, amount, reason, notes } = req.body || {};
  if (!employee_id || !record_date || !type) {
    return res.status(400).json({ error: 'Nhân viên, ngày và loại là bắt buộc' });
  }
  if (!['bonus', 'penalty'].includes(type)) {
    return res.status(400).json({ error: 'Loại phải là bonus hoặc penalty' });
  }
  const amt = Number(amount);
  if (!amt || amt <= 0) return res.status(400).json({ error: 'Số tiền phải lớn hơn 0' });

  const r = getDb().prepare(`
    INSERT INTO bonuses_penalties (employee_id, record_date, type, amount, reason, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(employee_id, record_date, type, amt, reason || '', notes || '');

  const row = getDb().prepare(`
    SELECT bp.*, e.code as employee_code, e.name as employee_name
    FROM bonuses_penalties bp JOIN employees e ON e.id = bp.employee_id WHERE bp.id = ?
  `).get(r.lastInsertRowid);
  res.status(201).json(row);
});

router.put('/:id', requirePermission('bonuses:write'), (req, res) => {
  const existing = getDb().prepare('SELECT * FROM bonuses_penalties WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });

  const { record_date, type, amount, reason, notes } = req.body || {};
  const amt = amount != null ? Number(amount) : existing.amount;
  if (amt <= 0) return res.status(400).json({ error: 'Số tiền phải lớn hơn 0' });

  getDb().prepare(`
    UPDATE bonuses_penalties SET record_date=?, type=?, amount=?, reason=?, notes=? WHERE id=?
  `).run(
    record_date || existing.record_date, type || existing.type, amt,
    reason ?? existing.reason, notes ?? existing.notes, req.params.id
  );
  res.json(getDb().prepare('SELECT * FROM bonuses_penalties WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requirePermission('bonuses:write'), (req, res) => {
  const r = getDb().prepare('DELETE FROM bonuses_penalties WHERE id = ?').run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json({ ok: true });
});

module.exports = router;
