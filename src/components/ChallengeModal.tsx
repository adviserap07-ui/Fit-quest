import React, { useState } from 'react';
import { DailyChallenge } from '../types';
import { soundEffects } from '../services/audio';
import {
  X,
  Target,
  Zap,
  Clock,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  challenge: DailyChallenge;
  onUpdateChallengeProgress: (challengeId: string, countDelta: number, isComplete: boolean) => void;
  onStartRelatedActivity: (challenge: DailyChallenge) => void;
  onClose: () => void;
}

export const ChallengeModal: React.FC<Props> = ({
  challenge,
  onUpdateChallengeProgress,
  onStartRelatedActivity,
  onClose
}) => {
  const [usingAlternative, setUsingAlternative] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(challenge.currentCount);
  const [isCompleted, setIsCompleted] = useState(challenge.isCompleted);

  const title = usingAlternative && challenge.alternativeTitle ? challenge.alternativeTitle : challenge.title;
  const description = usingAlternative && challenge.alternativeDesc ? challenge.alternativeDesc : challenge.description;

  const handleIncrement = () => {
    if (isCompleted) return;
    soundEffects.playTap();
    const nextCount = Math.min(currentProgress + 1, challenge.targetCount);
    setCurrentProgress(nextCount);

    const completedNow = nextCount >= challenge.targetCount;
    if (completedNow) {
      setIsCompleted(true);
      soundEffects.playSuccessChord();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#a3e635', '#38bdf8', '#fbbf24']
        });
      } catch {}
    }

    onUpdateChallengeProgress(challenge.id, 1, completedNow);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-md bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-950/60 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                Daily Quest &bull; {challenge.type}
              </span>
              <h2 className="font-display font-extrabold text-xl text-white">
                {title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            {description}
          </p>

          {/* Reward & Info Pills */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-300">
                {challenge.estimatedDuration}
              </span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-[#bef264]" />
              <span className="text-xs font-bold text-[#bef264]">
                +{challenge.rewardPoints} FitPoints
              </span>
            </div>
          </div>

          {/* Progress Bar & Status */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">Progress</span>
              <span className="text-white tabular-nums">
                {currentProgress} / {challenge.targetCount} {challenge.unit}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#bef264] to-[#84cc16] transition-all duration-300"
                style={{
                  width: `${Math.min((currentProgress / challenge.targetCount) * 100, 100)}%`
                }}
              />
            </div>
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Challenge Completed! +{challenge.rewardPoints} FitPoints claimed.</span>
              </div>
            )}
          </div>

          {/* Switch to Alternative / Kinder Option */}
          {challenge.alternativeTitle && (
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-4 h-4 text-[#a3e635]" />
                <span>Need a gentler alternative today?</span>
              </div>
              <button
                onClick={() => {
                  soundEffects.playTap();
                  setUsingAlternative(!usingAlternative);
                }}
                className="text-[#bef264] font-semibold hover:underline"
              >
                {usingAlternative ? 'Reset Original' : 'Switch Option'}
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
          {!isCompleted ? (
            <>
              <button
                onClick={handleIncrement}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-bold text-sm flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(163,230,53,0.3)] hover:brightness-105 active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Log 1 {challenge.unit.replace(/s$/, '')} Progress</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playTap();
                  onStartRelatedActivity(challenge);
                }}
                className="w-full h-11 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <span>Go to Recommended Activity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full h-12 rounded-xl bg-slate-800 text-white font-bold text-sm"
            >
              Done & Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
