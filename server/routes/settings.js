const express = require('express');
const { getSettings, setSetting } = require('../db');
const { requirePermission } = require('../middleware/auth');

const router = express.Router();

const ALLOWED_KEYS = [
  'company_name', 'company_logo', 'standard_work_days',
  'overtime_multiplier', 'unpaid_leave_deduction_type', 'advance_limit_percent',
  'annual_leave_days',
];

router.get('/', requirePermission('settings:read'), (req, res) => {
  res.json(getSettings());
});

router.put('/', requirePermission('settings:read'), (req, res) => {
  // Chỉ admin mới sửa settings — kiểm tra role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Chỉ Admin mới được sửa cài đặt' });
  }

  const body = req.body || {};
  for (const key of ALLOWED_KEYS) {
    if (body[key] !== undefined) setSetting(key, body[key]);
  }
  res.json(getSettings());
});

module.exports = router;
