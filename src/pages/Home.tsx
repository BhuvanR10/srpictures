import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import GallerySection from '../components/GallerySection';
import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import Faq from '../components/Faq';
import MainButton from '../components/MainButton';
import PartnerGrid from '../components/PartnerGrid';
import SocialLinks from '../components/SocialLinks';
import Subtitle from '../components/Subtitle';
import TestimonialSlider from '../components/TestimonialSlider';
import Video from '../components/Video';
import VideoServicesSection from '../components/VideoServicesSection';
import { usePageSeo } from '../lib/usePageSeo';

export default function Home() {
  usePageSeo({
    title: 'Cinematic Wedding & Commercial Studio',
    description: 'Premier photography and cinematography studio based in Bengaluru. Crafting authentic, cinematic stories with natural light and high-end cine optics.',
  });

  const headerRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const userWantsSoundRef = useRef(false);

  // Keep ref synchronized for immediate access inside listeners
  userWantsSoundRef.current = isSoundEnabled;

  // Sound plays ONLY when the user explicitly enabled it AND the hero section is in view
  const effectiveMuted = !isSoundEnabled || !isHeroInView;

  // Automatically silence sound when scrolling away from hero, and resume when scrolling back
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsHeroInView(inView);

        const v = heroVideoRef.current || document.querySelector<HTMLVideoElement>('.section-home-header video');
        if (!v) return;

        if (!inView) {
          // Immediately mute audio when user leaves the hero section
          v.muted = true;
          v.setAttribute('muted', '');
        } else if (userWantsSoundRef.current) {
          // Automatically restore audio when re-entering the hero section
          v.muted = false;
          v.volume = 1.0;
          v.removeAttribute('muted');
          const p = v.play();
          if (p !== undefined) {
            p.catch(() => {});
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(header);

    // Also auto-pause audio when user switches tabs or minimizes browser
    const handleVisibilityChange = () => {
      const v = heroVideoRef.current || document.querySelector<HTMLVideoElement>('.section-home-header video');
      if (!v) return;

      if (document.hidden) {
        v.muted = true;
        v.setAttribute('muted', '');
      } else if (userWantsSoundRef.current && isHeroInView) {
        v.muted = false;
        v.volume = 1.0;
        v.removeAttribute('muted');
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isHeroInView]);

  const toggleHeroMute = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let v = heroVideoRef.current;
    if (!v) {
      v = document.querySelector<HTMLVideoElement>('.section-home-header video');
      if (v) heroVideoRef.current = v;
    }

    const nextSoundEnabled = !isSoundEnabled;
    userWantsSoundRef.current = nextSoundEnabled;
    setIsSoundEnabled(nextSoundEnabled);

    if (v) {
      if (nextSoundEnabled && isHeroInView) {
        v.muted = false;
        v.volume = 1.0;
        v.removeAttribute('muted');
        const p = v.play();
        if (p !== undefined) {
          p.catch((err) => {
            console.warn('Playback error upon unmute:', err);
          });
        }
      } else {
        v.muted = true;
        v.setAttribute('muted', '');
      }
    }
  };

  const handleHeroTap = (e: React.MouseEvent) => {
    // If the click originated from an interactive link or button, let that element handle its own event
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    toggleHeroMute(e);
  };

  const handleScrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <div id="top" className="top"></div>
    <header
      ref={headerRef}
      onClick={handleHeroTap}
      className="section-home-header cursor-pointer select-none"
      title="Tap anywhere to mute / unmute audio"
    >
      <div className="w-layout-grid header-component-grid">
        <div id="w-node-cd060b03-ce5d-09c9-ac8d-89dcbc0c13eb-805165a1" className="background-video-wrapper relative w-full h-full overflow-hidden">
          <Video
            className="background-video !opacity-95"
            poster="/assets/hero-cinematic-poster-v3.jpg"
            src="/assets/hero-bg-720p-v3.mp4"
            desktopSrc="/assets/hero-bg-1080p-v3.mp4"
            priority
            muted={effectiveMuted}
            onVideoRef={(node) => {
              heroVideoRef.current = node;
            }}
          />
          <div className="video-opacity pointer-events-none"></div>
        </div>

        {/* Compact, Refined Brand Title & Tagline (Non-obstructive) */}
        <div
          id="w-node-_6b2e6d2c-c1f7-7cdc-d3b5-95a983e74de7-805165a1"
          className="z-10 flex flex-col items-center justify-center text-center px-4 select-none pointer-events-none"
        >
          <div className="flex flex-col items-center justify-center max-w-xl">
            {/* Brand Title (Inline styles guarantee no Webflow 12rem h1 override) */}
            <div
              role="heading"
              aria-level={1}
              className="font-logo-clean font-light tracking-[0.22em] sm:tracking-[0.28em] text-white uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)] whitespace-nowrap"
              style={{
                fontSize: 'clamp(1.2rem, 3.2vw, 2.3rem)',
                lineHeight: 1.2,
                fontWeight: 300,
              }}
            >
              The SR Pictures
            </div>

            {/* Subtle Metallic Lens Accent Line */}
            <div className="flex items-center gap-2.5 sm:gap-3 my-2 sm:my-2.5 opacity-70">
              <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D8D8D5]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8D8D5] shadow-[0_0_8px_rgba(242,241,235,0.7)]" />
              <div className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D8D8D5]" />
            </div>

            {/* Official Studio Tagline */}
            <p
              className="font-mono tracking-[0.22em] sm:tracking-[0.28em] text-[#D8D8D5] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{
                fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              }}
            >
              Every Frame Tells A Story
            </p>
          </div>
        </div>

        <div id="w-node-a6327672-a489-8e8e-89e9-2601a1ceeff9-805165a1" className="padding-global">
          <div className="container-large">
            <div className="w-layout-grid header-content-grid">
              <a
                href="#gallery"
                onClick={handleScrollToGallery}
                id="w-node-a6327672-a489-8e8e-89e9-2601a1cef006-805165a1"
                className="scroll-down-wrap group cursor-pointer select-none text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl p-1 -m-1 transition-all"
                aria-label="View portfolio - scroll down to gallery"
              >
                <div className="scroll-down-block transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] group-active:scale-95">
                  <div className="arrow-down w-embed transition-transform duration-300 group-hover:translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
                    </svg>
                  </div>
                  <div className="scroll-down-border"></div>
                  <div className="border-wrap">
                    <div className="glow-border scroll-down"></div>
                  </div>
                  <div className="scroll-down-background"></div>
                  <div className="scroll-down-background _02"></div>
                </div>
                <div className="header-text font-mono text-[11px] tracking-[0.24em] uppercase text-neutral-400 group-hover:text-white transition-colors duration-200">
                  VIEW PORTFOLIO
                </div>
              </a>

              {/* Interactive Audio Controls & Studio Location Cluster */}
              <div
                id="w-node-a6327672-a489-8e8e-89e9-2601a1ceeffc-805165a1"
                className="flex flex-col items-end justify-end gap-3 select-none pointer-events-auto z-30"
              >
                {/* High-Visibility Cinematic Mute / Unmute Toggle Button */}
                <button
                  type="button"
                  onClick={toggleHeroMute}
                  aria-label={isSoundEnabled ? 'Mute cinematic video soundtrack' : 'Unmute cinematic video soundtrack'}
                  className="group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black/85 hover:bg-black/95 border border-white/25 hover:border-white/60 text-white backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.15)] transition-all duration-300 pointer-events-auto cursor-pointer active:scale-95"
                >
                  {!isSoundEnabled ? (
                    <>
                      <VolumeX className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors" />
                      <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] uppercase text-neutral-200 group-hover:text-white transition-colors">
                        SOUND OFF
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      </span>
                      <Volume2 className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors animate-pulse" />
                      <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] uppercase text-emerald-300 group-hover:text-white transition-colors">
                        SOUND ON
                      </span>
                    </>
                  )}
                </button>

                {/* Studio Location Badge */}
                <div className="location-wrap !m-0 !p-0">
                  <div className="header-text font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                    BASED IN BENGALURU, INDIA
                  </div>
                  <div className="location-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
      <section className="section-home-partner">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="dividing-line"></div>
              <div className="partner-wrapper">
                <div className="subtitle-wrap text-color-alternate">
                  <div className="text-style-allcaps">
                    <div className="text-size-regular text-align-center">
                      Our Valued Partners
                      <br />
                    </div>
                  </div>
                </div>
                <PartnerGrid />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-home-intro">
        <div className="intro-opacity"></div>
        <div className="intro-background">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="intro-content-wrapper">
                  <div className="intro-container">
                    <div className="intro-content-block">
                      <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures Star Icon" className="star-icon" />
                      <div className="text-align-center">
                        <p className="text-size-large">{"We craft cinematic visual experiences that blend storytelling, photography, and high-end cinematography. Based in Bengaluru, we capture timeless weddings, evocative portraits, and commercial narratives that stand the test of time ™."}</p>
                      </div>
                      <SocialLinks />
                      <MainButton to="/about">About Us</MainButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="intro-opacity is-bottom"></div>
      </section>
      <section className="section-home-projects" id="gallery">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid top-content-grid">
                <div id="w-node-a34212dd-4694-ed9f-e5b4-34cde67cdd13-805165a1" className="heading-wrap">
                  <Subtitle>Capturing Moments, Creating Memories</Subtitle>
                  <div className="title-wrapper">
                    <div className="top-title">
                      <h2 className="heading-style-h2">Studio</h2>
                    </div>
                  </div>
                  <div className="title-wrapper">
                    <div className="bottom-title">
                      <h2 className="heading-style-h2">Gallery</h2>
                    </div>
                  </div>
                </div>
                <div id="w-node-_43f5e317-c160-f6d4-e9e7-62114ae2cf9a-805165a1" className="content-item">
                  <MainButton to="/contact">Book a Shoot</MainButton>
                </div>
              </div>
              <div className="spacer-huge"></div>
              <GallerySection />
            </div>
            <div className="dividing-line"></div>
          </div>
        </div>
      </section>
      <VideoServicesSection />
      <section className="section-home-testimonial">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid top-content-grid">
                <div id="w-node-_5ff8cede-17dc-e41f-3894-39badfa11c0f-805165a1" className="heading-wrap">
                  <Subtitle>Testimonials</Subtitle>
                  <div className="title-wrapper">
                    <div className="top-title">
                      <h2 className="heading-style-h2">Client</h2>
                    </div>
                  </div>
                  <div className="title-wrapper">
                    <div className="bottom-title">
                      <h2 className="heading-style-h2">Stories</h2>
                    </div>
                  </div>
                </div>
                <div id="w-node-_5ff8cede-17dc-e41f-3894-39badfa11c18-805165a1" className="content-item">
                  <MainButton to="/contact">Share Feedback</MainButton>
                </div>
              </div>
              <div className="spacer-xlarge"></div>
              <TestimonialSlider withDivider />
            </div>
            <div className="dividing-line"></div>
          </div>
        </div>
      </section>
      <section className="section-home-pricing">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid top-content-grid">
                <div id="w-node-_072086c7-c350-009a-e9b2-16293ebef924-805165a1" className="heading-wrap">
                  <Subtitle>Bengaluru Packages</Subtitle>
                  <div className="title-wrapper">
                    <div className="top-title">
                      <h2 className="heading-style-h2">Wedding</h2>
                    </div>
                  </div>
                  <div className="title-wrapper">
                    <div className="bottom-title">
                      <h2 className="heading-style-h2">Cinema</h2>
                    </div>
                  </div>
                </div>
                <div id="w-node-_072086c7-c350-009a-e9b2-16293ebef92d-805165a1" className="content-item">
                  <MainButton to="/pricing">All Packages</MainButton>
                </div>
              </div>
              <div className="spacer-xlarge"></div>
              <div className="w-layout-grid package-component-grid">
                <div id="w-node-_28ea525f-125d-38fb-5355-ec1f6c3bb978-6c3bb977" className="package-content-block">
                  <div className="package-content">
                    <div className="spacer-xsmall"></div>
                    <div className="text-size-regular">{"◉ Flagship Wedding Inclusions"}</div>
                    <div className="spacer-xlarge"></div>
                    <div className="dark-line"></div>
                    <div className="spacer-medium"></div>
                    <div className="pricing-feature-wrap">
                      <div className="pricing-feature-item">
                        <div className="check-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                          </svg>
                        </div>
                        <div className="text-size-regular">4K Cinematic Wedding Highlights &amp; Teaser</div>
                      </div>
                      <div className="pricing-feature-item">
                        <div className="check-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                          </svg>
                        </div>
                        <div className="text-size-regular">Candid &amp; Traditional Photography Coverage</div>
                      </div>
                      <div className="pricing-feature-item">
                        <div className="check-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                          </svg>
                        </div>
                        <div className="text-size-regular">Licensed 4K Drone Aerial Cinematography</div>
                      </div>
                      <div className="pricing-feature-item">
                        <div className="check-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                          </svg>
                        </div>
                        <div className="text-size-regular">12x36 Flush-Mount Lay-Flat Photobook (40 Sheets)</div>
                      </div>
                      <div className="pricing-feature-item">
                        <div className="check-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                          </svg>
                        </div>
                        <div className="text-size-regular">All Master Color-Graded High-Res Deliverables</div>
                      </div>
                      <div className="pricing-feature-item">
                        <div className="check-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                          </svg>
                        </div>
                        <div className="text-size-regular">Dedicated Multi-Camera Bengaluru Crew</div>
                      </div>
                    </div>
                    <div className="spacer-xlarge"></div>
                    <div className="dark-line"></div>
                    <div className="feature-spacer"></div>
                    <div className="pricing-feature-item">
                      <div className="refund-icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                        </svg>
                      </div>
                      <div className="text-size-regular text-color-secondary">Free pre-shoot consultation &amp; date lock</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-grid package-content-grid">
                  <div className="package-content-block">
                    <div className="package-content">
                      <div className="w-layout-grid package-inner-grid">
                        <div id="w-node-_28ea525f-125d-38fb-5355-ec1f6c3bb9a4-6c3bb977" className="package-top-content">
                          <div className="package-content-item">
                            <div className="client-rating-wrap">
                              <div className="client-rating-block">
                                <img alt="The SR Pictures bride" src="/assets/1Y9A5246-1024x683.jpg" className="client-avatar _01" />
                                <img alt="The SR Pictures couple" src="/assets/RSD_8118-1024x683.jpg" className="client-avatar _02" />
                                <img alt="The SR Pictures wedding" src="/assets/RSD_8625-1024x683.jpg" className="client-avatar _03" />
                                <img alt="The SR Pictures celebration" src="/assets/RSD_1969-1024x683.jpg" className="client-avatar _05" />
                              </div>
                              <div className="rating-block">
                                <div className="star-rating-block">
                                  {[...Array(5)].map((_, i) => (
                                    <div className="star-rating w-embed" key={i}>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                      </svg>
                                    </div>
                                  ))}
                                  <div className="text-size-regular">4.9/5</div>
                                </div>
                                <div className="text-size-regular text-color-secondary">+500 Weddings &amp; Events in Bengaluru</div>
                              </div>
                            </div>
                            <div className="horizontal-flex">
                              <div className="text-size-medium">{"◉"}</div>
                            </div>
                          </div>
                          <div className="spacer-small"></div>
                          <div className="dark-line"></div>
                          <div className="spacer-small"></div>
                          <div className="price-wrap">
                            <div className="price-block">
                              <div className="price-text">₹95,000</div>
                              <h2 className="prcing-title">₹75,000</h2>
                            </div>
                            <div className="text-size-small">/ Wedding Celebration</div>
                          </div>
                        </div>
                        <div id="w-node-_28ea525f-125d-38fb-5355-ec1f6c3bb9c5-6c3bb977" className="benefit-wrapper">
                          <div className="benefit-block">
                            <div className="text-size-regular">
                              <span className="text-weight-semibold">{"◉ 4K Cinema Quality"}</span>
                              {" "}{"– Multi-angle Sony FX cinema rigs."}
                            </div>
                            <div className="text-size-regular">
                              <span className="text-weight-semibold">{"◉ Candid Emotion"}</span>
                              {"– Natural, unscripted heartfelt moments."}
                            </div>
                            <div className="text-size-regular">
                              <span className="text-weight-semibold">{"◉ Heirloom Albums"}</span>
                              {"– Handcrafted lay-flat luster photobooks."}
                            </div>
                            <div className="text-size-regular">
                              <span className="text-weight-semibold">{"◉ Express Delivery"}</span>
                              {"– 48h Instagram teaser &amp; high-res drive link."}
                            </div>
                          </div>
                        </div>
                        <div className="dark-line"></div>
                        <div id="w-node-_28ea525f-125d-38fb-5355-ec1f6c3bb9d8-6c3bb977" className="text-size-small text-color-secondary">* Complete two-day wedding package covering Muhurtham, Sangeet &amp; Reception. Customizable for destination celebrations across India.</div>
                      </div>
                    </div>
                  </div>
                  <div id="w-node-_28ea525f-125d-38fb-5355-ec1f6c3bb9da-6c3bb977" className="price-button">
                    <MainButton to="/pricing">Explore Pricing</MainButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="dividing-line"></div>
          </div>
        </div>
      </section>
      <section className="section-home-faq">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid top-content-grid">
                <div id="w-node-_73007bf9-a6a5-b8c1-d09b-e685e82f2699-805165a1" className="heading-wrap">
                  <Subtitle>FAQ</Subtitle>
                  <div className="title-wrapper">
                    <div className="top-title">
                      <h2 className="heading-style-h2">Quick</h2>
                    </div>
                  </div>
                  <div className="title-wrapper">
                    <div className="bottom-title">
                      <h2 className="heading-style-h2">Answers</h2>
                    </div>
                  </div>
                </div>
                <div id="w-node-_73007bf9-a6a5-b8c1-d09b-e685e82f26a2-805165a1" className="content-item">
                  <h2 className="section-number">(05)</h2>
                </div>
              </div>
              <div className="spacer-huge"></div>
              <div className="w-layout-grid faq-component-grid">
                <div id="w-node-_80cdd5d4-83de-212e-7301-7549c244ec6a-805165a1" className="faq-content-item">
                  <div className="w-layout-grid faq-inner-grid">
                    <div id="w-node-_270e5455-6755-e850-480f-06df2889e542-805165a1" className="faq-content">
                      <Faq />
                    </div>
                    <div id="w-node-d06d764a-ce0a-76de-ae95-dfdb00da3d8e-805165a1" className="faq-content">
                      <div className="question-block">
                        <div className="text-size-regular">{"◉ Need more details?"}</div>
                        <MainButton to="/contact">Ask a Question</MainButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="w-node-f5a565df-c147-ec12-4eaf-8f97c7c9d0ab-805165a1" className="faq-content-item">
                  <div className="faq-image-wrap">
                    <img src="/assets/1Y9A5246-1024x683.jpg" alt="The SR Pictures Wedding Photography" className="faq-image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="dividing-line"></div>
          </div>
        </div>
      </section>
      <section className="call-to-action">
        <div className="circle-opacity is-left"></div>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top padding-xhuge">
              <div className="heading-wrap is-center">
                <Subtitle>Start Project</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">{"Let’s"}</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Produce</h2>
                  </div>
                </div>
              </div>
              <div className="spacer-huge"></div>
            </div>
          </div>
        </div>
        <CtaWrapper />
        <div className="circle-opacity is-right"></div>
        <div className="cta-content-wrap">
          <CtaButton to="/contact">Book a call</CtaButton>
        </div>
      </section>
    </>
  );
}
