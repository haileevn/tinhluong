/* Lúa — API client */
(function () {
  const API_BASE = window.LUA_API_BASE || '/api';

  function getToken() {
    return localStorage.getItem('lua_token');
  }

  function setAuth(token, user) {
    if (token) localStorage.setItem('lua_token', token);
    if (user) localStorage.setItem('lua_user', JSON.stringify(user));
  }

  function clearAuth() {
    localStorage.removeItem('lua_token');
    localStorage.removeItem('lua_user');
  }

  function getUser() {
    try { return JSON.parse(localStorage.getItem('lua_user')); } catch { return null; }
  }

  async function request(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      clearAuth();
      window.dispatchEvent(new Event('lua:logout'));
      throw new Error(data.error || 'Phiên đăng nhập hết hạn');
    }
    if (!res.ok) throw new Error(data.error || `Lỗi ${res.status}`);
    return data;
  }

  const api = {
    get: (p) => request(p),
    post: (p, body) => request(p, { method: 'POST', body: JSON.stringify(body || {}) }),
    put: (p, body) => request(p, { method: 'PUT', body: JSON.stringify(body || {}) }),
    del: (p) => request(p, { method: 'DELETE' }),

    login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    me: () => request('/auth/me'),
    getToken, setAuth, clearAuth, getUser,

    exportUrl: (path) => {
      const token = getToken();
      return `${API_BASE}/export${path}${path.includes('?') ? '&' : '?'}token=${token}`;
    },

    download: async (path, filename) => {
      const token = getToken();
      const res = await fetch(`${API_BASE}/export${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Tải file thất bại');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
  };

  window.LuaAPI = api;
})();
