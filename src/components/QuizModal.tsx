import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight, Lightbulb, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Question } from '../types';
import { useGame } from '../context/GameContext';
import { soundEffects, speakText } from '../utils/sound';
import { TionMascot } from './TionMascot';
import { UgmLogo } from './UgmLogo';

interface QuizModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ lesson, onClose }) => {
  const {
    stats,
    loseHeart,
    refillHearts,
    completeLesson,
    useHint,
    useHintOrBuyWithGems
  } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedLeftPair, setSelectedLeftPair] = useState<string | null>(null);

  // Hint state
  const [isHintActive, setIsHintActive] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [hintClueText, setHintClueText] = useState<string | null>(null);
  const [showExchangeConfirm, setShowExchangeConfirm] = useState(false);
  const [hintToast, setHintToast] = useState<string | null>(null);

  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'sad' | 'talking'>('happy');
  const [mascotMessage, setMascotMessage] = useState<string>('Pilih jawaban yang paling tepat ya!');
  const [isFinished, setIsFinished] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const questions: Question[] = lesson.questions;
  const currentQuestion: Question = questions[currentIndex];

  const showHintToastMsg = (msg: string) => {
    setHintToast(msg);
    setTimeout(() => setHintToast(null), 3000);
  };

  // Initialize question state whenever currentIndex changes
  useEffect(() => {
    setSelectedOption(null);
    setFeedbackStatus('idle');
    setMascotMood('happy');
    setIsHintActive(false);
    setEliminatedOptions([]);
    setHintClueText(null);
    setShowExchangeConfirm(false);

    if (currentQuestion.type === 'sentence_builder') {
      const tokens = currentQuestion.scrambledTokens ? [...currentQuestion.scrambledTokens] : [];
      setAvailableTokens(tokens);
      setSelectedTokens([]);
      setMascotMessage('Susun kata-kata di bawah ini menjadi kalimat yang benar!');
    } else if (currentQuestion.type === 'match_pairs') {
      setMatchedPairs([]);
      setSelectedLeftPair(null);
      setMascotMessage('Pasangkan kata bahasa Jawa dengan artinya dalam bahasa Indonesia!');
    } else {
      setMascotMessage('Pilih jawaban yang paling tepat ya!');
    }
  }, [currentIndex, currentQuestion]);

  // Token selection for sentence builder
  const handleSelectToken = (token: string, index: number) => {
    if (feedbackStatus !== 'idle') return;
    if (stats.soundEnabled) soundEffects.playTap();
    setSelectedTokens(prev => [...prev, token]);
    setAvailableTokens(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeselectToken = (token: string, index: number) => {
    if (feedbackStatus !== 'idle') return;
    if (stats.soundEnabled) soundEffects.playTap();
    setAvailableTokens(prev => [...prev, token]);
    setSelectedTokens(prev => prev.filter((_, i) => i !== index));
  };

  // Pair matching selection
  const handlePairClick = (item: string, side: 'left' | 'right') => {
    if (feedbackStatus !== 'idle') return;
    if (matchedPairs.includes(item)) return;

    if (side === 'left') {
      if (stats.soundEnabled) soundEffects.playTap();
      setSelectedLeftPair(item);
    } else if (side === 'right' && selectedLeftPair) {
      const matchingPair = currentQuestion.pairItems?.find(
        p => p.left === selectedLeftPair && p.right === item
      );

      if (matchingPair) {
        if (stats.soundEnabled) soundEffects.playTap();
        setMatchedPairs(prev => [...prev, selectedLeftPair, item]);
        setSelectedLeftPair(null);
      } else {
        // Mismatch
        if (stats.soundEnabled) soundEffects.playIncorrect();
        setSelectedLeftPair(null);
      }
    }
  };

  // Determine if user can click check button
  const isAnswerProvided = () => {
    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'aksara_choice') {
      return selectedOption !== null;
    }
    if (currentQuestion.type === 'sentence_builder') {
      return selectedTokens.length > 0;
    }
    if (currentQuestion.type === 'match_pairs') {
      const totalPairsCount = currentQuestion.pairItems?.length || 0;
      return matchedPairs.length === totalPairsCount * 2;
    }
    return false;
  };

  // Verification
  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'aksara_choice') {
      isCorrect = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'sentence_builder') {
      isCorrect =
        selectedTokens.length === currentQuestion.correctTokens?.length &&
        selectedTokens.every((token, idx) => token === currentQuestion.correctTokens?.[idx]);
    } else if (currentQuestion.type === 'match_pairs') {
      const totalPairsCount = currentQuestion.pairItems?.length || 0;
      isCorrect = matchedPairs.length === totalPairsCount * 2;
    }

    if (isCorrect) {
      setFeedbackStatus('correct');
      setMascotMood('cheer');
      setMascotMessage('Keren banget! Jawabanmu tepat sekali! 🎉');
      if (stats.soundEnabled) soundEffects.playCorrect();
    } else {
      setFeedbackStatus('incorrect');
      setMascotMood('sad');
      setMascotMessage('Belum tepat nih, jangan berkecil hati ya! Terus semangat!');
      loseHeart();
    }
  };

  // Continue to next question or finish
  const handleContinue = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all questions!
      setIsFinished(true);
      completeLesson(lesson.id, lesson.xpReward);
      if (stats.soundEnabled) soundEffects.playFanfare();

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  // ========================================================
  // HINT LOGIC IMPLEMENTATION
  // ========================================================
  const applyHintEffect = () => {
    setIsHintActive(true);
    setMascotMood('thinking');
    setMascotMessage('Tion aktifkan petunjuk buatmu! Perhatikan baik-baik ya! 💡');

    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'aksara_choice') {
      const wrongOptions = (currentQuestion.options || []).filter(
        opt => opt !== currentQuestion.correctAnswer
      );

      // Eliminate 1 or 2 wrong choices
      const countToEliminate = wrongOptions.length >= 3 ? 2 : 1;
      const toEliminate = wrongOptions.slice(0, countToEliminate);
      setEliminatedOptions(toEliminate);

      // Craft helpful clue
      let clue = currentQuestion.hintClue;
      if (!clue && currentQuestion.explanation) {
        clue = currentQuestion.explanation;
      }
      if (!clue) {
        clue = 'Pilihan yang jelas salah telah dicoret. Perhatikan pilihan yang tersisa!';
      }
      setHintClueText(clue);
    } else if (currentQuestion.type === 'sentence_builder') {
      const targetTokens = currentQuestion.correctTokens || [];
      const currentSelectedCount = selectedTokens.length;

      if (currentSelectedCount < targetTokens.length) {
        const nextTargetToken = targetTokens[currentSelectedCount];
        const availIdx = availableTokens.indexOf(nextTargetToken);
        if (availIdx !== -1) {
          handleSelectToken(nextTargetToken, availIdx);
        }
        setHintClueText(`Kata berikutnya: "${nextTargetToken}" sudah otomatis dipasangkan ke susunan kalimat!`);
      } else {
        setHintClueText(currentQuestion.explanation || 'Periksa kembali urutan kata yang telah kamu susun.');
      }
    } else if (currentQuestion.type === 'match_pairs') {
      const allPairs = currentQuestion.pairItems || [];
      const unmatched = allPairs.find(p => !matchedPairs.includes(p.left));
      if (unmatched) {
        setMatchedPairs(prev => [...prev, unmatched.left, unmatched.right]);
        setHintClueText(`Pasangan "${unmatched.left} = ${unmatched.right}" sudah otomatis dicocokkan untukmu!`);
      }
    }

    if (stats.soundEnabled) soundEffects.playCorrect();
  };

  const handleTriggerHint = () => {
    if (isHintActive) {
      showHintToastMsg('Petunjuk sudah aktif untuk soal ini!');
      return;
    }

    if (stats.hintCount > 0) {
      if (useHint()) {
        applyHintEffect();
        showHintToastMsg(`1 Petunjuk tersimpan berhasil digunakan! (Sisa: ${stats.hintCount - 1}) 💡`);
      }
    } else {
      // 0 hints in inventory: offer to exchange gems
      if (stats.gems >= 15) {
        setShowExchangeConfirm(true);
      } else {
        showHintToastMsg(`Intanmu tidak cukup untuk membeli petunjuk (butuh 15 intan, kamu punya ${stats.gems} intan). 💎`);
      }
    }
  };

  const handleConfirmExchangeGemsForHint = () => {
    setShowExchangeConfirm(false);
    const res = useHintOrBuyWithGems(15);
    if (res.success) {
      applyHintEffect();
      showHintToastMsg('Berhasil menukar 15 Intan untuk 1 Petunjuk! 💡');
    } else {
      showHintToastMsg('Gagal menukar intan. Pastikan saldo intan mencukupi.');
    }
  };

  // GAME OVER (NO HEARTS LEFT)
  if (stats.hearts <= 0 && !isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
        <TionMascot size="lg" mood="sad" bubbleText="Aduh, nyawamu habis!" />
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-4 mb-2">
          Nyawamu Sudah Habis! ❤️
        </h2>
        <p className="text-sm font-semibold text-slate-600 max-w-sm mb-6">
          Jangan menyerah ya! Kamu bisa memulihkan semua nyawa memakai intan hasil belajarmu, atau istirahat sejenak sebelum mencoba lagi.
        </p>

        <div className="space-y-3 w-full max-w-xs">
          <button
            onClick={() => refillHearts(false)}
            className="w-full py-3.5 px-6 rounded-2xl font-black text-sm gama-btn-gold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Isi Penuh Nyawa (50 Intan)</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // LESSON COMPLETED CELEBRATION
  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
        <div className="mb-2">
          <UgmLogo size={48} color="#1e88e5" />
        </div>
        <TionMascot size="lg" mood="cheer" bubbleText="Selamat! Kamu makin fasih!" />
        <h2 className="text-3xl font-black text-[#1565c0] mt-4 mb-1">
          Latihan Selesai! 🎉
        </h2>
        <p className="text-sm font-bold text-slate-600 max-w-sm mb-6">
          Keren sekali! Kosakata bahasa Jawamu makin bertambah, siap berbaur akrab di kampus Gadjah Mada!
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-amber-50 border-2 border-amber-200 px-5 py-3 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#d97706] block">
              Poin XP
            </span>
            <span className="text-2xl font-black text-[#b45309]">+{lesson.xpReward} XP</span>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 px-5 py-3 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1565c0] block">
              Intan Belanja
            </span>
            <span className="text-2xl font-black text-[#1565c0]">+20 💎</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full max-w-xs py-4 px-8 rounded-2xl font-black text-sm gama-btn-gold uppercase tracking-wider cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          Selesai & Lanjut
        </button>
      </div>
    );
  }

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-[#f8fafc] flex flex-col justify-between select-none animate-fadeIn">
      {/* Toast Notification */}
      {hintToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1565c0] text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-xl animate-bounce border-2 border-amber-300">
          {hintToast}
        </div>
      )}

      {/* Top Header Bar */}
      <div className="w-full px-3 sm:px-8 py-3.5 border-b-2 border-slate-200 flex items-center justify-between gap-3 max-w-4xl mx-auto">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Keluar latihan"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5 max-w-xs sm:max-w-md shadow-inner">
          <div
            className="h-full bg-[#1e88e5] rounded-full transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Right Actions: Hint Button + Hearts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hint Trigger Button (Bisa ditukar intan atau pakai hint tersimpan) */}
          <button
            onClick={handleTriggerHint}
            disabled={feedbackStatus !== 'idle'}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              isHintActive
                ? 'bg-amber-100 text-amber-900 border-2 border-amber-400 ring-2 ring-amber-200'
                : stats.hintCount > 0
                ? 'bg-amber-50 hover:bg-amber-100 text-[#b45309] border-2 border-amber-300 hover:scale-105'
                : 'bg-blue-50 hover:bg-blue-100 text-[#1565c0] border-2 border-blue-300 hover:scale-105'
            }`}
            title="Gunakan bantuan petunjuk"
          >
            <Lightbulb className={`w-4 h-4 ${isHintActive ? 'fill-amber-500 text-amber-600 animate-bounce' : 'text-amber-500 fill-amber-300'}`} />
            <span className="hidden sm:inline">
              {isHintActive ? 'Petunjuk Aktif' : stats.hintCount > 0 ? `Petunjuk (${stats.hintCount})` : 'Tukar 15 💎'}
            </span>
            <span className="sm:hidden font-bold">
              {isHintActive ? 'Aktif' : stats.hintCount > 0 ? `${stats.hintCount}` : '15💎'}
            </span>
          </button>

          {/* Hearts indicator */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-red-500 font-black text-sm sm:text-base">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-red-500 animate-pulse" />
            <span>{stats.hearts}</span>
          </div>
        </div>
      </div>

      {/* Main Question Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:py-6 max-w-2xl w-full mx-auto flex flex-col justify-center">
        {/* Politeness Level Badge / Maba Guide Tag */}
        {currentQuestion.politenessLevel && (
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                currentQuestion.politenessLevel === 'Krama Inggil'
                  ? 'bg-amber-50 text-[#b45309] border-amber-300'
                  : currentQuestion.politenessLevel === 'Krama Madya'
                  ? 'bg-blue-50 text-[#1565c0] border-blue-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
            >
              Tingkat Tutur: {currentQuestion.politenessLevel}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {currentQuestion.politenessLevel === 'Krama Inggil'
                ? '(Sangat Hormat untuk Dosen / Pejabat Kampus)'
                : currentQuestion.politenessLevel === 'Krama Madya'
                ? '(Sopan Santun Sehari-hari untuk Warung & Warga)'
                : '(Santai untuk Sesama Teman Maba)'}
            </span>
          </div>
        )}

        {/* Question Prompt Heading */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 leading-snug">
            {currentQuestion.prompt}
          </h2>

          {/* Audio Speaker Button */}
          {currentQuestion.promptAudioText && (
            <button
              onClick={() => speakText(currentQuestion.promptAudioText!)}
              className="p-2.5 rounded-2xl bg-blue-100 text-[#1565c0] hover:bg-blue-200 transition-colors shrink-0 shadow-xs cursor-pointer"
              title="Dengarkan pengucapan lafal"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Active Hint Clue Box (Tampil saat petunjuk diaktifkan) */}
        {isHintActive && hintClueText && (
          <div className="mb-4 p-3.5 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3 shadow-xs animate-fadeIn">
            <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 fill-amber-500 text-amber-700 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  Petunjuk Tion Aktif
                </span>
                {eliminatedOptions.length > 0 && (
                  <span className="text-[10px] font-bold text-red-700">
                    ({eliminatedOptions.length} pilihan salah telah dieliminasi)
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-amber-950 mt-1 leading-relaxed">
                {hintClueText}
              </p>
            </div>
          </div>
        )}

        {/* Mascot & Dialogue Bubble */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0">
            <TionMascot size="sm" mood={mascotMood} />
          </div>
          <div className="relative bg-blue-50/95 border-2 border-blue-200 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-[#1565c0] text-xs sm:text-sm font-extrabold flex-1 shadow-2xs">
            {mascotMessage}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-blue-200"></div>
          </div>
        </div>

        {/* 1. Aksara Jawa Big Display if applicable */}
        {currentQuestion.promptAksara && (
          <div className="my-3 p-5 bg-purple-50 border-2 border-purple-200 rounded-3xl text-center">
            <span className="font-javanese text-5xl sm:text-6xl text-purple-900 font-bold block select-none">
              {currentQuestion.promptAksara}
            </span>
          </div>
        )}

        {/* 2. Multiple Choice Options */}
        {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'aksara_choice') && currentQuestion.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isEliminated = eliminatedOptions.includes(option);

              return (
                <button
                  key={idx}
                  disabled={isEliminated || feedbackStatus !== 'idle'}
                  onClick={() => {
                    if (feedbackStatus !== 'idle' || isEliminated) return;
                    if (stats.soundEnabled) soundEffects.playTap();
                    setSelectedOption(option);
                  }}
                  className={`p-4 rounded-2xl font-black text-sm sm:text-base text-left border-2 transition-all flex items-center justify-between ${
                    isEliminated
                      ? 'opacity-40 line-through bg-slate-100 border-dashed border-red-200 text-slate-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-50 border-blue-500 text-[#1565c0] shadow-md ring-2 ring-blue-300/60 cursor-pointer'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 border-b-4 cursor-pointer'
                  }`}
                >
                  <span className={currentQuestion.type === 'aksara_choice' ? 'font-javanese text-2xl' : ''}>
                    {option}
                  </span>
                  {isEliminated ? (
                    <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Bukan Ini
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-lg border-2 border-slate-300 text-xs font-bold text-slate-400 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Sentence Builder (Penyusun Kalimat) */}
        {currentQuestion.type === 'sentence_builder' && (
          <div className="space-y-4">
            {/* Slot area */}
            <div className="min-h-[75px] p-3.5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-wrap gap-2 items-center">
              {selectedTokens.length === 0 && (
                <span className="text-xs font-semibold text-slate-400 italic">
                  Klik kata-kata di bawah ini untuk menyusun kalimat...
                </span>
              )}
              {selectedTokens.map((token, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDeselectToken(token, idx)}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-white border-2 border-slate-300 border-b-4 text-slate-800 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer shadow-xs"
                >
                  {token}
                </button>
              ))}
            </div>

            {/* Available tokens to click */}
            <div className="flex flex-wrap gap-2.5 justify-center pt-2">
              {availableTokens.map((token, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectToken(token, idx)}
                  className="px-4 py-2.5 rounded-xl font-black text-sm bg-white border-2 border-slate-200 border-b-4 text-slate-800 hover:border-blue-400 cursor-pointer shadow-xs"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Match Pairs (Jodohkan Kata) */}
        {currentQuestion.type === 'match_pairs' && currentQuestion.pairItems && (
          <div className="grid grid-cols-2 gap-3.5">
            {/* Left column */}
            <div className="space-y-2.5">
              {currentQuestion.pairItems.map(pair => {
                const isMatched = matchedPairs.includes(pair.left);
                const isSelected = selectedLeftPair === pair.left;

                return (
                  <button
                    key={pair.left}
                    disabled={isMatched}
                    onClick={() => handlePairClick(pair.left, 'left')}
                    className={`w-full p-3.5 rounded-2xl font-black text-xs sm:text-sm text-center border-2 transition-all cursor-pointer ${
                      isMatched
                        ? 'opacity-40 bg-emerald-50 border-emerald-300 text-emerald-800'
                        : isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm ring-2 ring-blue-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 border-b-4'
                    }`}
                  >
                    {pair.left}
                  </button>
                );
              })}
            </div>

            {/* Right column */}
            <div className="space-y-2.5">
              {currentQuestion.pairItems.map(pair => {
                const isMatched = matchedPairs.includes(pair.right);

                return (
                  <button
                    key={pair.right}
                    disabled={isMatched}
                    onClick={() => handlePairClick(pair.right, 'right')}
                    className={`w-full p-3.5 rounded-2xl font-black text-xs sm:text-sm text-center border-2 transition-all cursor-pointer ${
                      isMatched
                        ? 'opacity-40 bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 border-b-4'
                    }`}
                  >
                    {pair.right}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div
        className={`w-full border-t-2 py-4 px-6 transition-all duration-300 ${
          feedbackStatus === 'correct'
            ? 'bg-[#d7ffb8] border-[#b8f28b] text-[#256c00]'
            : feedbackStatus === 'incorrect'
            ? 'bg-[#ffdfe0] border-[#ffb3b5] text-[#ea2b2b]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Feedback Info Message */}
          {feedbackStatus === 'correct' ? (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <CheckCircle2 className="w-8 h-8 text-[#58cc02] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-lg text-[#256c00] leading-tight">
                  Tepat Sekali! 🎉
                </h4>
                {currentQuestion.explanation && (
                  <p className="text-xs font-bold text-slate-700 mt-1 max-w-md leading-relaxed">
                    <span className="font-black text-emerald-900">Penjelasan: </span>
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
          ) : feedbackStatus === 'incorrect' ? (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <AlertCircle className="w-8 h-8 text-[#ea2b2b] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-lg text-[#ea2b2b] leading-tight">
                  Jawaban yang Benar:
                </h4>
                <p className="text-sm font-black text-slate-800 mt-0.5">
                  {currentQuestion.correctAnswer || currentQuestion.correctTokens?.join(' ')}
                </p>
                {currentQuestion.explanation && (
                  <p className="text-xs font-semibold text-slate-600 mt-1 max-w-md leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden sm:block text-xs font-bold text-slate-500">
              Pilih jawaban yang paling tepat untuk melanjutkan
            </div>
          )}

          {/* Action Button */}
          {feedbackStatus === 'idle' ? (
            <button
              disabled={!isAnswerProvided()}
              onClick={handleCheckAnswer}
              className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer transition-all ${
                isAnswerProvided()
                  ? 'gama-btn-gold text-[#1e293b]'
                  : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
              }`}
            >
              Periksa Jawaban
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 ${
                feedbackStatus === 'correct' ? 'gama-btn-gold text-[#1e293b]' : 'gama-btn-red text-white'
              }`}
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Exchange Gems for Hint Confirmation Dialog */}
      {showExchangeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-2 border-amber-300 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-3 border-2 border-amber-300 shadow-xs">
              <Lightbulb className="w-8 h-8 fill-amber-400 text-amber-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Tukar Intan untuk Petunjuk?
            </h3>
            <p className="text-xs font-semibold text-slate-600 mb-4 leading-relaxed">
              Kamu tidak memiliki sisa petunjuk gratis. Tukarkan <span className="font-black text-[#1565c0]">15 Intan</span> untuk mengeliminasi pilihan salah dan membuka petunjuk di soal ini?
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-2.5 mb-5 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600">Saldo Intanmu:</span>
              <span className="font-black text-[#1565c0] flex items-center gap-1">
                <Gem className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" /> {stats.gems} Intan
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleConfirmExchangeGemsForHint}
                className="w-full py-3.5 rounded-2xl font-black text-sm gama-btn-gold text-[#1e293b] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Tukar 15 Intan & Aktifkan</span>
              </button>
              <button
                onClick={() => setShowExchangeConfirm(false)}
                className="w-full py-2.5 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-2 border-blue-200 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-2">
              <TionMascot size="sm" mood="sad" />
            </div>
            <h3 className="text-xl font-black text-[#1565c0] mt-2 mb-1">
              Yakin Mau Keluar?
            </h3>
            <p className="text-xs font-semibold text-slate-600 mb-6">
              Kemajuan belajarmu di sesi ini belum tersimpan jika kamu keluar sekarang.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-3.5 rounded-2xl font-black text-sm gama-btn-gold text-[#1e293b] uppercase"
              >
                Lanjut Belajar
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-2xl font-bold text-xs text-slate-500 hover:text-red-500 transition-colors"
              >
                Keluar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
