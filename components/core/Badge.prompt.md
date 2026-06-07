**Badge** — compact label for status, counts, and categories. Soft tint by default; `solid` for emphasis; `dot` for live status.

```jsx
<Badge tone="success" dot>Đã trả</Badge>
<Badge tone="warning" dot>Chờ duyệt</Badge>
<Badge tone="brand" icon="hand-coins">Ứng lương</Badge>
<Badge tone="accent" solid>Payday</Badge>
```

For payroll lifecycle states prefer the dedicated `StatusPill`. Use Badge for generic tags, counts, and inline labels.
