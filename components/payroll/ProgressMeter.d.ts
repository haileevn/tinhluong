import * as React from 'react';

/** Labeled progress bar for advance limits and leave usage. Auto-colors toward warning/danger near the cap. */
export interface ProgressMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  /** Current value. */
  value: number;
  /** Maximum. @default 100 */
  max?: number;
  /** Force fill color; otherwise auto (brand → warning ≥70% → danger ≥90%). */
  tone?: 'brand' | 'accent' | 'warning' | 'danger';
  /** Custom right-aligned readout (e.g. "3.000.000 / 9.000.000 ₫"). */
  valueText?: React.ReactNode;
  /** Helper line under the bar. */
  footnote?: string;
}

export function ProgressMeter(props: ProgressMeterProps): JSX.Element;
