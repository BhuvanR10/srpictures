import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ExternalLink } from 'lucide-react';

interface AboutVideoCardProps {
  src: string;
  poster: string;
  title?: string;
  category?: string;
  specs?: string;
  driveId?: string;
}

export default function AboutVideoCard({
  src,
  poster,
  title,
  category,
  specs = '4K Master • 60 FPS • Cine Color',
  driveId,
}: AboutVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const openLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div
        className="group relative w-full aspect-[9/16] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-neutral-950 border border-white/10 hover:border-white/25 transition-transform duration-300 ease-out hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.85)] cursor-pointer select-none"
        onClick={togglePlay}
        onMouseEnter={() => {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }}
        onMouseLeave={() => {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }}
      >
        {/* Background Native Video Stream */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted={isMuted}
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />

        {/* Ambient Film Vignette - Subtle luxury edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Top Floating Controls */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10 pointer-events-auto">
          {/* Audio Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-neutral-900/90 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-lg"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Expand Lightbox */}
          <button
            type="button"
            onClick={openLightbox}
            className="w-8 h-8 rounded-full bg-neutral-900/90 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-lg"
            aria-label="Expand video fullscreen"
          >
            <Maximize2 size={13} />
          </button>
        </div>

        {/* Center Play / Pause Indicator */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-200 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-black/80 border border-white/25 text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
            <Play size={20} className="ml-0.5 fill-white text-white" />
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-2xl z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Video Container */}
            <div
              className="relative max-h-[82vh] w-auto aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.98)] bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={src}
                poster={poster}
                autoPlay
                controls
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Bottom Modal Metadata & Drive Link */}
            <div
              className="mt-4 flex items-center justify-between gap-4 w-full max-w-sm sm:max-w-md px-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {title && (
                  <h2 className="text-white font-medium text-sm sm:text-base tracking-wide">
                    {title}
                  </h2>
                )}
                <p className="text-[11px] font-mono text-neutral-400">
                  {specs}
                </p>
              </div>

              {driveId && (
                <a
                  href={`https://drive.google.com/file/d/${driveId}/view?usp=sharing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Drive</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

