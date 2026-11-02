import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export interface GridCardData {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  title: string;
  category?: string;
  specs?: string;
  driveId?: string;
}

interface GridCardProps {
  data: GridCardData;
  onOpenLightbox: (data: GridCardData) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export default function GridCard({ data, onOpenLightbox, onClick }: GridCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Viewport-aware playback: auto-play when visible, pause when off-screen
  useEffect(() => {
    if (data.type !== 'video' || !containerRef.current) return;

    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      { rootMargin: '150px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [data.type]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ scale: 1.035, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={(e) => {
        if (onClick) onClick(e);
        onOpenLightbox(data);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[9/15] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-neutral-950 border border-white/10 hover:border-amber-400/50 transition-colors duration-300 cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.85)] group select-none"
    >
      {/* 1. Underlying Video / Media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {data.type === 'video' ? (
          <video
            ref={videoRef}
            src={data.src}
            poster={data.poster}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <img
            src={data.src}
            alt={data.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
      </div>

      {/* 2. Sleek Dark Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* 3. Minimalist Glass Play Button (Appears smoothly on Hover) */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.75 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl">
          <Play size={18} className="ml-0.5 fill-white" />
        </div>
      </motion.div>

      {/* 4. Elegant Bottom Info Pill on Hover */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <span className="text-[11px] font-mono text-neutral-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 truncate max-w-[75%]">
          {data.category || 'Drive Reel'}
        </span>
        <span className="text-[10px] font-mono text-amber-400 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/15">
          4K
        </span>
      </div>
    </motion.div>
  );
}
