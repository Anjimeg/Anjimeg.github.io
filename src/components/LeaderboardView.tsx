import React from 'react';
import { Trophy, Medal, Flame, Shield, ArrowUp, ArrowDown } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const LeaderboardView: React.FC = () => {
  const { stats } = useGame();

  const competitors = [
    { rank: 1, name: 'Raden Mas Danang', xp: 340, avatar: '👑', isUser: false },
    { rank: 2, name: 'Siti Sekar Wangi', xp: 290, avatar: '🌸', isUser: false },
    { rank: 3, name: 'Joko Kendil', xp: 260, avatar: '🍃', isUser: false },
    { rank: 4, name: 'Panjenengan (Sampeyan)', xp: Math.max(stats.xp, 180), avatar: '🦉', isUser: true },
    { rank: 5, name: 'Mbah Gito Marto', xp: 175, avatar: '👴', isUser: false },
    { rank: 6, name: 'Sri Rejeki', xp: 140, avatar: '🌾', isUser: false },
    { rank: 7, name: 'Dalang Ki Anom', xp: 120, avatar: '🎭', isUser: false },
    { rank: 8, name: 'Yu Darmi Solo', xp: 95, avatar: '🧺', isUser: false },
    { rank: 9, name: 'Bagong Sutrisno', xp: 70, avatar: '🥁', isUser: false },
    { rank: 10, name: 'Petruk Gareng', xp: 50, avatar: '🎋', isUser: false }
  ];

  // Re-sort based on user's current XP dynamically
  competitors.sort((a, b) => b.xp - a.xp);
  competitors.forEach((c, idx) => {
    c.rank = idx + 1;
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-12">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-3 shadow-xs">
          <Trophy className="w-9 h-9 fill-amber-500" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Liga Kasultanan
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">
          Papan Peringkat Saben Minggu
        </h1>
        <p className="text-xs font-semibold text-slate-600 mt-1">
          3 panyinaon paling ndhuwur bakal munggah menyang Liga Karaton!
        </p>
      </div>

      {/* Promotion indicator banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-6 flex items-center justify-between text-xs font-bold text-emerald-800">
        <div className="flex items-center gap-2">
          <ArrowUp className="w-4 h-4 text-emerald-600" />
          <span>Zona Promosi: Peringkat 1 - 3</span>
        </div>
        <span className="text-[11px] bg-emerald-200/80 px-2 py-0.5 rounded-md">
          Sisa 3 dina maneh
        </span>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xs">
        {competitors.map((user) => {
          const isTopThree = user.rank <= 3;
          const isUser = user.isUser;

          return (
            <div
              key={user.name}
              className={`flex items-center justify-between p-4 border-b border-slate-100 last:border-b-0 transition-colors ${
                isUser
                  ? 'bg-emerald-50/90 font-black border-y-2 border-emerald-300'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank badge */}
                <div className="w-8 text-center shrink-0">
                  {user.rank === 1 ? (
                    <span className="text-xl">🥇</span>
                  ) : user.rank === 2 ? (
                    <span className="text-xl">🥈</span>
                  ) : user.rank === 3 ? (
                    <span className="text-xl">🥉</span>
                  ) : (
                    <span className="text-sm font-black text-slate-400">
                      {user.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0 border border-slate-200">
                  {user.avatar}
                </div>

                {/* Name */}
                <div>
                  <h4 className={`text-sm ${isUser ? 'font-black text-emerald-950' : 'font-bold text-slate-800'}`}>
                    {user.name}
                  </h4>
                  {isUser && (
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                      Akun Panjenengan
                    </span>
                  )}
                </div>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1 font-black text-sm text-amber-600">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span>{user.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
