import { RewardItem } from '../types';

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: 'frame-neon-lime',
    name: 'Lime Spark Frame',
    description: 'Vibrant energetic neon outline for your profile avatar.',
    category: 'frame',
    costPoints: 80,
    isUnlocked: true,
    icon: 'Sparkles',
    value: 'ring-2 ring-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.35)]'
  },
  {
    id: 'frame-cyan-flow',
    name: 'Electric Cyan Frame',
    description: 'Crisp futuristic cyan aura that glows around your avatar.',
    category: 'frame',
    costPoints: 120,
    isUnlocked: false,
    icon: 'Zap',
    value: 'ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)]'
  },
  {
    id: 'frame-amber-gold',
    name: 'Champion Gold Frame',
    description: 'Prestige golden border celebrating your commitment.',
    category: 'frame',
    costPoints: 200,
    isUnlocked: false,
    icon: 'Award',
    value: 'ring-2 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
  },
  {
    id: 'title-consistency-pioneer',
    name: 'Title: "Consistency Pioneer"',
    description: 'Displays a badge honoring your steady habit rhythm on your profile.',
    category: 'title',
    costPoints: 100,
    isUnlocked: false,
    icon: 'ShieldCheck',
    value: 'Consistency Pioneer'
  },
  {
    id: 'title-mobility-guru',
    name: 'Title: "Joint Freedom Master"',
    description: 'Displays your dedication to supple joints and mindful movement.',
    category: 'title',
    costPoints: 150,
    isUnlocked: false,
    icon: 'Activity',
    value: 'Joint Freedom Master'
  },
  {
    id: 'theme-lime-default',
    name: 'Athletic Lime Theme',
    description: 'FitQuest signature sporty dark charcoal with electric lime accents.',
    category: 'theme',
    costPoints: 0,
    isUnlocked: true,
    icon: 'Palette',
    value: 'lime'
  },
  {
    id: 'theme-electric-cyan',
    name: 'Glacier Blue Theme',
    description: 'Ice cool cyan accents with deep midnight surfaces.',
    category: 'theme',
    costPoints: 160,
    isUnlocked: false,
    icon: 'Moon',
    value: 'cyan'
  }
];
