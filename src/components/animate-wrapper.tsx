"use client";

import { AnimatePresence } from "framer-motion";

export function AnimateWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
