import React from 'react';
import { motion } from 'framer-motion';

export interface ApertureLoaderProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

export default function ApertureLoader({
  label = 'Loading Gallery',
  size = 'md',
  fullScreen = false,
  className = '',
}: ApertureLoaderProps) {
  const sizeMap = {
    sm: { container: 'w-10 h-10', ring: 'w-8 h-8', dot: 'w-1.5 h-1.5' },
    md: { container: 'w-14 h-14', ring: 'w-11 h-11', dot: 'w-2 h-2' },
    lg: { container: 'w-20 h-20', ring: 'w-16 h-16', dot: 'w-2.5 h-2.5' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`flex flex-col items-center justify-center select-none pointer-events-none ${
        fullScreen
          ? 'fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md min-h-screen'
          : 'relative py-8'
      } ${className}`}
      aria-label={label}
      role="status"
    >
      {/* Cinematic Aperture Mechanism */}
      <div className={`relative flex items-center justify-center ${currentSize.container}`}>
        {/* Soft Ambient Radial Pulse */}
        <motion.div
          animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-neutral-300/10 to-transparent blur-sm"
        />

        {/* Outer Optical Ring with subtle glow */}
        <div
          className={`absolute inset-0 rounded-full border border-white/15 ${currentSize.container}`}
          style={{
            boxShadow: '0 0 20px rgba(216, 216, 213, 0.12), inset 0 0 10px rgba(255, 255, 255, 0.04)',
          }}
        />

        {/* Counter-Clockwise Outer Subtle Notched Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 rounded-full border border-dashed border-white/20"
        />

        {/* Clockwise Smooth Aperture Blade Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className={`rounded-full border-2 border-transparent border-t-[#F2F1EB] border-r-[#D8D8D5]/60 ${currentSize.ring}`}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(242, 241, 235, 0.4))',
          }}
        />

        {/* Central Core Optical Eye / Lens Dot */}
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute rounded-full bg-[#F2F1EB] shadow-[0_0_10px_rgba(242,241,235,0.7)] ${currentSize.dot}`}
        />
      </div>

      {/* Refined Brand Label */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 flex items-center gap-2 text-center"
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#929493]">
            {label}
          </span>
          <span className="inline-flex gap-1">
            <span className="w-1 h-1 rounded-full bg-[#929493] animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 rounded-full bg-[#929493] animate-pulse" style={{ animationDelay: '200ms' }} />
            <span className="w-1 h-1 rounded-full bg-[#929493] animate-pulse" style={{ animationDelay: '400ms' }} />
          </span>
        </motion.div>
      )}
    </div>
  );
}

