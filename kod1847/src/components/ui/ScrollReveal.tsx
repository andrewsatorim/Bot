'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = '' }: Props) {
  const { ref, isVisible } = useScrollReveal();

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      className={`reveal-up ${isVisible ? 'visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
