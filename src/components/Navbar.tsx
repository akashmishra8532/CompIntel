"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Salaries", href: "/salaries" },
    { name: "Compare", href: "/compare" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mb-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tight group">
              <div className="bg-white/10 p-1.5 md:p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CompIntel</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-semibold transition-colors ${
                    pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <Link 
              href="/add" 
              className="relative inline-flex h-10 md:h-11 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-black"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#bc13fe_0%,#00f3ff_50%,#bc13fe_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-black px-4 md:px-6 py-1.5 text-sm md:text-base font-bold text-white backdrop-blur-3xl transition-colors hover:bg-black/80 whitespace-nowrap">
                Submit Data
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
