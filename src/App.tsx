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

const AppContent: React.FC = () => {
  const { activeTab, activeLesson } = useGame();

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#4b4b4b] flex">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
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
      {activeLesson && <QuizModal />}
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
