import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import LiquidCursor from "@/components/LiquidCursor";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "CompIntel | Levels-based compensation insights",
  description: "Comparable, structured, decision-ready compensation data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} antialiased min-h-screen flex flex-col relative cursor-default`}>
        <LiquidCursor />
        <Background />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
