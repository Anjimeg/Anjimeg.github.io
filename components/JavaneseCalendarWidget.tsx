import React, { useState } from 'react';
import { Calendar, Sparkles, ChevronRight, X, Info, Award } from 'lucide-react';
import { getTodayJavaneseInfo, getCurrentWeekJavaneseDays } from '../utils/javaneseDate';
import { useGame } from '../context/GameContext';
import { TionMascot } from './TionMascot';
import { UgmLogo } from './UgmLogo';

export const JavaneseCalendarWidget: React.FC = () => {
  const { stats } = useGame();
  const [showModal, setShowModal] = useState(false);

  const todayInfo = getTodayJavaneseInfo();
  // Assume today is marked active if user has streak or studied
  const activeDates = [todayInfo.dateStr, ...(stats.lastActiveDate ? [stats.lastActiveDate] : [])];
  const weekDays = getCurrentWeekJavaneseDays(activeDates);

  return (
    <>
      {/* Interactive Compact Dina Bar on Top / Dashboard */}
      <div
        onClick={() => setShowModal(true)}
        className="w-full bg-gradient-to-r from-[#1e88e5] via-[#1976d2] to-[#1565c0] text-white p-3 sm:p-4 rounded-3xl shadow-sm border-2 border-[#f59e0b]/40 mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 cursor-pointer hover:border-[#f59e0b] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f59e0b] text-[#1e293b] flex items-center justify-center font-black shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9.5px] font-black uppercase tracking-widest text-amber-200 bg-white/15 px-2 py-0.5 rounded-md">
                Dina Asli Jawa
              </span>
              <span className="text-[11px] text-blue-100 font-semibold">
                Neptu {todayInfo.totalNeptu}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight mt-0.5 truncate">
              {todayInfo.weton} <span className="text-xs font-normal text-blue-100">({todayInfo.formattedDate})</span>
            </h3>
          </div>
        </div>

        {/* 7 Days of the week bubbles - Mobile optimized with equal grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-1 sm:pt-0 border-t border-white/15 sm:border-t-0 w-full sm:w-auto">
          {weekDays.map(day => (
            <div
              key={day.dateStr}
              className={`flex flex-col items-center justify-center py-1 sm:w-9 h-10 sm:h-11 rounded-xl text-center transition-all ${
                day.isToday
                  ? 'bg-[#f59e0b] text-[#1e293b] font-black ring-2 ring-white shadow-xs scale-105'
                  : day.isCompleted
                  ? 'bg-white/20 text-[#fbbf24] font-bold'
                  : 'bg-white/10 text-blue-100 font-semibold'
              }`}
            >
              <span className="text-[9px] uppercase tracking-tighter leading-none">
                {day.dinaName.substring(0, 3)}
              </span>
              <span className="text-xs font-black leading-tight mt-0.5">
                {day.dayOfMonth}
              </span>
              <span className="text-[7.5px] leading-none opacity-80">
                {day.pasaran.substring(0, 2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weton Modal Detail Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-blue-200 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1e88e5] text-[#f59e0b] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 fill-[#f59e0b]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1565c0] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Kalender Jawa & Pranata Mangsa
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {todayInfo.weton}
                </h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e88e5] to-[#1565c0] text-white rounded-2xl p-4 mb-4 border border-[#f59e0b]/30">
              <div className="flex items-center justify-between text-xs font-bold text-amber-200 mb-1">
                <span>Dina Masehi: {todayInfo.dinaName}</span>
                <span>Pasaran: {todayInfo.pasaran}</span>
              </div>
              <div className="text-2xl font-black text-white">
                Neptu {todayInfo.totalNeptu}
                <span className="text-xs font-medium text-blue-100 ml-2">
                  ({todayInfo.neptuDina} + {todayInfo.neptuPasaran})
                </span>
              </div>
              <p className="text-xs text-blue-50 mt-2 font-medium leading-relaxed italic">
                &ldquo;{todayInfo.maknaWeton}&rdquo;
              </p>
            </div>

            {/* Mascot advice */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-200 mb-4">
              <div className="w-12 h-12 shrink-0">
                <TionMascot size="sm" mood="happy" />
              </div>
              <p className="text-xs font-semibold text-[#1565c0] leading-snug">
                Tion ngelingake: Dina iki becik banget kanggo nambah kawruh basa Jawa!
              </p>
            </div>

            {/* 7 Days of the week in detail */}
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              Jadwal Dina Minggu Iki:
            </h4>
            <div className="grid grid-cols-7 gap-1.5 mb-6">
              {weekDays.map(day => (
                <div
                  key={day.dateStr}
                  className={`p-2 rounded-xl text-center border ${
                    day.isToday
                      ? 'bg-[#1e88e5] text-white border-[#f59e0b]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-black block">{day.dinaName}</span>
                  <span className="text-sm font-black block my-0.5">{day.dayOfMonth}</span>
                  <span className="text-[9px] font-bold text-[#f59e0b] block">{day.pasaran}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 flex items-start gap-2.5 mb-4">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 font-semibold leading-relaxed">
                Ing tradhisi Jawa, saben gabungan <strong>Dina Pitu</strong> lan <strong>Pancawara (Pasaran)</strong> nggawa watek lan wektu becik kanggo sinau lan makarya.
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-2xl font-black text-sm gama-btn-gold uppercase cursor-pointer"
            >
              Matur Nuwun, Mangertos
            </button>
          </div>
        </div>
      )}
    </>
  );
};
