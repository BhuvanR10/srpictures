import { useEffect, useRef, useState } from 'react';
import { isMotionPaused, subscribeMotion } from '../lib/motion';

interface VideoProps {
  className?: string;
  poster: string;
  src: string;
  label?: string;
  priority?: boolean;
}

/**
 * Background video (Webflow "w-background-video" equivalent).
 * - Priority: For hero banners, loads immediately and ensures bulletproof autoplay on live HTTPS domains.
 * - Lazy: Other videos only load src when near/in the viewport.
 * - Plays only while visible; pauses when scrolled off-screen to preserve CPU/GPU.
 * - Decorative: hidden from assistive tech, poster stays visible when paused.
 */
export default function Video({ className = '', poster, src, label, priority = false }: VideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(priority);
  const visibleRef = useRef(priority);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;

    const playVideo = () => {
      if (isMotionPaused()) return;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback unlock listener on first user interaction
          const unlock = () => {
            v.play().catch(() => {});
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('click', unlock);
            window.removeEventListener('scroll', unlock);
          };
          window.addEventListener('pointerdown', unlock, { once: true, passive: true });
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('scroll', unlock, { once: true, passive: true });
        });
      }
    };

    if (priority) {
      // Force immediate source load & play
      try {
        v.load();
      } catch {
        // ignore load errors if already loading
      }
      playVideo();

      // Ensure playback triggers as soon as frames are ready
      v.addEventListener('canplay', playVideo, { once: true });
      v.addEventListener('loadeddata', playVideo, { once: true });

      // If cinematic intro was playing, re-trigger playback on intro handoff
      const handleIntroComplete = () => {
        playVideo();
      };
      window.addEventListener('sr-intro-complete', handleIntroComplete, { once: true });

      return () => {
        v.removeEventListener('canplay', playVideo);
        v.removeEventListener('loadeddata', playVideo);
        window.removeEventListener('sr-intro-complete', handleIntroComplete);
      };
    }
  }, [priority, src]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const sync = () => {
      const vid = videoRef.current;
      if (!vid) return;
      if (visibleRef.current && !isMotionPaused()) {
        vid.play().catch(() => undefined);
      } else if (!priority) {
        vid.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setNear(true);
        }
        sync();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(wrap);

    const off = subscribeMotion(sync);
    return () => {
      io.disconnect();
      off();
    };
  }, [priority]);

  useEffect(() => {
    if (near && videoRef.current && visibleRef.current && !isMotionPaused()) {
      videoRef.current.play().catch(() => undefined);
    }
  }, [near]);

  return (
    <div
      ref={wrapRef}
      className={`${className} w-background-video w-background-video-atom relative overflow-hidden`}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <video
        ref={videoRef}
        src={priority || near ? src : undefined}
        autoPlay
        loop
        muted
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        poster={poster}
        className="w-full h-full object-cover !z-0 absolute inset-0"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url("${poster}")`,
        }}
        tabIndex={-1}
      >
        {(priority || near) && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}
