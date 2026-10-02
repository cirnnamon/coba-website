'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Lock, Star, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { SectionHeading } from './SectionHeading';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const difficultyColors: Record<Project['difficulty'], string> = {
  S: 'text-amber-500 border-amber-500/40 bg-amber-500/10',
  A: 'text-primary border-primary/40 bg-primary/10',
  B: 'text-accent border-accent/40 bg-accent/10',
  C: 'text-muted-foreground border-border bg-secondary',
};

const statusConfig: Record<Project['status'], { label: string; color: string }> = {
  completed: { label: 'Completed', color: 'text-accent' },
  active: { label: 'In Progress', color: 'text-amber-500' },
  classified: { label: 'Classified', color: 'text-muted-foreground' },
};

export function QuestLog() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setUnlockedIds((prev) => new Set(prev).add(project.id));
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg bg-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        <SectionHeading
          label="Research Archive"
          title="Quest Log"
          description="Unlockable projects and research endeavors — click to reveal details"
          icon={FlaskConical}
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, idx) => {
            const isUnlocked = unlockedIds.has(project.id);
            return (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => handleProjectClick(project)}
                className="group relative text-left rounded-2xl border border-border/50 bg-card p-5 overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                </div>

                {/* Top row: difficulty + status */}
                <div className="relative flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-sm font-bold',
                        difficultyColors[project.difficulty]
                      )}
                    >
                      {project.difficulty}
                    </span>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        Difficulty
                      </div>
                      <div
                        className={cn(
                          'text-[10px] font-medium',
                          statusConfig[project.status].color
                        )}
                      >
                        {statusConfig[project.status].label}
                      </div>
                    </div>
                  </div>
                  {isUnlocked ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
                  )}
                </div>

                {/* Icon + Title */}
                <div className="relative flex items-start gap-3 mb-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-transform group-hover:scale-110">
                    <project.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="relative text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack Preview */}
                <div className="relative flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-muted-foreground border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="relative flex items-center justify-between pt-3 border-t border-border/30">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-primary">
                    <Zap className="h-3 w-3" />
                    +{project.expReward.toLocaleString()} EXP
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                    {isUnlocked ? 'View Details' : 'Unlock'}
                    <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 text-primary" />
          <span>
            {unlockedIds.size} / {projects.length} Quests Unlocked
          </span>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          >
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <selectedProject.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="font-display text-xl">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription>{selectedProject.category}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg border font-mono text-xs font-bold',
                      difficultyColors[selectedProject.difficulty]
                    )}
                  >
                    {selectedProject.difficulty}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {statusConfig[selectedProject.status].label}
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Zap className="h-3 w-3 text-primary" />
                    {selectedProject.expReward.toLocaleString()} EXP
                  </Badge>
                </div>

                {/* Long description */}
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Highlights */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Quest Highlights
                  </div>
                  <div className="space-y-1.5">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-secondary border border-border/40 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
