import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.lua-badge {
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  font-size: var(--text-xs);
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1) var(--space-2-5);
  border-radius: var(--radius-pill);
  white-space: nowrap;
}
.lua-badge--sm { font-size: var(--text-2xs); padding: 3px var(--space-2); }
.lua-badge svg { width: 0.95em; height: 0.95em; }
.lua-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.lua-badge--neutral { background: var(--neutral-150); color: var(--neutral-700); }
.lua-badge--brand   { background: var(--brand-subtle); color: var(--text-brand); }
.lua-badge--success { background: var(--success-100); color: var(--success-700); }
.lua-badge--warning { background: var(--warning-100); color: var(--warning-700); }
.lua-badge--danger  { background: var(--danger-100); color: var(--danger-700); }
.lua-badge--info    { background: var(--info-100); color: var(--info-700); }
.lua-badge--accent  { background: var(--gold-100); color: var(--gold-800); }

/* solid */
.lua-badge--solid.lua-badge--brand   { background: var(--brand); color: var(--on-brand); }
.lua-badge--solid.lua-badge--success { background: var(--success-600); color: #fff; }
.lua-badge--solid.lua-badge--danger  { background: var(--danger-600); color: #fff; }
.lua-badge--solid.lua-badge--accent  { background: var(--accent); color: var(--on-accent); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Compact label for status, counts, categories.
 */
export function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  solid = false,
  dot = false,
  icon,
  ...rest
}) {
  useStyles('lua-badge-styles', CSS);
  const cls = [
    'lua-badge',
    `lua-badge--${tone}`,
    size === 'sm' ? 'lua-badge--sm' : '',
    solid ? 'lua-badge--solid' : '',
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot && <span className="lua-badge__dot" />}
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
}
