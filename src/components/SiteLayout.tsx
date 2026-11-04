import { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';
import { initHoverEffects } from '../lib/hover';
import { isMotionPaused, setMotionPaused, subscribeMotion } from '../lib/motion';
import { setupPage } from '../lib/pageEffects';
import Footer from './Footer';
import Navbar from './Navbar';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function SiteLayout() {
  const { pathname } = useLocation();
  const [paused, setPaused] = useState(isMotionPaused());

  useEffect(() => initHoverEffects(), []);
  useEffect(() => subscribeMotion(() => setPaused(isMotionPaused())), []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = setupPage();
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      cleanup();
    };
  }, [pathname]);

  return (
    <div className="page-wrapper">
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
      <button type="button" className="skip-link motion-toggle" aria-pressed={paused} onClick={() => setMotionPaused(!isMotionPaused())}>
        {paused ? 'Play background motion' : 'Pause background motion'}
      </button>
      <Navbar />
      <main id="main" tabIndex={-1} className="main-wrapper">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
