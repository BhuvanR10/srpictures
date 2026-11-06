import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { slideLeft01, slideLeft02, slideRight01, slideRight02, starPath } from '../data/icons';
import { testimonialIds, testimonials, type TestimonialItem } from '../data/content';
import { isMotionPaused, subscribeMotion } from '../lib/motion';

const DELAY = 6000; // autoplay delay
const DURATION = 500; // slide transition

function Arrow({ d, cls }: { d: string; cls: string }) {
  return (
    <div className={`slide-arrow ${cls} w-embed`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d={d}></path>
      </svg>
    </div>
  );
}

/**
 * Editorial Video Testimonial Carousel
 * Mobile layout matching the phone interface design with crisp 4:3 / portrait preview,
 * authentic rating, clean bold typography, and desktop split-card experience.
 */
export default function TestimonialSlider({
  page = 'home',
  withDivider = false,
}: {
  page?: 'home' | 'pricing';
  withDivider?: boolean;
}) {
  const n = testimonials.length;
  const ids = testimonialIds[page] || [];
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(0);
  const [hold, setHold] = useState(false);
  const [paused, setPaused] = useState(isMotionPaused());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const drag = useRef<{ x: number; id: number } | null>(null);

  const stopVideos = useCallback(() => {
    videoRefs.current.forEach((v) => {
      if (v && !v.paused) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      stopVideos();
      setIndex((cur) => {
        setPrev(cur);
        return (cur + dir + n) % n;
      });
    },
    [n, stopVideos],
  );

  useEffect(() => subscribeMotion(() => setPaused(isMotionPaused())), []);

  // Autoplay pauses when user hovers or is watching the client video
  useEffect(() => {
    if (hold || paused || isPlaying) return;
    const t = window.setTimeout(() => go(1), DELAY);
    return () => window.clearTimeout(t);
  }, [index, hold, paused, isPlaying, go]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = videoRefs.current[index];
    if (!vid) return;

    if (vid.paused) {
      vid.muted = isMuted;
      vid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          vid.muted = true;
          setIsMuted(true);
          vid.play().then(() => setIsPlaying(true));
        });
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[index];
    if (!vid) return;
    const next = !isMuted;
    vid.muted = next;
    setIsMuted(next);
  };

  const position = (i: number) => {
    let pos = (i - index + n) % n;
    if (pos > n / 2) pos -= n;
    return pos;
  };

  const prevPosition = (i: number) => {
    let pos = (i - prev + n) % n;
    if (pos > n / 2) pos -= n;
    return pos;
  };

  const onKey = (dir: 1 | -1) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      go(dir);
    }
  };

  return (
    <div className="testimonial-component">
      <div
        className="testimonial-slider w-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
      >
        <div
          className="mask w-slider-mask relative min-h-[620px] sm:min-h-[580px] lg:min-h-[540px]"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse') return;
            drag.current = { x: e.clientX, id: e.pointerId };
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            drag.current = null;
            if (!d) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          aria-live={hold || paused || isPlaying ? 'polite' : 'off'}
        >
          {testimonials.map((t: TestimonialItem, i: number) => {
            const pos = position(i);
            const jump = Math.abs(pos - prevPosition(i)) > 1;
            const [imgId, blockId, contentId] = ids[i] || [];
            const isCurrent = i === index;

            return (
              <div
                key={t.id || t.name}
                className="testimonial-slide w-slide absolute inset-0 w-full h-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={!isCurrent}
                style={{
                  transform: `translateX(${(pos - i) * 100}%)`,
                  transition: jump ? 'none' : `transform ${DURATION}ms cubic-bezier(.25,.1,.25,1)`,
                  visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                  pointerEvents: isCurrent ? 'auto' : 'none',
                }}
              >
                {/* CARD CONTAINER: Dark background with luxury top/left highlight */}
                <div className="testimonial-content-wrap bg-[#141416] border border-white/10 rounded-[28px] p-5 sm:p-7 lg:p-9 shadow-2xl relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    
                    {/* VIDEO CONTAINER: 4:3 / phone crop on mobile, 9:16 portrait on desktop */}
                    <div className="lg:col-span-5 flex justify-center w-full">
                      <div
                        id={imgId}
                        className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[9/16] lg:max-w-[320px] rounded-2xl overflow-hidden select-none bg-neutral-950 border border-white/10 shadow-lg group"
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[i] = el;
                          }}
                          src={t.video}
                          poster={t.poster}
                          preload="metadata"
                          playsInline
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => togglePlay()}
                          onTimeUpdate={(e) => {
                            if (isCurrent) {
                              const target = e.target as HTMLVideoElement;
                              if (target.duration) {
                                setProgress((target.currentTime / target.duration) * 100);
                              }
                            }
                          }}
                          onEnded={() => {
                            setIsPlaying(false);
                            setProgress(0);
                          }}
                        />

                        {/* Top-Left: CLIENT FILM */}
                        <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-200 bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                            {isCurrent && isPlaying ? 'PLAYING' : 'CLIENT FILM'}
                          </span>
                        </div>

                        {/* Top-Right: DURATION */}
                        <div className="absolute top-3.5 right-3.5 pointer-events-none z-10">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-300 bg-black/60 px-2.5 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                            {t.duration}
                          </span>
                        </div>

                        {/* Center: Circular Glass Play Button */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none z-10 ${
                            isCurrent && isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => togglePlay(e)}
                            className="pointer-events-auto w-14 h-14 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 border border-white/20 shadow-xl"
                            aria-label={isCurrent && isPlaying ? 'Pause video' : 'Play video'}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-5 h-5 fill-current" />
                            ) : (
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Bottom: Progress line & Mute toggle */}
                        <div
                          className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 z-10 flex flex-col gap-2 ${
                            isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between px-1">
                            <button
                              type="button"
                              onClick={toggleMute}
                              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/15 backdrop-blur-md transition-colors"
                              aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                              {isMuted ? (
                                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400">
                              {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white transition-all duration-150"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* REVIEW DETAILS & TEXT CONTENT */}
                    <div id={blockId} className="lg:col-span-7 flex flex-col justify-between h-full relative">
                      <div>
                        {/* Rating row: 5.0/5  -  ★★★★★ */}
                        <div className="flex items-center gap-2.5 text-sm sm:text-base mb-4 sm:mb-5">
                          <span className="font-mono text-white font-medium">{t.rating}</span>
                          <span className="text-neutral-500 font-mono text-sm" aria-hidden="true">-</span>
                          <div className="flex items-center gap-1" role="img" aria-label={`Rated ${t.rating}`}>
                            {[0, 1, 2, 3, 4].map((s) => (
                              <div className="w-embed text-white" key={s} aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 fill-white">
                                  <path d={starPath}></path>
                                </svg>
                              </div>
                            ))}
                          </div>
                        </div>

                        {withDivider && <div className="dividing-line mb-5"></div>}

                        {/* Bold quote matching phone interface */}
                        <p className="text-white text-base sm:text-lg md:text-xl font-semibold leading-relaxed tracking-normal">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>

                      {/* Author & Event info with background watermark quote icon */}
                      <div id={contentId} className="mt-6 sm:mt-8 pt-4 border-t border-white/5 relative flex items-end justify-between">
                        <div>
                          <div className="text-white font-medium sm:font-semibold text-base sm:text-lg tracking-wide">
                            {t.name}
                          </div>
                          <div className="text-neutral-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mt-1">
                            {t.role}
                          </div>
                        </div>

                        {/* Subtle watermark quote icon in bottom-right matching screenshot */}
                        <img
                          className="w-14 h-14 sm:w-18 sm:h-18 opacity-[0.08] pointer-events-none select-none"
                          src="/assets/695ffd835d32c9c7b020916d_quote-right-icon-1.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AUTHENTIC PREVIOUS ARROW BUTTON */}
        <div
          className="left-arrow w-slider-arrow-left"
          role="button"
          tabIndex={0}
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          onKeyDown={onKey(-1)}
        >
          <div className="slide-block">
            <div className="slide-arrow-wrap">
              <Arrow d={slideLeft01} cls="left-01" />
              <Arrow d={slideLeft02} cls="left-02" />
            </div>
            <div className="slide-text-wrap" aria-hidden="true">
              <div className="slide-text">Previous</div>
              <div className="slide-text">Previous</div>
            </div>
          </div>
        </div>

        {/* AUTHENTIC NEXT ARROW BUTTON */}
        <div
          className="right-arrow w-slider-arrow-right"
          role="button"
          tabIndex={0}
          aria-label="Next testimonial"
          onClick={() => go(1)}
          onKeyDown={onKey(1)}
        >
          <div className="slide-block">
            <div className="slide-text-wrap" aria-hidden="true">
              <div className="slide-text">Next</div>
              <div className="slide-text">Next</div>
            </div>
            <div className="slide-arrow-wrap">
              <Arrow d={slideRight01} cls="right-01" />
              <Arrow d={slideRight02} cls="right-02" />
            </div>
          </div>
        </div>

        <div className="slide-nav w-slider-nav"></div>
      </div>
    </div>
  );
}
