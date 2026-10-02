'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Zap, BookOpen, Globe } from 'lucide-react';
import { useVisitorLevel } from '@/hooks/use-visitor-level';

const socialLinks = [
  { label: 'GitHub', icon: Github, url: '#' },
  { label: 'LinkedIn', icon: Linkedin, url: '#' },
  { label: 'Twitter', icon: Twitter, url: '#' },
  { label: 'Email', icon: Mail, url: '#' },
  { label: 'Google Scholar', icon: BookOpen, url: '#' },
  { label: 'Website', icon: Globe, url: '#' },
];

const navLinks = [
  { label: 'Dossier', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Questline', href: '#journey' },
  { label: 'Quest Log', href: '#projects' },
  { label: 'Guild', href: '#contact' },
];

export function Footer() {
  const { level, title } = useVisitorLevel();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/40 pt-16 pb-24">
      <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-lg font-bold">
                Cipher<span className="text-primary">.dev</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The interactive portfolio of Dr. Kaelen &ldquo;Cipher&rdquo; Vance —
              bridging nanotechnology and code, one quest at a time.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Visitor Level Bar */}
        <div className="rounded-xl border border-border/40 bg-card p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ boxShadow: ['0 0 10px hsl(var(--primary) / 0.3)', '0 0 20px hsl(var(--primary) / 0.5)'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 border border-primary/40"
              >
                <Zap className="h-5 w-5 text-primary fill-primary" />
              </motion.div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Your Visitor Rank
                </div>
                <div className="font-display font-bold text-foreground">
                  Level {level} — {title}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              Thank you for exploring the archive.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Dr. Kaelen &ldquo;Cipher&rdquo; Vance.
            Crafted with code, curiosity, and a bit of RPG magic.
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/60">
            Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
