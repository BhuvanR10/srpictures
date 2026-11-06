import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import MainButton from '../components/MainButton';
import { WHATSAPP_GET_IN_TOUCH_URL } from '../lib/whatsapp';
import RollNumber from '../components/RollNumber';
import SocialLinks from '../components/SocialLinks';
import Subtitle from '../components/Subtitle';
import Video from '../components/Video';
import AboutVideoCard from '../components/AboutVideoCard';
import { usePageSeo } from '../lib/usePageSeo';

export default function About() {
  usePageSeo({
    title: 'About the Studio & Philosophy',
    description: 'Learn about The SR Pictures story, our craft philosophy, and our journey capturing milestone celebrations and cinematic moments.',
  });
  return (
    <>
    <div id="top" className="top"></div>
    <header className="section-about-header relative overflow-hidden min-h-[90vh] flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Video className="background-video" poster="/assets/692764d4fd31a6bc0c913752_12566516_3840_2160_30fps_poster.0000000.jpg" src="/assets/692764d4fd31a6bc0c913752_12566516_3840_2160_30fps_mp4.mp4" priority />
        <div className="video-opacity"></div>
      </div>

      {/* Main Content Area (Title on Left, Video Cards with Cinematic Background on Right) */}
      <div className="relative z-10 padding-global pt-24 pb-8 sm:pt-32 sm:pb-12 flex-1 flex flex-col justify-center">
        <div className="container-large w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <Subtitle>About Us</Subtitle>
              <div className="mt-3">
                <h1
                  className="font-logo-clean font-light uppercase tracking-tight text-white leading-tight"
                  style={{
                    fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
                    lineHeight: 1.15,
                    backgroundImage: 'linear-gradient(180deg, #FFFFFF 40%, #A0A0A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  We are
                  <br />
                  The SR Pictures®
                </h1>
              </div>
              <p className="text-size-regular text-neutral-300 mt-5 max-w-sm font-light leading-relaxed">
                Capturing raw emotion, milestone celebrations, and bespoke visual narratives with timeless cinematic craft.
              </p>
            </div>

            {/* Right Column: Video Cards with Interesting Cinematic Background */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl group/stage">
                {/* Hardware-accelerated ambient glows using native radial gradients (zero filter lag) */}
                <div
                  className="absolute -top-12 -left-12 w-80 h-80 pointer-events-none -z-10 opacity-70"
                  style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.03) 45%, transparent 70%)' }}
                />
                <div
                  className="absolute -bottom-12 -right-12 w-80 h-80 pointer-events-none -z-10 opacity-70"
                  style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, rgba(6, 182, 212, 0.03) 45%, transparent 70%)' }}
                />

                {/* Cinematic Anamorphic Horizon Streak */}
                <div className="absolute top-1/2 -left-8 -right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />

                {/* Obsidian Showcase Stage (High-performance solid dark plate, zero GPU blur stall) */}
                <div className="relative rounded-[2rem] p-4 sm:p-6 lg:p-7 bg-[#0b0b0e]/95 border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.9)] overflow-hidden transition-colors duration-300 hover:border-white/20">
                  
                  {/* Subtle Camera Viewfinder HUD Accents */}
                  <div className="absolute top-3.5 left-4.5 flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-neutral-400/80 uppercase pointer-events-none select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                    <span>REC [ 4K RAW ]</span>
                  </div>
                  <div className="absolute top-3.5 right-4.5 text-[9px] font-mono tracking-widest text-neutral-400/70 uppercase pointer-events-none select-none">
                    <span>24.00 FPS • SHUTTER 180°</span>
                  </div>
                  
                  {/* Viewfinder Corner Framing Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />

                  {/* The 2 Video Cards Side by Side */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-5">
                    <AboutVideoCard
                      src="/assets/about/about-reel-01.mp4"
                      poster="/assets/about/about-reel-01-poster.jpg"
                      driveId="1gRMYN1MkKlqQ3wOIBLKVA6v2MiQjKagS"
                    />
                    <AboutVideoCard
                      src="/assets/about/about-reel-02.mp4"
                      poster="/assets/about/about-reel-02-poster.jpg"
                      driveId="10B6lbxEfqFtU9hpXkNtkgBcfZsHVHWXT"
                    />
                  </div>

                  {/* Bottom Viewfinder HUD Status Bar */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono tracking-wider text-neutral-400/60 pointer-events-none select-none">
                    <span>SR CINE CORE // 35MM OPTICS</span>
                    <span className="hidden sm:inline">ISO 100 • WB 5600K</span>
                    <span className="text-white/40">AUDIO MASTERED</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Down & Location */}
      <div className="relative z-10 padding-global pb-6 pt-2">
        <div className="container-large">
          <div className="w-layout-grid header-content-grid">
            <a
              href="#about-intro"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about-intro')?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="w-node-bfdf0234-6824-ff40-5de2-30f215e92924-805165a6"
              className="scroll-down-wrap group cursor-pointer select-none text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl p-1 -m-1 transition-all"
              aria-label="Scroll down to about story"
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
              <div className="header-text group-hover:text-white transition-colors duration-200">SCROLL DOWN</div>
            </a>
            <div id="w-node-bfdf0234-6824-ff40-5de2-30f215e9292e-805165a6" className="location-wrap">
              <div className="header-text">BASED IN BENGALURU, INDIA</div>
              <div className="location-icon w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-global pb-4">
        <div className="container-large">
          <div className="dividing-line"></div>
        </div>
      </div>
    </header>

    <section id="about-intro" className="section-about-intro">
      <div className="intro-opacity"></div>
      <div className="intro-background about-page">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="intro-content-wrapper">
                <div className="intro-container">
                  <div className="intro-content-block">
                    <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures star emblem" className="star-icon" />
                    <div className="text-align-center">
                      <p className="text-size-large">Founded in 2018 in Bengaluru, The SR Pictures is a premier photography and cinematography studio driven by storytelling, light, and visual craft. Our mission is to transform life’s most precious moments and brand visions into timeless cinematic experiences.</p>
                    </div>
                    <div className="w-layout-grid number-grid">
                      <div id="w-node-_48358447-0a1d-98cc-8d59-5e29e61537ac-805165a6" className="number-block _01">
                        <RollNumber prefix="+" singleDigit={true} value="+8" />
                        <div className="text-size-regular">Years of Experience</div>
                      </div>
                      <div id="w-node-_48358447-0a1d-98cc-8d59-5e29e61537dc-805165a6" className="number-block _02">
                        <RollNumber suffix="%" value="99%" />
                        <div className="text-size-regular">Client Satisfaction</div>
                      </div>
                    </div>
                    <SocialLinks />
                    <MainButton to={WHATSAPP_GET_IN_TOUCH_URL}>Get in touch</MainButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-opacity is-bottom"></div>
    </section>

    <section className="section-about-process">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="w-layout-grid top-content-grid">
              <div id="w-node-c598fa92-4359-fee7-5361-ee957e150c89-805165a6" className="heading-wrap">
                <Subtitle>Production Steps</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">Work</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Process</h2>
                  </div>
                </div>
              </div>
              <div id="w-node-c598fa92-4359-fee7-5361-ee957e150c96-805165a6" className="content-item">
                <MainButton to="/contact">Contact us</MainButton>
              </div>
            </div>
            <div className="spacer-xlarge"></div>
            <div className="process-component">
              <div className="w-layout-grid process-component-grid">
                <div className="process-content-wrap _01">
                  <div className="process-content">
                    <div className="process-number">01</div>
                    <div className="process-title-wrap">
                      <h2 className="heading-style-h4">{"Concept &"}</h2>
                      <h2 className="heading-style-h4">Planning</h2>
                    </div>
                    <div className="spacer-medium"></div>
                    <p className="text-size-medium text-color-secondary">We begin by understanding your brand, goals, and audience. This phase includes creative brainstorming, script development, and visual planning to ensure a clear direction before production starts.</p>
                  </div>
                </div>
                <div className="process-content-wrap _02">
                  <div className="process-content">
                    <div className="process-number">02</div>
                    <div className="process-title-wrap">
                      <h2 className="heading-style-h4">Production</h2>
                      <h2 className="heading-style-h4">{"& Filming"}</h2>
                    </div>
                    <div className="spacer-medium"></div>
                    <p className="text-size-medium text-color-secondary">Our team captures high-quality footage using professional equipment and cinematic techniques. Every shot is carefully directed to translate the concept into visually compelling scenes.</p>
                  </div>
                </div>
                <div className="process-content-wrap _03">
                  <div className="process-content">
                    <div className="process-number">03</div>
                    <div className="process-title-wrap">
                      <h2 className="heading-style-h4">{"Editing &"}</h2>
                      <h2 className="heading-style-h4">Delivery</h2>
                    </div>
                    <div className="spacer-medium"></div>
                    <p className="text-size-medium text-color-secondary">We refine the footage through advanced editing, color grading, and sound design. The final video is delivered in optimized formats, ready to perform across digital platforms.</p>
                  </div>
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
