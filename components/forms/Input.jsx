import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.lua-field { display: flex; flex-direction: column; gap: var(--space-1-5); font-family: var(--font-sans); }
.lua-field__label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-strong); }
.lua-field__req { color: var(--danger-600); margin-left: 2px; }
.lua-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
.lua-field__err { font-size: var(--text-xs); color: var(--danger-600); display: flex; align-items: center; gap: 4px; }
.lua-field__err svg { width: 13px; height: 13px; }

.lua-input-wrap { position: relative; display: flex; align-items: center; }
.lua-input {
  width: 100%; box-sizing: border-box;
  font-family: var(--font-sans); font-size: var(--text-base); color: var(--text-strong);
  height: var(--control-md); padding: 0 var(--space-3);
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-inset);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.lua-input::placeholder { color: var(--text-disabled); }
.lua-input:hover:not(:disabled) { border-color: var(--border-strong); }
.lua-input:focus { outline: none; border-color: var(--brand); box-shadow: var(--shadow-focus); }
.lua-input:disabled { background: var(--surface-sunken); color: var(--text-disabled); cursor: not-allowed; }
.lua-input--has-icon { padding-left: 38px; }
.lua-input--err { border-color: var(--danger-500); }
.lua-input--err:focus { box-shadow: 0 0 0 3px var(--danger-100); }
.lua-input__icon { position: absolute; left: var(--space-3); color: var(--text-muted); display: flex; pointer-events: none; }
.lua-input__icon svg { width: 18px; height: 18px; }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Text input with label, hint, error, and optional leading icon.
 */
export function Input({
  label,
  hint,
  error,
  icon,
  required = false,
  id,
  ...rest
}) {
  useStyles('lua-input-styles', CSS);
  const fid = id || (label ? `lua-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="lua-field">
      {label && (
        <label className="lua-field__label" htmlFor={fid}>
          {label}{required && <span className="lua-field__req">*</span>}
        </label>
      )}
      <div className="lua-input-wrap">
        {icon && <span className="lua-input__icon"><Icon name={icon} /></span>}
        <input
          id={fid}
          className={[
            'lua-input',
            icon ? 'lua-input--has-icon' : '',
            error ? 'lua-input--err' : '',
          ].filter(Boolean).join(' ')}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
      {error
        ? <span className="lua-field__err"><Icon name="alert-circle" />{error}</span>
        : hint && <span className="lua-field__hint">{hint}</span>}
    </div>
  );
}
