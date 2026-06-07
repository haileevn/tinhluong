/* Dashboard — dữ liệu thật từ API */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { StatCard, AmountDisplay, Button, Card, Icon, ProgressMeter } = DS;
  const { Modal, PeriodPicker, SalaryChart, usePeriod, Alert } = window.LuaShared;
  const { fmtMoney } = window.LuaUtils;
  const api = window.LuaAPI;

  function DashboardScreen() {
    const { year, month, setPeriod, label } = usePeriod();
    const [data, setData] = React.useState(null);
    const [err, setErr] = React.useState('');

    React.useEffect(() => {
      api.get(`/dashboard?year=${year}&month=${month}`)
        .then(setData).catch((e) => setErr(e.message));
    }, [year, month]);

    if (err) return <Alert type="err">{err}</Alert>;
    if (!data) return <div className="lw-empty">Đang tải…</div>;

    const s = data.stats;
    return (
      <div>
        <div style={{ marginBottom: 16 }}><PeriodPicker year={year} month={month} onChange={setPeriod} /></div>
        <div className="lw-grid4">
          <StatCard icon="users" iconTone="info" label="Nhân viên đang làm" value={String(s.headcount)} footnote={label} />
          <StatCard icon="wallet" label="Lương phải trả" value={<AmountDisplay value={s.payrollTotal} size="lg" />} footnote={s.payrollStatus === 'paid' ? 'Đã trả' : s.payrollStatus === 'locked' ? 'Đã chốt' : 'Chưa chốt'} />
          <StatCard icon="hand-coins" iconTone="accent" label="Tổng đã ứng" value={<AmountDisplay value={s.advanceTotal} size="lg" />} />
          <StatCard icon="calendar-days" iconTone="danger" label="NV nghỉ trong tháng" value={String(s.leaveEmployees)} />
        </div>
        <div className="lw-cols">
          <div>
            <div className="lw-payday">
              <div className="lw-payday__eyebrow">Kỳ lương · {data.period}</div>
              <div className="lw-payday__amt">{(s.payrollTotal / 1e6).toFixed(1).replace('.', ',')} tr ₫</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--green-100)' }}>{data.company} · {s.headcount} nhân viên</div>
              <div className="lw-payday__row">
                <div><div className="lw-payday__k">Thưởng tháng</div><div className="lw-payday__v">{fmtMoney(s.bonusTotal)}</div></div>
                <div><div className="lw-payday__k">Phạt tháng</div><div className="lw-payday__v">{fmtMoney(s.penaltyTotal)}</div></div>
              </div>
            </div>
            <div style={{ height: 'var(--space-5)' }} />
            <Card title="Lương theo tháng" subtitle="12 kỳ gần nhất">
              <SalaryChart data={data.chartData} />
            </Card>
          </div>
          <div>
            <Card title="Ứng lương nhiều nhất" subtitle={label}>
              {data.topAdvances.length ? data.topAdvances.map((a, i) => (
                <div key={i} className="lw-act">
                  <span className="lw-act__icon" style={{ background: 'var(--gold-100)', color: 'var(--gold-700)' }}><Icon name="hand-coins" /></span>
                  <div style={{ flex: 1 }}><div className="lw-act__t">{a.name}</div><div className="lw-act__d">{a.code}</div></div>
                  <AmountDisplay value={a.total} size="sm" />
                </div>
              )) : <div className="lw-empty">Chưa có dữ liệu</div>}
            </Card>
            <div style={{ height: 'var(--space-5)' }} />
            <Card title="Nghỉ nhiều nhất" subtitle={label}>
              {data.topLeaves.length ? data.topLeaves.map((a, i) => (
                <div key={i} className="lw-act">
                  <span className="lw-act__icon" style={{ background: 'var(--info-100)', color: 'var(--info-600)' }}><Icon name="calendar-days" /></span>
                  <div style={{ flex: 1 }}><div className="lw-act__t">{a.name}</div><div className="lw-act__d">{a.total_days} ngày</div></div>
                </div>
              )) : <div className="lw-empty">Chưa có dữ liệu</div>}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { DashboardScreen });
})();
