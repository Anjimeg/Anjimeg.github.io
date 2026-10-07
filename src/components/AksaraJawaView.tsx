import React, { useState } from 'react';
import { Volume2, BookOpen, Sparkles, HelpCircle, Check, RotateCcw } from 'lucide-react';
import { HANACARAKA_LIST, SANDHANGAN_LIST } from '../data/aksaraData';
import { AksaraChar } from '../types';
import { soundEffects, speakText } from '../utils/sound';
import { useGame } from '../context/GameContext';

export const AksaraJawaView: React.FC = () => {
  const { stats } = useGame();
  const [selectedChar, setSelectedChar] = useState<AksaraChar>(HANACARAKA_LIST[0]);
  const [activeTab, setActiveTab] = useState<'chart' | 'sandhangan' | 'story' | 'practice'>('chart');

  // Practice state
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<string | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);

  // Practice questions
  const practiceList = [
    { aksara: 'ꦲ', correct: 'Ha', options: ['Ha', 'Na', 'Ka', 'Ra'] },
    { aksara: 'ꦤ', correct: 'Na', options: ['Ca', 'Na', 'Da', 'Ta'] },
    { aksara: 'ꦕ', correct: 'Ca', options: ['Ra', 'Ka', 'Ca', 'Sa'] },
    { aksara: 'ꦫ', correct: 'Ra', options: ['Wa', 'La', 'Ra', 'Ga'] },
    { aksara: 'ꦏ', correct: 'Ka', options: ['Ka', 'Ta', 'Dha', 'Ja'] },
    { aksara: 'ꦢ', correct: 'Da', options: ['Da', 'Sa', 'Wa', 'Nya'] },
    { aksara: 'ꦱ', correct: 'Sa', options: ['Ma', 'Sa', 'Ba', 'Tha'] },
    { aksara: 'ꦮ', correct: 'Wa', options: ['Wa', 'La', 'Pa', 'Ha'] }
  ];

  const currentPractice = practiceList[practiceQuestionIndex];

  const handlePlaySound = (latin: string) => {
    if (stats.soundEnabled) soundEffects.playTap();
    speakText(latin);
  };

  const handlePracticeSelect = (opt: string) => {
    if (practiceAnswered) return;
    setPracticeSelected(opt);
    setPracticeAnswered(true);

    if (opt === currentPractice.correct) {
      setPracticeScore(prev => prev + 1);
      if (stats.soundEnabled) soundEffects.playCorrect();
    } else {
      if (stats.soundEnabled) soundEffects.playIncorrect();
    }
  };

  const handleNextPractice = () => {
    setPracticeSelected(null);
    setPracticeAnswered(false);
    if (practiceQuestionIndex + 1 < practiceList.length) {
      setPracticeQuestionIndex(prev => prev + 1);
    } else {
      // Loop or restart
      setPracticeQuestionIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-[#1565c0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Aksara Tradisional Jawa · Gamavation
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1565c0] mt-2">
          Aksara Jawa Hanacaraka
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 max-w-lg mx-auto">
          Pelajari 20 aksara legena, sandhangan swara, dan filosofi Aji Saka agar kamu bisa membaca plang nama jalan di Malioboro dan sekitar kampus UGM!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto mb-6 sm:mb-8 border border-slate-200">
        <button
          onClick={() => setActiveTab('chart')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
            activeTab === 'chart' ? 'bg-[#1e88e5] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          20 Aksara
        </button>
        <button
          onClick={() => setActiveTab('sandhangan')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
            activeTab === 'sandhangan' ? 'bg-[#1e88e5] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sandhangan
        </button>
        <button
          onClick={() => setActiveTab('story')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
            activeTab === 'story' ? 'bg-[#1e88e5] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Filosofi
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
            activeTab === 'practice' ? 'bg-[#f59e0b] text-[#1e293b] font-black shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Gladhi (Kuis)
        </button>
      </div>

      {/* 1. CHART TAB */}
      {activeTab === 'chart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
          {/* Grid of 20 characters */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3, 4].map(rowNum => {
              const rowChars = HANACARAKA_LIST.filter(c => c.row === rowNum);
              const rowTitle =
                rowNum === 1
                  ? 'Baris 1: Ha Na Ca Ra Ka (Ana Utusan)'
                  : rowNum === 2
                  ? 'Baris 2: Da Ta Sa Wa La (Padha Pasulayan)'
                  : rowNum === 3
                  ? 'Baris 3: Pa Dha Ja Ya Nya (Padha Digjayane)'
                  : 'Baris 4: Ma Ga Ba Tha Nga (Padha Dadi Bathang)';

              return (
                <div key={rowNum} className="bg-white rounded-3xl p-3.5 sm:p-4 border-2 border-slate-200 shadow-xs">
                  <div className="text-[10px] sm:text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2">
                    {rowTitle}
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
                    {rowChars.map(char => {
                      const isSelected = selectedChar.latin === char.latin;
                      return (
                        <button
                          key={char.latin}
                          onClick={() => {
                            setSelectedChar(char);
                            handlePlaySound(char.latin);
                          }}
                          className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-[#1e88e5] shadow-sm ring-2 ring-blue-300'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 border-b-4'
                          }`}
                        >
                          <span className="font-javanese text-2xl sm:text-3xl font-bold text-slate-800 leading-none mb-1">
                            {char.aksara}
                          </span>
                          <span className="text-[11px] sm:text-xs font-black text-slate-600">
                            {char.latin}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs sticky top-20 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-[#1565c0] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Rincian Aksara
            </span>

            <div className="my-4 sm:my-5 p-5 sm:p-6 bg-blue-50/70 border-2 border-blue-200 rounded-3xl">
              <span className="font-javanese text-6xl sm:text-7xl font-bold text-[#1565c0] block select-none">
                {selectedChar.aksara}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-800 mt-2 block">
                {selectedChar.latin}
              </span>
            </div>

            <button
              onClick={() => handlePlaySound(selectedChar.latin)}
              className="w-full py-3 px-4 rounded-2xl font-black text-sm duo-btn-purple bg-purple-600 border-b-4 border-purple-800 text-white flex items-center justify-center gap-2 cursor-pointer mb-4"
            >
              <Volume2 className="w-5 h-5" /> Rungokna Lafal Swara
            </button>

            <div className="text-left space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-600 block">Aksara Pasangan:</span>
                <span className="font-javanese text-xl font-bold text-slate-800">{selectedChar.pasangan}</span>
              </div>
              <div>
                <span className="font-bold text-slate-600 block">Makna Mnemonic:</span>
                <span className="font-semibold text-slate-700">{selectedChar.meaningMnemonic}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SANDHANGAN TAB */}
      {activeTab === 'sandhangan' && (
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 text-xs font-semibold text-purple-900">
            <strong>Sandhangan</strong> yaiku tandha diakritik kanggo ngowahi utawa matèni swara vokal dhasar /a/ ing aksara legena.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SANDHANGAN_LIST.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-base text-slate-800">{item.name}</span>
                    <span className="text-xs font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-lg">
                      {item.sound}
                    </span>
                  </div>
                  <div className="p-3 bg-purple-50/50 rounded-xl text-center mb-2">
                    <span className="font-javanese text-3xl text-purple-900 font-bold block">{item.symbol}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-snug">{item.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-bold">Tuladha:</span>
                  <span className="font-javanese text-base font-bold text-purple-700">{item.example}</span>
                  <span className="font-bold text-slate-700">({item.exampleLatin})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STORY TAB */}
      {activeTab === 'story' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-xl font-black text-slate-900">Dongeng Aji Saka & Hanacaraka</h3>
              <p className="text-xs font-bold text-slate-600">Asal-usul 20 Aksara Jawa</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Kacarita nalika Raden Aji Saka arep tindak menyang Tanah Jawa, panjenengane ninggalake keris pusaka ana ing pulo Majethi lan dipasrahake marang abdi setiyane sing jenenge <strong>Sembada</strong>. Aji Saka paring weling: <em>&ldquo;Aja nganti keris iki diwenehake sapa wae kajaba aku dhewe.&rdquo;</em>
          </p>

          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Sawise Aji Saka jumeneng nata ing Medang Kamulan, dheweke ngutus abdi sijine sing jenenge <strong>Dora</strong> supaya njupuk keris pusaka mau. Nanging Sembada tetep kukuh ora gelem ngulungake amarga netepi amanat Aji Saka.
          </p>

          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-2 text-xs font-bold text-purple-950">
            <div>ꦲꦤꦕꦫꦏ (Ha Na Ca Ra Ka) — <em>Hana caraka:</em> Ana utusan.</div>
            <div>ꦢꦠꦱꦮꦭ (Da Ta Sa Wa La) — <em>Data sawala:</em> Padha pasulayan / adu bantah.</div>
            <div>ꦥꦝꦗꦪꦚ (Pa Dha Ja Ya Nya) — <em>Padha jayanya:</em> Kekarone padha-padha sekti.</div>
            <div>ꦩꦒꦧꦛꦔ (Ma Ga Ba Tha Nga) — <em>Maga bathanga:</em> Padha dadi bathang (sakloron gugur).</div>
          </div>

          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            Amarga padha sektine lan padha nuhoni sumpah, pungkasane Dora lan Sembada gugur bebarengan. Kanggo ngenang kasetyane abdine loro mau, Aji Saka nuli ngripta aksara Jawa 20 cacahe iki.
          </p>
        </div>
      )}

      {/* 4. PRACTICE TAB */}
      {activeTab === 'practice' && (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Soal {practiceQuestionIndex + 1} / {practiceList.length}
            </span>
            <span className="text-xs font-bold text-slate-600">
              Skor: {practiceScore}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-700 mb-2">
            Aksara Jawa iki diwaca apa?
          </h3>

          <div className="my-6 p-8 bg-purple-50 border-2 border-purple-200 rounded-3xl">
            <span className="font-javanese text-7xl font-bold text-purple-950 block select-none">
              {currentPractice.aksara}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentPractice.options.map((opt, idx) => {
              const isSelected = practiceSelected === opt;
              const isCorrectOpt = opt === currentPractice.correct;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 border-b-4';
              if (practiceAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-800 font-black';
                } else if (isSelected) {
                  btnStyle = 'bg-red-100 border-red-500 text-red-800 font-black';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={practiceAnswered}
                  onClick={() => handlePracticeSelect(opt)}
                  className={`p-4 rounded-2xl font-black text-xl border-2 transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {practiceAnswered && (
            <button
              onClick={handleNextPractice}
              className="w-full py-3.5 rounded-2xl font-black text-sm duo-btn-purple bg-purple-600 border-b-4 border-purple-800 text-white cursor-pointer"
            >
              {practiceQuestionIndex + 1 === practiceList.length ? 'Rampung Gladhi' : 'Pitakon Sabanjure'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
