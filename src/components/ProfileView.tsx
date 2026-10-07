import React, { useState } from 'react';
import { Award, Flame, Gem, BookOpen, Volume2, VolumeX, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MascotOwl } from './MascotOwl';

export const ProfileView: React.FC = () => {
  const { stats, toggleSound, resetProgress } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getHonoraryTitle = (xp: number) => {
    if (xp >= 300) return 'Pujangga Ageng (Ahli Sastra Jawa)';
    if (xp >= 150) return 'Abdi Kawruh (Murid Wasis)';
    if (xp >= 50) return 'Juru Wicara (Penutur Trampil)';
    return 'Siswa Mula (Pelajar Anyar)';
  };

  const badges = [
    {
      id: 'b1',
      title: 'Langkah Kapisan',
      desc: 'Ngrampungake pasinaon basa kapisan',
      icon: '🌱',
      unlocked: stats.completedLessonIds.length >= 1
    },
    {
      id: 'b2',
      title: 'Genen Semangat',
      desc: 'Nggayuh 3 dina streak sinau tanpa prei',
      icon: '🔥',
      unlocked: stats.streak >= 3
    },
    {
      id: 'b3',
      title: 'Unggah-Ungguh',
      desc: 'Nguwasani tataran Ngoko lan Krama Inggil',
      icon: '🙏',
      unlocked: stats.completedLessonIds.includes('u3-l1')
    },
    {
      id: 'b4',
      title: 'Mpu Hanacaraka',
      desc: 'Maca aksara Jawa legena lan sandhangan',
      icon: '📜',
      unlocked: stats.completedLessonIds.includes('u4-l1')
    },
    {
      id: 'b5',
      title: 'Pujangga Kraton',
      desc: 'Ngrampungake minimal 5 pasinaon',
      icon: '👑',
      unlocked: stats.completedLessonIds.length >= 5
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs mb-6 text-center relative overflow-hidden">
        <div className="w-28 h-28 mx-auto mb-3">
          <MascotOwl size="md" mood="happy" outfit={stats.activeOutfit} />
        </div>

        <h2 className="text-2xl font-black text-slate-900">
          Pelajar Basa Jawa
        </h2>
        <div className="inline-block mt-1 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-black text-amber-800">
          {getHonoraryTitle(stats.xp)}
        </div>
        <p className="text-xs font-semibold text-slate-600 mt-2">
          Miwiti sinau ing Gamavation · Gadjah Mada Javanese Education
        </p>

        {/* Stats 4-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <span className="text-xl font-black text-slate-900 block">{stats.streak}</span>
            <span className="text-[11px] font-bold text-slate-600">Dina Streak</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <Award className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <span className="text-xl font-black text-slate-900 block">{stats.xp}</span>
            <span className="text-[11px] font-bold text-slate-600">Total XP</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <Gem className="w-5 h-5 text-blue-500 fill-blue-500 mx-auto mb-1" />
            <span className="text-xl font-black text-slate-900 block">{stats.gems}</span>
            <span className="text-[11px] font-bold text-slate-600">Intan</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <BookOpen className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <span className="text-xl font-black text-slate-900 block">{stats.completedLessonIds.length}</span>
            <span className="text-[11px] font-bold text-slate-600">Pasinaon</span>
          </div>
        </div>
      </div>

      {/* Badges / Piwulang Luhur */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs mb-6">
        <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Piagam & Prestasi
        </h3>

        <div className="space-y-3">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 ${
                badge.unlocked
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{badge.title}</h4>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{badge.desc}</p>
                </div>
              </div>

              {badge.unlocked && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Reset */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-base text-slate-900">Setelan Aplikasi</h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-800">Swara & Audio Efek</h4>
            <p className="text-xs text-slate-600">Swara klik, wangsulan bener, lan TTS</p>
          </div>
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
              stats.soundEnabled
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
          >
            {stats.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="text-sm font-bold text-slate-800">Reset Kemajuan Sinau</h4>
            <p className="text-xs text-slate-600">Wangsuli kabeh data menyang setelan awal</p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
          >
            Reset Data
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-2 border-slate-200 shadow-xl">
            <RotateCcw className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Yakin Arep Reset?
            </h3>
            <p className="text-xs font-semibold text-slate-600 mb-6">
              Kabeh XP, intan, lan pasinaon sing wis dirampungake bakal bali menyang setelan anyar.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="w-full py-3 rounded-2xl font-black text-xs duo-btn-red uppercase cursor-pointer"
              >
                Iya, Reset Saiki
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-2.5 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-800"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
