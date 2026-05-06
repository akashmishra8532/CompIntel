"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface Salary {
  id: string;
  company: string;
  role: string;
  level: string;
  location: string;
  experience_years: number;
  total_compensation: number;
  base_salary: number;
  bonus: number;
  stock: number;
  confidence_score: number;
}

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (company) params.append("company", company);
      if (role) params.append("role", role);
      if (level) params.append("level", level);
      if (location) params.append("location", location);

      const res = await fetch(`/api/salaries?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSalaries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSalaries();
    }, 300);
    return () => clearTimeout(debounce);
  }, [company, role, level, location]);

  const tableVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">Salary Database</h1>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg">Explore and filter real compensation data.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-4 md:p-6 mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div>
          <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neon-cyan mb-1.5 md:mb-2">Company</label>
          <input
            type="text"
            placeholder="e.g. Google"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm text-white focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neon-cyan mb-1.5 md:mb-2">Role</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm text-white focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neon-cyan mb-1.5 md:mb-2">Level</label>
          <input
            type="text"
            placeholder="e.g. L4"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm text-white focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neon-cyan mb-1.5 md:mb-2">Location</label>
          <input
            type="text"
            placeholder="e.g. Bangalore"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm text-white focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-white/5 text-gray-300 uppercase text-[10px] md:text-xs tracking-wider border-b border-white/10">
              <tr>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Company</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Role</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Level</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Location</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Exp (Yrs)</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Data Quality</th>
                <th className="px-4 md:px-6 py-4 md:py-5 font-semibold text-right flex justify-end items-center gap-2">
                  Total Comp
                  <ArrowUpDown className="w-3 h-3" />
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-neon-cyan mx-auto mb-4" />
                    <span className="text-gray-400 font-medium tracking-wide">Syncing data...</span>
                  </td>
                </tr>
              </tbody>
            ) : salaries.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-gray-500 text-lg">
                    No matching records found.
                  </td>
                </tr>
              </tbody>
            ) : (
              <motion.tbody 
                variants={tableVariants}
                initial="hidden"
                animate="show"
                className="divide-y divide-white/5"
              >
                {salaries.map((s) => (
                  <motion.tr 
                    variants={rowVariants}
                    key={s.id} 
                    className="hover:bg-white/5 transition-colors group cursor-default text-sm md:text-base"
                  >
                    <td className="px-4 md:px-6 py-4 md:py-5 font-bold text-white capitalize">
                      <Link href={`/company/${s.company}`} className="relative inline-block hover:text-neon-cyan transition-colors">
                        {s.company}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full"></span>
                      </Link>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-gray-300 font-medium">{s.role}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5">
                      <span className="bg-white/10 border border-white/10 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold tracking-wide">
                        {s.level}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-gray-400">{s.location}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-gray-400 font-medium">{s.experience_years}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5">
                      <div className="flex items-center gap-2" title={`Confidence Score: ${s.confidence_score}%`}>
                        <div className="w-12 md:w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full shadow-[0_0_8px_currentColor] ${s.confidence_score >= 85 ? 'bg-neon-cyan text-neon-cyan' : 'bg-neon-purple text-neon-purple'}`}
                            style={{ width: `${Math.min(100, s.confidence_score)}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 hidden sm:inline">{s.confidence_score}%</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right font-extrabold text-neon-cyan text-base md:text-lg drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]">
                      {formatCurrency(s.total_compensation)}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            )}
          </table>
        </div>
      </div>
    </motion.div>
  );
}
