/**
 * API cổng nhân viên — app mobile Ông Mập
 */
const express = require('express');
const { getDb, getSettings } = require('../db');
const { requireEmployee } = require('../middleware/auth');
const { buildEmployeePayrollItem, estimateGrossForAdvanceCheck } = require('../services/payrollCalculator');

const router = express.Router();

function monthPrefix(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function getEmployee(req) {
  return getDb().prepare('SELECT * FROM employees WHERE id = ? AND deleted_at IS NULL').get(req.user.employee_id);
}

function buildPayslipLines(item, settings) {
  const lines = [
    { label: 'Lương cơ bản', amount: item.base_salary },
  ];
  if (item.overtime_amount > 0) lines.push({ label: 'Tăng ca', amount: item.overtime_amount });
  if (item.unpaid_deduction > 0) lines.push({ label: 'Trừ nghỉ không phép', note: `${item.total_unpaid_leave} ngày`, amount: -item.unpaid_deduction });
  if (item.total_bonus > 0) lines.push({ label: 'Thưởng', amount: item.total_bonus });
  if (item.total_penalty > 0) lines.push({ label: 'Phạt', amount: -item.total_penalty });
  if (item.total_advance > 0) lines.push({ label: 'Tạm ứng trong tháng', amount: -item.total_advance });
  return { lines, net: item.net_salary, gross: item.gross_salary, company: settings.company_name };
}

router.get('/home', requireEmployee, (req, res) => {
  const db = getDb();
  const settings = getSettings();
  const employee = getEmployee(req);
  if (!employee) return res.status(404).json({ error: 'Không tìm thấy hồ sơ nhân viên' });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const prefix = `${monthPrefix(year, month)}%`;

  const gross = estimateGrossForAdvanceCheck(employee, year, month, db, settings);
  const advanceUsed = db.prepare(`
    SELECT COALESCE(SUM(amount),0) as t FROM salary_advances
    WHERE employee_id=? AND advance_date LIKE ?
  `).get(employee.id, prefix).t;

  const limitPercent = Number(settings.advance_limit_percent) || 50;
  const advanceLimit = Math.round(gross * limitPercent / 100);

  const leaveUsed = db.prepare(`
    SELECT COALESCE(SUM(days),0) as d FROM leaves
    WHERE employee_id=? AND leave_date LIKE ?
  `).get(employee.id, prefix).d;

  const annualTotal = Number(settings.annual_leave_days) || 12;

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  let estimatedNet = gross;
  if (payroll) {
    const item = db.prepare('SELECT net_salary FROM payroll_items WHERE payroll_id=? AND employee_id=?')
      .get(payroll.id, employee.id);
    if (item) estimatedNet = item.net_salary;
  } else {
    const monthData = gatherMonthData(db, employee.id, year, month);
    const built = buildEmployeePayrollItem(employee, monthData, settings);
    estimatedNet = built.net_salary;
  }

  res.json({
    me: {
      name: employee.name,
      id: employee.code,
      dept: employee.position,
      joined: employee.start_date ? employee.start_date.slice(0, 7).replace('-', '/') : '',
    },
    company: settings.company_name,
    period: `Tháng ${month}/${year}`,
    year, month,
    accrued: gross,
    estimatedNet,
    payDate: `05/${String(month === 12 ? 1 : month + 1).padStart(2, '0')}/${month === 12 ? year + 1 : year}`,
    advance: { used: advanceUsed, limit: advanceLimit },
    leave: { used: leaveUsed, total: annualTotal },
  });
});

router.get('/payslip/:year/:month', requireEmployee, (req, res) => {
  const db = getDb();
  const settings = getSettings();
  const employee = getEmployee(req);
  const year = Number(req.params.year);
  const month = Number(req.params.month);

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  let item;
  if (payroll) {
    item = db.prepare('SELECT * FROM payroll_items WHERE payroll_id=? AND employee_id=?')
      .get(payroll.id, employee.id);
  }

  if (!item) {
    const monthData = gatherMonthData(db, employee.id, year, month);
    item = buildEmployeePayrollItem(employee, monthData, settings);
  }

  const slip = buildPayslipLines(item, settings);
  res.json({
    period: `Tháng ${month}/${year}`,
    employee: { name: employee.name, code: employee.code, position: employee.position },
    status: payroll?.status || 'draft',
    ...slip,
    detail: item,
  });
});

router.get('/payslip/history', requireEmployee, (req, res) => {
  const rows = getDb().prepare(`
    SELECT pi.net_salary as net, pi.status, p.year, p.month, p.status as payroll_status
    FROM payroll_items pi
    JOIN payrolls p ON p.id = pi.payroll_id
    WHERE pi.employee_id = ? AND p.status IN ('locked', 'paid')
    ORDER BY p.year DESC, p.month DESC LIMIT 24
  `).all(req.user.employee_id);

  res.json(rows.map((r) => ({
    period: `Tháng ${r.month}/${r.year}`,
    year: r.year,
    month: r.month,
    net: r.net,
    status: r.payroll_status === 'paid' ? 'paid' : 'approved',
  })));
});

router.post('/advances', requireEmployee, (req, res) => {
  const { amount, notes } = req.body || {};
  const amt = Number(amount);
  if (!amt || amt <= 0) return res.status(400).json({ error: 'Số tiền ứng phải lớn hơn 0' });

  const db = getDb();
  const settings = getSettings();
  const employee = getEmployee(req);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const gross = estimateGrossForAdvanceCheck(employee, year, month, db, settings);
  const limitPercent = Number(settings.advance_limit_percent) || 50;
  const maxAdvance = Math.round(gross * limitPercent / 100);
  const prefix = `${monthPrefix(year, month)}%`;
  const current = db.prepare(`
    SELECT COALESCE(SUM(amount),0) as t FROM salary_advances WHERE employee_id=? AND advance_date LIKE ?
  `).get(employee.id, prefix).t;

  if (current + amt > maxAdvance) {
    return res.status(400).json({
      error: `Vượt hạn mức ${limitPercent}% lương tạm tính (tối đa ${maxAdvance.toLocaleString('vi-VN')} ₫)`,
    });
  }

  const date = now.toISOString().slice(0, 10);
  const r = db.prepare(`
    INSERT INTO salary_advances (employee_id, advance_date, amount, approved_by, notes)
    VALUES (?, ?, ?, ?, ?)
  `).run(employee.id, date, amt, 'Chờ duyệt', notes || 'Yêu cầu từ app nhân viên');

  res.status(201).json({ ok: true, id: r.lastInsertRowid, amount: amt });
});

router.get('/leaves', requireEmployee, (req, res) => {
  const rows = getDb().prepare(`
    SELECT * FROM leaves WHERE employee_id = ? ORDER BY leave_date DESC LIMIT 30
  `).all(req.user.employee_id);

  const TYPE_LABEL = { paid: 'Phép năm', unpaid: 'Không phép', sick: 'Nghỉ ốm', personal: 'Việc riêng' };

  res.json(rows.map((r) => ({
    id: r.id,
    range: r.leave_date.split('-').reverse().join('/'),
    days: r.days,
    type: TYPE_LABEL[r.leave_type] || r.leave_type,
    status: 'approved',
    leave_type: r.leave_type,
  })));
});

router.post('/leaves', requireEmployee, (req, res) => {
  const { leave_date, leave_type, days, notes } = req.body || {};
  if (!leave_date || !leave_type) return res.status(400).json({ error: 'Ngày nghỉ và loại nghỉ là bắt buộc' });
  if (Number(days) <= 0) return res.status(400).json({ error: 'Số ngày nghỉ phải lớn hơn 0' });

  const r = getDb().prepare(`
    INSERT INTO leaves (employee_id, leave_date, leave_type, days, notes) VALUES (?, ?, ?, ?, ?)
  `).run(req.user.employee_id, leave_date, leave_type, Number(days), notes || 'Từ app nhân viên');

  res.status(201).json({ ok: true, id: r.lastInsertRowid });
});

function gatherMonthData(db, employeeId, year, month) {
  const prefix = `${monthPrefix(year, month)}%`;
  const att = db.prepare(`
    SELECT COALESCE(SUM(work_units),0) as wu, COALESCE(SUM(hours),0) as h, COALESCE(SUM(overtime_hours),0) as ot
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
    SELECT COALESCE(SUM(amount),0) as a FROM salary_advances WHERE employee_id = ? AND advance_date LIKE ?
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

module.exports = router;
