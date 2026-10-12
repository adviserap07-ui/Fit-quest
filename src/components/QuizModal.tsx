import React, { useState } from 'react';
import { QuizQuestion, QuizAttemptRecord } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { soundEffects } from '../services/audio';
import {
  X,
  Brain,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  initialQuestionId?: string;
  onRecordAttempt: (attempt: QuizAttemptRecord, pointsEarned: number) => void;
  onClose: () => void;
}

export const QuizModal: React.FC<Props> = ({
  initialQuestionId,
  onRecordAttempt,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialQuestionId) {
      const idx = QUIZ_QUESTIONS.findIndex((q) => q.id === initialQuestionId);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const availableCategories = ['All', ...Array.from(new Set(QUIZ_QUESTIONS.map((q) => q.category)))];

  const filteredQuestions = selectedCategoryFilter === 'All'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.category === selectedCategoryFilter);

  const currentQuestion: QuizQuestion =
    filteredQuestions[currentIndex % filteredQuestions.length] || QUIZ_QUESTIONS[0];

  const isCorrect = selectedOption === currentQuestion.correctIndex;

  const handleSelect = (idx: number) => {
    if (hasSubmitted) return;
    soundEffects.playTap();
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return;
    setHasSubmitted(true);

    const correct = selectedOption === currentQuestion.correctIndex;
    const points = correct ? 15 : 0;

    if (correct) {
      soundEffects.playQuizCorrect();
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#a3e635', '#bef264', '#ffffff']
        });
      } catch {}
    } else {
      soundEffects.playQuizIncorrect();
    }

    const attempt: QuizAttemptRecord = {
      id: `attempt_${Date.now()}`,
      questionId: currentQuestion.id,
      isCorrect: correct,
      attemptedAt: new Date().toISOString(),
      category: currentQuestion.category
    };

    onRecordAttempt(attempt, points);
  };

  const handleNext = () => {
    soundEffects.playTap();
    setSelectedOption(null);
    setHasSubmitted(false);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handleResetCurrent = () => {
    soundEffects.playTap();
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                FitQuest Brain Arena
              </span>
              <h2 className="font-display font-extrabold text-xl text-white">
                Fitness Knowledge Challenge
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

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar shrink-0 text-xs">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playTap();
                setSelectedCategoryFilter(cat);
                setCurrentIndex(0);
                setSelectedOption(null);
                setHasSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium min-h-[36px] ${
                selectedCategoryFilter === cat
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Question Container */}
        <div className="overflow-y-auto flex-1 py-2 space-y-4 pr-1">
          {/* Metadata banner */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-purple-400">
              {currentQuestion.category}
            </span>
            <div className="flex items-center gap-1.5 text-[#bef264] font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>+15 FitPoints</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg font-bold text-white leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isChosen = selectedOption === idx;
              const isCorrectOpt = idx === currentQuestion.correctIndex;

              let style = 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700';

              if (hasSubmitted) {
                if (isCorrectOpt) {
                  style = 'bg-emerald-950/60 border-emerald-500/80 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]';
                } else if (isChosen && !isCorrectOpt) {
                  style = 'bg-red-950/60 border-red-500/80 text-red-200';
                } else {
                  style = 'bg-slate-900/30 border-slate-800/40 text-slate-500 opacity-60';
                }
              } else if (isChosen) {
                style = 'bg-[#182613] border-[#a3e635] text-white shadow-[0_0_12px_rgba(163,230,53,0.15)]';
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all min-h-[50px] ${style}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      hasSubmitted && isCorrectOpt
                        ? 'bg-emerald-500 text-black'
                        : hasSubmitted && isChosen && !isCorrectOpt
                        ? 'bg-red-500 text-white'
                        : isChosen
                        ? 'bg-[#a3e635] text-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm font-medium flex-1 pt-0.5">
                    {option}
                  </span>
                  {hasSubmitted && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isChosen && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Practical Tip Drawer */}
          {hasSubmitted && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer! (+15 FitPoints)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Learning Moment
                  </span>
                )}
              </div>

              {/* Scientific Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>

              {/* Practical Everyday Tip */}
              <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-[#bef264] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#bef264]">FitQuest Tip: </strong>
                  <span className="text-slate-300">{currentQuestion.practicalTip}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          {hasSubmitted ? (
            <>
              {!isCorrect && (
                <button
                  onClick={handleResetCurrent}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              )}
              <button
                onClick={handleNext}
                className="ml-auto h-12 px-6 rounded-xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-bold text-sm flex items-center gap-2 shadow-[0_2px_12px_rgba(163,230,53,0.3)] hover:brightness-105 active:scale-[0.98] transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className={`w-full h-12 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black shadow-[0_2px_12px_rgba(163,230,53,0.3)] hover:brightness-105 active:scale-[0.98]'
                  : 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
              }`}
            >
              <span>Submit Answer</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
