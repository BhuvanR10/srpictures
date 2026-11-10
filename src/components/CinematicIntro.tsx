import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../lib/gsap';
import { reducedMotion } from '../lib/motion';

const isIntroAlreadySeen = () => {
  if (typeof window === 'undefined') return true;
  if (reducedMotion()) return true;
  try {
    return sessionStorage.getItem('sr_intro_seen') === '1';
  } catch {
    return false;
  }
};

if (typeof window !== 'undefined') {
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
  if (isHomePage && !isIntroAlreadySeen()) {
    (window as any).__sr_intro_running = true;
  } else {
    (window as any).__sr_intro_running = false;
  }
}

export default function CinematicIntro() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';
  const [active, setActive] = useState(() => isHome && !isIntroAlreadySeen());

  const containerRef = useRef<HTMLDivElement>(null);
  const maskCircleRef = useRef<SVGCircleElement>(null);
  const apertureRingRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHome) {
      (window as any).__sr_intro_running = false;
      document.body.style.overflow = '';
      setActive(false);
      return;
    }

    if (isIntroAlreadySeen()) {
      (window as any).__sr_intro_running = false;
      window.dispatchEvent(new CustomEvent('sr-intro-complete'));
      setActive(false);
      return;
    }

    const handleReplay = () => {
      try {
        sessionStorage.removeItem('sr_intro_seen');
      } catch {}
      (window as any).__sr_intro_running = true;
      setActive(true);
    };

    window.addEventListener('replay-sr-intro', handleReplay);
    return () => window.removeEventListener('replay-sr-intro', handleReplay);
  }, [isHome]);

  useEffect(() => {
    if (!isHome || !active) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const finishIntro = () => {
      try {
        sessionStorage.setItem('sr_intro_seen', '1');
      } catch {}
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

      // Calculate the screen diagonal radius so the aperture completely uncovers the viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxRadius = Math.ceil(Math.hypot(vw, vh) * 0.75);
      const initialLogoRadius = Math.min(vw * 0.28, 128);

      // ----------------------------------------------------------------------
      // INITIAL STATE (Pure Obsidian Black, Logo centered, Aperture closed)
      // ----------------------------------------------------------------------
      gsap.set(containerRef.current, {
        opacity: 1,
      });
      gsap.set(maskCircleRef.current, {
        attr: { r: 0 },
      });
      gsap.set(ambientGlowRef.current, {
        opacity: 0,
        scale: 0.7,
        force3D: true,
      });
      gsap.set(logoWrapperRef.current, {
        opacity: 0,
        scale: 0.94,
        force3D: true,
      });
      gsap.set(brandTextRef.current, {
        opacity: 0,
        y: 8,
        force3D: true,
      });
      gsap.set(emblemRef.current, {
        opacity: 1,
        scale: 1,
        force3D: true,
      });
      gsap.set(sheenRef.current, {
        xPercent: -140,
        opacity: 0,
        force3D: true,
      });
      gsap.set(apertureRingRef.current, {
        opacity: 0,
        scale: 1,
        force3D: true,
      });

      // ----------------------------------------------------------------------
      // 1. SNAPPY LOGO REVEAL (0.0s - 0.4s)
      // ----------------------------------------------------------------------
      tl.to(
        ambientGlowRef.current,
        {
          opacity: 0.8,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.05
      );

      tl.to(
        logoWrapperRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.05
      );

      tl.to(
        brandTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.12
      );

      // ----------------------------------------------------------------------
      // 2. SILVER SHEEN (0.35s - 0.7s)
      // ----------------------------------------------------------------------
      tl.to(
        sheenRef.current,
        {
          opacity: 0.8,
          xPercent: 140,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.35
      );

      // Brief hold for logo recognition
      tl.to({}, { duration: 0.2 });

      // ----------------------------------------------------------------------
      // 3. RAPID APERTURE IRIS TRANSITION (0.75s - 1.25s)
      // ----------------------------------------------------------------------
      tl.to(
        ambientGlowRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
        },
        0.75
      );

      tl.to(
        maskCircleRef.current,
        {
          attr: { r: maxRadius },
          duration: 0.5,
          ease: 'power3.inOut',
        },
        0.75
      );

      tl.to(
        apertureRingRef.current,
        {
          opacity: 0.8,
          scale: maxRadius / initialLogoRadius,
          duration: 0.5,
          ease: 'power3.inOut',
        },
        0.75
      );

      tl.to(
        logoWrapperRef.current,
        {
          scale: 1.25,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        },
        0.75
      );

      // ----------------------------------------------------------------------
      // 4. FINAL HANDOFF (Fade out overlay completely)
      // ----------------------------------------------------------------------
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out',
        },
        1.1
      );
    }, containerRef);

    const handleQuickDismiss = () => {
      finishIntro();
    };

    window.addEventListener('keydown', handleQuickDismiss);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleQuickDismiss);
      ctx.revert();
    };
  }, [active]);

  const handleSkip = () => {
    try {
      sessionStorage.setItem('sr_intro_seen', '1');
    } catch {}
    (window as any).__sr_intro_running = false;
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('sr-intro-complete'));
    setActive(false);
  };

  if (!isHome || !active) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden max-w-full will-change-[opacity] cursor-pointer"
      aria-label="The SR Pictures Intro"
      role="dialog"
      aria-modal="true"
      title="Click or tap anywhere to skip"
    >
      {/* 
        CAMERA APERTURE EXPANDING CIRCULAR MASK (SVG)
        A black rectangle covers the screen. A central circle inside the mask
        expands outward like an opening camera aperture, revealing the homepage underneath.
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="sr-camera-aperture-mask">
            {/* White reveals the black overlay */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black circle cuts a transparent hole through the black overlay */}
            <circle ref={maskCircleRef} cx="50%" cy="50%" r="0" fill="black" />
          </mask>
        </defs>
        {/* Full-screen black overlay with circular aperture mask */}
        <rect
          width="100%"
          height="100%"
          fill="#050505"
          mask="url(#sr-camera-aperture-mask)"
        />
      </svg>

      {/* Skip button in top right corner (Minimal, accessible) */}
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 text-[#929493] hover:text-[#D8D8D5] transition-all font-mono text-[9px] sm:text-[10px] tracking-widest uppercase cursor-pointer backdrop-blur-sm"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* Center Stage: The Original SR Pictures Logo (ONLY VISUAL ELEMENT) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 select-none">
        {/* Aperture Edge Indicator Ring */}
        <div
          ref={apertureRingRef}
          className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full border pointer-events-none will-change-[transform,opacity]"
          style={{
            borderColor: 'rgba(216, 216, 213, 0.4)',
            boxShadow: '0 0 25px rgba(242, 241, 235, 0.4), inset 0 0 15px rgba(216, 216, 213, 0.2)',
            transform: 'translateZ(0)',
          }}
        />

        {/* Ambient Subtle Optical Glow behind Logo */}
        <div
          ref={ambientGlowRef}
          className="absolute w-64 h-64 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] rounded-full pointer-events-none will-change-[transform,opacity]"
          style={{
            background:
              'radial-gradient(circle, rgba(216, 216, 213, 0.1) 0%, rgba(36, 39, 41, 0.4) 40%, rgba(5, 5, 5, 0) 70%)',
            transform: 'translateZ(0)',
          }}
        />

        {/* Original SR Pictures Logo Emblem + Brand Typography Wrapper */}
        <div
          ref={logoWrapperRef}
          className="relative flex items-center justify-center will-change-[transform,opacity]"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Circular Camera-Lens Logo Container */}
          <div
            ref={emblemRef}
            className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.98),0_0_35px_rgba(216,216,213,0.08)] border will-change-[transform,opacity]"
            style={{
              borderColor: 'rgba(216, 216, 213, 0.35)',
              backgroundColor: '#050505',
              transform: 'translateZ(0)',
            }}
          >
            <img
              src="/assets/sr-pictures-emblem.png"
              alt="The SR Pictures"
              className="w-full h-full object-contain select-none"
              draggable={false}
            />

            {/* Subtle Metallic Silver Reflection Sheen */}
            <div
              ref={sheenRef}
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#F2F1EB]/55 to-transparent -skew-x-25 pointer-events-none mix-blend-overlay will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            />
          </div>

          {/* Refined Brand Typography: The SR Pictures */}
          <div
            ref={brandTextRef}
            className="absolute top-[calc(100%+1.25rem)] sm:top-[calc(100%+1.75rem)] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center font-logo-clean text-center whitespace-nowrap select-none will-change-[transform,opacity]"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 text-sm sm:text-lg md:text-xl font-light tracking-[0.28em] sm:tracking-[0.34em] uppercase">
              <span className="text-[#a1a1aa] font-extralight text-[0.88em]">THE</span>
              <span className="text-silver-monogram font-medium tracking-[0.22em] drop-shadow-[0_2px_10px_rgba(242,241,235,0.25)]">
                SR
              </span>
              <span className="text-[#D8D8D5] font-light tracking-[0.3em]">PICTURES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
