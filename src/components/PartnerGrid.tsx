import React, { useRef, useState } from 'react';
import { partners } from '../data/media';

interface PartnerCardItemProps {
  partner: (typeof partners)[number];
}

function PartnerCardItem({ partner }: PartnerCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth subtle 3D tilt towards mouse cursor
    const tiltX = -((y - centerY) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 14;

    setTilt({
      rx: tiltX,
      ry: tiltY,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
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
        className="card-container relative w-full h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.05, 1.05, 1.05)`
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
                    background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`,
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
                    background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`,
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
