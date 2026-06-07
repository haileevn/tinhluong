---
name: lua-design
description: Use this skill to generate well-branded interfaces and assets for Lúa, a Vietnamese payroll & compensation platform (salary, advances/ứng lương, leave/nghỉ phép) — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here
- `readme.md` — brand guide: context, content fundamentals (Vietnamese voice + money formatting), visual foundations, iconography.
- `styles.css` — single global stylesheet to link; `@import`s every token + font file under `tokens/`.
- `tokens/` — color, typography, spacing, elevation CSS custom properties (OKLCH).
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand, icons).
- `components/` — React primitives (`core/`, `forms/`, `payroll/`). Each has `.jsx` + `.d.ts` + `.prompt.md`. Read the `.prompt.md` for usage.
- `ui_kits/web/` — HR/Admin web app recreation. `ui_kits/mobile/` — employee app recreation.
- `assets/` — `lua-mark.svg` brand mark.

## Quick rules
- Money: Vietnamese format `12.500.000 ₫` (dot thousands, ₫ suffix), tabular figures — use `AmountDisplay` / `MoneyInput`.
- Voice: Vietnamese-first, sentence case, address employees as "bạn". Never ALL CAPS (cramps diacritics).
- Color: paddy **green** is the brand; harvest **gold** is reserved for money/payday moments. Warm neutrals.
- Fonts: Be Vietnam Pro (UI/body), Sora (display), JetBrains Mono (figures) — via Google Fonts CDN.
- Icons: Lucide (2px stroke). In React use the `Icon` component (`<Icon name="wallet" />`); load the Lucide UMD script for the icon data.

## Using components in a static HTML mock
Link `styles.css`, load React + Babel + Lucide + `_ds_bundle.js`, then read components from `window.LAPayrollDesignSystem_59f88b`. See any `components/**/*.card.html` for the exact boilerplate.
