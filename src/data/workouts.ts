import { Workout } from '../types';

export const WORKOUTS: Workout[] = [
  {
    id: 'beginner-full-body',
    title: 'Beginner Full Body Foundation',
    description: 'An approachable, zero-intimidation routine activating all major muscle groups with gentle joints and clear form cues.',
    category: 'beginner',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    requiredEquipment: 'No equipment (sturdy chair optional)',
    pointsReward: 75,
    tags: ['Beginner', 'Full Body', 'Zero Equipment'],
    exercises: [
      { exerciseId: 'marching-in-place', durationSec: 30, restAfterSec: 15 },
      { exerciseId: 'wall-pushups', reps: 10, restAfterSec: 20 },
      { exerciseId: 'squats', reps: 10, restAfterSec: 20 },
      { exerciseId: 'bird-dog', reps: 8, restAfterSec: 20 },
      { exerciseId: 'standing-knee-raises', reps: 10, restAfterSec: 20 },
      { exerciseId: 'cat-cow', durationSec: 35, restAfterSec: 0 }
    ]
  },
  {
    id: 'quick-5m-energizer',
    title: '5-Minute Midday Energizer',
    description: 'Short on time? A brisk 5-minute booster designed to shake off fatigue, oxygenate your mind, and revive posture.',
    category: 'short',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    requiredEquipment: 'None',
    pointsReward: 50,
    tags: ['Short', 'Express', 'Desk Break'],
    exercises: [
      { exerciseId: 'marching-in-place', durationSec: 30, restAfterSec: 10 },
      { exerciseId: 'squats', reps: 10, restAfterSec: 15 },
      { exerciseId: 'wall-pushups', reps: 10, restAfterSec: 15 },
      { exerciseId: 'standing-knee-raises', reps: 10, restAfterSec: 15 },
      { exerciseId: 'cat-cow', durationSec: 30, restAfterSec: 0 }
    ]
  },
  {
    id: 'core-stability-essentials',
    title: 'Core Stability & Spine Shield',
    description: 'Protect your lower back and build deep abdominal endurance without a single sit-up or neck strain.',
    category: 'core',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    requiredEquipment: 'Mat or soft floor',
    pointsReward: 60,
    tags: ['Core', 'Spine Health', 'Posture'],
    exercises: [
      { exerciseId: 'bird-dog', reps: 10, restAfterSec: 15 },
      { exerciseId: 'plank', durationSec: 25, restAfterSec: 20 },
      { exerciseId: 'glute-bridges', reps: 12, restAfterSec: 15 },
      { exerciseId: 'shoulder-taps', reps: 10, restAfterSec: 20 },
      { exerciseId: 'standing-knee-raises', reps: 12, restAfterSec: 0 }
    ]
  },
  {
    id: 'lower-body-tone-balance',
    title: 'Lower Body Strength & Balance',
    description: 'Tone your legs, reinforce knees, and strengthen glutes with controlled bodyweight movements.',
    category: 'lower_body',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    requiredEquipment: 'None',
    pointsReward: 85,
    tags: ['Lower Body', 'Glutes & Legs', 'Balance'],
    exercises: [
      { exerciseId: 'squats', reps: 12, restAfterSec: 20 },
      { exerciseId: 'reverse-lunges', reps: 10, restAfterSec: 20 },
      { exerciseId: 'glute-bridges', reps: 12, restAfterSec: 20 },
      { exerciseId: 'squats', reps: 12, restAfterSec: 20 },
      { exerciseId: 'marching-in-place', durationSec: 40, restAfterSec: 15 },
      { exerciseId: 'child-pose', durationSec: 40, restAfterSec: 0 }
    ]
  },
  {
    id: 'upper-body-power-control',
    title: 'Upper Body Tone & Posture',
    description: 'Open tight chest muscles, strengthen shoulders, and build tricep and back control without heavy weights.',
    category: 'upper_body',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    requiredEquipment: 'Wall or mat',
    pointsReward: 70,
    tags: ['Upper Body', 'Posture', 'Arms & Chest'],
    exercises: [
      { exerciseId: 'wall-pushups', reps: 12, restAfterSec: 15 },
      { exerciseId: 'shoulder-taps', reps: 12, restAfterSec: 20 },
      { exerciseId: 'pushups', reps: 8, restAfterSec: 25 },
      { exerciseId: 'bird-dog', reps: 10, restAfterSec: 15 },
      { exerciseId: 'child-pose', durationSec: 40, restAfterSec: 0 }
    ]
  },
  {
    id: 'cardio-low-impact-flow',
    title: 'Low-Impact Cardio Sweat',
    description: 'Get your heart pumping, boost stamina, and burn energy with quiet, apartment-friendly, no-jump movements.',
    category: 'cardio',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    requiredEquipment: 'None',
    pointsReward: 70,
    tags: ['Cardio', 'Low Impact', 'Apartment Friendly'],
    exercises: [
      { exerciseId: 'marching-in-place', durationSec: 40, restAfterSec: 15 },
      { exerciseId: 'standing-knee-raises', reps: 14, restAfterSec: 15 },
      { exerciseId: 'squats', reps: 12, restAfterSec: 20 },
      { exerciseId: 'marching-in-place', durationSec: 40, restAfterSec: 15 },
      { exerciseId: 'shoulder-taps', reps: 12, restAfterSec: 20 },
      { exerciseId: 'cat-cow', durationSec: 35, restAfterSec: 0 }
    ]
  },
  {
    id: 'mobility-joint-freedom',
    title: 'Total Body Mobility Flow',
    description: 'Release tight hips, decompress the lumbar spine, and regain fluid everyday mobility in under 10 minutes.',
    category: 'mobility',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    requiredEquipment: 'Mat or carpet',
    pointsReward: 60,
    tags: ['Mobility', 'Flexibility', 'Joint Health'],
    exercises: [
      { exerciseId: 'cat-cow', durationSec: 45, restAfterSec: 15 },
      { exerciseId: 'bird-dog', reps: 8, restAfterSec: 15 },
      { exerciseId: 'glute-bridges', reps: 10, restAfterSec: 15 },
      { exerciseId: 'standing-knee-raises', reps: 10, restAfterSec: 15 },
      { exerciseId: 'child-pose', durationSec: 45, restAfterSec: 0 }
    ]
  },
  {
    id: 'recovery-gentle-unwind',
    title: 'Evening Decompress & Restore',
    description: 'A soothing evening movement routine to slow your heart rate, loosen physical stress, and prepare for restful sleep.',
    category: 'recovery',
    difficulty: 'beginner',
    estimatedMinutes: 7,
    requiredEquipment: 'Mat or bed',
    pointsReward: 50,
    tags: ['Recovery', 'Stress Relief', 'Gentle'],
    exercises: [
      { exerciseId: 'cat-cow', durationSec: 45, restAfterSec: 15 },
      { exerciseId: 'child-pose', durationSec: 45, restAfterSec: 15 },
      { exerciseId: 'glute-bridges', reps: 8, restAfterSec: 15 },
      { exerciseId: 'child-pose', durationSec: 45, restAfterSec: 0 }
    ]
  },
  {
    id: 'full-body-athletic-challenge',
    title: 'Full Body Athletic Conditioning',
    description: 'A solid intermediate full-body circuit designed to build muscular endurance, athletic balance, and core grit.',
    category: 'full_body',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    requiredEquipment: 'None',
    pointsReward: 100,
    tags: ['Athletic', 'Full Body', 'High Stamina'],
    exercises: [
      { exerciseId: 'marching-in-place', durationSec: 45, restAfterSec: 15 },
      { exerciseId: 'pushups', reps: 12, restAfterSec: 25 },
      { exerciseId: 'squats', reps: 15, restAfterSec: 20 },
      { exerciseId: 'reverse-lunges', reps: 12, restAfterSec: 20 },
      { exerciseId: 'plank', durationSec: 35, restAfterSec: 20 },
      { exerciseId: 'shoulder-taps', reps: 14, restAfterSec: 20 },
      { exerciseId: 'glute-bridges', reps: 14, restAfterSec: 15 },
      { exerciseId: 'child-pose', durationSec: 40, restAfterSec: 0 }
    ]
  }
];
