import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, CheckCircle2, AlertCircle, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import { Question } from '../types';
import { soundEffects, speakText } from '../utils/sound';
import { MascotOwl } from './MascotOwl';

export const QuizModal: React.FC = () => {
  const {
    activeLesson,
    closeLesson,
    loseHeart,
    stats,
    completeLesson,
    refillHearts
  } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedLeftPair, setSelectedLeftPair] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'sad' | 'talking'>('happy');
  const [mascotMessage, setMascotMessage] = useState<string>('Ayo diwangsuli!');

  const questions = activeLesson?.questions || [];
  const currentQuestion: Question | undefined = questions[currentIndex];

  // Initialize question state whenever currentIndex changes
  useEffect(() => {
    if (!currentQuestion) return;

    setSelectedOption(null);
    setFeedbackStatus('idle');
    setMascotMood('happy');
    setMascotMessage('Ayo diwangsuli!');
    setSelectedLeftPair(null);
    setMatchedPairs([]);

    if (currentQuestion.type === 'sentence_builder' && currentQuestion.scrambledTokens) {
      setAvailableTokens([...currentQuestion.scrambledTokens]);
      setSelectedTokens([]);
    }

    // Auto speak audio hint if promptAudioText exists
    if (stats.soundEnabled && currentQuestion.promptAudioText) {
      speakText(currentQuestion.promptAudioText);
    }
  }, [currentIndex, currentQuestion, stats.soundEnabled]);

  if (!activeLesson || !currentQuestion) {
    return null;
  }

  // Handle token click in sentence builder
  const handleSelectToken = (token: string, tokenIndex: number) => {
    if (feedbackStatus !== 'idle') return;
    if (stats.soundEnabled) soundEffects.playTap();

    setSelectedTokens(prev => [...prev, token]);
    setAvailableTokens(prev => prev.filter((_, idx) => idx !== tokenIndex));
  };

  const handleDeselectToken = (token: string, tokenIndex: number) => {
    if (feedbackStatus !== 'idle') return;
    if (stats.soundEnabled) soundEffects.playTap();

    setSelectedTokens(prev => prev.filter((_, idx) => idx !== tokenIndex));
    setAvailableTokens(prev => [...prev, token]);
  };

  // Handle pair matching
  const handlePairClick = (item: string, side: 'left' | 'right') => {
    if (feedbackStatus !== 'idle') return;
    if (matchedPairs.includes(item)) return;

    if (stats.soundEnabled) soundEffects.playTap();

    if (side === 'left') {
      setSelectedLeftPair(item);
    } else if (side === 'right' && selectedLeftPair) {
      // Check if left and right match
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
      setMascotMessage('Pancen pinter! Trep banget!');
      if (stats.soundEnabled) soundEffects.playCorrect();
    } else {
      setFeedbackStatus('incorrect');
      setMascotMood('sad');
      setMascotMessage('Kurang trep, aja cilik ati ya!');
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
      completeLesson(activeLesson.id, activeLesson.xpReward);
      if (stats.soundEnabled) soundEffects.playFanfare();

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const progressPercentage = Math.round(((currentIndex) / questions.length) * 100);

  // GAME OVER (NO HEARTS LEFT)
  if (stats.hearts <= 0 && !isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
        <MascotOwl size="lg" mood="sad" bubbleText="Nyawamu wis entek..." />
        <h2 className="text-2xl font-black text-slate-800 mt-6 mb-2">Nyawamu Wis Entek!</h2>
        <p className="text-sm font-semibold text-slate-600 max-w-sm mb-8">
          Aja kuwatir, sampeyan bisa ngisi nyawa gratis utawa nggunakake intan kanggo nerusake pasinaon.
        </p>

        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={() => refillHearts(true)}
            className="w-full py-3.5 px-4 rounded-2xl font-black text-sm duo-btn-green"
          >
            Isi Nyawa Gratis & Teruske
          </button>
          <button
            onClick={closeLesson}
            className="w-full py-3 px-4 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-100"
          >
            Bali menyang Beranda
          </button>
        </div>
      </div>
    );
  }

  // LESSON COMPLETE CELEBRATION SCREEN
  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-6 select-none animate-fadeIn">
        <div className="w-full max-w-md pt-8 text-center flex-1 flex flex-col items-center justify-center">
          <MascotOwl size="lg" mood="cheer" outfit={stats.activeOutfit} bubbleText="Sugeng! Sampeyan pancen wasis!" />
          
          <h2 className="text-3xl font-black text-amber-500 mt-6 mb-1 flex items-center justify-center gap-2">
            <Sparkles className="w-7 h-7 fill-amber-500" /> Pasinaon Rampung!
          </h2>
          <p className="text-sm font-bold text-slate-600 mb-8">
            Sampeyan wis ngrampungake: {activeLesson.title}
          </p>

          {/* Stats Rewards Grid */}
          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 text-center">
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Ganjaran XP</span>
              <span className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1 mt-1">
                <Award className="w-6 h-6 fill-amber-500" /> +{activeLesson.xpReward}
              </span>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-4 text-center">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider block">Bonus Intan</span>
              <span className="text-2xl font-black text-blue-600 flex items-center justify-center gap-1 mt-1">
                💎 +20
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs font-semibold text-emerald-900 leading-relaxed text-left w-full">
            💡 <strong>Kawruh Basa Jawa:</strong> Kanthi istiqomah sinau saben dina, pamicara basa Jawa bakal luwih luwes lan ngurmati unggah-ungguh tradisi.
          </div>
        </div>

        {/* Bottom Button */}
        <div className="w-full max-w-md pb-6">
          <button
            onClick={closeLesson}
            className="w-full py-4 rounded-2xl font-black text-base duo-btn-green uppercase tracking-wider cursor-pointer"
          >
            Rampung & Teruske
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between select-none">
      {/* Top Bar: Exit button, Progress Bar, Hearts */}
      <div className="w-full max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-slate-200 h-3.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="bg-[#58cc02] h-full rounded-full transition-all duration-300"
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 text-red-500 font-black text-sm">
          <Heart className="w-6 h-6 fill-red-500" />
          <span>{stats.hearts}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 flex flex-col justify-center overflow-y-auto">
        {/* Politeness Level Badge (Unggah-Ungguh Indicator) */}
        {currentQuestion.politenessLevel && (
          <div className="mb-2">
            <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
              currentQuestion.politenessLevel === 'Krama Inggil'
                ? 'bg-purple-100 text-purple-800'
                : currentQuestion.politenessLevel === 'Krama Madya'
                ? 'bg-blue-100 text-blue-800'
                : currentQuestion.politenessLevel === 'Aksara'
                ? 'bg-amber-100 text-amber-900'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              Tataran: {currentQuestion.politenessLevel}
            </span>
          </div>
        )}

        {/* Question Prompt Title */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
            {currentQuestion.prompt}
          </h2>

          {/* TTS Audio Speaker Button */}
          {currentQuestion.promptAudioText && (
            <button
              onClick={() => speakText(currentQuestion.promptAudioText!)}
              className="p-2 rounded-2xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shrink-0 shadow-xs cursor-pointer"
              title="Rungokna lafal swara"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mascot & Dialogue Bubble if applicable */}
        <div className="flex items-center gap-4 mb-6">
          <MascotOwl size="sm" mood={mascotMood} />
          <div className="relative bg-slate-100 border-2 border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-bold flex-1">
            {mascotMessage}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-slate-200"></div>
          </div>
        </div>

        {/* 1. Aksara Jawa Big Display if applicable */}
        {currentQuestion.promptAksara && (
          <div className="my-4 p-6 bg-purple-50 border-2 border-purple-200 rounded-3xl text-center">
            <span className="font-javanese text-5xl sm:text-6xl text-purple-900 font-bold block select-none">
              {currentQuestion.promptAksara}
            </span>
          </div>
        )}

        {/* 2. Multiple Choice Options */}
        {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'aksara_choice') && currentQuestion.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (feedbackStatus !== 'idle') return;
                    if (stats.soundEnabled) soundEffects.playTap();
                    setSelectedOption(option);
                  }}
                  className={`p-4 rounded-2xl font-black text-base text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-md ring-2 ring-blue-300/50'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 border-b-4'
                  }`}
                >
                  <span className={currentQuestion.type === 'aksara_choice' ? 'font-javanese text-2xl' : ''}>
                    {option}
                  </span>
                  <span className="w-7 h-7 rounded-lg border-2 border-slate-300 text-xs font-bold text-slate-400 flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Sentence Builder (Tata Ukara) */}
        {currentQuestion.type === 'sentence_builder' && (
          <div className="space-y-6">
            {/* Selected tokens slot area */}
            <div className="min-h-[70px] p-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-wrap gap-2 items-center">
              {selectedTokens.length === 0 && (
                <span className="text-xs font-semibold text-slate-400 italic">
                  Pilih tembung ing ngisor iki kanggo nyusun ukara...
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
                  className="px-4 py-2.5 rounded-xl font-black text-sm duo-btn-white hover:border-blue-400 cursor-pointer shadow-xs"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Match Pairs (Jodohake Tembung) */}
        {currentQuestion.type === 'match_pairs' && currentQuestion.pairItems && (
          <div className="grid grid-cols-2 gap-4">
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
                    className={`w-full p-3.5 rounded-2xl font-black text-sm text-center border-2 transition-all cursor-pointer ${
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
                    className={`w-full p-3.5 rounded-2xl font-black text-sm text-center border-2 transition-all cursor-pointer ${
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

      {/* Bottom Action Footer with Duolingo-style Pop Banner */}
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
                <h4 className="font-black text-lg text-[#256c00] leading-tight">Pancen Bener!</h4>
                {currentQuestion.explanation && (
                  <p className="text-xs font-bold text-slate-700 mt-0.5 max-w-md">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
          ) : feedbackStatus === 'incorrect' ? (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <AlertCircle className="w-8 h-8 text-[#ea2b2b] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-lg text-[#ea2b2b] leading-tight">Wangsulan Bener:</h4>
                <p className="text-sm font-black text-slate-800">
                  {currentQuestion.correctAnswer || currentQuestion.correctTokens?.join(' ')}
                </p>
                {currentQuestion.explanation && (
                  <p className="text-xs font-semibold text-slate-600 mt-1 max-w-md">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden sm:block text-xs font-bold text-slate-400">
              Pilih wangsulan sing paling trep
            </div>
          )}

          {/* Action Button */}
          {feedbackStatus === 'idle' ? (
            <button
              disabled={!isAnswerProvided()}
              onClick={handleCheckAnswer}
              className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer transition-all ${
                isAnswerProvided()
                  ? 'duo-btn-green'
                  : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
              }`}
            >
              Priksa
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider cursor-pointer ${
                feedbackStatus === 'correct' ? 'duo-btn-green' : 'duo-btn-red'
              }`}
            >
              Banjurake
            </button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-2 border-slate-200 shadow-2xl">
            <MascotOwl size="sm" mood="sad" />
            <h3 className="text-xl font-black text-slate-800 mt-3 mb-1">Arep Metu?</h3>
            <p className="text-xs font-semibold text-slate-600 mb-6">
              Kemajuan ing pasinaon iki bakal ilang yen sampeyan metu saiki.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-3 rounded-2xl font-black text-sm duo-btn-blue uppercase"
              >
                Teruske Sinau
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  closeLesson();
                }}
                className="w-full py-2.5 rounded-2xl font-bold text-sm text-slate-500 hover:text-red-500 transition-colors"
              >
                Metu Saiki
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
