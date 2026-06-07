**Icon** — inline-SVG Lucide glyph. Use this (not raw `<i data-lucide>`) inside React so icons survive re-renders. Requires `<script src="https://unpkg.com/lucide">` on the page for the icon data.

```jsx
<Icon name="wallet" />                    // inherits text size + color
<Icon name="hand-coins" size={20} />
<Icon name="check-circle-2" style={{ color: 'var(--success-600)' }} />
```

Icons inherit `currentColor` and `1em` sizing. Most Lúa components (Button, StatusPill, StatCard…) use Icon internally — pass them a Lucide name string.
