import React from 'react';

const CSS = `
.lua-money { display: flex; flex-direction: column; gap: var(--space-1-5); font-family: var(--font-sans); }
.lua-money__label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-strong); }
.lua-money__wrap { position: relative; display: flex; align-items: center; }
.lua-money__input {
  width: 100%; box-sizing: border-box; text-align: right;
  font-family: var(--font-mono); font-feature-settings: "tnum" 1;
  font-size: var(--text-lg); font-weight: var(--weight-medium); color: var(--text-strong);
  height: var(--control-lg); padding: 0 44px 0 var(--space-3);
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-inset);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.lua-money__input:focus { outline: none; border-color: var(--brand); box-shadow: var(--shadow-focus); }
.lua-money__input:disabled { background: var(--surface-sunken); color: var(--text-disabled); }
.lua-money__suffix { position: absolute; right: var(--space-3); font-family: var(--font-mono); font-size: var(--text-md); color: var(--text-muted); pointer-events: none; }
.lua-money__hint { font-size: var(--text-xs); color: var(--text-muted); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

const groupVN = (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Currency input for Vietnamese đồng — formats thousands with "." and shows the ₫ suffix.
 */
export function MoneyInput({ label, hint, value, defaultValue, onValueChange, disabled, ...rest }) {
  useStyles('lua-money-styles', CSS);
  const [internal, setInternal] = React.useState(
    groupVN(String(defaultValue ?? value ?? '').replace(/\D/g, ''))
  );
  const display = value != null ? groupVN(String(value).replace(/\D/g, '')) : internal;

  const handle = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    setInternal(groupVN(digits));
    onValueChange && onValueChange(digits ? parseInt(digits, 10) : 0);
  };

  return (
    <div className="lua-money">
      {label && <span className="lua-money__label">{label}</span>}
      <div className="lua-money__wrap">
        <input
          className="lua-money__input"
          inputMode="numeric"
          value={display}
          onChange={handle}
          disabled={disabled}
          placeholder="0"
          {...rest}
        />
        <span className="lua-money__suffix">₫</span>
      </div>
      {hint && <span className="lua-money__hint">{hint}</span>}
    </div>
  );
}
