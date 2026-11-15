import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface RollNumberProps {
  prefix?: string;
  suffix?: string;
  value?: string;
  singleDigit?: boolean;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function DigitReel({
  targetDigit,
  delay = 0,
  inView,
  reducedMotion,
}: {
  targetDigit: number;
  delay?: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="roll-digit-reel" aria-hidden="true">
      <motion.div
        className="roll-digit-strip"
        initial={false}
        animate={{
          y: reducedMotion || inView ? `-${targetDigit * 10}%` : '0%',
        }}
        transition={{
          duration: reducedMotion ? 0 : 1.8,
          delay: reducedMotion ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {DIGITS.map((digit) => (
          <span key={digit} className="section-number">
            {digit}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function RollNumber({
  prefix,
  suffix,
  value: explicitValue,
  singleDigit,
}: RollNumberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-50px' });
  const reducedMotion = !!useReducedMotion();

  // Extract numeric digits
  let digits: number[] = [];
  if (singleDigit) {
    digits = [8];
  } else if (explicitValue) {
    const numericPart = explicitValue.replace(/\D/g, '');
    digits = numericPart ? numericPart.split('').map(Number) : [9, 9];
  } else {
    digits = prefix ? [8] : [9, 9];
  }

  const displayVal = explicitValue ?? `${prefix ?? ''}${digits.join('')}${suffix ?? ''}`;

  return (
    <div
      ref={containerRef}
      className="roll-number-wrapper"
      role="img"
      aria-label={displayVal}
    >
      {prefix && (
        <span className="section-number alternate" aria-hidden="true">
          {prefix}
        </span>
      )}
      {digits.map((digit, idx) => (
        <DigitReel
          key={idx}
          targetDigit={digit}
          delay={idx * 0.15}
          inView={inView}
          reducedMotion={reducedMotion}
        />
      ))}
      {suffix && (
        <span className="section-number alternate" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  );
}
