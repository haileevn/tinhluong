/**
 * Seed dữ liệu mẫu — chạy: npm run seed
 * Không xóa dữ liệu cũ; chỉ thêm nếu bảng trống.
 */
const bcrypt = require('bcryptjs');
const { getDb, ensureDefaultSettings } = require('./db');

const db = getDb();
ensureDefaultSettings();

function isEmpty(table) {
  return db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get().c === 0;
}

if (isEmpty('users')) {
  const hash = (pw) => bcrypt.hashSync(pw, 10);
  const ins = db.prepare('INSERT INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)');
  ins.run('admin', hash('admin123'), 'Quản trị viên', 'admin');
  ins.run('ketoan', hash('ketoan123'), 'Trần Thị Bích', 'accountant');
  ins.run('quanly', hash('quanly123'), 'Phạm Thu Hà', 'manager');
  console.log('✓ Đã tạo tài khoản demo');
}

if (isEmpty('employees')) {
  const ins = db.prepare(`
    INSERT INTO employees (code, name, phone, position, salary_type, base_salary, start_date, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const employees = [
    ['NV-0142', 'Nguyễn Văn An', '0901234567', 'Nhân viên kinh doanh', 'monthly', 18000000, '2024-03-15', 'active', ''],
    ['NV-0098', 'Trần Thị Bích', '0912345678', 'Kế toán', 'monthly', 16500000, '2023-01-10', 'active', ''],
    ['NV-0211', 'Lê Minh Quân', '0923456789', 'Kỹ thuật viên', 'daily', 500000, '2024-06-01', 'active', 'Lương theo ngày công'],
    ['NV-0177', 'Phạm Thu Hà', '0934567890', 'Quản lý nhân sự', 'monthly', 20000000, '2022-08-20', 'active', ''],
    ['NV-0305', 'Hoàng Đức Thành', '0945678901', 'Nhân viên kho', 'hourly', 35000, '2025-02-01', 'active', 'Lương theo giờ'],
    ['NV-0263', 'Vũ Thị Lan', '0956789012', 'Nhân viên kinh doanh', 'monthly', 15000000, '2024-11-05', 'active', ''],
    ['NV-0349', 'Đặng Quốc Bảo', '0967890123', 'Lập trình viên', 'monthly', 19000000, '2025-04-01', 'active', ''],
    ['NV-0120', 'Bùi Khánh Linh', '0978901234', 'Marketing', 'monthly', 17500000, '2023-09-12', 'inactive', 'Đã nghỉ việc'],
  ];
  for (const e of employees) ins.run(...e);
  console.log('✓ Đã tạo 8 nhân viên mẫu');
}

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const prefix = `${year}-${String(month).padStart(2, '0')}`;

if (isEmpty('attendances')) {
  const emps = db.prepare("SELECT id, salary_type FROM employees WHERE status='active' AND deleted_at IS NULL").all();
  const ins = db.prepare(`
    INSERT INTO attendances (employee_id, work_date, work_units, hours, overtime_hours, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (const e of emps) {
    for (let d = 1; d <= 20; d++) {
      const day = String(d).padStart(2, '0');
      const date = `${prefix}-${day}`;
      if (e.salary_type === 'hourly') {
        ins.run(e.id, date, 1, 8, d % 5 === 0 ? 2 : 0, '');
      } else if (e.salary_type === 'daily') {
        ins.run(e.id, date, 1, 8, d % 7 === 0 ? 3 : 0, '');
      } else {
        ins.run(e.id, date, 1, 8, d % 6 === 0 ? 1.5 : 0, '');
      }
    }
  }
  console.log('✓ Đã tạo dữ liệu chấm công tháng hiện tại');
}

if (isEmpty('leaves')) {
  const emps = db.prepare("SELECT id FROM employees WHERE status='active' LIMIT 4").all();
  const ins = db.prepare(`
    INSERT INTO leaves (employee_id, leave_date, leave_type, days, notes) VALUES (?, ?, ?, ?, ?)
  `);
  ins.run(emps[0].id, `${prefix}-10`, 'paid', 1, 'Nghỉ phép năm');
  ins.run(emps[1].id, `${prefix}-12`, 'sick', 1, 'Nghỉ ốm');
  ins.run(emps[2].id, `${prefix}-15`, 'unpaid', 1, 'Nghỉ không phép');
  ins.run(emps[3].id, `${prefix}-18`, 'personal', 0.5, 'Việc riêng');
  console.log('✓ Đã tạo dữ liệu ngày nghỉ');
}

if (isEmpty('salary_advances')) {
  const emps = db.prepare("SELECT id FROM employees WHERE status='active' LIMIT 5").all();
  const ins = db.prepare(`
    INSERT INTO salary_advances (employee_id, advance_date, amount, approved_by, notes) VALUES (?, ?, ?, ?, ?)
  `);
  ins.run(emps[0].id, `${prefix}-03`, 3000000, 'Trần Thị Bích', 'Chi phí cá nhân');
  ins.run(emps[1].id, `${prefix}-05`, 1500000, 'Trần Thị Bích', 'Đi lại');
  ins.run(emps[2].id, `${prefix}-08`, 5000000, 'Quản trị viên', 'Sửa xe');
  ins.run(emps[3].id, `${prefix}-10`, 2000000, 'Trần Thị Bích', 'Gia đình');
  console.log('✓ Đã tạo dữ liệu ứng lương');
}

if (isEmpty('bonuses_penalties')) {
  const emps = db.prepare("SELECT id FROM employees WHERE status='active' LIMIT 4").all();
  const ins = db.prepare(`
    INSERT INTO bonuses_penalties (employee_id, record_date, type, amount, reason, notes) VALUES (?, ?, ?, ?, ?, ?)
  `);
  ins.run(emps[0].id, `${prefix}-25`, 'bonus', 500000, 'Thưởng doanh số', '');
  ins.run(emps[1].id, `${prefix}-20`, 'penalty', 200000, 'Đi muộn', '');
  ins.run(emps[2].id, `${prefix}-22`, 'bonus', 300000, 'Hoàn thành dự án', '');
  console.log('✓ Đã tạo dữ liệu thưởng/phạt');
}

// Tài khoản nhân viên (app mobile) — thêm nếu chưa có
function ensureEmployeeUser(username, password, name, employeeCode) {
  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (exists) return;
  const emp = db.prepare('SELECT id FROM employees WHERE code = ?').get(employeeCode);
  if (!emp) return;
  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (username, password_hash, name, role, employee_id) VALUES (?, ?, ?, ?, ?)')
    .run(username, hash, name, 'employee', emp.id);
  console.log(`✓ Tài khoản NV: ${username}`);
}

ensureEmployeeUser('nvanan', 'nv123456', 'Nguyễn Văn An', 'NV-0142');
ensureEmployeeUser('lequan', 'nv123456', 'Lê Minh Quân', 'NV-0211');
ensureEmployeeUser('vulan', 'nv123456', 'Vũ Thị Lan', 'NV-0263');

// Cập nhật tên công ty nếu vẫn là mặc định cũ
const { setSetting, getSetting } = require('./db');
const cn = getSetting('company_name');
if (!cn || cn.includes('Mây Tre')) {
  setSetting('company_name', 'Ông Mập by H2T');
  setSetting('company_logo', '/assets/ong-map-mark.svg');
}

console.log('\nSeed hoàn tất. Tài khoản demo:');
console.log('  Admin:    admin / admin123');
console.log('  Kế toán:  ketoan / ketoan123');
console.log('  Quản lý:  quanly / quanly123');
console.log('  NV app:   nvanan / nv123456 (Nguyễn Văn An)');
