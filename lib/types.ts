import { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  value: number;
  category: SkillCategory;
  icon: LucideIcon;
}

export type SkillCategory = 'combat' | 'tech' | 'research' | 'alchemy';

export interface SkillCategoryInfo {
  key: SkillCategory;
  label: string;
  description: string;
  color: string;
}

export interface TimelineEntry {
  id: string;
  levelRange: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  icon: LucideIcon;
  status: 'completed' | 'active';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  difficulty: 'S' | 'A' | 'B' | 'C';
  status: 'completed' | 'active' | 'classified';
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  links: { label: string; url: string }[];
  icon: LucideIcon;
  expReward: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface CharacterStat {
  label: string;
  value: number;
  max: number;
  suffix: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string[];
}
