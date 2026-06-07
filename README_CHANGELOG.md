# README_CHANGELOG — Thay đổi so với prototype

## Trước đây (prototype)

- Design system + UI kit với **mock data** (`ui_kits/web/data.js`)
- Không có backend, database, authentication
- Routing React state đơn giản
- Một số màn hình placeholder (Nhân viên, Nghỉ phép)
- Mở file HTML trực tiếp qua CDN

## Đã bổ sung (không viết lại toàn bộ)

### Giữ nguyên

- Toàn bộ `components/` (Button, MoneyInput, StatusPill, …)
- `tokens/`, `styles.css`, `_ds_bundle.js`
- `ui_kits/mobile/` (prototype app nhân viên)
- `ui_kits/web/data.js`, `ui_kits/web/screens.jsx` (tham chiếu — không còn load trong app)

### Thêm mới

| Thành phần | Mô tả |
|------------|--------|
| `package.json` | Express + SQLite + JWT + xlsx + pdfkit |
| `server/` | API REST, schema, seed, payroll engine |
| `ui_kits/web/api.js` | Client gọi API |
| `ui_kits/web/utils.js` | Định dạng VN, phân quyền UI |
| `ui_kits/web/shared.jsx` | Modal, PeriodPicker, chart |
| `ui_kits/web/login.jsx` | Đăng nhập |
| `ui_kits/web/screens-*.jsx` | 8 module nghiệp vụ |
| `chrome.jsx`, `app.jsx` | Cập nhật nav đầy đủ + responsive |
| `index.html` | Serve qua Express tại `/app` |

### Refactor có chủ đích

- **Dashboard / Bảng lương / Ứng lương:** logic mock → dữ liệu API thật; giữ layout & class CSS cũ
- **Sidebar:** thêm menu đủ 9 mục; mobile drawer thay `min-width: 1180px`
- **Phân quyền:** middleware server + `canAccess` / `canWrite` trên UI

### Database

- SQLite file `server/data/lua_payroll.db`
- Migration = chạy `schema.sql` lúc startup (idempotent `CREATE IF NOT EXISTS`)
- Seed không ghi đè dữ liệu cũ

### v1.1 — Ông Mập by H2T + App nhân viên

- Đổi thương hiệu **Lúa → Ông Mập by H2T** (logo, admin UI, PDF)
- App nhân viên tại `/mobile` — đăng nhập, phiếu lương, ứng lương, nghỉ phép (API `/api/portal`)
- Role `employee` + `employee_id` trên bảng `users`
- Tài khoản demo: `nvanan` / `nv123456`

### Chưa thay đổi

- Build pipeline / bundler — vẫn Babel standalone + React CDN
