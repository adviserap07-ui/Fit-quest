import { Exercise } from '../types';

export const EXERCISES: Record<string, Exercise> = {
  'squats': {
    id: 'squats',
    name: 'Bodyweight Squats',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    category: 'lower_body',
    defaultReps: 12,
    defaultDurationSec: 40,
    instructions: [
      'Stand with feet shoulder-width apart, toes pointing slightly outward.',
      'Hinge at your hips and bend your knees, lowering as if sitting into an invisible chair.',
      'Keep your chest proud and spine neutral until thighs are roughly parallel to the floor.',
      'Push firmly through your whole foot to return to the starting position.'
    ],
    coachingTips: [
      'Keep your heels glued to the floor.',
      'Track your knees in line with your middle toes.',
      'Breathe in on the way down, exhale as you stand up.'
    ],
    modificationEasier: 'Chair-Assisted Squats: Sit down gently onto a sturdy chair and stand back up.',
    modificationHarder: 'Pause Squats: Hold the bottom position for 2 full seconds before standing.',
    safetyReminder: 'Do not let your knees collapse inward. Lower only as far as comfortable without knee discomfort.',
    animationType: 'squat'
  },
  'wall-pushups': {
    id: 'wall-pushups',
    name: 'Wall Push-Ups',
    targetMuscles: ['Chest', 'Anterior Shoulders', 'Triceps', 'Core'],
    category: 'upper_body',
    defaultReps: 10,
    defaultDurationSec: 35,
    instructions: [
      'Stand facing a sturdy wall about an arm’s length away.',
      'Place palms flat on the wall slightly wider than shoulder-width, at chest height.',
      'Bend elbows to bring your chest closer to the wall in a smooth, controlled motion.',
      'Press through your palms to return to arms extended without locking elbows.'
    ],
    coachingTips: [
      'Maintain a straight line from head to heels.',
      'Keep elbows at roughly a 45-degree angle rather than flaring wide.'
    ],
    modificationEasier: 'Step closer to the wall to decrease the angle and bodyweight resistance.',
    modificationHarder: 'Incline Push-ups on a sturdy kitchen counter or tabletop.',
    safetyReminder: 'Ensure your feet are on a non-slip surface so you do not slide.',
    animationType: 'wall_pushup'
  },
  'pushups': {
    id: 'pushups',
    name: 'Standard Push-Ups',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    category: 'upper_body',
    defaultReps: 10,
    defaultDurationSec: 35,
    instructions: [
      'Start in a high plank position with hands directly under or slightly outside shoulders.',
      'Keep your core braced and glutes tight so your body forms a straight line.',
      'Lower your chest toward the floor, keeping elbows at a 45-degree angle to your ribs.',
      'Push the ground away strongly to return to the top plank position.'
    ],
    coachingTips: [
      'Do not let your lower back sag or your hips pike up.',
      'Keep your neck neutral by gazing slightly ahead on the floor.'
    ],
    modificationEasier: 'Knee Push-Ups: Rest your knees on an exercise mat to reduce load.',
    modificationHarder: 'Tempo Push-Ups: Take 3 seconds to lower down and 1 second to explode up.',
    safetyReminder: 'Stop if you feel sharp pain in the front of your shoulders or wrists.',
    animationType: 'pushup'
  },
  'bird-dog': {
    id: 'bird-dog',
    name: 'Bird Dog',
    targetMuscles: ['Lower Back', 'Glutes', 'Core', 'Hamstrings'],
    category: 'core',
    defaultReps: 10,
    defaultDurationSec: 40,
    instructions: [
      'Begin on all fours on a comfortable mat, hands under shoulders and knees under hips.',
      'Simultaneously reach your right arm straight forward and left leg straight backward.',
      'Hold the extended position for a full 2-second pause while keeping hips level.',
      'Return to the starting position and repeat on the opposite side.'
    ],
    coachingTips: [
      'Imagine balancing a cup of water on your lower back—do not let hips tilt.',
      'Reach with your fingertips and press out through your heel.'
    ],
    modificationEasier: 'Extend only one limb at a time (arm only, then leg only).',
    modificationHarder: 'Add a 4-second hold at top extension with a light pulse.',
    safetyReminder: 'Avoid arching your lower back excessively when raising your leg.',
    animationType: 'bird_dog'
  },
  'plank': {
    id: 'plank',
    name: 'Forearm Plank',
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Shoulders', 'Glutes'],
    category: 'core',
    defaultDurationSec: 30,
    instructions: [
      'Place forearms on the floor with elbows directly under shoulders.',
      'Extend legs straight back, resting on the balls of your feet.',
      'Engage your abdominal wall and squeeze your glutes.',
      'Hold steady, maintaining a flat back and calm, continuous breathing.'
    ],
    coachingTips: [
      'Pull your belly button gently toward your spine.',
      'Press your forearms firmly into the floor so your shoulder blades stay stable.'
    ],
    modificationEasier: 'Kneeling Plank: Lower knees to the floor while maintaining a straight torso.',
    modificationHarder: 'Plank with alternating foot lifts (hold each lift for 2 seconds).',
    safetyReminder: 'If your lower back begins to pinch or sag, rest immediately or switch to kneeling.',
    animationType: 'plank'
  },
  'marching-in-place': {
    id: 'marching-in-place',
    name: 'Marching in Place',
    targetMuscles: ['Hip Flexors', 'Quadriceps', 'Calves', 'Cardiovascular System'],
    category: 'cardio',
    defaultDurationSec: 45,
    instructions: [
      'Stand tall with feet hip-width apart and arms relaxed at your sides.',
      'Lift your right knee toward hip height while pumping your opposite left arm forward.',
      'Lower smoothly and immediately lift the left knee with the right arm.',
      'Keep a steady, rhythmic cadence and gentle footsteps.'
    ],
    coachingTips: [
      'Stay light on your feet without stomping.',
      'Keep your chest upright and breathe in through your nose, out through your mouth.'
    ],
    modificationEasier: 'Low March: Lift knees only 3 to 4 inches off the floor at a gentle pace.',
    modificationHarder: 'High Knees: Increase tempo and drive knees up to waist height with light bounce.',
    safetyReminder: 'If balance feels unsteady, keep one hand lightly touching a stable wall or chair back.',
    animationType: 'march_in_place'
  },
  'glute-bridges': {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    targetMuscles: ['Glutes', 'Hamstrings', 'Core'],
    category: 'lower_body',
    defaultReps: 12,
    defaultDurationSec: 40,
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Rest your arms at your sides with palms facing down.',
      'Squeeze your glutes and push through your heels to lift hips toward the ceiling.',
      'Form a straight diagonal line from knees to shoulders, pause, then lower gently.'
    ],
    coachingTips: [
      'Focus on contracting your glute muscles at the top, not straining your lower back.',
      'Keep ribs pulled down rather than flaring your ribcage.'
    ],
    modificationEasier: 'Smaller range of motion: Lift hips halfway and pause.',
    modificationHarder: 'Single-leg Glute Bridge: Extend one leg straight in the air while bridging.',
    safetyReminder: 'Do not overextend your lower back past a natural straight line.',
    animationType: 'glute_bridge'
  },
  'standing-knee-raises': {
    id: 'standing-knee-raises',
    name: 'Standing Knee-to-Elbow',
    targetMuscles: ['Obliques', 'Hip Flexors', 'Core', 'Balance'],
    category: 'core',
    defaultReps: 12,
    defaultDurationSec: 40,
    instructions: [
      'Stand with feet shoulder-width apart, fingertips gently touching the sides of your head.',
      'Shift weight onto your left leg and lift your right knee diagonally across your body.',
      'Rotate your torso slightly so your left elbow meets or nears your right knee.',
      'Return to center with control and repeat on the opposite side.'
    ],
    coachingTips: [
      'Focus on crunching with your abdominal obliques rather than pulling on your neck.',
      'Move with control rather than swinging your body.'
    ],
    modificationEasier: 'Perform simple standing knee raises without the torso rotation.',
    modificationHarder: 'Add a 1-second squeeze at the apex of each knee lift.',
    safetyReminder: 'Never pull forward on your head or neck with your hands.',
    animationType: 'knee_raises'
  },
  'cat-cow': {
    id: 'cat-cow',
    name: 'Cat-Cow Mobility',
    targetMuscles: ['Spine Mobility', 'Neck', 'Thoracic Spine', 'Core'],
    category: 'mobility',
    defaultDurationSec: 45,
    instructions: [
      'Start on hands and knees with wrists under shoulders and knees under hips.',
      'Cow: Inhale, gently drop your belly toward the floor, lift your chest and look forward.',
      'Cat: Exhale, round your spine upward toward the sky, tucking chin gently toward chest.',
      'Flow smoothly between both positions following your natural breathing rhythm.'
    ],
    coachingTips: [
      'Move fluidly like a wave through each vertebrae.',
      'Never force your neck into extreme extension.'
    ],
    modificationEasier: 'Seated Cat-Cow: Perform the forward and backward spinal curve seated on a chair.',
    safetyReminder: 'Keep movements smooth and pain-free. If any pinch occurs, decrease range of motion.',
    animationType: 'cat_cow'
  },
  'child-pose': {
    id: 'child-pose',
    name: 'Child’s Pose Stretch',
    targetMuscles: ['Lower Back', 'Hips', 'Shoulders', 'Lats'],
    category: 'recovery',
    defaultDurationSec: 45,
    instructions: [
      'Kneel on the floor with big toes touching and knees comfortably spread wide.',
      'Sit your hips back toward your heels and walk your hands forward along the mat.',
      'Rest your forehead gently on the mat and relax your shoulders.',
      'Take slow, deep diaphragmatic breaths, feeling your back ribs expand.'
    ],
    coachingTips: [
      'Allow gravity to release tension in your hips and lower back.',
      'Breathe deeply into your lower abdomen.'
    ],
    modificationEasier: 'Place a folded blanket or cushion between your calves and thighs to relieve knee flexion.',
    safetyReminder: 'If you have acute knee discomfort, avoid forcing your hips all the way to your heels.',
    animationType: 'child_pose'
  },
  'shoulder-taps': {
    id: 'shoulder-taps',
    name: 'Plank Shoulder Taps',
    targetMuscles: ['Core', 'Shoulders', 'Obliques', 'Rotator Cuff'],
    category: 'core',
    defaultDurationSec: 35,
    defaultReps: 12,
    instructions: [
      'Start in a high plank position with feet slightly wider than hip-width for balance.',
      'Engage your abdominal muscles to keep your pelvis completely still.',
      'Slowly lift your right hand to tap your left shoulder, then place it back down.',
      'Repeat with your left hand tapping your right shoulder.'
    ],
    coachingTips: [
      'The goal is anti-rotation: do not let your hips rock from side to side.',
      'A wider foot stance gives you greater stability.'
    ],
    modificationEasier: 'Perform the taps from your knees or with hands elevated on a couch or chair.',
    modificationHarder: 'Narrow your feet together or pause for 2 seconds on each shoulder tap.',
    safetyReminder: 'Keep your wrists directly below your shoulders to prevent wrist strain.',
    animationType: 'shoulder_taps'
  },
  'reverse-lunges': {
    id: 'reverse-lunges',
    name: 'Step-Back Lunges',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    category: 'lower_body',
    defaultReps: 10,
    defaultDurationSec: 40,
    instructions: [
      'Stand tall with feet hip-width apart and hands on hips.',
      'Take a controlled step backward with your right foot and bend both knees.',
      'Lower until your front thigh is nearly parallel to the floor and back knee hovers above the ground.',
      'Drive through your front heel to step back to the starting position.'
    ],
    coachingTips: [
      'Stepping backward is much gentler on the front knee than stepping forward.',
      'Keep your torso tall and vertical throughout the movement.'
    ],
    modificationEasier: 'Hold onto a wall or chair back for balance and take a shallower step.',
    modificationHarder: 'Add a 2-second isometric hold at the bottom of each lunge.',
    safetyReminder: 'Do not let your front knee track past your toes or collapse inward.',
    animationType: 'lunges'
  }
};
