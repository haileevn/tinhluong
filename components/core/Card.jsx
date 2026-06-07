import React from 'react';

const CSS = `
.lua-card {
  background: var(--surface-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
}
.lua-card--flat { box-shadow: none; }
.lua-card--raised { box-shadow: var(--shadow-md); border-color: transparent; }
.lua-card--interactive { cursor: pointer; transition: box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
.lua-card--interactive:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.lua-card--pad-sm { padding: var(--space-4); }
.lua-card--pad-md { padding: var(--space-5); }
.lua-card--pad-lg { padding: var(--space-6); }

.lua-card__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-bottom: var(--space-4); }
.lua-card__title { font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--text-strong); letter-spacing: var(--tracking-tight); margin: 0; }
.lua-card__sub { font-size: var(--text-sm); color: var(--text-muted); margin: 2px 0 0; }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Surface container. Optional title/subtitle header + action slot.
 */
export function Card({
  children,
  title,
  subtitle,
  action,
  elevation = 'resting',
  padding = 'md',
  interactive = false,
  ...rest
}) {
  useStyles('lua-card-styles', CSS);
  const cls = [
    'lua-card',
    elevation === 'flat' ? 'lua-card--flat' : elevation === 'raised' ? 'lua-card--raised' : '',
    `lua-card--pad-${padding}`,
    interactive ? 'lua-card--interactive' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {(title || action) && (
        <div className="lua-card__head">
          <div>
            {title && <h3 className="lua-card__title">{title}</h3>}
            {subtitle && <p className="lua-card__sub">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
