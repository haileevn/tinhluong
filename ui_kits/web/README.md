# Lúa — HR / Admin web app (UI kit)

A high-fidelity recreation of the Lúa payroll admin product for HR managers. Composes the design-system components (no re-implementations).

## Run
Open `index.html`. It loads React + Babel + the compiled `_ds_bundle.js`, then the kit scripts.

## Screens (interactive)
- **Tổng quan (Dashboard)** — KPI stat cards, a payday hero card (green→gold), department cost breakdown, recent activity feed.
- **Bảng lương (Payroll run)** — employee payroll table with base / allowance / deduction / net columns, per-row `StatusPill`, totals footer, export + approve actions.
- **Ứng lương (Advances)** — salary-advance approval queue. **Click Duyệt / Từ chối** to approve or reject a request live; it moves from "Chờ duyệt" to "Đã xử lý".
- **Nhân viên / Nghỉ phép** — placeholder screens (sample chrome only).

## Files
- `index.html` — entry + script loading.
- `data.js` — mock company/employee/advance data (`window.LUA_DATA`).
- `chrome.jsx` — `Sidebar`, `Topbar` (→ `window.LuaWeb`).
- `screens.jsx` — `DashboardScreen`, `PayrollScreen`, `AdvancesScreen`, `PlaceholderScreen`.
- `app.jsx` — shell, screen router, mount.

## Components used
`Card`, `Button`, `IconButton`, `Badge`, `Avatar`, `Icon`, `StatCard`, `AmountDisplay`, `StatusPill`, `ProgressMeter`.
