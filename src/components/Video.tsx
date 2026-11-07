import { useEffect, useRef, useState } from 'react';
import { isMotionPaused, subscribeMotion } from '../lib/motion';

export interface VideoProps {
  className?: string;
  poster: string;
  src: string;
  desktopSrc?: string;
  label?: string;
  priority?: boolean;
  onVideoRef?: (node: HTMLVideoElement | null) => void;
  muted?: boolean;
}

/**
 * Background video (Webflow "w-background-video" equivalent).
 * - Priority: For hero banners, loads immediately and ensures bulletproof autoplay on live HTTPS domains and Chrome.
 * - Lazy: Other videos only load src when near/in the viewport.
 * - Responsive: Supports desktopSrc for high-res 1080p stream on desktop and lightweight 720p on mobile.
 * - Audio Control: Optional controlled `muted` prop allows parent to unmute without React re-asserting muted=true.
 * - Plays only while visible; pauses when scrolled off-screen to preserve CPU/GPU.
 * - Instant poster display prevents any black frame during network fetch.
 */
export default function Video({
  className = '',
  poster,
  src,
  desktopSrc,
  label,
  priority = false,
  onVideoRef,
  muted = true,
}: VideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(priority);
  const [isPlaying, setIsPlaying] = useState(false);
  const visibleRef = useRef(priority);

  // Pick optimal stream based on viewport width
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    if (typeof window !== 'undefined' && desktopSrc && window.innerWidth >= 768) {
      return desktopSrc;
    }
    return src;
  });

  useEffect(() => {
    if (!desktopSrc) return;
    const handleResize = () => {
      const target = window.innerWidth >= 768 ? desktopSrc : src;
      setCurrentSrc((prev) => (prev !== target ? target : prev));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [src, desktopSrc]);

  // Synchronize audio muted state when the prop changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = muted;
    if (!muted) {
      v.volume = 1.0;
      v.removeAttribute('muted');
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else {
      v.setAttribute('muted', '');
    }
  }, [muted]);

  // Directly set DOM properties on mount so Chrome's autoplay policy sees muted and inline flags instantly
  const setVideoRef = (node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (onVideoRef) {
      onVideoRef(node);
    }
    if (node) {
      node.muted = muted;
      node.defaultMuted = true;
      node.playsInline = true;
      node.setAttribute('playsinline', '');
      node.setAttribute('webkit-playsinline', '');
      if (muted) {
        node.setAttribute('muted', '');
      } else {
        node.removeAttribute('muted');
      }
      if (priority && node.paused) {
        node.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const playSafe = () => {
      if (isMotionPaused()) return;
      if (muted) {
        v.muted = true;
      }
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If autoplay is delayed by browser heuristics, unlock on first interaction
            const unlock = () => {
              if (muted) v.muted = true;
              v.play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
              ['pointerdown', 'touchstart', 'scroll', 'click'].forEach((evt) =>
                window.removeEventListener(evt, unlock)
              );
            };
            ['pointerdown', 'touchstart', 'scroll', 'click'].forEach((evt) =>
              window.addEventListener(evt, unlock, { once: true, passive: true })
            );
          });
      }
    };

    if (priority) {
      playSafe();

      // Trigger playback as soon as the first frame data is available
      v.addEventListener('loadeddata', playSafe, { once: true });
      v.addEventListener('canplay', playSafe, { once: true });
      v.addEventListener('playing', () => setIsPlaying(true), { once: true });

      // Handle tab visibility change
      const handleVisibility = () => {
        if (document.visibilityState === 'visible' && !isMotionPaused()) {
          playSafe();
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);

      return () => {
        v.removeEventListener('loadeddata', playSafe);
        v.removeEventListener('canplay', playSafe);
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    }
  }, [priority, src, muted]);

  // Viewport intersection observer for non-priority videos
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const sync = () => {
      const vid = videoRef.current;
      if (!vid) return;
      if (visibleRef.current && !isMotionPaused()) {
        if (muted) vid.muted = true;
        vid.play().then(() => setIsPlaying(true)).catch(() => undefined);
      } else if (!priority) {
        vid.pause();
        setIsPlaying(false);
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
  }, [priority, muted]);

  useEffect(() => {
    if (near && videoRef.current && visibleRef.current && !isMotionPaused()) {
      if (muted) videoRef.current.muted = true;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => undefined);
    }
  }, [near, muted]);

  const activeSrc = priority || near ? currentSrc : undefined;

  return (
    <div
      ref={wrapRef}
      className={`${className} w-background-video w-background-video-atom relative overflow-hidden`}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {/* Instant fallback poster layer - guarantees zero black frame before video frames decode */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ zIndex: 0 }}
        />
      )}

      {/* Autoplaying background video */}
      <video
        ref={setVideoRef}
        src={activeSrc}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        className="w-full h-full object-cover absolute inset-0"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
        tabIndex={-1}
      />
    </div>
  );
}
