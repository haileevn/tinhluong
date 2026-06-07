import React from 'react';
import { AmountDisplay } from './AmountDisplay.jsx';

const CSS = `
.lua-pline { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
  padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); font-family: var(--font-sans); }
.lua-pline:last-child { border-bottom: none; }
.lua-pline__main { display: flex; flex-direction: column; gap: 2px; }
.lua-pline__label { font-size: var(--text-base); color: var(--text-body); }
.lua-pline__sub { font-size: var(--text-xs); color: var(--text-subtle); }
.lua-pline--section .lua-pline__label { font-weight: var(--weight-semibold); color: var(--text-strong); }
.lua-pline--total { border-top: 1.5px solid var(--border-strong); border-bottom: none; padding-top: var(--space-4); margin-top: var(--space-1); }
.lua-pline--total .lua-pline__label { font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--text-strong); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * One payslip line item: label (+ optional note) on the left, signed đồng amount on the right.
 */
export function PayslipLine({ label, note, amount, signed = true, variant = 'item', tone, ...rest }) {
  useStyles('lua-pline-styles', CSS);
  const isTotal = variant === 'total';
  return (
    <div className={`lua-pline lua-pline--${variant}`} {...rest}>
      <div className="lua-pline__main">
        <span className="lua-pline__label">{label}</span>
        {note && <span className="lua-pline__sub">{note}</span>}
      </div>
      <AmountDisplay
        value={amount}
        signed={isTotal ? false : signed}
        tone={tone || (isTotal ? 'accent' : undefined)}
        size={isTotal ? 'lg' : 'sm'}
      />
    </div>
  );
}
