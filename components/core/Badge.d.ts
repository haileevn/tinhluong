import * as React from 'react';

/** Compact label for status, counts, and categories. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "neutral" */
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Filled (solid) instead of soft tint. @default false */
  solid?: boolean;
  /** Show a leading status dot. @default false */
  dot?: boolean;
  /** Lucide icon name. */
  icon?: string;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
