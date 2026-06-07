const express = require('express');
const { getDb, getSettings } = require('../db');
const { requirePermission } = require('../middleware/auth');
const { buildEmployeePayrollItem } = require('../services/payrollCalculator');

const router = express.Router();

function monthPrefix(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function gatherMonthData(db, employeeId, year, month) {
  const prefix = `${monthPrefix(year, month)}%`;

  const att = db.prepare(`
    SELECT COALESCE(SUM(work_units),0) as wu, COALESCE(SUM(hours),0) as h,
      COALESCE(SUM(overtime_hours),0) as ot
    FROM attendances WHERE employee_id = ? AND work_date LIKE ?
  `).get(employeeId, prefix);

  const leaves = db.prepare(`
    SELECT leave_type, COALESCE(SUM(days),0) as d FROM leaves
    WHERE employee_id = ? AND leave_date LIKE ? GROUP BY leave_type
  `).all(employeeId, prefix);

  let total_unpaid_leave = 0;
  let total_paid_leave = 0;
  for (const l of leaves) {
    if (l.leave_type === 'unpaid') total_unpaid_leave += l.d;
    else total_paid_leave += l.d;
  }

  const bp = db.prepare(`
    SELECT COALESCE(SUM(CASE WHEN type='bonus' THEN amount ELSE 0 END),0) as b,
      COALESCE(SUM(CASE WHEN type='penalty' THEN amount ELSE 0 END),0) as p
    FROM bonuses_penalties WHERE employee_id = ? AND record_date LIKE ?
  `).get(employeeId, prefix);

  const adv = db.prepare(`
    SELECT COALESCE(SUM(amount),0) as a FROM salary_advances
    WHERE employee_id = ? AND advance_date LIKE ?
  `).get(employeeId, prefix);

  return {
    total_work_units: att.wu,
    total_hours: att.h,
    total_overtime_hours: att.ot,
    total_paid_leave,
    total_unpaid_leave,
    total_bonus: bp.b,
    total_penalty: bp.p,
    total_advance: adv.a,
  };
}

router.get('/', requirePermission('payroll:read'), (req, res) => {
  const rows = getDb().prepare('SELECT * FROM payrolls ORDER BY year DESC, month DESC').all();
  res.json(rows);
});

// Phải đặt TRƯỚC /:year/:month — nếu không "history" bị match nhầm thành year
router.get('/history/list', requirePermission('history:read'), (req, res) => {
  const rows = getDb().prepare(`
    SELECT p.*, (SELECT COUNT(*) FROM payroll_items WHERE payroll_id = p.id) as employee_count
    FROM payrolls p
    WHERE p.status IN ('locked', 'paid')
    ORDER BY p.year DESC, p.month DESC
  `).all();
  res.json(rows);
});

router.get('/:year/:month', requirePermission('payroll:read'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const db = getDb();

  let payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);

  if (!payroll) {
    return res.json({ payroll: null, items: [], year, month, status: 'draft' });
  }

  const items = db.prepare(`
    SELECT pi.*, e.code as employee_code, e.name as employee_name, e.position,
      e.salary_type, e.phone
    FROM payroll_items pi
    JOIN employees e ON e.id = pi.employee_id
    WHERE pi.payroll_id = ?
    ORDER BY e.name
  `).all(payroll.id);

  res.json({ payroll, items, year, month });
});

