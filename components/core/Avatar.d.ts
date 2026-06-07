import * as React from 'react';

/** User avatar — image when `src` given, else auto-colored initials from `name`. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for initials and deterministic color. */
  name?: string;
  /** Image URL. */
  src?: string;
  /** @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function Avatar(props: AvatarProps): JSX.Element;
