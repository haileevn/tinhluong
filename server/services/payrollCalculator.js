/**
 * Công thức tính lương Lúa
 *
 * Lương tháng:
 *   Lương thực nhận = Lương cơ bản − trừ nghỉ không phép + tăng ca + thưởng − phạt − ứng lương
 *
 * Lương ngày:
 *   Lương thực nhận = Số công × lương ngày + tăng ca + thưởng − phạt − ứng lương
 *
 * Lương giờ:
 *   Lương thực nhận = Số giờ × lương giờ + tăng ca + thưởng − phạt − ứng lương
 */

function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getHourlyRate(salaryType, baseSalary, standardWorkDays) {
  const base = num(baseSalary);
  const days = num(standardWorkDays, 26) || 26;
  if (salaryType === 'hourly') return base;
  if (salaryType === 'daily') return base / 8;
  // monthly
  return base / (days * 8);
}

function getDailyRate(salaryType, baseSalary, standardWorkDays) {
  const base = num(baseSalary);
  const days = num(standardWorkDays, 26) || 26;
  if (salaryType === 'daily') return base;
  if (salaryType === 'hourly') return base * 8;
  return base / days;
}

/**
 * Trừ lương nghỉ không phép (chỉ áp dụng lương tháng).
 * Mỗi ngày nghỉ không phép = lương ngày chuẩn.
 */
function calcUnpaidDeduction(salaryType, baseSalary, unpaidLeaveDays, standardWorkDays) {
  if (salaryType !== 'monthly' || unpaidLeaveDays <= 0) return 0;
  const dailyRate = getDailyRate('monthly', baseSalary, standardWorkDays);
  return Math.round(dailyRate * unpaidLeaveDays);
}

/**
 * Tiền tăng ca = số giờ tăng ca × lương giờ × hệ số tăng ca.
 */
function calcOvertimeAmount(salaryType, baseSalary, overtimeHours, standardWorkDays, overtimeMultiplier) {
  if (overtimeHours <= 0) return 0;
  const hourly = getHourlyRate(salaryType, baseSalary, standardWorkDays);
  return Math.round(hourly * overtimeHours * num(overtimeMultiplier, 1.5));
}

/**
 * Lương tạm tính (trước thưởng/phạt/ứng) — dùng cảnh báo hạn mức ứng lương.
 */
function calcGrossSalary({
  salaryType,
  baseSalary,
  totalWorkUnits,
  totalHours,
  unpaidDeduction,
  overtimeAmount,
  standardWorkDays,
}) {
  const base = num(baseSalary);
  const workUnits = num(totalWorkUnits);
  const hours = num(totalHours);
  const ot = num(overtimeAmount);
  const unpaid = num(unpaidDeduction);

  if (salaryType === 'daily') {
    return Math.round(workUnits * base + ot);
  }
  if (salaryType === 'hourly') {
    return Math.round(hours * base + ot);
  }
  // monthly
  return Math.round(base - unpaid + ot);
}

/**
 * Lương thực nhận cuối cùng.
 */
function calcNetSalary(grossSalary, totalBonus, totalPenalty, totalAdvance) {
  return Math.max(0, Math.round(
    num(grossSalary) + num(totalBonus) - num(totalPenalty) - num(totalAdvance)
  ));
}

/**
 * Tổng hợp dữ liệu tháng cho một nhân viên.
 */
function buildEmployeePayrollItem(employee, monthData, settings) {
  const standardWorkDays = num(settings.standard_work_days, 26);
  const overtimeMultiplier = num(settings.overtime_multiplier, 1.5);

  const unpaidDeduction = calcUnpaidDeduction(
    employee.salary_type,
    employee.base_salary,
    monthData.total_unpaid_leave,
    standardWorkDays
  );

  const overtimeAmount = calcOvertimeAmount(
    employee.salary_type,
    employee.base_salary,
    monthData.total_overtime_hours,
    standardWorkDays,
    overtimeMultiplier
  );

  const grossSalary = calcGrossSalary({
    salaryType: employee.salary_type,
    baseSalary: employee.base_salary,
    totalWorkUnits: monthData.total_work_units,
    totalHours: monthData.total_hours,
    unpaidDeduction,
    overtimeAmount,
    standardWorkDays,
  });

  const netSalary = calcNetSalary(
    grossSalary,
    monthData.total_bonus,
    monthData.total_penalty,
    monthData.total_advance
  );

  return {
    employee_id: employee.id,
    base_salary: employee.base_salary,
    total_work_units: monthData.total_work_units,
    total_hours: monthData.total_hours,
    total_paid_leave: monthData.total_paid_leave,
    total_unpaid_leave: monthData.total_unpaid_leave,
    total_advance: monthData.total_advance,
    total_bonus: monthData.total_bonus,
    total_penalty: monthData.total_penalty,
    overtime_amount: overtimeAmount,
    unpaid_deduction: unpaidDeduction,
    gross_salary: grossSalary,
    net_salary: netSalary,
    snapshot_json: JSON.stringify({
      employee,
      monthData,
      settings: {
        standard_work_days: standardWorkDays,
        overtime_multiplier: overtimeMultiplier,
      },
      calculated_at: new Date().toISOString(),
    }),
  };
}

/**
 * Ước tính lương tạm tính để kiểm tra hạn mức ứng (chưa trừ ứng mới).
 */
function estimateGrossForAdvanceCheck(employee, year, month, db, settings) {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;

  const att = db.prepare(`
    SELECT COALESCE(SUM(work_units),0) as wu, COALESCE(SUM(hours),0) as h, COALESCE(SUM(overtime_hours),0) as ot
    FROM attendances WHERE employee_id = ? AND work_date LIKE ?
  `).get(employee.id, `${prefix}%`);

  const leaves = db.prepare(`
    SELECT leave_type, COALESCE(SUM(days),0) as d FROM leaves
    WHERE employee_id = ? AND leave_date LIKE ? GROUP BY leave_type
  `).all(employee.id, `${prefix}%`);

  let total_unpaid_leave = 0;
  let total_paid_leave = 0;
  for (const l of leaves) {
    if (l.leave_type === 'unpaid') total_unpaid_leave += l.d;
    else total_paid_leave += l.d;
  }

  const bonus = db.prepare(`
    SELECT COALESCE(SUM(CASE WHEN type='bonus' THEN amount ELSE 0 END),0) as b,
           COALESCE(SUM(CASE WHEN type='penalty' THEN amount ELSE 0 END),0) as p
    FROM bonuses_penalties WHERE employee_id = ? AND record_date LIKE ?
  `).get(employee.id, `${prefix}%`);

  const advance = db.prepare(`
    SELECT COALESCE(SUM(amount),0) as a FROM salary_advances
    WHERE employee_id = ? AND advance_date LIKE ?
  `).get(employee.id, `${prefix}%`);

  const monthData = {
    total_work_units: att.wu,
    total_hours: att.h,
    total_overtime_hours: att.ot,
    total_paid_leave,
    total_unpaid_leave,
    total_bonus: bonus.b,
    total_penalty: bonus.p,
    total_advance: advance.a,
  };

  const item = buildEmployeePayrollItem(employee, monthData, settings);
  return item.gross_salary;
}

module.exports = {
  calcUnpaidDeduction,
  calcOvertimeAmount,
  calcGrossSalary,
  calcNetSalary,
  buildEmployeePayrollItem,
  estimateGrossForAdvanceCheck,
  getHourlyRate,
  getDailyRate,
};
