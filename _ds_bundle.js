/* @ds-bundle: {"format":3,"namespace":"LAPayrollDesignSystem_59f88b","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"MoneyInput","sourcePath":"components/forms/MoneyInput.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AmountDisplay","sourcePath":"components/payroll/AmountDisplay.jsx"},{"name":"PayslipLine","sourcePath":"components/payroll/PayslipLine.jsx"},{"name":"ProgressMeter","sourcePath":"components/payroll/ProgressMeter.jsx"},{"name":"StatCard","sourcePath":"components/payroll/StatCard.jsx"},{"name":"StatusPill","sourcePath":"components/payroll/StatusPill.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"2ae5ec9342d5","components/core/Badge.jsx":"3c0af3853330","components/core/Button.jsx":"950eb6757c7e","components/core/Card.jsx":"7f8ba5906808","components/core/Icon.jsx":"5da137a8705f","components/core/IconButton.jsx":"3d35195f432a","components/forms/Input.jsx":"b669c6f421e7","components/forms/MoneyInput.jsx":"9f56149ecc5a","components/forms/Switch.jsx":"3a1861e471f9","components/payroll/AmountDisplay.jsx":"0997c4c3f894","components/payroll/PayslipLine.jsx":"ff9a56c440a2","components/payroll/ProgressMeter.jsx":"224a11b49aec","components/payroll/StatCard.jsx":"42dcceecafe1","components/payroll/StatusPill.jsx":"b5bd8db9ac64","ui_kits/mobile/app.jsx":"3f8dee1105ed","ui_kits/mobile/data.js":"440b71a20810","ui_kits/mobile/screens.jsx":"64ba7399695d","ui_kits/web/app.jsx":"206cf1badf83","ui_kits/web/chrome.jsx":"abe16f87fa88","ui_kits/web/data.js":"9f618fe57aae","ui_kits/web/screens.jsx":"8f2fbfb6b438"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LAPayrollDesignSystem_59f88b = window.LAPayrollDesignSystem_59f88b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

// Deterministic warm palette pick from name
const TONES = ['var(--green-500)', 'var(--green-600)', 'var(--gold-600)', 'var(--info-500)', 'var(--green-700)'];
function toneFor(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = h * 31 + str.charCodeAt(i) >>> 0;
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
function Avatar({
  name = '',
  src,
  size = 'md',
  ...rest
}) {
  useStyles('lua-avatar-styles', CSS);
  const cls = `lua-avatar lua-avatar--${size}`;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: !src ? {
      background: toneFor(name)
    } : undefined
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Surface container. Optional title/subtitle header + action slot.
 */
function Card({
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
  const cls = ['lua-card', elevation === 'flat' ? 'lua-card--flat' : elevation === 'raised' ? 'lua-card--raised' : '', `lua-card--pad-${padding}`, interactive ? 'lua-card--interactive' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (title || action) && /*#__PURE__*/React.createElement("div", {
    className: "lua-card__head"
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", {
    className: "lua-card__title"
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "lua-card__sub"
  }, subtitle)), action), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const pascal = (name = '') => name.split(/[-_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');

/**
 * Lúa icon — renders a Lucide glyph as inline SVG (reconciles cleanly with React,
 * unlike the data-lucide DOM-scan approach). The host page must load the Lucide UMD
 * script (https://unpkg.com/lucide) so `window.lucide.icons` is available.
 *
 * Sizing: inherits `1em` so it scales with surrounding text; component CSS may override.
 */
function Icon({
  name,
  size,
  strokeWidth = 2,
  ...rest
}) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons || null;
  const node = lib ? lib[pascal(name)] : null;
  const dim = size != null ? size : '1em';
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: dim,
    height: dim,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, rest), node ? node.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })) : null);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.lua-badge {
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  font-size: var(--text-xs);
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1) var(--space-2-5);
  border-radius: var(--radius-pill);
  white-space: nowrap;
}
.lua-badge--sm { font-size: var(--text-2xs); padding: 3px var(--space-2); }
.lua-badge svg { width: 0.95em; height: 0.95em; }
.lua-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.lua-badge--neutral { background: var(--neutral-150); color: var(--neutral-700); }
.lua-badge--brand   { background: var(--brand-subtle); color: var(--text-brand); }
.lua-badge--success { background: var(--success-100); color: var(--success-700); }
.lua-badge--warning { background: var(--warning-100); color: var(--warning-700); }
.lua-badge--danger  { background: var(--danger-100); color: var(--danger-700); }
.lua-badge--info    { background: var(--info-100); color: var(--info-700); }
.lua-badge--accent  { background: var(--gold-100); color: var(--gold-800); }

