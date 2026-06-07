**Input** — labelled text field with hint/error and optional leading icon.

```jsx
<Input label="Email" type="email" icon="mail" placeholder="ban@congty.vn" required />
<Input label="Mã nhân viên" hint="Ví dụ: NV-0142" />
<Input label="Số CCCD" error="Số CCCD không hợp lệ" />
```

For currency amounts use `MoneyInput` instead — it formats đồng and aligns figures.
