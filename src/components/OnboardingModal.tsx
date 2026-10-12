import React, { useState } from 'react';
import {
  FitnessGoal,
  ExperienceLevel,
  WorkoutDurationPref,
  WorkoutLocation,
  EquipmentOption,
  WorkoutCategory,
  UserPreferences
} from '../types';
import { Check, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { soundEffects } from '../services/audio';

interface Props {
  initialPreferences: UserPreferences;
  userName: string;
  onComplete: (prefs: UserPreferences, name: string) => void;
  onClose: () => void;
}

export const OnboardingModal: React.FC<Props> = ({
  initialPreferences,
  userName,
  onComplete,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(userName || 'Adventurer');

  const [goal, setGoal] = useState<FitnessGoal>(initialPreferences.fitnessGoal);
  const [level, setLevel] = useState<ExperienceLevel>(initialPreferences.experienceLevel);
  const [minutes, setMinutes] = useState<WorkoutDurationPref>(initialPreferences.dailyMinutes);
  const [location, setLocation] = useState<WorkoutLocation>(initialPreferences.workoutLocation);
  const [equipment, setEquipment] = useState<EquipmentOption>(initialPreferences.equipment);
  const [categories, setCategories] = useState<WorkoutCategory[]>(initialPreferences.interestedCategories);
  const [avoidList, setAvoidList] = useState<string[]>(initialPreferences.avoidExercises);

  const toggleCategory = (cat: WorkoutCategory) => {
    soundEffects.playTap();
    if (categories.includes(cat)) {
      if (categories.length > 1) {
        setCategories(categories.filter((c) => c !== cat));
      }
    } else {
      setCategories([...categories, cat]);
    }
  };

  const toggleAvoid = (item: string) => {
    soundEffects.playTap();
    if (item === 'None') {
      setAvoidList([]);
      return;
    }
    if (avoidList.includes(item)) {
      setAvoidList(avoidList.filter((i) => i !== item));
    } else {
      setAvoidList([...avoidList.filter((i) => i !== 'None'), item]);
    }
  };

  const handleNext = () => {
    soundEffects.playTap();
    if (step < 7) {
      setStep(step + 1);
    } else {
      const updatedPrefs: UserPreferences = {
        ...initialPreferences,
        fitnessGoal: goal,
        experienceLevel: level,
        dailyMinutes: minutes,
        workoutLocation: location,
        equipment,
        interestedCategories: categories,
        avoidExercises: avoidList
      };
      onComplete(updatedPrefs, name.trim() || 'Adventurer');
    }
  };

  const handleBack = () => {
    soundEffects.playTap();
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i + 1 === step
                    ? 'w-6 bg-[#bef264]'
                    : i + 1 < step
                    ? 'w-3 bg-[#65a30d]'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 tabular-nums">
            Step {step} of 7
          </span>
        </div>

        {/* STEP 1: Primary Fitness Goal */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Personalization
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                What is your primary fitness goal?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                We will personalize your daily workouts and challenges around this focus.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'habit_consistency', label: 'Develop a consistent exercise habit', desc: 'Short, daily sessions that stick' },
                { id: 'build_strength', label: 'Build bodyweight strength', desc: 'Tone muscles and increase push/squat capacity' },
                { id: 'improve_mobility', label: 'Improve mobility & joint freedom', desc: 'Relieve stiffness and ease tight hips/spine' },
                { id: 'improve_stamina', label: 'Improve stamina & cardiovascular fitness', desc: 'Feel energized with low-impact cardio flow' },
                { id: 'overall_fitness', label: 'Improve overall fitness & vitality', desc: 'A balanced mix of strength, cardio, and mobility' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundEffects.playTap();
                    setGoal(opt.id as FitnessGoal);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start justify-between min-h-[56px] ${
                    goal === opt.id
                      ? 'bg-[#182212] border-[#a3e635] text-white shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                  {goal === opt.id && <Check className="w-5 h-5 text-[#bef264] shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Experience Level */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Starting Point
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                What is your experience level?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero judgment. We calibrate rep counts and exercise alternatives accordingly.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'beginner',
                  title: 'Beginner',
                  desc: 'New to fitness or restarting after a long break. Gentle foundations with chair & wall options.'
                },
                {
                  id: 'intermediate',
                  title: 'Intermediate',
                  desc: 'Comfortable with basic push-ups and squats. Ready for sustained circuits.'
                },
                {
                  id: 'advanced',
                  title: 'Advanced',
                  desc: 'Experienced exerciser seeking high-repetition bodyweight conditioning.'
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundEffects.playTap();
                    setLevel(opt.id as ExperienceLevel);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start justify-between ${
                    level === opt.id
                      ? 'bg-[#182212] border-[#a3e635] text-white shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-base text-white">{opt.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{opt.desc}</div>
                  </div>
                  {level === opt.id && <Check className="w-5 h-5 text-[#bef264] shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Daily Workout Duration */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Schedule
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                How much time can you exercise daily?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Even 5 minutes of focused daily movement creates lasting momentum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: '5', label: '5 minutes', note: 'Quick micro-energizer' },
                { id: '10', label: '10 minutes', note: 'The sweet spot for consistency' },
                { id: '15', label: '15 minutes', note: 'Balanced full body circuit' },
                { id: '20', label: '20 minutes', note: 'Deep endurance build' },
                { id: '30', label: '30 minutes', note: 'Complete fitness session' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundEffects.playTap();
                    setMinutes(opt.id as WorkoutDurationPref);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    minutes === opt.id
                      ? 'bg-[#182212] border-[#a3e635] text-white shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{opt.label}</div>
                    <div className="text-[11px] text-slate-400">{opt.note}</div>
                  </div>
                  {minutes === opt.id && <Check className="w-4 h-4 text-[#bef264] shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Workout Location */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Environment
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Where do you prefer to exercise?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                FitQuest specializes in zero-equipment home movement.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'home', label: 'At home (Living room or bedroom)', sub: 'Quiet, floor-safe movements' },
                { id: 'outdoors', label: 'Outdoors (Park or backyard)', sub: 'Fresh air & open movement' },
                { id: 'gym', label: 'At a gym (Free space / mat area)', sub: 'Bodyweight warmup or circuit' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundEffects.playTap();
                    setLocation(opt.id as WorkoutLocation);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    location === opt.id
                      ? 'bg-[#182212] border-[#a3e635] text-white shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400">{opt.sub}</div>
                  </div>
                  {location === opt.id && <Check className="w-5 h-5 text-[#bef264] shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Equipment */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Gear
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Do you have any available equipment?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                All FitQuest workouts can be performed with 100% bodyweight!
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'none', label: 'No equipment (Pure bodyweight)', sub: 'Only your floor and a wall' },
                { id: 'resistance_bands', label: 'Resistance bands', sub: 'Elastic loop or handles' },
                { id: 'dumbbells', label: 'Light dumbbells / water bottles', sub: 'For optional added resistance' },
                { id: 'other', label: 'Other equipment / Yoga mat', sub: 'Cushioned mat or chair' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundEffects.playTap();
                    setEquipment(opt.id as EquipmentOption);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    equipment === opt.id
                      ? 'bg-[#182212] border-[#a3e635] text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400">{opt.sub}</div>
                  </div>
                  {equipment === opt.id && <Check className="w-5 h-5 text-[#bef264] shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Categories of interest */}
        {step === 6 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Preferences
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Which workout categories interest you?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select all that appeal to you (tap to toggle).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'full_body', label: 'Full Body' },
                { id: 'upper_body', label: 'Upper Body' },
                { id: 'lower_body', label: 'Lower Body' },
                { id: 'core', label: 'Core & Abs' },
                { id: 'mobility', label: 'Mobility & Stretching' },
                { id: 'cardio', label: 'Low-Impact Cardio' }
              ].map((cat) => {
                const isSelected = categories.includes(cat.id as WorkoutCategory);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id as WorkoutCategory)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#182212] border-[#a3e635] text-white shadow-[0_0_10px_rgba(163,230,53,0.15)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{cat.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#bef264] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: Physical limitations / Exercises to avoid */}
        {step === 7 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
                Comfort & Safety
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Any areas needing extra joint care?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                We will prioritize gentle alternatives and modifications (e.g. wall push-ups, chair squats).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                'Knee discomfort',
                'Lower back sensitivity',
                'Wrist strain',
                'High-impact jumping',
                'Neck tension',
                'None'
              ].map((item) => {
                const isSelected = item === 'None' ? avoidList.length === 0 : avoidList.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleAvoid(item)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#182212] border-[#a3e635] text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#bef264] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Safety Reminder as required by brief */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                FitQuest workouts are for general wellness. Listen to your body and stop immediately if you feel sharp pain or dizziness.
              </span>
            </div>

            {/* Display name field */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name or nickname"
                className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>
        )}

        {/* Bottom Navigation for Modal */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-2"
          >
            Skip for now
          </button>
          <button
            onClick={handleNext}
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-bold text-sm flex items-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all ml-auto shadow-[0_2px_12px_rgba(163,230,53,0.3)]"
          >
            <span>{step === 7 ? 'Generate My Plan' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
