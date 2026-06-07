import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.lua-iconbtn {
  font-family: var(--font-sans);
  display: inline-flex; align-items: center; justify-content: center;
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  background: transparent; color: var(--text-muted);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.lua-iconbtn:hover:not([disabled]) { background: var(--surface-hover); color: var(--text-strong); }
.lua-iconbtn:active:not([disabled]) { transform: scale(0.94); }
.lua-iconbtn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.lua-iconbtn[disabled] { opacity: 0.45; cursor: not-allowed; }
.lua-iconbtn svg { width: 1.25em; height: 1.25em; }

.lua-iconbtn--sm { width: var(--control-sm); height: var(--control-sm); font-size: var(--text-sm); }
.lua-iconbtn--md { width: var(--control-md); height: var(--control-md); font-size: var(--text-md); }
.lua-iconbtn--lg { width: var(--control-lg); height: var(--control-lg); font-size: var(--text-lg); }

.lua-iconbtn--solid { background: var(--brand); color: var(--on-brand); }
.lua-iconbtn--solid:hover:not([disabled]) { background: var(--brand-hover); color: var(--on-brand); }
.lua-iconbtn--outline { border-color: var(--border-default); color: var(--text-body); }
.lua-iconbtn--outline:hover:not([disabled]) { border-color: var(--border-strong); background: var(--surface-hover); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Square icon-only button for toolbars and dense UI. Always pass aria-label.
 */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  'aria-label': ariaLabel,
  ...rest
}) {
  useStyles('lua-iconbtn-styles', CSS);
  const cls = [
    'lua-iconbtn',
    `lua-iconbtn--${size}`,
    variant === 'solid' ? 'lua-iconbtn--solid' : variant === 'outline' ? 'lua-iconbtn--outline' : '',
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} aria-label={ariaLabel} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
