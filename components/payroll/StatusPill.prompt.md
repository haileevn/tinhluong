**StatusPill** — the canonical way to show payroll/advance/leave state. Maps each status to its Vietnamese label + icon so wording stays consistent across the product.

```jsx
<StatusPill status="paid" />       // Đã trả
<StatusPill status="pending" />    // Chờ duyệt
<StatusPill status="overdue" />    // Quá hạn
<StatusPill status="approved" />   // Đã duyệt
<StatusPill status="draft" />      // Nháp
<StatusPill status="processing" /> // Đang xử lý
```

Prefer this over a generic `Badge` for any payroll lifecycle state. Pass `label` to override copy for a one-off.
