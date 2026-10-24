import React, { useState, useEffect } from 'react';
import { Quiz } from '../types';
import { useLearning } from '../context/LearningContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Clock,
  HelpCircle
} from 'lucide-react';

interface GamifiedQuizModalProps {
  quiz: Quiz;
  courseId: string;
  lessonId: string;
  onClose: () => void;
}

// Synthesized sound effects via Web Audio API
const playSound = (type: 'correct' | 'wrong' | 'celebrate') => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'celebrate') {
      // Fanfare sequence
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.3);
      });
    }
  } catch {
    // Audio context prevented by browser autoplay policy
  }
};

export const GamifiedQuizModal: React.FC<GamifiedQuizModalProps> = ({
  quiz,
  courseId,
  lessonId,
  onClose
}) => {
  const { recordQuizResult, markLessonCompleted } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds per question

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  // Countdown timer for question
  useEffect(() => {
    if (isFinished || isChecked) return;

    if (timeLeft <= 0) {
      // Auto check when time expires
      setIsChecked(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, isChecked]);

  const handleSelectOption = (index: number) => {
    if (isChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsChecked(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
      setTimeLeft(45);
    } else {
      // Finished all questions
      const finalCorrectCount = (selectedOption === currentQuestion.correctIndex) 
        ? correctAnswersCount + 1 
        : correctAnswersCount;
      const scorePercent = Math.round((finalCorrectCount / totalQuestions) * 100);
      const passed = scorePercent >= quiz.passPercentage;

      setIsFinished(true);

      if (passed) {
        playSound('celebrate');
        recordQuizResult(courseId, quiz.id, scorePercent, quiz.xpReward);
        markLessonCompleted(courseId, lessonId);
      } else {
        recordQuizResult(courseId, quiz.id, scorePercent, Math.round(quiz.xpReward * 0.3));
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setCorrectAnswersCount(0);
    setIsFinished(false);
    setTimeLeft(45);
  };

  const finalScorePercent = Math.round((correctAnswersCount / totalQuestions) * 100);
  const isPassed = finalScorePercent >= quiz.passPercentage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-lg border border-slate-200/90 shadow-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-amber-50 text-amber-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 leading-none">
                {quiz.titleBn}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                পাস মার্ক: {quiz.passPercentage}% · রিওয়ার্ড: +{quiz.xpReward} XP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-5">
              
              {/* Question Progress & Timer */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>প্রশ্ন {currentIndex + 1} / {totalQuestions}</span>
                
                <div className={`flex items-center gap-1 font-mono tabular-nums ${
                  timeLeft <= 10 ? 'text-rose-600 font-semibold animate-pulse' : 'text-slate-600'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeLeft} সেক</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <p className="text-base font-medium text-slate-900 leading-snug">
                {currentQuestion.questionBn}
              </p>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentQuestion.optionsBn.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = isChecked && oIdx === currentQuestion.correctIndex;
                  const isWrong = isChecked && isSelected && oIdx !== currentQuestion.correctIndex;

                  let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50';
                  if (isSelected && !isChecked) {
                    optionStyle = 'border-indigo-600 bg-indigo-50/50 text-indigo-900';
                  } else if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                  } else if (isWrong) {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      disabled={isChecked}
                      className={`w-full text-left p-3.5 text-xs rounded-lg border transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {isWrong && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Bengali Explanation */}
              {isChecked && (
                <div className={`p-3.5 rounded-lg text-xs leading-relaxed border ${
                  selectedOption === currentQuestion.correctIndex
                    ? 'bg-emerald-50/60 border-emerald-100 text-emerald-900'
                    : 'bg-amber-50/60 border-amber-100 text-amber-900'
                }`}>
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    ব্যাখ্যা:
                  </p>
                  <p>{currentQuestion.explanationBn}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3">
                {!isChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    উত্তর যাচাই করুন
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{currentIndex < totalQuestions - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4 space-y-4">
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${
                isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {isPassed ? <Award className="w-7 h-7" /> : <RotateCcw className="w-6 h-6" />}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  {isPassed ? 'অভিনন্দন! কুইজে পাস করেছেন' : 'আবার চেষ্টা করুন'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  আপনার স্কোর: <span className="font-semibold tabular-nums text-slate-800">{finalScorePercent}%</span> (পাস মার্ক {quiz.passPercentage}%)
                </p>
              </div>

              {isPassed ? (
                <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 max-w-sm mx-auto">
                  <p className="font-medium">+{quiz.xpReward} XP আপনার অ্যাকাউন্টে যোগ হয়েছে!</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">পরবর্তী লেসন আনলক হয়ে গেছে।</p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800 max-w-sm mx-auto">
                  <p>লেসনটি আরেকবার দেখে আবার কুইজে অংশ নিন।</p>
                </div>
              )}

              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>আবার কুইজ দিন</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  ক্লাসরুমে ফিরুন
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
