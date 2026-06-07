# Checklist kiểm thử — Lúa Payroll

Chạy server: `npm start` → http://localhost:3000/app

## Đăng nhập & phân quyền

- [ ] Đăng nhập `admin / admin123` — thấy đủ menu
- [ ] Đăng nhập `ketoan / ketoan123` — tính/chốt lương được
- [ ] Đăng nhập `quanly / quanly123` — không thấy Cài đặt, không sửa NV
- [ ] Đăng xuất hoạt động
- [ ] Truy cập `/app` khi chưa login → hiện form đăng nhập

## Nhân viên

- [ ] Thêm nhân viên mới (đủ trường: mã, tên, loại lương, lương CB)
- [ ] Validate: mã trùng → báo lỗi
- [ ] Tìm kiếm theo tên / mã
- [ ] Lọc trạng thái đang làm / nghỉ việc
- [ ] Sửa nhân viên
- [ ] Xóa mềm nhân viên
- [ ] Xem chi tiết lịch sử lương / ứng / nghỉ

## Chấm công

- [ ] Nhập công theo ngày
- [ ] Cảnh báo trùng cùng NV + ngày
- [ ] Xem bảng công theo tháng
- [ ] Tổng công / giờ / tăng ca theo NV

## Ngày nghỉ

- [ ] Thêm nghỉ các loại: có phép, không phép, ốm, việc riêng
- [ ] Thống kê tổng nghỉ theo tháng
- [ ] Nghỉ không phép ảnh hưởng lương tháng (sau khi tính lương)

## Ứng lương

- [ ] Thêm ứng lương
- [ ] Không cho số tiền ≤ 0
- [ ] Cảnh báo vượt hạn mức % lương tạm tính
- [ ] Tổng ứng trừ vào lương cuối tháng

## Thưởng / Phạt

- [ ] Thêm thưởng → cộng lương
- [ ] Thêm phạt → trừ lương
- [ ] Thống kê tổng thưởng/phạt tháng

## Tính lương

- [ ] Chọn tháng/năm
- [ ] Nút **Tính lương** — hiện bảng đủ cột
- [ ] Công thức đúng cho NV lương tháng / ngày / giờ
- [ ] **Chốt lương** — status → đã chốt
- [ ] Sau chốt: không sửa công tháng đó (hoặc mở khóa trước)
- [ ] **Mở khóa** — cho phép tính lại
- [ ] **Đã trả lương**
- [ ] Tổng tiền phải trả cuối bảng

## Lịch sử & xuất file

- [ ] Lịch sử lương hiện các kỳ đã chốt
- [ ] Xuất Excel bảng lương
- [ ] Xuất PDF bảng lương
- [ ] In phiếu lương từng NV (nút In)

## Dashboard

- [ ] Tổng NV đang làm
- [ ] Tổng lương tháng
- [ ] Tổng đã ứng, thưởng/phạt
- [ ] Top ứng / top nghỉ
- [ ] Biểu đồ lương theo tháng

## Cài đặt

- [ ] Admin sửa: ngày công chuẩn, hệ số tăng ca, % ứng, tên công ty
- [ ] Kế toán / Quản lý không sửa được

## Responsive mobile

- [ ] Mở trên viewport ≤ 900px
- [ ] Menu hamburger mở sidebar
- [ ] Bảng scroll ngang
- [ ] Form nhập liệu dùng được trên mobile
