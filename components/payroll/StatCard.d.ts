import * as React from 'react';

/** KPI card: icon tile, label, large display value, optional trend delta + footnote. */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon name. */
  icon?: string;
  /** Icon tile color. @default "brand" */
  iconTone?: 'brand' | 'accent' | 'info' | 'danger';
  /** Metric label. */
  label: string;
  /** Main value (string or AmountDisplay node). */
  value: React.ReactNode;
  /** Trend delta text, e.g. "+8%". */
  delta?: string;
  /** Trend direction (controls arrow + color). @default "up" */
  trend?: 'up' | 'down' | 'flat';
  /** Small footnote next to delta. */
  footnote?: string;
}

export function StatCard(props: StatCardProps): JSX.Element;
