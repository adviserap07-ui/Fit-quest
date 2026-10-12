import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-sensible-approach',
    category: 'Exercise Knowledge',
    question: 'What is the most sensible approach for someone new to exercise?',
    options: [
      'Begin with manageable workouts and progress gradually.',
      'Exercise as hard as possible every day.',
      'Ignore discomfort and continue pushing through pain.',
      'Avoid all rest days to see faster changes.'
    ],
    correctIndex: 0,
    explanation: 'Starting gradually gives muscles, joints, and your nervous system time to adapt safely while you build long-term consistency. You can increase difficulty as confidence grows.',
    practicalTip: 'Consistency beats intensity. Three 10-minute sessions per week that you enjoy will beat one exhausting workout that leaves you sore for a week.',
    difficulty: 'easy'
  },
  {
    id: 'q-cardio-endurance',
    category: 'Exercise Knowledge',
    question: 'Which activity can help improve cardiovascular endurance?',
    options: [
      'Sitting still for extended hours',
      'Walking briskly on a regular basis',
      'Skipping every workout session',
      'Avoiding any elevated heart rate'
    ],
    correctIndex: 1,
    explanation: 'Brisk walking engages large muscle groups, elevates your heart rate to an aerobic zone, and strengthens cardiovascular capacity without placing high impact on your joints.',
    practicalTip: 'Aim for a 15-minute brisk walk after meals. It aids digestion and supports heart health effortlessly.',
    difficulty: 'easy'
  },
  {
    id: 'q-soreness-myth',
    category: 'Fitness Myths',
    question: 'Myth or Fact: If you are not extremely sore the day after a workout, the workout was ineffective.',
    options: [
      'Myth: Soreness is not a mandatory indicator of workout effectiveness.',
      'Fact: You must always be sore to make physical progress.'
    ],
    correctIndex: 0,
    explanation: 'Muscle soreness (DOMS) primarily occurs when you perform novel movements. As your body adapts, soreness diminishes, but your strength and endurance continue to improve.',
    practicalTip: 'Judge your workout by your consistency, form improvement, and how energized you feel, not by how sore you are.',
    difficulty: 'easy'
  },
  {
    id: 'q-hydration-timing',
    category: 'Nutrition Basics',
    question: 'What is the best way to maintain optimal hydration for home workouts?',
    options: [
      'Drink 2 liters of water immediately right before starting your workout.',
      'Sip water steadily throughout the entire day rather than chugging all at once.',
      'Avoid liquids completely so you feel lighter while moving.',
      'Drink only sugary energy drinks during light movement.'
    ],
    correctIndex: 1,
    explanation: 'Steady hydration keeps cellular fluid levels balanced and prevents the stomach sloshing and cramping that happens when you chug large amounts of water right before training.',
    practicalTip: 'Keep a water glass on your desk or bedside table to sip small amounts regularly throughout the day.',
    difficulty: 'easy'
  },
  {
    id: 'q-sleep-recovery',
    category: 'Recovery and Rest',
    question: 'Why is quality sleep critical for muscle recovery and energy levels?',
    options: [
      'Sleep is only for mental relaxation, not physical tissue repair.',
      'Key restorative hormones like growth hormone are released primarily during deep sleep.',
      'Staying awake longer burns more calories and speeds up progress.',
      'Muscles only repair themselves while eating protein, not during sleep.'
    ],
    correctIndex: 1,
    explanation: 'During deep non-REM sleep, blood supply to muscles increases, tissue growth and repair occurs, and energy stores are replenished for the next day.',
    practicalTip: 'Aim for 7 to 9 hours of restorative sleep and dim bright screens 45 minutes before bedtime.',
    difficulty: 'medium'
  },
  {
    id: 'q-squat-technique',
    category: 'Exercise Technique',
    question: 'When performing a standard bodyweight squat, what should you do with your knees?',
    options: [
      'Let your knees cave inward toward each other.',
      'Lock your knees out forcefully at the top.',
      'Track your knees outward in line with your middle toes.',
      'Keep your knees completely rigid and bend only your waist.'
    ],
    correctIndex: 2,
    explanation: 'Tracking knees in line with your second and third toes engages your gluteus medius and prevents shear stress on the knee joint ligaments.',
    practicalTip: 'Think about "screwing your feet into the floor" to create stable hip torque before you sit down into the squat.',
    difficulty: 'medium'
  },
  {
    id: 'q-healthy-habits-trigger',
    category: 'Healthy Habits',
    question: 'Which behavioral strategy makes daily exercise habits easiest to sustain?',
    options: [
      'Relying solely on sudden bursts of intense willpower and motivation.',
      'Habit stacking: pairing your movement session with an already established routine (like morning coffee).',
      'Exercising at completely random times with no plan or cues.',
      'Punishing yourself whenever you miss a planned session.'
    ],
    correctIndex: 1,
    explanation: 'Habit stacking utilizes existing neural pathways. When you attach a 5-minute movement session to something you already do daily, the mental friction to start drops dramatically.',
    practicalTip: 'Try: "After I brew my morning tea, I will complete 5 minutes of mobility before taking my first sip."',
    difficulty: 'easy'
  },
  {
    id: 'q-joint-pain-safety',
    category: 'Fitness Safety',
    question: 'If you feel a sharp, pinching joint pain during an exercise, what is the safest response?',
    options: [
      'Push through it harder to prove mental toughness.',
      'Stop the movement immediately, check form, or switch to a gentle modification.',
      'Double the repetitions to work out the tightness.',
      'Ignore the sensation and increase your speed.'
    ],
    correctIndex: 1,
    explanation: 'Sharp joint pain is a warning signal from your nervous system. Continuing can lead to tendon inflammation or strain. Safe exercise emphasizes muscular effort without joint pain.',
    practicalTip: 'FitQuest offers modifications for every movement. Use chair squats or wall push-ups whenever your joints need a kinder angle.',
    difficulty: 'easy'
  },
  {
    id: 'q-breathing-mechanics',
    category: 'Weekly Fitness Trivia',
    question: 'When performing bodyweight resistance movements, when should you typically exhale?',
    options: [
      'Hold your breath throughout the entire set.',
      'Exhale during the exertion phase (when pushing or standing up).',
      'Inhale only during the hardest part.',
      'Breathing pattern has no effect on core stability or blood pressure.'
    ],
    correctIndex: 1,
    explanation: 'Exhaling on exertion naturally engages the diaphragm and transverse abdominis, stabilizing your spine and preventing sudden spikes in intra-abdominal pressure.',
    practicalTip: 'Remember: "Blow the weight away." When pushing away from the wall or floor, exhale smoothly.',
    difficulty: 'medium'
  },
  {
    id: 'q-spot-reduction-myth',
    category: 'Fitness Myths',
    question: 'Myth or Fact: Doing 100 crunches daily will burn fat specifically from your stomach area.',
    options: [
      'Myth: Spot fat reduction is a biological impossibility through targeted exercises.',
      'Fact: Fat burns directly from whichever muscle is contracting.'
    ],
    correctIndex: 0,
    explanation: 'Fat loss occurs systemically throughout the entire body as a result of overall energy balance and lifestyle, not locally where muscles are flexing.',
    practicalTip: 'Crunches build abdominal muscle strength, but full-body movement and balanced nutrition are what cultivate overall body composition.',
    difficulty: 'easy'
  }
];
