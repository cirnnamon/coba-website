'use client';

import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Circle, MapPin } from 'lucide-react';
import { timeline } from '@/lib/data';
import { SectionHeading } from './SectionHeading';
import { cn } from '@/lib/utils';

export function Timeline() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          label="Questline Log"
          title="The Journey"
          description="From POLBAN to Ph.D. — the levels that shaped a Cyber-Academic Sage"
          icon={BookOpen}
        />

        <div className="mt-16 relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((entry, idx) => {
              const isLeft = idx % 2 === 0;
              const isCompleted = entry.status === 'completed';

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={cn(
                    'relative pl-12 sm:pl-0',
                    isLeft ? 'sm:pr-[52%]' : 'sm:pl-[52%]'
                  )}
                >
                  {/* Node */}
                  <div
                    className={cn(
                      'absolute left-0 sm:left-1/2 top-0 -translate-x-1/2 z-10',
                      'flex h-8 w-8 items-center justify-center rounded-full border-2',
                      isCompleted
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-accent bg-accent/20 text-accent animate-pulse-glow'
                    )}
                  >
                    <entry.icon className="h-4 w-4" />
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      'group rounded-2xl border border-border/50 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
                      isLeft ? 'sm:text-right' : 'sm:text-left'
                    )}
                  >
                    {/* Level Badge */}
                    <div
                      className={cn(
                        'flex items-center gap-2 mb-3',
                        isLeft ? 'sm:justify-end' : 'justify-start'
                      )}
                    >
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                        {entry.levelRange}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-accent" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-accent">
                          <Circle className="h-3 w-3 fill-accent text-accent" />
                          Active
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground">
                      {entry.title}
                    </h3>
                    <div
                      className={cn(
                        'mt-1 flex items-center gap-2 text-sm text-primary font-medium',
                        isLeft ? 'sm:justify-end' : 'justify-start'
                      )}
                    >
                      {entry.institution}
                    </div>
                    <div
                      className={cn(
                        'mt-1 flex items-center gap-3 text-xs text-muted-foreground',
                        isLeft ? 'sm:justify-end' : 'justify-start'
                      )}
                    >
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {entry.location}
                      </span>
                      <span className="font-mono">{entry.period}</span>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {entry.description}
                    </p>

                    {/* Achievements */}
                    <div
                      className={cn(
                        'mt-4 space-y-1.5',
                        isLeft ? 'sm:text-right' : 'text-left'
                      )}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 mb-2">
                        Key Achievements
                      </div>
                      {entry.achievements.map((ach, aIdx) => (
                        <div
                          key={aIdx}
                          className={cn(
                            'flex items-start gap-2 text-xs text-muted-foreground',
                            isLeft ? 'sm:flex-row-reverse sm:text-right' : 'flex-row'
                          )}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
