export type FitnessGoal =
  | 'build_strength'
  | 'improve_stamina'
  | 'improve_mobility'
  | 'habit_consistency'
  | 'overall_fitness';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutDurationPref = '5' | '10' | '15' | '20' | '30';

export type WorkoutLocation = 'home' | 'outdoors' | 'gym';

export type EquipmentOption = 'none' | 'resistance_bands' | 'dumbbells' | 'other';

export type WorkoutCategory =
  | 'full_body'
  | 'upper_body'
  | 'lower_body'
  | 'core'
  | 'cardio'
  | 'mobility'
  | 'beginner'
  | 'short'
  | 'recovery';

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string[];
  category: WorkoutCategory;
  defaultDurationSec?: number;
  defaultReps?: number;
  instructions: string[];
  coachingTips: string[];
  modificationEasier: string;
  modificationHarder?: string;
  safetyReminder: string;
  animationType:
    | 'squat'
    | 'pushup'
    | 'wall_pushup'
    | 'plank'
    | 'jumping_jacks'
    | 'lunges'
    | 'glute_bridge'
    | 'bird_dog'
    | 'knee_raises'
    | 'cat_cow'
    | 'shoulder_taps'
    | 'march_in_place'
    | 'child_pose'
    | 'side_plank'
    | 'dead_bug';
}

export interface WorkoutExercise {
  exerciseId: string;
  durationSec?: number;
  reps?: number;
  restAfterSec: number;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  category: WorkoutCategory;
  difficulty: ExperienceLevel;
  estimatedMinutes: number;
  requiredEquipment: string;
  pointsReward: number;
  exercises: WorkoutExercise[];
  tags: string[];
}

export type ChallengeType = 'movement' | 'consistency' | 'knowledge' | 'progress';

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ExperienceLevel;
  targetCount: number;
  currentCount: number;
  unit: string;
  rewardPoints: number;
  estimatedDuration: string;
  isCompleted: boolean;
  alternativeTitle?: string;
  alternativeDesc?: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  practicalTip: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'workout' | 'quiz' | 'streak' | 'points' | 'special';
  unlockedAt: string | null;
  requirementDesc: string;
  pointsReward: number;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  category: 'frame' | 'theme' | 'badge_flair' | 'title';
  costPoints: number;
  isUnlocked: boolean;
  icon: string;
  value: string;
}

export interface UserPreferences {
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  dailyMinutes: WorkoutDurationPref;
  workoutLocation: WorkoutLocation;
  equipment: EquipmentOption;
  interestedCategories: WorkoutCategory[];
  avoidExercises: string[];
  soundEnabled: boolean;
  hapticFeedback: boolean;
  notificationsEnabled: boolean;
  notificationTime: string;
  privacyPublic: boolean;
}

export interface WorkoutSessionRecord {
  id: string;
  workoutId: string;
  workoutTitle: string;
  completedAt: string;
  durationSeconds: number;
  exercisesCount: number;
  pointsEarned: number;
}

export interface QuizAttemptRecord {
  id: string;
  questionId: string;
  isCorrect: boolean;
  attemptedAt: string;
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarId: string;
  selectedFrameId?: string;
  activeThemeId?: string;
  fitPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  level: number;
  completedWorkoutsCount: number;
  totalActiveMinutes: number;
  preferences: UserPreferences;
  history: WorkoutSessionRecord[];
  quizAttempts: QuizAttemptRecord[];
  unlockedAchievements: string[];
  unlockedRewards: string[];
  completedChallenges: string[];
  joinedDate: string;
}

export type ActiveTab = 'home' | 'workouts' | 'challenges' | 'brain' | 'progress';
