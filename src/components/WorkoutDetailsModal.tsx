import React from 'react';
import { Workout } from '../types';
import { EXERCISES } from '../data/exercises';
import { soundEffects } from '../services/audio';
import {
  X,
  Play,
  Clock,
  ShieldCheck,
  Zap,
  Flame,
  CheckCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface Props {
  workout: Workout;
  onStart: (workout: Workout) => void;
  onClose: () => void;
}

export const WorkoutDetailsModal: React.FC<Props> = ({
  workout,
  onStart,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a3e635] uppercase tracking-wider mb-1">
              <span>{workout.category.replace('_', ' ')}</span>
              <span>&bull;</span>
              <span className="capitalize">{workout.difficulty}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-white">
              {workout.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable details */}
        <div className="overflow-y-auto flex-1 py-4 space-y-5 pr-1">
          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {workout.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">
                {workout.estimatedMinutes} mins
              </span>
            </div>
            <div className="border-x border-slate-800">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Exercises</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">
                {workout.exercises.length} moves
              </span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                <Zap className="w-3.5 h-3.5 text-[#bef264]" />
                <span>Reward</span>
              </div>
              <span className="text-sm font-bold text-[#bef264] font-mono">
                +{workout.pointsReward} pts
              </span>
            </div>
          </div>

          {/* Gear & Safety */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
            <div>
              <strong className="text-white">Required Gear: </strong>
              <span>{workout.requiredEquipment}</span>
            </div>
            <div className="text-slate-400">
              <strong className="text-slate-300">Safety Tip: </strong>
              <span>Move with smooth control. Rest whenever needed—quality over speed.</span>
            </div>
          </div>

          {/* Exercise Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Included Movements ({workout.exercises.length})
            </h3>
            <div className="space-y-2.5">
              {workout.exercises.map((item, idx) => {
                const ex = EXERCISES[item.exerciseId];
                if (!ex) return null;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {ex.name}
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            {ex.targetMuscles.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#bef264] font-mono">
                          {item.reps ? `${item.reps} reps` : `${item.durationSec}s`}
                        </span>
                        <div className="text-[10px] text-slate-500">
                          {item.restAfterSec ? `${item.restAfterSec}s rest` : 'Finisher'}
                        </div>
                      </div>
                    </div>

                    {/* Modification note */}
                    <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-1.5">
                      <span className="text-[#a3e635] font-semibold shrink-0">Modification:</span>
                      <span>{ex.modificationEasier}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={() => {
              soundEffects.playTap();
              onStart(workout);
            }}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Guided Workout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
