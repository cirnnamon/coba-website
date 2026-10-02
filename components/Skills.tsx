'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sword, type LucideIcon } from 'lucide-react';
import { skills, skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/lib/types';
import { SectionHeading } from './SectionHeading';
import { cn } from '@/lib/utils';

const categoryTabs: { key: SkillCategory | 'all'; label: string; icon: LucideIcon }[] = [
  { key: 'all', label: 'All Skills', icon: Sword },
  ...skillCategories.map((c) => ({
    key: c.key,
    label: c.label.split(' (')[0],
    icon: skills.find((s) => s.category === c.key)?.icon || Sword,
  })),
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getCategoryColor = (cat: SkillCategory) =>
    skillCategories.find((c) => c.key === cat)?.color || 'hsl(var(--primary))';

  const getCategoryLabel = (cat: SkillCategory) =>
    skillCategories.find((c) => c.key === cat)?.label.split(' (')[0] || cat;

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg bg-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
        <SectionHeading
          label="Skill Tree"
          title="RPG Skill Stats"
          description="Technical and research proficiencies, mapped as RPG attributes"
          icon={Sword}
        />

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all border',
                activeCategory === tab.key
                  ? 'bg-primary/10 border-primary/40 text-primary'
                  : 'bg-card border-border/40 text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill, idx) => {
            const color = getCategoryColor(skill.category);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="group relative rounded-xl border border-border/40 bg-card p-4 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `${color}40`,
                      backgroundColor: `${color}10`,
                    }}
                  >
                    <skill.icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {skill.name}
                        </span>
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider"
                          style={{ color, backgroundColor: `${color}15` }}
                        >
                          {getCategoryLabel(skill.category)}
                        </span>
                      </div>
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color }}
                      >
                        {skill.value}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.05, ease: 'easeOut' }}
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: color }}
                      >
                        <div
                          className="absolute inset-0 animate-shimmer rounded-full"
                          style={{ opacity: 0.3 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Radar Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-bold">Attribute Radar</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Aggregate skill distribution by category
              </p>
            </div>
          </div>

          <RadarChart skills={skills} categories={skillCategories} />
        </motion.div>
      </div>
    </section>
  );
}

interface RadarChartProps {
  skills: typeof import('@/lib/data').skills;
  categories: typeof import('@/lib/data').skillCategories;
}

function RadarChart({ skills, categories }: RadarChartProps) {
  const size = 280;
  const center = size / 2;
  const maxRadius = 100;
  const levels = 4;

  const categoryAverages = categories.map((cat) => {
    const catSkills = skills.filter((s) => s.category === cat.key);
    const avg = catSkills.reduce((sum, s) => sum + s.value, 0) / catSkills.length;
    return { ...cat, avg };
  });

  const angleStep = (Math.PI * 2) / categoryAverages.length;

  const getPoint = (idx: number, value: number, maxVal = 100) => {
    const angle = angleStep * idx - Math.PI / 2;
    const radius = (value / maxVal) * maxRadius;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  };

  const polygonPoints = categoryAverages
    .map((cat, i) => {
      const p = getPoint(i, cat.avg);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      <div className="relative shrink-0">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid circles */}
          {Array.from({ length: levels }, (_, i) => {
            const r = (maxRadius / levels) * (i + 1);
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                opacity={0.5}
              />
            );
          })}

          {/* Axis lines */}
          {categoryAverages.map((_, i) => {
            const p = getPoint(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                opacity={0.4}
              />
            );
          })}

          {/* Data polygon */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            points={polygonPoints}
            fill="hsl(var(--primary) / 0.15)"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            style={{ transformOrigin: 'center' }}
          />

          {/* Data points */}
          {categoryAverages.map((cat, i) => {
            const p = getPoint(i, cat.avg);
            return (
              <motion.circle
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={cat.color}
                stroke="hsl(var(--background))"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Labels */}
          {categoryAverages.map((cat, i) => {
            const p = getPoint(i, 125);
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[9px] font-mono uppercase tracking-wider"
              >
                {cat.label.split(' (')[0]}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {categoryAverages.map((cat) => (
          <div
            key={cat.key}
            className="rounded-xl border border-border/40 bg-background/40 p-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: cat.color }}>
                {cat.label.split(' (')[0]}
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: cat.color }}>
                {Math.round(cat.avg)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">{cat.description}</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${cat.avg}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full"
                style={{ backgroundColor: cat.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
