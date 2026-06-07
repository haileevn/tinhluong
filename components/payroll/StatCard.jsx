import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.lua-stat {
  background: var(--surface-card); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: var(--space-5);
  box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: var(--space-3);
}
.lua-stat__top { display: flex; align-items: center; justify-content: space-between; }
.lua-stat__icon { width: 38px; height: 38px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  background: var(--brand-subtle); color: var(--brand); }
.lua-stat__icon svg { width: 20px; height: 20px; }
.lua-stat__icon--accent { background: var(--gold-100); color: var(--gold-700); }
.lua-stat__icon--info { background: var(--info-100); color: var(--info-600); }
.lua-stat__icon--danger { background: var(--danger-100); color: var(--danger-600); }
.lua-stat__label { font-size: var(--text-sm); color: var(--text-muted); font-weight: var(--weight-medium); }
.lua-stat__value { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-bold); color: var(--text-strong); letter-spacing: var(--tracking-tight); line-height: 1.1; }
.lua-stat__delta { display: inline-flex; align-items: center; gap: 3px; font-size: var(--text-xs); font-weight: var(--weight-semibold); }
.lua-stat__delta svg { width: 13px; height: 13px; }
.lua-stat__delta--up { color: var(--success-600); }
.lua-stat__delta--down { color: var(--danger-600); }
.lua-stat__delta--flat { color: var(--text-muted); }
.lua-stat__foot { font-size: var(--text-xs); color: var(--text-subtle); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * KPI card: icon, label, large value, optional trend delta and footnote.
 */
export function StatCard({ icon, iconTone = 'brand', label, value, delta, trend = 'up', footnote, ...rest }) {
  useStyles('lua-stat-styles', CSS);
  const trendIcon = trend === 'down' ? 'arrow-down-right' : trend === 'flat' ? 'minus' : 'arrow-up-right';
  return (
    <div className="lua-stat" {...rest}>
      <div className="lua-stat__top">
        <span className="lua-stat__label">{label}</span>
        {icon && <span className={`lua-stat__icon lua-stat__icon--${iconTone}`}><Icon name={icon} /></span>}
      </div>
      <div className="lua-stat__value">{value}</div>
      {(delta || footnote) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {delta && (
            <span className={`lua-stat__delta lua-stat__delta--${trend}`}>
              <Icon name={trendIcon} />{delta}
            </span>
          )}
          {footnote && <span className="lua-stat__foot">{footnote}</span>}
        </div>
      )}
    </div>
  );
}
