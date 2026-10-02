'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Star } from 'lucide-react';
import { useVisitorLevel } from '@/hooks/use-visitor-level';

export function ExpBar() {
  const { scrollPercent, level, exp, title } = useVisitorLevel();
  const [visible, setVisible] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(1);

  useEffect(() => {
    setVisible(scrollPercent > 5);
  }, [scrollPercent]);

  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true);
      const timer = setTimeout(() => setShowLevelUp(false), 3000);
      return () => clearTimeout(timer);
    }
    setPrevLevel(level);
  }, [level, prevLevel]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/40"
          >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2.5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 border border-primary/40">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {level}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Visitor Lv.{level}
                    </div>
                    <div className="text-xs font-semibold text-foreground truncate max-w-[120px]">
                      {title}
                    </div>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${scrollPercent}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <span className="text-[9px] font-mono text-primary-foreground/70">
                      EXP {Math.round(scrollPercent * 10)}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-muted-foreground">
                    {exp}/{1000} XP
                  </span>
                  <button
                    onClick={scrollToTop}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-background/40 text-muted-foreground transition-colors hover:text-primary hover:border-primary/40"
                    aria-label="Scroll to top"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={scrollToTop}
                  className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-background/40 text-muted-foreground"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: -10 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg neon-glow"
          >
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-primary-foreground" />
              LEVEL UP! You are now Level {level}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