/* solid */
.lua-badge--solid.lua-badge--brand   { background: var(--brand); color: var(--on-brand); }
.lua-badge--solid.lua-badge--success { background: var(--success-600); color: #fff; }
.lua-badge--solid.lua-badge--danger  { background: var(--danger-600); color: #fff; }
.lua-badge--solid.lua-badge--accent  { background: var(--accent); color: var(--on-accent); }
`;
function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Compact label for status, counts, categories.
 */
function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  solid = false,
  dot = false,
  icon,
  ...rest
}) {
  useStyles('lua-badge-styles', CSS);
  const cls = ['lua-badge', `lua-badge--${tone}`, size === 'sm' ? 'lua-badge--sm' : '', solid ? 'lua-badge--solid' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "lua-badge__dot"
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.lua-btn {
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  white-space: nowrap;
  text-decoration: none;
  transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.lua-btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.lua-btn:active { transform: scale(0.98); }
.lua-btn[disabled] { cursor: not-allowed; opacity: 0.5; transform: none; }
.lua-btn svg { width: 1.15em; height: 1.15em; flex-shrink: 0; }

/* sizes */
.lua-btn--sm { height: var(--control-sm); padding: 0 var(--space-3); font-size: var(--text-sm); }
.lua-btn--md { height: var(--control-md); padding: 0 var(--space-4); font-size: var(--text-base); }
.lua-btn--lg { height: var(--control-lg); padding: 0 var(--space-5); font-size: var(--text-md); }
.lua-btn--full { width: 100%; }

/* variants */
.lua-btn--primary { background: var(--brand); color: var(--on-brand); }
.lua-btn--primary:hover:not([disabled]) { background: var(--brand-hover); }
.lua-btn--primary:active:not([disabled]) { background: var(--brand-active); }

.lua-btn--secondary { background: var(--surface-card); color: var(--text-strong); border-color: var(--border-default); }
.lua-btn--secondary:hover:not([disabled]) { background: var(--surface-hover); border-color: var(--border-strong); }

.lua-btn--ghost { background: transparent; color: var(--text-body); }
.lua-btn--ghost:hover:not([disabled]) { background: var(--surface-hover); }

.lua-btn--accent { background: var(--accent); color: var(--on-accent); }
.lua-btn--accent:hover:not([disabled]) { background: var(--accent-hover); }

.lua-btn--danger { background: var(--danger-500); color: #fff; }
.lua-btn--danger:hover:not([disabled]) { background: var(--danger-600); }

.lua-btn__spin { width: 1.1em; height: 1.1em; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: lua-spin 0.6s linear infinite; }
@keyframes lua-spin { to { transform: rotate(360deg); } }
`;
function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Primary action button. Variants: primary | secondary | ghost | accent | danger.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
  fullWidth = false,
  loading = false,
  disabled = false,
  as = 'button',
  ...rest
}) {
  useStyles('lua-btn-styles', CSS);
  const Tag = as;
  const cls = ['lua-btn', `lua-btn--${variant}`, `lua-btn--${size}`, fullWidth ? 'lua-btn--full' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    disabled: disabled || loading
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    className: "lua-btn__spin",
    "aria-hidden": "true"
  }), !loading && icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }), children && /*#__PURE__*/React.createElement("span", null, children), !loading && iconEnd && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.lua-iconbtn {
  font-family: var(--font-sans);
  display: inline-flex; align-items: center; justify-content: center;
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  background: transparent; color: var(--text-muted);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.lua-iconbtn:hover:not([disabled]) { background: var(--surface-hover); color: var(--text-strong); }
.lua-iconbtn:active:not([disabled]) { transform: scale(0.94); }
.lua-iconbtn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.lua-iconbtn[disabled] { opacity: 0.45; cursor: not-allowed; }
.lua-iconbtn svg { width: 1.25em; height: 1.25em; }

.lua-iconbtn--sm { width: var(--control-sm); height: var(--control-sm); font-size: var(--text-sm); }
.lua-iconbtn--md { width: var(--control-md); height: var(--control-md); font-size: var(--text-md); }
.lua-iconbtn--lg { width: var(--control-lg); height: var(--control-lg); font-size: var(--text-lg); }

.lua-iconbtn--solid { background: var(--brand); color: var(--on-brand); }
.lua-iconbtn--solid:hover:not([disabled]) { background: var(--brand-hover); color: var(--on-brand); }
.lua-iconbtn--outline { border-color: var(--border-default); color: var(--text-body); }
.lua-iconbtn--outline:hover:not([disabled]) { border-color: var(--border-strong); background: var(--surface-hover); }
`;
function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Square icon-only button for toolbars and dense UI. Always pass aria-label.
 */
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  'aria-label': ariaLabel,
  ...rest
}) {
  useStyles('lua-iconbtn-styles', CSS);
  const cls = ['lua-iconbtn', `lua-iconbtn--${size}`, variant === 'solid' ? 'lua-iconbtn--solid' : variant === 'outline' ? 'lua-iconbtn--outline' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": ariaLabel
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Text input with label, hint, error, and optional leading icon.
 */
function Input({
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
  return /*#__PURE__*/React.createElement("div", {
    className: "lua-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "lua-field__label",
    htmlFor: fid
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "lua-field__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "lua-input-wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "lua-input__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  })), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: ['lua-input', icon ? 'lua-input--has-icon' : '', error ? 'lua-input--err' : ''].filter(Boolean).join(' '),
    "aria-invalid": !!error
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    className: "lua-field__err"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "alert-circle"
  }), error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "lua-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/MoneyInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}
const groupVN = digits => digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Currency input for Vietnamese đồng — formats thousands with "." and shows the ₫ suffix.
 */
function MoneyInput({
  label,
  hint,
  value,
  defaultValue,
  onValueChange,
  disabled,
  ...rest
}) {
  useStyles('lua-money-styles', CSS);
  const [internal, setInternal] = React.useState(groupVN(String(defaultValue ?? value ?? '').replace(/\D/g, '')));
  const display = value != null ? groupVN(String(value).replace(/\D/g, '')) : internal;
  const handle = e => {
    const digits = e.target.value.replace(/\D/g, '');
    setInternal(groupVN(digits));
    onValueChange && onValueChange(digits ? parseInt(digits, 10) : 0);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "lua-money"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "lua-money__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "lua-money__wrap"
  }, /*#__PURE__*/React.createElement("input", _extends({
    className: "lua-money__input",
    inputMode: "numeric",
    value: display,
    onChange: handle,
    disabled: disabled,
    placeholder: "0"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "lua-money__suffix"
  }, "\u20AB")), hint && /*#__PURE__*/React.createElement("span", {
    className: "lua-money__hint"
  }, hint));
}
Object.assign(__ds_scope, { MoneyInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/MoneyInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Toggle switch for binary settings.
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  ...rest
}) {
  useStyles('lua-switch-styles', CSS);
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = checked != null ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (checked == null) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    className: "lua-switch",
    "data-on": on,
    "data-disabled": disabled
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: on,
    onChange: toggle,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "lua-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lua-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "lua-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/payroll/AmountDisplay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}
const groupVN = n => {
  const neg = n < 0;
  const digits = Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '−' : '') + digits;
};
const compactVN = n => {
  const a = Math.abs(n);
  if (a >= 1e9) return (n / 1e9).toFixed(a % 1e9 === 0 ? 0 : 1).replace('.', ',') + ' tỷ';
  if (a >= 1e6) return (n / 1e6).toFixed(a % 1e6 === 0 ? 0 : 1).replace('.', ',') + ' tr';
  if (a >= 1e3) return (n / 1e3).toFixed(0) + 'k';
  return groupVN(n);
};

/**
 * Display a đồng amount with tabular figures, optional sign coloring and ₫ suffix.
 */
function AmountDisplay({
  value = 0,
  size = 'md',
  tone,
  // 'positive' | 'negative' | 'accent' | undefined (auto by sign if signed)
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
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['lua-amount', `lua-amount--${size}`, resolvedTone ? `lua-amount--${resolvedTone}` : ''].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", null, prefix, text), showCurrency && /*#__PURE__*/React.createElement("span", {
    className: "lua-amount__cur"
  }, currency));
}
Object.assign(__ds_scope, { AmountDisplay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/payroll/AmountDisplay.jsx", error: String((e && e.message) || e) }); }

// components/payroll/PayslipLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * One payslip line item: label (+ optional note) on the left, signed đồng amount on the right.
 */
function PayslipLine({
  label,
  note,
  amount,
  signed = true,
  variant = 'item',
  tone,
  ...rest
}) {
  useStyles('lua-pline-styles', CSS);
  const isTotal = variant === 'total';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `lua-pline lua-pline--${variant}`
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "lua-pline__main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lua-pline__label"
  }, label), note && /*#__PURE__*/React.createElement("span", {
    className: "lua-pline__sub"
  }, note)), /*#__PURE__*/React.createElement(__ds_scope.AmountDisplay, {
    value: amount,
    signed: isTotal ? false : signed,
    tone: tone || (isTotal ? 'accent' : undefined),
    size: isTotal ? 'lg' : 'sm'
  }));
}
Object.assign(__ds_scope, { PayslipLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/payroll/PayslipLine.jsx", error: String((e && e.message) || e) }); }

// components/payroll/ProgressMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * Labeled progress bar for advance limits / leave usage. Auto-warns as it nears the cap.
 */
function ProgressMeter({
  label,
  value = 0,
  max = 100,
  tone,
  // override; else auto by ratio
  valueText,
  // custom right-aligned text
  footnote,
  ...rest
}) {
  useStyles('lua-meter-styles', CSS);
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  let resolved = tone;
  if (!resolved) resolved = ratio >= 0.9 ? 'danger' : ratio >= 0.7 ? 'warning' : 'brand';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "lua-meter"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "lua-meter__head"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "lua-meter__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "lua-meter__val"
  }, valueText || /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, value), " / ", max))), /*#__PURE__*/React.createElement("div", {
    className: "lua-meter__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: `lua-meter__fill lua-meter__fill--${resolved}`,
    style: {
      width: `${ratio * 100}%`
    }
  })), footnote && /*#__PURE__*/React.createElement("span", {
    className: "lua-meter__foot"
  }, footnote));
}
Object.assign(__ds_scope, { ProgressMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/payroll/ProgressMeter.jsx", error: String((e && e.message) || e) }); }

// components/payroll/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

/**
 * KPI card: icon, label, large value, optional trend delta and footnote.
 */
function StatCard({
  icon,
  iconTone = 'brand',
  label,
  value,
  delta,
  trend = 'up',
  footnote,
  ...rest
}) {
  useStyles('lua-stat-styles', CSS);
  const trendIcon = trend === 'down' ? 'arrow-down-right' : trend === 'flat' ? 'minus' : 'arrow-up-right';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "lua-stat"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "lua-stat__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lua-stat__label"
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    className: `lua-stat__icon lua-stat__icon--${iconTone}`
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }))), /*#__PURE__*/React.createElement("div", {
    className: "lua-stat__value"
  }, value), (delta || footnote) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)'
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    className: `lua-stat__delta lua-stat__delta--${trend}`
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: trendIcon
  }), delta), footnote && /*#__PURE__*/React.createElement("span", {
    className: "lua-stat__foot"
  }, footnote)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/payroll/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/payroll/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.lua-status {
  display: inline-flex; align-items: center; gap: var(--space-1-5);
  font-family: var(--font-sans); font-weight: var(--weight-semibold);
  font-size: var(--text-xs); line-height: 1;
  padding: var(--space-1) var(--space-2-5) var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
}
.lua-status__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.lua-status svg { width: 13px; height: 13px; }
.lua-status--paid     { background: var(--success-100); color: var(--success-700); }
.lua-status--pending  { background: var(--warning-100); color: var(--warning-700); }
.lua-status--overdue  { background: var(--danger-100);  color: var(--danger-700); }
.lua-status--approved { background: var(--info-100);    color: var(--info-700); }
.lua-status--draft    { background: var(--neutral-150);  color: var(--neutral-600); }
.lua-status--processing { background: var(--brand-subtle); color: var(--text-brand); }
`;
function useStyles(id, css) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }
}
const MAP = {
  paid: {
    label: 'Đã trả',
    icon: 'check-circle-2'
  },
  pending: {
    label: 'Chờ duyệt',
    icon: 'clock'
  },
  overdue: {
    label: 'Quá hạn',
    icon: 'alert-triangle'
  },
  approved: {
    label: 'Đã duyệt',
    icon: 'badge-check'
  },
  draft: {
    label: 'Nháp',
    icon: null
  },
  processing: {
    label: 'Đang xử lý',
    icon: 'loader'
  }
};

