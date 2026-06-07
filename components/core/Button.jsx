import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.lua-btn {
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  white-space: nowrap;
  text-decoration: none;
  transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.lua-btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.lua-btn:active { transform: scale(0.98); }
.lua-btn[disabled] { cursor: not-allowed; opacity: 0.5; transform: none; }
.lua-btn svg { width: 1.15em; height: 1.15em; flex-shrink: 0; }

/* sizes */
.lua-btn--sm { height: var(--control-sm); padding: 0 var(--space-3); font-size: var(--text-sm); }
.lua-btn--md { height: var(--control-md); padding: 0 var(--space-4); font-size: var(--text-base); }
.lua-btn--lg { height: var(--control-lg); padding: 0 var(--space-5); font-size: var(--text-md); }
.lua-btn--full { width: 100%; }

/* variants */
.lua-btn--primary { background: var(--brand); color: var(--on-brand); }
.lua-btn--primary:hover:not([disabled]) { background: var(--brand-hover); }
.lua-btn--primary:active:not([disabled]) { background: var(--brand-active); }

.lua-btn--secondary { background: var(--surface-card); color: var(--text-strong); border-color: var(--border-default); }
.lua-btn--secondary:hover:not([disabled]) { background: var(--surface-hover); border-color: var(--border-strong); }

.lua-btn--ghost { background: transparent; color: var(--text-body); }
.lua-btn--ghost:hover:not([disabled]) { background: var(--surface-hover); }

.lua-btn--accent { background: var(--accent); color: var(--on-accent); }
.lua-btn--accent:hover:not([disabled]) { background: var(--accent-hover); }

.lua-btn--danger { background: var(--danger-500); color: #fff; }
.lua-btn--danger:hover:not([disabled]) { background: var(--danger-600); }

.lua-btn__spin { width: 1.1em; height: 1.1em; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: lua-spin 0.6s linear infinite; }
@keyframes lua-spin { to { transform: rotate(360deg); } }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Primary action button. Variants: primary | secondary | ghost | accent | danger.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
  fullWidth = false,
  loading = false,
  disabled = false,
  as = 'button',
  ...rest
}) {
  useStyles('lua-btn-styles', CSS);
  const Tag = as;
  const cls = [
    'lua-btn',
    `lua-btn--${variant}`,
    `lua-btn--${size}`,
    fullWidth ? 'lua-btn--full' : '',
  ].filter(Boolean).join(' ');

  return (
    <Tag className={cls} disabled={disabled || loading} {...rest}>
      {loading && <span className="lua-btn__spin" aria-hidden="true" />}
      {!loading && icon && <Icon name={icon} />}
      {children && <span>{children}</span>}
      {!loading && iconEnd && <Icon name={iconEnd} />}
    </Tag>
  );
}
