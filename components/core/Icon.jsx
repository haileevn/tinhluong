import React from 'react';

const pascal = (name = '') =>
  name.split(/[-_]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');

/**
 * Lúa icon — renders a Lucide glyph as inline SVG (reconciles cleanly with React,
 * unlike the data-lucide DOM-scan approach). The host page must load the Lucide UMD
 * script (https://unpkg.com/lucide) so `window.lucide.icons` is available.
 *
 * Sizing: inherits `1em` so it scales with surrounding text; component CSS may override.
 */
export function Icon({ name, size, strokeWidth = 2, ...rest }) {
  const lib = (typeof window !== 'undefined' && window.lucide && window.lucide.icons) || null;
  const node = lib ? lib[pascal(name)] : null;
  const dim = size != null ? size : '1em';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {node
        ? node.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))
        : null}
    </svg>
  );
}
