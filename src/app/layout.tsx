import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimateWrapper } from "@/components/animate-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Who is the Spy?",
  description:
    "A social deduction party game. One player has a different word — can you spot them?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh overflow-x-hidden">
        <AnimateWrapper>{children}</AnimateWrapper>
      </body>
    </html>
  );
}
