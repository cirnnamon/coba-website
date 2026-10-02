'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative h-9 w-9 overflow-hidden rounded-lg border border-border/50 bg-background/40 backdrop-blur-sm transition-colors hover:bg-accent"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-5 w-5 text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-5 w-5 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
