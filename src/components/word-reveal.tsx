"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WordRevealProps {
  currentPlayer: number;
  playerCount: number;
  word: string;
  color: string;
  onNext: () => void;
}

export function WordReveal({ currentPlayer, playerCount, word, color, onNext }: WordRevealProps) {
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

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (revealed || !dragRef.current) return;
    const diff = startY.current - e.touches[0].clientY;
    if (diff > 20) {
      e.preventDefault();
      dragRef.current.style.transform = `translateY(${-Math.min(diff, 300)}px)`;
      dragRef.current.style.opacity = String(Math.max(0, 1 - diff / 300));
    }
  }, [revealed]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (revealed || !dragRef.current) return;
    const diff = startY.current - e.changedTouches[0].clientY;
    dragRef.current.style.transform = "";
    dragRef.current.style.opacity = "";
    if (diff > 60) {
      setRevealed(true);
    }
  }, [revealed]);

  const handleClick = useCallback(() => {
    setRevealed((r) => !r);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col items-center justify-center p-4 md:p-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-black mb-6 text-center"
      >
        Player {currentPlayer + 1}
      </motion.h2>

      <div className="relative w-full max-w-[400px] h-[55vh] max-h-[500px]">
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#1e2157] to-[#151840] shadow-2xl border border-white/5">
          {revealed && (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl font-black px-6 text-center break-words"
            >
              <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a] bg-clip-text text-transparent animate-pulse-scale">
                {word}
              </span>
            </motion.span>
          )}
        </div>

        {!revealed && (
          <motion.div
            ref={dragRef}
            initial={false}
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center touch-none select-none border-2 border-white/10 shadow-2xl overflow-hidden cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${color})` }}
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
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl mb-4"
            >
              <Eye className="w-10 h-10 md:w-12 md:h-12" />
            </motion.div>

            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/80 px-4 text-center">
              Swipe up or tap to reveal
            </span>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Button
          size="lg"
          onClick={handleNext}
          className="gap-2 min-w-[200px]"
        >
          {currentPlayer + 1 >= playerCount ? "See Results" : "Next Player"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