router.post('/:year/:month/calculate', requirePermission('payroll:write'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const db = getDb();
  const settings = getSettings();

  let payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  if (payroll && (payroll.status === 'locked' || payroll.status === 'paid')) {
    return res.status(403).json({ error: 'Kỳ lương đã chốt hoặc đã trả. Hãy mở khóa trước khi tính lại.' });
  }

  const employees = db.prepare(`
    SELECT * FROM employees WHERE deleted_at IS NULL AND status = 'active'
  `).all();

  const calc = db.transaction(() => {
    if (!payroll) {
      const r = db.prepare('INSERT INTO payrolls (year, month, status) VALUES (?, ?, ?)').run(year, month, 'draft');
      payroll = db.prepare('SELECT * FROM payrolls WHERE id = ?').get(r.lastInsertRowid);
    } else if (payroll.status === 'draft') {
      db.prepare('DELETE FROM payroll_items WHERE payroll_id = ?').run(payroll.id);
    }

    const insert = db.prepare(`
      INSERT INTO payroll_items (
        payroll_id, employee_id, base_salary, total_work_units, total_hours,
        total_paid_leave, total_unpaid_leave, total_advance, total_bonus, total_penalty,
        overtime_amount, unpaid_deduction, gross_salary, net_salary, status, snapshot_json
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `);

    let total = 0;
    const items = [];

    for (const emp of employees) {
      const monthData = gatherMonthData(db, emp.id, year, month);
      const item = buildEmployeePayrollItem(emp, monthData, settings);
      insert.run(
        payroll.id, emp.id, item.base_salary, item.total_work_units, item.total_hours,
        item.total_paid_leave, item.total_unpaid_leave, item.total_advance,
        item.total_bonus, item.total_penalty, item.overtime_amount, item.unpaid_deduction,
        item.gross_salary, item.net_salary, 'draft', item.snapshot_json
      );
      total += item.net_salary;
      items.push({ ...item, employee_code: emp.code, employee_name: emp.name, position: emp.position, salary_type: emp.salary_type });
    }

    db.prepare('UPDATE payrolls SET total_amount=?, status=? WHERE id=?').run(total, 'draft', payroll.id);
    payroll = db.prepare('SELECT * FROM payrolls WHERE id = ?').get(payroll.id);
    return { payroll, items };
  });

  res.json(calc());
});

router.post('/:year/:month/lock', requirePermission('payroll:lock'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const db = getDb();

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  if (!payroll) return res.status(400).json({ error: 'Chưa có bảng lương. Hãy tính lương trước.' });
  if (payroll.status === 'locked' || payroll.status === 'paid') {
    return res.status(400).json({ error: 'Kỳ lương đã được chốt' });
  }

  db.transaction(() => {
    db.prepare("UPDATE payrolls SET status='locked', locked_at=datetime('now') WHERE id=?").run(payroll.id);
    db.prepare("UPDATE payroll_items SET status='locked' WHERE payroll_id=?").run(payroll.id);
  })();

  res.json(db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month));
});

router.post('/:year/:month/unlock', requirePermission('payroll:lock'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const db = getDb();

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  if (!payroll) return res.status(404).json({ error: 'Không tìm thấy kỳ lương' });
  if (payroll.status === 'paid') {
    return res.status(403).json({ error: 'Kỳ lương đã trả, không thể mở khóa' });
  }

  db.transaction(() => {
    db.prepare("UPDATE payrolls SET status='draft', unlocked_at=datetime('now'), locked_at=NULL WHERE id=?").run(payroll.id);
    db.prepare("UPDATE payroll_items SET status='draft' WHERE payroll_id=?").run(payroll.id);
  })();

  res.json(db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month));
});

router.post('/:year/:month/pay', requirePermission('payroll:pay'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const db = getDb();

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  if (!payroll) return res.status(400).json({ error: 'Không tìm thấy kỳ lương' });
  if (payroll.status !== 'locked') {
    return res.status(400).json({ error: 'Cần chốt lương trước khi đánh dấu đã trả' });
  }

  db.transaction(() => {
    db.prepare("UPDATE payrolls SET status='paid', paid_at=datetime('now') WHERE id=?").run(payroll.id);
    db.prepare("UPDATE payroll_items SET status='paid' WHERE payroll_id=?").run(payroll.id);
  })();

  res.json(db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month));
});

router.post('/:year/:month/items/:itemId/pay', requirePermission('payroll:pay'), (req, res) => {
  const db = getDb();
  const item = db.prepare('SELECT * FROM payroll_items WHERE id = ?').get(req.params.itemId);
  if (!item) return res.status(404).json({ error: 'Không tìm thấy' });

  db.prepare("UPDATE payroll_items SET status='paid' WHERE id=?").run(req.params.itemId);
  res.json(db.prepare('SELECT * FROM payroll_items WHERE id = ?').get(req.params.itemId));
});

module.exports = router;
