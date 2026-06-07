import * as React from 'react';

/** Square icon-only button for toolbars and dense UI. Always pass `aria-label`. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name (required). */
  icon: string;
  /** @default "ghost" */
  variant?: 'ghost' | 'solid' | 'outline';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (required). */
  'aria-label': string;
}

export function IconButton(props: IconButtonProps): JSX.Element;
