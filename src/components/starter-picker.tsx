"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRandomStarter } from "@/lib/game-engine";

interface StarterPickerProps {
  playerCount: number;
  onPlayAgain: () => void;
}

export function StarterPicker({ playerCount, onPlayAgain }: StarterPickerProps) {
  const starter = useMemo(
    () => getRandomStarter({ playerCount, players: [], category: null, roles: [], spyIndex: -1, currentPlayer: 0, phase: "starter" }),
    [playerCount]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col items-center justify-center p-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-black mb-8 text-center"
      >
        Who Starts?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-[280px] sm:w-[320px] h-[160px] sm:h-[180px] rounded-3xl flex flex-col items-center justify-center bg-gradient-to-br from-[#ffcf65] via-[#ffb347] to-[#ffa030] shadow-2xl shadow-[#feca57]/40 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ transform: "rotate(45deg)", width: "200%", height: "200%" }}
        />
        <motion.span
          className="text-3xl md:text-4xl font-black text-white drop-shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Player {starter}
        </motion.span>
        <span className="text-xs font-bold text-black/50 mt-2 tracking-widest uppercase">
          GOES FIRST
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10"
      >
        <Button size="lg" onClick={onPlayAgain} className="gap-2 text-base px-10">
          <Play className="w-5 h-5" />
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
