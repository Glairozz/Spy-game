"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

interface WordRevealProps {
  currentPlayer: number;
  playerCount: number;
  word: string;
  color: string;
  onNext: () => void;
}

export function WordReveal({
  currentPlayer,
  playerCount,
  word,
  color,
  onNext,
}: WordRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  useEffect(() => {
    setRevealed(false);
  }, [currentPlayer]);

  const handleNext = useCallback(() => {
    setRevealed(false);
    onNext();
  }, [onNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (revealed || !dragRef.current) return;
      const diff = startY.current - e.touches[0].clientY;
      if (diff > 20) {
        e.preventDefault();
        dragRef.current.style.transform = `translateY(${-Math.min(diff, 300)}px)`;
        dragRef.current.style.opacity = String(Math.max(0, 1 - diff / 300));
      }
    },
    [revealed]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (revealed || !dragRef.current) return;
      const diff = startY.current - e.changedTouches[0].clientY;
      dragRef.current.style.transform = "";
      dragRef.current.style.opacity = "";
      if (diff > 60) {
        setRevealed(true);
      }
    },
    [revealed]
  );

  const handleClick = useCallback(() => {
    setRevealed((r) => !r);
  }, []);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `linear-gradient(135deg, ${color})`,
        }}
      />

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

      <div className="relative z-10 w-full max-w-[400px] flex-1 max-h-[460px] min-h-[300px] mb-6">
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center glass-strong">
          {revealed && (
            <motion.span
              initial={{ scale: 0.4, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-4xl md:text-5xl font-black px-6 text-center break-words"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a]">
                {word}
              </span>
            </motion.span>
          )}
        </div>

        {!revealed && (
          <motion.div
            ref={dragRef}
            initial={false}
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center touch-none select-none border-2 border-white/[0.1] shadow-2xl overflow-hidden cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${color})`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ left: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold tracking-wider text-white">
                Swipe up or tap to reveal
              </span>
            </motion.div>
          </motion.div>
        )}

        {revealed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClick}
            className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-20"
          >
            <EyeOff className="w-4 h-4 text-white" />
          </motion.button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <button
          onClick={handleNext}
          className="relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center gap-2 border-none cursor-pointer"
        >
          {currentPlayer + 1 >= playerCount ? "See Results" : "Next Player"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
