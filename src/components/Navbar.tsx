import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EASE, gsap } from '../lib/gsap';
import { WHATSAPP_GET_IN_TOUCH_URL } from '../lib/whatsapp';
import { Menu, X, ArrowUpRight, MessageCircle, ChevronDown } from 'lucide-react';

const MOBILE_NAV_LINKS = [
  { to: '/', label: 'Home', num: '01' },
  { to: '/about', label: 'About Studio', num: '02' },
  { to: '/services', label: 'Services', num: '03' },
  { to: '/categories', label: 'Visual Gallery', num: '04' },
  { to: '/pricing', label: 'Pricing & Packages', num: '05' },
  { to: '/blog', label: 'Journal & Stories', num: '06' },
  { to: '/contact', label: 'Contact Us', num: '07' },
];

function NavLinkItem({ to, label, dropdown }: { to: string; label: string; dropdown?: boolean }) {
  const { pathname } = useLocation();
  const isGalleryActive =
    to === '/categories' &&
    (pathname === '/case-studies' ||
      pathname.startsWith('/categories') ||
      pathname.startsWith('/category'));
  const current = to === pathname || isGalleryActive;

  return (
    <div className="nav-overflow">
      <Link
        to={to}
        className={`nav-link w-inline-block transition-all duration-200 ${
          current ? 'w--current bg-white/10 text-white rounded-full px-3 py-1 shadow-inner' : ''
        }`}
        aria-current={current ? 'page' : undefined}
      >
        <div className={`nav-wrap${dropdown ? ' dropdown-wrap' : ''}`}>
          <div className={`nav-text${dropdown ? ' dropdown-text' : ''}`}>{label}</div>
          <div className="nav-text hover" aria-hidden="true">{label}</div>
        </div>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLElement>(null);
  const icon = useRef<HTMLDivElement>(null);
  const firstDrop = useRef(true);

  // Desktop Dropdown
  useLayoutEffect(() => {
    const l = list.current;
    if (!l) return;
    if (firstDrop.current) {
      firstDrop.current = false;
      gsap.set(l, { display: 'none' });
      return;
    }
    if (dropOpen) {
      gsap.set(l, { display: 'flex' });
      gsap.fromTo(l, { height: 0, opacity: 0, scale: 0.5 }, { height: 'auto', opacity: 1, scale: 1, duration: 0.5, ease: EASE.ease, overwrite: true });
      gsap.to(icon.current, { rotate: 180, duration: 0.5, ease: EASE.ease });
    } else {
      gsap.to(l, { height: 0, opacity: 0, scale: 0.5, duration: 0.5, ease: EASE.ease, overwrite: true, onComplete: () => { gsap.set(l, { display: 'none' }); } });
      gsap.to(icon.current, { rotate: 0, duration: 0.5, ease: EASE.ease });
    }
  }, [dropOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Auto-close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  // Keyboard navigation & responsive reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDropOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 992 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const hoverOk = useCallback(() => window.matchMedia('(min-width: 992px) and (hover: hover)').matches, []);

  return (
    <>
      <div ref={root} data-collapse="medium" role="banner" className={`navbar w-nav ${menuOpen ? 'menu-is-open' : ''}`}>
        <div className="padding-global">
          <div className="container-large">
            <div className="nav-row flex items-center justify-between w-full">
            
            {/* Brand Logo & Studio Name */}
            <Link
              to="/"
              className="brand-link flex !flex-row items-center gap-3 sm:gap-3.5 no-underline group"
              aria-label="The SR Pictures home"
            >
              <div className="logo-wrap h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 relative overflow-hidden rounded-full border border-white/20 shadow-md bg-transparent">
                <img
                  src="/assets/sr-pictures-emblem.png"
                  alt="The SR Pictures"
                  className="logo h-11 w-11 sm:h-12 sm:w-12 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-cinema-logo font-medium text-[14px] sm:text-[16px] tracking-[0.18em] leading-none text-white uppercase whitespace-nowrap">
                  The SR Pictures
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Pill (Hidden on Mobile < 992px) */}
            <div className="nav-component-wrapper hidden lg:flex">
              <nav role="navigation" aria-label="Main" className="navigation w-nav-menu">
                <div className="nav-content">
                  <NavLinkItem to="/" label="Home" />
                  <NavLinkItem to="/about" label="About" />
                  <NavLinkItem to="/services" label="Services" />
                  <NavLinkItem to="/categories" label="Gallery" />
                  <NavLinkItem to="/pricing" label="Pricing" />
                  <div className="nav-dropdown-wrap">
                    <div className="dropdown-wrapper">
                      <div
                        className="dropdown w-dropdown"
                        onMouseEnter={() => hoverOk() && setDropOpen(true)}
                        onMouseLeave={() => hoverOk() && setDropOpen(false)}
                      >
                        <div
                          className="dropdown-toggle w-dropdown-toggle"
                          role="button"
                          tabIndex={0}
                          aria-haspopup="true"
                          aria-expanded={dropOpen}
                          onClick={() => setDropOpen((v) => !v)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDropOpen((v) => !v); }
                          }}
                        >
                          <div className="nav-overflow">
                            <span className="nav-link w-inline-block flex items-center gap-1 cursor-pointer">
                              <span className="nav-text">More</span>
                              <ChevronDown className={`w-3 h-3 stroke-[2.5] transition-transform duration-200 ${dropOpen ? 'rotate-180 text-white' : 'text-neutral-400'}`} />
                            </span>
                          </div>
                        </div>
                        <nav ref={list} aria-label="More Pages" className="dropdown-list w-dropdown-list" style={{ display: 'none' }}>
                          <div className="dropdown-content">
                            {[['/categories', 'Categories'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
                              <div className="dropdown-link-wrap" key={to}>
                                <NavLinkItem to={to} label={label} dropdown />
                              </div>
                            ))}
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nav-background"></div>
              </nav>
              <div className="nav-button-wrapper">
                <a
                  href={WHATSAPP_GET_IN_TOUCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-cta-pill"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>

            {/* Clean, Dedicated Mobile Menu Toggle Button (Visible on Mobile < 992px) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                className="mobile-menu-toggle flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] active:bg-white/[0.22] border border-white/20 text-white transition-all active:scale-95 cursor-pointer shadow-md"
              >
                {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>

          </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Modern Luxury Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[1000] bg-[#070709]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Drawer Header with Logo & Clear Close Button */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-transparent">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-white no-underline"
            aria-label="The SR Pictures home"
          >
            <img
              src="/assets/sr-pictures-emblem.png"
              alt="The SR Pictures"
              className="h-11 w-11 object-contain rounded-full border border-white/20 shadow-md"
            />
            <span className="font-cinema-logo font-medium text-[15px] tracking-[0.18em] leading-none text-white uppercase">
              The SR Pictures
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 flex flex-col justify-center gap-2">
          {MOBILE_NAV_LINKS.map((item) => {
            const isActive =
              item.to === pathname ||
              (item.to === '/categories' &&
                (pathname === '/case-studies' ||
                  pathname.startsWith('/categories') ||
                  pathname.startsWith('/category')));

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 group no-underline ${
                  isActive
                    ? 'bg-white/15 text-white font-bold border border-white/25 shadow-lg'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${isActive ? 'text-amber-400 font-bold' : 'text-neutral-500'}`}>
                    {item.num}.
                  </span>
                  <span className="text-lg sm:text-xl font-mono tracking-wider uppercase font-semibold">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isActive ? 'text-amber-400 opacity-100' : 'text-neutral-500 opacity-50 group-hover:opacity-100'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Drawer Bottom Action Block */}
        <div className="px-5 sm:px-6 py-5 border-t border-white/10 bg-black/60 flex flex-col gap-3">
          <a
            href={WHATSAPP_GET_IN_TOUCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all no-underline"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Inquire on WhatsApp</span>
          </a>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1 pt-1">
            <span>Bengaluru, India</span>
            <span>DPDP Act, 2023 Compliant</span>
          </div>
        </div>
      </div>
    </>
  );
}
