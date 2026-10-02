'use client';

import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  icon: LucideIcon;
}

export function SectionHeading({ label, title, description, icon: Icon }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-xs text-primary uppercase tracking-widest">
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          {description}
        </p>
      )}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
      </div>
    </motion.div>
  );
}
