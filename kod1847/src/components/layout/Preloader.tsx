'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 800);
    const removeTimer = setTimeout(() => setRemoved(true), 1400);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div
        className={`transition-all duration-[800ms] ease-reveal ${
          hidden ? 'opacity-0 scale-100' : 'opacity-100 scale-[0.8]'
        }`}
      >
        <span className="font-bodoni text-4xl text-gold tracking-wider">
          К·18/47
        </span>
      </div>
    </div>
  );
}
