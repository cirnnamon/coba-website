import {
  Code2,
  FlaskConical,
  Brain,
  Database,
  Cpu,
  Globe,
  GraduationCap,
  Plane,
  Award,
  BookOpen,
  Microscope,
  Smartphone,
  Atom,
  Beaker,
  Terminal,
  Zap,
  Shield,
  Sword,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type {
  Skill,
  TimelineEntry,
  Project,
  NavItem,
  CharacterStat,
  TerminalCommand,
  SkillCategoryInfo,
} from './types';

export const character = {
  name: 'Dr. Kaelen "Cipher" Vance',
  firstName: 'Kaelen',
  alias: 'Cipher',
  title: 'Senior Nanoinformatics Researcher & Full-Stack Architect',
  tagline: 'Bridging the molecular and the digital — one quest at a time.',
  level: 99,
  classType: 'Cyber-Academic Sage',
  location: 'Japan / Remote',
  email: 'kaelen.vance@cipher.dev',
  bio: [
    'A polymath operating at the intersection of nanotechnology, bioinformatics, and full-stack engineering. My journey began in the labs of POLBAN, was forged in the research halls of Japan through a MEXT Scholarship, and crystallized during a Ph.D. in Nanoinformatics — where I developed computational models for smartphone-based colorimetric biosensing.',
    'Today, I serve as an elite university lecturer while architecting a visionary interactive coding education platform designed to gamify the next generation of developers. I treat every research problem as a quest, every dataset as a dungeon, and every student as a future party member.',
  ],
  stats: [
    { label: 'INT', value: 98, max: 99, suffix: '' },
    { label: 'DEX', value: 87, max: 99, suffix: '' },
    { label: 'STR', value: 65, max: 99, suffix: '' },
    { label: 'WIS', value: 92, max: 99, suffix: '' },
    { label: 'CHA', value: 80, max: 99, suffix: '' },
    { label: 'LUK', value: 73, max: 99, suffix: '' },
  ] as CharacterStat[],
} as const;

export const skillCategories: SkillCategoryInfo[] = [
  {
    key: 'combat',
    label: 'Combat (Web Dev)',
    description: 'Frontend & backend engineering prowess',
    color: 'hsl(var(--chart-1))',
  },
  {
    key: 'tech',
    label: 'Tech (Systems)',
    description: 'Languages, databases, and infrastructure',
    color: 'hsl(var(--chart-2))',
  },
  {
    key: 'research',
    label: 'Research (Bio-comp)',
    description: 'Nanoinformatics and biosensing research',
    color: 'hsl(var(--chart-3))',
  },
  {
    key: 'alchemy',
    label: 'Alchemy (AI Models)',
    description: 'Machine learning and molecular modeling',
    color: 'hsl(var(--chart-4))',
  },
];

export const skills: Skill[] = [
  // Combat (Web Dev)
  { name: 'TypeScript', value: 95, category: 'combat', icon: Code2 },
  { name: 'Next.js / React', value: 93, category: 'combat', icon: Globe },
  { name: 'Tailwind CSS', value: 90, category: 'combat', icon: Sparkles },
  { name: 'PostgreSQL', value: 85, category: 'combat', icon: Database },

  // Tech (Systems)
  { name: 'Python', value: 92, category: 'tech', icon: Code2 },
  { name: 'C', value: 78, category: 'tech', icon: Cpu },
  { name: 'Neo4j (Graph DB)', value: 82, category: 'tech', icon: Database },
  { name: 'Linux / DevOps', value: 80, category: 'tech', icon: Terminal },

  // Research (Bio-comp)
  { name: 'RDKit (Cheminformatics)', value: 88, category: 'research', icon: FlaskConical },
  { name: 'PubChemPy', value: 85, category: 'research', icon: Beaker },
  { name: 'Microfluidic Data Analysis', value: 84, category: 'research', icon: Microscope },
  { name: 'Colorimetric Biosensing', value: 90, category: 'research', icon: Smartphone },

  // Alchemy (AI Models)
  { name: 'Transformers', value: 82, category: 'alchemy', icon: Brain },
  { name: 'Optuna (HPO)', value: 86, category: 'alchemy', icon: Zap },
  { name: 'Molecular Modeling', value: 89, category: 'alchemy', icon: Atom },
  { name: 'ML Pipelines', value: 83, category: 'alchemy', icon: Brain },
];

export const navItems: NavItem[] = [
  { label: 'Home', href: '#hero', icon: Zap },
  { label: 'Dossier', href: '#about', icon: Shield },
  { label: 'Skills', href: '#skills', icon: Sword },
  { label: 'Questline', href: '#journey', icon: BookOpen },
  { label: 'Quest Log', href: '#projects', icon: FlaskConical },
  { label: 'Guild', href: '#contact', icon: Sparkles },
];

export const timeline: TimelineEntry[] = [
  {
    id: 'polban',
    levelRange: 'Lv. 1–20',
    title: 'D4 Teknik Informatika',
    institution: 'Politeknik Negeri Bandung (POLBAN)',
    location: 'Bandung, Indonesia',
    period: '2012 — 2016',
    description:
      'The origin story. Mastered software engineering fundamentals, graph databases, and full-stack development in a rigorous polytechnic environment.',
    achievements: [
      'Graduated with honors — specialized in graph database architectures',
      'Built full-stack campus systems using Neo4j and Node.js',
      'Founded the student coding guild — 40+ active members',
    ],
    icon: GraduationCap,
    status: 'completed',
  },
  {
    id: 'mext-masters',
    levelRange: 'Lv. 21–50',
    title: 'M.Sc. in Nanoinformatics (MEXT Scholar)',
    institution: 'National Institute of Technology, Japan',
    location: 'Japan',
    period: '2017 — 2019',
    description:
      'Crossed the sea as a MEXT Scholar. Bridged computer science with nanotechnology, focusing on analyzing microfluidic device data through computational pipelines.',
    achievements: [
      'Awarded MEXT Scholarship by the Japanese Government',
      'Published 3 papers on microfluidic data analysis pipelines',
      'Developed a Python framework for real-time microfluidic sensor data',
    ],
    icon: Plane,
    status: 'completed',
  },
  {
    id: 'phd',
    levelRange: 'Lv. 51–99',
    title: 'Ph.D. (S3) in Nanoinformatics',
    institution: 'University of Tokyo, Japan',
    location: 'Tokyo, Japan',
    period: '2019 — 2023',
    description:
      'The doctorate quest. Specialized in computational research, molecular modeling, and smartphone colorimetric biosensing models — turning phones into lab equipment.',
    achievements: [
      'Dissertation: "Computational Models for Smartphone-Based Colorimetric Biosensing"',
      'Developed ML models achieving 94% accuracy in molecular detection',
      'Integrated RDKit + PubChemPy pipelines for high-throughput screening',
      'Cited in 120+ papers across nanoinformatics and biosensing fields',
    ],
    icon: Award,
    status: 'completed',
  },
  {
    id: 'current',
    levelRange: 'Lv. 99 (Current)',
    title: 'Elite University Lecturer & Platform Architect',
    institution: 'University & Independent',
    location: 'Japan / Remote',
    period: '2023 — Present',
    description:
      'Serving as an elite university lecturer while architecting a visionary interactive coding education platform that gamifies developer learning for the next generation.',
    achievements: [
      'Teaching advanced courses on nanoinformatics and full-stack engineering',
      'Architecting an interactive, gamified coding education platform',
      'Mentoring 50+ graduate students across two research labs',
    ],
    icon: BookOpen,
    status: 'active',
  },
];

export const projects: Project[] = [
  {
    id: 'biosense',
    title: 'Smartphone Colorimetric Biosensing Platform',
    category: 'Nanoinformatics / Mobile',
    difficulty: 'S',
    status: 'completed',
    description:
      'Turned a smartphone camera into a lab-grade biosensor using ML-powered colorimetric analysis.',
    longDescription:
      'A computational platform that transforms smartphone cameras into colorimetric biosensors. The system uses a Transformer-based model to analyze colorimetric changes on microfluidic test strips, achieving 94% accuracy in molecular detection. The pipeline integrates RDKit for molecular structure validation and Optuna for hyperparameter optimization.',
    techStack: ['Python', 'PyTorch', 'RDKit', 'OpenCV', 'Optuna', 'FastAPI'],
    highlights: [
      '94% detection accuracy across 12 molecular targets',
      'Real-time inference on mobile devices (< 200ms)',
      'Published in 3 peer-reviewed journals',
    ],
    links: [
      { label: 'Research Paper', url: '#' },
      { label: 'Code Repository', url: '#' },
    ],
    icon: Smartphone,
    expReward: 5000,
  },
  {
    id: 'molecular-net',
    title: 'Molecular Graph Neural Network',
    category: 'AI / Cheminformatics',
    difficulty: 'S',
    status: 'completed',
    description:
      'A GNN that predicts molecular properties from graph representations of chemical structures.',
    longDescription:
      'Built a Graph Neural Network that predicts molecular properties by treating chemical structures as graphs where atoms are nodes and bonds are edges. The model leverages PubChemPy for data acquisition and achieves state-of-the-art results on toxicity prediction benchmarks. Training pipelines use Optuna for Bayesian hyperparameter optimization.',
    techStack: ['Python', 'PyTorch Geometric', 'RDKit', 'PubChemPy', 'Optuna'],
    highlights: [
      'State-of-the-art on Tox21 benchmark',
      'Processes 100K molecules/hour',
      'Integrated into high-throughput screening pipeline',
    ],
    links: [
      { label: 'Paper', url: '#' },
      { label: 'Demo', url: '#' },
    ],
    icon: Atom,
    expReward: 4200,
  },
  {
    id: 'microfluidic',
    title: 'Microfluidic Data Pipeline',
    category: 'Data Engineering / Research',
    difficulty: 'A',
    status: 'completed',
    description:
      'A real-time data pipeline for microfluidic device sensor data analysis.',
    longDescription:
      'A Python-based data engineering pipeline that ingests, processes, and visualizes real-time sensor data from microfluidic devices. The system handles streaming data at 10K events/second, with anomaly detection powered by Transformer models. Data is stored in PostgreSQL for structured queries and Neo4j for relationship mapping between fluidic channels.',
    techStack: ['Python', 'PostgreSQL', 'Neo4j', 'Apache Kafka', 'Transformers'],
    highlights: [
      '10K events/second real-time processing',
      '99.7% anomaly detection rate',
      'Deployed across 3 research labs',
    ],
    links: [{ label: 'Repository', url: '#' }],
    icon: Microscope,
    expReward: 3200,
  },
  {
    id: 'edu-platform',
    title: 'Interactive Coding Education Platform',
    category: 'Full-Stack / Education',
    difficulty: 'S',
    status: 'active',
    description:
      'A gamified, interactive platform teaching the next generation of developers through quest-based learning.',
    longDescription:
      'Currently architecting a visionary interactive coding education platform that turns learning to code into an RPG. Students complete quests, earn EXP, unlock skill trees, and tackle real-world projects. The platform uses Next.js for the frontend, PostgreSQL for persistence, and a custom code execution sandbox for real-time feedback.',
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    highlights: [
      'RPG-style quest system with branching skill trees',
      'Real-time code execution sandbox',
      '500+ beta students with 89% completion rate',
    ],
    links: [{ label: 'Beta Access', url: '#' }],
    icon: BookOpen,
    expReward: 6000,
  },
  {
    id: 'graph-forge',
    title: 'GraphForge — Knowledge Graph Engine',
    category: 'Backend / Database',
    difficulty: 'A',
    status: 'completed',
    description:
      'A Neo4j-powered knowledge graph engine for mapping research paper relationships.',
    longDescription:
      'GraphForge is a knowledge graph engine that ingests research papers, extracts entities and relationships using NLP, and maps them into a Neo4j graph database. Researchers can query connections between molecules, methods, and findings across millions of papers using Cypher. Built during the Ph.D. to accelerate literature review.',
    techStack: ['Python', 'Neo4j', 'TypeScript', 'Transformers', 'FastAPI'],
    highlights: [
      'Indexed 2M+ research papers',
      'Sub-second graph queries across millions of nodes',
      'Reduced literature review time by 70%',
    ],
    links: [{ label: 'Repository', url: '#' }],
    icon: Database,
    expReward: 3800,
  },
  {
    id: 'hpo-optimizer',
    title: 'Optuna-Enhanced HPO Orchestrator',
    category: 'AI / DevOps',
    difficulty: 'B',
    status: 'completed',
    description:
      'A distributed hyperparameter optimization orchestrator built on top of Optuna.',
    longDescription:
      'A distributed orchestration layer for Optuna that enables researchers to run Bayesian hyperparameter optimization across GPU clusters with live dashboards. Features pruning strategies, multi-objective optimization, and experiment versioning. Used internally across the research lab for all ML model training.',
    techStack: ['Python', 'Optuna', 'Docker', 'PostgreSQL', 'Redis'],
    highlights: [
      'Distributed across 8 GPU nodes',
      '3x faster convergence vs. random search',
      'Live experiment dashboard with real-time metrics',
    ],
    links: [{ label: 'Repository', url: '#' }],
    icon: Zap,
    expReward: 2400,
  },
];

export const terminalCommands: TerminalCommand[] = [
  {
    command: 'whoami',
    description: 'Display character identity',
    output: [
      'kaelen_vance',
      '',
      'Dr. Kaelen "Cipher" Vance',
      'Senior Nanoinformatics Researcher & Full-Stack Architect',
      'Class: Cyber-Academic Sage | Level: 99',
      '',
      '"I bridge the molecular and the digital — one quest at a time."',
    ],
  },
  {
    command: 'sudo nano',
    description: 'Enter the nanoscale realm',
    output: [
      '[sudo] password for kaelen: ********',
      '',
      'Accessing nanoscale interface...',
      '┌─────────────────────────────────────────────┐',
      '│  MOLECULAR WORKBENCH v9.9.9                 │',
      '│  RDKit: loaded | PubChemPy: connected       │',
      '│  Optuna trials: 13,370 | Best AUC: 0.97    │',
      '│  Status: All systems nominal                │',
      '└─────────────────────────────────────────────┘',
      '',
      'Warning: Reality is merely a simulation at this scale.',
    ],
  },
  {
    command: 'ls -la /skills',
    description: 'List all equipped skills',
    output: [
      'total 16',
      'drwxr-xr-x  2 kaelen  staff  4096 Oct  2 10:00 .',
      'drwxr-xr-x  1 kaelen  staff  4096 Oct  2 10:00 ..',
      '-rwxr-xr-x  1 kaelen  staff  95%   TypeScript.tsx',
      '-rwxr-xr-x  1 kaelen  staff  93%   NextJS.tsx',
      '-rwxr-xr-x  1 kaelen  staff  92%   Python.py',
      '-rwxr-xr-x  1 kaelen  staff  89%   MolecularModeling.py',
      '-rwxr-xr-x  1 kaelen  staff  88%   RDKit.py',
      '-rwxr-xr-x  1 kaelen  staff  82%   Neo4j.cql',
      '-rwxr-xr-x  1 kaelen  staff  78%   C.c',
      '',
      '8 skills equipped. Skill tree: MAXED.',
    ],
  },
  {
    command: 'cat /lore/origin.txt',
    description: 'Read the origin story',
    output: [
      '═══════════════════════════════════════════════',
      '           THE ORIGIN STORY                     ',
      '═══════════════════════════════════════════════',
      '',
      'Year 2012: A young adventurer enters POLBAN,    ',
      'wielding nothing but curiosity and a laptop.    ',
      '',
      'Year 2017: The MEXT Scholarship is granted.     ',
      'Our hero crosses the sea to Japan, entering      ',
      'the realm of nanoinformatics.                   ',
      '',
      'Year 2019: The Ph.D. quest begins. Molecular    ',
      'modeling, biosensing, and AI become the weapons ',
      'of choice.                                      ',
      '',
      'Year 2023: Doctorate achieved. Now teaching     ',
      'the next generation and building the ultimate   ',
      'coding education platform.                      ',
      '',
      'The quest continues...',
    ],
  },
  {
    command: 'help',
    description: 'Show available commands',
    output: [
      'Available commands:',
      '  whoami          Display character identity',
      '  sudo nano       Enter the nanoscale realm',
      '  ls -la /skills  List all equipped skills',
      '  cat /lore/origin.txt  Read the origin story',
      '  help            Show this help message',
      '  clear           Clear the terminal',
      '',
      'Tip: Try typing any of the commands above.',
    ],
  },
];
