"use client";

import { motion } from "framer-motion";
import { CircleHelp, Clock, Trophy, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RoundSummaryProps {
  spyPlayer: string;
  spyWord: string;
  spyColor: string;
  onNextRound: () => void;
  onEndGame: () => void;
}

export function RoundSummary({
  spyPlayer,
  spyWord,
  spyColor,
  onNextRound,
  onEndGame,
}: RoundSummaryProps) {
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
        Round Summary
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="w-full max-w-[500px] space-y-6"
      >
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <CircleHelp className="w-8 h-8 text-[#feca57] mx-auto" />
            <h3 className="text-lg font-bold text-[#feca57]">Who was the spy?</h3>

            <div
              className="p-6 rounded-2xl shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${spyColor})`,
              }}
            >
              <p className="text-2xl font-black mb-2">{spyPlayer}</p>
              <p className="text-sm text-white/80">
                had the word:{" "}
                <span className="font-bold text-[#feca57]">&quot;{spyWord}&quot;</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-around">
              <div className="text-center">
                <Clock className="w-6 h-6 text-[#feca57] mx-auto mb-2" />
                <p className="text-sm text-white/60">Time taken</p>
                <p className="text-lg font-bold text-[#feca57]">0:00</p>
              </div>
              <div className="text-center">
                <Trophy className="w-6 h-6 text-[#1dd1a1] mx-auto mb-2" />
                <p className="text-sm text-white/60">Points earned</p>
                <p className="text-lg font-bold text-[#1dd1a1]">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-[400px]"
      >
        <Button variant="secondary" size="lg" onClick={onNextRound} className="gap-2 flex-1">
          Next Round
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="lg" onClick={onEndGame} className="gap-2 flex-1">
          <Home className="w-4 h-4" />
          End Game
        </Button>
      </motion.div>
    </motion.div>
  );
}
