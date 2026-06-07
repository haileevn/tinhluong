import * as React from 'react';

/** Toggle switch for binary settings. Controlled (`checked`) or uncontrolled (`defaultChecked`). */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Inline label to the right of the track. */
  label?: string;
}

export function Switch(props: SwitchProps): JSX.Element;
