/* Ông Mập — API client (app nhân viên) */
(function () {
  const API_BASE = window.OM_API_BASE || '/api';

  function getToken() { return localStorage.getItem('om_token'); }
  function setAuth(token, user) {
    if (token) localStorage.setItem('om_token', token);
    if (user) localStorage.setItem('om_user', JSON.stringify(user));
  }
  function clearAuth() {
    localStorage.removeItem('om_token');
    localStorage.removeItem('om_user');
  }
  function getUser() {
    try { return JSON.parse(localStorage.getItem('om_user')); } catch { return null; }
  }

  async function request(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      clearAuth();
      window.dispatchEvent(new Event('om:logout'));
      throw new Error(data.error || 'Phiên đăng nhập hết hạn');
    }
    if (!res.ok) throw new Error(data.error || `Lỗi ${res.status}`);
    return data;
  }

  const DEV_CREDIT = 'Dev by H2T - Hải Lê | 0937.777.791';
  const DEV_PHONE = '0937.777.791';
  const DEV_PHONE_TEL = '0937777791';

  window.OmAPI = {
    get: (p) => request(p),
    post: (p, body) => request(p, { method: 'POST', body: JSON.stringify(body || {}) }),
    login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    setAuth, clearAuth, getUser, getToken,
    DEV_CREDIT, DEV_PHONE, DEV_PHONE_TEL,
  };
})();
