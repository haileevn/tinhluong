const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'lua-payroll-dev-secret-change-in-production';

const PERMISSIONS = {
  admin: ['*'],
  accountant: [
    'dashboard:read', 'employees:read', 'employees:write',
    'attendance:read', 'attendance:write', 'leaves:read', 'leaves:write',
    'advances:read', 'advances:write', 'bonuses:read', 'bonuses:write',
    'payroll:read', 'payroll:write', 'payroll:lock', 'payroll:pay',
    'history:read', 'settings:read', 'export:read',
  ],
  manager: [
    'dashboard:read', 'employees:read',
    'attendance:read', 'attendance:write',
    'leaves:read', 'leaves:write',
    'advances:read', 'history:read',
  ],
  employee: [
    'portal:read', 'portal:write',
  ],
};

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      employee_id: user.employee_id || null,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function requireEmployee(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Vui lòng đăng nhập' });
  if (req.user.role !== 'employee' || !req.user.employee_id) {
    return res.status(403).json({ error: 'Tài khoản này không phải nhân viên' });
  }
  next();
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Vui lòng đăng nhập' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Phiên đăng nhập hết hạn' });
  }
}

function hasPermission(role, permission) {
  const perms = PERMISSIONS[role] || [];
  if (perms.includes('*')) return true;
  return perms.includes(permission);
}

function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Vui lòng đăng nhập' });
    if (!hasPermission(req.user.role, permission)) {
      return res.status(403).json({ error: 'Bạn không có quyền thực hiện thao tác này' });
    }
    next();
  };
}

module.exports = { JWT_SECRET, signToken, authRequired, requirePermission, requireEmployee, hasPermission, PERMISSIONS };
