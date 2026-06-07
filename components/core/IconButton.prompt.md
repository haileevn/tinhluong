**IconButton** — icon-only square button for toolbars, table-row actions, and mobile nav. Always provide `aria-label`.

```jsx
<IconButton icon="bell" aria-label="Thông báo" />
<IconButton icon="download" variant="outline" aria-label="Tải phiếu lương" />
<IconButton icon="plus" variant="solid" size="lg" aria-label="Tạo bảng lương" />
```

Icon name is a Lucide name; host runs `lucide.createIcons()` after render.
