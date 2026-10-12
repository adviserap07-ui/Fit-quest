import {
  UserProfile,
  UserPreferences,
  WorkoutSessionRecord,
  QuizAttemptRecord,
  Achievement
} from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';

const STORAGE_KEY = 'fitquest_user_profile_v1';
const ACHIEVEMENTS_KEY = 'fitquest_achievements_v1';
const CHALLENGES_KEY = 'fitquest_challenges_v1';

export const LEVEL_NAMES: Record<number, string> = {
  1: 'Beginner Explorer',
  2: 'Active Starter',
  3: 'Consistency Builder',
  4: 'Fitness Adventurer',
  5: 'FitQuest Champion'
};

export const LEVEL_THRESHOLDS = [0, 120, 280, 500, 900];

export function calculateLevel(points: number): { level: number; name: string; currentXp: number; nextXp: number } {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  const currentFloor = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextFloor = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 500;
  return {
    level,
    name: LEVEL_NAMES[level] || 'FitQuest Champion',
    currentXp: points - currentFloor,
    nextXp: nextFloor - currentFloor
  };
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  fitnessGoal: 'habit_consistency',
  experienceLevel: 'beginner',
  dailyMinutes: '10',
  workoutLocation: 'home',
  equipment: 'none',
  interestedCategories: ['full_body', 'beginner', 'mobility'],
  avoidExercises: [],
  soundEnabled: true,
  hapticFeedback: true,
  notificationsEnabled: true,
  notificationTime: '08:30',
  privacyPublic: true
};

export const DEFAULT_PROFILE: UserProfile = {
  id: 'user_local_1',
  name: 'Alex Rivera',
  email: 'alex.fitness@example.com',
  avatarId: 'avatar_lightning',
  selectedFrameId: 'frame-neon-lime',
  activeThemeId: 'theme-lime-default',
  fitPoints: 125,
  currentStreak: 2,
  longestStreak: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  level: 2,
  completedWorkoutsCount: 1,
  totalActiveMinutes: 12,
  preferences: DEFAULT_PREFERENCES,
  history: [
    {
      id: 'session-demo-1',
      workoutId: 'beginner-full-body',
      workoutTitle: 'Beginner Full Body Foundation',
      completedAt: new Date(Date.now() - 86400000).toISOString(),
      durationSeconds: 610,
      exercisesCount: 6,
      pointsEarned: 75
    }
  ],
  quizAttempts: [],
  unlockedAchievements: ['first-step'],
  unlockedRewards: ['frame-neon-lime', 'theme-lime-default'],
  completedChallenges: [],
  joinedDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]
};

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...(parsed.preferences || {})
      }
    };
  } catch (err) {
    console.warn('Error reading stored profile, falling back to default:', err);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
  }
}

export function getStoredAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) {
      // mark initial
      const initial = INITIAL_ACHIEVEMENTS.map(a =>
        a.id === 'first-step' ? { ...a, unlockedAt: new Date().toISOString() } : a
      );
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch (err) {
    console.error('Failed to save achievements:', err);
  }
}

export function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = profile.lastActiveDate;

  if (lastActive === today) {
    return profile;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newStreak = profile.currentStreak;

  if (lastActive === yesterday) {
    newStreak += 1;
  } else {
    // missed a day, restart at 1
    newStreak = 1;
  }

  const longestStreak = Math.max(newStreak, profile.longestStreak);

  const updated: UserProfile = {
    ...profile,
    currentStreak: newStreak,
    longestStreak,
    lastActiveDate: today
  };
  saveProfile(updated);
  return updated;
}

export function checkAndUnlockAchievements(
  profile: UserProfile,
  onUnlock?: (achievement: Achievement) => void
): { updatedProfile: UserProfile; newlyUnlocked: Achievement[] } {
  const allAchievements = getStoredAchievements();
  const newlyUnlocked: Achievement[] = [];
  const currentUnlockedIds = new Set(profile.unlockedAchievements);

  allAchievements.forEach(ach => {
    if (currentUnlockedIds.has(ach.id)) return;

    let shouldUnlock = false;

    if (ach.id === 'first-step' && profile.completedWorkoutsCount >= 1) {
      shouldUnlock = true;
    } else if (ach.id === 'quiz-explorer' && profile.quizAttempts.length >= 5) {
      shouldUnlock = true;
    } else if (ach.id === 'consistency-starter' && profile.currentStreak >= 3) {
      shouldUnlock = true;
    } else if (ach.id === 'knowledge-seeker' && profile.quizAttempts.length >= 10) {
      shouldUnlock = true;
    } else if (ach.id === 'movement-master' && profile.completedWorkoutsCount >= 5) {
      shouldUnlock = true;
    } else if (ach.id === 'time-investor' && profile.totalActiveMinutes >= 60) {
      shouldUnlock = true;
    } else if (ach.id === 'mobility-guardian' && profile.history.filter(h => h.workoutId.includes('mobility') || h.workoutId.includes('unwind')).length >= 2) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      ach.unlockedAt = new Date().toISOString();
      newlyUnlocked.push(ach);
      currentUnlockedIds.add(ach.id);
      if (onUnlock) onUnlock(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    saveAchievements(allAchievements);
    const bonusPoints = newlyUnlocked.reduce((sum, a) => sum + a.pointsReward, 0);
    const updatedProfile: UserProfile = {
      ...profile,
      fitPoints: profile.fitPoints + bonusPoints,
      unlockedAchievements: Array.from(currentUnlockedIds),
      level: calculateLevel(profile.fitPoints + bonusPoints).level
    };
    saveProfile(updatedProfile);
    return { updatedProfile, newlyUnlocked };
  }

  return { updatedProfile: profile, newlyUnlocked: [] };
}
