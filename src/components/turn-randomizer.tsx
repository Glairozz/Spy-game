"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shuffle,
  Dices,
  ArrowRight,
  ArrowLeft,
  Play,
} from "lucide-react";
import type { TurnDirection } from "@/lib/game-engine";

interface TurnRandomizerProps {
  playerCount: number;
  onStart: (starterIndex: number, direction: TurnDirection) => void;
}

export function TurnRandomizer({ playerCount, onStart }: TurnRandomizerProps) {
  const [starterIndex, setStarterIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<TurnDirection | null>(null);

  const canStart = starterIndex !== null && direction !== null;

  const randomize = useCallback(() => {
    setStarterIndex(Math.floor(Math.random() * playerCount));
    setDirection(Math.random() < 0.5 ? "clockwise" : "counterclockwise");
  }, [playerCount]);

  const handleStart = useCallback(() => {
    if (starterIndex === null || direction === null) return;
    onStart(starterIndex, direction);
  }, [starterIndex, direction, onStart]);

  const orderPreview = useMemo(() => {
    if (starterIndex === null || direction === null) return null;
    const order: number[] = [];
    for (let i = 0; i < playerCount; i++) {
      const step = direction === "clockwise" ? i : -i;
      order.push(((starterIndex + step + playerCount) % playerCount) + 1);
    }
    return order;
  }, [starterIndex, direction, playerCount]);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #f6d365, transparent)" }}
        animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f6d365]/20 to-[#fda085]/20 border border-white/10 mb-4"
        >
          <Shuffle className="w-6 h-6 text-[#f6d365]" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-gradient-gold">Set the Turn Order</span>
        </h2>
        <p className="text-white/80 text-sm">
          Choose who starts the discussion and the rotation
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
        className="relative z-10 w-full max-w-[520px] space-y-5"
      >
        {/* Who starts the round */}
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-white/50 tracking-widest uppercase">
              Who Starts the Round?
            </p>
            <button
              onClick={randomize}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-[#f6d365] hover:bg-white/[0.12] hover:border-white/25 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5" />
              Random
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {Array.from({ length: playerCount }, (_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setStarterIndex(i)}
                aria-pressed={starterIndex === i}
                className={`aspect-square rounded-xl font-black text-lg sm:text-xl transition-all duration-200 border-2 ${
                  starterIndex === i
                    ? "bg-gradient-to-br from-[#f6d365] to-[#fda085] border-white/30 shadow-lg shadow-[#f6d365]/40 scale-105 text-[#241f12]"
                    : "bg-white/[0.06] border-white/[0.1] hover:border-white/30 hover:bg-white/[0.12] text-white"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>

          {starterIndex !== null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs text-white/60 text-center"
            >
              <span className="font-bold text-[#f6d365]">
                Player {starterIndex + 1}
              </span>{" "}
              describes their word first
            </motion.p>
          )}
        </div>

        {/* Rotation direction */}
        <div className="glass-strong rounded-2xl p-6">
          <p className="text-xs font-bold text-white/50 tracking-widest uppercase mb-4">
            Rotation Direction
          </p>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDirection("clockwise")}
              aria-pressed={direction === "clockwise"}
              className={`rounded-xl p-4 text-left transition-all duration-200 border-2 ${
                direction === "clockwise"
                  ? "bg-gradient-to-br from-[#667eea]/80 to-[#764ba2]/80 border-white/30 shadow-lg shadow-[#667eea]/30"
                  : "bg-white/[0.06] border-white/[0.1] hover:border-white/25 hover:bg-white/[0.12]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <ArrowRight
                  className={`w-4 h-4 ${
                    direction === "clockwise" ? "text-white" : "text-[#667eea]"
                  }`}
                />
                <span className="font-bold text-sm text-white">Clockwise</span>
              </div>
              <p className="text-[11px] text-white/50 leading-snug">
                Next player comes after the starter
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDirection("counterclockwise")}
              aria-pressed={direction === "counterclockwise"}
              className={`rounded-xl p-4 text-left transition-all duration-200 border-2 ${
                direction === "counterclockwise"
                  ? "bg-gradient-to-br from-[#667eea]/80 to-[#764ba2]/80 border-white/30 shadow-lg shadow-[#667eea]/30"
                  : "bg-white/[0.06] border-white/[0.1] hover:border-white/25 hover:bg-white/[0.12]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <ArrowLeft
                  className={`w-4 h-4 ${
                    direction === "counterclockwise"
                      ? "text-white"
                      : "text-[#667eea]"
                  }`}
                />
                <span className="font-bold text-sm text-white">
                  Counterclockwise
                </span>
              </div>
              <p className="text-[11px] text-white/50 leading-snug">
                Next player comes before the starter
              </p>
            </motion.button>
          </div>

          {orderPreview && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-4 border-t border-white/[0.06] text-center"
            >
              <p className="text-xs text-white/50 mb-1.5">
                Speaking order
              </p>
              <p className="text-sm font-bold text-white">
                {orderPreview.map((p, i) => (
                  <span key={p}>
                    {i > 0 && (
                      <span className="text-[#f6d365] mx-1.5">→</span>
                    )}
                    <span className={i === 0 ? "text-[#f6d365]" : ""}>
                      P{p}
                    </span>
                  </span>
                ))}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-8 w-full max-w-[520px]"
      >
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full sm:w-auto sm:px-14 flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e1a] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          <Play className="w-4 h-4 fill-current" />
          Start Round
        </button>
      </motion.div>
    </div>
  );
}