import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { reducedMotion } from '../lib/motion';

const shouldPlayIntro = () => {
  if (typeof window === 'undefined') return false;
  if (reducedMotion()) return false;
  return !sessionStorage.getItem('sr_cinema_intro_seen');
};

if (typeof window !== 'undefined' && shouldPlayIntro()) {
  (window as any).__sr_intro_running = true;
}

export default function CinematicIntro() {
  const [active, setActive] = useState(shouldPlayIntro);

  const containerRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const stageContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) {
      (window as any).__sr_intro_running = false;
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      setActive(false);
      return;
    }

    const hasSeen = sessionStorage.getItem('sr_cinema_intro_seen');
    if (hasSeen) {
      (window as any).__sr_intro_running = false;
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      setActive(false);
    } else {
      (window as any).__sr_intro_running = true;
      setActive(true);
    }

    const handleReplay = () => {
      sessionStorage.removeItem('sr_cinema_intro_seen');
      (window as any).__sr_intro_running = true;
      setActive(true);
    };

    window.addEventListener('replay-sr-intro', handleReplay);
    return () => window.removeEventListener('replay-sr-intro', handleReplay);
  }, []);

  useEffect(() => {
    if (!active) return;

    document.body.style.overflow = 'hidden';

    const finishIntro = () => {
      sessionStorage.setItem('sr_cinema_intro_seen', 'true');
      (window as any).__sr_intro_running = false;
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      setActive(false);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          finishIntro();
        },
      });

      // ----------------------------------------------------------------------
      // SCENE 01 — COMPLETE DARKNESS & INITIAL STATE (0.0s)
      // ----------------------------------------------------------------------
      gsap.set(containerRef.current, {
        opacity: 1,
      });
      gsap.set(stageContentRef.current, {
        opacity: 1,
        scale: 1,
        force3D: true,
      });
      gsap.set(ambientGlowRef.current, {
        opacity: 0,
        scale: 0.65,
        force3D: true,
      });
      gsap.set(emblemRef.current, {
        opacity: 0,
        scale: 0.94,
        force3D: true,
      });
      gsap.set(sheenRef.current, {
        xPercent: -140,
        opacity: 0,
        force3D: true,
      });
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 10,
        force3D: true,
      });
      gsap.set(taglineRef.current, {
        opacity: 0,
        y: 6,
        force3D: true,
      });

      // ----------------------------------------------------------------------
      // SCENE 01 (cont.) — SUBTLE AMBIENT LIGHTING EMERGES (0.15s - 0.95s)
      // Extremely soft light gradually emerges from the center, creating anticipation
      // ----------------------------------------------------------------------
      tl.to(
        ambientGlowRef.current,
        {
          opacity: 0.85,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        },
        0.15
      );

      // ----------------------------------------------------------------------
      // SCENE 02 — LOGO REVEAL (0.45s - 1.55s)
      // Reveal the original SR PICTURES logo slowly from darkness
      // Refined opacity and gentle scale (0.94 -> 1.0)
      // ----------------------------------------------------------------------
      tl.to(
        emblemRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        },
        0.45
      );

      // Subtle metallic silver specular sheen gliding across the logo (0.75s - 1.65s)
      tl.to(
        sheenRef.current,
        {
          opacity: 0.65,
          xPercent: 140,
          duration: 0.9,
          ease: 'power2.inOut',
        },
        0.75
      );

      // ----------------------------------------------------------------------
      // SCENE 03 — BRAND RECOGNITION (1.1s - 2.3s)
      // Hold the revealed logo, introduce brand name with elegant letter spacing,
      // and reveal tagline: EVERY FRAME TELLS A STORY.
      // ----------------------------------------------------------------------
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        },
        1.1
      );

      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        1.3
      );

      // Emotional resonance hold (admiring the refined composition)
      tl.to({}, { duration: 0.8 });

      // ----------------------------------------------------------------------
      // SCENE 04 — TRANSITION INTO WEBSITE (2.3s - 3.1s)
      // Gradually dissolve the intro into the actual homepage.
      // Smooth dark cinematic mask transition; the homepage emerges naturally.
      // ----------------------------------------------------------------------
      tl.to(
        stageContentRef.current,
        {
          opacity: 0,
          scale: 1.02,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        '+=0'
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        '-=0.55'
      );
    }, containerRef);

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
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden bg-black max-w-full will-change-[opacity]"
      aria-label="The SR Pictures Intro"
      role="dialog"
      aria-modal="true"
    >
      {/* Skip option (Accessible, unobtrusive in top corner) */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem('sr_cinema_intro_seen', 'true');
            (window as any).__sr_intro_running = false;
            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('sr-intro-complete'));
            setActive(false);
          }}
          className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-400 hover:text-white transition-all font-mono text-[9px] sm:text-[10px] tracking-widest uppercase cursor-pointer backdrop-blur-sm"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* Center Cinematic Stage Container */}
      <div
        ref={stageContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center select-none max-w-full will-change-[transform,opacity]"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Optical Center & Logo Container */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8">
          {/* Subtle Ambient Lighting: Emerges softly from the centre */}
          <div
            ref={ambientGlowRef}
            className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] rounded-full pointer-events-none will-change-[transform,opacity]"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, rgba(200, 210, 225, 0.03) 40%, rgba(0, 0, 0, 0) 70%)',
              transform: 'translateZ(0)',
            }}
          />

          {/* Original Master SR PICTURES Logo Asset */}
          <div
            ref={emblemRef}
            className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.06)] border border-white/15 bg-black will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            <img
              src="/assets/sr-pictures-emblem.png"
              alt="SR Pictures"
              className="w-full h-full object-contain select-none"
              draggable={false}
            />

            {/* Subtle Metallic Silver Specular Reflection */}
            <div
              ref={sheenRef}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-25 pointer-events-none mix-blend-overlay will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            />
          </div>
        </div>

        {/* Brand Recognition Typography */}
        <div className="flex flex-col items-center justify-center max-w-full px-2 text-center">
          {/* Brand Name */}
          <h1
            ref={titleRef}
            className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 text-lg sm:text-2xl md:text-3xl font-cinema-title font-medium uppercase will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            <span className="text-[#a1a1aa] font-light tracking-[0.25em] text-[0.85em]">
              THE
            </span>
            <span className="font-semibold tracking-[0.2em] text-silver-monogram drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
              SR
            </span>
            <span className="font-medium tracking-[0.24em] text-titanium-logo">
              PICTURES
            </span>
          </h1>

          {/* Exact Brand Tagline */}
          <div
            ref={taglineRef}
            className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-[0.26em] sm:tracking-[0.34em] uppercase text-[#a1a1aa] max-w-[92vw] text-center will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            <span className="w-1 h-1 rounded-full bg-[#d0cec8] inline-block shadow-[0_0_6px_rgba(208,206,200,0.6)]" />
            <span className="whitespace-nowrap">EVERY FRAME TELLS A STORY.</span>
            <span className="w-1 h-1 rounded-full bg-[#d0cec8] inline-block shadow-[0_0_6px_rgba(208,206,200,0.6)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
