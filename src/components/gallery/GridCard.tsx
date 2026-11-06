import React, { useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hover-only playback: eliminates 8+ concurrent decoder pipelines.
  // Videos stay paused at poster frame until the user mouses over.
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={(e) => {
        if (onClick) onClick(e);
        onOpenLightbox(data);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // will-change-transform promotes this element to its own GPU compositing layer,
      // preventing video decoding from causing layout jank in adjacent elements.
      className="relative w-full aspect-[9/15] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-neutral-950 border border-white/10 hover:border-amber-400/50 transition-colors duration-300 cursor-pointer shadow-lg group select-none will-change-transform"
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
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={data.src}
            alt={data.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 2. Dark Gradient Overlay — fades in on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* 3. Play Button — visible at rest, hides on hover when video is playing */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.8 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center shadow-xl">
          <Play size={18} className="ml-0.5 fill-white" />
        </div>
      </motion.div>

      {/* 4. Bottom Info Pill — appears on hover */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <span className="text-[11px] font-mono text-neutral-200 bg-neutral-900/90 px-2.5 py-1 rounded-full border border-white/15 truncate max-w-[75%]">
          {data.category || 'Reel'}
        </span>
        <span className="text-[10px] font-mono text-amber-400 bg-neutral-900/90 px-2 py-1 rounded-full border border-white/15">
          4K
        </span>
      </div>
    </motion.div>
  );
}
