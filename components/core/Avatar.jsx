import React from 'react';

const CSS = `
.lua-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full);
  font-family: var(--font-sans); font-weight: var(--weight-semibold);
  color: var(--on-brand); overflow: hidden; flex-shrink: 0;
  background: var(--green-500); user-select: none;
  border: 2px solid var(--surface-card);
}
.lua-avatar img { width: 100%; height: 100%; object-fit: cover; }
.lua-avatar--xs { width: 24px; height: 24px; font-size: 10px; }
.lua-avatar--sm { width: 32px; height: 32px; font-size: var(--text-xs); }
.lua-avatar--md { width: 40px; height: 40px; font-size: var(--text-sm); }
.lua-avatar--lg { width: 56px; height: 56px; font-size: var(--text-lg); }
`;

function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }
}

// Deterministic warm palette pick from name
const TONES = ['var(--green-500)', 'var(--green-600)', 'var(--gold-600)', 'var(--info-500)', 'var(--green-700)'];
function toneFor(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}
function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * User avatar — image, or auto-colored initials fallback.
 */
export function Avatar({ name = '', src, size = 'md', ...rest }) {
  useStyles('lua-avatar-styles', CSS);
  const cls = `lua-avatar lua-avatar--${size}`;
  return (
    <span className={cls} style={!src ? { background: toneFor(name) } : undefined} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}
