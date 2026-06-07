/* Ông Mập — app nhân viên (full screen, production) */
(function () {
  const { LoginScreen, HomeScreen, PayslipScreen, AdvanceScreen, LeaveScreen } = window.OmMobile;
  const { Icon, Button } = window.LAPayrollDesignSystem_59f88b;
  const api = window.OmAPI;
  const { DEV_PHONE, DEV_PHONE_TEL } = api;

  const CSS = `
  .om-app { min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; background: var(--surface-page); }
  .om-app__top { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: var(--surface-card); border-bottom: 1px solid var(--border-subtle); }
  .om-app__brand { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-weight: 800; font-size: var(--text-base); }
  .om-app__brand img { width: 28px; height: 28px; }
  .om-app__body { flex: 1; overflow-y: auto; overflow-x: hidden; }
  .om-tabs { flex-shrink: 0; display: grid; grid-template-columns: repeat(4, 1fr); background: color-mix(in srgb, var(--surface-card) 95%, transparent);
    backdrop-filter: blur(12px); border-top: 1px solid var(--border-subtle); padding: 8px 8px calc(8px + env(safe-area-inset-bottom, 0px)); }
  .om-tab { display: flex; flex-direction: column; align-items: center; gap: 2px; border: none; background: none; cursor: pointer; color: var(--text-subtle); padding: 4px; }
  .om-tab svg { width: 22px; height: 22px; }
  .om-tab[data-on="true"] { color: var(--brand); }
  .om-tab__l { font-size: 10px; font-weight: 600; }
  .om-dev { flex-shrink: 0; text-align: center; font-size: 10px; color: var(--text-subtle); padding: 4px 16px 0; line-height: 1.4; }
  .om-dev a { color: var(--text-muted); text-decoration: none; }
  `;
  if (!document.getElementById('om-app-styles')) {
    const s = document.createElement('style'); s.id = 'om-app-styles'; s.textContent = CSS; document.head.appendChild(s);
  }

  const TABS = [
    { key: 'home', label: 'Trang chủ', icon: 'house' },
    { key: 'payslip', label: 'Phiếu lương', icon: 'receipt' },
    { key: 'advance', label: 'Ứng lương', icon: 'hand-coins' },
    { key: 'leave', label: 'Nghỉ phép', icon: 'calendar-days' },
  ];

  function App() {
    const [user, setUser] = React.useState(api.getUser());
    const [tab, setTab] = React.useState('home');
    const [homeData, setHomeData] = React.useState(null);

    const loadHome = React.useCallback(() => {
      if (!user) return;
      api.get('/portal/home').then(setHomeData).catch(() => setHomeData(null));
    }, [user]);

    React.useEffect(() => {
      const onLogout = () => { setUser(null); setHomeData(null); };
      window.addEventListener('om:logout', onLogout);
      return () => window.removeEventListener('om:logout', onLogout);
    }, []);

    React.useEffect(() => { loadHome(); }, [loadHome]);

    if (!user) {
      return <LoginScreen onSuccess={(u) => setUser(u)} />;
    }

    const go = (t) => setTab(t);
    let screen;
    if (tab === 'home') screen = <HomeScreen go={go} data={homeData} reload={loadHome} />;
    else if (tab === 'payslip') screen = <PayslipScreen data={homeData} />;
    else if (tab === 'advance') screen = <AdvanceScreen data={homeData} onDone={loadHome} />;
    else screen = <LeaveScreen onDone={loadHome} />;

    return (
      <div className="om-app">
        <header className="om-app__top">
          <div className="om-app__brand">
            <img src="/assets/ong-map-mark.svg" alt="" />
            <span>Ông Mập <small style={{ fontWeight: 500, color: 'var(--text-muted)' }}>by H2T</small></span>
          </div>
          <Button size="sm" variant="ghost" onClick={() => { api.clearAuth(); setUser(null); }}>Thoát</Button>
        </header>
        <main className="om-app__body" key={tab}>{screen}</main>
        <p className="om-dev">
          Dev by H2T - Hải Lê | <a href={`tel:${DEV_PHONE_TEL}`}>{DEV_PHONE}</a>
        </p>
        <nav className="om-tabs">
          {TABS.map((t) => (
            <button key={t.key} className="om-tab" data-on={tab === t.key} onClick={() => go(t.key)}>
              <Icon name={t.icon} />
              <span className="om-tab__l">{t.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
