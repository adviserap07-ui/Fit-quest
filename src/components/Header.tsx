import React from 'react';
import { Zap, Flame, Volume2, VolumeX, Shield, User } from 'lucide-react';
import { UserProfile } from '../types';
import { soundEffects } from '../services/audio';

interface Props {
  profile: UserProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
  onOpenShop: () => void;
}

export const Header: React.FC<Props> = ({
  profile,
  soundEnabled,
  onToggleSound,
  onOpenProfile,
  onOpenShop
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0d0f12]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone: Original Stylized Logo + Brand Title */}
        <div className="flex items-center gap-2.5 shrink-0 select-none cursor-pointer" onClick={onOpenProfile}>
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#bef264] to-[#84cc16] flex items-center justify-center shadow-[0_0_16px_rgba(163,230,53,0.3)]">
            {/* Stylized Fitness Dumbbell merged with Lightning Bolt */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-black fill-current stroke-black" strokeWidth="0.5">
              {/* Lightning Bolt cut into athletic dumbbell */}
              <path d="M13 2L3 14H11L10 22L21 9H13L15 2H13Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-white leading-none">
              FitQuest
            </span>
            <span className="text-[10px] font-semibold text-[#a3e635] uppercase tracking-wider mt-0.5">
              Move &bull; Grow
            </span>
          </div>
        </div>

        {/* Right Zone: Streak + FitPoints + Sound + Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <div
            title={`Active streak: ${profile.currentStreak} day${profile.currentStreak > 1 ? 's' : ''}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-orange-400 text-xs font-bold tabular-nums"
          >
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400 animate-pulse" />
            <span>{profile.currentStreak}d</span>
          </div>

          {/* FitPoints balance button (opens reward shop) */}
          <button
            onClick={() => {
              soundEffects.playTap();
              onOpenShop();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#182013] border border-[#a3e635]/30 text-[#bef264] hover:border-[#a3e635]/60 hover:bg-[#202c19] transition-colors text-xs font-bold tabular-nums min-h-[36px]"
          >
            <Zap className="w-3.5 h-3.5 fill-[#bef264] text-[#bef264]" />
            <span>{profile.fitPoints} pts</span>
          </button>

          {/* Sound Toggle Button (>=44px touch hitbox) */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) soundEffects.playTap();
            }}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#a3e635]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* User Profile Avatar (>=44px touch hitbox) */}
          <button
            onClick={() => {
              soundEffects.playTap();
              onOpenProfile();
            }}
            aria-label="Open User Profile and Settings"
            className="relative w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-[#a3e635] transition-all"
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <span className="font-display font-bold text-xs text-white">
                {profile.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            {/* Level indicator dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#84cc16] text-[9px] font-black text-black flex items-center justify-center">
              {profile.level}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
