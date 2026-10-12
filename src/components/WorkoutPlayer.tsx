import React, { useState, useEffect, useRef } from 'react';
import { Workout, Exercise, WorkoutSessionRecord } from '../types';
import { EXERCISES } from '../data/exercises';
import { ExerciseIllustration } from './ExerciseIllustration';
import { soundEffects } from '../services/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  SkipForward,
  X,
  CheckCircle2,
  ChevronRight,
  Info,
  Clock,
  Zap,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface Props {
  workout: Workout;
  onFinishWorkout: (record: WorkoutSessionRecord) => void;
  onExit: () => void;
}

type PlayerPhase = 'exercise' | 'rest' | 'complete';

export const WorkoutPlayer: React.FC<Props> = ({
  workout,
  onFinishWorkout,
  onExit
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<PlayerPhase>('exercise');
  const [isPaused, setIsPaused] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showModDetails, setShowModDetails] = useState(false);

  // Stats tracked
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [completedExercisesCount, setCompletedExercisesCount] = useState(0);

  // Current exercise data
  const currentWorkoutExercise = workout.exercises[currentIdx];
  const currentExerciseData: Exercise =
    EXERCISES[currentWorkoutExercise?.exerciseId] || EXERCISES['squats'];

  // Timer states
  const isTimeBased = !!currentWorkoutExercise?.durationSec;
  const initialSeconds = currentWorkoutExercise?.durationSec || 30;
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  // Rest timer
  const restDuration = currentWorkoutExercise?.restAfterSec || 15;
  const [restRemaining, setRestRemaining] = useState(restDuration);

  // Keep track of whether completion has been claimed to prevent double points
  const hasClaimedRef = useRef(false);

  // Overall timer ticker
  useEffect(() => {
    if (phase === 'complete') return;

    const interval = setInterval(() => {
      if (!isPaused && !showExitConfirm) {
        setTotalElapsedTime((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, showExitConfirm, phase]);

  // Exercise or Rest countdown
  useEffect(() => {
    if (isPaused || showExitConfirm || phase === 'complete') return;

    const interval = setInterval(() => {
      if (phase === 'exercise' && isTimeBased) {
        setSecondsRemaining((prev) => {
          if (prev <= 4 && prev > 1) {
            soundEffects.playCountdownTick(prev - 1);
          }
          if (prev <= 1) {
            soundEffects.playCountdownTick(0);
            handleExerciseDone();
            return 0;
          }
          return prev - 1;
        });
      } else if (phase === 'rest') {
        setRestRemaining((prev) => {
          if (prev <= 4 && prev > 1) {
            soundEffects.playCountdownTick(prev - 1);
          }
          if (prev <= 1) {
            soundEffects.playCountdownTick(0);
            startNextExercise();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, isPaused, showExitConfirm, isTimeBased, currentIdx]);

  const handleExerciseDone = () => {
    soundEffects.playTap();
    setCompletedExercisesCount((prev) => prev + 1);

    const isLast = currentIdx >= workout.exercises.length - 1;
    if (isLast) {
      triggerCompletion();
    } else {
      setPhase('rest');
      setRestRemaining(currentWorkoutExercise.restAfterSec || 15);
    }
  };

  const startNextExercise = () => {
    const nextIdx = currentIdx + 1;
    setCurrentIdx(nextIdx);
    const nextEx = workout.exercises[nextIdx];
    setSecondsRemaining(nextEx?.durationSec || 30);
    setPhase('exercise');
    setShowModDetails(false);
  };

  const skipRest = () => {
    soundEffects.playTap();
    startNextExercise();
  };

  const skipCurrentExercise = () => {
    soundEffects.playTap();
    const isLast = currentIdx >= workout.exercises.length - 1;
    if (isLast) {
      triggerCompletion();
    } else {
      setPhase('rest');
      setRestRemaining(5); // brief 5s breather before next
    }
  };

  const triggerCompletion = () => {
    if (hasClaimedRef.current) return;
    hasClaimedRef.current = true;

    setPhase('complete');
    soundEffects.playSuccessChord();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#bef264', '#38bdf8', '#ffffff']
      });
    } catch {
      // Ignore if canvas is unavailable
    }
  };

  const handleFinishAndSave = () => {
    soundEffects.playTap();
    const sessionRecord: WorkoutSessionRecord = {
      id: `session_${Date.now()}`,
      workoutId: workout.id,
      workoutTitle: workout.title,
      completedAt: new Date().toISOString(),
      durationSeconds: Math.max(totalElapsedTime, 60),
      exercisesCount: Math.max(completedExercisesCount, 1),
      pointsEarned: workout.pointsReward
    };
    onFinishWorkout(sessionRecord);
  };

  // Format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const nextExercise = workout.exercises[currentIdx + 1]
    ? EXERCISES[workout.exercises[currentIdx + 1].exerciseId]
    : null;

  // Render Completed Screen
  if (phase === 'complete') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0a0c0f] p-6 text-center select-none overflow-y-auto">
        {/* Glow ambient background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#84cc16]/15 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md mx-auto my-auto py-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#182611] border-2 border-[#a3e635] text-[#bef264] shadow-[0_0_30px_rgba(163,230,53,0.35)] mb-4">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider block mb-1">
            Workout Complete
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
            Fantastic Effort!
          </h1>
          <p className="text-sm text-slate-300 max-w-sm mx-auto mb-8">
            You completed <strong className="text-white">{workout.title}</strong>. Every deliberate movement builds lasting vitality.
          </p>

          {/* Reward & Stats Card */}
          <div className="grid grid-cols-3 gap-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6">
            <div className="flex flex-col items-center justify-center p-2">
              <Clock className="w-5 h-5 text-slate-400 mb-1" />
              <span className="text-xl font-bold font-mono text-white">
                {formatTime(totalElapsedTime)}
              </span>
              <span className="text-[11px] text-slate-400">Total Time</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 border-x border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-sky-400 mb-1" />
              <span className="text-xl font-bold font-mono text-white">
                {completedExercisesCount || workout.exercises.length}
              </span>
              <span className="text-[11px] text-slate-400">Exercises</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <Zap className="w-5 h-5 text-[#bef264] mb-1" />
              <span className="text-xl font-bold font-mono text-[#bef264]">
                +{workout.pointsReward}
              </span>
              <span className="text-[11px] text-slate-400">FitPoints</span>
            </div>
          </div>

          {/* Encouraging Habit Note */}
          <div className="p-3.5 rounded-xl bg-[#141d11] border border-[#a3e635]/20 text-xs text-slate-300 text-left flex items-start gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-[#bef264] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Streak Continued!</span>
              Your daily commitment counts. Hydrate with water and take a moment to appreciate your effort today.
            </div>
          </div>

          <button
            onClick={handleFinishAndSave}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <span>Claim Rewards & Return</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Render Rest Phase
  if (phase === 'rest') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0a0c0f] p-6 text-center select-none overflow-y-auto">
        {/* Top bar */}
        <div className="w-full max-w-md flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-400">
            Exercise {currentIdx + 1} of {workout.exercises.length} Done
          </span>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Exit workout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Rest Timer */}
        <div className="my-auto flex flex-col items-center max-w-sm">
          <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider mb-2">
            Catch Your Breath
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white mb-6">
            Rest Interval
          </h2>

          {/* Rest Circular Countdown */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#1e293b"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#bef264"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={
                  2 * Math.PI * 70 * (1 - restRemaining / (restDuration || 15))
                }
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold font-mono text-white tabular-nums">
                {restRemaining}
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                seconds
              </span>
            </div>
          </div>

          {/* Next Exercise Preview */}
          {nextExercise && (
            <div className="w-full p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Up Next
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">
                  {nextExercise.name}
                </span>
                <span className="text-xs text-[#bef264] font-medium">
                  {workout.exercises[currentIdx + 1]?.reps
                    ? `${workout.exercises[currentIdx + 1].reps} Reps`
                    : `${workout.exercises[currentIdx + 1]?.durationSec}s`}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={skipRest}
            className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>Skip Rest</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Active Exercise Phase
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0c0f] select-none overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-20 w-full bg-[#0a0c0f]/90 backdrop-blur-md px-4 py-3 border-b border-slate-800/80">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#a3e635] tabular-nums">
              {currentIdx + 1} / {workout.exercises.length}
            </span>
            <span className="text-xs text-slate-400 truncate max-w-[180px]">
              {workout.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Total elapsed */}
            <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              {formatTime(totalElapsedTime)}
            </div>

            <button
              onClick={() => setShowExitConfirm(true)}
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              aria-label="Exit workout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Linear progress bar across exercises */}
        <div className="max-w-md mx-auto w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-gradient-to-r from-[#bef264] to-[#84cc16] transition-all duration-300"
            style={{
              width: `${((currentIdx + 0.5) / workout.exercises.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col">
        {/* Animated Exercise Illustration */}
        <div className="mb-4">
          <ExerciseIllustration
            animationType={currentExerciseData.animationType}
            isPlaying={!isPaused}
          />
        </div>

        {/* Title and rep/time target */}
        <div className="text-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {currentExerciseData.category.replace('_', ' ')}
          </span>
          <h2 className="font-display font-extrabold text-2xl text-white mt-0.5">
            {currentExerciseData.name}
          </h2>

          <div className="mt-2 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#162211] border border-[#a3e635]/30 text-[#bef264] text-sm font-bold tabular-nums">
            {isTimeBased ? (
              <span className="text-2xl font-mono">{secondsRemaining}s</span>
            ) : (
              <span>Target: {currentWorkoutExercise?.reps || 10} repetitions</span>
            )}
          </div>
        </div>

        {/* Form Instructions & Coaching Tips (Collapsible / Readable) */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-[#bef264]">
              <Info className="w-3.5 h-3.5" />
              Form Coaching
            </span>
            <button
              onClick={() => setShowModDetails(!showModDetails)}
              className="text-[#a3e635] hover:underline"
            >
              {showModDetails ? 'Hide Modification' : 'Easier Option?'}
            </button>
          </div>

          {/* Primary form cue */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentExerciseData.instructions[0]}
          </p>

          {/* Coaching tip */}
          <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center gap-1.5">
            <span className="text-[#bef264] font-semibold">Key Cue:</span>
            <span>{currentExerciseData.coachingTips[0]}</span>
          </div>

          {/* Modification Drawer */}
          {showModDetails && (
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-1">
              <span className="font-bold text-[#bef264] block">
                Gentle Alternative:
              </span>
              <p className="text-slate-300">
                {currentExerciseData.modificationEasier}
              </p>
            </div>
          )}
        </div>

        {/* Next Exercise Teaser */}
        {nextExercise && (
          <div className="text-[11px] text-slate-400 flex items-center justify-between px-2 mb-4">
            <span>Next: {nextExercise.name}</span>
            <span>{workout.exercises[currentIdx + 1]?.reps ? `${workout.exercises[currentIdx + 1].reps} reps` : `${workout.exercises[currentIdx + 1]?.durationSec}s`}</span>
          </div>
        )}

        {/* Player Controls (Bottom Ergonomic Thumb Zone) */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          {/* Pause / Resume */}
          <button
            onClick={() => {
              soundEffects.playTap();
              setIsPaused(!isPaused);
            }}
            className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
            aria-label={isPaused ? 'Resume workout' : 'Pause workout'}
          >
            {isPaused ? <Play className="w-6 h-6 fill-current text-[#bef264]" /> : <Pause className="w-6 h-6" />}
          </button>

          {/* Complete Exercise Button / Mark Reps Done */}
          <button
            onClick={handleExerciseDone}
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(163,230,53,0.3)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>{isTimeBased ? 'Mark Done' : 'Complete Set'}</span>
          </button>

          {/* Skip Exercise */}
          <button
            onClick={skipCurrentExercise}
            className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Skip to next exercise"
            title="Skip exercise"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal to Exit Workout */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#12151b] border border-slate-800 rounded-2xl p-5 shadow-2xl text-center">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Pause or Leave Workout?
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              You are on exercise {currentIdx + 1} of {workout.exercises.length}. No penalty for stopping—every minute moved still counts!
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full h-11 rounded-xl bg-[#bef264] text-black font-bold text-xs"
              >
                Keep Going
              </button>
              <button
                onClick={onExit}
                className="w-full h-11 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs"
              >
                Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
