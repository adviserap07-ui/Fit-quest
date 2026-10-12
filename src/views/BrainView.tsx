import React, { useState } from 'react';
import { QuizAttemptRecord, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { soundEffects } from '../services/audio';
import {
  Brain,
  Sparkles,
  Zap,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface Props {
  quizAttempts: QuizAttemptRecord[];
  onOpenQuizModal: (questionId?: string) => void;
}

export const BrainView: React.FC<Props> = ({
  quizAttempts,
  onOpenQuizModal
}) => {
  const categories = [
    { name: 'Exercise Knowledge', desc: 'Fundamentals of endurance and progressive loading', icon: '🏃' },
    { name: 'Fitness Myths', desc: 'Debunking soreness, spot reduction, and extreme diets', icon: '🔍' },
    { name: 'Nutrition Basics', desc: 'Hydration timing and sustainable meal fuel', icon: '🥗' },
    { name: 'Recovery and Rest', desc: 'Sleep science, muscle recovery, and tissue repair', icon: '🌙' },
    { name: 'Exercise Technique', desc: 'Joint alignment, squat depth, and breathing cues', icon: '📐' },
    { name: 'Healthy Habits', desc: 'Habit stacking, friction reduction, and consistency', icon: '⚡' },
    { name: 'Fitness Safety', desc: 'Listening to joint signals, stopping sharp pain', icon: '🛡️' },
    { name: 'Weekly Fitness Trivia', desc: 'Fascinating human biology and movement facts', icon: '🧠' }
  ];

  const totalAttempts = quizAttempts.length;
  const correctAttempts = quizAttempts.filter((a) => a.isCorrect).length;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 100;

  // Mastered topics
  const uniqueMasteredCategories = new Set(
    quizAttempts.filter((a) => a.isCorrect).map((a) => a.category)
  );

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
          Knowledge is Power
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          FitQuest Brain Arena
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Master the science of healthy movement, recovery, and habit design.
        </p>
      </div>

      {/* Arena Knowledge Stats */}
      <div className="grid grid-cols-3 gap-2.5 p-4 rounded-3xl bg-slate-900/60 border border-slate-800 text-center">
        <div>
          <span className="text-2xl font-bold font-mono text-white">
            {totalAttempts}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mt-0.5">
            Quizzes Taken
          </span>
        </div>
        <div className="border-x border-slate-800">
          <span className="text-2xl font-bold font-mono text-[#bef264]">
            {accuracy}%
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mt-0.5">
            Accuracy
          </span>
        </div>
        <div>
          <span className="text-2xl font-bold font-mono text-purple-400">
            {uniqueMasteredCategories.size} / 8
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mt-0.5">
            Topics Mastered
          </span>
        </div>
      </div>

      {/* Featured Big Play Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/30 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 text-[11px] font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Quiz Session</span>
          </div>
          <span className="text-xs font-bold text-[#bef264] font-mono">
            +15 pts / correct
          </span>
        </div>

        <h3 className="font-display font-extrabold text-xl text-white">
          Daily Fitness IQ Challenge
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Test your fitness intuition across exercise biomechanics, recovery myths, and hydration rules. Each answer unlocks a practical fitness tip!
        </p>

        <button
          onClick={() => {
            soundEffects.playTap();
            onOpenQuizModal();
          }}
          className="w-full h-12 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(168,85,247,0.3)] transition-all active:scale-[0.98]"
        >
          <Brain className="w-4 h-4" />
          <span>Launch Brain Arena</span>
        </button>
      </div>

      {/* 8 Categories Grid */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Curated Knowledge Tracks (8 Categories)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {categories.map((cat, idx) => {
            const sampleQ = QUIZ_QUESTIONS.find((q) => q.category === cat.name);
            const isMastered = uniqueMasteredCategories.has(cat.name);

            return (
              <div
                key={idx}
                onClick={() => {
                  soundEffects.playTap();
                  onOpenQuizModal(sampleQ?.id);
                }}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <h4 className="text-xs font-bold text-white">
                      {cat.name}
                    </h4>
                  </div>
                  {isMastered && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {cat.desc}
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-purple-400 font-bold">
                  <span>Take Topic Quiz</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
