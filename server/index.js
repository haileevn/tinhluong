const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb, ensureDefaultSettings } = require('./db');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendances');
const leaveRoutes = require('./routes/leaves');
const advanceRoutes = require('./routes/advances');
const bonusRoutes = require('./routes/bonuses');
const payrollRoutes = require('./routes/payrolls');
const settingsRoutes = require('./routes/settings');
const dashboardRoutes = require('./routes/dashboard');
const exportRoutes = require('./routes/export');
const portalRoutes = require('./routes/portal');
const { authRequired } = require('./middleware/auth');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');

// Khởi tạo DB + settings mặc định
getDb();
ensureDefaultSettings();

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', authRequired, dashboardRoutes);
app.use('/api/employees', authRequired, employeeRoutes);
app.use('/api/attendances', authRequired, attendanceRoutes);
app.use('/api/leaves', authRequired, leaveRoutes);
app.use('/api/advances', authRequired, advanceRoutes);
app.use('/api/bonuses', authRequired, bonusRoutes);
app.use('/api/payrolls', authRequired, payrollRoutes);
app.use('/api/settings', authRequired, settingsRoutes);
app.use('/api/export', authRequired, exportRoutes);
app.use('/api/portal', authRequired, portalRoutes);

// Static: design system + apps
app.use('/assets', express.static(path.join(ROOT, 'assets')));
app.use('/tokens', express.static(path.join(ROOT, 'tokens')));
app.use('/styles.css', express.static(path.join(ROOT, 'styles.css')));
app.use('/_ds_bundle.js', express.static(path.join(ROOT, '_ds_bundle.js')));

// Admin web app — /app
app.use('/app', express.static(path.join(ROOT, 'ui_kits', 'web'), {
  index: 'index.html',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
  },
}));

// Employee mobile app — /mobile
app.use('/mobile', express.static(path.join(ROOT, 'ui_kits', 'mobile'), {
  index: 'index.html',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
  },
}));

app.get('/', (_req, res) => res.redirect('/app'));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Lỗi server' });
});

app.listen(PORT, () => {
  console.log(`\n🍊 Ông Mập by H2T — Payroll`);
  console.log(`   Admin:    http://localhost:${PORT}/app`);
  console.log(`   Nhân viên: http://localhost:${PORT}/mobile`);
  console.log(`   API:      http://localhost:${PORT}/api\n`);
});
