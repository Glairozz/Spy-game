"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PLAYER_COUNTS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

interface PlayerCountSelectorProps {
  onSelect: (count: number) => void;
}

export function PlayerCountSelector({ onSelect }: PlayerCountSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="text-center mb-10"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-black mb-4 text-gradient"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Who is the Spy?
        </motion.h1>
        <p className="text-lg text-white/60 max-w-md mx-auto">
          One player has a different word. Can you spot them?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Card className="w-full max-w-[600px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 text-[#feca57] text-xl">
              <Users className="w-6 h-6" />
              Choose Number of Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
              {PLAYER_COUNTS.map((count, i) => (
                <motion.button
                  key={count}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.08, y: -4, rotate: [0, 2, -2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(count)}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-2xl font-black shadow-lg shadow-[#667eea]/30 hover:shadow-xl hover:shadow-[#667eea]/50 border-2 border-transparent hover:border-white/30 transition-all duration-300"
                >
                  {count}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
