import { useState, useEffect, useRef } from 'react';
import { usePageSeo } from '../lib/usePageSeo';
import Subtitle from '../components/Subtitle';
import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import { REELS_DATA, ReelVideo } from '../data/reelsData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
} from 'lucide-react';

function PureReelCard({
  video,
  onOpenModal,
}: {
  video: ReelVideo;
  onOpenModal: (v: ReelVideo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play muted video smoothly in a loop
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <div
      onClick={() => onOpenModal(video)}
      className="group relative rounded-2xl bg-neutral-950 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer aspect-[9/16]"
    >
      {/* Pure Video Element */}
      <video
        ref={videoRef}
        src={video.videoSrc}
        loop
        muted={isMuted}
        playsInline
        autoPlay
        preload="auto"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Subtle Bottom Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Floating Audio Toggle (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95 cursor-pointer shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-neutral-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-400" />
          )}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(video);
          }}
          aria-label="View fullscreen"
          className="p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95 cursor-pointer shadow-lg opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-4 h-4 text-neutral-300" />
        </button>
      </div>
    </div>
  );
}

export default function Reels() {
  const [activeModalVideo, setActiveModalVideo] = useState<ReelVideo | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  usePageSeo({
    title: 'Reels | The SR Pictures Bengaluru',
    description:
      'Watch exclusive 4K vertical cinematic reels by The SR Pictures Bengaluru. Luxury wedding cinema, car delivery films, fashion portraits, and resort visuals.',
    keywords:
      'The SR Pictures reels, wedding reels Bangalore, car delivery reels, cinematic vertical reels',
    canonicalPath: '/reels',
  });

  const currentIndex = activeModalVideo
    ? REELS_DATA.findIndex((v) => v.id === activeModalVideo.id)
    : -1;

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % REELS_DATA.length;
    setActiveModalVideo(REELS_DATA[nextIdx]);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + REELS_DATA.length) % REELS_DATA.length;
    setActiveModalVideo(REELS_DATA[prevIdx]);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalVideo) return;
      if (e.key === 'Escape') setActiveModalVideo(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' && modalVideoRef.current) {
        e.preventDefault();
        if (modalVideoRef.current.paused) modalVideoRef.current.play();
        else modalVideoRef.current.pause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalVideo, currentIndex]);

  return (
    <>
      <div id="top" className="top"></div>

      {/* Clean Minimal Header */}
      <header className="section-service-header relative pt-28 sm:pt-36 pb-6 overflow-hidden">
        <div className="padding-global">
          <div className="container-large">
            <div className="heading-wrap is-center text-center">
              <Subtitle>Portfolio in Motion</Subtitle>
              <div className="title-wrapper mt-3">
                <h1 className="heading-style-h2 text-white uppercase tracking-tight">
                  Reels
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Pure Video Showcase Grid - Only Videos */}
      <section className="section-service-content relative py-8 sm:py-12">
        <div className="padding-global">
          <div className="container-large">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {REELS_DATA.map((video) => (
                <PureReelCard
                  key={video.id}
                  video={video}
                  onOpenModal={(v) => setActiveModalVideo(v)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pure Minimalist Modal Video Player */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActiveModalVideo(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setActiveModalVideo(null)}
            aria-label="Close video"
            className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 transition-all cursor-pointer shadow-2xl"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Video Nav */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous video"
            className="absolute left-3 sm:left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/40 text-white backdrop-blur-lg border border-white/20 transition-all cursor-pointer shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Video Player Box - Pure Video with Native Controls */}
          <div
            className="w-full h-full max-h-[85vh] max-w-[450px] aspect-[9/16] flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              key={activeModalVideo.id}
              src={activeModalVideo.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full rounded-2xl border border-white/20 shadow-2xl bg-black object-contain"
            />
          </div>

          {/* Next Video Nav */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next video"
            className="absolute right-3 sm:right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/40 text-white backdrop-blur-lg border border-white/20 transition-all cursor-pointer shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Call to Action Section */}
      <section className="call-to-action">
        <div className="circle-opacity is-left"></div>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top padding-xhuge">
              <div className="heading-wrap is-center text-center">
                <Subtitle>Ready to Film Your Story?</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">{"Let’s"}</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Create</h2>
                  </div>
                </div>
              </div>
              <div className="spacer-huge"></div>
            </div>
          </div>
        </div>
        <CtaWrapper />
        <div className="circle-opacity is-right"></div>
        <div className="cta-content-wrap">
          <CtaButton to="/contact">Book a Shoot</CtaButton>
        </div>
      </section>
    </>
  );
}
