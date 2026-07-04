"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, Check } from "lucide-react";
import { getPlayerColor } from "@/lib/game-engine";

interface GamePlayProps {
  turnOrder: number[];
  currentTurn: number;
  playerCount: number;
  onNextTurn: () => void;
  onEndRound: () => void;
}

export function GamePlay({
  turnOrder,
  currentTurn,
  playerCount,
  onNextTurn,
  onEndRound,
}: GamePlayProps) {
  const allDone = currentTurn >= playerCount;
  const currentPlayerIndex = allDone ? -1 : turnOrder[currentTurn];
  const color = getPlayerColor(Math.max(currentPlayerIndex, 0));

  return (
    <div className="relative min-h-dvh flex flex-col p-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: `linear-gradient(135deg, ${color})` }}
      />

      {/* Turn order bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-strong rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between gap-1">
          {turnOrder.map((pIdx, i) => {
            const isCurrent = i === currentTurn && !allDone;
            const isDone = i < currentTurn;
            return (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isCurrent
                      ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white scale-110 shadow-lg shadow-[#667eea]/40"
                      : isDone
                      ? "bg-[#1dd1a1]/20 text-[#1dd1a1]"
                      : "bg-white/[0.04] text-white/40"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : pIdx + 1}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isCurrent
                      ? "text-white"
                      : isDone
                      ? "text-[#1dd1a1]"
                      : "text-white/30"
                  }`}
                >
                  P{pIdx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {!allDone && (
          <div className="mt-3 pt-3 border-t border-white/[0.06] text-center">
            <span className="text-xs text-white/50">
              Turn order:{" "}
              <span className="font-bold text-white">
                {turnOrder.map((i) => `P${i + 1}`).join(" → ")}
              </span>
            </span>
          </div>
        )}
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {!allDone ? (
            <motion.div
              key={`discuss-${currentTurn}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="glass-strong rounded-2xl p-8 text-center max-w-[400px] w-full">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${color})`,
                  }}
                >
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-black mb-2">
                  Player {currentPlayerIndex + 1}
                </h2>
                <p className="text-white/70 text-sm mb-6">
                  Describe your word without saying it
                </p>
                <button
                  onClick={onNextTurn}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer"
                >
                  I&apos;m Done Describing
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="glass-strong rounded-2xl p-8 text-center max-w-[400px] w-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1dd1a1]/20 to-[#10ac84]/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-[#1dd1a1]" />
                </div>
                <h2 className="text-2xl font-black mb-2">
                  All Players Have Spoken
                </h2>
                <p className="text-white/60 text-sm mb-2">
                  Time to find out who the spy was
                </p>
                <p className="text-white/40 text-xs mb-6">
                  Everyone has finished describing their word
                </p>
                <button
                  onClick={onEndRound}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f6d365] to-[#fda085] text-white font-bold shadow-lg shadow-[#f6d365]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 border-none cursor-pointer"
                >
                  Reveal the Spy
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
