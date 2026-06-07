const express = require('express');
const { getDb } = require('../db');
const { requirePermission } = require('../middleware/auth');

const router = express.Router();

function rowToEmployee(row) {
  if (!row) return null;
  return { ...row, deleted: !!row.deleted_at };
}

router.get('/', requirePermission('employees:read'), (req, res) => {
  const { q, status, position, include_deleted } = req.query;
  let sql = 'SELECT * FROM employees WHERE 1=1';
  const params = [];

  if (include_deleted !== '1') {
    sql += ' AND deleted_at IS NULL';
  }
  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  if (position) {
    sql += ' AND position LIKE ?';
    params.push(`%${position}%`);
  }
  if (q) {
    sql += ' AND (name LIKE ? OR code LIKE ? OR phone LIKE ?)';
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  sql += ' ORDER BY status ASC, name ASC';

  const rows = getDb().prepare(sql).all(...params);
  res.json(rows.map(rowToEmployee));
});

router.get('/:id', requirePermission('employees:read'), (req, res) => {
  const row = getDb().prepare('SELECT * FROM employees WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
  res.json(rowToEmployee(row));
});

router.get('/:id/history', requirePermission('employees:read'), (req, res) => {
  const id = req.params.id;
  const db = getDb();
  const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(id);
  if (!employee) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });

  const payrolls = db.prepare(`
    SELECT pi.*, p.year, p.month, p.status as payroll_status
    FROM payroll_items pi
    JOIN payrolls p ON p.id = pi.payroll_id
    WHERE pi.employee_id = ?
    ORDER BY p.year DESC, p.month DESC
  `).all(id);

  const advances = db.prepare(`
    SELECT * FROM salary_advances WHERE employee_id = ? ORDER BY advance_date DESC LIMIT 50
  `).all(id);

  const leaves = db.prepare(`
    SELECT * FROM leaves WHERE employee_id = ? ORDER BY leave_date DESC LIMIT 50
  `).all(id);

  res.json({ employee: rowToEmployee(employee), payrolls, advances, leaves });
});

router.post('/', requirePermission('employees:write'), (req, res) => {
  const { code, name, phone, position, salary_type, base_salary, start_date, status, notes } = req.body || {};
  if (!code?.trim() || !name?.trim()) {
    return res.status(400).json({ error: 'Mã nhân viên và họ tên là bắt buộc' });
  }
  if (!['monthly', 'daily', 'hourly'].includes(salary_type)) {
    return res.status(400).json({ error: 'Loại lương không hợp lệ' });
  }

  try {
    const r = getDb().prepare(`
      INSERT INTO employees (code, name, phone, position, salary_type, base_salary, start_date, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      code.trim(), name.trim(), phone || '', position || '',
      salary_type, Number(base_salary) || 0, start_date || null,
      status || 'active', notes || ''
    );
    const row = getDb().prepare('SELECT * FROM employees WHERE id = ?').get(r.lastInsertRowid);
    res.status(201).json(rowToEmployee(row));
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Mã nhân viên đã tồn tại' });
    throw e;
  }
});

router.put('/:id', requirePermission('employees:write'), (req, res) => {
  const existing = getDb().prepare('SELECT * FROM employees WHERE id = ? AND deleted_at IS NULL').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });

  const { code, name, phone, position, salary_type, base_salary, start_date, status, notes } = req.body || {};
  try {
    getDb().prepare(`
      UPDATE employees SET code=?, name=?, phone=?, position=?, salary_type=?, base_salary=?,
        start_date=?, status=?, notes=?, updated_at=datetime('now')
      WHERE id=?
    `).run(
      code?.trim() || existing.code, name?.trim() || existing.name,
      phone ?? existing.phone, position ?? existing.position,
      salary_type || existing.salary_type, Number(base_salary ?? existing.base_salary),
      start_date ?? existing.start_date, status || existing.status,
      notes ?? existing.notes, req.params.id
    );
    const row = getDb().prepare('SELECT * FROM employees WHERE id = ?').get(req.params.id);
    res.json(rowToEmployee(row));
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Mã nhân viên đã tồn tại' });
    throw e;
  }
});

router.delete('/:id', requirePermission('employees:write'), (req, res) => {
  const r = getDb().prepare(`
    UPDATE employees SET deleted_at=datetime('now'), status='inactive', updated_at=datetime('now')
    WHERE id=? AND deleted_at IS NULL
  `).run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
  res.json({ ok: true });
});

module.exports = router;
