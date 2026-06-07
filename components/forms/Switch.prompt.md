**Switch** — binary toggle for settings (e.g. auto-approve advances, email payslips).

```jsx
<Switch label="Tự động duyệt ứng lương dưới 1 triệu" defaultChecked />
<Switch checked={emailPayslip} onChange={(e) => setEmail(e.target.checked)} label="Gửi phiếu lương qua email" />
```
