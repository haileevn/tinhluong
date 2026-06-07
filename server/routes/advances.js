const express = require('express');
const { getDb, getSettings } = require('../db');
const { requirePermission } = require('../middleware/auth');
const { estimateGrossForAdvanceCheck } = require('../services/payrollCalculator');

const router = express.Router();

router.get('/', requirePermission('advances:read'), (req, res) => {
  const { year, month, employee_id } = req.query;
  let sql = `
    SELECT sa.*, e.code as employee_code, e.name as employee_name, e.position
    FROM salary_advances sa
    JOIN employees e ON e.id = sa.employee_id
    WHERE e.deleted_at IS NULL
  `;
  const params = [];
  if (employee_id) { sql += ' AND sa.employee_id = ?'; params.push(employee_id); }
  if (year && month) {
    sql += ' AND sa.advance_date LIKE ?';
    params.push(`${year}-${String(month).padStart(2, '0')}%`);
  }
  sql += ' ORDER BY sa.advance_date DESC';
  res.json(getDb().prepare(sql).all(...params));
});

router.get('/check-limit', requirePermission('advances:read'), (req, res) => {
  const { employee_id, amount, year, month } = req.query;
  if (!employee_id || !amount || !year || !month) {
    return res.status(400).json({ error: 'Thiếu tham số' });
  }

  const db = getDb();
  const employee = db.prepare('SELECT * FROM employees WHERE id = ? AND deleted_at IS NULL').get(employee_id);
  if (!employee) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });

  const settings = getSettings();
  const limitPercent = Number(settings.advance_limit_percent) || 50;
  const gross = estimateGrossForAdvanceCheck(employee, Number(year), Number(month), db, settings);
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const currentAdvance = db.prepare(`
    SELECT COALESCE(SUM(amount),0) as total FROM salary_advances
    WHERE employee_id=? AND advance_date LIKE ?
  `).get(employee_id, `${prefix}%`).total;

  const maxAdvance = Math.round(gross * limitPercent / 100);
  const newTotal = currentAdvance + Number(amount);
  const exceeded = newTotal > maxAdvance;

  res.json({
    gross_estimate: gross,
    current_advance: currentAdvance,
    max_advance: maxAdvance,
    limit_percent: limitPercent,
    new_total: newTotal,
    exceeded,
    warning: exceeded
      ? `Tổng ứng (${newTotal.toLocaleString('vi-VN')} ₫) vượt hạn mức ${limitPercent}% lương tạm tính (${maxAdvance.toLocaleString('vi-VN')} ₫)`
      : null,
  });
});

router.post('/', requirePermission('advances:write'), (req, res) => {
  const { employee_id, advance_date, amount, approved_by, notes } = req.body || {};
  if (!employee_id || !advance_date) {
    return res.status(400).json({ error: 'Nhân viên và ngày ứng là bắt buộc' });
  }
  const amt = Number(amount);
  if (!amt || amt <= 0) return res.status(400).json({ error: 'Số tiền ứng phải lớn hơn 0' });

  const r = getDb().prepare(`
    INSERT INTO salary_advances (employee_id, advance_date, amount, approved_by, notes)
    VALUES (?, ?, ?, ?, ?)
  `).run(employee_id, advance_date, amt, approved_by || req.user.name, notes || '');

  const row = getDb().prepare(`
    SELECT sa.*, e.code as employee_code, e.name as employee_name
    FROM salary_advances sa JOIN employees e ON e.id = sa.employee_id WHERE sa.id = ?
  `).get(r.lastInsertRowid);
  res.status(201).json(row);
});

router.put('/:id', requirePermission('advances:write'), (req, res) => {
  const existing = getDb().prepare('SELECT * FROM salary_advances WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Không tìm thấy' });

  const { advance_date, amount, approved_by, notes } = req.body || {};
  const amt = amount != null ? Number(amount) : existing.amount;
  if (amt <= 0) return res.status(400).json({ error: 'Số tiền ứng phải lớn hơn 0' });

  getDb().prepare(`
    UPDATE salary_advances SET advance_date=?, amount=?, approved_by=?, notes=? WHERE id=?
  `).run(advance_date || existing.advance_date, amt, approved_by ?? existing.approved_by, notes ?? existing.notes, req.params.id);

  res.json(getDb().prepare('SELECT * FROM salary_advances WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requirePermission('advances:write'), (req, res) => {
  const r = getDb().prepare('DELETE FROM salary_advances WHERE id = ?').run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json({ ok: true });
});

module.exports = router;
