import * as React from 'react';

/**
 * Payroll-lifecycle status pill — maps a status to its canonical Vietnamese label + icon.
 *
 * @startingPoint section="Payroll" subtitle="Lifecycle status pill (paid / pending / overdue …)" viewport="700x120"
 */
export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lifecycle state. @default "draft" */
  status?: 'paid' | 'pending' | 'overdue' | 'approved' | 'draft' | 'processing';
  /** Override the default Vietnamese label. */
  label?: string;
  /** Use a plain dot instead of the status icon. @default false */
  dot?: boolean;
}

export function StatusPill(props: StatusPillProps): JSX.Element;
