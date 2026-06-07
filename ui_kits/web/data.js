// Mock data for the Lúa HR/Admin web app kit
window.LUA_DATA = {
  period: 'Tháng 6/2026',
  company: 'Công ty TNHH Mây Tre Việt',
  user: { name: 'Phạm Thu Hà', role: 'Quản lý nhân sự' },
  stats: {
    payrollTotal: 742500000,
    headcount: 32,
    advancePending: 4,
    leaveThisMonth: 18,
  },
  payrun: {
    progress: 26, total: 32, // employees confirmed
    payDate: '05/07/2026',
  },
  employees: [
    { id: 'NV-0142', name: 'Nguyễn Văn An',    dept: 'Kinh doanh',  base: 18000000, allow: 2500000, deduct: 1890000, status: 'approved' },
    { id: 'NV-0098', name: 'Trần Thị Bích',    dept: 'Kế toán',     base: 16500000, allow: 1800000, deduct: 1732500, status: 'paid' },
    { id: 'NV-0211', name: 'Lê Minh Quân',     dept: 'Kỹ thuật',    base: 22000000, allow: 3000000, deduct: 2310000, status: 'pending' },
    { id: 'NV-0177', name: 'Phạm Thu Hà',      dept: 'Nhân sự',     base: 20000000, allow: 2200000, deduct: 2100000, status: 'approved' },
    { id: 'NV-0305', name: 'Hoàng Đức Thành',  dept: 'Kho vận',     base: 12000000, allow: 1500000, deduct: 1260000, status: 'pending' },
    { id: 'NV-0263', name: 'Vũ Thị Lan',       dept: 'Kinh doanh',  base: 15000000, allow: 2000000, deduct: 1575000, status: 'paid' },
    { id: 'NV-0349', name: 'Đặng Quốc Bảo',    dept: 'Kỹ thuật',    base: 19000000, allow: 2400000, deduct: 1995000, status: 'draft' },
    { id: 'NV-0120', name: 'Bùi Khánh Linh',   dept: 'Marketing',   base: 17500000, allow: 2100000, deduct: 1837500, status: 'approved' },
  ],
  advances: [
    { id: 'UL-0612', emp: 'Lê Minh Quân',    dept: 'Kỹ thuật',   amount: 5000000, reason: 'Sửa xe máy',           date: '03/06/2026', limit: 11000000, status: 'pending' },
    { id: 'UL-0611', emp: 'Hoàng Đức Thành', dept: 'Kho vận',    amount: 2000000, reason: 'Việc gia đình',        date: '03/06/2026', limit: 6000000,  status: 'pending' },
    { id: 'UL-0609', emp: 'Vũ Thị Lan',      dept: 'Kinh doanh', amount: 3000000, reason: 'Học phí cho con',       date: '02/06/2026', limit: 7500000,  status: 'pending' },
    { id: 'UL-0604', emp: 'Bùi Khánh Linh',  dept: 'Marketing',  amount: 4000000, reason: 'Khám sức khoẻ',         date: '01/06/2026', limit: 8750000,  status: 'pending' },
    { id: 'UL-0598', emp: 'Nguyễn Văn An',   dept: 'Kinh doanh', amount: 3000000, reason: 'Mua sắm cá nhân',       date: '29/05/2026', limit: 9000000,  status: 'approved' },
    { id: 'UL-0590', emp: 'Trần Thị Bích',   dept: 'Kế toán',    amount: 1500000, reason: 'Chi phí đi lại',        date: '27/05/2026', limit: 8250000,  status: 'paid' },
  ],
};
window.LUA_DATA.netOf = (e) => e.base + e.allow - e.deduct;
