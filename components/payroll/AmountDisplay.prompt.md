**AmountDisplay** — the single source of truth for rendering money. Always tabular, always Vietnamese-formatted ("12.500.000 ₫").

```jsx
<AmountDisplay value={24500000} size="xl" tone="accent" />   // hero net pay (gold)
<AmountDisplay value={2500000} signed size="sm" />           // +2.500.000 ₫ (green)
<AmountDisplay value={-1890000} signed size="sm" />          // −1.890.000 ₫ (red)
<AmountDisplay value={18000000} compact />                   // 18 tr ₫
```

- `signed` auto-colors: positive→green, negative→red. Use for payslip line items.
- `size="xl"` switches to the display font for hero figures (payday card).
- `compact` for dense dashboards only; never on payslips where full precision matters.
