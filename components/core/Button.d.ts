import * as React from 'react';

/**
 * Lúa primary action button.
 *
 * @startingPoint section="Core" subtitle="Branded button with variants, sizes, icons" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name rendered before the label (e.g. "hand-coins"). */
  icon?: string;
  /** Lucide icon name rendered after the label (e.g. "chevron-right"). */
  iconEnd?: string;
  /** Stretch to fill container width. @default false */
  fullWidth?: boolean;
  /** Show a spinner and disable. @default false */
  loading?: boolean;
  /** Render as another element/tag, e.g. "a". @default "button" */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
