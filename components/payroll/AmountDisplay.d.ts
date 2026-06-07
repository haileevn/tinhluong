import * as React from 'react';

/** Display a đồng amount with tabular figures, optional sign coloring, compacting, and ₫ suffix. */
export interface AmountDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Amount in đồng (integer). */
  value: number;
  /** Size token. @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Force color. If omitted and `signed`, auto picks positive/negative. */
  tone?: 'positive' | 'negative' | 'accent';
  /** Show +/− and auto-color by sign. @default false */
  signed?: boolean;
  /** Compact form: 12,5 tr · 1,2 tỷ. @default false */
  compact?: boolean;
  /** Currency suffix. @default "₫" */
  currency?: string;
  /** Show the currency suffix. @default true */
  showCurrency?: boolean;
}

export function AmountDisplay(props: AmountDisplayProps): JSX.Element;
