import { DailyChallenge } from '../types';

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'quest-7day-movement',
    title: 'The 7-Day Movement Quest',
    description: 'Complete one suitable movement session on 5 different days during this week. Consistency is your superpower.',
    type: 'consistency',
    difficulty: 'beginner',
    targetCount: 5,
    currentCount: 1,
    unit: 'days',
    rewardPoints: 100,
    estimatedDuration: '5-10 min/day',
    isCompleted: false,
    alternativeTitle: 'The Gentle Habit Spark',
    alternativeDesc: 'Log 3 gentle movement or mobility days this week at whatever pace feels good.'
  },
  {
    id: 'quest-daily-mobility-ritual',
    title: '5-Minute Morning Mobility Ritual',
    description: 'Complete a quick mobility or recovery routine to loosen your spine and hips before sitting down.',
    type: 'movement',
    difficulty: 'beginner',
    targetCount: 1,
    currentCount: 0,
    unit: 'session',
    rewardPoints: 40,
    estimatedDuration: '5 mins',
    isCompleted: false,
    alternativeTitle: 'Gentle Neck & Shoulder Release',
    alternativeDesc: 'Spend 3 minutes rotating your wrists, neck, and rolling shoulders back.'
  },
  {
    id: 'quest-squat-mastery',
    title: 'Comfortable Squat Mastery',
    description: 'Perform 15 comfortable bodyweight or chair-assisted squats focusing on steady breathing and proud posture.',
    type: 'movement',
    difficulty: 'beginner',
    targetCount: 15,
    currentCount: 0,
    unit: 'reps',
    rewardPoints: 35,
    estimatedDuration: '3 mins',
    isCompleted: false,
    alternativeTitle: 'Gentle Glute Bridges',
    alternativeDesc: 'Perform 10 floor glute bridges instead for zero knee impact.'
  },
  {
    id: 'quest-brain-arena-scholar',
    title: 'FitQuest Brain Scholar',
    description: 'Answer 3 fitness knowledge questions in the Brain Arena to strengthen your fitness intuition.',
    type: 'knowledge',
    difficulty: 'beginner',
    targetCount: 3,
    currentCount: 0,
    unit: 'questions',
    rewardPoints: 30,
    estimatedDuration: '2 mins',
    isCompleted: false,
    alternativeTitle: 'Read 2 Exercise Technique Tips',
    alternativeDesc: 'Review the coaching cues on the wall push-up or bird dog exercise cards.'
  },
  {
    id: 'quest-technique-explorer',
    title: 'Explore an Exercise Modification',
    description: 'During your next workout session, try an easier variation (like wall push-ups or chair squats) with zero ego.',
    type: 'progress',
    difficulty: 'beginner',
    targetCount: 1,
    currentCount: 0,
    unit: 'modification tried',
    rewardPoints: 35,
    estimatedDuration: 'Any workout',
    isCompleted: false,
    alternativeTitle: 'Focus on Slow Controlled Cadence',
    alternativeDesc: 'Slow down your exercise pace by 1 extra second on the lowering phase.'
  }
];
