// Mock data for the Lúa employee mobile app
window.LUA_M = {
  me: { name: 'Nguyễn Văn An', id: 'NV-0142', dept: 'Kinh doanh', joined: '03/2022' },
  period: 'Tháng 6/2026',
  accrued: 15300000,        // accrued so far this month
  estimatedNet: 18610000,   // estimated net pay
  payDate: '05/07/2026',
  advance: { used: 3000000, limit: 9000000 },
  leave: { used: 5, total: 12 },
  payslip: {
    period: 'Tháng 5/2026',
    net: 18610000,
    lines: [
      { label: 'Lương cơ bản', amount: 18000000 },
      { label: 'Phụ cấp ăn trưa', amount: 730000 },
      { label: 'Phụ cấp đi lại', amount: 1770000 },
      { label: 'Thưởng doanh số', amount: 3000000 },
      { label: 'BHXH, BHYT, BHTN', note: '10,5% lương cơ bản', amount: -1890000 },
      { label: 'Thuế TNCN', amount: -0 },
      { label: 'Tạm ứng kỳ trước', amount: -3000000 },
    ],
  },
  history: [
    { period: 'Tháng 5/2026', net: 18610000, status: 'paid' },
    { period: 'Tháng 4/2026', net: 17240000, status: 'paid' },
    { period: 'Tháng 3/2026', net: 19050000, status: 'paid' },
    { period: 'Tháng 2/2026', net: 16800000, status: 'paid' },
  ],
  leaveRequests: [
    { range: '12–13/06/2026', days: 2, type: 'Phép năm', status: 'approved' },
    { range: '02/05/2026', days: 1, type: 'Nghỉ ốm', status: 'paid' },
    { range: '20/06/2026', days: 1, type: 'Phép năm', status: 'pending' },
  ],
};
