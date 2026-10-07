import React, { useState } from 'react';
import { Check, Star, Lock, Sparkles, BookOpen, Flame, Award, ChevronRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { UNITS_DATA } from '../data/lessonsData';
import { Lesson, Unit } from '../types';
import { TionMascot } from './TionMascot';
import { JavaneseCalendarWidget } from './JavaneseCalendarWidget';

export const LessonPath: React.FC = () => {
  const {
    stats,
    startLesson,
    hasCompletedLesson,
    quests,
    claimQuest,
    setActiveTab
  } = useGame();

  const [selectedLessonForModal, setSelectedLessonForModal] = useState<Lesson | null>(null);

  // Zigzag offsets for the nodes (Constrained on mobile to prevent overflow)
  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    if (cycle === 0) return 'translate-x-0';
    if (cycle === 1) return '-translate-x-5 sm:-translate-x-12';
    if (cycle === 2) return 'translate-x-5 sm:translate-x-12';
    return '-translate-x-2.5 sm:-translate-x-6';
  };

  const handleNodeClick = (lesson: Lesson, isLocked: boolean) => {
    if (isLocked) return;
    setSelectedLessonForModal(lesson);
  };

  return (
    <div className="max-w-5xl mx-auto px-2.5 sm:px-6 py-3 sm:py-6 pb-28 md:pb-12 flex flex-col lg:flex-row gap-5 lg:gap-8 items-start overflow-x-hidden">
      {/* Main Path Column */}
      <div className="flex-1 w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Authentic Javanese Calendar & Dina Tracker Widget */}
        <JavaneseCalendarWidget />

        {UNITS_DATA.map((unit: Unit, unitIdx: number) => {
          const completedCount = unit.lessons.filter(l => hasCompletedLesson(l.id)).length;
          const isUnitCompleted = completedCount === unit.lessons.length;

          return (
            <div key={unit.id} className="w-full mb-8 sm:mb-12">
              {/* Unit Header Card with Lighter Blue & Gold Touch */}
              <div
                style={{ backgroundColor: unit.color }}
                className="w-full rounded-3xl p-4 sm:p-5 text-white shadow-sm mb-6 sm:mb-8 relative overflow-hidden border-2 border-amber-300/40"
              >
                {/* Background decorative Aksara pattern */}
                <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none flex items-center pr-3">
                  <span className="font-javanese text-5xl sm:text-7xl select-none">ꦲꦤꦕꦫꦏ</span>
                </div>

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black tracking-widest uppercase bg-[#f59e0b] text-[#1e293b] px-2.5 py-0.5 rounded-lg">
                        Bab {unit.unitNumber}
                      </span>
                      {isUnitCompleted && (
                        <span className="text-[11px] font-black bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Selesai
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-2xl font-black leading-tight drop-shadow-xs">
                      {unit.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold opacity-90 mt-1 max-w-md">
                      {unit.description}
                    </p>
                  </div>

                  <div className="shrink-0 bg-white/20 backdrop-blur-xs rounded-2xl p-2 sm:p-2.5 flex flex-col items-center border border-white/25">
                    <span className="text-[10px] sm:text-[11px] font-bold opacity-90">Progres</span>
                    <span className="text-base sm:text-lg font-black text-[#fbbf24]">{completedCount}/{unit.lessons.length}</span>
                  </div>
                </div>
              </div>

              {/* Path Nodes */}
              <div className="flex flex-col items-center gap-4 sm:gap-6 relative py-2 w-full">
                {unit.lessons.map((lesson: Lesson, lessonIdx: number) => {
                  const isCompleted = hasCompletedLesson(lesson.id);
                  const isLocked = unitIdx > 0 && lessonIdx > 0 && !hasCompletedLesson(unit.lessons[lessonIdx - 1]?.id || '');
                  const isNextActive = !isCompleted && !isLocked;

                  return (
                    <div
                      key={lesson.id}
                      className={`relative flex flex-col items-center transition-transform duration-300 ${getOffsetClass(lessonIdx)}`}
                    >
                      {/* Interactive Node Button with Lighter Blue & Gold */}
                      <button
                        onClick={() => handleNodeClick(lesson, isLocked)}
                        disabled={isLocked}
                        className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all select-none cursor-pointer ${
                          isCompleted
                            ? 'bg-[#f59e0b] border-b-6 border-[#d97706] shadow-md hover:bg-[#fbbf24] active:border-b-2 active:translate-y-1'
                            : isNextActive
                            ? 'bg-[#1e88e5] border-b-6 border-[#1565c0] shadow-xl hover:bg-[#42a5f5] active:border-b-2 active:translate-y-1'
                            : 'bg-slate-200 border-b-6 border-slate-300 cursor-not-allowed opacity-80'
                        }`}
                      >
                        {/* Golden Glow / Pulse ring for active next lesson */}
                        {isNextActive && (
                          <div className="absolute inset-0 rounded-full ring-4 ring-[#f59e0b]/60 animate-ping -z-10" />
                        )}

                        {/* Icon inside node */}
                        {isCompleted ? (
                          <Check className="w-7 h-7 sm:w-10 sm:h-10 text-[#1e293b] stroke-[3.5] drop-shadow-xs" />
                        ) : isNextActive ? (
                          <Star className="w-7 h-7 sm:w-9 sm:h-9 fill-[#fbbf24] text-[#fbbf24] drop-shadow-xs group-hover:scale-110 transition-transform" />
                        ) : (
                          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 stroke-[2.5]" />
                        )}

                        {/* Crown badge above completed */}
                        {isCompleted && (
                          <div className="absolute -top-2.5 -right-1 bg-[#1e88e5] text-[#fbbf24] p-1 rounded-full border-2 border-white shadow-xs">
                            <Award className="w-3.5 h-3.5 fill-[#fbbf24]" />
                          </div>
                        )}
                      </button>

                      {/* Lesson title label pill */}
                      <div className="mt-1.5 text-center max-w-[140px] sm:max-w-[170px]">
                        <span className={`text-xs font-bold block truncate ${isNextActive ? 'text-[#1565c0] font-black' : 'text-slate-700'}`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] font-extrabold text-[#d97706]">
                          +{lesson.xpReward} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Companion Panel (Desktop) */}
      <div className="hidden lg:flex flex-col w-80 space-y-5 shrink-0 sticky top-20">
        {/* Tion Mascot Card with Shop Link */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-blue-200/90 shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 shrink-0">
              <TionMascot size="sm" mood="cheer" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#d97706] block">
                Maskot Gamavation
              </span>
              <h4 className="font-extrabold text-sm text-[#1565c0]">Semangat Belajar, Gamada!</h4>
              <p className="text-xs font-semibold text-slate-600 mt-0.5 leading-snug">
                &ldquo;Berbahasa santun,<br /> sopan pribadinya,<br />Rajin belajar, luas pengetahuannya!&rdquo;
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1565c0] font-black text-xs border border-blue-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Buka Pasar & Lemari Tion</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#d97706]" />
          </button>
        </div>

        {/* Daily Quests Box */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[#1565c0] text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
              Tantangan Harian Mahasiswa
            </h3>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#d97706] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Hari Ini
            </span>
          </div>

          <div className="space-y-3">
            {quests.map(quest => {
              const progressPct = Math.min(100, Math.round((quest.current / quest.target) * 100));
              return (
                <div key={quest.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-xs font-extrabold text-[#1565c0]">{quest.title}</h4>
                      <p className="text-[11px] font-semibold text-slate-600">{quest.description}</p>
                    </div>
                    {quest.completed ? (
                      <button
                        onClick={() => claimQuest(quest.id)}
                        className="gama-btn-gold text-[11px] font-black px-2.5 py-1 rounded-xl shrink-0 cursor-pointer"
                      >
                        Klaim +{quest.rewardGems}
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-[#1565c0] shrink-0">
                        +{quest.rewardGems} Intan
                      </span>
                    )}
                  </div>
                  {/* Progress bar with Lighter Blue */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${progressPct}%` }}
                      className="h-full bg-[#1e88e5] rounded-full transition-all duration-500"
                    />
                  </div>
                  <div className="text-right text-[10px] font-bold text-slate-500 mt-1">
                    {quest.current}/{quest.target}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Shortcut Card to Hanacaraka */}
        <div
          onClick={() => setActiveTab('aksara')}
          className="bg-gradient-to-r from-blue-50 to-amber-50 hover:from-blue-100 hover:to-amber-100 cursor-pointer transition-colors rounded-3xl p-5 border-2 border-blue-200 text-[#1565c0] flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-3">
            <span className="font-javanese text-3xl font-bold text-[#1e88e5]">ꦲ</span>
            <div>
              <h4 className="font-black text-sm text-[#1565c0]">Sinau Aksara Jawa</h4>
              <p className="text-xs font-medium text-slate-600">Tabel 20 Hanacaraka & Sandhangan</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#f59e0b]" />
        </div>
      </div>

      {/* Start Lesson Dialog / Popup Modal */}
      {selectedLessonForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-blue-200 shadow-2xl text-center relative">
            <div className="w-18 h-18 rounded-full bg-blue-50 text-[#1e88e5] mx-auto flex items-center justify-center mb-3 border-2 border-[#f59e0b]">
              <BookOpen className="w-9 h-9 text-[#1e88e5]" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-wider text-[#d97706] bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 mb-2 inline-block">
              Latihan Bahasa Jawa Maba
            </span>

            <h3 className="text-xl font-black text-[#1565c0] mb-1">
              {selectedLessonForModal.title}
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-semibold">
              {selectedLessonForModal.subtitle}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-6 flex items-center justify-around">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Hadiah</span>
                <span className="text-sm font-extrabold text-[#d97706] flex items-center gap-1 justify-center">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> +{selectedLessonForModal.xpReward} XP
                </span>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Jumlah Soal</span>
                <span className="text-sm font-extrabold text-slate-800">
                  {selectedLessonForModal.questions.length} Soal
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  const lessonToStart = selectedLessonForModal;
                  setSelectedLessonForModal(null);
                  startLesson(lessonToStart);
                }}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-base gama-btn-gold cursor-pointer uppercase tracking-wider"
              >
                Mulai Belajar
              </button>

              <button
                onClick={() => setSelectedLessonForModal(null)}
                className="w-full py-2.5 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                Nanti Dulu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
