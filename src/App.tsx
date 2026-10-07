import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { TopStatusBar } from './components/TopStatusBar';
import { Sidebar } from './components/Sidebar';
import { LessonPath } from './components/LessonPath';
import { AksaraJawaView } from './components/AksaraJawaView';
import { DictionaryView } from './components/DictionaryView';
import { LeaderboardView } from './components/LeaderboardView';
import { ShopView } from './components/ShopView';
import { ProfileView } from './components/ProfileView';
import { QuizModal } from './components/QuizModal';
import { BalairungBackdrop } from './components/BalairungBackdrop';
import { hymneMusic} from './utils/sound';

const AppContent: React.FC = () => {
  const { activeTab, activeLesson, closeLesson } = useGame();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex relative selection:bg-[#1e88e5] selection:text-white">
      {/* Balairung UGM Soft Architectural Backdrop */}
      <BalairungBackdrop />

      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen relative z-10">
        <TopStatusBar />

        <main className="flex-1 w-full">
          {activeTab === 'learn' && <LessonPath />}
          {activeTab === 'aksara' && <AksaraJawaView />}
          {activeTab === 'dictionary' && <DictionaryView />}
          {activeTab === 'leaderboard' && <LeaderboardView />}
          {activeTab === 'shop' && <ShopView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Active Quiz Takeover */}
      {activeLesson && <QuizModal lesson={activeLesson} onClose={closeLesson} />}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
