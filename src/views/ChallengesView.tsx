import React, { useState } from 'react';
import { DailyChallenge, ChallengeType } from '../types';
import { DAILY_CHALLENGES } from '../data/challenges';
import { soundEffects } from '../services/audio';
import {
  Target,
  Clock,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle
} from 'lucide-react';

interface Props {
  onSelectChallenge: (challenge: DailyChallenge) => void;
  completedChallengeIds: string[];
}

export const ChallengesView: React.FC<Props> = ({
  onSelectChallenge,
  completedChallengeIds
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const types: { id: string; label: string }[] = [
    { id: 'all', label: 'All Quests' },
    { id: 'consistency', label: 'Consistency' },
    { id: 'movement', label: 'Movement' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'progress', label: 'Technique' }
  ];

  const filteredChallenges = DAILY_CHALLENGES.filter((c) => {
    if (selectedType !== 'all' && c.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
          Daily & Weekly Quests
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Active Movement Quests
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Achievable micro-commitments designed to build steady habits without burnout.
        </p>
      </div>

      {/* Philosophy banner */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-[#bef264] shrink-0 mt-0.5" />
        <span>
          <strong>Zero Guilt Rule:</strong> You can pause or swap any quest for an easier variation anytime. Fitness should feel restorative, never punitive.
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar shrink-0 text-xs">
        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              soundEffects.playTap();
              setSelectedType(t.id);
            }}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors font-medium min-h-[40px] ${
              selectedType === t.id
                ? 'bg-orange-500 text-black font-bold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Quest Cards */}
      <div className="space-y-3 pt-2">
        {filteredChallenges.map((challenge) => {
          const isDone = completedChallengeIds.includes(challenge.id) || challenge.isCompleted;

          return (
            <div
              key={challenge.id}
              onClick={() => {
                soundEffects.playTap();
                onSelectChallenge(challenge);
              }}
              className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                isDone
                  ? 'bg-slate-900/30 border-slate-800/60 opacity-80'
                  : 'bg-slate-900/70 border-slate-800 hover:border-orange-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-950/60 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                      {challenge.type} Challenge
                    </span>
                    <h3 className="font-display font-extrabold text-base text-white">
                      {challenge.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#182312] border border-[#a3e635]/30 text-[#bef264] text-xs font-bold font-mono shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                  <span>+{challenge.rewardPoints}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.description}
              </p>

              {/* Progress and status */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {challenge.estimatedDuration}
                  </span>
                  <span className="text-white font-mono">
                    {challenge.currentCount} / {challenge.targetCount} {challenge.unit}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-[#bef264]"
                    style={{
                      width: `${Math.min((challenge.currentCount / challenge.targetCount) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                {isDone ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Quest Completed
                  </span>
                ) : (
                  <span className="text-orange-400 font-bold flex items-center gap-1">
                    <span>View Quest & Log Progress</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="text-[11px] text-slate-500">
                  Alternative available
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
