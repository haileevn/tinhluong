**PayslipLine** — builds a payslip / breakdown row. Stack several inside a `Card`, ending with a `total` row.

```jsx
<Card title="Phiếu lương — Tháng 6/2026">
  <PayslipLine label="Lương cơ bản" amount={18000000} />
  <PayslipLine label="Phụ cấp ăn trưa" amount={730000} />
  <PayslipLine label="BHXH" note="10,5% lương cơ bản" amount={-1890000} />
  <PayslipLine label="Tạm ứng kỳ trước" amount={-3000000} />
  <PayslipLine label="Lương thực nhận" amount={13840000} variant="total" />
</Card>
```

Positive amounts are earnings (green), negatives are deductions (red). The `total` row drops the sign and renders gold.
