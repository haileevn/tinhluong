import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.lua-status {
  display: inline-flex; align-items: center; gap: var(--space-1-5);
  font-family: var(--font-sans); font-weight: var(--weight-semibold);
  font-size: var(--text-xs); line-height: 1;
  padding: var(--space-1) var(--space-2-5) var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
}
.lua-status__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.lua-status svg { width: 13px; height: 13px; }
.lua-status--paid     { background: var(--success-100); color: var(--success-700); }
.lua-status--pending  { background: var(--warning-100); color: var(--warning-700); }
.lua-status--overdue  { background: var(--danger-100);  color: var(--danger-700); }
.lua-status--approved { background: var(--info-100);    color: var(--info-700); }
.lua-status--draft    { background: var(--neutral-150);  color: var(--neutral-600); }
.lua-status--processing { background: var(--brand-subtle); color: var(--text-brand); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

const MAP = {
  paid:       { label: 'Đã trả',     icon: 'check-circle-2' },
  pending:    { label: 'Chờ duyệt',  icon: 'clock' },
  overdue:    { label: 'Quá hạn',    icon: 'alert-triangle' },
  approved:   { label: 'Đã duyệt',   icon: 'badge-check' },
  draft:      { label: 'Nháp',       icon: null },
  processing: { label: 'Đang xử lý', icon: 'loader' },
};

/**
 * Payroll-lifecycle status pill with the canonical Vietnamese label + icon.
 */
export function StatusPill({ status = 'draft', label, dot = false, ...rest }) {
  useStyles('lua-status-styles', CSS);
  const cfg = MAP[status] || MAP.draft;
  return (
    <span className={`lua-status lua-status--${status}`} {...rest}>
      {dot ? <span className="lua-status__dot" /> : cfg.icon && <Icon name={cfg.icon} />}
      {label || cfg.label}
    </span>
  );
}
