import React from 'react';

const CSS = `
.lua-amount {
  font-family: var(--font-mono); font-feature-settings: "tnum" 1, "lnum" 1;
  font-weight: var(--weight-medium); color: var(--money-neutral);
  white-space: nowrap; display: inline-flex; align-items: baseline; gap: 0.25em;
}
.lua-amount__cur { font-size: 0.66em; font-weight: var(--weight-medium); color: var(--text-muted); }
.lua-amount--positive { color: var(--money-positive); }
.lua-amount--negative { color: var(--money-negative); }
.lua-amount--accent   { color: var(--accent-hover); }
.lua-amount--xs { font-size: var(--text-sm); }
.lua-amount--sm { font-size: var(--text-base); }
.lua-amount--md { font-size: var(--text-lg); }
.lua-amount--lg { font-size: var(--text-2xl); font-weight: var(--weight-semibold); }
.lua-amount--xl { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--weight-extra); letter-spacing: var(--tracking-tight); }
.lua-amount--xl .lua-amount__cur { font-size: 0.45em; }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

const groupVN = (n) => {
  const neg = n < 0;
  const digits = Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '−' : '') + digits;
};
const compactVN = (n) => {
  const a = Math.abs(n);
  if (a >= 1e9) return (n / 1e9).toFixed(a % 1e9 === 0 ? 0 : 1).replace('.', ',') + ' tỷ';
  if (a >= 1e6) return (n / 1e6).toFixed(a % 1e6 === 0 ? 0 : 1).replace('.', ',') + ' tr';
  if (a >= 1e3) return (n / 1e3).toFixed(0) + 'k';
  return groupVN(n);
};

/**
 * Display a đồng amount with tabular figures, optional sign coloring and ₫ suffix.
 */
export function AmountDisplay({
  value = 0,
  size = 'md',
  tone,            // 'positive' | 'negative' | 'accent' | undefined (auto by sign if signed)
  signed = false,
  compact = false,
  currency = '₫',
  showCurrency = true,
  ...rest
}) {
  useStyles('lua-amount-styles', CSS);
  let resolvedTone = tone;
  if (!resolvedTone && signed) resolvedTone = value < 0 ? 'negative' : 'positive';
  const text = compact ? compactVN(value) : groupVN(value);
  const prefix = signed && value > 0 ? '+' : '';
  return (
    <span className={['lua-amount', `lua-amount--${size}`, resolvedTone ? `lua-amount--${resolvedTone}` : ''].filter(Boolean).join(' ')} {...rest}>
      <span>{prefix}{text}</span>
      {showCurrency && <span className="lua-amount__cur">{currency}</span>}
    </span>
  );
}
