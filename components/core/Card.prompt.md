**Card** — the default surface for grouping content. Use `title`/`subtitle`/`action` for a standard header, or omit for a plain padded surface.

```jsx
<Card title="Bảng lương tháng 6" subtitle="32 nhân viên" action={<Button size="sm" variant="ghost" icon="download">Xuất</Button>}>
  …
</Card>

<Card elevation="raised" interactive>…</Card>
```

`elevation`: `resting` (default, hairline + soft shadow), `flat` (no shadow, for nested cards), `raised` (floats — feature/stat cards).
