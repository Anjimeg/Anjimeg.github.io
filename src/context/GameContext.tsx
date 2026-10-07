import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, Lesson, Quest } from '../types';
import { soundEffects } from '../utils/sound';

interface GameContextType {
  stats: UserStats;
  activeTab: 'learn' | 'aksara' | 'dictionary' | 'leaderboard' | 'shop' | 'profile';
  setActiveTab: (tab: 'learn' | 'aksara' | 'dictionary' | 'leaderboard' | 'shop' | 'profile') => void;
  activeLesson: Lesson | null;
  startLesson: (lesson: Lesson) => void;
  closeLesson: () => void;
  loseHeart: () => boolean; // returns true if still has hearts
  refillHearts: (free?: boolean) => boolean;
  completeLesson: (lessonId: string, earnedXp: number) => void;
  spendGems: (amount: number) => boolean;
  buyStreakFreeze: () => boolean;
  equipOutfit: (outfitId: string) => void;
  quests: Quest[];
  claimQuest: (questId: string) => void;
  toggleSound: () => void;
  resetProgress: () => void;
  hasCompletedLesson: (lessonId: string) => boolean;
  isLessonUnlocked: (lessonId: string, unitIndex: number, lessonIndex: number) => boolean;
}

const DEFAULT_STATS: UserStats = {
  xp: 45,
  gems: 120, // Intan
  hearts: 5,
  maxHearts: 5,
  streak: 3, // 3-day active streak to start excitingly
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['u1-l1'],
  activeUnitId: 'unit-1',
  streakFreezeCount: 1,
  unlockedBadges: ['pujangga_mula', 'salam_jawa'],
  soundEnabled: true,
  activeOutfit: 'classic',
};

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q-1',
    title: 'Srawung Basa',
    description: 'Rampungake 2 pasinaon dina iki',
    target: 2,
    current: 1,
    rewardGems: 20,
    completed: false
  },
  {
    id: 'q-2',
    title: 'Ngempalake Kawruh',
    description: 'Entukna 50 XP dina iki',
    target: 50,
    current: 45,
    rewardGems: 30,
    completed: false
  },
  {
    id: 'q-3',
    title: 'Maca Hanacaraka',
    description: 'Sinau aksara Jawa anyar',
    target: 1,
    current: 0,
    rewardGems: 25,
    completed: false
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('gamavation_stats_v1') || localStorage.getItem('jawalingo_stats_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_STATS;
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    try {
      const saved = localStorage.getItem('gamavation_quests_v1') || localStorage.getItem('jawalingo_quests_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_QUESTS;
  });

  const [activeTab, setActiveTab] = useState<'learn' | 'aksara' | 'dictionary' | 'leaderboard' | 'shop' | 'profile'>('learn');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Save on stats change
  useEffect(() => {
    try {
      localStorage.setItem('gamavation_stats_v1', JSON.stringify(stats));
    } catch {
      // Storage error fallback
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem('gamavation_quests_v1', JSON.stringify(quests));
    } catch {
      // Storage error fallback
    }
  }, [quests]);

  const toggleSound = () => {
    setStats(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const loseHeart = (): boolean => {
    if (stats.soundEnabled) {
      soundEffects.playHeartLost();
    }
    let remaining = stats.hearts;
    setStats(prev => {
      remaining = Math.max(0, prev.hearts - 1);
      return { ...prev, hearts: remaining };
    });
    return remaining > 0;
  };

  const refillHearts = (free: boolean = false): boolean => {
    if (!free && stats.gems < 50) return false;
    setStats(prev => ({
      ...prev,
      gems: free ? prev.gems : prev.gems - 50,
      hearts: prev.maxHearts
    }));
    if (stats.soundEnabled) {
      soundEffects.playTap();
    }
    return true;
  };

  const completeLesson = (lessonId: string, earnedXp: number) => {
    const today = new Date().toISOString().split('T')[0];
    const isNewDay = stats.lastActiveDate !== today;

    setStats(prev => {
      const isAlreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isAlreadyCompleted
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];

      const newStreak = isNewDay ? prev.streak + 1 : prev.streak;
      const earnedGems = isAlreadyCompleted ? 5 : 20;

      return {
        ...prev,
        xp: prev.xp + earnedXp,
        gems: prev.gems + earnedGems,
        streak: newStreak,
        lastActiveDate: today,
        completedLessonIds: newCompleted,
      };
    });

    // Update quest progress
    setQuests(prev =>
      prev.map(q => {
        if (q.id === 'q-1') {
          const next = Math.min(q.target, q.current + 1);
          return { ...q, current: next, completed: next >= q.target };
        }
        if (q.id === 'q-2') {
          const next = Math.min(q.target, q.current + earnedXp);
          return { ...q, current: next, completed: next >= q.target };
        }
        if (q.id === 'q-3' && lessonId.includes('u4')) {
          const next = Math.min(q.target, q.current + 1);
          return { ...q, current: next, completed: next >= q.target };
        }
        return q;
      })
    );
  };

  const spendGems = (amount: number): boolean => {
    if (stats.gems < amount) return false;
    setStats(prev => ({ ...prev, gems: prev.gems - amount }));
    return true;
  };

  const buyStreakFreeze = (): boolean => {
    if (spendGems(80)) {
      setStats(prev => ({ ...prev, streakFreezeCount: prev.streakFreezeCount + 1 }));
      return true;
    }
    return false;
  };

  const equipOutfit = (outfitId: string) => {
    setStats(prev => ({ ...prev, activeOutfit: outfitId }));
  };

  const claimQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || !quest.completed) return;
    setStats(prev => ({ ...prev, gems: prev.gems + quest.rewardGems }));
    setQuests(prev => prev.filter(q => q.id !== questId));
    if (stats.soundEnabled) {
      soundEffects.playCorrect();
    }
  };

  const startLesson = (lesson: Lesson) => {
    if (stats.hearts <= 0) {
      return;
    }
    setActiveLesson(lesson);
  };

  const closeLesson = () => {
    setActiveLesson(null);
  };

  const hasCompletedLesson = (lessonId: string): boolean => {
    return stats.completedLessonIds.includes(lessonId);
  };

  const isLessonUnlocked = (lessonId: string, unitIndex: number, lessonIndex: number): boolean => {
    if (unitIndex === 0 && lessonIndex === 0) return true;
    // Check if the previous lesson is completed, or if this lesson is already done
    if (stats.completedLessonIds.includes(lessonId)) return true;
    // Otherwise unlocked if user has at least reached this point
    // Unit 1 lesson 1 is already in default completed, so lesson 2 is unlocked
    return true; // Make lessons playable and accessible for a delightful learning experience
  };

  const resetProgress = () => {
    localStorage.removeItem('gamavation_stats_v1');
    localStorage.removeItem('gamavation_quests_v1');
    localStorage.removeItem('jawalingo_stats_v1');
    localStorage.removeItem('jawalingo_quests_v1');
    setStats(DEFAULT_STATS);
    setQuests(INITIAL_QUESTS);
  };

  return (
    <GameContext.Provider
      value={{
        stats,
        activeTab,
        setActiveTab,
        activeLesson,
        startLesson,
        closeLesson,
        loseHeart,
        refillHearts,
        completeLesson,
        spendGems,
        buyStreakFreeze,
        equipOutfit,
        quests,
        claimQuest,
        toggleSound,
        resetProgress,
        hasCompletedLesson,
        isLessonUnlocked
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
