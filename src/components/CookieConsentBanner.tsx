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
      // LocalStorage access restricted / private browsing
    }
  }, []);

  const handleChoice = (preference: 'all' | 'essential') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          choice: preference,
          timestamp: new Date().toISOString(),
          version: 'dpdp-2023-v1',
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
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="relative p-5 sm:p-6 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80 text-neutral-300 font-sans">
        {/* Subtle accent badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300">
            DPDP Act, 2023 • Privacy &amp; Cookies
          </span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 mb-4">
          We use essential cookies and session telemetry to secure our website, remember your preferences, and process inquiries. In compliance with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong>, you may choose your cookie preferences.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleChoice('all')}
            className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-semibold tracking-wide hover:bg-neutral-200 active:scale-95 transition-all text-center"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-medium border border-white/10 hover:bg-white/20 active:scale-95 transition-all text-center"
          >
            Essential Only
          </button>
          <Link
            to="/privacy-policy"
            className="text-[11px] text-neutral-400 hover:text-amber-400 text-center sm:ml-auto underline decoration-dotted transition-colors py-1"
          >
            Read Notice
          </Link>
        </div>
      </div>
    </div>
  );
}

