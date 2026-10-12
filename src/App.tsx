/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ActiveTab,
  UserProfile,
  Workout,
  DailyChallenge,
  RewardItem,
  WorkoutSessionRecord,
  QuizAttemptRecord,
  UserPreferences,
  Achievement
} from './types';
import {
  getStoredProfile,
  saveProfile,
  getStoredAchievements,
  checkAndUnlockAchievements,
  updateStreak,
  calculateLevel,
  DEFAULT_PROFILE
} from './services/storage';
import { soundEffects } from './services/audio';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { WorkoutDetailsModal } from './components/WorkoutDetailsModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { QuizModal } from './components/QuizModal';
import { ChallengeModal } from './components/ChallengeModal';
import { RewardShopModal } from './components/RewardShopModal';
import { CommunityModal } from './components/CommunityModal';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';

// Views
import { HomeView } from './views/HomeView';
import { WorkoutsView } from './views/WorkoutsView';
import { ChallengesView } from './views/ChallengesView';
import { BrainView } from './views/BrainView';
import { ProgressView } from './views/ProgressView';

import { Award, Sparkles, X } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => getStoredProfile());
  const [achievements, setAchievements] = useState<Achievement[]>(() => getStoredAchievements());

  // Navigation and Modal States
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Only show splash if user hasn't visited before or has 0 completed workouts
    return !localStorage.getItem('fitquest_has_visited');
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // Active workout & quiz selections
  const [selectedWorkoutForDetails, setSelectedWorkoutForDetails] = useState<Workout | null>(null);
  const [activeWorkoutPlaying, setActiveWorkoutPlaying] = useState<Workout | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<DailyChallenge | null>(null);
  const [activeQuizQuestionId, setActiveQuizQuestionId] = useState<string | undefined>(undefined);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Achievement toast notification
  const [unlockedToast, setUnlockedToast] = useState<Achievement | null>(null);

  // Check streaks on mount
  useEffect(() => {
    const updated = updateStreak(profile);
    setProfile(updated);
    soundEffects.setMuted(!updated.preferences.soundEnabled);
  }, []);

  // Update profile and sync achievements
  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    const { updatedProfile, newlyUnlocked } = checkAndUnlockAchievements(newProfile, (ach) => {
      setUnlockedToast(ach);
      soundEffects.playSuccessChord();
      setTimeout(() => setUnlockedToast(null), 5000);
    });
    if (newlyUnlocked.length > 0) {
      setProfile(updatedProfile);
    }
  };

  // Sound toggle handler
  const handleToggleSound = () => {
    const current = profile.preferences.soundEnabled;
    const nextState = !current;
    soundEffects.setMuted(!nextState);
    const updated = {
      ...profile,
      preferences: {
        ...profile.preferences,
        soundEnabled: nextState
      }
    };
    handleUpdateProfile(updated);
  };

  // Splash Screen transitions
  const handleDismissSplash = (openOnboarding = false) => {
    localStorage.setItem('fitquest_has_visited', 'true');
    setShowSplash(false);
    if (openOnboarding) {
      setShowOnboarding(true);
    }
  };

  // Workout Session Completed
  const handleFinishWorkout = (record: WorkoutSessionRecord) => {
    const updatedMinutes = profile.totalActiveMinutes + Math.round(record.durationSeconds / 60);
    const updatedPoints = profile.fitPoints + record.pointsEarned;
    const updatedCount = profile.completedWorkoutsCount + 1;
    const updatedHistory = [record, ...profile.history];

    const updatedProfile: UserProfile = {
      ...profile,
      fitPoints: updatedPoints,
      totalActiveMinutes: updatedMinutes,
      completedWorkoutsCount: updatedCount,
      history: updatedHistory,
      level: calculateLevel(updatedPoints).level
    };

    setActiveWorkoutPlaying(null);
    handleUpdateProfile(updatedProfile);
  };

  // Quiz Attempt Completed
  const handleRecordQuizAttempt = (attempt: QuizAttemptRecord, pointsEarned: number) => {
    const updatedPoints = profile.fitPoints + pointsEarned;
    const updatedAttempts = [attempt, ...profile.quizAttempts];

    const updatedProfile: UserProfile = {
      ...profile,
      fitPoints: updatedPoints,
      quizAttempts: updatedAttempts,
      level: calculateLevel(updatedPoints).level
    };
    handleUpdateProfile(updatedProfile);
  };

  // Challenge Progress Updated
  const handleUpdateChallengeProgress = (challengeId: string, countDelta: number, isComplete: boolean) => {
    let completedList = [...profile.completedChallenges];
    let extraPoints = 0;

    if (isComplete && !completedList.includes(challengeId)) {
      completedList.push(challengeId);
      extraPoints = 50;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      fitPoints: profile.fitPoints + extraPoints,
      completedChallenges: completedList,
      level: calculateLevel(profile.fitPoints + extraPoints).level
    };
    handleUpdateProfile(updatedProfile);
  };

  // Purchase Shop Item
  const handlePurchaseReward = (item: RewardItem) => {
    if (profile.fitPoints < item.costPoints) return;
    const updatedUnlocked = [...profile.unlockedRewards, item.id];
    const updatedPoints = profile.fitPoints - item.costPoints;

    const updated: UserProfile = {
      ...profile,
      fitPoints: updatedPoints,
      unlockedRewards: updatedUnlocked
    };
    handleUpdateProfile(updated);
  };

  // Equip Shop Item
  const handleEquipReward = (item: RewardItem) => {
    const updated: UserProfile = {
      ...profile,
      selectedFrameId: item.category === 'frame' ? item.id : profile.selectedFrameId,
      activeThemeId: item.category === 'theme' ? item.id : profile.activeThemeId
    };
    handleUpdateProfile(updated);
  };

  // Export User Progress Data (JSON)
  const handleExportData = () => {
    soundEffects.playTap();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fitquest_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset Progress
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset your local workout history and points?')) {
      localStorage.removeItem('fitquest_user_profile_v1');
      localStorage.removeItem('fitquest_achievements_v1');
      setProfile(DEFAULT_PROFILE);
      setShowProfileSettings(false);
      soundEffects.playTap();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-slate-100 flex flex-col selection:bg-[#a3e635] selection:text-black">
      {/* Top Header */}
      <Header
        profile={profile}
        soundEnabled={profile.preferences.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProfile={() => setShowProfileSettings(true)}
        onOpenShop={() => setShowShop(true)}
      />

      {/* Main Tab View Canvas */}
      <main className="flex-1 w-full max-w-xl mx-auto flex flex-col">
        {activeTab === 'home' && (
          <HomeView
            profile={profile}
            onSelectWorkout={(w) => setSelectedWorkoutForDetails(w)}
            onSelectChallenge={(c) => setSelectedChallenge(c)}
            onOpenQuiz={(qId) => {
              setActiveQuizQuestionId(qId);
              setShowQuizModal(true);
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenCommunity={() => setShowCommunity(true)}
          />
        )}

        {activeTab === 'workouts' && (
          <WorkoutsView
            onSelectWorkout={(w) => setActiveWorkoutPlaying(w)}
            onOpenDetails={(w) => setSelectedWorkoutForDetails(w)}
          />
        )}

        {activeTab === 'challenges' && (
          <ChallengesView
            onSelectChallenge={(c) => setSelectedChallenge(c)}
            completedChallengeIds={profile.completedChallenges}
          />
        )}

        {activeTab === 'brain' && (
          <BrainView
            quizAttempts={profile.quizAttempts}
            onOpenQuizModal={(qId) => {
              setActiveQuizQuestionId(qId);
              setShowQuizModal(true);
            }}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            profile={profile}
            onOpenShop={() => setShowShop(true)}
          />
        )}
      </main>

      {/* Bottom Mobile Tab Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
      />

      {/* MODALS & OVERLAYS */}

      {/* 1. Splash Screen */}
      {showSplash && (
        <SplashScreen
          onGetStarted={() => handleDismissSplash(true)}
          onExploreGuest={() => handleDismissSplash(false)}
        />
      )}

      {/* 2. Onboarding Questionnaire */}
      {showOnboarding && (
        <OnboardingModal
          initialPreferences={profile.preferences}
          userName={profile.name}
          onComplete={(newPrefs, newName) => {
            const updated: UserProfile = {
              ...profile,
              name: newName,
              preferences: newPrefs
            };
            handleUpdateProfile(updated);
            setShowOnboarding(false);
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {/* 3. Workout Details Modal */}
      {selectedWorkoutForDetails && (
        <WorkoutDetailsModal
          workout={selectedWorkoutForDetails}
          onStart={(w) => {
            setSelectedWorkoutForDetails(null);
            setActiveWorkoutPlaying(w);
          }}
          onClose={() => setSelectedWorkoutForDetails(null)}
        />
      )}

      {/* 4. Guided Workout Player (Active full-screen view) */}
      {activeWorkoutPlaying && (
        <WorkoutPlayer
          workout={activeWorkoutPlaying}
          onFinishWorkout={handleFinishWorkout}
          onExit={() => setActiveWorkoutPlaying(null)}
        />
      )}

      {/* 5. Brain Arena Quiz Modal */}
      {showQuizModal && (
        <QuizModal
          initialQuestionId={activeQuizQuestionId}
          onRecordAttempt={handleRecordQuizAttempt}
          onClose={() => {
            setShowQuizModal(false);
            setActiveQuizQuestionId(undefined);
          }}
        />
      )}

      {/* 6. Challenge Details Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          onUpdateChallengeProgress={handleUpdateChallengeProgress}
          onStartRelatedActivity={(c) => {
            setSelectedChallenge(null);
            if (c.type === 'knowledge') {
              setActiveTab('brain');
              setShowQuizModal(true);
            } else {
              setActiveTab('workouts');
            }
          }}
          onClose={() => setSelectedChallenge(null)}
        />
      )}

      {/* 7. Reward Shop Modal */}
      {showShop && (
        <RewardShopModal
          profile={profile}
          onPurchaseReward={handlePurchaseReward}
          onEquipReward={handleEquipReward}
          onClose={() => setShowShop(false)}
        />
      )}

      {/* 8. Community Modal */}
      {showCommunity && (
        <CommunityModal
          profile={profile}
          onClose={() => setShowCommunity(false)}
        />
      )}

      {/* 9. Profile & Settings Modal */}
      {showProfileSettings && (
        <ProfileSettingsModal
          profile={profile}
          achievements={achievements}
          onUpdateName={(name) => {
            handleUpdateProfile({ ...profile, name });
          }}
          onUpdatePreferences={(prefs) => {
            handleUpdateProfile({
              ...profile,
              preferences: { ...profile.preferences, ...prefs }
            });
          }}
          onOpenOnboarding={() => {
            setShowProfileSettings(false);
            setShowOnboarding(true);
          }}
          onExportData={handleExportData}
          onResetData={handleResetData}
          onClose={() => setShowProfileSettings(false)}
        />
      )}

      {/* ACHIEVEMENT UNLOCKED FLOATING TOAST */}
      {unlockedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm p-4 rounded-2xl bg-gradient-to-r from-[#182312] to-slate-900 border border-[#a3e635] shadow-[0_8px_30px_rgba(163,230,53,0.35)] flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#bef264] text-black flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#a3e635] uppercase tracking-wider block">
                Badge Unlocked! (+{unlockedToast.pointsReward} FitPoints)
              </span>
              <h4 className="text-sm font-bold text-white">
                {unlockedToast.title}
              </h4>
            </div>
          </div>
          <button
            onClick={() => setUnlockedToast(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
