import React, { useState } from 'react';
import { Gem, Heart, Shield, Sparkles, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MascotOwl } from './MascotOwl';
import { soundEffects } from '../utils/sound';

export const ShopView: React.FC = () => {
  const {
    stats,
    spendGems,
    refillHearts,
    buyStreakFreeze,
    equipOutfit
  } = useGame();

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBuyHearts = () => {
    if (stats.hearts >= stats.maxHearts) {
      showToast('Nyawamu wis kebak (5 nyawa)!');
      return;
    }
    if (refillHearts(false)) {
      showToast('Nyawa kasil diisi kebak maneh!');
    } else {
      showToast('Intanmu ora cukup (butuh 50 intan).');
    }
  };

  const handleBuyFreeze = () => {
    if (buyStreakFreeze()) {
      showToast('Kasil tuku Beku Dina!');
    } else {
      showToast('Intanmu ora cukup (butuh 80 intan).');
    }
  };

  const handleBuyOutfit = (outfitId: string, cost: number) => {
    if (stats.activeOutfit === outfitId) {
      showToast('Busana iki wis dienggo!');
      return;
    }

    if (spendGems(cost)) {
      equipOutfit(outfitId);
      if (stats.soundEnabled) soundEffects.playCorrect();
      showToast('Busana anyar kasil dienggo!');
    } else {
      showToast(`Intanmu ora cukup (butuh ${cost} intan).`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg animate-bounce">
          {notification}
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-500 mx-auto flex items-center justify-center mb-3 shadow-xs">
          <Gem className="w-9 h-9 fill-blue-500" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Pasar Kawruh
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">
          Pasar Intan Tradisional
        </h1>
        <p className="text-xs font-semibold text-slate-600 mt-1">
          Gunakake intan saka hasil sinau kanggo tuku kabutuhan pasinaon.
        </p>
      </div>

      {/* Current Balance Card */}
      <div className="bg-blue-500 rounded-3xl p-5 text-white shadow-md mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Simpenan Intan</span>
          <div className="text-3xl font-black flex items-center gap-2 mt-0.5">
            <Gem className="w-7 h-7 fill-white" /> {stats.gems}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-blue-100 block">Beku Dina:</span>
          <span className="text-base font-black">{stats.streakFreezeCount} Beku Aktif</span>
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-4">
        <h3 className="font-black text-slate-800 text-base mb-2">Kabutuhan Nyawa & Streak</h3>

        {/* 1. Full Heart Refill */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-red-500" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Isi Kebak Nyawa</h4>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Balekake 5 nyawa supaya bisa terus sinau tanpa mandheg.
              </p>
            </div>
          </div>

          <button
            onClick={handleBuyHearts}
            className="duo-btn-blue px-4 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Gem className="w-3.5 h-3.5 fill-white" /> 50
          </button>
        </div>

        {/* 2. Streak Freeze */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 fill-cyan-500" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Beku Dina (Semar Freeze)</h4>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Ngramal streak tetep urip senajan sedina ora sempet bukak aplikasi.
              </p>
            </div>
          </div>

          <button
            onClick={handleBuyFreeze}
            className="duo-btn-blue px-4 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Gem className="w-3.5 h-3.5 fill-white" /> 80
          </button>
        </div>

        {/* Outfits Section */}
        <h3 className="font-black text-slate-800 text-base pt-4 mb-2">Busana Mascot Ki Bimo</h3>

        {/* Classic Outfit */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
              <span className="text-2xl">🦉</span>
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Blangkon Coklat Klasik</h4>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Blangkon khas Mataraman kelir soklat tradhisional.
              </p>
            </div>
          </div>

          {stats.activeOutfit === 'classic' ? (
            <span className="text-xs font-black text-emerald-600 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-xl">
              <Check className="w-4 h-4 stroke-[3]" /> Dienggo
            </span>
          ) : (
            <button
              onClick={() => equipOutfit('classic')}
              className="duo-btn-white px-3 py-1.5 rounded-xl font-black text-xs cursor-pointer"
            >
              Nganggo
            </button>
          )}
        </div>

        {/* Gold Blangkon Outfit */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Blangkon Kencana (Emas)</h4>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Blangkon prada emas berkilau kagem para priyayi agung.
              </p>
            </div>
          </div>

          {stats.activeOutfit === 'blangkon_emas' ? (
            <span className="text-xs font-black text-emerald-600 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-xl">
              <Check className="w-4 h-4 stroke-[3]" /> Dienggo
            </span>
          ) : (
            <button
              onClick={() => handleBuyOutfit('blangkon_emas', 150)}
              className="duo-btn-amber px-4 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Gem className="w-3.5 h-3.5 fill-white" /> 150
            </button>
          )}
        </div>

        {/* Batik Keraton Outfit */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
              <span className="text-2xl">🔮</span>
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Batik Ungu Kasunanan</h4>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Motif ceplok kraton warna wungu endah lan wibawa.
              </p>
            </div>
          </div>

          {stats.activeOutfit === 'batik_keraton' ? (
            <span className="text-xs font-black text-emerald-600 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-xl">
              <Check className="w-4 h-4 stroke-[3]" /> Dienggo
            </span>
          ) : (
            <button
              onClick={() => handleBuyOutfit('batik_keraton', 200)}
              className="duo-btn-purple bg-purple-600 border-b-4 border-purple-800 text-white px-4 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Gem className="w-3.5 h-3.5 fill-white" /> 200
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
