**MoneyInput** — đồng currency field. Right-aligned mono figures, "." thousands separators, ₫ suffix. Emits the parsed integer via `onValueChange`.

```jsx
<MoneyInput label="Số tiền ứng" defaultValue={3000000}
  hint="Tối đa 50% lương đã tích luỹ"
  onValueChange={(amt) => setAmount(amt)} />
```

Use for any user-entered amount (advance request, manual adjustment). For displaying a fixed amount use `AmountDisplay`.
