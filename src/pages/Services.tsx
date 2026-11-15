import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Plane,
  Heart,
  Car,
  Palmtree,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import Subtitle from '../components/Subtitle';
import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import { usePageSeo } from '../lib/usePageSeo';
import { WHATSAPP_PHONE, WHATSAPP_GET_IN_TOUCH_URL } from '../lib/whatsapp';

interface ServiceCard {
  id: string;
  num: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  exploreLink: string;
  pricingLink?: string;
  highlights: string[];
  icon: LucideIcon;
}

const SERVICES_LIST: ServiceCard[] = [
  {
    id: 'weddings',
    num: '01',
    category: 'CINEMA & CANDID',
    title: 'Luxury Wedding Cinema & Photography',
    tagline: 'Timeless Indian love stories captured with cinema-grade depth',
    description:
      'Comprehensive wedding photography and cinematic 4K films that capture every sacred muhurtham ritual, heartfelt tear, and grand sangeet celebration. Multi-camera coverage with seamless storytelling.',
    image: '/assets/categories/wedding/wedding-01.webp',
    exploreLink: '/category/wedding',
    pricingLink: '/pricing',
    icon: Heart,
    highlights: [
      'Multi-operator 4K Sony FX cinema rigs',
      'Candid & traditional portraiture',
      'Cinematic teaser reel + full wedding film',
      'Handcrafted lay-flat flush-mount photo album',
    ],
  },
  {
    id: 'car-delivery',
    num: '02',
    category: 'AUTOMOTIVE CEREMONY',
    title: 'Car Delivery Shoots & Automotive Reels',
    tagline: 'Showroom unveilings, key handovers, and high-energy 4K reels',
    description:
      'Celebrate your proudest milestone with cinematic showroom delivery moments in Bengaluru. Unveiling celebrations, family portraits, rolling highway tracking, and high-impact 4K reels.',
    image: '/assets/car_delivery/car-delivery-02.webp',
    exploreLink: '/category/car-delivery',
    pricingLink: '/pricing',
    icon: Car,
    highlights: [
      'Silk cloth unveiling & key handover coverage',
      'Family & individual milestone portraits',
      'Dynamic 4K Instagram reels with trending audio',
      'Fast turnaround within 24–48 hours',
    ],
  },
  {
    id: 'resorts',
    num: '03',
    category: 'HOSPITALITY & ESTATES',
    title: 'Resort & Luxury Hospitality Films',
    tagline: 'Architectural walkthroughs and ambient destination narratives',
    description:
      'High-end promotional films, villa walkthroughs, and sweeping landscape cinematography for luxury resorts, boutique hotels, and private vacation retreats in Coorg, Chikmagalur, Kabini, Ooty, and Goa.',
    image: '/assets/categories/resort/resort-01.webp',
    exploreLink: '/category/resort',
    icon: Palmtree,
    highlights: [
      'Architectural interior & exterior walkthroughs',
      'Sunrise & sunset golden hour lighting capture',
      'Guest lifestyle experience storytelling',
      '4K 60fps website & social media deliverables',
    ],
  },
  {
    id: 'pre-wedding',
    num: '04',
    category: 'ROMANTIC NARRATIVES',
    title: 'Pre-Wedding & Couple Story Shoots',
    tagline: 'Natural chemistry and scenic outdoor visual journeys',
    description:
      'Stylized outdoor portraiture and romantic narrative films before the big day. Set against scenic lakes, heritage temples, forest roads, and luxury private getaways across South India.',
    image: '/assets/categories/pre_wedding/pre_wedding-01.webp',
    exploreLink: '/category/pre-wedding',
    icon: Sparkles,
    highlights: [
      'Stylized cinematic couple narrative',
      'Creative lighting & wardrobe guidance',
      'Drone aerial sweeps in picturesque locations',
      'Teaser film for wedding invitation reveals',
    ],
  },
  {
    id: 'drone-aerials',
    num: '05',
    category: 'AERIAL PERSPECTIVES',
    title: '4K Aerial Drone Cinematography',
    tagline: 'DGCA-compliant certified high-altitude 4K visual sweeps',
    description:
      'Ultra-smooth aerial surveys and bird’s-eye perspectives for grand destination venues, outdoor ceremonies, and automotive tracking. Engineered with dual-frequency GPS-stabilized drones.',
    image: '/assets/drone-wedding-aerials.webp',
    exploreLink: '/categories',
    icon: Plane,
    highlights: [
      'DGCA compliant certified drone operation',
      '4K 60fps HDR high-bitrate aerial capture',
      'Smooth cinematic reveals & dynamic tracking',
      'Seamless multi-angle live event integration',
    ],
  },
  {
    id: 'commercials',
    num: '06',
    category: 'BRAND STORYTELLING',
    title: 'Commercials & Corporate Productions',
    tagline: 'High-impact brand showcases, factory tours, and executive media',
    description:
      'Compelling commercial films, industrial production showcases, corporate event coverage, and executive editorial portraits crafted to elevate your enterprise presence across digital platforms.',
    image: '/assets/categories/commercials/commercials-01.webp',
    exploreLink: '/category/commercials',
    icon: Building2,
    highlights: [
      'Brand narrative & product commercial films',
      'Industrial infrastructure & facility showcases',
      'Leadership & executive editorial headshots',
      'Color-graded for cinema & broadcast standards',
    ],
  },
];



