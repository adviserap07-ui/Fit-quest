import React, { useState } from 'react';
import { UserProfile, WorkoutSessionRecord } from '../types';
import { calculateLevel } from '../services/storage';
import { soundEffects } from '../services/audio';
import {
  TrendingUp,
  Clock,
  Flame,
  Zap,
  Calendar,
  CheckCircle2,
  Brain,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onOpenShop: () => void;
}

export const ProgressView: React.FC<Props> = ({ profile, onOpenShop }) => {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  const levelInfo = calculateLevel(profile.fitPoints);

  // Group weekly activity minutes by day for SVG chart
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Calculate activity from real profile history
  const historyMinutesByDay = [0, 0, 0, 0, 0, 0, 0];
  profile.history.forEach((h) => {
    const d = new Date(h.completedAt);
    const dayIdx = (d.getDay() + 6) % 7; // Mon = 0
    historyMinutesByDay[dayIdx] += Math.round(h.durationSeconds / 60);
  });

  const maxMinutes = Math.max(...historyMinutesByDay, 20);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
          Your Consistency Journey
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Progress & Records
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Celebrating your habits, active minutes, and mental sharpness.
        </p>
      </div>

      {/* KPI 4-Card Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Active Min</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {profile.totalActiveMinutes}m
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Workouts</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {profile.completedWorkoutsCount}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Streak</span>
          </div>
          <div className="text-xl font-bold font-mono text-orange-400">
            {profile.currentStreak}d
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Zap className="w-4 h-4 text-[#bef264]" />
            <span>FitPoints</span>
          </div>
          <div className="text-xl font-bold font-mono text-[#bef264]">
            {profile.fitPoints}
          </div>
        </div>
      </div>

      {/* WEEKLY ACTIVITY SVG BAR CHART */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Weekly Active Minutes</h3>
            <p className="text-[11px] text-slate-400">Real tracked duration by day</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#bef264]">
            {historyMinutesByDay.reduce((a, b) => a + b, 0)}m this week
          </span>
        </div>

        {/* SVG Bar Chart */}
        <div className="h-32 w-full pt-4 flex items-end justify-between gap-2 px-2">
          {days.map((day, idx) => {
            const mins = historyMinutesByDay[idx] || 0;
            const barHeightPct = Math.max((mins / maxMinutes) * 100, 8);

            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">
                  {mins > 0 ? `${mins}m` : '-'}
                </span>
                <div className="w-full max-w-[28px] h-20 bg-slate-800/80 rounded-t-lg overflow-hidden flex items-end">
                  <div
                    className={`w-full transition-all duration-500 rounded-t-lg ${
                      mins > 0
                        ? 'bg-gradient-to-t from-[#84cc16] to-[#bef264] shadow-[0_0_8px_rgba(163,230,53,0.3)]'
                        : 'bg-transparent'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT WORKOUT SESSION HISTORY */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Recent Workout History ({profile.history.length})
        </h3>

        {profile.history.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            No workouts logged yet. Complete your first session to see your timeline!
          </div>
        ) : (
          <div className="space-y-2">
            {profile.history.slice(0, 10).map((record) => (
              <div
                key={record.id}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#162211] border border-[#a3e635]/30 flex items-center justify-center text-[#bef264] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {record.workoutTitle}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {formatDate(record.completedAt)} &bull; {Math.round(record.durationSeconds / 60)} mins
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#bef264] font-mono">
                    +{record.pointsEarned} pts
                  </span>
                  <div className="text-[10px] text-slate-500">
                    {record.exercisesCount} moves
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
