import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface BeyondImage {
  id: string;
  src: string;
  alt: string;
}

export const BEYOND_ORDINARY_IMAGES: BeyondImage[] = [
  { id: 'beyond_01', src: '/assets/beyond_ordinary/beyond_01.webp', alt: 'The SR Pictures Photograph 01' },
  { id: 'beyond_02', src: '/assets/beyond_ordinary/beyond_02.webp', alt: 'The SR Pictures Photograph 02' },
  { id: 'beyond_03', src: '/assets/beyond_ordinary/beyond_03.webp', alt: 'The SR Pictures Photograph 03' },
  { id: 'beyond_04', src: '/assets/beyond_ordinary/beyond_04.webp', alt: 'The SR Pictures Photograph 04' },
  { id: 'beyond_05', src: '/assets/beyond_ordinary/beyond_05.webp', alt: 'The SR Pictures Photograph 05' },
  { id: 'beyond_06', src: '/assets/beyond_ordinary/beyond_06.webp', alt: 'The SR Pictures Photograph 06' },
  { id: 'beyond_07', src: '/assets/beyond_ordinary/beyond_07.webp', alt: 'The SR Pictures Photograph 07' },
  { id: 'beyond_08', src: '/assets/beyond_ordinary/beyond_08.webp', alt: 'The SR Pictures Photograph 08' },
  { id: 'beyond_09', src: '/assets/beyond_ordinary/beyond_09.webp', alt: 'The SR Pictures Photograph 09' },
  { id: 'beyond_10', src: '/assets/beyond_ordinary/beyond_10.webp', alt: 'The SR Pictures Photograph 10' },
  { id: 'beyond_11', src: '/assets/beyond_ordinary/beyond_11.webp', alt: 'The SR Pictures Photograph 11' },
  { id: 'beyond_12', src: '/assets/beyond_ordinary/beyond_12.webp', alt: 'The SR Pictures Photograph 12' },
  { id: 'beyond_13', src: '/assets/beyond_ordinary/beyond_13.webp', alt: 'The SR Pictures Photograph 13' },
  { id: 'beyond_14', src: '/assets/beyond_ordinary/beyond_14.webp', alt: 'The SR Pictures Photograph 14' },
  { id: 'beyond_15', src: '/assets/beyond_ordinary/beyond_15.webp', alt: 'The SR Pictures Photograph 15' },
  { id: 'beyond_16', src: '/assets/beyond_ordinary/beyond_16.webp', alt: 'The SR Pictures Photograph 16' },
];

export default function BeyondOrdinaryMarquee() {
  const [selectedImage, setSelectedImage] = useState<BeyondImage | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        const idx = BEYOND_ORDINARY_IMAGES.findIndex((img) => img.id === selectedImage.id);
        const next = BEYOND_ORDINARY_IMAGES[(idx + 1) % BEYOND_ORDINARY_IMAGES.length];
        setSelectedImage(next);
      } else if (e.key === 'ArrowLeft') {
        const idx = BEYOND_ORDINARY_IMAGES.findIndex((img) => img.id === selectedImage.id);
        const prev = BEYOND_ORDINARY_IMAGES[(idx - 1 + BEYOND_ORDINARY_IMAGES.length) % BEYOND_ORDINARY_IMAGES.length];
        setSelectedImage(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (selectedImage) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [selectedImage]);

  // Duplicate the 16 images to create a seamless infinite loop from right to left
  const trackImages = [...BEYOND_ORDINARY_IMAGES, ...BEYOND_ORDINARY_IMAGES];

  return (
    <div className="relative w-full overflow-hidden select-none py-4 sm:py-6 group">
      {/* Edge Gradient Mask for Seamless Fading into Black Surface */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      {/* Auto-moving Infinite Marquee Track: Right to Left */}
      <div className="beyond-marquee-wrapper overflow-hidden w-full">
        <div
          className="beyond-marquee-track flex gap-4 sm:gap-6 will-change-transform group-hover:[animation-play-state:paused]"
          style={{
            width: 'max-content',
            animation: 'marqueeRightToLeft 42s linear infinite',
          }}
        >
          {trackImages.map((img, index) => (
            <div
              key={`${img.id}-${index}`}
              onClick={() => setSelectedImage(img)}
              className="relative shrink-0 w-[240px] sm:w-[300px] md:w-[350px] lg:w-[380px] h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-[#0e0e12] border border-white/10 hover:border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_40px_rgba(255,255,255,0.12)] group/card"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Fullscreen Lightbox Modal rendered via Portal directly on body */}
      {selectedImage &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Bar with High-Priority Visible Close Button */}
            <div
              className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-end z-[100000] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="w-12 h-12 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all duration-200 flex items-center justify-center cursor-pointer border border-white/30 shadow-2xl backdrop-blur-md active:scale-95"
                aria-label="Close image preview"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const idx = BEYOND_ORDINARY_IMAGES.findIndex((img) => img.id === selectedImage.id);
                const prev = BEYOND_ORDINARY_IMAGES[(idx - 1 + BEYOND_ORDINARY_IMAGES.length) % BEYOND_ORDINARY_IMAGES.length];
                setSelectedImage(prev);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white/50 flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const idx = BEYOND_ORDINARY_IMAGES.findIndex((img) => img.id === selectedImage.id);
                const next = BEYOND_ORDINARY_IMAGES[(idx + 1) % BEYOND_ORDINARY_IMAGES.length];
                setSelectedImage(next);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white/50 flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pure Fullscreen Image - Zero Text Overlay */}
            <div
              className="relative max-w-6xl max-h-[90vh] flex items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/15 pointer-events-auto"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
