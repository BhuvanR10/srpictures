import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Subtitle from './Subtitle';
import MainButton from './MainButton';

export interface ServiceItem {
  num: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    num: '01',
    title: 'Weddings',
    slug: 'wedding',
    tagline: '▶︎ Cinematic love stories',
    description: 'Comprehensive wedding photography and cinematic 4K films that capture every sacred ritual, heartfelt tear, and joyous celebration.',
    image: '/assets/1Y9A5246.jpg',
  },
  {
    num: '02',
    title: 'Pre-Wedding',
    slug: 'pre-wedding',
    tagline: '▶︎ Romantic outdoor & concept narratives',
    description: "Tailored pre-wedding portraits and cinematic teaser videos shot across Bengaluru's most scenic destinations.",
    image: '/assets/RSD_8118.jpg',
  },
  {
    num: '03',
    title: 'Car Delivery',
    slug: 'car-delivery',
    tagline: '▶︎ Milestone vehicle reveals & reels',
    description: 'High-octane delivery films capturing the excitement, surprise keys handover, and family celebration of your dream vehicle.',
    image: '/assets/testimonials/testimonial-5-poster.jpg',
  },
  {
    num: '04',
    title: 'Maternity',
    slug: 'maternity',
    tagline: '▶︎ Celebrating new beginnings',
    description: 'Graceful, intimate maternity and baby shower photography preserving the precious anticipation of parenthood.',
    image: '/assets/RSD_8625.jpg',
  },
  {
    num: '05',
    title: 'Commercials',
    slug: 'commercials',
    tagline: '▶︎ Brand & industrial storytelling',
    description: 'High-impact commercial films, industrial production showcases, and corporate visual campaigns crafted for maximum presence.',
    image: '/assets/testimonials/testimonial-3-poster.jpg',
  },
  {
    num: '06',
    title: 'Portraits & Family',
    slug: 'portraits',
    tagline: '▶︎ Timeless milestones & legacies',
    description: 'Vibrant, candid coverage of family milestones, birthdays, anniversaries, and executive editorial portraits.',
    image: '/assets/RSD_1969.jpg',
  },
];

export default function VideoServicesSection() {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);

  return (
    <section className="section-home-service relative">
      {/* SECTION HEADER */}
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-top padding-xhuge">
            <div className="w-layout-grid top-content-grid">
              <div id="w-node-eb7233a9-2256-2e88-f36a-0cb6ca0392d0-805165a1" className="heading-wrap">
                <Subtitle>Our Solutions</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">Video</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Services</h2>
                  </div>
                </div>
              </div>
              <div id="w-node-_41c40c61-fc21-de03-d653-91a5d71e76a4-805165a1" className="content-item">
                <MainButton to="/services">All Services</MainButton>
              </div>
            </div>
            <div className="spacer-medium"></div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. MOBILE & TABLET PHONE INTERFACE (< 992px)              */}
      {/* High-impact visual cards with instant category navigation */}
      {/* ========================================================= */}
      <div className="block lg:hidden padding-global pb-16">
        <div className="container-large">
          <div className="flex flex-col gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                to={`/category/${service.slug}`}
                className="group block bg-[#141416] border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 active:scale-[0.98] hover:border-white/20"
              >
                {/* Visual Preview Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-300 bg-black/70 px-2.5 py-1 rounded backdrop-blur-md border border-white/10 uppercase">
                      {service.num}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider text-white bg-black/70 px-3 py-1 rounded backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                      Explore <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Subtitle Tagline on Image bottom */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-mono text-neutral-300 tracking-wide uppercase">
                      {service.tagline}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-cinema-sub text-xl sm:text-2xl font-semibold text-white tracking-wide uppercase flex items-center justify-between">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span className="text-neutral-400">Cinematography & Stills</span>
                    <span className="text-white font-medium group-hover:underline">
                      View Portfolio →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP INTERFACE (>= 992px)                           */}
      {/* Retains the signature interactive Webflow marquee ticker  */}
      {/* ========================================================= */}
      <div className="hidden lg:block service-container">
        <div className="service-content-wrap">
          <div className="padding-global">
            <div className="container-large">
              <div className="service-component">
                <div className="service-wrapper">
                  {servicesData.map((service, idx) => (
                    <div key={service.slug}>
                      <div className="dividing-line"></div>
                      <Link
                        to={`/category/${service.slug}`}
                        className="service-content-item block cursor-pointer group"
                        onMouseEnter={() => setActiveDesktopIndex(idx)}
                      >
                        <div className="w-layout-grid service-content-grid items-center">
                          <div className="service-title-wrap">
                            <h2 className="service-title">
                              <span className="service-icon">{"◉"}</span>
                              {" "}{service.title}
                            </h2>
                            <h2 className="service-title">
                              <span className="service-icon">{"◉"}</span>
                              {" "}{service.title}
                            </h2>
                            <h2 className="service-title text-color-grey">
                              <span className="service-icon">{"◉"}</span>
                              {" "}{service.title}
                            </h2>
                          </div>
                          <div className="service-description-wrap">
                            <div className="service-subitle">{service.tagline}</div>
                            <p className="service-description">{service.description}</p>
                          </div>
                        </div>
                        <div className="service-image-item">
                          <img src={service.image} alt={service.title} className="service-thumbnail" />
                        </div>
                      </Link>
                    </div>
                  ))}
                  <div className="dividing-line"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop background images with smooth active index opacity */}
          <div className="service-image-wrapper">
            <div className="service-image-opacity"></div>
            {servicesData.map((service, idx) => (
              <img
                key={service.slug}
                alt={service.title}
                src={service.image}
                className="service-bg-image transition-opacity duration-700 pointer-events-none"
                style={{
                  opacity: activeDesktopIndex === idx ? 1 : 0,
                  zIndex: activeDesktopIndex === idx ? 1 : 0,
                }}
              />
            ))}
            <div className="service-overlay-image"></div>
            <div className="service-image-opacity bottom-opacity"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

