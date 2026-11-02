import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { reducedMotion } from '../lib/motion';

export default function CinematicIntro() {
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<SVGSVGElement>(null);

  // Check whether to show the intro
  useEffect(() => {
    // If reduced motion is preferred, skip intro automatically
    if (reducedMotion()) {
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      return;
    }

    const hasSeen = sessionStorage.getItem('sr_cinema_intro_seen');
    if (!hasSeen) {
      setActive(true);
    } else {
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
    }

    // Allow replaying anytime via custom event
    const handleReplay = () => {
      setActive(true);
      setPercent(0);
    };

    window.addEventListener('replay-sr-intro', handleReplay);
    return () => window.removeEventListener('replay-sr-intro', handleReplay);
  }, []);

  useEffect(() => {
    if (!active) return;

    // Prevent background scrolling while intro is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };

      // Aperture slow rotation
      if (apertureRef.current) {
        gsap.to(apertureRef.current, {
          rotation: 180,
          duration: 2.2,
          ease: 'power2.out',
        });
      }

      // Initial fade-in of center content
      if (centerContentRef.current) {
        gsap.fromTo(
          centerContentRef.current,
          { opacity: 0, scale: 0.94, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      // Progress bar and numeric counter timeline
      const tl = gsap.timeline({
        onComplete: () => {
          finishIntro();
        },
      });

      tl.to(counterObj, {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentVal = Math.round(counterObj.val);
          setPercent(currentVal);
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${currentVal}%`;
          }
        },
      });

      // Quick flash highlight before shutter release
      tl.to(
        centerContentRef.current,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.35,
          ease: 'power2.in',
        },
        '+=0.1'
      );

      // Shutter curtain split exit
      tl.to(
        topCurtainRef.current,
        {
          yPercent: -101,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '-=0.05'
      );

      tl.to(
        bottomCurtainRef.current,
        {
          yPercent: 101,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '<'
      );
    }, containerRef);

    const finishIntro = () => {
      sessionStorage.setItem('sr_cinema_intro_seen', 'true');
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      setTimeout(() => {
        setActive(false);
      }, 950);
    };

    // Keyboard shortcut (Escape to skip)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
      aria-label="The SR Pictures Cinematic Intro"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Half Shutter Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#060606] border-b border-white/[0.08] shadow-2xl flex flex-col justify-between p-6 sm:p-10 z-10"
      >
        {/* Top Camera HUD */}
        <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px] sm:text-xs tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-white font-semibold">REC ● 4K RAW</span>
            <span className="hidden sm:inline text-neutral-600">│</span>
            <span className="hidden sm:inline text-neutral-400">SR-2026 ARCHIVE</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('sr_cinema_intro_seen', 'true');
              document.body.style.overflow = '';
              window.dispatchEvent(new CustomEvent('sr-intro-complete'));
              setActive(false);
            }}
            className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 text-neutral-300 hover:text-white transition-all text-[10px] tracking-wider"
          >
            SKIP [ESC] ✕
          </button>
        </div>
      </div>

      {/* Bottom Half Shutter Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060606] border-t border-white/[0.08] shadow-2xl flex flex-col justify-end p-6 sm:p-10 z-10"
      >
        {/* Bottom Shutter Information & Progress */}
        <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">FORMAT:</span>
              <span className="text-neutral-200">2.39:1 ANAMORPHIC</span>
              <span className="text-neutral-600 hidden sm:inline">│</span>
              <span className="hidden sm:inline text-neutral-400">24.000 FPS</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-amber-400 text-sm sm:text-base">
              <span>{String(percent).padStart(3, '0')}</span>
              <span className="text-[10px] text-amber-400/80">%</span>
            </div>
          </div>

          {/* Hairline Progress Bar */}
          <div className="w-full h-[2px] bg-white/[0.08] rounded-full overflow-hidden relative">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-white shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>

          <div className="text-center font-mono text-[9px] sm:text-[10px] text-neutral-500 tracking-widest uppercase pt-1">
            BENGALURU • KARNATAKA • WORLDWIDE
          </div>
        </div>
      </div>

      {/* Center Stage: Aperture & Studio Identity */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-6 text-center"
      >
        {/* Rotating Aperture Iris Icon */}
        <div className="mb-5 sm:mb-6 relative">
          <svg
            ref={apertureRef}
            viewBox="0 0 100 100"
            className="w-16 h-16 sm:w-20 sm:h-20 text-neutral-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="42" stroke="rgba(245,158,11,0.3)" strokeDasharray="2 4" strokeWidth="1" />
            {/* 8 Cinematic Aperture Blades */}
            <path d="M50 8 L72 38" stroke="currentColor" strokeLinecap="round" />
            <path d="M79 21 L85 58" stroke="currentColor" strokeLinecap="round" />
            <path d="M92 50 L68 76" stroke="currentColor" strokeLinecap="round" />
            <path d="M79 79 L42 85" stroke="currentColor" strokeLinecap="round" />
            <path d="M50 92 L28 62" stroke="currentColor" strokeLinecap="round" />
            <path d="M21 79 L15 42" stroke="currentColor" strokeLinecap="round" />
            <path d="M8 50 L32 24" stroke="currentColor" strokeLinecap="round" />
            <path d="M21 21 L58 15" stroke="currentColor" strokeLinecap="round" />
            {/* Center optical core */}
            <circle cx="50" cy="50" r="14" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(0,0,0,0.6)" />
            <circle cx="50" cy="50" r="4" fill="#f59e0b" />
          </svg>
        </div>

        {/* Brand Typographic Reveal */}
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber-400 mb-2 font-medium">
          CINEMATIC STUDIO &amp; ARCHIVE
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] uppercase text-white font-sans drop-shadow-2xl">
          THE SR PICTURES
        </h1>
        <div className="mt-3 text-xs sm:text-sm text-neutral-400 font-sans tracking-wide max-w-md">
          Bengaluru’s Premier Wedding Cinematography &amp; Fine Art Studio
        </div>
      </div>
    </div>
  );
}

