const express = require('express');
const jwt = require('jsonwebtoken');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const { getDb, getSettings } = require('../db');
const { DEV_CREDIT, DEV_CREDIT_HTML } = require('../constants');
const { requirePermission, JWT_SECRET, hasPermission } = require('../middleware/auth');

const router = express.Router();

/** Cho phép in phiếu lương qua window.open với token trên query string */
function authExport(req, res, next) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return requirePermission('export:read')(req, res, next);
  const token = req.query.token || req.query.auth;
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      if (!hasPermission(req.user.role, 'export:read') && !hasPermission(req.user.role, 'history:read')) {
        return res.status(403).json({ error: 'Không có quyền' });
      }
      return next();
    } catch { /* fall through */ }
  }
  return res.status(401).json({ error: 'Vui lòng đăng nhập' });
}

function getPayrollData(year, month) {
  const db = getDb();
  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  if (!payroll) return null;

  const items = db.prepare(`
    SELECT pi.*, e.code as employee_code, e.name as employee_name, e.position, e.salary_type
    FROM payroll_items pi
    JOIN employees e ON e.id = pi.employee_id
    WHERE pi.payroll_id = ? ORDER BY e.name
  `).all(payroll.id);

  return { payroll, items };
}

router.get('/excel/:year/:month', requirePermission('export:read'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const data = getPayrollData(year, month);
  if (!data) return res.status(404).json({ error: 'Chưa có bảng lương cho kỳ này' });

  const rows = data.items.map((i) => ({
    'Mã NV': i.employee_code,
    'Họ tên': i.employee_name,
    'Chức vụ': i.position,
    'Loại lương': i.salary_type,
    'Lương CB': i.base_salary,
    'Tổng công': i.total_work_units,
    'Tổng giờ': i.total_hours,
    'Nghỉ phép': i.total_paid_leave,
    'Nghỉ KP': i.total_unpaid_leave,
    'Tăng ca': i.overtime_amount,
    'Thưởng': i.total_bonus,
    'Phạt': i.total_penalty,
    'Ứng lương': i.total_advance,
    'Lương tạm tính': i.gross_salary,
    'Thực nhận': i.net_salary,
    'Trạng thái': i.status,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Luong T${month}-${year}`);
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="bang-luong-${month}-${year}.xlsx"`);
  res.send(buf);
});

router.get('/pdf/:year/:month', requirePermission('export:read'), (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const data = getPayrollData(year, month);
  if (!data) return res.status(404).json({ error: 'Chưa có bảng lương' });

  const settings = getSettings();
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="bang-luong-${month}-${year}.pdf"`);
  doc.pipe(res);

  doc.fontSize(16).text(settings.company_name || 'Ông Mập by H2T', { align: 'center' });
  doc.fontSize(12).text(`Bảng lương Tháng ${month}/${year}`, { align: 'center' });
  doc.moveDown();

  const fmt = (n) => Number(n).toLocaleString('vi-VN');
  for (const i of data.items) {
    doc.fontSize(10).text(`${i.employee_code} — ${i.employee_name}`, { continued: false });
    doc.fontSize(9).text(
      `Công: ${i.total_work_units} | Giờ: ${i.total_hours} | Thực nhận: ${fmt(i.net_salary)} ₫`
    );
    doc.moveDown(0.3);
  }

  doc.moveDown();
  doc.fontSize(11).text(`Tổng chi lương: ${fmt(data.payroll.total_amount)} ₫`, { align: 'right' });
  doc.moveDown(2);
  doc.fontSize(8).fillColor('#888').text(DEV_CREDIT, { align: 'center' });
  doc.end();
});

router.get('/payslip/:year/:month/:employeeId', authExport, (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const employeeId = Number(req.params.employeeId);
  const db = getDb();
  const settings = getSettings();

  const payroll = db.prepare('SELECT * FROM payrolls WHERE year=? AND month=?').get(year, month);
  if (!payroll) return res.status(404).json({ error: 'Chưa có bảng lương' });

  const item = db.prepare(`
    SELECT pi.*, e.code, e.name, e.position, e.salary_type, e.phone
    FROM payroll_items pi JOIN employees e ON e.id = pi.employee_id
    WHERE pi.payroll_id=? AND pi.employee_id=?
  `).get(payroll.id, employeeId);

  if (!item) return res.status(404).json({ error: 'Không tìm thấy phiếu lương' });

  const fmt = (n) => Number(n).toLocaleString('vi-VN');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="vi"><head><meta charset="utf-8"><title>Phiếu lương ${item.name}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
  h1 { font-size: 18px; } table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  td { padding: 6px 0; border-bottom: 1px solid #eee; } td:last-child { text-align: right; font-family: monospace; }
  .net { font-size: 20px; font-weight: bold; color: #1a7f4b; }
  .dev { margin-top: 24px; padding-top: 12px; border-top: 1px solid #eee; font-size: 11px; color: #999; text-align: center; }
  @media print { body { margin: 0; } button { display: none; } }
</style></head><body>
<h1>${settings.company_name}</h1>
<p><strong>Phiếu lương Tháng ${month}/${year}</strong></p>
<p>${item.code} — ${item.name}<br>${item.position || ''}</p>
<table>
  <tr><td>Lương cơ bản</td><td>${fmt(item.base_salary)} ₫</td></tr>
  <tr><td>Tổng công</td><td>${item.total_work_units}</td></tr>
  <tr><td>Tổng giờ</td><td>${item.total_hours}</td></tr>
  <tr><td>Nghỉ phép</td><td>${item.total_paid_leave} ngày</td></tr>
  <tr><td>Nghỉ không phép</td><td>${item.total_unpaid_leave} ngày (−${fmt(item.unpaid_deduction)} ₫)</td></tr>
  <tr><td>Tăng ca</td><td>+${fmt(item.overtime_amount)} ₫</td></tr>
  <tr><td>Thưởng</td><td>+${fmt(item.total_bonus)} ₫</td></tr>
  <tr><td>Phạt</td><td>−${fmt(item.total_penalty)} ₫</td></tr>
  <tr><td>Ứng lương</td><td>−${fmt(item.total_advance)} ₫</td></tr>
  <tr><td>Lương tạm tính</td><td>${fmt(item.gross_salary)} ₫</td></tr>
  <tr><td class="net">Lương thực nhận</td><td class="net">${fmt(item.net_salary)} ₫</td></tr>
</table>
<p>Trạng thái: ${item.status === 'paid' ? 'Đã trả' : item.status === 'locked' ? 'Đã chốt' : 'Chưa chốt'}</p>
<button onclick="window.print()">In phiếu lương</button>
<p class="dev">${DEV_CREDIT_HTML}</p>
</body></html>`);
});

module.exports = router;
