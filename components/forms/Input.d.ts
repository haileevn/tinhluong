import * as React from 'react';

/** Text input with label, hint, error state, and optional leading Lucide icon. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — replaces hint and switches to the error style. */
  error?: string;
  /** Leading Lucide icon name. */
  icon?: string;
  /** Show a required asterisk. @default false */
  required?: boolean;
}

export function Input(props: InputProps): JSX.Element;
