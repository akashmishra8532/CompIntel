"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AddSalaryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    level: "",
    location: "",
    experience_years: "",
    base_salary: "",
    bonus: "",
    stock: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        experience_years: Number(formData.experience_years),
        base_salary: Number(formData.base_salary),
        bonus: formData.bonus ? Number(formData.bonus) : 0,
        stock: formData.stock ? Number(formData.stock) : 0,
      };

      const res = await fetch("/api/ingest-salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit");
      }

      router.push("/salaries");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto pt-10"
    >
      <div className="mb-8 md:mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3">Contribute Data</h1>
        <p className="text-gray-400 text-sm md:text-base lg:text-lg">Help the community by sharing your compensation anonymously.</p>
      </div>

      <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
        {/* Decorative corner blur */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-purple/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-cyan/20 blur-[80px] rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="relative z-10">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/50 text-red-400 px-5 py-4 rounded-xl mb-8 text-sm font-medium backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Company *</label>
                <input
                  required
                  name="company"
                  type="text"
                  placeholder="e.g. Google"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Location *</label>
                <input
                  required
                  name="location"
                  type="text"
                  placeholder="e.g. Bangalore"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Role *</label>
                <input
                  required
                  name="role"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Level *</label>
                <input
                  required
                  name="level"
                  type="text"
                  placeholder="e.g. L4, E4, SDE II"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Years of Experience *</label>
              <input
                required
                name="experience_years"
                type="number"
                step="0.5"
                min="0"
                placeholder="e.g. 3"
                value={formData.experience_years}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
              />
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan"></span>
                Compensation Details <span className="text-gray-500 font-normal text-xs md:text-sm ml-2">(INR)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Base Salary *</label>
                  <input
                    required
                    name="base_salary"
                    type="number"
                    min="0"
                    placeholder="2000000"
                    value={formData.base_salary}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Bonus / Variable</label>
                  <input
                    name="bonus"
                    type="number"
                    min="0"
                    placeholder="300000"
                    value={formData.bonus}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 md:mb-2">Stock (RSU)</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="500000"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 text-sm md:text-base text-white focus:ring-2 focus:ring-neon-cyan outline-none transition-all placeholder-gray-600"
                  />
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-400 mt-4 bg-white/5 border border-white/10 p-3 rounded-lg">
                💡 <span className="text-white font-medium">Note:</span> Stock should be the annualized value (e.g. 40L over 4 years = 10L/year).
              </p>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden rounded-xl p-[2px] focus:outline-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#bc13fe_0%,#00f3ff_50%,#bc13fe_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-4 md:px-5 py-3 md:py-4 text-base md:text-lg font-bold text-white backdrop-blur-3xl transition-colors hover:bg-black/60">
                {loading ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : "Submit Securely"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
