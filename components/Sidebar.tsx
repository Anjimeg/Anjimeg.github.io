import React from 'react';
import { BookOpen, Feather, Library, Trophy, ShoppingBag, User } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { TionMascot } from './TionMascot';
import { UgmLogo } from './UgmLogo';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useGame();

  const navItems = [
    { id: 'learn', label: 'Belajar', sublabel: 'Alur Belajar Maba', icon: BookOpen },
    { id: 'aksara', label: 'Aksara Jawa', sublabel: 'Hanacaraka Kampus', icon: Feather },
    { id: 'dictionary', label: 'Kamus Maba', sublabel: 'Kamus Saku Rantau', icon: Library },
    { id: 'leaderboard', label: 'Peringkat', sublabel: 'Liga Gamada', icon: Trophy },
    { id: 'shop', label: 'Pasar Tion', sublabel: 'Aksesoris & Lemari', icon: ShoppingBag },
    { id: 'profile', label: 'Profil', sublabel: 'Prestasi Mahasiswa', icon: User }
  ] as const;

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r-2 border-slate-200/90 bg-white/95 backdrop-blur-md p-4 select-none z-40">
        {/* Brand Header with UGM Official Logo & Gamavation Title */}
        <div className="flex items-center gap-3 px-2 py-3 mb-3 border-b border-slate-100 pb-4">
          <UgmLogo size={46} color="#1e88e5" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-[#1e88e5] tracking-tight leading-none flex items-center gap-1.5">
              Gamavation
            </h1>
            <p className="text-[9px] font-black text-[#d97706] uppercase tracking-wider mt-1 leading-tight truncate">
              Gadjah Mada <br />Javanese Education
            </p>
          </div>
        </div>

        {/* Tion Mascot Greeting Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-amber-50/70 rounded-2xl p-2.5 mb-3 border border-blue-200/80 flex items-center gap-2.5">
          <div className="w-10 h-21 shrink-0">
            <TionMascot size="sm" mood="happy" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1565c0] block">
              Mas Tion
            </span>
            <p className="text-[9px] font-bold text-slate-700 leading-tight truncate">
              Halo Gamada! Aku Tion,<br />
              ayo belajar bareng!
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm tracking-wide transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#1e88e5] text-white shadow-md border-b-4 border-[#1565c0]'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-[#1e88e5] border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#fbbf24]' : 'text-slate-400'}`} />
                <div className="flex flex-col">
                  <span className="leading-tight">{item.label}</span>
                  <span className={`text-[10px] font-semibold leading-tight ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Banner - UGM Spirit */}
        <div className="mt-auto p-3.5 bg-gradient-to-br from-[#eff6ff] to-[#fef3c7]/50 rounded-2xl border border-blue-200/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1565c0] bg-white px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs">
              Bakti Gadjah Mada
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-700 italic leading-relaxed mt-1">
            &ldquo;Merakyat, Mandiri, dan Berkelanjutan;
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Polished touch-friendly mobile UX) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 py-1.5 px-1.5 flex items-center justify-around shadow-lg pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[48px] ${
                isActive
                  ? 'bg-blue-50 text-[#1e88e5] font-black scale-105'
                  : 'text-slate-500 font-semibold hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#1e88e5] stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f59e0b]" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'text-[#1e88e5] font-black' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
