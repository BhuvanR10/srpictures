import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'sr_dpdp_consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Smoothly appear shortly after initial render
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage restricted
    }
  }, []);

  const handleChoice = (preference: 'all' | 'essential') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          choice: preference,
          timestamp: new Date().toISOString(),
          version: 'dpdp-2023-v2',
        })
      );
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl sm:bottom-6 z-50 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="relative p-4 sm:px-6 sm:py-3.5 rounded-2xl sm:rounded-full bg-neutral-950/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-neutral-300 font-sans">
        
        {/* Desktop Layout: Horizontal luxury capsule */}
        <div className="hidden sm:flex items-center justify-between gap-5">
          <div className="flex items-center gap-3 text-xs leading-normal">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="text-neutral-300">
              We use essential cookies to ensure privacy &amp; security under India&apos;s{' '}
              <strong className="text-white font-medium">DPDP Act, 2023</strong>.{' '}
              <Link
                to="/privacy-policy"
                className="text-amber-400/90 hover:text-amber-300 underline decoration-amber-400/40 ml-1 transition-colors"
              >
                Policy
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleChoice('all')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-amber-300 active:scale-95 transition-all shadow-md"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              aria-label="Dismiss cookie notice"
              className="p-1 text-neutral-400 hover:text-white transition-colors ml-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Layout: Compact, sleek 2-row card */}
        <div className="flex flex-col sm:hidden gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
                Privacy &amp; Cookies • DPDP Act 2023
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              aria-label="Close"
              className="text-neutral-400 hover:text-white p-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed m-0">
            We use essential cookies to maintain security and process inquiries in compliance with Indian digital privacy law.{' '}
            <Link to="/privacy-policy" className="text-amber-400 underline ml-0.5">
              Read Policy
            </Link>
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              className="flex-1 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 active:scale-95 transition-all text-center"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleChoice('all')}
              className="flex-1 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-amber-300 active:scale-95 transition-all text-center"
            >
              Accept All
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
