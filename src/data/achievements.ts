import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Completed your very first guided workout session on FitQuest.',
    iconName: 'Footprints',
    category: 'workout',
    unlockedAt: null,
    requirementDesc: 'Complete 1 workout',
    pointsReward: 50
  },
  {
    id: 'quiz-explorer',
    title: 'Quiz Explorer',
    description: 'Tackled 5 fitness quizzes in the Brain Arena and learned key recovery facts.',
    iconName: 'Brain',
    category: 'quiz',
    unlockedAt: null,
    requirementDesc: 'Complete 5 quiz questions',
    pointsReward: 40
  },
  {
    id: 'consistency-starter',
    title: 'Consistency Starter',
    description: 'Exercised on 3 separate days in one week, showing real habit rhythm.',
    iconName: 'CalendarCheck',
    category: 'streak',
    unlockedAt: null,
    requirementDesc: 'Active on 3 days this week',
    pointsReward: 75
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Answered 10 fitness questions across nutrition, technique, and safety.',
    iconName: 'Sparkles',
    category: 'quiz',
    unlockedAt: null,
    requirementDesc: 'Answer 10 fitness questions',
    pointsReward: 60
  },
  {
    id: 'movement-master',
    title: 'Movement Master',
    description: 'Logged 5 total guided movement sessions with mindful execution.',
    iconName: 'Flame',
    category: 'workout',
    unlockedAt: null,
    requirementDesc: 'Complete 5 total workouts',
    pointsReward: 100
  },
  {
    id: 'comeback-champion',
    title: 'Comeback Champion',
    description: 'Returned to move with curiosity and zero guilt. Every fresh start counts!',
    iconName: 'ShieldCheck',
    category: 'special',
    unlockedAt: null,
    requirementDesc: 'Open app & log activity after rest',
    pointsReward: 45
  },
  {
    id: 'mobility-guardian',
    title: 'Joint Freedom Guardian',
    description: 'Prioritized gentle mobility and spinal decompress sessions.',
    iconName: 'Activity',
    category: 'workout',
    unlockedAt: null,
    requirementDesc: 'Complete 2 mobility/recovery workouts',
    pointsReward: 50
  },
  {
    id: 'time-investor',
    title: 'Active Hour Milestone',
    description: 'Invested over 60 active minutes into your health and vitality.',
    iconName: 'Clock',
    category: 'points',
    unlockedAt: null,
    requirementDesc: 'Accumulate 60 active minutes',
    pointsReward: 80
  }
];
