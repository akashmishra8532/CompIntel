"use client";

import Link from "next/link";
import { Search, Building, ArrowRightLeft, Table2, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-10 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center max-w-4xl mb-16 relative"
      >
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm text-neon-cyan mb-6 md:mb-8 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>The new standard for compensation data</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 md:mb-6 mt-8 md:mt-12 text-white">
          <span className="opacity-50">Titles mean nothing.</span><br/>
          <span className="neon-text-gradient">Levels mean everything.</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-4">
          Compare real, structured compensation data across top tech companies using standardized levels.
        </p>

        <form action="/salaries" className="relative max-w-2xl mx-auto flex items-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-full flex items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-full p-2">
            <Search className="absolute left-6 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="company"
              placeholder="Search by company (e.g. Google)..."
              className="w-full bg-transparent py-3 md:py-4 pl-12 md:pl-14 pr-4 md:pr-6 text-white placeholder-gray-500 focus:outline-none text-sm md:text-base lg:text-lg"
            />
            <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-bold transition-colors">
              Search
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-12"
      >
        <motion.div variants={itemVariants}>
          <Link href="/salaries" className="block h-full glass-panel glass-panel-hover p-6 md:p-8 rounded-3xl group">
            <div className="bg-white/5 border border-white/10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-neon-cyan/50">
              <Table2 className="w-6 h-6 md:w-7 md:h-7 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Salary Table</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">Explore all compensation data with advanced filtering by role, level, and location.</p>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/company/google" className="block h-full glass-panel glass-panel-hover p-6 md:p-8 rounded-3xl group">
            <div className="bg-white/5 border border-white/10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-neon-purple/50">
              <Building className="w-6 h-6 md:w-7 md:h-7 text-neon-purple drop-shadow-[0_0_8px_rgba(188,19,254,0.5)]" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Company Insights</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">View median compensation and granular level distributions for specific companies.</p>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/compare" className="block h-full glass-panel glass-panel-hover p-6 md:p-8 rounded-3xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-neon-cyan/20 transition-colors duration-500"></div>
            <div className="bg-white/5 border border-white/10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-white/30 relative z-10">
              <ArrowRightLeft className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 relative z-10">1-to-1 Compare</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed relative z-10">Compare two specific salary records side-by-side to understand true differences.</p>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
