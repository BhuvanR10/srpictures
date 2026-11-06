import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import GridCard, { type GridCardData } from './GridCard';
import { ALL_DRIVE_VIDEOS } from './driveVideos';
import ApertureLoader from '../ApertureLoader';

const DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1hYNyWCCkXjLcJmaMT8-mHCOU9c68-jaI';

export default function VybnParallaxGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxData, setLightboxData] = useState<GridCardData | null>(null);

  // Smooth Inertia-Damped Parallax on Scroll Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120, // Snappier response reduces animation calculation time
    damping: 32,
    restDelta: 0.005, // Wider rest threshold stops micro-jitter updates at scroll end
  });

  // Alternating Column Parallax Transforms (4 Columns)
  const yCol0 = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const yCol1 = useTransform(smoothProgress, [0, 1], [60, -60]);
  const yCol2 = useTransform(smoothProgress, [0, 1], [-65, 65]);
  const yCol3 = useTransform(smoothProgress, [0, 1], [55, -55]);

  // Distribute 12 real Google Drive master videos across 4 columns x 3 rows to reduce GPU/decoding load
  const displayVideos = ALL_DRIVE_VIDEOS.slice(0, 12);
  const col0 = displayVideos.slice(0, 3);
  const col1 = displayVideos.slice(3, 6);
  const col2 = displayVideos.slice(6, 9);
  const col3 = displayVideos.slice(9, 12);

  // Lightbox Navigation Functions
  const handleNextVideo = () => {
    if (!lightboxData) return;
    const curIdx = displayVideos.findIndex((v) => v.id === lightboxData.id);
    const nextIdx = (curIdx + 1) % displayVideos.length;
    setLightboxData(displayVideos[nextIdx]);
  };

  const handlePrevVideo = () => {
    if (!lightboxData) return;
    const curIdx = displayVideos.findIndex((v) => v.id === lightboxData.id);
    const prevIdx = (curIdx - 1 + displayVideos.length) % displayVideos.length;
    setLightboxData(displayVideos[prevIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === 'Escape') setLightboxData(null);
      if (e.key === 'ArrowRight') handleNextVideo();
      if (e.key === 'ArrowLeft') handlePrevVideo();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData]);

  return (
    <div className="w-full relative select-none py-2 overflow-hidden">
      {/* ── 4-COLUMN x 3-ROW FLUID FRAMER MOTION PARALLAX GRID (REDUCED LOAD) ── */}
      <div
        ref={containerRef}
        className="relative grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 p-2 md:p-4 bg-black rounded-3xl overflow-hidden min-h-[640px]"
      >
        {/* Column 0 */}
        <motion.div style={{ y: yCol0 }} className="flex flex-col gap-3 md:gap-5 will-change-transform">
          {col0.map((item) => (
            <GridCard key={item.id} data={item} onOpenLightbox={setLightboxData} />
          ))}
        </motion.div>

        {/* Column 1 */}
        <motion.div style={{ y: yCol1 }} className="flex flex-col gap-3 md:gap-5 will-change-transform">
          {col1.map((item) => (
            <GridCard key={item.id} data={item} onOpenLightbox={setLightboxData} />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: yCol2 }} className="flex flex-col gap-3 md:gap-5 will-change-transform">
          {col2.map((item) => (
            <GridCard key={item.id} data={item} onOpenLightbox={setLightboxData} />
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: yCol3 }} className="flex flex-col gap-3 md:gap-5 will-change-transform">
          {col3.map((item) => (
            <GridCard key={item.id} data={item} onOpenLightbox={setLightboxData} />
          ))}
        </motion.div>
      </div>

      {/* ── FULLSCREEN CINEMATIC LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxData(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Lightbox Header */}
            <div
              className="flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-amber-300 font-mono text-xs uppercase tracking-wider">
                  {lightboxData.category || 'Reel'}
                </span>
                <span className="text-neutral-400 font-mono text-xs hidden sm:inline">
                  Google Drive 4K Master
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center cursor-pointer border border-white/20"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Center Video Viewport with Framer Motion Spring Zoom */}
            <div
              className="relative flex-1 flex items-center justify-center my-auto w-full max-h-[78vh] px-2 sm:px-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Video Button */}
              <button
                type="button"
                onClick={handlePrevVideo}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                aria-label="Previous video"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Video Buffering Placeholder Loader */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                <ApertureLoader label="Buffering 4K Master..." size="md" />
              </div>

              {/* Instant Native HD Video Player */}
              <motion.video
                key={lightboxData.id}
                src={lightboxData.src}
                poster={lightboxData.poster}
                autoPlay
                controls
                loop
                playsInline
                preload="metadata"
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="max-h-[75vh] max-w-[85vw] rounded-2xl border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.95)] object-contain bg-black"
              />

              {/* Next Video Button */}
              <button
                type="button"
                onClick={handleNextVideo}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                aria-label="Next video"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Info Bar with Direct Google Drive Master Video Link */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                  {lightboxData.title}
                </h2>
                <p className="text-xs text-neutral-400 font-mono">
                  {lightboxData.specs || 'Original 4K Master Video'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={
                    lightboxData.driveId
                      ? `https://drive.google.com/file/d/${lightboxData.driveId}/view`
                      : DRIVE_FOLDER_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg font-mono"
                >
                  <span>Open in Drive</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
