const express = require('express');
const { getDb, getSettings } = require('../db');
const { requirePermission } = require('../middleware/auth');

const router = express.Router();

router.get('/', requirePermission('dashboard:read'), (req, res) => {
  const now = new Date();
  const year = Number(req.query.year) || now.getFullYear();
  const month = Number(req.query.month) || (now.getMonth() + 1);
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const db = getDb();

  const activeCount = db.prepare(`
    SELECT COUNT(*) as c FROM employees WHERE status='active' AND deleted_at IS NULL
  `).get().c;

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  let payrollTotal = payroll?.total_amount || 0;

  if (!payroll) {
    const draft = db.prepare(`
      SELECT COALESCE(SUM(net_salary),0) as t FROM payroll_items pi
      JOIN payrolls p ON p.id = pi.payroll_id WHERE p.year=? AND p.month=?
    `).get(year, month);
    payrollTotal = draft?.t || 0;
  }

  const advanceTotal = db.prepare(`
    SELECT COALESCE(SUM(amount),0) as t FROM salary_advances WHERE advance_date LIKE ?
  `).get(`${prefix}%`).t;

  const bonusPenalty = db.prepare(`
    SELECT COALESCE(SUM(CASE WHEN type='bonus' THEN amount ELSE 0 END),0) as bonus,
      COALESCE(SUM(CASE WHEN type='penalty' THEN amount ELSE 0 END),0) as penalty
    FROM bonuses_penalties WHERE record_date LIKE ?
  `).get(`${prefix}%`);

  const leaveCount = db.prepare(`
    SELECT COUNT(DISTINCT employee_id) as c FROM leaves WHERE leave_date LIKE ?
  `).get(`${prefix}%`).c;

  const topAdvances = db.prepare(`
    SELECT e.name, e.code, COALESCE(SUM(sa.amount),0) as total
    FROM salary_advances sa
    JOIN employees e ON e.id = sa.employee_id
    WHERE sa.advance_date LIKE ?
    GROUP BY sa.employee_id ORDER BY total DESC LIMIT 5
  `).all(`${prefix}%`);

  const topLeaves = db.prepare(`
    SELECT e.name, e.code, COALESCE(SUM(l.days),0) as total_days
    FROM leaves l
    JOIN employees e ON e.id = l.employee_id
    WHERE l.leave_date LIKE ?
    GROUP BY l.employee_id ORDER BY total_days DESC LIMIT 5
  `).all(`${prefix}%`);

  const chartData = db.prepare(`
    SELECT year, month, total_amount, status FROM payrolls
    ORDER BY year DESC, month DESC LIMIT 12
  `).all().reverse();

  const settings = getSettings();

  res.json({
    year, month,
    period: `Tháng ${month}/${year}`,
    company: settings.company_name,
    stats: {
      headcount: activeCount,
      payrollTotal,
      advanceTotal,
      bonusTotal: bonusPenalty.bonus,
      penaltyTotal: bonusPenalty.penalty,
      leaveEmployees: leaveCount,
      payrollStatus: payroll?.status || 'draft',
    },
    topAdvances,
    topLeaves,
    chartData,
  });
});

module.exports = router;
