import React, { useState } from 'react';
import { Flame, Gem, Heart, Volume2, VolumeX, Plus, Calendar, Lightbulb } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { getTodayJavaneseInfo } from '../utils/javaneseDate';
import { UgmLogo } from './UgmLogo';

export const TopStatusBar: React.FC = () => {
  const { stats, refillHearts, toggleSound, setActiveTab } = useGame();
  const [showHeartModal, setShowHeartModal] = useState(false);
  const todayWeton = getTodayJavaneseInfo();

  const handleRefill = (free: boolean) => {
    refillHearts(free);
    setShowHeartModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200/90 px-2.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-2xs">
        {/* Left: Brand mobile with UGM Logo & Dina Asli Tag */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 md:hidden shrink-0">
            <UgmLogo size={26} color="#1e88e5" />
            <span className="font-black text-sm sm:text-base text-[#1e88e5] tracking-tight">Gamavation</span>
          </div>

          {/* Authentic Dina Jawa Badge */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl bg-blue-50/80 border border-blue-200 text-[#1565c0] font-black text-[11px] sm:text-xs shrink-0">
            <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#f59e0b]" />
            <span>{todayWeton.weton}</span>
            <span className="hidden sm:inline text-[11px] text-slate-500 font-semibold">· Neptu {todayWeton.totalNeptu}</span>
          </div>
        </div>

        {/* Right / Center Stats bar */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 ml-auto shrink-0">
          {/* Streak Flame */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-700 font-black text-xs sm:text-sm">
            <Flame className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{stats.streak}</span>
            <span className="hidden md:inline text-xs font-bold text-amber-800/80">Dina</span>
          </div>

          {/* Gems / Intan */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200 text-[#1565c0] font-black text-xs sm:text-sm">
            <Gem className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-[#f59e0b] text-[#f59e0b]" />
            <span>{stats.gems}</span>
          </div>

          {/* Hints / Petunjuk */}
          <button
            onClick={() => setActiveTab('shop')}
            className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 rounded-xl bg-amber-50/90 border border-amber-300 text-[#b45309] font-black text-xs sm:text-sm hover:bg-amber-100 transition-colors cursor-pointer shadow-2xs"
            title="Petunjuk Belajar Tersedia (Klik untuk belanja di Pasar)"
          >
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-300" />
            <span>{stats.hintCount}</span>
          </button>

          {/* Hearts / Nyawa */}
          <button
            onClick={() => setShowHeartModal(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 rounded-xl bg-red-50 border border-red-200/80 text-red-600 font-black text-xs sm:text-sm hover:bg-red-100 transition-colors cursor-pointer"
            title="Klik kanggo nambah nyawa"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-5 sm:h-5 fill-red-500 text-red-500 ${stats.hearts <= 1 ? 'animate-bounce' : ''}`} />
            <span>{stats.hearts}</span>
            {stats.hearts < stats.maxHearts && (
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] ml-0.5">
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="p-1 sm:p-2 rounded-xl text-slate-500 hover:text-[#1e88e5] hover:bg-slate-100 transition-colors"
            title={stats.soundEnabled ? 'Swara Urip' : 'Swara Mati'}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e88e5]" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>
        </div>
      </header>

      {/* Heart Refill Modal */}
      {showHeartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-blue-200 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-4">
              <Heart className="w-9 h-9 fill-red-500" />
            </div>

            <h3 className="text-xl font-extrabold text-[#1565c0] mb-1">
              Nyawa Belajar: {stats.hearts}/{stats.maxHearts}
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Nyawa berkurang 1 jika salah menjawab pertanyaan kuis. Pulihkan nyawamu agar bisa terus berlatih bahasa Jawa!
            </p>

            <div className="space-y-3">
              <button
                disabled={stats.gems < 50 || stats.hearts >= stats.maxHearts}
                onClick={() => handleRefill(false)}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-sm gama-btn-gold flex items-center justify-center gap-2 ${
                  stats.gems < 50 || stats.hearts >= stats.maxHearts ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>Isi Penuh (5 Nyawa)</span>
                <span className="flex items-center gap-1 bg-black/10 px-2 py-0.5 rounded-lg text-xs font-black">
                  <Gem className="w-3.5 h-3.5 fill-[#1e293b]" /> 50
                </span>
              </button>

              <button
                onClick={() => handleRefill(true)}
                className="w-full py-3 px-4 rounded-2xl font-bold text-sm gama-btn-primary flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pulihkan Gratis (+5 Nyawa)</span>
              </button>

              <button
                onClick={() => setShowHeartModal(false)}
                className="w-full py-2.5 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
