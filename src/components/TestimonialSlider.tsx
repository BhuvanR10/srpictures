import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Maximize2,
} from 'lucide-react';
import { testimonials, type TestimonialItem } from '../data/content';
import { isMotionPaused, subscribeMotion } from '../lib/motion';

interface TestimonialSliderProps {
  page?: 'home' | 'pricing';
  withDivider?: boolean;
}

/**
 * High-End Cinematic Reels Horizontal Testimonial Carousel
 * - Horizontal continuous marquee of 9:16 vertical video cards matching reference.
 * - Smooth infinite loop with interactive drag-to-scroll, touch swipe, and wheel scroll.
 * - Tap on any card opens in immersive Fullscreen Cinema Mode.
 * - Dedicated per-card Mute/Unmute buttons with guaranteed event isolation.
 * - Full keyboard navigation (Escape, Left/Right arrows, Spacebar).
 */
export default function TestimonialSlider({
  withDivider = false,
}: TestimonialSliderProps) {
  // Duplicated list (2 sets = 16 cards) provides ~4,800px track for infinite wrapping without overloading GPU decoders
  const displayItems = [...testimonials, ...testimonials];

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [activeCardId, setActiveCardId] = useState<number>(2); // Default active card
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [paused, setPaused] = useState(isMotionPaused());
  const [isManualInteracting, setIsManualInteracting] = useState(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerManualPause = useCallback(() => {
    setIsManualInteracting(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setIsManualInteracting(false);
    }, 4500);
  }, []);

  // Fullscreen Cinema Modal State
  const [fullscreenItem, setFullscreenItem] = useState<TestimonialItem | null>(null);
  const [isFullscreenPlaying, setIsFullscreenPlaying] = useState(true);
  const [isFullscreenMuted, setIsFullscreenMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => subscribeMotion(() => setPaused(isMotionPaused())), []);

  // Section-level visibility observer: pause all videos and scroll loop when section is offscreen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsSectionVisible(inView);
        if (!inView) {
          // Immediately pause all cards to free hardware video decoders
          videoRefs.current.forEach((v) => {
            if (v && !v.paused) v.pause();
          });
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Card-level visibility observer: only cards currently inside or near the viewport decode & play
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isSectionVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxStr = entry.target.getAttribute('data-index');
          if (idxStr === null) return;
          const idx = parseInt(idxStr, 10);
          const video = videoRefs.current[idx];
          if (!video) return;

          if (entry.isIntersecting && !fullscreenItem) {
            const p = video.play();
            if (p !== undefined) p.catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        root: container,
        rootMargin: '0px 100px 0px 100px',
        threshold: 0.05,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [isSectionVisible, fullscreenItem]);

  // Pause all carousel videos when fullscreen modal is active
  useEffect(() => {
    if (fullscreenItem) {
      videoRefs.current.forEach((v) => {
        if (v && !v.paused) v.pause();
      });
    }
  }, [fullscreenItem]);

  // Silky smooth continuous marquee using performance.now() delta-time (framerate independent)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const speed = 42; // Pixels per second: cinematic, steady motion

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const container = scrollRef.current;
      if (
        container &&
        isSectionVisible &&
        !isHovered &&
        !isDraggingRef.current &&
        !isManualInteracting &&
        !paused &&
        !fullscreenItem
      ) {
        const half = container.scrollWidth / 2;

        if (dt > 0 && dt < 0.1) {
          container.scrollLeft += speed * dt;
        }

        // Seamless infinite wrap
        if (container.scrollLeft >= half) {
          container.scrollLeft -= half;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += half;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isSectionVisible, isHovered, isManualInteracting, paused, fullscreenItem]);

  // Center initial scroll position so backward dragging wraps smoothly
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const half = container.scrollWidth / 2;
      if (container.scrollLeft < 10) {
        container.scrollLeft = 50;
      }
    }
  }, []);

  // Handle Drag / Touch Interaction on the Track
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // If the click is on or inside an interactive button, do not initiate dragging
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    const container = scrollRef.current;
    if (!container) return;
    triggerManualPause();
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = container.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      hasMovedRef.current = true;
      scrollRef.current.scrollLeft = dragStartScrollLeftRef.current - dx;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // 1-Click Smooth Arrow Stepping (Next / Previous)
  const handleScrollStep = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    triggerManualPause();

    const card = container.querySelector('[data-index]') as HTMLElement | null;
    const scrollAmount = card ? card.offsetWidth + 20 : 300;

    const half = container.scrollWidth / 2;
    if (direction === 'right' && container.scrollLeft >= half) {
      container.scrollLeft -= half;
    } else if (direction === 'left' && container.scrollLeft <= 20) {
      container.scrollLeft += half;
    }

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Audio Toggle for Individual Card in Carousel
  const toggleCardAudio = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      e.preventDefault();

      const currentVideo = videoRefs.current[index];
      if (!currentVideo) return;

      if (unmutedIndex === index) {
        // Mute this video
        currentVideo.muted = true;
        currentVideo.setAttribute('muted', '');
        setUnmutedIndex(null);
      } else {
        // Mute all other videos in the carousel
        videoRefs.current.forEach((v, i) => {
          if (v) {
            v.muted = true;
            v.setAttribute('muted', '');
          }
        });

        // Unmute and play target video
        currentVideo.muted = false;
        currentVideo.volume = 1.0;
        currentVideo.removeAttribute('muted');
        const p = currentVideo.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
        setUnmutedIndex(index);
        setActiveCardId(displayItems[index]?.id ?? 0);
      }
    },
    [unmutedIndex, displayItems],
  );

  // Open Fullscreen Cinema Mode on Card Tap
  const openFullscreen = (item: TestimonialItem, videoEl?: HTMLVideoElement | null) => {
    // Mute all background cards
    videoRefs.current.forEach((v) => {
      if (v) {
        v.muted = true;
        v.setAttribute('muted', '');
      }
    });
    setUnmutedIndex(null);
    setActiveCardId(item.id);

    setFullscreenItem(item);
    setIsFullscreenPlaying(true);
    setIsFullscreenMuted(false);
    setCurrentTime(0);
    document.body.style.overflow = 'hidden';

    // On iOS Safari mobile, trigger native fullscreen directly on tap gesture
    if (videoEl) {
      try {
        if ((videoEl as any).webkitEnterFullscreen) {
          videoEl.muted = false;
          videoEl.volume = 1.0;
          videoEl.removeAttribute('muted');
          videoEl.play().catch(() => {});
          (videoEl as any).webkitEnterFullscreen();
        }
      } catch {}
    }
  };

  // Card Tap Handler (Triggered on pointer up or click if no drag occurred)
  const handleCardTap = (e: React.MouseEvent | React.PointerEvent, item: TestimonialItem, idx: number) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (hasMovedRef.current) {
      return;
    }
    const vid = videoRefs.current[idx];
    openFullscreen(item, vid);
  };

  const closeFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
    setFullscreenItem(null);
    document.body.style.overflow = '';
  }, []);

  // Navigate between videos within Fullscreen Modal
  const navigateModal = useCallback(
    (direction: 1 | -1) => {
      if (!fullscreenItem) return;
      const currentIndex = testimonials.findIndex((t) => t.id === fullscreenItem.id);
      const nextIndex = (currentIndex + direction + testimonials.length) % testimonials.length;
      const nextItem = testimonials[nextIndex];

      setFullscreenItem(nextItem);
      setActiveCardId(nextItem.id);
      setCurrentTime(0);
      setIsFullscreenPlaying(true);
    },
    [fullscreenItem],
  );

  // Modal Video Play/Pause Toggle
  const toggleModalPlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = fullscreenVideoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play().then(() => setIsFullscreenPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsFullscreenPlaying(false);
    }
  };

  // Modal Video Mute Toggle
  const toggleModalMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = fullscreenVideoRef.current;
    if (!vid) return;

    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    if (!nextMuted) {
      vid.volume = 1.0;
      vid.removeAttribute('muted');
      vid.play().catch(() => {});
    } else {
      vid.setAttribute('muted', '');
    }
    setIsFullscreenMuted(nextMuted);
  };

  // Trigger Device Native Fullscreen Mode
  const triggerNativeFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const target = fullscreenVideoRef.current || modalContainerRef.current;
    if (!target) return;

    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else if (target.requestFullscreen) {
        target.requestFullscreen().catch(() => {});
      } else if ((target as any).webkitRequestFullscreen) {
        (target as any).webkitRequestFullscreen().catch(() => {});
      } else if ((target as any).webkitEnterFullscreen) {
        (target as any).webkitEnterFullscreen();
      }
    } catch (err) {
      console.warn('Native fullscreen trigger error:', err);
    }
  };

  // Keyboard Shortcuts for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenItem) return;

      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        toggleModalPlay();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleModalMute();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        triggerNativeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenItem, closeFullscreen, navigateModal]);

  return (
    <div ref={sectionRef} className="w-full relative py-2 select-none group/carousel">
      {/* Prominent Left Navigation Button (Always visible on mobile & laptop) */}
      <button
        type="button"
        onClick={() => handleScrollStep('left')}
        aria-label="Previous client story"
        className="flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/85 hover:bg-black active:scale-90 border border-white/30 hover:border-white/70 text-white items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prominent Right Navigation Button (Always visible on mobile & laptop) */}
      <button
        type="button"
        onClick={() => handleScrollStep('right')}
        aria-label="Next client story"
        className="flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/85 hover:bg-black active:scale-90 border border-white/30 hover:border-white/70 text-white items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Edge Gradient Fades for Cinema Vignette */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-black via-black/60 to-transparent z-10" />

      {/* Interactive Horizontal Track */}
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-4 sm:gap-5 overflow-x-auto scroll-smooth py-4 px-14 sm:px-20 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: 'pan-x pan-y', willChange: 'scroll-position', transform: 'translateZ(0)', WebkitOverflowScrolling: 'touch' }}
      >
        {displayItems.map((item: TestimonialItem, idx: number) => {
          const isActive = item.id === activeCardId;
          const isCardUnmuted = unmutedIndex === idx;

          return (
            <div
              key={`${item.id}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              data-index={idx}
              onClick={(e) => handleCardTap(e, item, idx)}
              className={`group/card relative shrink-0 w-[210px] sm:w-[250px] md:w-[270px] lg:w-[285px] aspect-[9/16] rounded-2xl sm:rounded-[22px] overflow-hidden bg-[#0c0c0e] transition-transform duration-300 cursor-pointer ${
                isActive
                  ? 'ring-2 ring-[#a3e635] shadow-[0_0_28px_rgba(163,230,53,0.35)] scale-[1.01]'
                  : 'border border-white/10 hover:border-white/30 hover:scale-[1.005]'
              }`}
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Hardware-optimized Loop Video (Plays only when intersecting) */}
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={item.video}
                poster={item.poster}
                loop
                muted={!isCardUnmuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Circular Sound Toggle Button (Bottom-Right, matching reference screenshot) */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleCardAudio(e, idx);
                }}
                aria-label={isCardUnmuted ? `Mute ${item.name} reel` : `Unmute ${item.name} reel`}
                className={`absolute bottom-3.5 right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer active:scale-90 ${
                  isCardUnmuted
                    ? 'bg-[#a3e635] text-black ring-2 ring-[#a3e635]/50 shadow-[0_0_15px_rgba(163,230,53,0.6)]'
                    : 'bg-black/75 hover:bg-black/95 text-white border border-white/25 hover:border-white/50'
                }`}
              >
                {isCardUnmuted ? (
                  <Volume2 className="w-4 h-4 fill-current animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4 text-neutral-200" />
                )}
              </button>
            </div>
          );
        })}
      </div>



      {withDivider && <div className="dividing-line mt-8"></div>}

      {/* ========================================================================= */}
      {/* FULLSCREEN CINEMA REELS MODAL (CLEAN VIDEO ONLY - ZERO TEXT OVERLAYS)    */}
      {/* ========================================================================= */}
      {fullscreenItem && (
        <div
          ref={modalContainerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Video Player"
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 select-none animate-fadeIn"
          onClick={closeFullscreen}
        >
          {/* Top-Right: Close Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
            <button
              type="button"
              onClick={closeFullscreen}
              aria-label="Close fullscreen video"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-transparent transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xl"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Modal Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateModal(-1);
            }}
            aria-label="Previous film"
            className="hidden sm:flex absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Modal Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateModal(1);
            }}
            aria-label="Next film"
            className="hidden sm:flex absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 9:16 Vertical Video Screen - Pure Visuals (Zero Text) */}
          <div
            className="relative h-[92vh] max-h-[92vh] max-w-[95vw] aspect-[9/16] rounded-2xl sm:rounded-[28px] overflow-hidden bg-black shadow-[0_0_80px_rgba(0,0,0,0.95)] ring-1 ring-white/15 group/modalVideo cursor-pointer flex items-center justify-center"
            onClick={() => toggleModalPlay()}
            onDoubleClick={triggerNativeFullscreen}
          >
            <video
              ref={(el) => {
                fullscreenVideoRef.current = el;
                if (el) {
                  el.muted = isFullscreenMuted;
                  if (!isFullscreenMuted) {
                    el.volume = 1.0;
                  }
                }
              }}
              src={fullscreenItem.video}
              poster={fullscreenItem.poster}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
              onTimeUpdate={(e) => {
                const target = e.target as HTMLVideoElement;
                setCurrentTime(target.currentTime);
                if (target.duration) {
                  setDuration(target.duration);
                }
              }}
              onLoadedMetadata={(e) => {
                const target = e.target as HTMLVideoElement;
                setDuration(target.duration);
              }}
            />

            {/* Center Play/Pause Pulsing Icon on Hover or Pause */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none z-20 ${
                !isFullscreenPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover/modalVideo:opacity-100'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/70 border border-white/25 text-white flex items-center justify-center backdrop-blur-md shadow-2xl">
                {!isFullscreenPlaying ? (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                ) : (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                )}
              </div>
            </div>

            {/* Bottom Scrim Bar with Controls (Icon-Only, Zero Text) */}
            <div
              className="absolute inset-x-0 bottom-0 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col gap-2.5 opacity-90 hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrubbing Progress Bar */}
              <div
                className="w-full h-1.5 bg-white/20 hover:h-2 rounded-full overflow-hidden cursor-pointer relative transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percent = Math.max(0, Math.min(1, clickX / rect.width));
                  if (fullscreenVideoRef.current && duration) {
                    fullscreenVideoRef.current.currentTime = percent * duration;
                  }
                }}
              >
                <div
                  className="h-full bg-[#a3e635] transition-all duration-100"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>

              {/* Control Action Buttons Row */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  {/* Play/Pause Button */}
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    aria-label={isFullscreenPlaying ? 'Pause' : 'Play'}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
                  >
                    {isFullscreenPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Mute/Unmute Button (Icon Only, Zero Text) */}
                  <button
                    type="button"
                    onClick={toggleModalMute}
                    aria-label={isFullscreenMuted ? 'Unmute video' : 'Mute video'}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
                  >
                    {isFullscreenMuted ? (
                      <VolumeX className="w-4 h-4 text-neutral-300" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#a3e635] animate-pulse" />
                    )}
                  </button>
                </div>

                {/* Native Device Fullscreen Mode Toggle */}
                <button
                  type="button"
                  onClick={triggerNativeFullscreen}
                  aria-label="Toggle native fullscreen mode"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
