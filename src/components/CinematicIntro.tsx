import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { reducedMotion } from '../lib/motion';

if (typeof window !== 'undefined' && !reducedMotion()) {
  (window as any).__sr_intro_running = true;
}

export default function CinematicIntro() {
  const [active, setActive] = useState(() => typeof window !== 'undefined' && !reducedMotion());

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const centerStageRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const iridescentGlassRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const flareBeamRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) {
      (window as any).__sr_intro_running = false;
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      setActive(false);
      return;
    }

    // Every reload triggers intro!
    (window as any).__sr_intro_running = true;
    setActive(true);

    const handleReplay = () => {
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

      // ----------------------------------------------------
      // 1. Initial State (100% GPU Accelerated Properties)
      // ----------------------------------------------------
      gsap.set(centerStageRef.current, {
        opacity: 1,
        scale: 1,
        force3D: true,
      });
      gsap.set(emblemRef.current, {
        opacity: 0,
        scale: 0.92,
        force3D: true,
      });
      gsap.set(lensRingRef.current, {
        opacity: 0,
        scale: 0.9,
        rotation: -20,
        force3D: true,
      });
      gsap.set(ambientGlowRef.current, {
        opacity: 0,
        scale: 0.7,
        force3D: true,
      });
      gsap.set(iridescentGlassRef.current, {
        opacity: 0,
        rotation: -30,
        force3D: true,
      });
      gsap.set(flareBeamRef.current, {
        opacity: 0,
        scaleX: 0.2,
        scaleY: 0.5,
        force3D: true,
      });
      gsap.set(sheenRef.current, {
        xPercent: -140,
        opacity: 0,
        force3D: true,
      });
      gsap.set(titleRef.current, {
        y: 14,
        opacity: 0,
        force3D: true,
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 8,
        force3D: true,
      });
      gsap.set([curtainLeftRef.current, curtainRightRef.current], {
        xPercent: 0,
        force3D: true,
      });

      // ----------------------------------------------------
      // 2. Optical Gathering: Silky Smooth Rack Focus (GPU native)
      // ----------------------------------------------------
      // Soft ambient light expands behind the lens
      tl.to(
        ambientGlowRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power2.out',
        },
        0.15
      );

      // Outer focus ring gently dials into alignment
      tl.to(
        lensRingRef.current,
        {
          opacity: 0.85,
          scale: 1,
          rotation: 0,
          duration: 1.6,
          ease: 'power2.out',
        },
        0.15
      );

      // Master Lens Emblem smoothly emerges with optical clarity
      tl.to(
        emblemRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.15
      );

      // ----------------------------------------------------
      // 3. Multi-Coated Glass Iridescent Sheen & Chrome Glint
      // ----------------------------------------------------
      tl.to(
        iridescentGlassRef.current,
        {
          opacity: 0.4,
          rotation: 20,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.35
      );

      // Soft horizontal flare glide
      tl.to(
        flareBeamRef.current,
        {
          opacity: 0.85,
          scaleX: 1.4,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        0.55
      );
      tl.to(
        flareBeamRef.current,
        {
          opacity: 0,
          scaleX: 0.8,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        1.1
      );

      // Specular light sheen glides across the chrome "SR" monogram
      tl.to(
        sheenRef.current,
        {
          opacity: 0.7,
          xPercent: 140,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0.65
      );

      // ----------------------------------------------------
      // 4. Logo Studio Brand Typography Reveal
      // ----------------------------------------------------
      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
        },
        0.85
      );

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        1.05
      );

      // ----------------------------------------------------
      // 5. High-Prestige Hold: 2 FULL SECONDS
      // ----------------------------------------------------
      tl.to({}, { duration: 2.0 });

      // ----------------------------------------------------
      // 6. Buttery Smooth Curtain Reveal (Silky fluid ease)
      // ----------------------------------------------------
      // Center stage gently softens and scales forward
      tl.to(
        centerStageRef.current,
        {
          scale: 1.04,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '+=0'
      );

      // Dual mechanical cinema shutter curtains slide open with pure fluid grace
      tl.to(
        curtainLeftRef.current,
        {
          xPercent: -101,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        '-=0.7'
      );

      tl.to(
        curtainRightRef.current,
        {
          xPercent: 101,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        '<'
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
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden max-w-full bg-[#040404]"
      aria-label="The SR Pictures Intro"
      role="dialog"
      aria-modal="true"
    >
      {/* Left Cinema Shutter Curtain (Hardware Accelerated) */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] border-r border-white/10 shadow-[25px_0_50px_rgba(0,0,0,0.95)] z-20 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Right Cinema Shutter Curtain (Hardware Accelerated) */}
      <div
        ref={curtainRightRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] border-l border-white/10 shadow-[-25px_0_50px_rgba(0,0,0,0.95)] z-20 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Minimalist Viewfinder Crop Brackets */}
      <div className="absolute inset-4 sm:inset-10 pointer-events-none z-25">
        <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-b border-r border-white/20" />
      </div>

      {/* Skip button in top right corner */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            (window as any).__sr_intro_running = false;
            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('sr-intro-complete'));
            setActive(false);
          }}
          className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-neutral-300 hover:text-white transition-all font-mono text-[10px] tracking-widest uppercase cursor-pointer backdrop-blur-md shadow-lg"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* Center Cinematic Stage (GPU Accelerated) */}
      <div
        ref={centerStageRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-25 pointer-events-none px-4 text-center select-none max-w-full will-change-[transform,opacity]"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Optical Camera Lens Container */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8">
          {/* Volumetric Optical Backlight Glow */}
          <div
            ref={ambientGlowRef}
            className="absolute w-64 h-64 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] rounded-full pointer-events-none will-change-[transform,opacity]"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(208, 206, 200, 0.05) 40%, rgba(0, 0, 0, 0) 70%)',
              transform: 'translateZ(0)',
            }}
          />

          {/* Anamorphic Optical Streak Flare */}
          <div
            ref={flareBeamRef}
            className="absolute h-[2px] w-[280px] sm:w-[420px] md:w-[540px] max-w-[90vw] bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent pointer-events-none opacity-0 shadow-[0_0_20px_rgba(226,232,240,0.9)] will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          />

          {/* Outer Lens Barrel Calibration Ring */}
          <div
            ref={lensRingRef}
            className="absolute w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border border-white/20 pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.04)] will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            <div className="absolute inset-1 rounded-full border border-dashed border-white/10" />
          </div>

          {/* The SR Pictures Master Camera Lens Emblem */}
          <div
            ref={emblemRef}
            className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_35px_rgba(255,255,255,0.12)] border border-[#d0cec8]/40 bg-black will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            <img
              src="/assets/sr-pictures-emblem.png"
              alt="The SR Pictures Master Emblem"
              className="w-full h-full object-contain select-none"
              draggable={false}
            />

            {/* Multi-Coated Lens Glass Iridescent Reflection (Matches Logo Rainbow Sheen) */}
            <div
              ref={iridescentGlassRef}
              className="absolute inset-2 rounded-full pointer-events-none opacity-0 mix-blend-screen will-change-[transform,opacity]"
              style={{
                background:
                  'conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,0.25) 0deg, rgba(168,85,247,0.18) 90deg, rgba(34,197,94,0.22) 180deg, rgba(251,191,36,0.18) 270deg, rgba(56,189,248,0.25) 360deg)',
                transform: 'translateZ(0)',
              }}
            />

            {/* Specular Light Sheen Overlay across Chrome Monogram */}
            <div
              ref={sheenRef}
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-25 pointer-events-none mix-blend-overlay will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            />
          </div>
        </div>

        {/* Studio Typography precisely matching the Master Emblem */}
        <div className="flex flex-col items-center justify-center max-w-full px-2 text-center">
          <div className="overflow-visible py-1">
            <h1
              ref={titleRef}
              className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl uppercase font-cinema-title font-medium will-change-[transform,opacity]"
              style={{ transform: 'translateZ(0)' }}
            >
              <span className="text-[#a1a1aa] font-light tracking-[0.25em] text-[0.88em]">
                THE
              </span>
              <span className="font-bold tracking-[0.18em] text-silver-monogram drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                SR
              </span>
              <span className="font-medium tracking-[0.22em] text-titanium-logo">
                PICTURES
              </span>
            </h1>
          </div>

          {/* Subtitle with guaranteed zero overflow on any screen */}
          <div
            ref={subtitleRef}
            className="mt-2.5 sm:mt-3 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 text-[9px] sm:text-[11px] font-mono tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#a1a1aa] max-w-[92vw] text-center will-change-[transform,opacity]"
            style={{ transform: 'translateZ(0)' }}
          >
            <span className="w-1 h-1 rounded-full bg-[#d0cec8] inline-block shadow-[0_0_6px_rgba(208,206,200,0.6)]" />
            <span className="whitespace-nowrap">CINEMATOGRAPHY</span>
            <span className="text-white/30 hidden xs:inline">•</span>
            <span className="whitespace-nowrap">PHOTOGRAPHY</span>
            <span className="text-white/30 hidden xs:inline">•</span>
            <span className="whitespace-nowrap">BENGALURU</span>
            <span className="w-1 h-1 rounded-full bg-[#d0cec8] inline-block shadow-[0_0_6px_rgba(208,206,200,0.6)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
