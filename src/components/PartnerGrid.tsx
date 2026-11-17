import React, { useRef, useState } from 'react';
import { partners } from '../data/media';

interface PartnerCardItemProps {
  partner: (typeof partners)[number];
}

function PartnerCardItem({ partner }: PartnerCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth subtle 3D tilt towards mouse cursor via CSS variables (0 React re-renders)
    const tiltX = -((y - centerY) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 14;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    el.style.setProperty('--rx', `${tiltX.toFixed(2)}deg`);
    el.style.setProperty('--ry', `${tiltY.toFixed(2)}deg`);
    el.style.setProperty('--gx', `${gx.toFixed(1)}%`);
    el.style.setProperty('--gy', `${gy.toFixed(1)}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const el = containerRef.current;
    if (el) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--gx', '50%');
      el.style.setProperty('--gy', '50%');
    }
  };

  return (
    <div
      ref={cardRef}
      role="listitem"
      className="partner-card group relative select-none cursor-pointer min-h-[140px] sm:min-h-[155px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        ref={containerRef}
        className="card-container relative w-full h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: isHovered
            ? 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1.05, 1.05, 1.05)'
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className={partner.cls} style={{ transformStyle: 'preserve-3d' }}>
          {/* Front Face */}
          <div
            className="card-side transition-colors duration-300"
            style={{
              borderColor: isHovered ? 'rgba(255, 255, 255, 0.28)' : undefined,
              boxShadow: isHovered
                ? '0 18px 36px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.08)'
                : undefined,
            }}
          >
            <div className="front-logo relative overflow-hidden w-full h-full flex items-center justify-center p-3 sm:p-4">
              {/* Subtle spotlight glow on hover */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.12) 0%, transparent 65%)',
                  }}
                />
              )}
              <img
                className="partner-logo !opacity-100 object-contain !h-14 sm:!h-16 md:!h-[4.5rem] w-auto max-w-[85%] max-h-[75%] transition-all duration-300 group-hover:scale-110"
                style={{
                  filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : undefined,
                }}
                src={partner.front}
                alt={partner.name ? `${partner.name} logo` : 'Partner logo'}
                loading="lazy"
              />
            </div>
          </div>

          {/* Back Face */}
          <div
            className="card-side is-back transition-colors duration-300"
            style={{
              borderColor: isHovered ? 'rgba(255, 255, 255, 0.28)' : undefined,
              boxShadow: isHovered
                ? '0 18px 36px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.08)'
                : undefined,
            }}
          >
            <div className="back-logo relative overflow-hidden w-full h-full flex items-center justify-center p-3 sm:p-4">
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.12) 0%, transparent 65%)',
                  }}
                />
              )}
              <img
                className="partner-logo back !opacity-100 object-contain !h-14 sm:!h-16 md:!h-[4.5rem] w-auto max-w-[85%] max-h-[75%] transition-all duration-300 group-hover:scale-110"
                style={{
                  filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : undefined,
                }}
                src={partner.back}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartnerGrid() {
  return (
    <div className="w-layout-grid partner-grid" role="list" aria-label="Our valued partners">
      {partners.map((p) => (
        <PartnerCardItem key={p.cls} partner={p} />
      ))}
    </div>
  );
}
