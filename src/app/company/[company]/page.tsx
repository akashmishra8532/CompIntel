"use client";

import { useState, useEffect, use } from "react";
import { formatCurrency } from "@/lib/utils";
import { Loader2, TrendingUp, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface CompanyData {
  company: string;
  medianCompensation: number;
  levelDistribution: Record<string, number>;
  salaries: any[];
}

export default function CompanyPage({ params }: { params: Promise<{ company: string }> }) {
  const { company } = use(params);
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/company/${encodeURIComponent(company)}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Company not found");
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [company]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-neon-cyan" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">404 - Not Found</h2>
        <p className="text-gray-400 mb-8">{error || "Something went wrong."}</p>
        <Link href="/salaries" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors font-medium">
          Return to Salaries
        </Link>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 md:mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-neon-cyan blur-xl opacity-20 rounded-2xl md:rounded-3xl"></div>
          <div className="w-16 h-16 md:w-20 md:h-20 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center relative z-10">
            <Building2 className="w-8 h-8 md:w-10 md:h-10 text-neon-cyan" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white capitalize tracking-tight mb-1 md:mb-2">{data.company}</h1>
          <p className="text-base md:text-xl text-neon-purple font-medium">Compensation Insights & Data</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
          <div className="glass-panel rounded-3xl p-6 md:p-8 relative z-10 h-full border-neon-cyan/30">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3 text-neon-cyan">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                <h3 className="text-sm md:text-lg font-bold uppercase tracking-wider">Median Total Comp</h3>
              </div>
            </div>
            <p className="text-4xl md:text-6xl font-black text-white mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              {formatCurrency(data.medianCompensation)}
            </p>
            <p className="text-xs md:text-sm text-gray-400 font-medium">Derived from {data.salaries.length} verified records</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
          <div className="glass-panel rounded-3xl p-6 md:p-8 relative z-10 h-full border-neon-purple/30">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 text-neon-purple">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <h3 className="text-sm md:text-lg font-bold uppercase tracking-wider">Level Distribution</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {Object.entries(data.levelDistribution).map(([level, count]) => (
                <div key={level} className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 md:px-5 py-2 md:py-3 flex items-center justify-between gap-4 md:gap-6 hover:border-neon-purple/50 transition-colors">
                  <span className="font-bold text-white text-base md:text-lg">{level}</span>
                  <span className="bg-neon-purple/20 text-neon-purple font-bold px-2.5 md:px-3 py-1 rounded-lg text-xs md:text-sm">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]"></span>
          Recent Salaries
        </h3>
        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white/5 text-gray-300 uppercase text-[10px] md:text-xs tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Role</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Level</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Location</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold text-right">Exp (Yrs)</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold text-right">Base</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold text-right">Bonus</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold text-right">Stock</th>
                  <th className="px-4 md:px-6 py-4 md:py-5 font-semibold text-right text-neon-cyan">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.salaries.map((s) => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors text-sm md:text-base">
                    <td className="px-4 md:px-6 py-4 md:py-5 text-gray-200 font-medium">{s.role}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5">
                      <span className="bg-white/10 border border-white/10 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold tracking-wide">
                        {s.level}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-gray-400">{s.location}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right text-gray-400 font-medium">{s.experience_years}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right text-gray-300">{formatCurrency(s.base_salary)}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right text-gray-400">{formatCurrency(s.bonus)}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right text-gray-400">{formatCurrency(s.stock)}</td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right font-extrabold text-neon-cyan text-base md:text-lg drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]">
                      {formatCurrency(s.total_compensation)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
