/* Lúa web kit — app shell + router + auth */
(function () {
  const {
    Sidebar, Topbar, LoginScreen,
    DashboardScreen, EmployeesScreen, AttendanceScreen, LeavesScreen,
    AdvancesScreen, BonusesScreen, PayrollScreen, HistoryScreen, SettingsScreen,
  } = window.LuaWeb;
  const { canAccess } = window.LuaUtils;
  const { DevCredit } = window.LuaShared;
  const api = window.LuaAPI;

  const TITLES = {
    dashboard: { t: 'Dashboard', s: 'Tổng quan hệ thống lương' },
    employees: { t: 'Nhân viên', s: 'Quản lý hồ sơ nhân viên' },
    attendance: { t: 'Chấm công', s: 'Nhập và xem ngày công' },
    leaves: { t: 'Ngày nghỉ', s: 'Quản lý nghỉ phép & nghỉ không phép' },
    advances: { t: 'Ứng lương', s: 'Ghi nhận tạm ứng lương' },
    bonuses: { t: 'Thưởng / Phạt', s: 'Ghi nhận thưởng và phạt' },
    payroll: { t: 'Tính lương', s: 'Bảng lương theo tháng' },
    history: { t: 'Lịch sử lương', s: 'Các kỳ lương đã chốt' },
    settings: { t: 'Cài đặt', s: 'Cấu hình hệ thống' },
  };

  function App() {
    const [user, setUser] = React.useState(api.getUser());
    const [screen, setScreen] = React.useState('dashboard');
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {
      const onLogout = () => setUser(null);
      window.addEventListener('lua:logout', onLogout);
      return () => window.removeEventListener('lua:logout', onLogout);
    }, []);

    if (!user) {
      return <LoginScreen onSuccess={(u) => setUser(u)} />;
    }

    const meta = TITLES[screen] || TITLES.dashboard;
    const props = { user };

    let body;
    if (screen === 'dashboard' && canAccess(user.role, 'dashboard')) body = <DashboardScreen {...props} />;
    else if (screen === 'employees') body = <EmployeesScreen {...props} />;
    else if (screen === 'attendance') body = <AttendanceScreen {...props} />;
    else if (screen === 'leaves') body = <LeavesScreen {...props} />;
    else if (screen === 'advances') body = <AdvancesScreen {...props} />;
    else if (screen === 'bonuses') body = <BonusesScreen {...props} />;
    else if (screen === 'payroll') body = <PayrollScreen {...props} />;
    else if (screen === 'history') body = <HistoryScreen {...props} />;
    else if (screen === 'settings') body = <SettingsScreen {...props} />;
    else body = <DashboardScreen {...props} />;

    return (
      <div className="lw-shell">
        <Sidebar active={screen} onNavigate={setScreen} user={user} open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="lw-main">
          <Topbar title={meta.t} subtitle={meta.s} onMenu={() => setMenuOpen(true)} />
          <div className="lw-scroll">{body}<DevCredit /></div>
        </div>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
