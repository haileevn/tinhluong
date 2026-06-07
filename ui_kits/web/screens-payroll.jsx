/* Module Tính lương + Lịch sử — vcard */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button, Avatar, AmountDisplay, StatusPill } = DS;
  const { PeriodPicker, Alert, usePeriod, VCardGrid, VCard, VCardHead, VCardRows, VCardField, VCardActions, EmptyState } = window.LuaShared;
  const { fmtMoney, SALARY_TYPE_LABEL, PAYROLL_STATUS_MAP, canWrite } = window.LuaUtils;
  const api = window.LuaAPI;

  function mapStatus(s) {
    return PAYROLL_STATUS_MAP[s] || 'draft';
  }

  function PayrollScreen({ user }) {
    const { year, month, setPeriod } = usePeriod();
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [err, setErr] = React.useState('');
    const canCalc = canWrite(user?.role, 'payroll');

    const load = React.useCallback(() => {
      api.get(`/payrolls/${year}/${month}`).then(setData).catch((e) => setErr(e.message));
    }, [year, month]);

    React.useEffect(() => { load(); }, [load]);

    const act = async (action) => {
      setLoading(true); setMsg(''); setErr('');
      try {
        await api.post(`/payrolls/${year}/${month}/${action}`);
        setMsg(action === 'calculate' ? 'Đã tính lương' : action === 'lock' ? 'Đã chốt lương' : action === 'unlock' ? 'Đã mở khóa' : 'Đã đánh dấu trả lương');
        load();
      } catch (e) { setErr(e.message); }
      finally { setLoading(false); }
    };

    const payroll = data?.payroll;
    const items = data?.items || [];
    const status = payroll?.status || 'draft';
    const totals = items.reduce((a, i) => ({
      net: a.net + i.net_salary, gross: a.gross + i.gross_salary,
    }), { net: 0, gross: 0 });

    const printPayslip = (employeeId) => {
      const token = api.getToken();
      window.open(`/api/export/payslip/${year}/${month}/${employeeId}?token=${token}`, '_blank');
    };

    return (
      <div>
        <div className="lw-pagehead">
          <PeriodPicker year={year} month={month} onChange={setPeriod} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {canCalc && status === 'draft' && <Button variant="primary" icon="calculator" disabled={loading} onClick={() => act('calculate')}>Tính lương</Button>}
            {canCalc && items.length > 0 && status === 'draft' && <Button variant="accent" icon="lock" disabled={loading} onClick={() => act('lock')}>Chốt lương</Button>}
            {canCalc && status === 'locked' && <Button variant="secondary" icon="unlock" disabled={loading} onClick={() => act('unlock')}>Mở khóa</Button>}
            {canCalc && status === 'locked' && <Button variant="primary" icon="check" disabled={loading} onClick={() => act('pay')}>Đã trả lương</Button>}
            {items.length > 0 && <>
              <Button variant="secondary" icon="download" onClick={() => api.download(`/excel/${year}/${month}`, `bang-luong-${month}-${year}.xlsx`)}>Excel</Button>
              <Button variant="secondary" icon="file-text" onClick={() => api.download(`/pdf/${year}/${month}`, `bang-luong-${month}-${year}.pdf`)}>PDF</Button>
            </>}
          </div>
        </div>
        {msg && <Alert type="ok">{msg}</Alert>}
        {err && <Alert type="err">{err}</Alert>}
        {payroll && <p style={{ marginBottom: 12 }}>Trạng thái kỳ: <StatusPill status={mapStatus(status)} label={status === 'paid' ? 'Đã trả' : status === 'locked' ? 'Đã chốt' : 'Chưa chốt'} /></p>}

        {!items.length ? (
          <EmptyState>Chưa có bảng lương. Nhấn "Tính lương" để tạo.</EmptyState>
        ) : (
          <>
            <VCardGrid>
              {items.map((e) => (
                <VCard key={e.id}>
                  <VCardHead
                    avatar={<Avatar name={e.employee_name} size="sm" />}
                    title={e.employee_name}
                    subtitle={`${e.employee_code} · ${SALARY_TYPE_LABEL[e.salary_type]}`}
                    end={<StatusPill status={mapStatus(e.status)} />}
                  />
                  <VCardRows>
                    <VCardField label="Lương CB" tone="mono">{fmtMoney(e.base_salary)} ₫</VCardField>
                    <VCardField label="Công / Giờ" tone="mono">{e.total_work_units} c · {e.total_hours}h</VCardField>
                    <VCardField label="Nghỉ KP" value={e.total_unpaid_leave} tone="neg" />
                    <VCardField label="Tăng ca" tone="pos">+{fmtMoney(e.overtime_amount)}</VCardField>
                    <VCardField label="Thưởng" tone="pos">+{fmtMoney(e.total_bonus)}</VCardField>
                    <VCardField label="Phạt" tone="neg">−{fmtMoney(e.total_penalty)}</VCardField>
                    <VCardField label="Ứng lương" tone="neg">−{fmtMoney(e.total_advance)}</VCardField>
                    <VCardField label="Tạm tính" tone="mono">{fmtMoney(e.gross_salary)} ₫</VCardField>
                    <VCardField label="Thực nhận" tone="hl" full>
                      <AmountDisplay value={e.net_salary} size="md" tone="accent" showCurrency={false} /> ₫
                    </VCardField>
                  </VCardRows>
                  <VCardActions>
                    <Button size="sm" variant="secondary" icon="printer" onClick={() => printPayslip(e.employee_id)}>In phiếu</Button>
                  </VCardActions>
                </VCard>
              ))}
              <VCard className="lw-vcard__total">
                <VCardHead title={`Tổng cộng · ${items.length} nhân viên`} />
                <VCardRows>
                  <VCardField label="Tổng tạm tính" tone="mono">{fmtMoney(totals.gross)} ₫</VCardField>
                  <VCardField label="Tổng thực nhận" tone="hl">
                    <AmountDisplay value={totals.net} size="lg" tone="accent" showCurrency={false} /> ₫
                  </VCardField>
                </VCardRows>
              </VCard>
            </VCardGrid>
          </>
        )}
      </div>
    );
  }

  function HistoryScreen() {
    const { Alert, VCardGrid, VCard, VCardHead, VCardRows, VCardField, EmptyState } = window.LuaShared;
    const [list, setList] = React.useState([]);
    const [err, setErr] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      api.get('/payrolls/history/list')
        .then((data) => setList(Array.isArray(data) ? data : []))
        .catch((e) => setErr(e.message))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <EmptyState>Đang tải…</EmptyState>;
    if (err) return <Alert type="err">{err}</Alert>;

    return (
      <div>
        <p className="lw-sectitle">Lịch sử lương đã chốt</p>
        {!list.length ? <EmptyState>Chưa có kỳ lương nào được chốt</EmptyState> : (
          <VCardGrid>
            {list.map((p) => (
              <VCard key={p.id}>
                <VCardHead
                  title={`Tháng ${p.month}/${p.year}`}
                  subtitle={p.locked_at ? new Date(p.locked_at).toLocaleString('vi-VN') : '—'}
                  end={<StatusPill status={mapStatus(p.status)} />}
                />
                <VCardRows>
                  <VCardField label="Số nhân viên" value={p.employee_count} tone="mono" />
                  <VCardField label="Tổng chi lương" tone="hl">
                    <AmountDisplay value={p.total_amount} size="md" showCurrency={false} /> ₫
                  </VCardField>
                </VCardRows>
              </VCard>
            ))}
          </VCardGrid>
        )}
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { PayrollScreen, HistoryScreen });
})();
