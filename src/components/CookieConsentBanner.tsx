import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'sr_dpdp_consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so it smoothly appears after initial page load
        const timer = setTimeout(() => setVisible(true), 1200);
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
          version: 'dpdp-2023-v3',
        })
      );
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and Privacy Notice"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#080808]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-12px_40px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Studio Brand Identification & Compliance Text */}
          <div className="flex items-start sm:items-center gap-3.5">
            <img
              src="/assets/sr-pictures-emblem.png"
              alt="The SR Pictures"
              className="w-8 h-8 rounded-full border border-white/20 object-contain shrink-0 mt-0.5 sm:mt-0"
            />
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white font-semibold">
                  Privacy &amp; Data Notice
                </span>
                <span className="text-neutral-600 text-xs hidden sm:inline" aria-hidden="true">│</span>
                <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-neutral-400">
                  DPDP Act, 2023 (India)
                </span>
              </div>
              <p className="text-xs text-neutral-300 m-0 leading-relaxed font-sans max-w-3xl">
                The SR Pictures uses essential cookies and session telemetry to secure our website, remember your preferences, and process inquiries in accordance with Indian digital privacy law.
              </p>
            </div>
          </div>

          {/* Action Buttons & Policy Link */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-stretch sm:self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t border-white/5 lg:border-t-0">
            <Link
              to="/privacy-policy"
              className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 hover:text-white transition-colors underline decoration-white/20 mr-1 sm:mr-2"
            >
              Policy
            </Link>
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              className="flex-1 sm:flex-initial px-4 py-2 rounded text-[11px] font-mono tracking-wider uppercase text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 transition-colors text-center"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleChoice('all')}
              className="flex-1 sm:flex-initial px-5 py-2 rounded text-[11px] font-mono tracking-wider uppercase font-bold bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm text-center"
              style={{ color: '#000000', WebkitTextFillColor: '#000000' }}
            >
              <span style={{ color: '#000000', WebkitTextFillColor: '#000000', fontWeight: 700 }}>
                Accept All
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              aria-label="Dismiss privacy notice"
              className="p-1.5 text-neutral-400 hover:text-white transition-colors ml-1 hidden sm:inline-flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
}
