import type { ReactNode } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

interface SvgProps {
  size: number;
  className?: string;
  strokeWidth?: number;
  children: ReactNode;
}

function Svg({ size, className, strokeWidth = 2, children }: SvgProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PipetteIcon({ size = 18, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" />
    </Svg>
  );
}
