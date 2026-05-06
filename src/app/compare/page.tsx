"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Search, ArrowRightLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComparePage() {
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [results1, setResults1] = useState<any[]>([]);
  const [results2, setResults2] = useState<any[]>([]);
  const [selected1, setSelected1] = useState<any>(null);
  const [selected2, setSelected2] = useState<any>(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [comparison, setComparison] = useState<any>(null);
  const [compareLoading, setCompareLoading] = useState(false);

  const searchSalaries = async (query: string, setResults: any, setLoading: any) => {
    if (!query || query.length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/salaries?company=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.slice(0, 5));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    if (!selected1 || !selected2) return;
    setCompareLoading(true);
    try {
      const res = await fetch(`/api/compare?id1=${selected1.id}&id2=${selected2.id}`);
      if (res.ok) {
        const data = await res.json();
        setComparison(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompareLoading(false);
    }
  };

  const renderSelector = (
    num: 1 | 2,
    query: string,
    setQuery: any,
    results: any[],
    setResults: any,
    selected: any,
    setSelected: any,
    loading: boolean
  ) => {
    const accentColor = num === 1 ? "neon-cyan" : "neon-purple";
    const bgClass = num === 1 ? "bg-neon-cyan/20" : "bg-neon-purple/20";
    const borderClass = num === 1 ? "border-neon-cyan/50" : "border-neon-purple/50";
    const textClass = num === 1 ? "text-neon-cyan" : "text-neon-purple";

    return (
      <div className={`glass-panel rounded-3xl p-6 md:p-8 relative border-t-4 border-t-${accentColor} overflow-visible`}>
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
          <span className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-${accentColor} shadow-[0_0_10px_currentColor] ${textClass}`}></span>
          Select Salary {num}
        </h3>
        {selected ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-black/80 backdrop-blur-md border ${borderClass} rounded-2xl p-4 md:p-6 flex justify-between items-start shadow-[0_0_20px_currentColor] ${bgClass}`}
          >
            <div>
              <p className="font-extrabold text-xl md:text-2xl text-white capitalize mb-1">{selected.company}</p>
              <p className="text-sm md:text-base text-gray-300 font-medium mb-2 md:mb-3">{selected.role} • <span className="text-white px-2 py-0.5 rounded bg-white/10 ml-1 text-xs md:text-sm">{selected.level}</span></p>
              <p className={`text-lg md:text-xl font-black ${textClass}`}>{formatCurrency(selected.total_compensation)}</p>
            </div>
            <button 
              onClick={() => { setSelected(null); setComparison(null); }}
              className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg transition-colors"
            >
              Change
            </button>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="relative flex items-center">
              <Search className={`absolute left-3 md:left-4 w-4 h-4 md:w-5 md:h-5 ${textClass} opacity-70`} />
              <input
                type="text"
                placeholder="Search company (e.g. Google)..."
                className={`w-full bg-black/60 border border-white/10 rounded-xl py-3 md:py-4 pl-10 md:pl-12 pr-4 text-sm md:text-base text-white focus:ring-2 focus:ring-${accentColor} outline-none transition-all placeholder-gray-600 font-medium`}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  searchSalaries(e.target.value, setResults, num === 1 ? setLoading1 : setLoading2);
                }}
              />
            </div>
            {loading && <Loader2 className={`absolute right-4 top-4 w-5 h-5 animate-spin ${textClass}`} />}
            
            <AnimatePresence>
              {results.length > 0 && query.length >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-20 w-full mt-3 glass-panel border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                >
                  {results.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSelected(r);
                        setQuery("");
                        setResults([]);
                      }}
                      className="w-full text-left px-5 py-4 hover:bg-white/10 border-b border-white/5 last:border-0 transition-colors group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-white capitalize text-sm md:text-base group-hover:text-white transition-colors">{r.company}</p>
                        <span className={`text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded bg-${accentColor}/10 ${textClass}`}>
                          {r.level}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 font-medium">{r.role} • <span className={textClass}>{formatCurrency(r.total_compensation)}</span></p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 md:mb-4 tracking-tight">Head-to-Head Compare</h1>
        <p className="text-sm md:text-base lg:text-xl text-gray-400 max-w-2xl mx-auto">Select two specific roles to dissect their compensation structure and level differences.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12 relative z-10">
        {renderSelector(1, searchQuery1, setSearchQuery1, results1, setResults1, selected1, setSelected1, loading1)}
        {renderSelector(2, searchQuery2, setSearchQuery2, results2, setResults2, selected2, setSelected2, loading2)}
        
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black border border-white/20 rounded-full items-center justify-center z-20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <ArrowRightLeft className="w-5 h-5 md:w-7 md:h-7 text-white" />
        </div>
      </div>

      <div className="flex justify-center mb-10 md:mb-16">
        <button
          onClick={handleCompare}
          disabled={!selected1 || !selected2 || compareLoading}
          className="relative inline-flex h-12 md:h-14 overflow-hidden rounded-full p-[2px] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group transition-transform hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#bc13fe_0%,#00f3ff_50%,#bc13fe_100%)]" />
          <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black px-6 md:px-10 py-2 md:py-3 text-sm md:text-lg font-bold text-white backdrop-blur-3xl transition-colors group-hover:bg-black/80 gap-2 md:gap-3">
            {compareLoading ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : "Run Comparison"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {comparison && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass-panel rounded-3xl overflow-hidden shadow-2xl relative z-0"
          >
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-white/10 bg-black/40 p-6 md:p-8 items-center relative">
              <div className="absolute top-0 left-0 w-1/3 h-1 bg-neon-cyan"></div>
              <div className="absolute top-0 right-0 w-1/3 h-1 bg-neon-purple"></div>
              
              <div className="text-center relative z-10">
                <p className="text-xl md:text-3xl font-black text-white capitalize tracking-tight mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">{comparison.salary1.company}</p>
                <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-neon-cyan/20 text-neon-cyan rounded-lg text-xs md:text-sm font-bold border border-neon-cyan/30">{comparison.salary1.level}</span>
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
                  <span className="text-xs md:text-sm font-black text-white">VS</span>
                </div>
              </div>
              <div className="text-center relative z-10">
                <p className="text-xl md:text-3xl font-black text-white capitalize tracking-tight mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(188,19,254,0.3)]">{comparison.salary2.company}</p>
                <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-neon-purple/20 text-neon-purple rounded-lg text-xs md:text-sm font-bold border border-neon-purple/30">{comparison.salary2.level}</span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-2">
              <ComparisonRow 
                label="Total Compensation" 
                val1={comparison.salary1.total_compensation} 
                val2={comparison.salary2.total_compensation} 
                diff={comparison.differences.total} 
                isCurrency 
                highlight 
              />
              <ComparisonRow 
                label="Base Salary" 
                val1={comparison.salary1.base_salary} 
                val2={comparison.salary2.base_salary} 
                diff={comparison.differences.base} 
                isCurrency 
              />
              <ComparisonRow 
                label="Bonus (Variable)" 
                val1={comparison.salary1.bonus} 
                val2={comparison.salary2.bonus} 
                diff={comparison.differences.bonus} 
                isCurrency 
              />
              <ComparisonRow 
                label="Stock (RSU)" 
                val1={comparison.salary1.stock} 
                val2={comparison.salary2.stock} 
                diff={comparison.differences.stock} 
                isCurrency 
              />
              
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10 gap-4">
                  <span className="text-sm md:text-lg font-bold text-gray-300 uppercase tracking-wider">Level Match Status</span>
                  <div className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-sm md:text-base font-black tracking-wide border shadow-[0_0_20px_currentColor] ${
                    comparison.differences.level === "Same" 
                      ? "bg-green-500/20 text-green-400 border-green-500/50" 
                      : "bg-orange-500/20 text-orange-400 border-orange-500/50"
                  }`}>
                    {comparison.differences.level === "Same" ? "MATCHED LEVELS" : "DIFFERENT LEVELS"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ComparisonRow({ label, val1, val2, diff, isCurrency, highlight = false }: any) {
  const winner1 = val1 > val2;
  const winner2 = val2 > val1;
  const same = val1 === val2;

  return (
    <div className={`grid grid-cols-3 items-center py-4 md:py-6 border-b border-white/5 last:border-0 rounded-2xl transition-colors hover:bg-white/5 ${highlight ? 'bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-purple/10 border-none' : ''}`}>
      <div className={`text-center text-lg md:text-xl lg:text-2xl ${winner1 ? 'text-white font-black drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 font-medium'}`}>
        {isCurrency ? formatCurrency(val1) : val1}
      </div>
      <div className="text-center">
        <p className={`text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2 ${highlight ? 'text-white' : 'text-gray-400'}`}>{label}</p>
        <div className="inline-flex items-center gap-1 bg-white/10 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-300">
          <span className="text-gray-500">Δ</span> {isCurrency ? formatCurrency(diff) : diff}
        </div>
      </div>
      <div className={`text-center text-lg md:text-xl lg:text-2xl ${winner2 ? 'text-white font-black drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 font-medium'}`}>
        {isCurrency ? formatCurrency(val2) : val2}
      </div>
    </div>
  );
}
