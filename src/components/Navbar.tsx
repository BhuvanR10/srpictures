import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EASE, gsap } from '../lib/gsap';
import MainButton from './MainButton';
import { WHATSAPP_GET_IN_TOUCH_URL } from '../lib/whatsapp';

function NavLinkItem({ to, label, dropdown }: { to: string; label: string; dropdown?: boolean }) {
  const { pathname } = useLocation();
  const current = to === pathname;
  return (
    <div className="nav-overflow">
      <Link to={to} className={`nav-link w-inline-block${current ? ' w--current' : ''}`} aria-current={current ? 'page' : undefined}>
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
  const firstMenu = useRef(true);
  const firstDrop = useRef(true);
  const q = <T extends HTMLElement>(s: string) => root.current!.querySelector<T>(s)!;

  // Dropdown (a-23 / a-24)
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

  // Mobile overlay menu (a-26 / a-27)
  useLayoutEffect(() => {
    if (firstMenu.current) {
      firstMenu.current = false;
      return;
    }

    // Never hide nav-content on desktop (min-width: 992px)
    if (window.innerWidth >= 992) {
      const content = q('.nav-content');
      if (content) gsap.set(content, { opacity: 1, clearProps: 'all' });
      return;
    }

    const nav = q('.navigation');
    const bg = q('.nav-background');
    const content = q('.nav-content');
    const top = q('.menu-line.top');
    const mid = q('.menu-line.middle');
    const bot = q('.menu-line.bottom');
    const wrap = q('.menu-button-wrap');
    gsap.killTweensOf([nav, bg, content, top, mid, bot, wrap]);

    if (menuOpen) {
      gsap.set([nav, bg], { display: 'block' });
      gsap.set(bg, { yPercent: -100 });
      gsap.set(content, { opacity: 0 });
      const tl = gsap.timeline();
      tl.to(bg, { yPercent: 0, duration: 0.8, ease: EASE.inOutQuint }, 0)
        .to(mid, { xPercent: 110, duration: 0.35, ease: EASE.inOutQuint }, 0)
        .to(top, { y: 5, duration: 0.35, ease: EASE.inOutQuint }, 0.25)
        .to(bot, { y: -5, duration: 0.35, ease: EASE.inOutQuint }, 0.25)
        .to(wrap, { scale: 0.75, duration: 0.35, ease: EASE.ease }, 0.25)
        .to(content, { opacity: 1, duration: 0.35, ease: EASE.ease }, 0.4);
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([nav, bg], { clearProps: 'display' });
          if (window.innerWidth >= 992) {
            gsap.set(content, { opacity: 1, clearProps: 'all' });
          }
        },
      });
      tl.to(wrap, { scale: 1, duration: 0.25, ease: EASE.ease }, 0)
        .to([top, bot], { y: 0, duration: 0.25, ease: EASE.inOutQuint }, 0)
        .to(content, { opacity: 0, duration: 0.35, ease: EASE.ease }, 0)
        .to(bg, { yPercent: -100, duration: 0.5, ease: EASE.inOutQuint }, 0.15)
        .to(mid, { xPercent: 0, duration: 0.25, ease: EASE.inOutQuint }, 0.3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropOpen(false); }
    };
    const onResize = () => {
      if (window.innerWidth >= 992 && menuOpen) {
        setMenuOpen(false);
        const r = root.current;
        if (r) r.querySelectorAll<HTMLElement>('.navigation,.nav-background,.nav-content,.menu-line,.menu-button-wrap').forEach((el) => gsap.set(el, { clearProps: 'all' }));
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [menuOpen]);

  const hoverOk = useCallback(() => window.matchMedia('(min-width: 992px) and (hover: hover)').matches, []);

  return (
    <div ref={root} data-collapse="medium" role="banner" className={`navbar w-nav ${menuOpen ? 'menu-is-open' : ''}`}>
      <div className="padding-global">
        <div className="container-large">
          <div className="w-layout-grid nav-grid">
            <Link to="/" id="w-node-_4c12a36c-20bd-7490-ee52-70b57bcb2c02-7bcb2bfe" className="brand-link w-inline-block" aria-label="The SR Pictures home">
              <div className="brand-wrap">
                <div className="logo-wrap">
                  <img src="/assets/srpictures-logo-clean.png" alt="The SR Pictures" className="logo" />
                  <img src="/assets/srpictures-logo-clean.png" alt="" aria-hidden="true" className="logo" />
                </div>
                <div className="dot"></div>
              </div>
            </Link>
            <div id="w-node-_4c12a36c-20bd-7490-ee52-70b57bcb2c0b-7bcb2bfe" className="nav-component-wrapper">
              <nav role="navigation" aria-label="Main" className="navigation w-nav-menu">
                <div className="nav-content">
                  <NavLinkItem to="/" label="Home" />
                  <NavLinkItem to="/about" label="About" />
                  <NavLinkItem to="/services" label="Services" />
                  <NavLinkItem to="/case-studies" label="Gallery" />
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
                            <span className="nav-link w-inline-block">
                              <div className="nav-wrap">
                                <div className="nav-text">More</div>
                                <div className="nav-text hover" aria-hidden="true">More</div>
                              </div>
                            </span>
                          </div>
                          <div ref={icon} className="dropdown-icon w-icon-dropdown-toggle" aria-hidden="true"></div>
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
              <div id="w-node-_4c12a36c-20bd-7490-ee52-70b57bcb2c4a-7bcb2bfe" className="nav-button-wrapper">
                <div className="nav-button-block">
                  <MainButton to={WHATSAPP_GET_IN_TOUCH_URL}>Get in touch</MainButton>
                </div>
              </div>
            </div>
            <div
              id="w-node-_4c12a36c-20bd-7490-ee52-70b57bcb2c4e-7bcb2bfe"
              className={`menu-button w-nav-button${menuOpen ? ' w--open' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMenuOpen((v) => !v); }
              }}
            >
              <div className="menu-button-wrapper">
                <div className="menu-button-container">
                  <div className="menu-button-block">
                    <div className="menu-button-wrap">
                      <div className="menu-line-item"><div className="menu-line top"></div></div>
                      <div className="menu-line-item"><div className="menu-line middle"></div></div>
                      <div className="menu-line-item"><div className="menu-line bottom"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
