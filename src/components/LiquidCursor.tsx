"use client";

import { useEffect, useRef, useState } from "react";

export default function LiquidCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Disable on mobile/touch devices
    if (window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window) {
      return;
    }

    // Positions for the large glowing blob (slow follow)
    let blobX = window.innerWidth / 2;
    let blobY = window.innerHeight / 2;
    
    // Positions for the sharp core dot (fast follow)
    let coreX = window.innerWidth / 2;
    let coreY = window.innerHeight / 2;
    
    // Target mouse position
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    // Linear interpolation speeds (lower = slower/smoother)
    const blobEase = 0.05;
    const coreEase = 0.25;

    let animationFrameId: number;

    const animate = () => {
      // Lerp (Linear Interpolation) math
      blobX += (targetX - blobX) * blobEase;
      blobY += (targetY - blobY) * blobEase;
      
      coreX += (targetX - coreX) * coreEase;
      coreY += (targetY - coreY) * coreEase;

      // Use translate3d to force hardware acceleration (GPU)
      if (blobRef.current) {
        // 150px offset to center the 300px wide blob
        blobRef.current.style.transform = `translate3d(${blobX - 150}px, ${blobY - 150}px, 0)`;
      }

      if (coreRef.current) {
        // 8px offset to center the 16px wide core
        coreRef.current.style.transform = `translate3d(${coreX - 8}px, ${coreY - 8}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Start animation loop
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none hidden md:block">
      {/* The large, slow-moving blurred background blob (Linear style) */}
      <div
        ref={blobRef}
        className="fixed top-0 left-0 z-0 w-[300px] h-[300px] rounded-full blur-[80px] opacity-40 mix-blend-screen"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, #bc13fe 0deg, #00f3ff 180deg, #bc13fe 360deg)",
          willChange: "transform", // Informs browser to optimize for transform changes
        }}
      />
      
      {/* The fast-moving sharp core dot */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full shadow-[0_0_15px_#00f3ff] border-2 border-white/50"
        style={{
          background: "#00f3ff",
          willChange: "transform",
        }}
      />
    </div>
  );
}
