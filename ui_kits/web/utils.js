/* Lúa — tiện ích định dạng & phân quyền */
(function () {
  const SALARY_TYPE_LABEL = { monthly: 'Lương tháng', daily: 'Lương ngày', hourly: 'Lương giờ' };
  const LEAVE_TYPE_LABEL = { paid: 'Có phép', unpaid: 'Không phép', sick: 'Nghỉ bệnh', personal: 'Việc riêng' };
  const STATUS_LABEL = { active: 'Đang làm', inactive: 'Nghỉ việc' };
  const PAYROLL_STATUS_MAP = { draft: 'draft', locked: 'approved', paid: 'paid' };
  const ROLE_LABEL = { admin: 'Quản trị viên', accountant: 'Kế toán', manager: 'Quản lý' };

  const PERMS = {
    admin: ['*'],
    accountant: ['dashboard', 'employees', 'attendance', 'leaves', 'advances', 'bonuses', 'payroll', 'history', 'settings', 'export'],
    manager: ['dashboard', 'employees', 'attendance', 'leaves', 'advances', 'history'],
  };

  function fmtMoney(n) {
    return Number(n || 0).toLocaleString('vi-VN');
  }

  function fmtDate(iso) {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return d ? `${d}/${m}/${y}` : iso;
  }

  function toISO(dmy) {
    if (!dmy) return '';
    const parts = dmy.split('/');
    if (parts.length === 3) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    return dmy;
  }

  function periodLabel(year, month) {
    return `Tháng ${month}/${year}`;
  }

  function currentPeriod() {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }

  function canAccess(role, screen) {
    const list = PERMS[role] || [];
    return list.includes('*') || list.includes(screen);
  }

  function canWrite(role, module) {
    if (role === 'admin') return true;
    if (role === 'accountant') return ['employees', 'attendance', 'leaves', 'advances', 'bonuses', 'payroll'].includes(module);
    if (role === 'manager') return ['attendance', 'leaves'].includes(module);
    return false;
  }

  const DEV_NAME = 'Hải Lê';
  const DEV_PHONE = '0937.777.791';
  const DEV_PHONE_TEL = '0937777791';
  const DEV_SITE = 'H2T.life';
  const DEV_URL = 'https://h2t.life';
  const DEV_CREDIT = `Dev by ${DEV_SITE} - ${DEV_NAME} | ${DEV_PHONE}`;

  window.LuaUtils = {
    SALARY_TYPE_LABEL, LEAVE_TYPE_LABEL, STATUS_LABEL, PAYROLL_STATUS_MAP, ROLE_LABEL,
    fmtMoney, fmtDate, toISO, periodLabel, currentPeriod, canAccess, canWrite,
    DEV_NAME, DEV_PHONE, DEV_PHONE_TEL, DEV_SITE, DEV_URL, DEV_CREDIT,
  };
})();
