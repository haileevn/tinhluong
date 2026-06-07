/* Lúa — components dùng chung */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button, Icon, Input } = DS;
  const { periodLabel, fmtMoney } = window.LuaUtils;

  const CSS = `
  .lw-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); margin-bottom: var(--space-6); }
  .lw-cols { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-5); }
  .lw-payday { background: linear-gradient(135deg, var(--green-700), var(--green-600) 60%, var(--green-800)); color: #fff; border-radius: var(--radius-xl); padding: var(--space-6); position: relative; overflow: hidden; }
  .lw-payday__eyebrow { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--green-100); font-weight: 600; }
  .lw-payday__amt { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; margin: var(--space-2) 0 var(--space-1); }
  .lw-payday__row { display: flex; gap: var(--space-6); margin-top: var(--space-5); flex-wrap: wrap; }
  .lw-payday__k { font-size: var(--text-xs); color: var(--green-100); }
  .lw-payday__v { font-size: var(--text-lg); font-weight: 600; font-family: var(--font-mono); }
  .lw-act { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
  .lw-act:last-child { border-bottom: none; }
  .lw-act__icon { width: 34px; height: 34px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .lw-act__t { font-size: var(--text-sm); color: var(--text-strong); font-weight: 500; }
  .lw-act__d { font-size: var(--text-xs); color: var(--text-muted); }
  .lw-tablewrap { width: 100%; overflow: auto; }
  table.lw-table { width: 100%; border-collapse: collapse; }
  .lw-table th { text-align: left; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); text-transform: uppercase; padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--border-default); white-space: nowrap; }
  .lw-table th.num, .lw-table td.num { text-align: right; }
  .lw-table td { padding: var(--space-3); border-bottom: 1px solid var(--border-subtle); font-size: var(--text-sm); vertical-align: middle; }
  .lw-table tr:hover td { background: var(--surface-hover); }
  .lw-emp { display: flex; align-items: center; gap: var(--space-2-5); }
  .lw-emp__n { font-weight: 600; color: var(--text-strong); font-size: var(--text-sm); }
  .lw-emp__id { font-size: var(--text-2xs); color: var(--text-subtle); font-family: var(--font-mono); }
  .lw-table tfoot td { border-top: 1.5px solid var(--border-strong); font-weight: 700; }
  .lw-pagehead { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); margin-bottom: var(--space-5); flex-wrap: wrap; }
  .lw-adv { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--surface-card); margin-bottom: var(--space-3); flex-wrap: wrap; }
  .lw-adv__main { flex: 1; min-width: 0; }
  .lw-adv__top { display: flex; align-items: center; gap: var(--space-2-5); }
  .lw-adv__name { font-weight: 600; color: var(--text-strong); }
  .lw-adv__meta { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; }
  .lw-adv__amt { text-align: right; }
  .lw-sectitle { font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); margin: 0 0 var(--space-3); }
  .lw-modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .lw-modal { background: var(--surface-card); border-radius: var(--radius-xl); padding: var(--space-6); width: 100%; max-width: 520px; max-height: 90vh; overflow: auto; box-shadow: var(--shadow-lg); }
  .lw-modal h3 { margin: 0 0 var(--space-4); font-family: var(--font-display); }
  .lw-form { display: flex; flex-direction: column; gap: var(--space-4); }
  .lw-form label { display: flex; flex-direction: column; gap: 4px; font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }
  .lw-form input, .lw-form select, .lw-form textarea {
    padding: var(--space-2-5) var(--space-3); border: 1.5px solid var(--border-default); border-radius: var(--radius-md);
    font-family: var(--font-sans); font-size: var(--text-sm);
  }
  .lw-form textarea { min-height: 72px; resize: vertical; }
  .lw-form__err { color: var(--danger-600); font-size: var(--text-xs); }
  .lw-form__warn { color: var(--warning-700); font-size: var(--text-xs); background: var(--warning-100); padding: 8px; border-radius: var(--radius-md); }
  .lw-form__actions { display: flex; gap: var(--space-2); justify-content: flex-end; margin-top: var(--space-2); }
  .lw-filters { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-4); align-items: center; }
  .lw-filters input, .lw-filters select { padding: 8px 12px; border: 1px solid var(--border-default); border-radius: var(--radius-md); font-size: var(--text-sm); }
  .lw-empty { text-align: center; padding: var(--space-10); color: var(--text-muted); }
  .lw-alert { padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-4); font-size: var(--text-sm); }
  .lw-alert--err { background: var(--danger-100); color: var(--danger-700); }
  .lw-alert--ok { background: var(--success-100); color: var(--success-700); }
  .lw-period-sel { display: inline-flex; align-items: center; gap: 8px; }
  .lw-period-sel select { padding: 8px 12px; border: 1px solid var(--border-default); border-radius: var(--radius-md); font-weight: 600; }
  .lw-chart { display: flex; align-items: flex-end; gap: 8px; height: 140px; padding-top: 8px; }
  .lw-chart__bar { flex: 1; background: var(--brand); border-radius: 4px 4px 0 0; min-height: 4px; position: relative; }
  .lw-chart__lbl { font-size: 10px; color: var(--text-muted); text-align: center; margin-top: 4px; }

  /* ---- VCard layout (thay bảng) ---- */
  .lw-vgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-4); }
  .lw-vcard {
    background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
    padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3);
    box-shadow: var(--shadow-sm); transition: box-shadow var(--dur-fast);
  }
  .lw-vcard:hover { box-shadow: var(--shadow-md); }
  .lw-vcard__head { display: flex; align-items: flex-start; gap: var(--space-3); }
  .lw-vcard__info { flex: 1; min-width: 0; }
  .lw-vcard__title { font-weight: 700; font-size: var(--text-base); color: var(--text-strong); line-height: 1.25; word-break: break-word; }
  .lw-vcard__sub { font-size: var(--text-xs); color: var(--text-muted); margin-top: 3px; font-family: var(--font-mono); }
  .lw-vcard__end { flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .lw-vcard__rows { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
  .lw-vcard__field { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .lw-vcard__field--full { grid-column: 1 / -1; }
  .lw-vcard__label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-muted); font-weight: 600; }
  .lw-vcard__val { font-size: var(--text-sm); color: var(--text-strong); word-break: break-word; }
  .lw-vcard__val--mono { font-family: var(--font-mono); }
  .lw-vcard__val--pos { color: var(--money-positive); }
  .lw-vcard__val--neg { color: var(--money-negative); }
  .lw-vcard__val--hl { font-family: var(--font-display); font-weight: 800; font-size: var(--text-xl); color: var(--accent); }
  .lw-vcard__actions { display: flex; flex-wrap: wrap; gap: var(--space-2); padding-top: var(--space-2); border-top: 1px solid var(--border-subtle); margin-top: auto; }
  .lw-vcard__total { background: var(--brand-subtle); border-color: color-mix(in srgb, var(--brand) 25%, var(--border-subtle)); }

  @media (max-width: 900px) {
    .lw-vgrid { grid-template-columns: 1fr; }
    .lw-grid4 { grid-template-columns: repeat(2, 1fr) !important; }
    .lw-cols { grid-template-columns: 1fr !important; }
    .lw-payday { padding: var(--space-5); }
    .lw-payday__row { gap: var(--space-4); }
  }
  @media (max-width: 600px) {
    .lw-grid4 { grid-template-columns: 1fr !important; }
    .lw-payday__amt { font-size: var(--text-3xl); }
  }
  `;
  if (!document.getElementById('lw-shared-styles')) {
    const s = document.createElement('style'); s.id = 'lw-shared-styles'; s.textContent = CSS; document.head.appendChild(s);
  }

  function Modal({ title, children, onClose }) {
    return (
      <div className="lw-modal-bg" onClick={onClose}>
        <div className="lw-modal" onClick={(e) => e.stopPropagation()}>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    );
  }

  function PeriodPicker({ year, month, onChange }) {
    const years = [];
    const cy = new Date().getFullYear();
    for (let y = cy - 2; y <= cy + 1; y++) years.push(y);
    return (
      <div className="lw-period-sel">
        <Icon name="calendar" />
        <select value={month} onChange={(e) => onChange(year, Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>Tháng {m}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => onChange(Number(e.target.value), month)}>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    );
  }

  function Alert({ type, children }) {
    return <div className={`lw-alert lw-alert--${type}`}>{children}</div>;
  }

  function SalaryChart({ data }) {
    if (!data?.length) return <div className="lw-empty">Chưa có dữ liệu lương các tháng trước</div>;
    const max = Math.max(...data.map((d) => d.total_amount), 1);
    return (
      <div>
        <div className="lw-chart">
          {data.map((d) => (
            <div key={`${d.year}-${d.month}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="lw-chart__bar" style={{ height: `${Math.max(4, (d.total_amount / max) * 120)}px` }} title={`${fmtMoney(d.total_amount)} ₫`} />
              <div className="lw-chart__lbl">T{d.month}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function usePeriod() {
    const cp = window.LuaUtils.currentPeriod();
    const [year, setYear] = React.useState(cp.year);
    const [month, setMonth] = React.useState(cp.month);
    const setPeriod = (y, m) => { setYear(y); setMonth(m); };
    return { year, month, setPeriod, label: periodLabel(year, month) };
  }

  function VCardGrid({ children, className }) {
    return <div className={`lw-vgrid${className ? ` ${className}` : ''}`}>{children}</div>;
  }

  function VCard({ children, className }) {
    return <article className={`lw-vcard${className ? ` ${className}` : ''}`}>{children}</article>;
  }

  function VCardHead({ avatar, title, subtitle, end }) {
    return (
      <div className="lw-vcard__head">
        {avatar}
        <div className="lw-vcard__info">
          <div className="lw-vcard__title">{title}</div>
          {subtitle && <div className="lw-vcard__sub">{subtitle}</div>}
        </div>
        {end && <div className="lw-vcard__end">{end}</div>}
      </div>
    );
  }

  function VCardRows({ children }) {
    return <div className="lw-vcard__rows">{children}</div>;
  }

  function VCardField({ label, value, tone, full, children }) {
    const cls = ['lw-vcard__val', tone === 'mono' && 'lw-vcard__val--mono', tone === 'pos' && 'lw-vcard__val--pos',
      tone === 'neg' && 'lw-vcard__val--neg', tone === 'hl' && 'lw-vcard__val--hl'].filter(Boolean).join(' ');
    return (
      <div className={`lw-vcard__field${full ? ' lw-vcard__field--full' : ''}`}>
        <span className="lw-vcard__label">{label}</span>
        <span className={cls}>{children ?? value}</span>
      </div>
    );
  }

  function VCardActions({ children }) {
    return <div className="lw-vcard__actions">{children}</div>;
  }

  function EmptyState({ children }) {
    return <div className="lw-empty">{children}</div>;
  }

  window.LuaShared = {
    Modal, PeriodPicker, Alert, SalaryChart, usePeriod,
    VCardGrid, VCard, VCardHead, VCardRows, VCardField, VCardActions, EmptyState,
    Card, Button, Icon, Input,
  };
})();
