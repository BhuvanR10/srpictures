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
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
      if (priority && !isMotionPaused()) {
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {
            // If browser blocked unprompted autoplay (e.g. low power mode), play on first touch/scroll
            const unlock = () => {
              v.play().catch(() => {});
              window.removeEventListener('touchstart', unlock);
              window.removeEventListener('click', unlock);
              window.removeEventListener('scroll', unlock);
            };
            window.addEventListener('touchstart', unlock, { once: true, passive: true });
            window.addEventListener('click', unlock, { once: true });
            window.addEventListener('scroll', unlock, { once: true, passive: true });
          });
        }
      }
    }

    const wrap = wrapRef.current;
    if (!wrap) return;
    const sync = () => {
      const vid = videoRef.current;
      if (!vid) return;
      if (visibleRef.current && !isMotionPaused()) {
        vid.play().catch(() => undefined);
      } else {
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
      { rootMargin: '150px 0px' },
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
      className={`${className} w-background-video w-background-video-atom`}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        poster={poster}
        style={{ backgroundImage: `url("${poster}")` }}
        src={priority || near ? src : undefined}
        tabIndex={-1}
      />
    </div>
  );
}
