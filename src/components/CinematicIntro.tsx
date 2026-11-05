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
  const silverSweepRef = useRef<HTMLDivElement>(null);
  const lensContainerRef = useRef<HTMLDivElement>(null);
  const lensBezelRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const iridescentGlassRef = useRef<HTMLDivElement>(null);
  const chromeSheenRef = useRef<HTMLDivElement>(null);
  const warmReflectionRef = useRef<HTMLDivElement>(null);
  const textTheRef = useRef<HTMLSpanElement>(null);
  const textSrRef = useRef<HTMLSpanElement>(null);
  const textPicturesRef = useRef<HTMLSpanElement>(null);
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

      // ======================================================================
      // 0. INITIAL STATE SETUP (Pure Obsidian Black #050505)
      // ======================================================================
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
      gsap.set(silverSweepRef.current, {
        opacity: 0,
        scaleX: 0.05,
        force3D: true,
      });
      gsap.set(lensContainerRef.current, {
        opacity: 0,
        scale: 0.93,
        force3D: true,
      });
      gsap.set(lensBezelRef.current, {
        opacity: 0,
        rotation: -18,
        force3D: true,
      });
      gsap.set(iridescentGlassRef.current, {
        opacity: 0,
        rotation: -25,
        force3D: true,
      });
      gsap.set(emblemRef.current, {
        opacity: 0,
        scale: 0.96,
        force3D: true,
      });
      gsap.set(chromeSheenRef.current, {
        xPercent: -140,
        opacity: 0,
        force3D: true,
      });
      gsap.set(warmReflectionRef.current, {
        opacity: 0,
        force3D: true,
      });
      gsap.set(textTheRef.current, {
        opacity: 0,
        letterSpacing: '0.22em',
        y: 8,
        force3D: true,
      });
      gsap.set(textSrRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 8,
        force3D: true,
      });
      gsap.set(textPicturesRef.current, {
        opacity: 0,
        letterSpacing: '0.26em',
        y: 8,
        force3D: true,
      });
      gsap.set(taglineRef.current, {
        opacity: 0,
        y: 6,
        force3D: true,
      });

      // ======================================================================
      // STEP 1 (0.0s - 0.8s) — Complete Blackness & Subtle Optical Reflection
      // ======================================================================
      tl.to(
        ambientGlowRef.current,
        {
          opacity: 0.75,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        },
        0.1
      );

      // ======================================================================
      // STEP 2 (0.6s - 1.5s) — Thin Silver Light Sweep
      // ======================================================================
      tl.to(
        silverSweepRef.current,
        {
          opacity: 0.95,
          scaleX: 1.5,
          duration: 0.55,
          ease: 'power2.out',
        },
        0.65
      );
      tl.to(
        silverSweepRef.current,
        {
          opacity: 0,
          scaleX: 0.8,
          duration: 0.45,
          ease: 'power2.in',
        },
        1.15
      );

      // ======================================================================
      // STEP 3 (1.0s - 2.4s) — Reveal Camera-Lens Structure with Layered Depth
      // ======================================================================
      tl.to(
        lensContainerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: 'power2.out',
        },
        1.05
      );

      // Outer bezel ring rotation & alignment
      tl.to(
        lensBezelRef.current,
        {
          opacity: 0.85,
          rotation: 0,
          duration: 1.4,
          ease: 'power2.out',
        },
        1.05
      );

      // Subtle multi-coated glass optical reflection (rainbow/conic sheen)
      tl.to(
        iridescentGlassRef.current,
        {
          opacity: 0.35,
          rotation: 25,
          duration: 1.6,
          ease: 'power2.out',
        },
        1.15
      );

      // Master logo emblem unrolls from darkness
      tl.to(
        emblemRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.25,
          ease: 'power2.out',
        },
        1.2
      );

      // ======================================================================
      // STEP 4 (1.9s - 3.1s) — Bring Forward SR Monogram with Chrome Light Sweep
      // ======================================================================
      // Specular chrome light sweep glides across the sculptural "SR" monogram
      tl.to(
        chromeSheenRef.current,
        {
          opacity: 0.7,
          xPercent: 140,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        1.9
      );

      // Restrained warm metallic reflection accent (#B38B64)
      tl.to(
        warmReflectionRef.current,
        {
          opacity: 0.45,
          duration: 0.9,
          ease: 'power2.inOut',
        },
        2.0
      );
      tl.to(
        warmReflectionRef.current,
        {
          opacity: 0.15,
          duration: 0.8,
          ease: 'power2.in',
        },
        2.9
      );

      // ======================================================================
      // STEP 5 (2.7s - 3.8s) — Reveal THE and PICTURES with Letter-Spacing
      // ======================================================================
      // THE: Thin, clean uppercase lettering in Platinum silver (#D8D8D5)
      tl.to(
        textTheRef.current,
        {
          opacity: 1,
          letterSpacing: '0.36em',
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
        },
        2.7
      );

      // SR: Sculptural silver monogram brand initial
      tl.to(
        textSrRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
        },
        2.8
      );

      // PICTURES: Widely spaced uppercase sans-serif in Platinum silver (#D8D8D5)
      tl.to(
        textPicturesRef.current,
        {
          opacity: 1,
          letterSpacing: '0.44em',
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
        },
        2.85
      );

      // ======================================================================
      // STEP 6 (3.4s - 4.3s) — Introduce Tagline: EVERY FRAME TELLS A STORY.
      // In secondary Graphite silver (#929493)
      // ======================================================================
      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        3.4
      );

      // Unforgettable final logo composition stillness hold
      tl.to({}, { duration: 0.75 });

      // ======================================================================
      // STEP 7 (4.3s - 5.1s) — Lens-Aperture Transition into Homepage
      // Smooth dark cinematic mask dissolving naturally into the hero section
      // ======================================================================
      tl.to(
        stageContentRef.current,
        {
          opacity: 0,
          scale: 1.03,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '+=0'
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.75,
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
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden max-w-full will-change-[opacity]"
      style={{ backgroundColor: '#050505' }}
      aria-label="The SR Pictures Intro"
      role="dialog"
      aria-modal="true"
    >
      {/* Skip option (Minimal, accessible, unobtrusive) */}
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
          className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[#929493] hover:text-[#D8D8D5] transition-all font-mono text-[9px] sm:text-[10px] tracking-widest uppercase cursor-pointer backdrop-blur-sm"
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
        {/* Optical Center & Camera-Lens Container */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8">
          {/* Subtle Ambient Optical Glow */}
          <div
            ref={ambientGlowRef}
            className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] rounded-full pointer-events-none will-change-[transform,opacity]"
            style={{
              background:
                'radial-gradient(circle, rgba(216, 216, 213, 0.08) 0%, rgba(36, 39, 41, 0.45) 40%, rgba(5, 5, 5, 0) 70%)',
              transform: 'translateZ(0)',
            }}
          />

          {/* Thin Silver Light Sweep Beam (Step 2) */}
          <div
            ref={silverSweepRef}
            className="absolute h-[1.5px] w-[300px] sm:w-[460px] md:w-[560px] max-w-[90vw] pointer-events-none opacity-0 will-change-[transform,opacity]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(242, 241, 235, 0.9) 50%, transparent 100%)',
              boxShadow: '0 0 16px rgba(242, 241, 235, 0.8)',
              transform: 'translateZ(0)',
            }}
          />

          {/* Outer Titanium Lens Barrel Structure */}
          <div
            ref={lensContainerRef}
            className="relative flex items-center justify-center will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Concentric Bezel Ring */}
            <div
              ref={lensBezelRef}
              className="absolute w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border pointer-events-none will-change-[transform,opacity]"
              style={{
                borderColor: 'rgba(146, 148, 147, 0.3)',
                boxShadow:
                  '0 0 35px rgba(216, 216, 213, 0.05), inset 0 0 20px rgba(5, 5, 5, 0.8)',
                transform: 'translateZ(0)',
              }}
            >
              {/* Fine Calibrator Grooves */}
              <div
                className="absolute inset-1 rounded-full border border-dashed pointer-events-none"
                style={{ borderColor: 'rgba(146, 148, 147, 0.15)' }}
              />
            </div>

            {/* Original Master SR PICTURES Camera-Lens Logo Emblem */}
            <div
              className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_35px_rgba(216,216,213,0.08)] border will-change-[transform,opacity]"
              style={{
                borderColor: 'rgba(216, 216, 213, 0.35)',
                backgroundColor: '#050505',
                transform: 'translateZ(0)',
              }}
            >
              {/* Emblem Image Asset */}
              <div ref={emblemRef} className="w-full h-full relative">
                <img
                  src="/assets/sr-pictures-emblem.png"
                  alt="SR Pictures"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                />

                {/* Subtle Rainbow Optical Reflection on Multi-Coated Lens Glass */}
                <div
                  ref={iridescentGlassRef}
                  className="absolute inset-1 rounded-full pointer-events-none opacity-0 mix-blend-screen will-change-[transform,opacity]"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, rgba(56, 189, 248, 0.22) 0deg, rgba(168, 85, 247, 0.16) 90deg, rgba(34, 197, 94, 0.18) 180deg, rgba(179, 139, 100, 0.2) 270deg, rgba(56, 189, 248, 0.22) 360deg)',
                    transform: 'translateZ(0)',
                  }}
                />

                {/* Restrained Warm Metallic Reflection Accent (#B38B64) */}
                <div
                  ref={warmReflectionRef}
                  className="absolute inset-0 rounded-full pointer-events-none opacity-0 mix-blend-color-dodge"
                  style={{
                    background:
                      'radial-gradient(circle at 75% 25%, rgba(179, 139, 100, 0.35) 0%, transparent 55%)',
                  }}
                />

                {/* Dramatic Chrome Specular Sheen across Sculptural SR Monogram */}
                <div
                  ref={chromeSheenRef}
                  className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#F2F1EB]/55 to-transparent -skew-x-25 pointer-events-none mix-blend-overlay will-change-transform"
                  style={{ transform: 'translateZ(0)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Recognition Typography (Thin, Clean, Uppercase based on Logo) */}
        <div className="flex flex-col items-center justify-center max-w-full px-2 text-center font-logo-clean">
          {/* Brand Name */}
          <h1 className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 text-lg sm:text-2xl md:text-3xl uppercase font-light">
            {/* THE: Thin clean uppercase lettering in Platinum silver */}
            <span
              ref={textTheRef}
              className="text-[#D8D8D5] font-extralight text-[0.85em] will-change-[transform,opacity]"
              style={{ letterSpacing: '0.36em' }}
            >
              THE
            </span>

            {/* SR: Custom Sculptural Monogram Initial in Cool Metallic White & Platinum */}
            <span
              ref={textSrRef}
              className="text-silver-monogram font-normal tracking-[0.2em] drop-shadow-[0_2px_12px_rgba(242,241,235,0.25)] will-change-[transform,opacity]"
            >
              SR
            </span>

            {/* PICTURES: Widely spaced uppercase sans-serif in Platinum silver */}
            <span
              ref={textPicturesRef}
              className="text-[#D8D8D5] font-light will-change-[transform,opacity]"
              style={{ letterSpacing: '0.44em' }}
            >
              PICTURES
            </span>
          </h1>

          {/* Tagline: EVERY FRAME TELLS A STORY. In Graphite silver (#929493) */}
          <div
            ref={taglineRef}
            className="mt-3 sm:mt-3.5 flex items-center justify-center gap-2.5 sm:gap-3 text-[9px] sm:text-[11px] font-light uppercase text-[#929493] max-w-[92vw] text-center will-change-[transform,opacity]"
            style={{
              letterSpacing: '0.32em',
              transform: 'translateZ(0)',
            }}
          >
            <span
              className="w-1 h-1 rounded-full inline-block"
              style={{
                backgroundColor: '#D8D8D5',
                boxShadow: '0 0 6px rgba(216, 216, 213, 0.6)',
              }}
            />
            <span className="whitespace-nowrap">EVERY FRAME TELLS A STORY.</span>
            <span
              className="w-1 h-1 rounded-full inline-block"
              style={{
                backgroundColor: '#D8D8D5',
                boxShadow: '0 0 6px rgba(216, 216, 213, 0.6)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
