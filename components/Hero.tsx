'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Terminal, Zap, FlaskConical } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { character } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const floatingIcons = [
  { Icon: Terminal, delay: 0, x: '15%', y: '30%' },
  { Icon: FlaskConical, delay: 1.5, x: '82%', y: '25%' },
  { Icon: Zap, delay: 0.8, x: '10%', y: '70%' },
  { Icon: Sparkles, delay: 2, x: '88%', y: '65%' },
];

export function Hero() {
  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg bg-grid opacity-30" />
      <ParticleBackground />

      {floatingIcons.map(({ Icon, delay, x, y }, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden md:block z-0"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + delay, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4 + delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm"
          >
            <Icon className="h-6 w-6 text-primary/60" />
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-mono text-primary tracking-wider">
              ONLINE — ACCEPTING QUESTS
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
            Welcome, Visitor. You have entered the domain of
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance"
        >
          <span className="block text-foreground">Dr. Kaelen</span>
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
            &ldquo;Cipher&rdquo; Vance
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          {character.title}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-base text-muted-foreground/70 max-w-xl mx-auto italic"
        >
          {character.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToAbout}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
          >
            <FlaskConical className="h-4 w-4" />
            Enter the Archive
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
          </button>
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-background/40 backdrop-blur-sm font-medium text-sm transition-all hover:border-primary/50 hover:bg-accent/10"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Join the Guild
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted-foreground/50 hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
