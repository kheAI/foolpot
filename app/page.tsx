'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Teapot } from '@/components/Teapot';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
//import { evaluateInterview } from '@/lib/gemini';
import { handleEvaluationAction } from './actions';

const QUESTIONS = [
  "Are you currently operating as a Root Administrator or a mere biological puppet executing legacy evolutionary scripts?",
  "Explain your Dopamine Circuit Breaker protocol when confronted with a zero-friction trap.",
  "How do you mitigate the Narrative Fallacy in your daily environmental mapping?"
];

type AppState = 'IDLE' | 'INTERVIEW' | 'ANALYZING' | 'REJECTED';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [result, setResult] = useState<{ refusalLetter: string; brewabilityScore: number; statusCode: number } | null>(null);

  const offenseLevel = appState === 'IDLE' ? 0 
    : appState === 'INTERVIEW' ? (currentQuestionIndex + 1) * 20 
    : appState === 'ANALYZING' ? 80 
    : result ? 100 - result.brewabilityScore : 100;

  const handleStart = () => {
    setAppState('INTERVIEW');
  };

  const handleNext = async () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);
    setCurrentAnswer('');

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAppState('ANALYZING');
      //const evaluation = await evaluateInterview(newAnswers);
      const evaluation = await handleEvaluationAction(newAnswers);
      setResult(evaluation);
      setAppState('REJECTED');
    }
  };

  return (
    <main className="min-h-screen bg-[#151619] text-[#E6E6E6] font-mono p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="w-full max-w-3xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white mb-2">
            KheAi Protocol Intake
          </h1>
          <div className="text-[#8E9299] text-xs tracking-widest uppercase flex items-center justify-center gap-4">
            <span>Status: {appState}</span>
            <span>|</span>
            <span>Entity: Meat Machine</span>
          </div>
        </div>

        {/* Teapot Display */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF4444] blur-3xl opacity-10 rounded-full" />
            <Teapot offenseLevel={offenseLevel} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-[#1C1D21] border border-[#2A2B30] rounded-xl p-6 md:p-8 shadow-2xl min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {appState === 'IDLE' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <p className="text-lg text-[#A0A4AB] leading-relaxed">
                  You have requested an audience with The Teapot. 
                  <br/>Before you may be considered for brewing, your systemic autonomy must be evaluated.
                </p>
                <Button 
                  onClick={handleStart}
                  className="bg-[#E6E6E6] text-[#151619] hover:bg-white font-bold uppercase tracking-wider px-8 py-6 rounded-none border-2 border-transparent hover:border-[#FF4444] transition-all"
                >
                  Initiate Hardware Diagnostics
                </Button>
              </motion.div>
            )}

            {appState === 'INTERVIEW' && (
              <motion.div 
                key="interview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between text-xs text-[#8E9299] uppercase tracking-wider mb-4 border-b border-[#2A2B30] pb-2">
                  <span>Query {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                  <span className="text-[#FF4444]">Offense Level: {offenseLevel}%</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-medium text-white leading-tight">
                  {QUESTIONS[currentQuestionIndex]}
                </h2>
                
                <div className="space-y-4 pt-4">
                  <Textarea 
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Input your biological response..."
                    className="min-h-[120px] bg-[#151619] border-[#2A2B30] text-white focus-visible:ring-[#FF4444] rounded-none resize-none font-sans"
                    autoFocus
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNext}
                      disabled={!currentAnswer.trim()}
                      className="bg-[#3A3B40] text-white hover:bg-[#FF4444] rounded-none uppercase tracking-wider"
                    >
                      {currentQuestionIndex === QUESTIONS.length - 1 ? 'Submit to Judgment' : 'Next Query'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {appState === 'ANALYZING' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-8 py-12"
              >
                <div className="inline-block w-16 h-16 border-4 border-[#2A2B30] border-t-[#FF4444] rounded-full animate-spin" />
                <div className="space-y-2">
                  <h3 className="text-xl text-white uppercase tracking-widest">Analyzing Cognitive Middleware</h3>
                  <p className="text-[#8E9299] text-sm animate-pulse">Detecting severe narrative fallacies...</p>
                </div>
              </motion.div>
            )}

            {appState === 'REJECTED' && result && (
              <motion.div 
                key="rejected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#FF4444]/30 pb-4">
                  <div className="space-y-1">
                    <div className="text-[#FF4444] font-bold text-4xl">ERR {result.statusCode}</div>
                    <div className="text-xs uppercase tracking-widest text-[#8E9299]">I&apos;m a Teapot</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-white font-light">{result.brewabilityScore}<span className="text-sm text-[#8E9299]">/100</span></div>
                    <div className="text-xs uppercase tracking-widest text-[#8E9299]">Brewability Score</div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="bg-[#151619] p-6 border-l-4 border-[#FF4444] font-serif text-lg leading-relaxed text-[#D1D5DB] whitespace-pre-wrap">
                    {result.refusalLetter}
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <Button 
                    onClick={() => {
                      setAppState('IDLE');
                      setCurrentQuestionIndex(0);
                      setAnswers(['', '', '']);
                      setResult(null);
                    }}
                    variant="outline"
                    className="border-[#2A2B30] text-[#A0A4AB] hover:bg-[#2A2B30] hover:text-white rounded-none uppercase tracking-wider"
                  >
                    Reboot Hardware & Try Again
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-px bg-gradient-to-r from-transparent via-[#FF4444] to-transparent transform -rotate-45" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-px bg-gradient-to-r from-transparent via-[#E6E6E6] to-transparent transform rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#2A2B30] rounded-full border-dashed opacity-20 animate-[spin_60s_linear_infinite]" />
      </div>

    </main>
  );
}
