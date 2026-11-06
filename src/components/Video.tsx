import { useEffect, useRef, useState } from 'react';
import { isMotionPaused, subscribeMotion } from '../lib/motion';

interface VideoProps {
  className?: string;
  poster: string;
  src: string;
  label?: string;
}

/**
 * Background video (Webflow "w-background-video" equivalent).
 * - Lazy: src is only assigned when near/in the viewport.
 * - Plays only while visible; pauses when scrolled off-screen to preserve CPU/GPU.
 * - Decorative: hidden from assistive tech, poster stays visible when paused.
 */
export default function Video({ className = '', poster, src, label }: VideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const sync = () => {
      const v = videoRef.current;
      if (!v) return;
      if (visibleRef.current && !isMotionPaused()) {
        v.play().catch(() => undefined);
      } else {
        v.pause();
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
  }, []);

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
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        style={{ backgroundImage: `url("${poster}")` }}
        src={near ? src : undefined}
        tabIndex={-1}
      />
    </div>
  );
}