/**
 * Payroll-lifecycle status pill with the canonical Vietnamese label + icon.
 */
function StatusPill({
  status = 'draft',
  label,
  dot = false,
  ...rest
}) {
  useStyles('lua-status-styles', CSS);
  const cfg = MAP[status] || MAP.draft;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `lua-status lua-status--${status}`
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "lua-status__dot"
  }) : cfg.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: cfg.icon
  }), label || cfg.label);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/payroll/StatusPill.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/app.jsx
try { (() => {
/* Lúa mobile kit — phone shell + tab bar + mount. */
(function () {
  const {
    HomeScreen,
    PayslipScreen,
    AdvanceScreen,
    LeaveScreen
  } = window.LuaMobile;
  const {
    Icon
  } = window.LAPayrollDesignSystem_59f88b;
  const CSS = `
  .lm-stage { min-height: 100vh; display: grid; place-items: center; background: var(--neutral-150);
    background-image: radial-gradient(circle at 1px 1px, var(--neutral-200) 1px, transparent 0); background-size: 22px 22px; padding: var(--space-6); }
  .lm-phone { width: 390px; height: 844px; background: var(--surface-page); border-radius: 44px; box-shadow: var(--shadow-xl), 0 0 0 11px var(--neutral-900), 0 0 0 13px var(--neutral-700);
    overflow: hidden; position: relative; display: flex; flex-direction: column; }
  .lm-status { height: 50px; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 28px 8px; font-size: 14px; font-weight: 600; color: var(--text-strong); flex-shrink: 0; }
  .lm-status__r { display: flex; gap: 6px; align-items: center; }
  .lm-status__r svg { width: 17px; height: 17px; }
  .lm-notch { position: absolute; top: 11px; left: 50%; transform: translateX(-50%); width: 122px; height: 30px; background: var(--neutral-900); border-radius: 16px; z-index: 5; }
  .lm-body { flex: 1; overflow-y: auto; overflow-x: hidden; }
  .lm-body::-webkit-scrollbar { width: 0; }
  .lm-tabs { flex-shrink: 0; display: grid; grid-template-columns: repeat(4, 1fr); background: color-mix(in srgb, var(--surface-card) 92%, transparent); backdrop-filter: blur(12px);
    border-top: 1px solid var(--border-subtle); padding: var(--space-2) var(--space-2) calc(var(--space-2) + 18px); }
  .lm-tab { display: flex; flex-direction: column; align-items: center; gap: 3px; border: none; background: none; cursor: pointer; color: var(--text-subtle); padding: var(--space-1); }
  .lm-tab svg { width: 23px; height: 23px; }
  .lm-tab[data-on="true"] { color: var(--brand); }
  .lm-tab__l { font-size: 10px; font-weight: 600; }
  `;
  if (!document.getElementById('lm-shell-styles')) {
    const s = document.createElement('style');
    s.id = 'lm-shell-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const TABS = [{
    key: 'home',
    label: 'Trang chủ',
    icon: 'house'
  }, {
    key: 'payslip',
    label: 'Phiếu lương',
    icon: 'receipt'
  }, {
    key: 'advance',
    label: 'Ứng lương',
    icon: 'hand-coins'
  }, {
    key: 'leave',
    label: 'Nghỉ phép',
    icon: 'calendar-days'
  }];
  function App() {
    const [tab, setTab] = React.useState('home');
    const bodyRef = React.useRef(null);
    const go = t => {
      setTab(t);
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    };
    let screen;
    if (tab === 'home') screen = /*#__PURE__*/React.createElement(HomeScreen, {
      go: go
    });else if (tab === 'payslip') screen = /*#__PURE__*/React.createElement(PayslipScreen, null);else if (tab === 'advance') screen = /*#__PURE__*/React.createElement(AdvanceScreen, null);else screen = /*#__PURE__*/React.createElement(LeaveScreen, null);
    return /*#__PURE__*/React.createElement("div", {
      className: "lm-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-phone"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-notch"
    }), /*#__PURE__*/React.createElement("div", {
      className: "lm-status"
    }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
      className: "lm-status__r"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "signal"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "battery-full"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "lm-body",
      ref: bodyRef,
      key: tab
    }, screen), /*#__PURE__*/React.createElement("nav", {
      className: "lm-tabs"
    }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.key,
      className: "lm-tab",
      "data-on": tab === t.key,
      onClick: () => go(t.key)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon
    }), /*#__PURE__*/React.createElement("span", {
      className: "lm-tab__l"
    }, t.label))))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/data.js
