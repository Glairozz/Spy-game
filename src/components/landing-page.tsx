"use client";

import { motion } from "framer-motion";
import { Play, Users, BookOpen, Speech, Eye, Sparkles } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const FEATURES = [
  { icon: Users, label: "3-14 Players", desc: "Play with friends" },
  { icon: BookOpen, label: "14 Categories", desc: "Hundreds of words" },
  { icon: Speech, label: "Social Deduction", desc: "Find the spy" },
  { icon: Eye, label: "Secret Words", desc: "Only you can see" },
];

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden p-6">
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #667eea, transparent)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #764ba2, transparent)" }}
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #f093fb, transparent)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 text-center mb-12"
      >
        <motion.div
          className="mb-8 inline-flex"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="text-7xl md:text-8xl">🕵️</div>
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(102,126,234,0.4), transparent)",
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight">
          <span className="text-gradient">Who is the</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f6d365] via-[#fda085] to-[#f093fb] bg-[length:200%_200%] animate-gradient-shift">
            Spy?
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto leading-relaxed">
          A social deduction party game where one player has a different word.
          Can you spot them?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-[500px] mb-10"
      >
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-strong rounded-2xl p-4 text-center group hover:bg-white/[0.1] transition-colors duration-300"
          >
            <feature.icon className="w-5 h-5 mx-auto mb-2 text-[#667eea] group-hover:text-[#f093fb] transition-colors" />
            <p className="text-sm font-bold text-white">{feature.label}</p>
            <p className="text-xs text-white/70">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10"
      >
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-lg shadow-xl shadow-[#667eea]/30 overflow-hidden group cursor-pointer border-none"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            Start Game
            <Play className="w-5 h-5 fill-current" />
          </span>
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-xs text-white/50 z-10"
      >
        Pass the phone to start &bull; Play with friends
      </motion.p>
    </div>
  );
}
