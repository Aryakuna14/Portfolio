import { useMemo } from 'react';
import { motion } from 'motion/react';

export default function DynamicBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0a0f16]">
      
      {/* Base Deep Space / Minimalist Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(circle at 50% 0%, #151d29 0%, #0a0f16 70%, #05080c 100%)",
        }}
      />

      {/* Rolls Royce Starlight Headliner Effect */}
      <div className="absolute inset-0 w-full h-full opacity-80">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle minimalist orb 1 - Top Left */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.03] blur-[120px]"
      />

      {/* Subtle minimalist orb 2 - Bottom Right */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[40vw] rounded-full bg-purple-500/[0.025] blur-[140px]"
      />

      {/* Very faint ambient light through the center */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[25vw] bg-teal-500/[0.015] blur-[120px] rounded-full rotate-[-15deg] mix-blend-screen"
      />
      
      {/* Noise overlay for seamless banding reduction */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

    </div>
  );
}
