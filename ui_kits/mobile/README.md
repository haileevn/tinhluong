# Ông Mập by H2T — App nhân viên

App mobile cho nhân viên: xem lương, ứng lương, đăng ký nghỉ phép.

## Chạy

Cùng server với admin:

```bash
npm start
```

Mở: **http://localhost:3000/mobile** (tối ưu trên điện thoại / thu hẹp cửa sổ trình duyệt).

## Đăng nhập demo

| Username | Mật khẩu | Nhân viên |
|----------|----------|-----------|
| `nvanan` | `nv123456` | Nguyễn Văn An |
| `lequan` | `nv123456` | Lê Minh Quân |
| `vulan` | `nv123456` | Vũ Thị Lan |

Chỉ tài khoản role **employee** đăng nhập được app này.

## API

Base: `/api/portal` (cần JWT)

- `GET /home` — tổng quan lương tạm tính, hạn mức ứng, phép
- `GET /payslip/:year/:month` — phiếu lương kỳ
- `GET /payslip/history` — lịch sử đã chốt
- `POST /advances` — yêu cầu ứng lương
- `GET|POST /leaves` — xem / tạo ngày nghỉ

## Files

- `api.js`, `login.jsx`, `screens.jsx`, `app.jsx`, `index.html`
- `data.js` — mock cũ (không dùng khi chạy qua server)
