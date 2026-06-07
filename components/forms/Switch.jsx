import React from 'react';

const CSS = `
.lua-switch { display: inline-flex; align-items: center; gap: var(--space-2-5); cursor: pointer; font-family: var(--font-sans); user-select: none; }
.lua-switch[data-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.lua-switch__track {
  width: 42px; height: 24px; border-radius: var(--radius-pill);
  background: var(--neutral-300); position: relative; flex-shrink: 0;
  transition: background var(--dur-base) var(--ease-out);
}
.lua-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 20px; height: 20px;
  background: #fff; border-radius: 50%; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring);
}
.lua-switch[data-on="true"] .lua-switch__track { background: var(--brand); }
.lua-switch[data-on="true"] .lua-switch__thumb { transform: translateX(18px); }
.lua-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.lua-switch input:focus-visible + .lua-switch__track { box-shadow: var(--shadow-focus); }
.lua-switch__label { font-size: var(--text-base); color: var(--text-strong); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Toggle switch for binary settings.
 */
export function Switch({ checked, defaultChecked = false, onChange, disabled = false, label, ...rest }) {
  useStyles('lua-switch-styles', CSS);
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = checked != null ? checked : internal;
  const toggle = (e) => {
    if (disabled) return;
    if (checked == null) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return (
    <label className="lua-switch" data-on={on} data-disabled={disabled}>
      <input type="checkbox" role="switch" checked={on} onChange={toggle} disabled={disabled} {...rest} />
      <span className="lua-switch__track"><span className="lua-switch__thumb" /></span>
      {label && <span className="lua-switch__label">{label}</span>}
    </label>
  );
}
