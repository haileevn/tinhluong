import * as React from 'react';

/** Surface container with optional header (title / subtitle / action slot). */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header title (rendered in display font). */
  title?: React.ReactNode;
  /** Sub-text under the title. */
  subtitle?: React.ReactNode;
  /** Right-aligned header slot (e.g. a Button or IconButton). */
  action?: React.ReactNode;
  /** Shadow depth. @default "resting" */
  elevation?: 'flat' | 'resting' | 'raised';
  /** Inner padding. @default "md" */
  padding?: 'sm' | 'md' | 'lg';
  /** Hover-lift affordance for clickable cards. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
