import React from 'react';
import { RewardItem, UserProfile } from '../types';
import { REWARD_ITEMS } from '../data/rewards';
import { soundEffects } from '../services/audio';
import {
  X,
  Zap,
  Sparkles,
  Check,
  Shield,
  Palette,
  Award,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  profile: UserProfile;
  onPurchaseReward: (item: RewardItem) => void;
  onEquipReward: (item: RewardItem) => void;
  onClose: () => void;
}

export const RewardShopModal: React.FC<Props> = ({
  profile,
  onPurchaseReward,
  onEquipReward,
  onClose
}) => {
  const unlockedSet = new Set(profile.unlockedRewards);

  const handleBuy = (item: RewardItem) => {
    if (profile.fitPoints < item.costPoints) return;
    soundEffects.playSuccessChord();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#bef264', '#38bdf8', '#ffffff']
      });
    } catch {}
    onPurchaseReward(item);
  };

  const handleEquip = (item: RewardItem) => {
    soundEffects.playTap();
    onEquipReward(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#a3e635] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>FitQuest Vault</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-white">
              FitPoints Reward Shop
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

        {/* User Balance Strip */}
        <div className="py-3 flex items-center justify-between border-b border-slate-800/80">
          <span className="text-xs text-slate-400">Available Balance</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182312] border border-[#a3e635]/40 text-[#bef264] text-xs font-bold font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>{profile.fitPoints} FitPoints</span>
          </div>
        </div>

        {/* Items List */}
        <div className="overflow-y-auto flex-1 py-4 space-y-3 pr-1">
          {REWARD_ITEMS.map((item) => {
            const isUnlocked = unlockedSet.has(item.id) || item.costPoints === 0;
            const canAfford = profile.fitPoints >= item.costPoints;
            const isEquipped =
              profile.selectedFrameId === item.id ||
              profile.activeThemeId === item.id;

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#bef264] shrink-0">
                    {item.category === 'frame' ? (
                      <Sparkles className="w-5 h-5" />
                    ) : item.category === 'theme' ? (
                      <Palette className="w-5 h-5" />
                    ) : (
                      <Award className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {item.name}
                      </h4>
                      {isEquipped && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#84cc16] text-black">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleEquip(item)}
                      className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all ${
                        isEquipped
                          ? 'bg-slate-800 text-slate-400 cursor-default'
                          : 'bg-[#bef264] text-black hover:brightness-105'
                      }`}
                    >
                      {isEquipped ? 'Equipped' : 'Equip'}
                    </button>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => handleBuy(item)}
                      className={`h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        canAfford
                          ? 'bg-[#1e2a14] border border-[#a3e635]/60 text-[#bef264] hover:bg-[#28381b]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      <span>{item.costPoints} pts</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
          Zero real money purchases. Points are earned purely by exercising and learning.
        </p>
      </div>
    </div>
  );
};
