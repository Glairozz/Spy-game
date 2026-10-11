"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, MessageCircle } from "lucide-react";

interface GamePlayProps {
  turnOrder: number[];
  onEndRound: () => void;
}

export function GamePlay({ turnOrder, onEndRound }: GamePlayProps) {
  const hasRevealed = useRef(false);

  const handleReveal = useCallback(() => {
    if (hasRevealed.current) return;
    hasRevealed.current = true;
    onEndRound();
  }, [onEndRound]);

  const starter = turnOrder[0];

  return (
    <div className="relative min-h-dvh flex flex-col overflow-hidden">
      {/* Floating status indicator */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong shadow-lg">
          <MessageCircle className="w-4 h-4 text-[#667eea]" />
          <span className="text-sm font-bold text-white/90">
            Discussing Round
          </span>
        </div>
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-24 pb-32 overflow-y-auto">
        {/* Turn order bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-4"
        >
          <div className="flex items-center justify-between gap-1">
            {turnOrder.map((pIdx, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                    i === 0
                      ? "bg-gradient-to-br from-[#f6d365] to-[#fda085] text-[#241f12] shadow-lg shadow-[#f6d365]/30"
                      : "bg-white/[0.06] text-white/60"
                  }`}
                >
                  {pIdx + 1}
                </div>
                <span className="text-[10px] font-medium text-white/40">
                  {i === 0 ? "Starts" : `P${pIdx + 1}`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06] text-center">
            <span className="text-xs text-white/50">
              Turn order:{" "}
              <span className="font-bold text-white">
                {turnOrder.map((i) => `P${i + 1}`).join(" → ")}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#667eea] animate-pulse" />
                Discuss as a group
              </div>

              <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>

              <motion.p
                className="text-lg font-bold text-white/90 tracking-wide"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Discussing
              </motion.p>
              <p className="text-sm text-white/50 mt-2 max-w-xs">
                {starter !== undefined
                  ? `Player ${starter + 1} describes their word first, then follow the turn order. Find the imposter!`
                  : "Each player describes their word in order. Find the imposter!"}
              </p>
              <p className="text-[11px] text-white/30 mt-3">
                No time limit &mdash; take as long as you need.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fixed bottom reveal button */}
      <div className="fixed bottom-0 inset-x-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/80 to-transparent">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={handleReveal}
          disabled={hasRevealed.current}
          className="w-full sm:max-w-md sm:mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e1a] disabled:opacity-60 disabled:cursor-wait"
        >
          <Eye className="w-4 h-4" />
          Reveal the Imposter
        </motion.button>
      </div>
    </div>
  );
}