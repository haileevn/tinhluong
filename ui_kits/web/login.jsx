/* Lúa — màn hình đăng nhập */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Button } = DS;
  const api = window.LuaAPI;
  const { DEV_PHONE, DEV_PHONE_TEL } = window.LuaUtils;

  const CSS = `
  .lw-login { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--surface-page); padding: 24px; }
  .lw-login__card { width: 100%; max-width: 400px; background: var(--surface-card); border-radius: var(--radius-xl); padding: var(--space-8); box-shadow: var(--shadow-md); border: 1px solid var(--border-subtle); }
  .lw-login__brand { display: flex; align-items: center; gap: 12px; margin-bottom: var(--space-6); }
  .lw-login__brand img { width: 40px; height: 40px; }
  .lw-login__brand h1 { font-family: var(--font-display); font-size: var(--text-2xl); margin: 0; }
  .lw-login__brand h1 span { color: var(--accent); }
  .lw-login label { display: block; margin-bottom: var(--space-4); font-size: var(--text-sm); font-weight: 600; }
  .lw-login input { width: 100%; box-sizing: border-box; padding: 12px; border: 1.5px solid var(--border-default); border-radius: var(--radius-md); margin-top: 6px; font-size: var(--text-base); }
  .lw-login__err { color: var(--danger-600); font-size: var(--text-sm); margin-bottom: 12px; }
  .lw-login__hint { font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-4); line-height: 1.5; }
  .lw-login__dev { margin-top: var(--space-5); padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); font-size: var(--text-2xs); color: var(--text-subtle); text-align: center; line-height: 1.5; }
  .lw-login__dev a { color: var(--text-muted); text-decoration: none; }
  `;
  if (!document.getElementById('lw-login-styles')) {
    const s = document.createElement('style'); s.id = 'lw-login-styles'; s.textContent = CSS; document.head.appendChild(s);
  }

  function LoginScreen({ onSuccess }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const submit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      try {
        const res = await api.login(username.trim(), password);
        api.setAuth(res.token, res.user);
        onSuccess(res.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="lw-login">
        <div className="lw-login__card">
          <div className="lw-login__brand">
            <img src="/assets/ong-map-mark.svg" alt="" />
            <h1>Ông Mập</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>by H2T — Quản lý lương</p>
          {error && <div className="lw-login__err">{error}</div>}
          <form onSubmit={submit}>
            <label>Tên đăng nhập
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
            </label>
            <label>Mật khẩu
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </label>
            <Button variant="primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
            </Button>
          </form>
          <div className="lw-login__hint">
            Tài khoản demo:<br />
            admin / admin123 · ketoan / ketoan123 · quanly / quanly123
          </div>
          <p className="lw-login__dev">
            Dev by H2T - Hải Lê | <a href={`tel:${DEV_PHONE_TEL}`}>{DEV_PHONE}</a>
          </p>
        </div>
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { LoginScreen });
})();
