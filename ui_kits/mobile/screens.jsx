/* Ông Mập — màn hình nhân viên (API thật) */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button, Avatar, Icon, AmountDisplay, StatusPill, ProgressMeter, PayslipLine, MoneyInput, Input } = DS;
  const api = window.OmAPI;

  const CSS = `
  .lm-screen { padding: var(--space-4) var(--space-4) calc(var(--space-8) + 60px); display: flex; flex-direction: column; gap: var(--space-4); }
  .lm-head { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-1) 0 var(--space-2); }
  .lm-head__hi { font-size: var(--text-xs); color: var(--text-muted); }
  .lm-head__name { font-family: var(--font-display); font-weight: 700; font-size: var(--text-lg); color: var(--text-strong); }
  .lm-head__sub { font-size: var(--text-2xs); color: var(--text-subtle); }
  .lm-hero { background: linear-gradient(140deg, var(--gold-500), var(--gold-600) 55%, var(--gold-700)); color: var(--green-950);
    border-radius: var(--radius-xl); padding: var(--space-5); position: relative; overflow: hidden; box-shadow: var(--shadow-md); }
  .lm-hero__eyebrow { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; font-weight: 700; opacity: 0.7; }
  .lm-hero__amt { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; margin: var(--space-1) 0; }
  .lm-hero__sub { font-size: var(--text-sm); font-weight: 500; opacity: 0.85; }
  .lm-hero__foot { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-4); font-size: var(--text-xs); font-weight: 600; background: rgba(255,255,255,0.25); border-radius: var(--radius-pill); padding: var(--space-1-5) var(--space-3); width: fit-content; }
  .lm-hero__grain { position: absolute; right: -12px; top: -12px; opacity: 0.2; }
  .lm-hero__grain img { width: 100px; height: 100px; }
  .lm-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
  .lm-action { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-4) var(--space-2); background: var(--surface-card);
    border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); cursor: pointer; }
  .lm-action__ic { width: 44px; height: 44px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--brand-subtle); color: var(--brand); }
  .lm-action__l { font-size: var(--text-xs); font-weight: 600; color: var(--text-strong); text-align: center; }
  .lm-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
  .lm-row:last-child { border-bottom: none; }
  .lm-row__t { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }
  .lm-row__d { font-size: var(--text-xs); color: var(--text-muted); }
  .lm-chips { display: flex; gap: var(--space-2); flex-wrap: wrap; }
  .lm-chip { font-size: var(--text-sm); font-weight: 600; padding: var(--space-2) var(--space-3); border-radius: var(--radius-pill);
    border: 1.5px solid var(--border-default); background: var(--surface-card); cursor: pointer; }
  .lm-chip[data-on="true"] { border-color: var(--brand); background: var(--brand-subtle); color: var(--text-brand); }
  .lm-success { text-align: center; padding: var(--space-10) var(--space-5); display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
  .lm-success__ic { width: 72px; height: 72px; border-radius: 50%; background: var(--success-100); color: var(--success-600); display: flex; align-items: center; justify-content: center; }
  .lm-ring { display: flex; align-items: center; gap: var(--space-4); }
  .lm-ring__circle { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; }
  .lm-ring__inner { width: 64px; height: 64px; border-radius: 50%; background: var(--surface-card); display: grid; place-items: center; }
  .lm-ring__num { font-family: var(--font-display); font-weight: 800; font-size: var(--text-xl); }
  .lm-sectitle { font-size: var(--text-sm); font-weight: 700; font-family: var(--font-display); margin: var(--space-2) 0 0; }
  .lm-err { color: var(--danger-600); font-size: var(--text-sm); padding: 12px; background: var(--danger-100); border-radius: var(--radius-md); }
  `;
  if (!document.getElementById('lm-styles')) {
    const s = document.createElement('style'); s.id = 'lm-styles'; s.textContent = CSS; document.head.appendChild(s);
  }

  const trVN = (n) => (n / 1e6).toFixed(1).replace('.', ',');

  function Header({ data }) {
    if (!data) return null;
    const short = data.me.name.split(' ').pop();
    return (
      <div className="lm-head">
        <Avatar name={data.me.name} size="md" />
        <div>
          <div className="lm-head__hi">Chào bạn,</div>
          <div className="lm-head__name">{short} 👋</div>
          <div className="lm-head__sub">{data.me.id} · {data.me.dept}</div>
        </div>
      </div>
    );
  }

  function HomeScreen({ go, data, reload }) {
    if (!data) return <div className="lm-screen">Đang tải…</div>;
    const remaining = data.advance.limit - data.advance.used;
    return (
      <div className="lm-screen">
        <Header data={data} />
        <div className="lm-hero">
          <div className="lm-hero__eyebrow">Lương tạm tính · {data.period}</div>
          <div className="lm-hero__amt">{data.accrued.toLocaleString('vi-VN')}<span style={{ fontSize: '0.4em', marginLeft: 6 }}>₫</span></div>
          <div className="lm-hero__sub">Dự kiến thực nhận {trVN(data.estimatedNet)} tr ₫</div>
          <div className="lm-hero__foot"><Icon name="calendar-check" />Trả lương {data.payDate}</div>
          <div className="lm-hero__grain"><img src="/assets/ong-map-mark.svg" alt="" /></div>
        </div>
        <div className="lm-actions">
          <div className="lm-action" onClick={() => go('advance')}><span className="lm-action__ic"><Icon name="hand-coins" /></span><span className="lm-action__l">Ứng lương</span></div>
          <div className="lm-action" onClick={() => go('leave')}><span className="lm-action__ic"><Icon name="calendar-days" /></span><span className="lm-action__l">Nghỉ phép</span></div>
          <div className="lm-action" onClick={() => go('payslip')}><span className="lm-action__ic"><Icon name="receipt" /></span><span className="lm-action__l">Phiếu lương</span></div>
        </div>
        <Card title="Hạn mức ứng lương" subtitle="Còn lại trong tháng này">
          <ProgressMeter value={data.advance.used} max={data.advance.limit || 1}
            valueText={<AmountDisplay value={remaining} size="xs" tone="accent" />} />
          <div style={{ marginTop: 'var(--space-3)' }}>
            <Button variant="accent" fullWidth icon="hand-coins" onClick={() => go('advance')}>Ứng lương ngay</Button>
          </div>
        </Card>
        <Card title="Phép năm" subtitle={`Đã dùng ${data.leave.used}/${data.leave.total} ngày`}>
          <ProgressMeter value={data.leave.used} max={data.leave.total || 1} tone="brand"
            valueText={`Còn ${data.leave.total - data.leave.used} ngày`} />
        </Card>
        <Button variant="ghost" size="sm" onClick={reload}>Làm mới dữ liệu</Button>
      </div>
    );
  }

  function PayslipScreen({ data }) {
    const [slip, setSlip] = React.useState(null);
    const [history, setHistory] = React.useState([]);
    const [err, setErr] = React.useState('');

    React.useEffect(() => {
      if (!data) return;
      Promise.all([
        api.get(`/portal/payslip/${data.year}/${data.month}`),
        api.get('/portal/payslip/history'),
      ]).then(([s, h]) => { setSlip(s); setHistory(h); }).catch((e) => setErr(e.message));
    }, [data]);

    if (err) return <div className="lm-screen"><div className="lm-err">{err}</div></div>;
    if (!slip) return <div className="lm-screen">Đang tải phiếu lương…</div>;

    return (
      <div className="lm-screen">
        <h2 className="lm-sectitle" style={{ fontSize: 'var(--text-xl)' }}>Phiếu lương</h2>
        <Card title={`Phiếu lương · ${slip.period}`} subtitle={`${slip.employee.name} · ${slip.employee.code}`}>
          {slip.lines.filter((l) => l.amount !== 0).map((l, i) => (
            <PayslipLine key={i} label={l.label} note={l.note} amount={l.amount} />
          ))}
          <PayslipLine label="Lương thực nhận" amount={slip.net} variant="total" />
        </Card>
        <h3 className="lm-sectitle">Lịch sử</h3>
        <Card padding="sm">
          {history.length ? history.map((h, i) => (
            <div key={i} className="lm-row">
              <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center' }}><Icon name="receipt" /></span>
              <div style={{ flex: 1 }}><div className="lm-row__t">{h.period}</div><div className="lm-row__d"><StatusPill status={h.status} dot /></div></div>
              <AmountDisplay value={h.net} size="sm" />
            </div>
          )) : <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 16 }}>Chưa có kỳ lương đã chốt</div>}
        </Card>
      </div>
    );
  }

  function AdvanceScreen({ data, onDone }) {
    const remaining = data ? data.advance.limit - data.advance.used : 0;
    const [amount, setAmount] = React.useState(2000000);
    const [reason, setReason] = React.useState('');
    const [done, setDone] = React.useState(false);
    const [err, setErr] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const over = amount > remaining;

    const submit = async () => {
      setLoading(true); setErr('');
      try {
        await api.post('/portal/advances', { amount, notes: reason });
        setDone(true);
        onDone?.();
      } catch (e) { setErr(e.message); }
      finally { setLoading(false); }
    };

    if (done) {
      return (
        <div className="lm-screen">
          <div className="lm-success">
            <div className="lm-success__ic"><Icon name="check" /></div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)' }}>Đã gửi yêu cầu! 🎉</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Ứng <b>{amount.toLocaleString('vi-VN')} ₫</b> đã gửi đến kế toán.</div>
            <Button variant="secondary" onClick={() => { setDone(false); setAmount(2000000); setReason(''); }}>Tạo yêu cầu khác</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="lm-screen">
        <h2 className="lm-sectitle" style={{ fontSize: 'var(--text-xl)' }}>Ứng lương</h2>
        {err && <div className="lm-err">{err}</div>}
        <Card>
          <MoneyInput label="Số tiền muốn ứng" value={amount} onValueChange={setAmount}
            hint={!over ? `Có thể ứng tối đa ${remaining.toLocaleString('vi-VN')} ₫` : undefined} />
          {over && <div style={{ color: 'var(--danger-600)', fontSize: 'var(--text-xs)', marginTop: 6 }}>Vượt hạn mức. Tối đa {remaining.toLocaleString('vi-VN')} ₫.</div>}
          <div className="lm-chips" style={{ marginTop: 'var(--space-3)' }}>
            {[1000000, 2000000, 3000000].filter((v) => v <= remaining).map((v) => (
              <button key={v} type="button" className="lm-chip" data-on={amount === v} onClick={() => setAmount(v)}>{trVN(v)} tr</button>
            ))}
          </div>
          {data && (
            <div style={{ marginTop: 'var(--space-4)' }}>
              <ProgressMeter label="Hạn mức tháng này" value={Math.min(amount + data.advance.used, data.advance.limit)} max={data.advance.limit}
                valueText={`${trVN(Math.min(amount + data.advance.used, data.advance.limit))} / ${trVN(data.advance.limit)} tr`} />
            </div>
          )}
        </Card>
        <Card>
          <Input label="Lý do" placeholder="Ví dụ: Việc gia đình" value={reason} onChange={(e) => setReason(e.target.value)} />
        </Card>
        <Button variant="primary" size="lg" fullWidth disabled={over || !amount || loading} icon="send" onClick={submit}>
          {loading ? 'Đang gửi…' : 'Gửi yêu cầu'}
        </Button>
      </div>
    );
  }

  function LeaveScreen({ onDone }) {
    const [home, setHome] = React.useState(null);
    const [requests, setRequests] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [err, setErr] = React.useState('');

    const load = React.useCallback(() => {
      Promise.all([api.get('/portal/home'), api.get('/portal/leaves')])
        .then(([h, r]) => { setHome(h); setRequests(r); });
    }, []);

    React.useEffect(() => { load(); }, [load]);

    const submit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      setErr('');
      try {
        await api.post('/portal/leaves', {
          leave_date: fd.get('leave_date'),
          leave_type: fd.get('leave_type'),
          days: Number(fd.get('days')),
          notes: fd.get('notes'),
        });
        setShowForm(false);
        load();
        onDone?.();
      } catch (ex) { setErr(ex.message); }
    };

    if (!home) return <div className="lm-screen">Đang tải…</div>;
    const pct = home.leave.total ? home.leave.used / home.leave.total : 0;

    return (
      <div className="lm-screen">
        <h2 className="lm-sectitle" style={{ fontSize: 'var(--text-xl)' }}>Nghỉ phép</h2>
        <Card>
          <div className="lm-ring">
            <div className="lm-ring__circle" style={{ background: `conic-gradient(var(--brand) ${pct * 360}deg, var(--neutral-200) 0)` }}>
              <div className="lm-ring__inner">
                <div style={{ textAlign: 'center' }}>
                  <div className="lm-ring__num">{home.leave.total - home.leave.used}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ngày còn lại</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>Phép năm</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Đã dùng {home.leave.used} / {home.leave.total} ngày</div>
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <Button variant="primary" fullWidth icon="plus" onClick={() => setShowForm(true)}>Tạo yêu cầu nghỉ</Button>
          </div>
        </Card>

        {showForm && (
          <Card title="Yêu cầu nghỉ mới">
            {err && <div className="lm-err">{err}</div>}
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Ngày nghỉ
                <input type="date" name="leave_date" required style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 8, border: '1px solid var(--border-default)' }} />
              </label>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Loại
                <select name="leave_type" style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 8 }}>
                  <option value="paid">Phép năm</option>
                  <option value="sick">Nghỉ ốm</option>
                  <option value="personal">Việc riêng</option>
                </select>
              </label>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Số ngày
                <input type="number" name="days" min="0.5" step="0.5" defaultValue="1" required style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 8, border: '1px solid var(--border-default)' }} />
              </label>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Ghi chú
                <input name="notes" placeholder="Tuỳ chọn" style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 8, border: '1px solid var(--border-default)' }} />
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>Hủy</Button>
                <Button variant="primary" type="submit">Gửi</Button>
              </div>
            </form>
          </Card>
        )}

        <h3 className="lm-sectitle">Lịch sử nghỉ</h3>
        <Card padding="sm">
          {requests.length ? requests.map((r) => (
            <div key={r.id} className="lm-row">
              <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--brand-subtle)', color: 'var(--brand)', display: 'grid', placeItems: 'center' }}><Icon name="calendar-days" /></span>
              <div style={{ flex: 1 }}><div className="lm-row__t">{r.range}</div><div className="lm-row__d">{r.type} · {r.days} ngày</div></div>
              <StatusPill status="approved" label="Đã ghi" dot />
            </div>
          )) : <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 16 }}>Chưa có yêu cầu nghỉ</div>}
        </Card>
      </div>
    );
  }

  window.OmMobile = Object.assign(window.OmMobile || {}, { HomeScreen, PayslipScreen, AdvanceScreen, LeaveScreen, Header });
})();
