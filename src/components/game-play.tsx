"use client";

import { motion } from "framer-motion";
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
  const isLast = currentTurn === playerCount - 1;

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
        className="relative z-10 glass-strong rounded-2xl p-4"
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

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <motion.div
          key={allDone ? "reveal" : `discuss-${currentTurn}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-8"
        >
          {!allDone && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/50 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#667eea] animate-pulse" />
                Player {currentPlayerIndex + 1}&apos;s turn
              </div>

              <div className="relative">
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${color})`,
                  }}
                >
                  <span className="text-3xl font-black text-white">
                    {currentPlayerIndex + 1}
                  </span>
                </div>
                <motion.div
                  className="absolute -inset-4 rounded-[40px] opacity-20 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${color})`,
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <motion.p
                className="text-lg font-bold text-white/90 tracking-wide"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Discussing
              </motion.p>
            </div>
          )}

          {/* Button */}
          <motion.button
            onClick={allDone ? onEndRound : onNextTurn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 transition-all duration-200 border-none cursor-pointer flex items-center gap-2"
          >
            {allDone ? (
              <>
                Reveal the Spy
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>Done discussing?</>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
