/* Lúa web kit — sidebar + topbar (responsive) */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Icon, Avatar, IconButton, Badge, Button } = DS;
  const { canAccess, ROLE_LABEL } = window.LuaUtils;
  const { DevCredit } = window.LuaShared;
  const api = window.LuaAPI;

  const CSS = `
  .lw-shell { display: grid; grid-template-columns: var(--sidebar-w) 1fr; height: 100%; min-height: 100vh; min-height: 100dvh; min-width: 0; width: 100%; max-width: 100vw; background: var(--surface-page); }
  .lw-side { background: var(--surface-card); border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; padding: var(--space-5) var(--space-3); }
  .lw-brand { display: flex; align-items: center; gap: var(--space-2-5); padding: var(--space-1) var(--space-2) var(--space-5); }
  .lw-brand img { width: 34px; height: 34px; }
  .lw-brand b { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; color: var(--text-strong); }
  .lw-brand b span { color: var(--accent); }
  .lw-navlabel { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--text-subtle); font-weight: 600; padding: var(--space-3) var(--space-2) var(--space-1); }
  .lw-nav { display: flex; flex-direction: column; gap: 2px; }
  .lw-navitem { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2-5) var(--space-3); border-radius: var(--radius-md);
    font-size: var(--text-base); font-weight: 500; color: var(--text-muted); cursor: pointer; border: none; background: none; width: 100%; text-align: left; }
  .lw-navitem svg { width: 19px; height: 19px; }
  .lw-navitem:hover { background: var(--surface-hover); color: var(--text-strong); }
  .lw-navitem[data-active="true"] { background: var(--brand-subtle); color: var(--text-brand); font-weight: 600; }
  .lw-side__foot { margin-top: auto; }
  .lw-side__dev { margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); font-size: var(--text-2xs); color: var(--text-subtle); text-align: center; line-height: 1.45; }
  .lw-side__dev a { color: var(--text-muted); text-decoration: none; }
  .lw-user { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2-5); border-radius: var(--radius-md); }
  .lw-user__name { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }
  .lw-user__role { font-size: var(--text-xs); color: var(--text-muted); }
  .lw-main { display: flex; flex-direction: column; min-width: 0; }
  .lw-top { min-height: var(--topbar-h); border-bottom: 1px solid var(--border-subtle); background: color-mix(in srgb, var(--surface-card) 88%, transparent);
    display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) var(--page-pad); position: sticky; top: 0; z-index: var(--z-sticky); flex-wrap: wrap; }
  .lw-top__title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--text-strong); }
  .lw-top__sub { font-size: var(--text-xs); color: var(--text-muted); }
  .lw-scroll { flex: 1; overflow: auto; padding: var(--page-pad); }
  .lw-menu-btn { display: none; border: none; background: var(--surface-sunken); width: 40px; height: 40px; border-radius: var(--radius-md); align-items: center; justify-content: center; flex-shrink: 0; }
  .lw-overlay { display: none; }
  @media (max-width: 900px) {
    .lw-shell { grid-template-columns: 1fr !important; min-width: 0 !important; }
    .lw-side { position: fixed; left: 0; top: 0; bottom: 0; width: min(280px, 88vw); z-index: 200; transform: translateX(-105%); transition: transform .2s ease; box-shadow: var(--shadow-lg); }
    .lw-side[data-open="true"] { transform: translateX(0); }
    .lw-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 150; }
    .lw-menu-btn { display: inline-flex; }
    .lw-main { width: 100%; max-width: 100vw; overflow-x: hidden; }
    .lw-top { padding: var(--space-3) var(--space-4); }
    .lw-top__title { font-size: var(--text-lg); }
    .lw-scroll { padding: var(--space-4); -webkit-overflow-scrolling: touch; }
  }
  `;
  // Ghi đè CSS cũ từ _ds_bundle.js (có min-width: 1180px)
  const OLD = document.getElementById('lw-chrome-styles');
  if (OLD) OLD.remove();
  let s = document.getElementById('lw-chrome-styles-v2');
  if (!s) { s = document.createElement('style'); s.id = 'lw-chrome-styles-v2'; document.head.appendChild(s); }
  s.textContent = CSS;

  const NAV = [
    { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { key: 'employees', label: 'Nhân viên', icon: 'users' },
    { key: 'attendance', label: 'Chấm công', icon: 'clipboard-list' },
    { key: 'leaves', label: 'Ngày nghỉ', icon: 'calendar-days' },
    { key: 'advances', label: 'Ứng lương', icon: 'hand-coins' },
    { key: 'bonuses', label: 'Thưởng / Phạt', icon: 'scale' },
    { key: 'payroll', label: 'Tính lương', icon: 'file-text' },
    { key: 'history', label: 'Lịch sử lương', icon: 'history' },
    { key: 'settings', label: 'Cài đặt', icon: 'settings' },
  ];

  function Sidebar({ active, onNavigate, user, open, onClose }) {
    const items = NAV.filter((n) => canAccess(user?.role, n.key));
    return (
      <>
        {open && <div className="lw-overlay" onClick={onClose} />}
        <aside className="lw-side" data-open={open}>
          <div className="lw-brand">
            <img src="/assets/ong-map-mark.svg" alt="" />
            <b>Ông Mập <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--text-muted)' }}>by H2T</span></b>
          </div>
          <div className="lw-navlabel">Quản lý</div>
          <nav className="lw-nav">
            {items.filter((n) => n.key !== 'settings').map((n) => (
              <button key={n.key} className="lw-navitem" data-active={active === n.key}
                onClick={() => { onNavigate(n.key); onClose?.(); }}>
                <Icon name={n.icon} /><span>{n.label}</span>
              </button>
            ))}
          </nav>
          {canAccess(user?.role, 'settings') && (
            <>
              <div className="lw-navlabel">Hệ thống</div>
              <nav className="lw-nav">
                <button className="lw-navitem" data-active={active === 'settings'} onClick={() => { onNavigate('settings'); onClose?.(); }}>
                  <Icon name="settings" /><span>Cài đặt</span>
                </button>
              </nav>
            </>
          )}
          <div className="lw-side__foot">
            <div className="lw-user">
              <Avatar name={user?.name || '?'} size="md" />
              <div>
                <div className="lw-user__name">{user?.name}</div>
                <div className="lw-user__role">{ROLE_LABEL[user?.role] || user?.role}</div>
              </div>
            </div>
            <Button size="sm" variant="ghost" style={{ width: '100%', marginTop: 8 }} onClick={() => { api.clearAuth(); window.dispatchEvent(new Event('lua:logout')); }}>
              Đăng xuất
            </Button>
            <DevCredit className="lw-side__dev" />
          </div>
        </aside>
      </>
    );
  }

  function Topbar({ title, subtitle, onMenu }) {
    return (
      <header className="lw-top">
        <button className="lw-menu-btn lw-navitem" onClick={onMenu} aria-label="Menu"><Icon name="menu" /></button>
        <div>
          <div className="lw-top__title">{title}</div>
          {subtitle && <div className="lw-top__sub">{subtitle}</div>}
        </div>
      </header>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { Sidebar, Topbar, NAV });
})();
