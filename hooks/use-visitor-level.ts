'use client';

import { useEffect, useState } from 'react';

export interface VisitorProgress {
  scrollPercent: number;
  level: number;
  exp: number;
  expForNext: number;
  title: string;
}

const LEVEL_TITLES: Record<number, string> = {
  1: 'Wandering Novice',
  2: 'Curious Apprentice',
  3: 'Data Scout',
  4: 'Code Initiate',
  5: 'Lab Assistant',
  6: 'Research Adept',
  7: 'Bio-Computational Scribe',
  8: 'Molecular Analyst',
  9: 'Cyber-Scholar',
  10: 'Cipher Knight',
};

export function useVisitorLevel(): VisitorProgress {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setScrollPercent(percent);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const level = Math.min(10, Math.floor(scrollPercent / 10) + 1);
  const expInLevel = scrollPercent % 10;
  const exp = Math.round(expInLevel * 100);
  const expForNext = 1000;
  const title = LEVEL_TITLES[level] || 'Cipher Knight';

  return { scrollPercent, level, exp, expForNext, title };
}
