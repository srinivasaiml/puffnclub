"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 2.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Buttery easing
      }}
    >
      {children}
    </ReactLenis>
  );
}
