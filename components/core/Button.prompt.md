**Button** — the primary action control. Use for any user-triggered action; `primary` (paddy green) for the main action on a view, `secondary` for adjacent actions, `ghost` for tertiary/toolbar, `accent` (gold) only for money/payday moments, `danger` for destructive.

```jsx
<Button variant="primary" icon="hand-coins">Ứng lương ngay</Button>
<Button variant="secondary" iconEnd="chevron-right">Xem chi tiết</Button>
<Button variant="accent" size="lg" fullWidth>Nhận lương</Button>
<Button variant="ghost" size="sm" icon="download">Tải phiếu lương</Button>
<Button variant="danger" loading>Đang xoá…</Button>
```

- One `primary` per view. Reserve `accent` for payday/money highlights — it is loud on purpose.
- `icon` / `iconEnd` take **Lucide** names; the host page must run `lucide.createIcons()` after render.
- Sizes: `sm` (32px, dense toolbars), `md` (40px, default), `lg` (48px, mobile primary CTAs).
