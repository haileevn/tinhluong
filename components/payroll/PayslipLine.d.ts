import * as React from 'react';

/** One payslip line: label (+ optional note) left, signed đồng amount right. Composes AmountDisplay. */
export interface PayslipLineProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  /** Secondary note under the label (e.g. "10,5% lương cơ bản"). */
  note?: React.ReactNode;
  /** Amount in đồng. Negative renders red, positive green when `signed`. */
  amount: number;
  /** Show +/− sign and sign-coloring. @default true */
  signed?: boolean;
  /** Row style. `total` is the emphasized net-pay row (gold). @default "item" */
  variant?: 'item' | 'section' | 'total';
  /** Force amount color. */
  tone?: 'positive' | 'negative' | 'accent';
}

export function PayslipLine(props: PayslipLineProps): JSX.Element;
