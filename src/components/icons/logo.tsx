import Image from 'next/image';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  const { width, height, className } = props;

  // Note: The parent component might use Tailwind size classes (e.g., "size-8")
  // which won't directly apply to the Next.js Image component unless we handle it.
  // For simplicity, we prioritize the explicit width/height props.
  // If className is used for sizing, it should be handled in the parent by wrapping this component.

  return (
    <Image
      src="/logo.png"
      alt="PCMEA Logo"
      width={width ? Number(width) : 40}
      height={height ? Number(height) : 40}
      className={className}
      {...props}
    />
  );
}
