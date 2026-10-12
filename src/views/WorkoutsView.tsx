import React, { useState } from 'react';
import { Workout, WorkoutCategory, ExperienceLevel } from '../types';
import { WORKOUTS } from '../data/workouts';
import { soundEffects } from '../services/audio';
import {
  Search,
  Filter,
  Play,
  Clock,
  Flame,
  Zap,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface Props {
  onSelectWorkout: (workout: Workout) => void;
  onOpenDetails: (workout: Workout) => void;
}

export const WorkoutsView: React.FC<Props> = ({
  onSelectWorkout,
  onOpenDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Routines' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'short', label: 'Short (5-7m)' },
    { id: 'full_body', label: 'Full Body' },
    { id: 'core', label: 'Core & Abs' },
    { id: 'lower_body', label: 'Lower Body' },
    { id: 'upper_body', label: 'Upper Body' },
    { id: 'cardio', label: 'Cardio Flow' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'recovery', label: 'Recovery' }
  ];

  const filteredWorkouts = WORKOUTS.filter((w) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchDesc = w.description.toLowerCase().includes(q);
      const matchTags = w.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && w.category !== selectedCategory) {
      return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all' && w.difficulty !== selectedDifficulty) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider block">
          Exercise Library
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Guided Home Workouts
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Zero gym equipment needed &bull; Follow at your own comfortable pace
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search workouts (e.g. beginner, mobility, core)..."
          className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#a3e635] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Horizontal Category Pill Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar shrink-0 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundEffects.playTap();
              setSelectedCategory(cat.id);
            }}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors font-medium min-h-[40px] ${
              selectedCategory === cat.id
                ? 'bg-[#bef264] text-black font-bold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Difficulty Sub-Filter Bar */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Level:
        </span>
        {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              soundEffects.playTap();
              setSelectedDifficulty(lvl);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors min-h-[32px] ${
              selectedDifficulty === lvl
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Workouts Grid / List */}
      <div className="space-y-3 pt-2">
        {filteredWorkouts.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No workouts match your search or filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="mt-3 text-xs font-bold text-[#bef264] underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#a3e635] uppercase tracking-wider mb-1">
                    <span>{workout.category.replace('_', ' ')}</span>
                    <span>&bull;</span>
                    <span className="capitalize">{workout.difficulty}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-white">
                    {workout.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#182312] border border-[#a3e635]/30 text-[#bef264] text-xs font-bold font-mono shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                  <span>+{workout.pointsReward}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {workout.description}
              </p>

              {/* Meta metrics */}
              <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-slate-200">{workout.estimatedMinutes} mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>{workout.exercises.length} movements</span>
                </div>
                <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                  {workout.requiredEquipment}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    soundEffects.playTap();
                    onOpenDetails(workout);
                  }}
                  className="flex-1 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  View Details & Moves
                </button>
                <button
                  onClick={() => {
                    soundEffects.playTap();
                    onSelectWorkout(workout);
                  }}
                  className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black text-xs font-extrabold font-display flex items-center gap-1.5 hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_2px_12px_rgba(163,230,53,0.25)]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
