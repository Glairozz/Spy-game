import type { Metadata } from "next";
import "./globals.css";
import { AnimateWrapper } from "@/components/animate-wrapper";

export const metadata: Metadata = {
  title: "Who is the Spy?",
  description: "A social deduction party game. One player has a different word — can you spot them?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <AnimateWrapper>{children}</AnimateWrapper>
      </body>
    </html>
  );
}
