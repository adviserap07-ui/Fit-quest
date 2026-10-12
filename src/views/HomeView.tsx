import React from 'react';
import { UserProfile, Workout, DailyChallenge, QuizQuestion } from '../types';
import { WORKOUTS } from '../data/workouts';
import { DAILY_CHALLENGES } from '../data/challenges';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { soundEffects } from '../services/audio';
import {
  Play,
  Target,
  Brain,
  TrendingUp,
  Sparkles,
  Flame,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onSelectWorkout: (workout: Workout) => void;
  onSelectChallenge: (challenge: DailyChallenge) => void;
  onOpenQuiz: (questionId?: string) => void;
  onNavigateTab: (tab: 'workouts' | 'challenges' | 'brain' | 'progress') => void;
  onOpenCommunity: () => void;
}

export const HomeView: React.FC<Props> = ({
  profile,
  onSelectWorkout,
  onSelectChallenge,
  onOpenQuiz,
  onNavigateTab,
  onOpenCommunity
}) => {
  // Recommend workout based on preferences
  const userGoal = profile.preferences.fitnessGoal;
  const userPrefMins = parseInt(profile.preferences.dailyMinutes || '10', 10);
  const userLevel = profile.preferences.experienceLevel;

  const recommendedWorkout =
    WORKOUTS.find((w) => {
      if (userPrefMins <= 5 && w.category === 'short') return true;
      if (userGoal === 'improve_mobility' && (w.category === 'mobility' || w.category === 'recovery')) return true;
      if (userGoal === 'build_strength' && (w.category === 'full_body' || w.category === 'upper_body')) return true;
      if (userGoal === 'improve_stamina' && w.category === 'cardio') return true;
      return w.difficulty === userLevel;
    }) || WORKOUTS[0];

  // Daily Challenge
  const todayChallenge = DAILY_CHALLENGES[0];

  // Daily Quiz preview (first unattempted or first question)
  const todayQuiz: QuizQuestion = QUIZ_QUESTIONS[0];

  // Days of week for activity tracker
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayDayIdx = (new Date().getDay() + 6) % 7; // Mon=0 .. Sun=6

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-5 pb-24">
      {/* Welcome Greeting Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider block">
            Welcome back
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Ready for today's challenge, {profile.name.split(' ')[0]}?
          </h1>
        </div>
        <button
          onClick={() => {
            soundEffects.playTap();
            onOpenCommunity();
          }}
          className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#bef264]" />
          <span>Circle</span>
        </button>
      </div>

      {/* QUICK ACTIONS HORIZONTAL BAR */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => {
            soundEffects.playTap();
            onSelectWorkout(recommendedWorkout);
          }}
          className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#a3e635]/50 flex flex-col items-center justify-center text-center transition-all min-h-[64px]"
        >
          <Play className="w-5 h-5 text-[#bef264] mb-1 fill-current" />
          <span className="text-[11px] font-bold text-slate-200">Start Move</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigateTab('challenges');
          }}
          className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 flex flex-col items-center justify-center text-center transition-all min-h-[64px]"
        >
          <Target className="w-5 h-5 text-orange-400 mb-1" />
          <span className="text-[11px] font-bold text-slate-200">Quests</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onOpenQuiz();
          }}
          className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 flex flex-col items-center justify-center text-center transition-all min-h-[64px]"
        >
          <Brain className="w-5 h-5 text-purple-400 mb-1" />
          <span className="text-[11px] font-bold text-slate-200">Quiz Brain</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigateTab('progress');
          }}
          className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 flex flex-col items-center justify-center text-center transition-all min-h-[64px]"
        >
          <TrendingUp className="w-5 h-5 text-sky-400 mb-1" />
          <span className="text-[11px] font-bold text-slate-200">Progress</span>
        </button>
      </div>

      {/* TODAY'S RECOMMENDED WORKOUT CARD (HERO FOCAL ANCHOR) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#182312] via-[#101419] to-[#0c0e12] border border-[#a3e635]/30 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#bef264]/10 border border-[#bef264]/20 text-[11px] font-bold text-[#bef264]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended For You</span>
          </div>
          <span className="text-xs font-bold text-slate-400 capitalize">
            {recommendedWorkout.difficulty}
          </span>
        </div>

        <h2 className="font-display font-extrabold text-2xl text-white mb-1.5">
          {recommendedWorkout.title}
        </h2>
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {recommendedWorkout.description}
        </p>

        {/* Workout Meta Chips */}
        <div className="flex items-center gap-4 text-xs text-slate-300 font-semibold mb-5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#bef264]" />
            <span className="font-mono">{recommendedWorkout.estimatedMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{recommendedWorkout.exercises.length} moves</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#bef264]" />
            <span>+{recommendedWorkout.pointsReward} pts</span>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => {
            soundEffects.playTap();
            onSelectWorkout(recommendedWorkout);
          }}
          className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(163,230,53,0.35)] hover:brightness-105 active:scale-[0.98] transition-all"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start Workout</span>
        </button>
      </div>

      {/* DAILY PROGRESS & STREAK CARD */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Daily Momentum
          </span>
          <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold font-mono">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>{profile.currentStreak} Day Streak</span>
          </div>
        </div>

        {/* 7-day mini calendar tracker */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {daysOfWeek.map((day, idx) => {
            const isToday = idx === todayDayIdx;
            const isPastActive = idx <= todayDayIdx;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400">{day}</span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isToday
                      ? 'bg-[#1e2a14] border-2 border-[#a3e635] text-[#bef264] shadow-[0_0_10px_rgba(163,230,53,0.2)]'
                      : isPastActive
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-slate-900/50 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isToday ? <CheckCircle2 className="w-4 h-4 text-[#bef264]" /> : idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Metric summary footer */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50">
            <span className="text-slate-400">Total Workouts:</span>
            <span className="font-bold text-white font-mono">{profile.completedWorkoutsCount}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50">
            <span className="text-slate-400">Active Minutes:</span>
            <span className="font-bold text-white font-mono">{profile.totalActiveMinutes}m</span>
          </div>
        </div>
      </div>

      {/* DAILY CHALLENGE CARD */}
      <div
        onClick={() => {
          soundEffects.playTap();
          onSelectChallenge(todayChallenge);
        }}
        className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-950/60 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                Daily Quest
              </span>
              <h3 className="text-sm font-bold text-white">
                {todayChallenge.title}
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-[#bef264] font-mono">
            +{todayChallenge.rewardPoints} pts
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2">
          {todayChallenge.description}
        </p>

        {/* Progress bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span>Goal: {todayChallenge.targetCount} {todayChallenge.unit}</span>
            <span className="text-slate-300 font-mono">
              {todayChallenge.currentCount} / {todayChallenge.targetCount}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 transition-all"
              style={{
                width: `${Math.min((todayChallenge.currentCount / todayChallenge.targetCount) * 100, 100)}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* DAILY QUIZ TEASER CARD */}
      <div
        onClick={() => {
          soundEffects.playTap();
          onOpenQuiz(todayQuiz.id);
        }}
        className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer space-y-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                Daily Brain Question
              </span>
              <h3 className="text-sm font-bold text-white">
                {todayQuiz.category}
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-purple-300 font-mono">
            +15 pts
          </span>
        </div>

        <p className="text-xs text-slate-300 line-clamp-2 font-medium">
          "{todayQuiz.question}"
        </p>

        <div className="pt-1 flex items-center justify-between text-xs text-purple-400 font-semibold">
          <span>Tap to answer & test fitness intuition</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
