import React, { useState } from 'react';
import { UserProfile, UserPreferences, Achievement } from '../types';
import { calculateLevel } from '../services/storage';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { soundEffects } from '../services/audio';
import {
  X,
  User,
  Settings,
  Flame,
  Zap,
  Award,
  Bell,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  Edit3,
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  Calendar
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  achievements: Achievement[];
  onUpdateName: (name: string) => void;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onOpenOnboarding: () => void;
  onExportData: () => void;
  onResetData: () => void;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<Props> = ({
  profile,
  achievements,
  onUpdateName,
  onUpdatePreferences,
  onOpenOnboarding,
  onExportData,
  onResetData,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const levelInfo = calculateLevel(profile.fitPoints);

  const handleSaveName = () => {
    soundEffects.playTap();
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const unlockedAchIds = new Set(profile.unlockedAchievements);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                soundEffects.playTap();
                setActiveTab('profile');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => {
                soundEffects.playTap();
                setActiveTab('settings');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 1: Profile View */}
        {activeTab === 'profile' && (
          <div className="overflow-y-auto flex-1 py-4 space-y-5 pr-1">
            {/* User Identity Header */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center shrink-0">
                <span className="font-display font-extrabold text-2xl text-white">
                  {profile.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#84cc16] text-[10px] font-black text-black">
                  Lvl {levelInfo.level}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="h-8 px-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="h-8 px-2.5 rounded-lg bg-[#bef264] text-black text-xs font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-extrabold text-lg text-white truncate">
                      {profile.name}
                    </h3>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="text-xs text-[#a3e635] font-semibold mt-0.5">
                  {levelInfo.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Member since {profile.joinedDate}
                </div>
              </div>
            </div>

            {/* Level XP Progress */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Level {levelInfo.level} Progression</span>
                <span className="text-[#bef264] font-mono">
                  {levelInfo.currentXp} / {levelInfo.nextXp} XP
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#bef264] to-[#84cc16]"
                  style={{
                    width: `${Math.min((levelInfo.currentXp / levelInfo.nextXp) * 100, 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Lifetime Stats Strip */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-2xl">
                <div className="text-xl font-bold font-mono text-white">
                  {profile.completedWorkoutsCount}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Workouts
                </div>
              </div>
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-2xl">
                <div className="text-xl font-bold font-mono text-white">
                  {profile.totalActiveMinutes}m
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Active Min
                </div>
              </div>
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-2xl">
                <div className="text-xl font-bold font-mono text-orange-400 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-orange-400" />
                  <span>{profile.currentStreak}d</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Streak
                </div>
              </div>
            </div>

            {/* Earned Badges Showcase */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Achievement Badges ({profile.unlockedAchievements.length} / {INITIAL_ACHIEVEMENTS.length})
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {INITIAL_ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = unlockedAchIds.has(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        isUnlocked
                          ? 'bg-[#162211] border-[#a3e635]/40 text-white'
                          : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Award
                          className={`w-4 h-4 ${
                            isUnlocked ? 'text-[#bef264]' : 'text-slate-600'
                          }`}
                        />
                        <span className="text-xs font-bold truncate">
                          {ach.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {ach.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Settings */}
        {activeTab === 'settings' && (
          <div className="overflow-y-auto flex-1 py-4 space-y-4 pr-1">
            {/* Fitness Plan & Preferences */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Fitness Plan Cues</h4>
                  <p className="text-xs text-slate-400">
                    Goal: <span className="text-white capitalize">{profile.preferences.fitnessGoal.replace('_', ' ')}</span> &bull; {profile.preferences.dailyMinutes} min/day
                  </p>
                </div>
                <button
                  onClick={onOpenOnboarding}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
                >
                  Edit Plan
                </button>
              </div>
            </div>

            {/* Audio Toggles */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#bef264]" />
                <div>
                  <h4 className="text-sm font-bold text-white">Sound Effects</h4>
                  <p className="text-xs text-slate-400">Audio countdowns & success chimes</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.preferences.soundEnabled}
                onChange={(e) => onUpdatePreferences({ soundEnabled: e.target.checked })}
                className="w-5 h-5 accent-[#a3e635] cursor-pointer"
              />
            </div>

            {/* Daily Supportive Reminders */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-sky-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Supportive Reminders</h4>
                  <p className="text-xs text-slate-400">Positive gentle nudge without guilt</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.preferences.notificationsEnabled}
                onChange={(e) => onUpdatePreferences({ notificationsEnabled: e.target.checked })}
                className="w-5 h-5 accent-[#a3e635] cursor-pointer"
              />
            </div>

            {/* Data Export & Account Controls */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Privacy & Data
              </h4>
              <button
                onClick={onExportData}
                className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Export My Workout Progress (JSON)</span>
              </button>

              <button
                onClick={onResetData}
                className="w-full h-11 rounded-xl bg-red-950/40 border border-red-500/30 hover:bg-red-900/40 text-red-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset All Local Progress Data</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