export default function Services() {
  usePageSeo({
    title: 'Photography & Cinematography Services | The SR Pictures Bengaluru',
    description:
      'Explore core services by The SR Pictures: Wedding Cinema & Candid Photography, Car Delivery Shoots, Resort Promotional Films, Pre-Wedding Shoots, and 4K Aerial Drone Coverage across Bengaluru & South India.',
    keywords:
      'The SR Pictures services, wedding cinematography Bengaluru, car delivery shoot Bangalore, resort films Karnataka, pre-wedding shoot Bangalore, drone photography Bangalore, commercial videography',
    canonicalPath: '/services',
    schemaJson: {
      '@type': 'ItemList',
      name: 'The SR Pictures Production Services',
      itemListElement: SERVICES_LIST.map((s, idx) => ({
        '@type': 'Service',
        position: idx + 1,
        name: s.title,
        description: s.description,
        provider: {
          '@type': 'PhotographyStudio',
          name: 'The SR Pictures',
        },
      })),
    },
  });

  return (
    <>
      <div id="top" className="top"></div>

      {/* Hero Header */}
      <header className="pt-28 sm:pt-36 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle Ambient Backlight Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="padding-global">
          <div className="container-large">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <Subtitle>Production Services • Bengaluru Studio</Subtitle>

              <div className="title-wrapper mt-3">
                <div className="top-title">
                  <h1 className="heading-style-h2 !text-[clamp(2.5rem,7vw,5.5rem)] !leading-[1.05]">
                    Our
                  </h1>
                </div>
                <div className="bottom-title">
                  <h1 className="heading-style-h2 !text-[clamp(2.5rem,7vw,5.5rem)] !leading-[1.05]">
                    Services
                  </h1>
                </div>
              </div>

              <p className="mt-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
                Bespoke cinematography and photography engineered for timeless wedding films,
                automotive unveilings, luxury resort showcases, and commercial storytelling. Every frame
                crafted with cinema-grade optics and natural color fidelity.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                    'Hello The SR Pictures, I would like to inquire about your photography & cinematography services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-wider uppercase transition-all shadow-xl"
                >
                  <span>Book On WhatsApp</span>
                  <span>→</span>
                </a>

                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs tracking-wider uppercase transition-all"
                >
                  <span>View Pricing &amp; Packages</span>
                </Link>

                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs tracking-wider uppercase transition-all"
                >
                  <span>Visual Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Core Services Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="padding-global">
          <div className="container-large">
            <div className="flex flex-col gap-10 sm:gap-14">
              {SERVICES_LIST.map((service, index) => {
                const IconComponent = service.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative rounded-3xl bg-neutral-900/60 border border-white/10 hover:border-white/25 transition-all duration-500 overflow-hidden shadow-2xl group"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 p-6 sm:p-10 lg:p-12 items-center ${
                        isEven ? '' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Left: Content Info */}
                      <div className={`lg:col-span-7 flex flex-col justify-center ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                        {/* Service Metadata Pill */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-xs text-amber-300/90 font-bold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                            {service.num}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                            {service.category}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="!text-xl sm:!text-2xl lg:!text-3xl !font-extrabold text-white tracking-tight !leading-tight group-hover:text-amber-100 transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base font-medium text-amber-200/80">
                          {service.tagline}
                        </p>

                        {/* Description */}
                        <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                          {service.description}
                        </p>

                        {/* Feature Highlights Grid */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {service.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                              <CheckCircle2 size={15} className="text-amber-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                          <Link
                            to={service.exploreLink}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                          >
                            <span>Explore Portfolio</span>
                            <ArrowUpRight size={14} />
                          </Link>

                          {service.pricingLink && (
                            <Link
                              to={service.pricingLink}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs tracking-wider uppercase transition-all"
                            >
                              <span>View Pricing</span>
                            </Link>
                          )}

                          <a
                            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                              `Hello The SR Pictures, I am interested in inquiring about ${service.title}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white px-4 py-2.5 rounded-full transition-colors ml-auto"
                          >
                            <span>Inquire via WhatsApp</span>
                            <span>→</span>
                          </a>
                        </div>
                      </div>

                      {/* Right: Full-Bleed Photograph Showcase (100% natural colors) */}
                      <div className={`lg:col-span-5 relative ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                        <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl">
                          <img
                            src={service.image}
                            alt={service.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          {/* Gentle edge vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Floating Category Icon Badge */}
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                            <IconComponent size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Let's Produce Call To Action */}
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
