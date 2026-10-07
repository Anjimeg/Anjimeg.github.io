import React, { useState } from 'react';
import { Flame, Gem, Heart, Volume2, VolumeX, Plus } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const TopStatusBar: React.FC = () => {
  const { stats, refillHearts, toggleSound } = useGame();
  const [showHeartModal, setShowHeartModal] = useState(false);

  const handleRefill = (free: boolean) => {
    refillHearts(free);
    setShowHeartModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        {/* Left: Brand mobile / Title indicator */}
        <div className="flex items-center gap-2 md:hidden">
          <span className="font-extrabold text-xl text-[#58cc02] tracking-wide">Gamavation</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">Basa Jawa</span>
        </div>

        {/* Right / Center Stats bar */}
        <div className="flex items-center justify-end w-full md:w-auto gap-3 md:gap-6 ml-auto">
          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 font-black text-sm">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{stats.streak}</span>
            <span className="hidden sm:inline text-xs font-bold text-amber-700/80">Dina</span>
          </div>

          {/* Gems / Intan */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-500 font-black text-sm">
            <Gem className="w-5 h-5 fill-blue-500 text-blue-500" />
            <span>{stats.gems}</span>
          </div>

          {/* Hearts / Nyawa */}
          <button
            onClick={() => setShowHeartModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-50 border border-red-200/80 text-red-500 font-black text-sm hover:bg-red-100 transition-colors cursor-pointer"
            title="Klik kanggo nambah nyawa"
          >
            <Heart className={`w-5 h-5 fill-red-500 text-red-500 ${stats.hearts <= 1 ? 'animate-bounce' : ''}`} />
            <span>{stats.hearts}</span>
            {stats.hearts < stats.maxHearts && (
              <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] ml-0.5">
                <Plus className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title={stats.soundEnabled ? 'Swara Urip' : 'Swara Mati'}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      </header>

      {/* Heart Refill Modal */}
      {showHeartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-slate-200 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-4">
              <Heart className="w-9 h-9 fill-red-500" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-800 mb-1">
              Nyawa Sampeyan: {stats.hearts}/{stats.maxHearts}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Nyawa dibutuhake kanggo ngrampungake pasinaon. Yen salah mangsuli pitakon, nyawa bakal suda 1.
            </p>

            <div className="space-y-3">
              <button
                disabled={stats.gems < 50 || stats.hearts >= stats.maxHearts}
                onClick={() => handleRefill(false)}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-sm duo-btn-blue flex items-center justify-center gap-2 ${
                  stats.gems < 50 || stats.hearts >= stats.maxHearts ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>Isi Kebak (5 Nyawa)</span>
                <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-lg text-xs">
                  <Gem className="w-3.5 h-3.5 fill-white" /> 50
                </span>
              </button>

              <button
                onClick={() => handleRefill(true)}
                className="w-full py-3 px-4 rounded-2xl font-bold text-sm duo-btn-green flex items-center justify-center gap-2"
              >
                <span>Latihan Gratis (Isi Nyawa)</span>
              </button>

              <button
                onClick={() => setShowHeartModal(false)}
                className="w-full py-2.5 rounded-2xl font-bold text-sm text-slate-500 hover:text-slate-800 transition-colors"
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
