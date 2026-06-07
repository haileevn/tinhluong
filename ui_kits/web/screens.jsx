/* Lúa web kit — screens (PROTOTYPE / LEGACY).
 * File giữ làm tham chiếu UI mock. App chạy thật dùng screens-*.jsx + API.
 * Xem README_CHANGELOG.md */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button, Badge, Avatar, Icon, StatCard, AmountDisplay, StatusPill, ProgressMeter, PayslipLine } = DS;

  const CSS = `
  .lw-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); margin-bottom: var(--space-6); }
  .lw-cols { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-5); }
  .lw-payday { background: linear-gradient(135deg, var(--green-700), var(--green-600) 60%, var(--green-800)); color: #fff; border-radius: var(--radius-xl); padding: var(--space-6); position: relative; overflow: hidden; }
  .lw-payday__eyebrow { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--green-100); font-weight: 600; }
  .lw-payday__amt { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; letter-spacing: -0.02em; margin: var(--space-2) 0 var(--space-1); }
  .lw-payday__row { display: flex; gap: var(--space-6); margin-top: var(--space-5); }
  .lw-payday__k { font-size: var(--text-xs); color: var(--green-100); }
  .lw-payday__v { font-size: var(--text-lg); font-weight: 600; font-family: var(--font-mono); }
  .lw-payday__grain { position: absolute; right: -20px; bottom: -20px; opacity: 0.14; }
  .lw-payday__grain svg { width: 160px; height: 160px; }

  .lw-act { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
  .lw-act:last-child { border-bottom: none; }
  .lw-act__icon { width: 34px; height: 34px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .lw-act__t { font-size: var(--text-sm); color: var(--text-strong); font-weight: 500; }
  .lw-act__d { font-size: var(--text-xs); color: var(--text-muted); }

  .lw-tablewrap { width: 100%; overflow: auto; }
  table.lw-table { width: 100%; border-collapse: collapse; }
  .lw-table th { text-align: left; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em;
    padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--border-default); white-space: nowrap; }
  .lw-table th.num, .lw-table td.num { text-align: right; }
  .lw-table td { padding: var(--space-3); border-bottom: 1px solid var(--border-subtle); font-size: var(--text-sm); color: var(--text-body); vertical-align: middle; }
  .lw-table tr:hover td { background: var(--surface-hover); }
  .lw-emp { display: flex; align-items: center; gap: var(--space-2-5); }
  .lw-emp__n { font-weight: 600; color: var(--text-strong); font-size: var(--text-sm); }
  .lw-emp__id { font-size: var(--text-2xs); color: var(--text-subtle); font-family: var(--font-mono); }
  .lw-table tfoot td { border-top: 1.5px solid var(--border-strong); border-bottom: none; font-weight: 700; color: var(--text-strong); padding-top: var(--space-3); }

  .lw-pagehead { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); margin-bottom: var(--space-5); }
  .lw-period { display: inline-flex; align-items: center; gap: var(--space-2); background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); cursor: pointer; }
  .lw-period svg { width: 16px; height: 16px; color: var(--text-muted); }

  .lw-adv { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--surface-card); margin-bottom: var(--space-3); }
  .lw-adv__main { flex: 1; min-width: 0; }
  .lw-adv__top { display: flex; align-items: center; gap: var(--space-2-5); }
  .lw-adv__name { font-weight: 600; color: var(--text-strong); }
  .lw-adv__meta { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; }
  .lw-adv__limit { width: 220px; flex-shrink: 0; }
  .lw-adv__amt { text-align: right; width: 150px; flex-shrink: 0; }
  .lw-adv__actions { display: flex; gap: var(--space-2); flex-shrink: 0; }
  .lw-sectitle { font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); margin: 0 0 var(--space-3); }
  `;
  if (!document.getElementById('lw-screens-styles')) {
    const s = document.createElement('style'); s.id = 'lw-screens-styles'; s.textContent = CSS; document.head.appendChild(s);
  }

  const D = () => window.LUA_DATA;

  // ---------------- Dashboard ----------------
  function DashboardScreen() {
    const d = D();
    const acts = [
      { ic: 'check-circle-2', tone: 'success', t: 'Bảng lương tháng 5 đã thanh toán', d: '32 nhân viên · 05/06/2026' },
      { ic: 'hand-coins', tone: 'accent', t: 'Lê Minh Quân yêu cầu ứng 5.000.000 ₫', d: 'Chờ duyệt · 2 giờ trước' },
      { ic: 'calendar-days', tone: 'info', t: 'Vũ Thị Lan xin nghỉ phép 2 ngày', d: 'Đã duyệt · hôm qua' },
      { ic: 'user-plus', tone: 'brand', t: 'Thêm nhân viên mới: Đặng Quốc Bảo', d: '01/06/2026' },
    ];
    const toneBg = { success: 'var(--success-100)', accent: 'var(--gold-100)', info: 'var(--info-100)', brand: 'var(--brand-subtle)' };
    const toneFg = { success: 'var(--success-600)', accent: 'var(--gold-700)', info: 'var(--info-600)', brand: 'var(--brand)' };
    return (
      <div>
        <div className="lw-grid4">
          <StatCard icon="wallet" label="Quỹ lương tháng 6" value={<AmountDisplay value={d.stats.payrollTotal} size="lg" />} delta="+4,2%" trend="up" footnote="vs T5" />
          <StatCard icon="users" iconTone="info" label="Nhân viên" value={String(d.stats.headcount)} delta="+2" trend="up" footnote="tháng này" />
          <StatCard icon="hand-coins" iconTone="accent" label="Ứng lương chờ duyệt" value={String(d.stats.advancePending)} delta="cần xử lý" trend="flat" />
          <StatCard icon="calendar-days" iconTone="danger" label="Ngày nghỉ tháng này" value={String(d.stats.leaveThisMonth)} delta="−3" trend="down" footnote="vs T5" />
        </div>
        <div className="lw-cols">
          <div>
            <div className="lw-payday">
              <div className="lw-payday__eyebrow">Kỳ lương hiện tại · {d.period}</div>
              <div className="lw-payday__amt">{(d.stats.payrollTotal / 1e6).toFixed(1).replace('.', ',')} tr ₫</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--green-100)' }}>Tổng chi lương dự kiến cho {d.stats.headcount} nhân viên</div>
              <div className="lw-payday__row">
                <div><div className="lw-payday__k">Đã xác nhận</div><div className="lw-payday__v">{d.payrun.progress}/{d.payrun.total}</div></div>
                <div><div className="lw-payday__k">Ngày trả lương</div><div className="lw-payday__v">{d.payrun.payDate}</div></div>
                <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                  <Button variant="accent" icon="play" onClick={() => alert('Chạy bảng lương (demo)')}>Chạy bảng lương</Button>
                </div>
              </div>
              <div className="lw-payday__grain"><img src="../../assets/lua-mark.svg" alt="" style={{ width: 160, height: 160 }} /></div>
            </div>
            <div style={{ height: 'var(--space-5)' }} />
            <Card title="Phân bổ theo phòng ban" subtitle="Chi phí lương tháng 6">
              {[['Kỹ thuật', 0.32], ['Kinh doanh', 0.27], ['Kế toán', 0.15], ['Marketing', 0.14], ['Kho vận & khác', 0.12]].map(([name, r]) => (
                <div key={name} style={{ marginBottom: 'var(--space-3)' }}>
                  <ProgressMeter label={name} value={Math.round(r * 100)} max={100} tone="brand"
                    valueText={<AmountDisplay value={Math.round(d.stats.payrollTotal * r)} compact size="xs" />} />
                </div>
              ))}
            </Card>
          </div>
          <Card title="Hoạt động gần đây" action={<Button size="sm" variant="ghost" iconEnd="chevron-right">Tất cả</Button>}>
            {acts.map((a, i) => (
              <div key={i} className="lw-act">
                <span className="lw-act__icon" style={{ background: toneBg[a.tone], color: toneFg[a.tone] }}><Icon name={a.ic} /></span>
                <div style={{ flex: 1 }}><div className="lw-act__t">{a.t}</div><div className="lw-act__d">{a.d}</div></div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    );
  }

  // ---------------- Payroll table ----------------
  function PayrollScreen() {
    const d = D();
    const fmt = (n) => n.toLocaleString('vi-VN');
    const totals = d.employees.reduce((a, e) => ({ base: a.base + e.base, allow: a.allow + e.allow, deduct: a.deduct + e.deduct, net: a.net + d.netOf(e) }), { base: 0, allow: 0, deduct: 0, net: 0 });
    return (
      <div>
        <div className="lw-pagehead">
          <div className="lw-period"><Icon name="calendar" />{d.period}<Icon name="chevron-down" /></div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" icon="download">Xuất Excel</Button>
            <Button variant="primary" icon="check">Duyệt tất cả</Button>
          </div>
        </div>
        <Card padding="sm">
          <div className="lw-tablewrap">
            <table className="lw-table">
              <thead>
                <tr>
                  <th>Nhân viên</th><th>Phòng ban</th>
                  <th className="num">Lương cơ bản</th><th className="num">Phụ cấp</th>
                  <th className="num">Khấu trừ</th><th className="num">Thực nhận</th><th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {d.employees.map((e) => (
                  <tr key={e.id}>
                    <td><div className="lw-emp"><Avatar name={e.name} size="sm" /><div><div className="lw-emp__n">{e.name}</div><div className="lw-emp__id">{e.id}</div></div></div></td>
                    <td>{e.dept}</td>
                    <td className="num" style={{ fontFamily: 'var(--font-mono)' }}>{fmt(e.base)}</td>
                    <td className="num" style={{ fontFamily: 'var(--font-mono)', color: 'var(--money-positive)' }}>+{fmt(e.allow)}</td>
                    <td className="num" style={{ fontFamily: 'var(--font-mono)', color: 'var(--money-negative)' }}>−{fmt(e.deduct)}</td>
                    <td className="num"><AmountDisplay value={d.netOf(e)} size="sm" showCurrency={false} /></td>
                    <td><StatusPill status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Tổng cộng · {d.employees.length} nhân viên</td>
                  <td className="num" style={{ fontFamily: 'var(--font-mono)' }}>{fmt(totals.base)}</td>
                  <td className="num" style={{ fontFamily: 'var(--font-mono)' }}>+{fmt(totals.allow)}</td>
                  <td className="num" style={{ fontFamily: 'var(--font-mono)' }}>−{fmt(totals.deduct)}</td>
                  <td className="num"><AmountDisplay value={totals.net} size="sm" tone="accent" showCurrency={false} /></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  // ---------------- Advances (interactive) ----------------
  function AdvancesScreen() {
    const d = D();
    const [items, setItems] = React.useState(d.advances);
    const setStatus = (id, status) => setItems((xs) => xs.map((x) => x.id === id ? { ...x, status } : x));
    const pending = items.filter((x) => x.status === 'pending');
    const handled = items.filter((x) => x.status !== 'pending');

    const Row = ({ a }) => (
      <div className="lw-adv">
        <Avatar name={a.emp} size="md" />
        <div className="lw-adv__main">
          <div className="lw-adv__top"><span className="lw-adv__name">{a.emp}</span><Badge tone="neutral" size="sm">{a.dept}</Badge></div>
          <div className="lw-adv__meta">{a.reason} · {a.date} · <span style={{ fontFamily: 'var(--font-mono)' }}>{a.id}</span></div>
        </div>
        <div className="lw-adv__limit">
          <ProgressMeter value={a.amount} max={a.limit} valueText={`${(a.amount/1e6).toFixed(1).replace('.',',')} / ${(a.limit/1e6).toFixed(1).replace('.',',')} tr`} />
        </div>
        <div className="lw-adv__amt"><AmountDisplay value={a.amount} size="md" tone="accent" /></div>
        {a.status === 'pending'
          ? <div className="lw-adv__actions">
              <Button size="sm" variant="secondary" icon="x" onClick={() => setStatus(a.id, 'overdue')}>Từ chối</Button>
              <Button size="sm" variant="primary" icon="check" onClick={() => setStatus(a.id, 'approved')}>Duyệt</Button>
            </div>
          : <div style={{ width: 150, display: 'flex', justifyContent: 'flex-end' }}><StatusPill status={a.status === 'overdue' ? 'overdue' : a.status} label={a.status === 'overdue' ? 'Đã từ chối' : undefined} /></div>}
      </div>
    );

    return (
      <div>
        <div className="lw-pagehead">
          <div className="lw-period"><Icon name="calendar" />{d.period}<Icon name="chevron-down" /></div>
          <Button variant="primary" icon="plus">Tạo yêu cầu</Button>
        </div>
        <p className="lw-sectitle">Chờ duyệt · {pending.length}</p>
        {pending.length ? pending.map((a) => <Row key={a.id} a={a} />) : <Card elevation="flat"><div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 'var(--space-6)' }}>Không còn yêu cầu nào chờ duyệt 🎉</div></Card>}
        <p className="lw-sectitle" style={{ marginTop: 'var(--space-6)' }}>Đã xử lý</p>
        {handled.map((a) => <Row key={a.id} a={a} />)}
      </div>
    );
  }

  function PlaceholderScreen({ title, icon }) {
    return (
      <Card elevation="flat">
        <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-6)', color: 'var(--text-muted)' }}>
          <div style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--brand-subtle)', color: 'var(--brand)', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}><Icon name={icon} size={26} /></div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>{title}</div>
          <div style={{ fontSize: 'var(--text-sm)', marginTop: 4 }}>Màn hình mẫu — nội dung sẽ được bổ sung.</div>
        </div>
      </Card>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { DashboardScreen, PayrollScreen, AdvancesScreen, PlaceholderScreen });
})();
