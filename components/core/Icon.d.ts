import * as React from 'react';

/** Renders a Lucide glyph as inline SVG. Requires the Lucide UMD script loaded on the page. */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Lucide icon name in kebab-case, e.g. "hand-coins", "check-circle-2". */
  name: string;
  /** Explicit pixel size; omit to inherit 1em from the surrounding text. */
  size?: number | string;
  /** Stroke width. @default 2 */
  strokeWidth?: number;
}

export function Icon(props: IconProps): JSX.Element;
