import React, { useState } from 'react';
import { Check, Star, Lock, Sparkles, BookOpen, Flame, Award, ChevronRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { UNITS_DATA } from '../data/lessonsData';
import { Lesson, Unit } from '../types';
import { MascotOwl } from './MascotOwl';

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

  // Zigzag offsets for the nodes: 0, -32px, 32px, -24px, 24px
  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    if (cycle === 0) return 'translate-x-0';
    if (cycle === 1) return '-translate-x-10 sm:-translate-x-14';
    if (cycle === 2) return 'translate-x-10 sm:translate-x-14';
    return '-translate-x-4 sm:-translate-x-6';
  };

  const handleNodeClick = (lesson: Lesson, isLocked: boolean) => {
    if (isLocked) return;
    setSelectedLessonForModal(lesson);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28 md:pb-12 flex flex-col lg:flex-row gap-8 items-start">
      {/* Main Path Column */}
      <div className="flex-1 w-full max-w-xl mx-auto flex flex-col items-center">
        {UNITS_DATA.map((unit: Unit, unitIdx: number) => {
          const completedCount = unit.lessons.filter(l => hasCompletedLesson(l.id)).length;
          const isUnitCompleted = completedCount === unit.lessons.length;

          return (
            <div key={unit.id} className="w-full mb-12">
              {/* Unit Header Card */}
              <div
                style={{ backgroundColor: unit.color }}
                className="w-full rounded-3xl p-5 text-white shadow-md mb-8 relative overflow-hidden"
              >
                {/* Background decorative pattern */}
                <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none flex items-center pr-4">
                  <span className="font-javanese text-7xl select-none">ꦲꦤꦕꦫꦏ</span>
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black tracking-wider uppercase bg-white/20 px-2.5 py-0.5 rounded-lg">
                        Bab {unit.unitNumber}
                      </span>
                      {isUnitCompleted && (
                        <span className="text-xs font-black bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Rampung
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-xs">
                      {unit.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold opacity-90 mt-1 max-w-md">
                      {unit.description}
                    </p>
                  </div>

                  <div className="shrink-0 bg-white/20 backdrop-blur-xs rounded-2xl p-2.5 flex flex-col items-center">
                    <span className="text-xs font-bold opacity-80">Progres</span>
                    <span className="text-lg font-black">{completedCount}/{unit.lessons.length}</span>
                  </div>
                </div>
              </div>

              {/* Path Nodes */}
              <div className="flex flex-col items-center gap-6 relative py-2">
                {unit.lessons.map((lesson: Lesson, lessonIdx: number) => {
                  const isCompleted = hasCompletedLesson(lesson.id);
                  // Locked only if previous is incomplete and not unit 1
                  const isLocked = unitIdx > 0 && lessonIdx > 0 && !hasCompletedLesson(unit.lessons[lessonIdx - 1]?.id || '');
                  const isNextActive = !isCompleted && !isLocked;

                  return (
                    <div
                      key={lesson.id}
                      className={`relative flex flex-col items-center transition-transform duration-300 ${getOffsetClass(lessonIdx)}`}
                    >
                      {/* Interactive Node Button */}
                      <button
                        onClick={() => handleNodeClick(lesson, isLocked)}
                        disabled={isLocked}
                        className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all select-none cursor-pointer ${
                          isCompleted
                            ? 'bg-amber-400 border-b-6 border-amber-600 shadow-md hover:bg-amber-300 active:border-b-2 active:translate-y-1'
                            : isNextActive
                            ? 'bg-[#58cc02] border-b-6 border-[#46a302] shadow-lg hover:bg-[#61e002] active:border-b-2 active:translate-y-1'
                            : 'bg-slate-200 border-b-6 border-slate-300 cursor-not-allowed opacity-80'
                        }`}
                      >
                        {/* Glow / Pulse ring for active next lesson */}
                        {isNextActive && (
                          <div className="absolute inset-0 rounded-full ring-4 ring-[#58cc02]/40 animate-ping -z-10" />
                        )}

                        {/* Icon inside node */}
                        {isCompleted ? (
                          <Check className="w-10 h-10 text-white stroke-[3.5] drop-shadow-xs" />
                        ) : isNextActive ? (
                          <Star className="w-9 h-9 fill-white text-white drop-shadow-xs group-hover:scale-110 transition-transform" />
                        ) : (
                          <Lock className="w-8 h-8 text-slate-400 stroke-[2.5]" />
                        )}

                        {/* Crown badge above completed */}
                        {isCompleted && (
                          <div className="absolute -top-3 -right-1 bg-amber-400 text-amber-950 p-1 rounded-full border-2 border-white shadow-xs">
                            <Award className="w-3.5 h-3.5 fill-amber-950" />
                          </div>
                        )}
                      </button>

                      {/* Lesson title label pill */}
                      <div className="mt-2 text-center max-w-[160px]">
                        <span className={`text-xs font-bold block truncate ${isNextActive ? 'text-slate-900 font-extrabold' : 'text-slate-600'}`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600">
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
      <div className="hidden lg:flex flex-col w-80 space-y-6 shrink-0 sticky top-20">
        {/* Bawor Mascot Greeting Card */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs flex items-center gap-4">
          <MascotOwl size="sm" mood="happy" outfit={stats.activeOutfit} />
          <div>
            <h4 className="font-extrabold text-sm text-slate-800">Ki Bimo ngendika:</h4>
            <p className="text-xs font-semibold text-slate-600 mt-1 leading-snug">
              &ldquo;Aja isin sinau basa biyung. Alon-alon waton kelakon!&rdquo;
            </p>
          </div>
        </div>

        {/* Daily Quests Box */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
              Tantangan Dina Iki
            </h3>
            <span className="text-xs font-bold text-slate-600">Saben dina</span>
          </div>

          <div className="space-y-3.5">
            {quests.map(quest => {
              const progressPct = Math.min(100, Math.round((quest.current / quest.target) * 100));
              return (
                <div key={quest.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">{quest.title}</h4>
                      <p className="text-[11px] font-semibold text-slate-600">{quest.description}</p>
                    </div>
                    {quest.completed ? (
                      <button
                        onClick={() => claimQuest(quest.id)}
                        className="duo-btn-green text-[11px] font-black px-2.5 py-1 rounded-xl shrink-0 cursor-pointer"
                      >
                        Jupuk +{quest.rewardGems}
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-blue-600 shrink-0">
                        +{quest.rewardGems} Intan
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${progressPct}%` }}
                      className="h-full bg-[#58cc02] rounded-full transition-all duration-500"
                    />
                  </div>
                  <div className="text-right text-[10px] font-bold text-slate-600 mt-1">
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
          className="bg-purple-50 hover:bg-purple-100/80 cursor-pointer transition-colors rounded-3xl p-5 border-2 border-purple-200 text-purple-950 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="font-javanese text-3xl font-bold text-purple-700">ꦲ</span>
            <div>
              <h4 className="font-black text-sm text-purple-900">Sinau Aksara Jawa</h4>
              <p className="text-xs font-medium text-purple-700">Tabel 20 Hanacaraka & Sandhangan</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-purple-600" />
        </div>
      </div>

      {/* Start Lesson Dialog / Popup Modal */}
      {selectedLessonForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-slate-200 shadow-2xl text-center relative">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#58cc02] mx-auto flex items-center justify-center mb-3">
              <BookOpen className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {selectedLessonForModal.title}
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-semibold">
              {selectedLessonForModal.subtitle}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-6 flex items-center justify-around">
              <div>
                <span className="text-[11px] font-bold text-slate-600 block">Ganjaran</span>
                <span className="text-sm font-extrabold text-amber-600 flex items-center gap-1 justify-center">
                  <Flame className="w-4 h-4 fill-amber-500" /> +{selectedLessonForModal.xpReward} XP
                </span>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div>
                <span className="text-[11px] font-bold text-slate-600 block">Pitakon</span>
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
                className="w-full py-3.5 px-4 rounded-2xl font-black text-base duo-btn-green cursor-pointer uppercase tracking-wider"
              >
                Mulai Pasinaon
              </button>

              <button
                onClick={() => setSelectedLessonForModal(null)}
                className="w-full py-2.5 rounded-2xl font-bold text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                Mengko Dhisik
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
