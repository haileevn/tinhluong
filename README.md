# Tính Lương — Ông Mập by H2T

Hệ thống quản lý lương cho quán / doanh nghiệp nhỏ, gồm **ứng dụng quản lý (admin)** và **ứng dụng nhân viên (mobile)**.

- Tính lương theo tháng, ngày hoặc giờ
- Chấm công, ngày nghỉ, ứng lương, thưởng / phạt
- Chốt lương, xuất Excel / PDF, in phiếu lương
- Phân quyền: Admin, Kế toán, Quản lý, Nhân viên

---

## Mục lục

1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cài đặt từng bước](#cài-đặt-từng-bước)
3. [Chạy ứng dụng](#chạy-ứng-dụng)
4. [Tài khoản demo](#tài-khoản-demo)
5. [Hướng dẫn sử dụng — App quản lý](#hướng-dẫn-sử-dụng--app-quản-lý)
6. [Hướng dẫn sử dụng — App nhân viên](#hướng-dẫn-sử-dụng--app-nhân-viên)
7. [Công thức tính lương](#công-thức-tính-lương)
8. [Cấu trúc dự án](#cấu-trúc-dự-án)
9. [API](#api)
10. [Xử lý sự cố](#xử-lý-sự-cố)

---

## Yêu cầu hệ thống

| Thành phần | Phiên bản |
|------------|-----------|
| **Node.js** | 18 trở lên |
| **npm** | Đi kèm Node.js |
| **Hệ điều hành** | Windows, macOS, Linux |

Kiểm tra phiên bản:

```bash
node -v    # ví dụ: v20.x.x
npm -v     # ví dụ: 10.x.x
```

---

## Cài đặt từng bước

### Bước 1 — Tải mã nguồn

```bash
git clone https://github.com/haileevn/tinhluong.git
cd tinhluong
```

Hoặc tải file ZIP từ GitHub rồi giải nén.

### Bước 2 — Cài thư viện

```bash
npm install
```

Lệnh này cài các gói: Express, SQLite, JWT, bcrypt, xuất Excel/PDF, v.v.

### Bước 3 — Tạo database và dữ liệu mẫu

```bash
npm run seed
```

- Tự tạo file SQLite tại `server/data/lua_payroll.db`
- Thêm tài khoản demo, 8 nhân viên mẫu, chấm công, ứng lương, thưởng/phạt
- **An toàn:** không xóa dữ liệu cũ — chỉ thêm khi bảng còn trống

### Bước 4 — Chạy server

```bash
npm start
```

Hoặc chế độ phát triển (tự reload khi sửa code server):

```bash
npm run dev
```

### Bước 5 — Mở trình duyệt

| Ứng dụng | Địa chỉ |
|----------|---------|
| **Quản lý (admin)** | http://localhost:3000/app |
| **Nhân viên (mobile)** | http://localhost:3000/mobile |
| **API** | http://localhost:3000/api |

Đổi cổng (tùy chọn):

```bash
PORT=4000 npm start
```

---

## Chạy ứng dụng

```bash
# Chạy production
npm start

# Chạy dev (hot reload server)
npm run dev

# Nạp lại dữ liệu mẫu (nếu DB trống)
npm run seed
```

Khi chạy thành công, terminal hiển thị:

```
🍊 Ông Mập by H2T — Payroll
   Admin:    http://localhost:3000/app
   Nhân viên: http://localhost:3000/mobile
   API:      http://localhost:3000/api
```

---

## Tài khoản demo

### App quản lý (`/app`)

| Username | Mật khẩu | Vai trò | Quyền |
|----------|----------|---------|-------|
| `admin` | `admin123` | Admin | Toàn quyền, cài đặt hệ thống |
| `ketoan` | `ketoan123` | Kế toán | Tính/chốt lương, ứng, thưởng/phạt |
| `quanly` | `quanly123` | Quản lý | Xem + nhập công & ngày nghỉ |

### App nhân viên (`/mobile`)

| Username | Mật khẩu | Nhân viên |
|----------|----------|-----------|
| `nvanan` | `nv123456` | Nguyễn Văn An |
| `lequan` | `nv123456` | Lê Minh Quân |
| `vulan` | `nv123456` | Vũ Thị Lan |

> Chỉ tài khoản role **employee** đăng nhập được app mobile.

---

## Hướng dẫn sử dụng — App quản lý

Truy cập http://localhost:3000/app và đăng nhập bằng `admin / admin123`.

### 1. Cài đặt hệ thống (lần đầu)

1. Vào menu **Cài đặt** (chỉ Admin).
2. Nhập **tên quán / công ty**.
3. Thiết lập:
   - **Ngày công chuẩn** — mặc định 26 ngày/tháng
   - **Hệ số tăng ca** — ví dụ 1.5
   - **Hạn mức ứng lương** — % lương tạm tính (ví dụ 50%)
4. Nhấn **Lưu**.

### 2. Quản lý nhân viên

1. Vào **Nhân viên** → **Thêm nhân viên**.
2. Điền: mã NV, họ tên, SĐT, chức vụ, **loại lương** (tháng / ngày / giờ), lương cơ bản, ngày vào làm.
3. Nhấn **Lưu**.
4. Dùng ô tìm kiếm và bộ lọc trạng thái để tra cứu.
5. Nhấn vào nhân viên để xem chi tiết, lịch sử lương / ứng / nghỉ.

### 3. Chấm công

1. Vào **Chấm công**.
2. Chọn tháng cần nhập.
3. Nhấn **Thêm công** → chọn nhân viên, ngày, số công, giờ làm, giờ tăng ca.
4. Hệ thống cảnh báo nếu trùng cùng nhân viên + ngày.
5. Xem bảng tổng công / giờ / tăng ca theo từng NV.

### 4. Ngày nghỉ

1. Vào **Ngày nghỉ**.
2. Nhấn **Thêm nghỉ** → chọn NV, ngày, loại nghỉ:
   - Có phép, ốm, việc riêng
   - **Không phép** — sẽ trừ lương (áp dụng NV lương tháng)
3. Xem thống kê tổng nghỉ theo tháng.

### 5. Ứng lương

1. Vào **Ứng lương**.
2. Nhấn **Thêm ứng** → chọn NV, ngày, số tiền, ghi chú.
3. Hệ thống cảnh báo nếu vượt hạn mức % lương tạm tính.
4. Tổng ứng sẽ được trừ khi tính lương cuối tháng.

### 6. Thưởng / Phạt

1. Vào **Thưởng / Phạt**.
2. Nhấn **Thêm** → chọn loại (thưởng hoặc phạt), nhân viên, số tiền, lý do.
3. Thưởng cộng vào lương; phạt trừ khỏi lương.

### 7. Tính và chốt lương

1. Vào **Tính lương**.
2. Chọn **tháng / năm** cần tính.
3. Nhấn **Tính lương** — hệ thống hiển thị bảng lương đầy đủ.
4. Kiểm tra từng dòng: lương CB, trừ nghỉ, tăng ca, thưởng, phạt, ứng, thực nhận.
5. Nhấn **Chốt lương** — khóa kỳ lương (không sửa công tháng đó nữa).
6. Sau khi trả tiền cho NV, nhấn **Đã trả lương**.
7. Cần sửa lại? Dùng **Mở khóa** → tính lại → chốt lại.

### 8. Xuất file & in phiếu lương

1. Trong màn **Tính lương** (đã chốt):
   - **Xuất Excel** — tải file `.xlsx`
   - **Xuất PDF** — tải file `.pdf`
2. Nhấn **In** trên từng dòng nhân viên để in phiếu lương cá nhân.

### 9. Dashboard

Vào **Tổng quan** để xem:

- Số NV đang làm, tổng lương tháng
- Tổng đã ứng, thưởng/phạt
- Top ứng lương, top nghỉ
- Biểu đồ lương theo tháng

---

## Hướng dẫn sử dụng — App nhân viên

Truy cập http://localhost:3000/mobile (tối ưu trên điện thoại).

### 1. Đăng nhập

1. Mở `/mobile` trên trình duyệt điện thoại.
2. Nhập username / mật khẩu (ví dụ: `nvanan / nv123456`).
3. Vào màn hình chính.

### 2. Xem lương

- **Tổng quan:** lương tạm tính tháng hiện tại, hạn mức ứng còn lại, ngày phép.
- **Phiếu lương:** chọn kỳ đã chốt để xem chi tiết.
- **Lịch sử:** các kỳ lương đã chốt trước đó.

### 3. Yêu cầu ứng lương

1. Vào **Ứng lương**.
2. Nhập số tiền và ghi chú.
3. Gửi yêu cầu — kế toán xử lý trên app quản lý.

### 4. Đăng ký nghỉ phép

1. Vào **Nghỉ phép**.
2. Chọn ngày, loại nghỉ, ghi chú.
3. Gửi — quản lý duyệt trên app admin.

---

## Công thức tính lương

Chi tiết trong `server/services/payrollCalculator.js`.

**Lương tháng:**
```
Thực nhận = Lương CB − trừ nghỉ không phép + tăng ca + thưởng − phạt − ứng lương
Trừ nghỉ KP = (Lương CB ÷ ngày công chuẩn) × số ngày nghỉ không phép
```

**Lương ngày:**
```
Thực nhận = Số công × lương ngày + tăng ca + thưởng − phạt − ứng lương
```

**Lương giờ:**
```
Thực nhận = Số giờ × lương giờ + tăng ca + thưởng − phạt − ứng lương
```

**Tăng ca:**
```
Tiền tăng ca = Số giờ tăng ca × lương giờ × hệ số tăng ca
```

---

## Cấu trúc dự án

```
tinhluong/
├── ui_kits/
│   ├── web/              # App quản lý (admin) — /app
│   └── mobile/           # App nhân viên — /mobile
├── server/
│   ├── index.js          # Server Express
│   ├── schema.sql        # Cấu trúc database
│   ├── seed.js           # Dữ liệu mẫu
│   ├── db.js             # Kết nối SQLite
│   ├── routes/           # API endpoints
│   ├── services/         # Logic tính lương
│   └── data/             # File DB (tự tạo khi chạy)
├── assets/               # Logo, hình ảnh
├── package.json
├── TEST_CHECKLIST.md     # Checklist kiểm thử
└── README_CHANGELOG.md   # Lịch sử thay đổi
```

### Database (SQLite)

| Bảng | Mô tả |
|------|--------|
| `employees` | Nhân viên |
| `attendances` | Chấm công |
| `leaves` | Ngày nghỉ |
| `salary_advances` | Ứng lương |
| `bonuses_penalties` | Thưởng / phạt |
| `payrolls` | Bảng lương theo tháng |
| `payroll_items` | Chi tiết lương từng NV |
| `settings` | Cài đặt hệ thống |
| `users` | Tài khoản đăng nhập |

---

## API

Base URL: `http://localhost:3000/api`

| Nhóm | Endpoints |
|------|-----------|
| **Auth** | `POST /auth/login` |
| **Dashboard** | `GET /dashboard` |
| **Nhân viên** | CRUD `/employees` |
| **Chấm công** | CRUD `/attendances` |
| **Ngày nghỉ** | CRUD `/leaves` |
| **Ứng lương** | CRUD `/advances` |
| **Thưởng/Phạt** | CRUD `/bonuses` |
| **Lương** | `GET\|POST /payrolls/:year/:month`, `/calculate`, `/lock`, `/unlock`, `/pay` |
| **Cài đặt** | `GET\|PUT /settings` |
| **Xuất file** | `GET /export/excel`, `/export/pdf`, `/export/payslip/...` |
| **Portal NV** | `GET /portal/home`, `/payslip/...`, `POST /portal/advances`, `/portal/leaves` |

Tất cả endpoint (trừ login) yêu cầu JWT trong header: `Authorization: Bearer <token>`.

---

## Xử lý sự cố

| Vấn đề | Cách xử lý |
|--------|------------|
| `npm install` lỗi `better-sqlite3` | Cài Xcode Command Line Tools (macOS): `xcode-select --install`. Hoặc dùng Node.js LTS 20.x |
| Không đăng nhập được | Chạy lại `npm run seed` để tạo tài khoản demo |
| Trang trắng | Kiểm tra server đang chạy (`npm start`), mở đúng URL `/app` hoặc `/mobile` |
| Dữ liệu cũ / muốn reset | Xóa file `server/data/lua_payroll.db`, chạy lại `npm run seed` |
| Đổi cổng | `PORT=4000 npm start` |

---

## Nhà phát triển

**Dev by [H2T.life](https://h2t.life) - Hải Lê | 0937.777.791**

- Website: [https://h2t.life](https://h2t.life)
- Liên hệ: [0937.777.791](tel:0937777791)

---

## Giấy phép

Dự án mã nguồn mở — sử dụng tự do cho mục đích quản lý lương nội bộ.

---

**Ông Mập by H2T** — Hệ thống tính lương đơn giản, đủ dùng cho quán và doanh nghiệp nhỏ.
