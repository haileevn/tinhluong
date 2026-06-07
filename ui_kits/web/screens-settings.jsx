/* Module Cài đặt */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button } = DS;
  const { Alert } = window.LuaShared;
  const api = window.LuaAPI;

  function SettingsScreen({ user }) {
    const [settings, setSettings] = React.useState(null);
    const [msg, setMsg] = React.useState('');
    const [err, setErr] = React.useState('');
    const isAdmin = user?.role === 'admin';

    React.useEffect(() => {
      api.get('/settings').then(setSettings).catch((e) => setErr(e.message));
    }, []);

    const save = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      try {
        await api.put('/settings', {
          company_name: fd.get('company_name'),
          standard_work_days: fd.get('standard_work_days'),
          overtime_multiplier: fd.get('overtime_multiplier'),
          advance_limit_percent: fd.get('advance_limit_percent'),
          company_logo: fd.get('company_logo'),
        });
        setMsg('Đã lưu cài đặt');
        setErr('');
      } catch (ex) { setErr(ex.message); }
    };

    if (!settings) return <div className="lw-empty">Đang tải…</div>;

    return (
      <Card title="Cài đặt hệ thống" subtitle={isAdmin ? 'Chỉ Admin được sửa' : 'Chỉ xem'}>
        {msg && <Alert type="ok">{msg}</Alert>}
        {err && <Alert type="err">{err}</Alert>}
        <form className="lw-form" onSubmit={save} style={{ maxWidth: 480 }}>
          <label>Tên doanh nghiệp / quán
            <input name="company_name" defaultValue={settings.company_name} disabled={!isAdmin} />
          </label>
          <label>Logo URL (tuỳ chọn)
            <input name="company_logo" defaultValue={settings.company_logo || ''} disabled={!isAdmin} placeholder="https://..." />
          </label>
          <label>Số ngày công chuẩn / tháng
            <input type="number" name="standard_work_days" min="1" max="31" defaultValue={settings.standard_work_days} disabled={!isAdmin} />
          </label>
          <label>Hệ số tăng ca
            <input type="number" step="0.1" name="overtime_multiplier" defaultValue={settings.overtime_multiplier} disabled={!isAdmin} />
          </label>
          <label>Giới hạn ứng lương (% lương tạm tính)
            <input type="number" name="advance_limit_percent" min="1" max="100" defaultValue={settings.advance_limit_percent} disabled={!isAdmin} />
          </label>
          <label>Số ngày phép năm (app nhân viên)
            <input type="number" name="annual_leave_days" min="0" max="30" defaultValue={settings.annual_leave_days || 12} disabled={!isAdmin} />
          </label>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Nghỉ không phép (lương tháng): trừ = lương cơ bản ÷ ngày công chuẩn × số ngày nghỉ không phép.
          </p>
          {isAdmin && <Button variant="primary" type="submit">Lưu cài đặt</Button>}
        </form>
      </Card>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { SettingsScreen });
})();
