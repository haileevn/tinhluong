import * as React from 'react';

/** Currency input for Vietnamese đồng — auto-formats thousands ("12.500.000") and shows the ₫ suffix. */
export interface MoneyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  label?: string;
  hint?: string;
  /** Controlled numeric value (integer đồng). */
  value?: number;
  /** Uncontrolled initial value (integer đồng). */
  defaultValue?: number;
  /** Fires with the parsed integer amount on each edit. */
  onValueChange?: (amount: number) => void;
}

export function MoneyInput(props: MoneyInputProps): JSX.Element;
