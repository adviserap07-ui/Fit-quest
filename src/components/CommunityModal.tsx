import React, { useState } from 'react';
import { UserProfile } from '../types';
import { soundEffects } from '../services/audio';
import {
  X,
  Users,
  Heart,
  Share2,
  Sparkles,
  Shield,
  MessageSquare,
  Award,
  CheckCircle2
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onClose: () => void;
}

interface CommunityPost {
  id: string;
  userName: string;
  badgeTitle: string;
  workoutTitle: string;
  timeAgo: string;
  highFives: number;
  hasHighFived?: boolean;
}

export const CommunityModal: React.FC<Props> = ({ profile, onClose }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'c1',
      userName: 'Maya Lin',
      badgeTitle: 'Consistency Starter',
      workoutTitle: 'Beginner Full Body Foundation',
      timeAgo: '20m ago',
      highFives: 14,
      hasHighFived: false
    },
    {
      id: 'c2',
      userName: 'Marcus Cole',
      badgeTitle: 'Joint Freedom Guardian',
      workoutTitle: 'Total Body Mobility Flow',
      timeAgo: '1h ago',
      highFives: 22,
      hasHighFived: true
    },
    {
      id: 'c3',
      userName: 'Sarah Jenkins',
      badgeTitle: 'Quiz Explorer',
      workoutTitle: '5-Minute Midday Energizer',
      timeAgo: '3h ago',
      highFives: 9,
      hasHighFived: false
    }
  ]);

  const [communityGoalProgress, setCommunityGoalProgress] = useState(7420);
  const communityGoalTarget = 10000;

  const handleHighFive = (id: string) => {
    soundEffects.playTap();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.hasHighFived;
          return {
            ...p,
            hasHighFived: nextState,
            highFives: nextState ? p.highFives + 1 : p.highFives - 1
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#12151b] border border-slate-800 rounded-3xl p-6 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                FitQuest Circle
              </span>
              <h2 className="font-display font-extrabold text-xl text-white">
                Friendly Community Feed
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

        {/* Global Community Goal Card */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-sky-950/40 to-slate-900 border border-sky-500/20">
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className="text-sky-300">Community Quest: 10k Active Minutes</span>
            <span className="text-white font-mono">{communityGoalProgress} / {communityGoalTarget}m</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-[#bef264]"
              style={{ width: `${(communityGoalProgress / communityGoalTarget) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Together we move! Every workout logged contributes to the shared community milestone.
          </p>
        </div>

        {/* Feed Posts */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Recent Quester Celebrations
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-xs font-bold text-[#bef264] flex items-center justify-center">
                    {post.userName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {post.userName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {post.timeAgo}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#182312] border border-[#a3e635]/30 text-[10px] font-semibold text-[#bef264]">
                  <Award className="w-3 h-3" />
                  <span>{post.badgeTitle}</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800/60">
                Completed <strong className="text-white">{post.workoutTitle}</strong> with steady focus!
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleHighFive(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all min-h-[36px] ${
                    post.hasHighFived
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.hasHighFived ? 'fill-orange-400 text-orange-400' : ''}`} />
                  <span>High Five ({post.highFives})</span>
                </button>

                <span className="text-[11px] text-slate-500">
                  Safe & supportive community
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer notice */}
        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          FitQuest never displays sensitive body weights or comparative metrics.
        </div>
      </div>
    </div>
  );
};
