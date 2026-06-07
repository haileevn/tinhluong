**StatCard** — dashboard KPI tile. Pair with `AmountDisplay` for money metrics.

```jsx
<StatCard icon="wallet" label="Tổng quỹ lương tháng 6"
  value={<AmountDisplay value={742500000} size="lg" />}
  delta="+4,2%" trend="up" footnote="so với tháng 5" />

<StatCard icon="hand-coins" iconTone="accent" label="Yêu cầu ứng lương"
  value="12" delta="3 chờ duyệt" trend="flat" />
```
