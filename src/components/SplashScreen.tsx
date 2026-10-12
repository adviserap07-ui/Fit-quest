import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../services/audio';

interface Props {
  onGetStarted: () => void;
  onExploreGuest: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onGetStarted, onExploreGuest }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0a0c0f] p-6 text-center select-none overflow-y-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[#84cc16]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#38bdf8]/10 blur-[120px] pointer-events-none" />

      {/* Top subtle badge */}
      <div className="pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
          <span>Home Fitness Made Achievable</span>
        </div>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center my-auto py-8">
        {/* Animated Brand Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#bef264] to-[#65a30d] p-0.5 shadow-[0_0_40px_rgba(163,230,53,0.35)] flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-[#0f1217] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-14 h-14 text-[#bef264] fill-current drop-shadow-[0_0_10px_rgba(190,242,100,0.5)]">
                <path d="M13 2L3 14H11L10 22L21 9H13L15 2H13Z" />
              </svg>
            </div>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute -inset-2 rounded-[30px] border border-[#a3e635]/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        </div>

        {/* Brand Name */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-white mb-2">
          Fit<span className="text-[#bef264]">Quest</span>
        </h1>

        {/* Official Tagline */}
        <p className="font-display text-xl sm:text-2xl font-bold text-slate-200 tracking-tight mb-3">
          Move Better. Grow Stronger.
        </p>

        <p className="text-sm text-slate-400 max-w-sm leading-relaxed mx-auto">
          No gym required. Guided bodyweight workouts, daily movement challenges, and smart fitness habit quests built for your lifestyle.
        </p>
      </div>

      {/* Bottom Action CTAs */}
      <div className="w-full max-w-sm flex flex-col gap-3 pb-8">
        <button
          onClick={() => {
            soundEffects.playTap();
            onGetStarted();
          }}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#bef264] to-[#84cc16] text-black font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(163,230,53,0.35)] hover:brightness-105 active:scale-[0.98] transition-all"
        >
          <span>Begin My Quest</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onExploreGuest();
          }}
          className="w-full h-12 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 font-medium text-sm hover:text-white hover:bg-slate-800 transition-colors"
        >
          Explore Workouts as Guest
        </button>

        <p className="text-[11px] text-slate-500 mt-1">
          Designed for all fitness levels &bull; Respects your pace &bull; Zero equipment
        </p>
      </div>
    </div>
  );
};
