import React from 'react';

const CSS = `
.lua-meter { font-family: var(--font-sans); display: flex; flex-direction: column; gap: var(--space-2); }
.lua-meter__head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-3); }
.lua-meter__label { font-size: var(--text-sm); color: var(--text-strong); font-weight: var(--weight-medium); }
.lua-meter__val { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-muted); font-feature-settings: "tnum" 1; }
.lua-meter__val b { color: var(--text-strong); font-weight: var(--weight-semibold); }
.lua-meter__track { height: 8px; border-radius: var(--radius-pill); background: var(--neutral-200); box-shadow: var(--shadow-inset); overflow: hidden; }
.lua-meter__fill { height: 100%; border-radius: var(--radius-pill); transition: width var(--dur-slow) var(--ease-out); }
.lua-meter__fill--brand   { background: var(--brand); }
.lua-meter__fill--accent  { background: var(--accent); }
.lua-meter__fill--warning { background: var(--warning-500); }
.lua-meter__fill--danger  { background: var(--danger-500); }
.lua-meter__foot { font-size: var(--text-xs); color: var(--text-subtle); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Labeled progress bar for advance limits / leave usage. Auto-warns as it nears the cap.
 */
export function ProgressMeter({
  label,
  value = 0,
  max = 100,
  tone,              // override; else auto by ratio
  valueText,         // custom right-aligned text
  footnote,
  ...rest
}) {
  useStyles('lua-meter-styles', CSS);
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  let resolved = tone;
  if (!resolved) resolved = ratio >= 0.9 ? 'danger' : ratio >= 0.7 ? 'warning' : 'brand';
  return (
    <div className="lua-meter" {...rest}>
      <div className="lua-meter__head">
        {label && <span className="lua-meter__label">{label}</span>}
        <span className="lua-meter__val">
          {valueText || <><b>{value}</b> / {max}</>}
        </span>
      </div>
      <div className="lua-meter__track">
        <div className={`lua-meter__fill lua-meter__fill--${resolved}`} style={{ width: `${ratio * 100}%` }} />
      </div>
      {footnote && <span className="lua-meter__foot">{footnote}</span>}
    </div>
  );
}
