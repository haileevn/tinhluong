/* Ông Mập — đăng nhập nhân viên */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Button } = DS;
  const api = window.OmAPI;
  const { DevCredit } = window.OmMobile;

  const CSS = `
  .om-login { min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; padding: 24px; background: var(--surface-page); }
  .om-login__brand { text-align: center; margin-bottom: 32px; }
  .om-login__brand img { width: 72px; height: 72px; }
  .om-login__brand h1 { font-family: var(--font-display); font-size: var(--text-2xl); margin: 12px 0 4px; }
  .om-login__brand p { color: var(--text-muted); font-size: var(--text-sm); margin: 0; }
  .om-login label { display: block; margin-bottom: 16px; font-size: var(--text-sm); font-weight: 600; }
  .om-login input { width: 100%; box-sizing: border-box; padding: 14px; border: 1.5px solid var(--border-default); border-radius: var(--radius-md); margin-top: 6px; font-size: 16px; }
  .om-login__err { color: var(--danger-600); font-size: var(--text-sm); margin-bottom: 12px; }
  .om-login__hint { font-size: var(--text-xs); color: var(--text-muted); margin-top: 20px; text-align: center; line-height: 1.6; }
  .om-dev { margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-subtle); text-align: center; line-height: 1.5; }
  .om-dev a { color: var(--text-muted); text-decoration: none; }
  `;
  if (!document.getElementById('om-login-styles')) {
    const s = document.createElement('style'); s.id = 'om-login-styles'; s.textContent = CSS; document.head.appendChild(s);
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
        if (res.user.role !== 'employee') {
          throw new Error('Tài khoản này dành cho quản lý. Hãy dùng app admin.');
        }
        api.setAuth(res.token, res.user);
        onSuccess(res.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="om-login">
        <div className="om-login__brand">
          <img src="/assets/ong-map-mark.svg" alt="" />
          <h1>Ông Mập</h1>
          <p>by H2T — App nhân viên</p>
        </div>
        {error && <div className="om-login__err">{error}</div>}
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
        <div className="om-login__hint">
          Demo: nvanan / nv123456<br />lequan / nv123456 · vulan / nv123456
        </div>
        <DevCredit />
      </div>
    );
  }

  window.OmMobile = Object.assign(window.OmMobile || {}, { LoginScreen });
})();