try { (() => {
// Mock data for the Lúa employee mobile app
window.LUA_M = {
  me: {
    name: 'Nguyễn Văn An',
    id: 'NV-0142',
    dept: 'Kinh doanh',
    joined: '03/2022'
  },
  period: 'Tháng 6/2026',
  accrued: 15300000,
  // accrued so far this month
  estimatedNet: 18610000,
  // estimated net pay
  payDate: '05/07/2026',
  advance: {
    used: 3000000,
    limit: 9000000
  },
  leave: {
    used: 5,
    total: 12
  },
  payslip: {
    period: 'Tháng 5/2026',
    net: 18610000,
    lines: [{
      label: 'Lương cơ bản',
      amount: 18000000
    }, {
      label: 'Phụ cấp ăn trưa',
      amount: 730000
    }, {
      label: 'Phụ cấp đi lại',
      amount: 1770000
    }, {
      label: 'Thưởng doanh số',
      amount: 3000000
    }, {
      label: 'BHXH, BHYT, BHTN',
      note: '10,5% lương cơ bản',
      amount: -1890000
    }, {
      label: 'Thuế TNCN',
      amount: -0
    }, {
      label: 'Tạm ứng kỳ trước',
      amount: -3000000
    }]
  },
  history: [{
    period: 'Tháng 5/2026',
    net: 18610000,
    status: 'paid'
  }, {
    period: 'Tháng 4/2026',
    net: 17240000,
    status: 'paid'
  }, {
    period: 'Tháng 3/2026',
    net: 19050000,
    status: 'paid'
  }, {
    period: 'Tháng 2/2026',
    net: 16800000,
    status: 'paid'
  }],
  leaveRequests: [{
    range: '12–13/06/2026',
    days: 2,
    type: 'Phép năm',
    status: 'approved'
  }, {
    range: '02/05/2026',
    days: 1,
    type: 'Nghỉ ốm',
    status: 'paid'
  }, {
    range: '20/06/2026',
    days: 1,
    type: 'Phép năm',
    status: 'pending'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/data.js", error: String((e && e.message) || e) }); }

// ui_kits/mobile/screens.jsx
try { (() => {
/* Lúa mobile kit — employee screens. */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const {
    Card,
    Button,
    Badge,
    Avatar,
    Icon,
    AmountDisplay,
    StatusPill,
    ProgressMeter,
    PayslipLine,
    MoneyInput,
    Input
  } = DS;
  const D = () => window.LUA_M;
  const CSS = `
  .lm-screen { padding: var(--space-4) var(--space-4) var(--space-8); display: flex; flex-direction: column; gap: var(--space-4); }
  .lm-head { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-1) 0 var(--space-2); }
  .lm-head__hi { font-size: var(--text-xs); color: var(--text-muted); }
  .lm-head__name { font-family: var(--font-display); font-weight: 700; font-size: var(--text-lg); color: var(--text-strong); line-height: 1.1; }
  .lm-head__bell { margin-left: auto; }

  .lm-hero { background: linear-gradient(140deg, var(--gold-500), var(--gold-600) 55%, var(--gold-700)); color: var(--green-950);
    border-radius: var(--radius-xl); padding: var(--space-5); position: relative; overflow: hidden; box-shadow: var(--shadow-md); }
  .lm-hero__eyebrow { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; font-weight: 700; opacity: 0.7; }
  .lm-hero__amt { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; letter-spacing: -0.02em; margin: var(--space-1) 0; }
  .lm-hero__sub { font-size: var(--text-sm); font-weight: 500; opacity: 0.85; }
  .lm-hero__foot { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-4); font-size: var(--text-xs); font-weight: 600; background: rgba(255,255,255,0.25); border-radius: var(--radius-pill); padding: var(--space-1-5) var(--space-3); width: fit-content; }
  .lm-hero__foot svg { width: 14px; height: 14px; }
  .lm-hero__grain { position: absolute; right: -16px; top: -16px; opacity: 0.16; }
  .lm-hero__grain img { width: 120px; height: 120px; }

  .lm-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
  .lm-action { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-4) var(--space-2); background: var(--surface-card);
    border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); cursor: pointer; transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
  .lm-action:active { transform: scale(0.97); }
  .lm-action__ic { width: 44px; height: 44px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--brand-subtle); color: var(--brand); }
  .lm-action__ic svg { width: 22px; height: 22px; }
  .lm-action__l { font-size: var(--text-xs); font-weight: 600; color: var(--text-strong); text-align: center; }

  .lm-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
  .lm-row:last-child { border-bottom: none; }
  .lm-row__t { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }
  .lm-row__d { font-size: var(--text-xs); color: var(--text-muted); }

  .lm-chips { display: flex; gap: var(--space-2); flex-wrap: wrap; }
  .lm-chip { font-family: var(--font-sans); font-size: var(--text-sm); font-weight: 600; padding: var(--space-2) var(--space-3); border-radius: var(--radius-pill);
    border: 1.5px solid var(--border-default); background: var(--surface-card); color: var(--text-body); cursor: pointer; }
  .lm-chip[data-on="true"] { border-color: var(--brand); background: var(--brand-subtle); color: var(--text-brand); }

  .lm-success { text-align: center; padding: var(--space-10) var(--space-5); display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
  .lm-success__ic { width: 72px; height: 72px; border-radius: 50%; background: var(--success-100); color: var(--success-600); display: flex; align-items: center; justify-content: center; }
  .lm-success__ic svg { width: 38px; height: 38px; }
  .lm-success__t { font-family: var(--font-display); font-weight: 700; font-size: var(--text-xl); color: var(--text-strong); }
  .lm-success__d { font-size: var(--text-sm); color: var(--text-muted); max-width: 260px; }

  .lm-ring { display: flex; align-items: center; gap: var(--space-4); }
  .lm-ring__circle { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; }
  .lm-ring__inner { width: 64px; height: 64px; border-radius: 50%; background: var(--surface-card); display: grid; place-items: center; }
  .lm-ring__num { font-family: var(--font-display); font-weight: 800; font-size: var(--text-xl); color: var(--text-strong); line-height: 1; }
  .lm-ring__lbl { font-size: 10px; color: var(--text-muted); }
  .lm-sectitle { font-size: var(--text-sm); font-weight: 700; color: var(--text-strong); font-family: var(--font-display); margin: var(--space-2) 0 0; }
  `;
  if (!document.getElementById('lm-styles')) {
    const s = document.createElement('style');
    s.id = 'lm-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const trVN = n => (n / 1e6).toFixed(1).replace('.', ',');
  function Header() {
    const d = D();
    return /*#__PURE__*/React.createElement("div", {
      className: "lm-head"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: d.me.name,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lm-head__hi"
    }, "Ch\xE0o b\u1EA1n,"), /*#__PURE__*/React.createElement("div", {
      className: "lm-head__name"
    }, d.me.name.split(' ').slice(-1)[0] ? d.me.name : d.me.name, " \uD83C\uDF3E")), /*#__PURE__*/React.createElement("span", {
      className: "lm-head__bell"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      icon: "bell",
      "aria-label": "Th\xF4ng b\xE1o"
    })));
  }
  function HomeScreen({
    go
  }) {
    const d = D();
    return /*#__PURE__*/React.createElement("div", {
      className: "lm-screen"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
      className: "lm-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-hero__eyebrow"
    }, "L\u01B0\u01A1ng t\u1EA1m t\xEDnh \xB7 ", d.period), /*#__PURE__*/React.createElement("div", {
      className: "lm-hero__amt"
    }, d.accrued.toLocaleString('vi-VN'), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.4em',
        fontWeight: 600,
        marginLeft: 6
      }
    }, "\u20AB")), /*#__PURE__*/React.createElement("div", {
      className: "lm-hero__sub"
    }, "D\u1EF1 ki\u1EBFn th\u1EF1c nh\u1EADn ", trVN(d.estimatedNet), " tr \u20AB"), /*#__PURE__*/React.createElement("div", {
      className: "lm-hero__foot"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-check"
    }), "Tr\u1EA3 l\u01B0\u01A1ng ", d.payDate), /*#__PURE__*/React.createElement("div", {
      className: "lm-hero__grain"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/lua-mark.svg",
      alt: ""
    }))), /*#__PURE__*/React.createElement("div", {
      className: "lm-actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-action",
      onClick: () => go('advance')
    }, /*#__PURE__*/React.createElement("span", {
      className: "lm-action__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "hand-coins"
    })), /*#__PURE__*/React.createElement("span", {
      className: "lm-action__l"
    }, "\u1EE8ng l\u01B0\u01A1ng")), /*#__PURE__*/React.createElement("div", {
      className: "lm-action",
      onClick: () => go('leave')
    }, /*#__PURE__*/React.createElement("span", {
      className: "lm-action__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-days"
    })), /*#__PURE__*/React.createElement("span", {
      className: "lm-action__l"
    }, "Ngh\u1EC9 ph\xE9p")), /*#__PURE__*/React.createElement("div", {
      className: "lm-action",
      onClick: () => go('payslip')
    }, /*#__PURE__*/React.createElement("span", {
      className: "lm-action__ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt"
    })), /*#__PURE__*/React.createElement("span", {
      className: "lm-action__l"
    }, "Phi\u1EBFu l\u01B0\u01A1ng"))), /*#__PURE__*/React.createElement(Card, {
      title: "H\u1EA1n m\u1EE9c \u1EE9ng l\u01B0\u01A1ng",
      subtitle: "C\xF2n l\u1EA1i trong th\xE1ng n\xE0y"
    }, /*#__PURE__*/React.createElement(ProgressMeter, {
      value: d.advance.used,
      max: d.advance.limit,
      valueText: /*#__PURE__*/React.createElement(AmountDisplay, {
        value: d.advance.limit - d.advance.used,
        size: "xs",
        tone: "accent"
      })
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      fullWidth: true,
      icon: "hand-coins",
      onClick: () => go('advance')
    }, "\u1EE8ng l\u01B0\u01A1ng ngay"))), /*#__PURE__*/React.createElement(Card, {
      title: "Ph\xE9p n\u0103m",
      subtitle: `Đã dùng ${d.leave.used}/${d.leave.total} ngày`
    }, /*#__PURE__*/React.createElement(ProgressMeter, {
      value: d.leave.used,
      max: d.leave.total,
      tone: "brand",
      valueText: `Còn ${d.leave.total - d.leave.used} ngày`
    })));
  }
  function PayslipScreen() {
    const d = D();
    const p = d.payslip;
    return /*#__PURE__*/React.createElement("div", {
      className: "lm-screen"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "lm-sectitle",
      style: {
        fontSize: 'var(--text-xl)'
      }
    }, "Phi\u1EBFu l\u01B0\u01A1ng"), /*#__PURE__*/React.createElement(Card, {
      title: `Phiếu lương · ${p.period}`,
      subtitle: `${d.me.name} · ${d.me.id}`,
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        icon: "download",
        "aria-label": "T\u1EA3i"
      })
    }, p.lines.filter(l => l.amount !== 0).map((l, i) => /*#__PURE__*/React.createElement(PayslipLine, {
      key: i,
      label: l.label,
      note: l.note,
      amount: l.amount
    })), /*#__PURE__*/React.createElement(PayslipLine, {
      label: "L\u01B0\u01A1ng th\u1EF1c nh\u1EADn",
      amount: p.net,
      variant: "total"
    })), /*#__PURE__*/React.createElement("h3", {
      className: "lm-sectitle"
    }, "L\u1ECBch s\u1EED"), /*#__PURE__*/React.createElement(Card, {
      padding: "sm"
    }, d.history.map((h, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "lm-row"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sunken)',
        color: 'var(--text-muted)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-row__t"
    }, h.period), /*#__PURE__*/React.createElement("div", {
      className: "lm-row__d"
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: h.status,
      dot: true
    }))), /*#__PURE__*/React.createElement(AmountDisplay, {
      value: h.net,
      size: "sm"
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      style: {
        color: 'var(--text-subtle)'
      }
    })))));
  }
  function AdvanceScreen() {
    const d = D();
    const remaining = d.advance.limit - d.advance.used;
    const [amount, setAmount] = React.useState(2000000);
    const [reason, setReason] = React.useState('');
    const [done, setDone] = React.useState(false);
    const over = amount > remaining;
    if (done) {
      return /*#__PURE__*/React.createElement("div", {
        className: "lm-screen"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lm-success"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lm-success__ic"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check"
      })), /*#__PURE__*/React.createElement("div", {
        className: "lm-success__t"
      }, "\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u! \uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
        className: "lm-success__d"
      }, "Y\xEAu c\u1EA7u \u1EE9ng ", /*#__PURE__*/React.createElement("b", null, amount.toLocaleString('vi-VN'), " \u20AB"), " \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi \u0111\u1EBFn ph\xF2ng nh\xE2n s\u1EF1. B\u1EA1n s\u1EBD nh\u1EADn th\xF4ng b\xE1o khi \u0111\u01B0\u1EE3c duy\u1EC7t."), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: () => {
          setDone(false);
          setAmount(2000000);
          setReason('');
        }
      }, "T\u1EA1o y\xEAu c\u1EA7u kh\xE1c")));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "lm-screen"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "lm-sectitle",
      style: {
        fontSize: 'var(--text-xl)'
      }
    }, "\u1EE8ng l\u01B0\u01A1ng"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(MoneyInput, {
      label: "S\u1ED1 ti\u1EC1n mu\u1ED1n \u1EE9ng",
      value: amount,
      onValueChange: setAmount,
      hint: over ? undefined : `Có thể ứng tối đa ${remaining.toLocaleString('vi-VN')} ₫`
    }), over && /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--danger-600)',
        fontSize: 'var(--text-xs)',
        marginTop: 6,
        display: 'flex',
        gap: 4,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert-circle",
      size: 14
    }), "V\u01B0\u1EE3t h\u1EA1n m\u1EE9c. T\u1ED1i \u0111a ", remaining.toLocaleString('vi-VN'), " \u20AB."), /*#__PURE__*/React.createElement("div", {
      className: "lm-chips",
      style: {
        marginTop: 'var(--space-3)'
      }
    }, [1000000, 2000000, 3000000, 5000000].map(v => /*#__PURE__*/React.createElement("button", {
      key: v,
      className: "lm-chip",
      "data-on": amount === v,
      onClick: () => setAmount(v)
    }, trVN(v), " tr"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(ProgressMeter, {
      label: "H\u1EA1n m\u1EE9c th\xE1ng n\xE0y",
      value: Math.min(amount + d.advance.used, d.advance.limit),
      max: d.advance.limit,
      valueText: `${trVN(Math.min(amount + d.advance.used, d.advance.limit))} / ${trVN(d.advance.limit)} tr`
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Input, {
      label: "L\xFD do",
      placeholder: "V\xED d\u1EE5: Vi\u1EC7c gia \u0111\xECnh",
      value: reason,
      onChange: e => setReason(e.target.value)
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      disabled: over || !amount,
      icon: "send",
      onClick: () => setDone(true)
    }, "G\u1EEDi y\xEAu c\u1EA7u"));
  }
  function LeaveScreen() {
    const d = D();
    const pct = d.leave.used / d.leave.total;
    return /*#__PURE__*/React.createElement("div", {
      className: "lm-screen"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "lm-sectitle",
      style: {
        fontSize: 'var(--text-xl)'
      }
    }, "Ngh\u1EC9 ph\xE9p"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      className: "lm-ring"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-ring__circle",
      style: {
        background: `conic-gradient(var(--brand) ${pct * 360}deg, var(--neutral-200) 0)`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-ring__inner"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-ring__num"
    }, d.leave.total - d.leave.used), /*#__PURE__*/React.createElement("div", {
      className: "lm-ring__lbl"
    }, "ng\xE0y c\xF2n l\u1EA1i")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-lg)',
        color: 'var(--text-strong)'
      }
    }, "Ph\xE9p n\u0103m 2026"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)'
      }
    }, "\u0110\xE3 d\xF9ng ", d.leave.used, " / ", d.leave.total, " ng\xE0y"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true,
      icon: "plus"
    }, "T\u1EA1o y\xEAu c\u1EA7u ngh\u1EC9"))), /*#__PURE__*/React.createElement("h3", {
      className: "lm-sectitle"
    }, "Y\xEAu c\u1EA7u g\u1EA7n \u0111\xE2y"), /*#__PURE__*/React.createElement(Card, {
      padding: "sm"
    }, d.leaveRequests.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "lm-row"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        background: 'var(--brand-subtle)',
        color: 'var(--brand)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-days"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lm-row__t"
    }, r.range), /*#__PURE__*/React.createElement("div", {
      className: "lm-row__d"
    }, r.type, " \xB7 ", r.days, " ng\xE0y")), /*#__PURE__*/React.createElement(StatusPill, {
      status: r.status === 'paid' ? 'paid' : r.status,
      label: r.status === 'paid' ? 'Hoàn tất' : undefined
    })))));
  }
  window.LuaMobile = {
    HomeScreen,
    PayslipScreen,
    AdvanceScreen,
    LeaveScreen
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/app.jsx
try { (() => {
/* Lúa web kit — app shell + router. */
(function () {
  const {
    Sidebar,
    Topbar,
    DashboardScreen,
    PayrollScreen,
    AdvancesScreen,
    PlaceholderScreen
  } = window.LuaWeb;
  const {
    Button
  } = window.LAPayrollDesignSystem_59f88b;
  const TITLES = {
    dashboard: {
      t: 'Tổng quan',
      s: 'Chào buổi sáng, Hà 🌾'
    },
    payroll: {
      t: 'Bảng lương',
      s: 'Kỳ lương Tháng 6/2026'
    },
    advances: {
      t: 'Ứng lương',
      s: 'Duyệt yêu cầu tạm ứng'
    },
    employees: {
      t: 'Nhân viên',
      s: '32 nhân viên đang làm việc'
    },
    leave: {
      t: 'Nghỉ phép',
      s: 'Quản lý ngày phép & yêu cầu'
    }
  };
  function App() {
    const [screen, setScreen] = React.useState('dashboard');
    const meta = TITLES[screen];
    let body,
      actions = null;
    if (screen === 'dashboard') body = /*#__PURE__*/React.createElement(DashboardScreen, null);else if (screen === 'payroll') {
      body = /*#__PURE__*/React.createElement(PayrollScreen, null);
    } else if (screen === 'advances') body = /*#__PURE__*/React.createElement(AdvancesScreen, null);else if (screen === 'employees') body = /*#__PURE__*/React.createElement(PlaceholderScreen, {
      title: "Danh s\xE1ch nh\xE2n vi\xEAn",
      icon: "users"
    });else body = /*#__PURE__*/React.createElement(PlaceholderScreen, {
      title: "Qu\u1EA3n l\xFD ngh\u1EC9 ph\xE9p",
      icon: "calendar-days"
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "lw-shell"
    }, /*#__PURE__*/React.createElement(Sidebar, {
      active: screen,
      onNavigate: setScreen
    }), /*#__PURE__*/React.createElement("div", {
      className: "lw-main"
    }, /*#__PURE__*/React.createElement(Topbar, {
      title: meta.t,
      subtitle: meta.s,
      actions: actions
    }), /*#__PURE__*/React.createElement("div", {
      className: "lw-scroll"
    }, body)));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/chrome.jsx
try { (() => {
/* Lúa web kit — app chrome (sidebar + topbar). Reads DS comps from the bundle namespace. */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const {
    Icon,
    Avatar,
    IconButton,
    Badge
  } = DS;
  const CSS = `
  .lw-shell { display: grid; grid-template-columns: var(--sidebar-w) 1fr; height: 100%; min-width: 0; background: var(--surface-page); }
  .lw-side { background: var(--surface-card); border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; padding: var(--space-5) var(--space-3); }
  .lw-brand { display: flex; align-items: center; gap: var(--space-2-5); padding: var(--space-1) var(--space-2) var(--space-5); }
  .lw-brand img { width: 34px; height: 34px; }
  .lw-brand b { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; color: var(--text-strong); letter-spacing: -0.02em; }
  .lw-brand b span { color: var(--accent); }
  .lw-navlabel { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--text-subtle); font-weight: 600; padding: var(--space-3) var(--space-2) var(--space-1); }
  .lw-nav { display: flex; flex-direction: column; gap: 2px; }
  .lw-navitem { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2-5) var(--space-3); border-radius: var(--radius-md);
    font-size: var(--text-base); font-weight: 500; color: var(--text-muted); cursor: pointer; border: none; background: none; width: 100%; text-align: left;
    transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
  .lw-navitem svg { width: 19px; height: 19px; }
  .lw-navitem:hover { background: var(--surface-hover); color: var(--text-strong); }
  .lw-navitem[data-active="true"] { background: var(--brand-subtle); color: var(--text-brand); font-weight: 600; }
  .lw-navitem .lw-count { margin-left: auto; }
  .lw-side__foot { margin-top: auto; }
  .lw-user { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2-5); border-radius: var(--radius-md); cursor: pointer; }
  .lw-user:hover { background: var(--surface-hover); }
  .lw-user__name { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }
  .lw-user__role { font-size: var(--text-xs); color: var(--text-muted); }

  .lw-main { display: flex; flex-direction: column; min-width: 0; }
  .lw-top { height: var(--topbar-h); border-bottom: 1px solid var(--border-subtle); background: color-mix(in srgb, var(--surface-card) 88%, transparent);
    backdrop-filter: blur(8px); display: flex; align-items: center; gap: var(--space-4); padding: 0 var(--page-pad); position: sticky; top: 0; z-index: var(--z-sticky); }
  .lw-top__title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--text-strong); letter-spacing: -0.01em; }
  .lw-top__sub { font-size: var(--text-xs); color: var(--text-muted); }
  .lw-search { margin-left: auto; display: flex; align-items: center; gap: var(--space-2); background: var(--surface-sunken); border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md); padding: 0 var(--space-3); height: 38px; width: 240px; color: var(--text-muted); }
  .lw-search svg { width: 16px; height: 16px; }
  .lw-search input { border: none; background: none; outline: none; font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-body); width: 100%; }
  .lw-scroll { flex: 1; overflow: auto; padding: var(--page-pad); }
  `;
  if (!document.getElementById('lw-chrome-styles')) {
    const s = document.createElement('style');
    s.id = 'lw-chrome-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const NAV = [{
    key: 'dashboard',
    label: 'Tổng quan',
    icon: 'layout-dashboard'
  }, {
    key: 'payroll',
    label: 'Bảng lương',
    icon: 'file-text'
  }, {
    key: 'advances',
    label: 'Ứng lương',
    icon: 'hand-coins',
    count: 4
  }, {
    key: 'employees',
    label: 'Nhân viên',
    icon: 'users'
  }, {
    key: 'leave',
    label: 'Nghỉ phép',
    icon: 'calendar-days'
  }];
  function Sidebar({
    active,
    onNavigate
  }) {
    const D = window.LUA_DATA;
    return /*#__PURE__*/React.createElement("aside", {
      className: "lw-side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/lua-mark.svg",
      alt: ""
    }), /*#__PURE__*/React.createElement("b", null, "L\xFAa", /*#__PURE__*/React.createElement("span", null, "."))), /*#__PURE__*/React.createElement("div", {
      className: "lw-navlabel"
    }, "Qu\u1EA3n l\xFD"), /*#__PURE__*/React.createElement("nav", {
      className: "lw-nav"
    }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.key,
      className: "lw-navitem",
      "data-active": active === n.key,
      onClick: () => onNavigate(n.key)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon
    }), /*#__PURE__*/React.createElement("span", null, n.label), n.count ? /*#__PURE__*/React.createElement(Badge, {
      tone: "danger",
      size: "sm",
      solid: true,
      className: "lw-count"
    }, n.count) : null))), /*#__PURE__*/React.createElement("div", {
      className: "lw-navlabel"
    }, "H\u1EC7 th\u1ED1ng"), /*#__PURE__*/React.createElement("nav", {
      className: "lw-nav"
    }, /*#__PURE__*/React.createElement("button", {
      className: "lw-navitem"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings"
    }), /*#__PURE__*/React.createElement("span", null, "C\xE0i \u0111\u1EB7t")), /*#__PURE__*/React.createElement("button", {
      className: "lw-navitem"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "life-buoy"
    }), /*#__PURE__*/React.createElement("span", null, "Tr\u1EE3 gi\xFAp"))), /*#__PURE__*/React.createElement("div", {
      className: "lw-side__foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-user"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: D.user.name,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-user__name"
    }, D.user.name), /*#__PURE__*/React.createElement("div", {
      className: "lw-user__role"
    }, D.user.role)))));
  }
  function Topbar({
    title,
    subtitle,
    actions
  }) {
    return /*#__PURE__*/React.createElement("header", {
      className: "lw-top"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-top__title"
    }, title), subtitle && /*#__PURE__*/React.createElement("div", {
      className: "lw-top__sub"
    }, subtitle)), /*#__PURE__*/React.createElement("div", {
      className: "lw-search"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: "T\xECm nh\xE2n vi\xEAn, phi\u1EBFu l\u01B0\u01A1ng\u2026"
    })), actions, /*#__PURE__*/React.createElement(IconButton, {
      icon: "bell",
      "aria-label": "Th\xF4ng b\xE1o",
      variant: "ghost"
    }));
  }
  window.LuaWeb = Object.assign(window.LuaWeb || {}, {
    Sidebar,
    Topbar,
    NAV
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/data.js
try { (() => {
// Mock data for the Lúa HR/Admin web app kit
window.LUA_DATA = {
  period: 'Tháng 6/2026',
  company: 'Công ty TNHH Mây Tre Việt',
  user: {
    name: 'Phạm Thu Hà',
    role: 'Quản lý nhân sự'
  },
  stats: {
    payrollTotal: 742500000,
    headcount: 32,
    advancePending: 4,
    leaveThisMonth: 18
  },
  payrun: {
    progress: 26,
    total: 32,
    // employees confirmed
    payDate: '05/07/2026'
  },
  employees: [{
    id: 'NV-0142',
    name: 'Nguyễn Văn An',
    dept: 'Kinh doanh',
    base: 18000000,
    allow: 2500000,
    deduct: 1890000,
    status: 'approved'
  }, {
    id: 'NV-0098',
    name: 'Trần Thị Bích',
    dept: 'Kế toán',
    base: 16500000,
    allow: 1800000,
    deduct: 1732500,
    status: 'paid'
  }, {
    id: 'NV-0211',
    name: 'Lê Minh Quân',
    dept: 'Kỹ thuật',
    base: 22000000,
    allow: 3000000,
    deduct: 2310000,
    status: 'pending'
  }, {
    id: 'NV-0177',
    name: 'Phạm Thu Hà',
    dept: 'Nhân sự',
    base: 20000000,
    allow: 2200000,
    deduct: 2100000,
    status: 'approved'
  }, {
    id: 'NV-0305',
    name: 'Hoàng Đức Thành',
    dept: 'Kho vận',
    base: 12000000,
    allow: 1500000,
    deduct: 1260000,
    status: 'pending'
  }, {
    id: 'NV-0263',
    name: 'Vũ Thị Lan',
    dept: 'Kinh doanh',
    base: 15000000,
    allow: 2000000,
    deduct: 1575000,
    status: 'paid'
  }, {
    id: 'NV-0349',
    name: 'Đặng Quốc Bảo',
    dept: 'Kỹ thuật',
    base: 19000000,
    allow: 2400000,
    deduct: 1995000,
    status: 'draft'
  }, {
    id: 'NV-0120',
    name: 'Bùi Khánh Linh',
    dept: 'Marketing',
    base: 17500000,
    allow: 2100000,
    deduct: 1837500,
    status: 'approved'
  }],
  advances: [{
    id: 'UL-0612',
    emp: 'Lê Minh Quân',
    dept: 'Kỹ thuật',
    amount: 5000000,
    reason: 'Sửa xe máy',
    date: '03/06/2026',
    limit: 11000000,
    status: 'pending'
  }, {
    id: 'UL-0611',
    emp: 'Hoàng Đức Thành',
    dept: 'Kho vận',
    amount: 2000000,
    reason: 'Việc gia đình',
    date: '03/06/2026',
    limit: 6000000,
    status: 'pending'
  }, {
    id: 'UL-0609',
    emp: 'Vũ Thị Lan',
    dept: 'Kinh doanh',
    amount: 3000000,
    reason: 'Học phí cho con',
    date: '02/06/2026',
    limit: 7500000,
    status: 'pending'
  }, {
    id: 'UL-0604',
    emp: 'Bùi Khánh Linh',
    dept: 'Marketing',
    amount: 4000000,
    reason: 'Khám sức khoẻ',
    date: '01/06/2026',
    limit: 8750000,
    status: 'pending'
  }, {
    id: 'UL-0598',
    emp: 'Nguyễn Văn An',
    dept: 'Kinh doanh',
    amount: 3000000,
    reason: 'Mua sắm cá nhân',
    date: '29/05/2026',
    limit: 9000000,
    status: 'approved'
  }, {
    id: 'UL-0590',
    emp: 'Trần Thị Bích',
    dept: 'Kế toán',
    amount: 1500000,
    reason: 'Chi phí đi lại',
    date: '27/05/2026',
    limit: 8250000,
    status: 'paid'
  }]
};
window.LUA_DATA.netOf = e => e.base + e.allow - e.deduct;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/data.js", error: String((e && e.message) || e) }); }

// ui_kits/web/screens.jsx
try { (() => {
/* Lúa web kit — screens. */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const {
    Card,
    Button,
    Badge,
    Avatar,
    Icon,
    StatCard,
    AmountDisplay,
    StatusPill,
    ProgressMeter,
    PayslipLine
  } = DS;
  const CSS = `
  .lw-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); margin-bottom: var(--space-6); }
  .lw-cols { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-5); }
  .lw-payday { background: linear-gradient(135deg, var(--green-700), var(--green-600) 60%, var(--green-800)); color: #fff; border-radius: var(--radius-xl); padding: var(--space-6); position: relative; overflow: hidden; }
  .lw-payday__eyebrow { font-size: var(--text-2xs); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--green-100); font-weight: 600; }
  .lw-payday__amt { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; letter-spacing: -0.02em; margin: var(--space-2) 0 var(--space-1); }
  .lw-payday__row { display: flex; gap: var(--space-6); margin-top: var(--space-5); }
  .lw-payday__k { font-size: var(--text-xs); color: var(--green-100); }
  .lw-payday__v { font-size: var(--text-lg); font-weight: 600; font-family: var(--font-mono); }
  .lw-payday__grain { position: absolute; right: -20px; bottom: -20px; opacity: 0.14; }
  .lw-payday__grain svg { width: 160px; height: 160px; }

  .lw-act { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
  .lw-act:last-child { border-bottom: none; }
  .lw-act__icon { width: 34px; height: 34px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .lw-act__t { font-size: var(--text-sm); color: var(--text-strong); font-weight: 500; }
  .lw-act__d { font-size: var(--text-xs); color: var(--text-muted); }

  .lw-tablewrap { width: 100%; overflow: auto; }
  table.lw-table { width: 100%; border-collapse: collapse; }
  .lw-table th { text-align: left; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em;
    padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--border-default); white-space: nowrap; }
  .lw-table th.num, .lw-table td.num { text-align: right; }
  .lw-table td { padding: var(--space-3); border-bottom: 1px solid var(--border-subtle); font-size: var(--text-sm); color: var(--text-body); vertical-align: middle; }
  .lw-table tr:hover td { background: var(--surface-hover); }
  .lw-emp { display: flex; align-items: center; gap: var(--space-2-5); }
  .lw-emp__n { font-weight: 600; color: var(--text-strong); font-size: var(--text-sm); }
  .lw-emp__id { font-size: var(--text-2xs); color: var(--text-subtle); font-family: var(--font-mono); }
  .lw-table tfoot td { border-top: 1.5px solid var(--border-strong); border-bottom: none; font-weight: 700; color: var(--text-strong); padding-top: var(--space-3); }

  .lw-pagehead { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); margin-bottom: var(--space-5); }
  .lw-period { display: inline-flex; align-items: center; gap: var(--space-2); background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); cursor: pointer; }
  .lw-period svg { width: 16px; height: 16px; color: var(--text-muted); }

  .lw-adv { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--surface-card); margin-bottom: var(--space-3); }
  .lw-adv__main { flex: 1; min-width: 0; }
  .lw-adv__top { display: flex; align-items: center; gap: var(--space-2-5); }
  .lw-adv__name { font-weight: 600; color: var(--text-strong); }
  .lw-adv__meta { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; }
  .lw-adv__limit { width: 220px; flex-shrink: 0; }
  .lw-adv__amt { text-align: right; width: 150px; flex-shrink: 0; }
  .lw-adv__actions { display: flex; gap: var(--space-2); flex-shrink: 0; }
  .lw-sectitle { font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); margin: 0 0 var(--space-3); }
  `;
  if (!document.getElementById('lw-screens-styles')) {
    const s = document.createElement('style');
    s.id = 'lw-screens-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  const D = () => window.LUA_DATA;

  // ---------------- Dashboard ----------------
  function DashboardScreen() {
    const d = D();
    const acts = [{
      ic: 'check-circle-2',
      tone: 'success',
      t: 'Bảng lương tháng 5 đã thanh toán',
      d: '32 nhân viên · 05/06/2026'
    }, {
      ic: 'hand-coins',
      tone: 'accent',
      t: 'Lê Minh Quân yêu cầu ứng 5.000.000 ₫',
      d: 'Chờ duyệt · 2 giờ trước'
    }, {
      ic: 'calendar-days',
      tone: 'info',
      t: 'Vũ Thị Lan xin nghỉ phép 2 ngày',
      d: 'Đã duyệt · hôm qua'
    }, {
      ic: 'user-plus',
      tone: 'brand',
      t: 'Thêm nhân viên mới: Đặng Quốc Bảo',
      d: '01/06/2026'
    }];
    const toneBg = {
      success: 'var(--success-100)',
      accent: 'var(--gold-100)',
      info: 'var(--info-100)',
      brand: 'var(--brand-subtle)'
    };
    const toneFg = {
      success: 'var(--success-600)',
      accent: 'var(--gold-700)',
      info: 'var(--info-600)',
      brand: 'var(--brand)'
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-grid4"
    }, /*#__PURE__*/React.createElement(StatCard, {
      icon: "wallet",
      label: "Qu\u1EF9 l\u01B0\u01A1ng th\xE1ng 6",
      value: /*#__PURE__*/React.createElement(AmountDisplay, {
        value: d.stats.payrollTotal,
        size: "lg"
      }),
      delta: "+4,2%",
      trend: "up",
      footnote: "vs T5"
    }), /*#__PURE__*/React.createElement(StatCard, {
      icon: "users",
      iconTone: "info",
      label: "Nh\xE2n vi\xEAn",
      value: String(d.stats.headcount),
      delta: "+2",
      trend: "up",
      footnote: "th\xE1ng n\xE0y"
    }), /*#__PURE__*/React.createElement(StatCard, {
      icon: "hand-coins",
      iconTone: "accent",
      label: "\u1EE8ng l\u01B0\u01A1ng ch\u1EDD duy\u1EC7t",
      value: String(d.stats.advancePending),
      delta: "c\u1EA7n x\u1EED l\xFD",
      trend: "flat"
    }), /*#__PURE__*/React.createElement(StatCard, {
      icon: "calendar-days",
      iconTone: "danger",
      label: "Ng\xE0y ngh\u1EC9 th\xE1ng n\xE0y",
      value: String(d.stats.leaveThisMonth),
      delta: "\u22123",
      trend: "down",
      footnote: "vs T5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "lw-cols"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-payday"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__eyebrow"
    }, "K\u1EF3 l\u01B0\u01A1ng hi\u1EC7n t\u1EA1i \xB7 ", d.period), /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__amt"
    }, (d.stats.payrollTotal / 1e6).toFixed(1).replace('.', ','), " tr \u20AB"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--green-100)'
      }
    }, "T\u1ED5ng chi l\u01B0\u01A1ng d\u1EF1 ki\u1EBFn cho ", d.stats.headcount, " nh\xE2n vi\xEAn"), /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__row"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__k"
    }, "\u0110\xE3 x\xE1c nh\u1EADn"), /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__v"
    }, d.payrun.progress, "/", d.payrun.total)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__k"
    }, "Ng\xE0y tr\u1EA3 l\u01B0\u01A1ng"), /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__v"
    }, d.payrun.payDate)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        alignSelf: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      icon: "play",
      onClick: () => alert('Chạy bảng lương (demo)')
    }, "Ch\u1EA1y b\u1EA3ng l\u01B0\u01A1ng"))), /*#__PURE__*/React.createElement("div", {
      className: "lw-payday__grain"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/lua-mark.svg",
      alt: "",
      style: {
        width: 160,
        height: 160
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 'var(--space-5)'
      }
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Ph\xE2n b\u1ED5 theo ph\xF2ng ban",
      subtitle: "Chi ph\xED l\u01B0\u01A1ng th\xE1ng 6"
    }, [['Kỹ thuật', 0.32], ['Kinh doanh', 0.27], ['Kế toán', 0.15], ['Marketing', 0.14], ['Kho vận & khác', 0.12]].map(([name, r]) => /*#__PURE__*/React.createElement("div", {
      key: name,
      style: {
        marginBottom: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(ProgressMeter, {
      label: name,
      value: Math.round(r * 100),
      max: 100,
      tone: "brand",
      valueText: /*#__PURE__*/React.createElement(AmountDisplay, {
        value: Math.round(d.stats.payrollTotal * r),
        compact: true,
        size: "xs"
      })
    }))))), /*#__PURE__*/React.createElement(Card, {
      title: "Ho\u1EA1t \u0111\u1ED9ng g\u1EA7n \u0111\xE2y",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        iconEnd: "chevron-right"
      }, "T\u1EA5t c\u1EA3")
    }, acts.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "lw-act"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lw-act__icon",
      style: {
        background: toneBg[a.tone],
        color: toneFg[a.tone]
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.ic
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-act__t"
    }, a.t), /*#__PURE__*/React.createElement("div", {
      className: "lw-act__d"
    }, a.d)))))));
  }

  // ---------------- Payroll table ----------------
  function PayrollScreen() {
    const d = D();
    const fmt = n => n.toLocaleString('vi-VN');
    const totals = d.employees.reduce((a, e) => ({
      base: a.base + e.base,
      allow: a.allow + e.allow,
      deduct: a.deduct + e.deduct,
      net: a.net + d.netOf(e)
    }), {
      base: 0,
      allow: 0,
      deduct: 0,
      net: 0
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-pagehead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-period"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar"
    }), d.period, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-2)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "download"
    }, "Xu\u1EA5t Excel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "check"
    }, "Duy\u1EC7t t\u1EA5t c\u1EA3"))), /*#__PURE__*/React.createElement(Card, {
      padding: "sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-tablewrap"
    }, /*#__PURE__*/React.createElement("table", {
      className: "lw-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Nh\xE2n vi\xEAn"), /*#__PURE__*/React.createElement("th", null, "Ph\xF2ng ban"), /*#__PURE__*/React.createElement("th", {
      className: "num"
    }, "L\u01B0\u01A1ng c\u01A1 b\u1EA3n"), /*#__PURE__*/React.createElement("th", {
      className: "num"
    }, "Ph\u1EE5 c\u1EA5p"), /*#__PURE__*/React.createElement("th", {
      className: "num"
    }, "Kh\u1EA5u tr\u1EEB"), /*#__PURE__*/React.createElement("th", {
      className: "num"
    }, "Th\u1EF1c nh\u1EADn"), /*#__PURE__*/React.createElement("th", null, "Tr\u1EA1ng th\xE1i"))), /*#__PURE__*/React.createElement("tbody", null, d.employees.map(e => /*#__PURE__*/React.createElement("tr", {
      key: e.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-emp"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: e.name,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-emp__n"
    }, e.name), /*#__PURE__*/React.createElement("div", {
      className: "lw-emp__id"
    }, e.id)))), /*#__PURE__*/React.createElement("td", null, e.dept), /*#__PURE__*/React.createElement("td", {
      className: "num",
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, fmt(e.base)), /*#__PURE__*/React.createElement("td", {
      className: "num",
      style: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--money-positive)'
      }
    }, "+", fmt(e.allow)), /*#__PURE__*/React.createElement("td", {
      className: "num",
      style: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--money-negative)'
      }
    }, "\u2212", fmt(e.deduct)), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, /*#__PURE__*/React.createElement(AmountDisplay, {
      value: d.netOf(e),
      size: "sm",
      showCurrency: false
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
      status: e.status
    }))))), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      colSpan: 2
    }, "T\u1ED5ng c\u1ED9ng \xB7 ", d.employees.length, " nh\xE2n vi\xEAn"), /*#__PURE__*/React.createElement("td", {
      className: "num",
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, fmt(totals.base)), /*#__PURE__*/React.createElement("td", {
      className: "num",
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, "+", fmt(totals.allow)), /*#__PURE__*/React.createElement("td", {
      className: "num",
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, "\u2212", fmt(totals.deduct)), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, /*#__PURE__*/React.createElement(AmountDisplay, {
      value: totals.net,
      size: "sm",
      tone: "accent",
      showCurrency: false
    })), /*#__PURE__*/React.createElement("td", null)))))));
  }

  // ---------------- Advances (interactive) ----------------
  function AdvancesScreen() {
    const d = D();
    const [items, setItems] = React.useState(d.advances);
    const setStatus = (id, status) => setItems(xs => xs.map(x => x.id === id ? {
      ...x,
      status
    } : x));
    const pending = items.filter(x => x.status === 'pending');
    const handled = items.filter(x => x.status !== 'pending');
    const Row = ({
      a
    }) => /*#__PURE__*/React.createElement("div", {
      className: "lw-adv"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: a.emp,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      className: "lw-adv__main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-adv__top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lw-adv__name"
    }, a.emp), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      size: "sm"
    }, a.dept)), /*#__PURE__*/React.createElement("div", {
      className: "lw-adv__meta"
    }, a.reason, " \xB7 ", a.date, " \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, a.id))), /*#__PURE__*/React.createElement("div", {
      className: "lw-adv__limit"
    }, /*#__PURE__*/React.createElement(ProgressMeter, {
      value: a.amount,
      max: a.limit,
      valueText: `${(a.amount / 1e6).toFixed(1).replace('.', ',')} / ${(a.limit / 1e6).toFixed(1).replace('.', ',')} tr`
    })), /*#__PURE__*/React.createElement("div", {
      className: "lw-adv__amt"
    }, /*#__PURE__*/React.createElement(AmountDisplay, {
      value: a.amount,
      size: "md",
      tone: "accent"
    })), a.status === 'pending' ? /*#__PURE__*/React.createElement("div", {
      className: "lw-adv__actions"
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      icon: "x",
      onClick: () => setStatus(a.id, 'overdue')
    }, "T\u1EEB ch\u1ED1i"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      icon: "check",
      onClick: () => setStatus(a.id, 'approved')
    }, "Duy\u1EC7t")) : /*#__PURE__*/React.createElement("div", {
      style: {
        width: 150,
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: a.status === 'overdue' ? 'overdue' : a.status,
      label: a.status === 'overdue' ? 'Đã từ chối' : undefined
    })));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "lw-pagehead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lw-period"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar"
    }), d.period, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "plus"
    }, "T\u1EA1o y\xEAu c\u1EA7u")), /*#__PURE__*/React.createElement("p", {
      className: "lw-sectitle"
    }, "Ch\u1EDD duy\u1EC7t \xB7 ", pending.length), pending.length ? pending.map(a => /*#__PURE__*/React.createElement(Row, {
      key: a.id,
      a: a
    })) : /*#__PURE__*/React.createElement(Card, {
      elevation: "flat"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        padding: 'var(--space-6)'
      }
    }, "Kh\xF4ng c\xF2n y\xEAu c\u1EA7u n\xE0o ch\u1EDD duy\u1EC7t \uD83C\uDF89")), /*#__PURE__*/React.createElement("p", {
      className: "lw-sectitle",
      style: {
        marginTop: 'var(--space-6)'
      }
    }, "\u0110\xE3 x\u1EED l\xFD"), handled.map(a => /*#__PURE__*/React.createElement(Row, {
      key: a.id,
      a: a
    })));
  }
  function PlaceholderScreen({
    title,
    icon
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      elevation: "flat"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: 'var(--space-16) var(--space-6)',
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        width: 56,
        height: 56,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--brand-subtle)',
        color: 'var(--brand)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 26
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-lg)',
        color: 'var(--text-strong)'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        marginTop: 4
      }
    }, "M\xE0n h\xECnh m\u1EABu \u2014 n\u1ED9i dung s\u1EBD \u0111\u01B0\u1EE3c b\u1ED5 sung.")));
  }
  window.LuaWeb = Object.assign(window.LuaWeb || {}, {
    DashboardScreen,
    PayrollScreen,
    AdvancesScreen,
    PlaceholderScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.MoneyInput = __ds_scope.MoneyInput;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AmountDisplay = __ds_scope.AmountDisplay;

__ds_ns.PayslipLine = __ds_scope.PayslipLine;

__ds_ns.ProgressMeter = __ds_scope.ProgressMeter;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.StatusPill = __ds_scope.StatusPill;

})();
