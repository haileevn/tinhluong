**ProgressMeter** — shows consumption against a cap. Two main uses: salary-advance limit and leave-day balance. Auto-shifts to amber/red as it fills.

```jsx
<ProgressMeter label="Hạn mức ứng tháng này" value={3000000} max={9000000}
  valueText="3.000.000 / 9.000.000 ₫" footnote="Còn lại 6.000.000 ₫" />

<ProgressMeter label="Phép năm đã dùng" value={9} max={12}
  valueText="9 / 12 ngày" />
```
