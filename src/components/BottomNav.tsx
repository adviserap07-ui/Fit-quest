import React from 'react';
import { Home, Dumbbell, Target, Brain, TrendingUp } from 'lucide-react';
import { ActiveTab } from '../types';
import { soundEffects } from '../services/audio';

interface Props {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Home },
    { id: 'workouts' as ActiveTab, label: 'Workouts', icon: Dumbbell },
    { id: 'challenges' as ActiveTab, label: 'Quests', icon: Target },
    { id: 'brain' as ActiveTab, label: 'Brain', icon: Brain },
    { id: 'progress' as ActiveTab, label: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f12]/95 backdrop-blur-lg border-t border-slate-800/90 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundEffects.playTap();
                onChangeTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center h-full w-full py-1 min-h-[48px] transition-colors relative select-none ${
                isActive ? 'text-[#bef264]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-1.5 w-7 h-1 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
              )}
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              <span className={`text-[11px] font-semibold mt-1 tracking-tight truncate ${isActive ? 'text-white' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
