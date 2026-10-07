import React, { useState } from 'react';
import { Award, Flame, Gem, BookOpen, Volume2, VolumeX, RotateCcw, CheckCircle2, Calendar, Shirt, ShoppingBag, ArrowRight, Lightbulb } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { TionMascot } from './TionMascot';
import { UgmLogo } from './UgmLogo';
import { getTodayJavaneseInfo } from '../utils/javaneseDate';

export const ProfileView: React.FC = () => {
  const { stats, toggleSound, resetProgress, setActiveTab } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const todayWeton = getTodayJavaneseInfo();

  const getHonoraryTitle = (xp: number) => {
    if (xp >= 300) return 'Duta Budaya Gadjah Mada (Pujangga Ageng)';
    if (xp >= 150) return 'Mahasiswa Wasis (Fasih & Luwes)';
    if (xp >= 50) return 'Gamada Trampil (Penutur Santun)';
    return 'Maba Rantau UGM (Siswa Mula)';
  };

  const badges = [
    {
      id: 'b1',
      title: 'Langkah Pertama di Bulaksumur',
      desc: 'Menyelesaikan sesi pelajaran bahasa Jawa pertamamu',
      icon: '🌱',
      unlocked: stats.completedLessonIds.length >= 1
    },
    {
      id: 'b2',
      title: 'Kobaran Semangat Maba',
      desc: 'Meraih 3 hari beruntun streak belajar tanpa putus',
      icon: '🔥',
      unlocked: stats.streak >= 3
    },
    {
      id: 'b3',
      title: 'Khatam Unggah-Ungguh',
      desc: 'Menguasai tataran Ngoko, Krama Madya, dan Krama Inggil',
      icon: '🙏',
      unlocked: stats.completedLessonIds.includes('u3-l1')
    },
    {
      id: 'b4',
      title: 'Penjelajah Sumbu Filosofis',
      desc: 'Memahami arah mata angin Jogja (Lor, Kidul, Kulon, Wetan)',
      icon: '🧭',
      unlocked: stats.completedLessonIds.includes('u4-l1')
    },
    {
      id: 'b5',
      title: 'Ksatria Gadjah Mada',
      desc: 'Menyelesaikan minimal 5 sesi latihan di Gamavation',
      icon: '👑',
      unlocked: stats.completedLessonIds.length >= 5
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 md:pb-14">
      {/* Profile Header */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-slate-200/90 shadow-xs mb-6 text-center relative overflow-hidden">
        {/* Decorative UGM watermark */}
        <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
          <UgmLogo size={42} color="#1e88e5" />
        </div>

        <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3">
          <TionMascot size="md" mood="happy" />
        </div>

        <h2 className="text-2xl font-black text-[#1565c0]">
          Imut Rizzman
        </h2>
        <div className="inline-block mt-1 bg-amber-50 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-black text-amber-900 shadow-2xs">
          {getHonoraryTitle(stats.xp)}
        </div>
        <p className="text-xs font-semibold text-slate-600 mt-2">
          Gamavation · Adaptasi Budaya & Bahasa Jawa UGM
        </p>

        {/* Weton Today Note */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-[#1565c0]">
          <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Hari Ini: {todayWeton.weton} (Neptu {todayWeton.totalNeptu}) · Dina Asli Jogja</span>
        </div>

        {/* Stats 4-Grid with Lighter Blue & Gold */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <span className="text-xl font-black text-[#1565c0] block">{stats.streak}</span>
            <span className="text-[11px] font-bold text-slate-500">Hari Streak</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <Award className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b] mx-auto mb-1" />
            <span className="text-xl font-black text-[#1565c0] block">{stats.xp}</span>
            <span className="text-[11px] font-bold text-slate-500">Total XP</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <Gem className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b] mx-auto mb-1" />
            <span className="text-xl font-black text-[#1565c0] block">{stats.gems}</span>
            <span className="text-[11px] font-bold text-slate-500">Intan Belanja</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <BookOpen className="w-5 h-5 text-[#1e88e5] mx-auto mb-1" />
            <span className="text-xl font-black text-[#1565c0] block">{stats.completedLessonIds.length}</span>
            <span className="text-[11px] font-bold text-slate-500">Selesai Belajar</span>
          </div>
        </div>
      </div>

      {/* Wardrobe / Costume Card */}
      <div className="bg-gradient-to-r from-blue-50 to-amber-50/70 rounded-3xl p-5 border-2 border-blue-200 shadow-xs mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
            👘
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-slate-900">
              Lemari Aksesoris Mas Tion
            </h3>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              Tion siap memakai jas almamater, blangkon, caping, atau es teh jumbo milikmu!
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('shop')}
          className="px-3.5 py-2 rounded-xl text-xs font-black bg-[#1e88e5] text-white hover:bg-[#1565c0] transition-colors cursor-pointer shrink-0 flex items-center gap-1 shadow-xs"
        >
          <span>Buka Pasar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Badges / Piagam Prestasi */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs mb-6">
        <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Piagam & Prestasi Mahasiswa
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
        <h3 className="font-black text-base text-slate-900">Pengaturan Aplikasi</h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-800">Suara & Efek Audio</h4>
            <p className="text-xs text-slate-600">Efek klik, jawaban benar/salah, dan audio lafal</p>
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
            <h4 className="text-sm font-bold text-slate-800">Reset Kemajuan Belajar</h4>
            <p className="text-xs text-slate-600">Kembalikan seluruh kemajuan ke pengaturan awal</p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
          >
            Reset Data
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-2 border-blue-200 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900 mb-2">Hapus Kemajuan Belajar?</h3>
            <p className="text-xs font-semibold text-slate-600 mb-6">
              Tindakan ini akan mengembalikan semua XP, streak, dan barang yang telah dibuka ke pengaturan awal.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl font-black text-xs bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
