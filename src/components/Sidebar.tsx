import React from 'react';
import { BookOpen, Feather, Library, Trophy, ShoppingBag, User } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MascotOwl } from './MascotOwl';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useGame();

  const navItems = [
    { id: 'learn', label: 'Sinau', sublabel: 'Alur Sinau', icon: BookOpen, color: 'text-emerald-500' },
    { id: 'aksara', label: 'Aksara Jawa', sublabel: 'Hanacaraka', icon: Feather, color: 'text-purple-500' },
    { id: 'dictionary', label: 'Baosastra', sublabel: 'Kamus Jawa', icon: Library, color: 'text-blue-500' },
    { id: 'leaderboard', label: 'Peringkat', sublabel: 'Liga Kasultanan', icon: Trophy, color: 'text-amber-500' },
    { id: 'shop', label: 'Pasar', sublabel: 'Toko Intan', icon: ShoppingBag, color: 'text-orange-500' },
    { id: 'profile', label: 'Profil', sublabel: 'Cathetan Sinau', icon: User, color: 'text-slate-500' }
  ] as const;

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r-2 border-slate-200 bg-white p-4 select-none z-40">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-10 h-10">
            <MascotOwl size="sm" mood="happy" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#58cc02] tracking-tight leading-none">
              Gamavation
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 leading-tight">
              Gadjah Mada Javanese Education
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
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-[#58cc02] border-2 border-emerald-400 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#58cc02]' : 'text-slate-400'}`} />
                <div className="flex flex-col">
                  <span className="leading-tight">{item.label}</span>
                  <span className="text-[10px] font-semibold text-slate-600 leading-tight">
                    {item.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Banner */}
        <div className="mt-auto p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-amber-800">Pitutur Luhur</span>
          </div>
          <p className="text-xs font-medium text-amber-900 italic leading-relaxed">
            &ldquo;Urip iku urup, migunani tumraping liyan.&rdquo;
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 py-2 px-1 flex items-center justify-around shadow-lg">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-[#58cc02] scale-105 font-black' : 'text-slate-500 font-semibold'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
