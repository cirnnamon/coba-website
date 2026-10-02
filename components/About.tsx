'use client';

import { motion } from 'framer-motion';
import { Shield, MapPin, Mail, Star, Cpu } from 'lucide-react';
import { character } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Character Dossier"
          title="About the Cipher"
          description="Classified personnel file — clearance level: PUBLIC"
          icon={Shield}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="relative rounded-2xl border border-border/60 bg-card p-6 clip-corner overflow-hidden">
              <div className="absolute inset-0 scanline-bg pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                    <Cpu className="h-8 w-8 text-primary" />
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {character.level}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Lv. {character.level} {character.classType}
                    </div>
                    <div className="font-display text-xl font-bold">{character.firstName}</div>
                    <div className="text-xs text-primary font-mono">a.k.a. "{character.alias}"</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    <span className="text-foreground font-medium">{character.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {character.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    {character.email}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/40">
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                    Base Stats
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {character.stats.map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-primary">{stat.label}</span>
                          <span className="font-mono text-muted-foreground">
                            {stat.value}/{stat.max}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl border border-border/60 bg-card p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                <span className="font-mono text-xs text-primary uppercase tracking-widest">
                  // Bio_Dossier.txt
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
              </div>

              <div className="space-y-5">
                {character.bio.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                    className="text-foreground/80 leading-relaxed text-[15px]"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Years Exp', value: '10+' },
                  { label: 'Publications', value: '15+' },
                  { label: 'Citations', value: '120+' },
                  { label: 'Students', value: '50+' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/40 bg-background/40 p-3 text-center"
                  >
                    <div className="font-display text-2xl font-bold text-primary">
                      {item.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
