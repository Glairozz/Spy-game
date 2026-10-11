"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Lock } from "lucide-react";

interface WordRevealProps {
  currentPlayer: number;
  playerCount: number;
  word: string;
  /** Clue word shown ONLY on the Imposter's card. Empty for normal players. */
  clueWord: string;
  color: string;
  onNext: () => void;
}

export function WordReveal({
  currentPlayer,
  playerCount,
  word,
  clueWord,
  color,
  onNext,
}: WordRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const navigated = useRef(false);

  useEffect(() => {
    navigated.current = false;
    setRevealed(false);
  }, [currentPlayer]);

  const handleNext = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    onNext();
  }, [onNext]);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `linear-gradient(135deg, ${color})`,
        }}
      />

      {!revealed ? (
        <>
          {/* Handoff screen */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/70 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1dd1a1] animate-pulse" />
              Player {currentPlayer + 1} of {playerCount}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-balance">
              Pass the phone to Player {currentPlayer + 1}
            </h2>
            <p className="text-sm text-white/50 mt-2 max-w-xs mx-auto">
              Your card stays hidden until you tap the button below.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 w-full max-w-[400px]"
          >
            <div className="glass-strong rounded-2xl flex flex-col items-center justify-center gap-4 p-10 text-center min-h-[300px]">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                <Lock className="w-6 h-6 text-white/60" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                Card Hidden
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mt-6"
          >
            <button
              onClick={() => setRevealed(true)}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e1a]"
            >
              <Eye className="w-4 h-4" />
              Reveal My Card
            </button>
          </motion.div>
        </>
      ) : (
        <>
          {/* Revealed card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/70 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1dd1a1] animate-pulse" />
              Player {currentPlayer + 1} of {playerCount}
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Your Word</h2>
          </motion.div>

          <div className="relative z-10 w-full max-w-[400px]">
            <div className="relative rounded-2xl glass-strong p-8 flex flex-col items-center justify-center min-h-[300px] overflow-hidden">
              <motion.div
                initial={{ scale: 0.4, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full text-center"
              >
                <span className="block text-4xl md:text-5xl font-black px-2 break-words">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a]">
                    {word}
                  </span>
                </span>

                {clueWord && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-5 pt-4 border-t border-white/10 px-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                      Clue Word
                    </p>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f6d365] to-[#fda085] text-xl md:text-2xl font-bold break-words">
                      {clueWord}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mt-6"
          >
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e1a]"
            >
              Next Player
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}