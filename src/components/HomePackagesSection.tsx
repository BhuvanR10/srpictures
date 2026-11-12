import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, ArrowUpRight, Sparkles, Star } from 'lucide-react';
import Subtitle from './Subtitle';
import MainButton from './MainButton';
import { WHATSAPP_PHONE } from '../lib/whatsapp';

export interface StartingPackageItem {
  id: string;
  num: string;
  category: string;
  packageName: string;
  startingPrice: string;
  priceNote: string;
  fullRange: string;
  duration: string;
  badge: string;
  isPopular?: boolean;
  idealFor: string;
  highlights: string[];
  image: string;
  pricingAnchor: string;
  teamSummary: string;
}

export const CORE_STARTING_PACKAGES: StartingPackageItem[] = [
  {
    id: 'car-delivery',
    num: '01',
    category: 'Car Delivery',
    packageName: 'Delivery Reel',
    startingPrice: '₹8,000',
    priceNote: 'Starting Package',
    fullRange: 'Starting from ₹8,000 · Custom Tiers Available',
    duration: 'Up to 1 hour',
    badge: 'ENTRY LEVEL',
    idealFor: 'Punchy, stylish Instagram delivery reel capturing showroom handover & family celebration.',
    highlights: [
      '1 Cinematic 4K Instagram Reel (30–60s in 9:16 vertical)',
      'Up to 1 hour professional showroom coverage',
      'Key handover and family celebration moments',
      'Creative exterior & interior reveal angles',
      'Curated background music & cinematic color grading',
    ],
    image: '/assets/car_delivery/car-delivery-02.jpg',
    pricingAnchor: '/pricing#car-delivery',
    teamSummary: '1 Dedicated Cinema Videographer',
  },
  {
    id: 'wedding',
    num: '02',
    category: 'Weddings',
    packageName: 'Essential Wedding',
    startingPrice: '₹79,999',
    priceNote: 'Starting Package',
    fullRange: 'Starting from ₹79,999 · Inquire for High-End Packages',
    duration: 'Up to 8 hours / day',
    badge: 'FLAGSHIP STARTING',
    isPopular: true,
    idealFor: 'Complete dual-team photo & cinema coverage for intimate to grand wedding celebrations.',
    highlights: [
      '4-Artist Dual Crew (2 Photographers + 2 Videographers)',
      '4K Cinematic Wedding Highlight Film (4–6 min)',
      'Full HD Traditional Complete Wedding Video',
      '12×30 or 12×36 Premium Lay-Flat Album (30 Sheets / 60 Pages)',
      '300–400 Professionally Edited High-Res Deliverables',
    ],
    image: '/assets/1Y9A5246.jpg',
    pricingAnchor: '/pricing#wedding',
    teamSummary: '4-Artist Crew (2 Photo + 2 Video)',
  },
  {
    id: 'couple',
    num: '03',
    category: 'Couples',
    packageName: 'Couple Memories',
    startingPrice: '₹24,999',
    priceNote: 'Starting Package',
    fullRange: 'Starting from ₹24,999 · Inquire for High-End Packages',
    duration: '3–4 hours · Single Location',
    badge: 'ENTRY LEVEL',
    idealFor: 'Scenic romantic outdoor photoshoot, candid couple portraits & cinematic teaser.',
    highlights: [
      '1 Professional Photographer + 1 Cinematic Videographer',
      '30–50 Master Retouched High-Resolution Photographs',
      '1 Cinematic Couple Film (2–3 minutes in 4K)',
      '1 Cinematic Instagram Reel (30–60 seconds)',
      'Posing, styling & Bengaluru location scouting guidance',
    ],
    image: '/assets/RSD_8118.jpg',
    pricingAnchor: '/pricing#couple',
    teamSummary: '1 Photographer + 1 Cinematographer',
  },
  {
    id: 'resort',
    num: '04',
    category: 'Resorts',
    packageName: 'Resort Essentials',
    startingPrice: '₹29,999',
    priceNote: 'Starting Package',
    fullRange: 'Starting from ₹29,999 · Inquire for High-End Packages',
    duration: '4–5 hours · Single Resort',
    badge: 'COMMERCIAL ENTRY',
    idealFor: 'Boutique resorts, homestays, and eco-retreats needing sharp promotional stills & brand film.',
    highlights: [
      '1 Professional Commercial Photographer + 1 Videographer',
      '40–50 Professionally Edited Commercial Stills',
      '1 Cinematic 4K Resort Showcase Film (2–3 minutes)',
      '1 Instagram Promotional Reel (vertical 4K)',
      'Interiors, exteriors, dining, and property amenity coverage',
    ],
    image: '/assets/categories/resort/resort-04.webp',
    pricingAnchor: '/pricing#resort',
    teamSummary: '1 Commercial Photographer + 1 Videographer',
  },
];

export const FILTER_PILLS = [
  { id: 'car-delivery', num: '01', category: 'Car Delivery', price: '₹8,000' },
  { id: 'wedding', num: '02', category: 'Weddings', price: '₹79,999' },
  { id: 'couple', num: '03', category: 'Couples', price: '₹24,999' },
  { id: 'resort', num: '04', category: 'Resorts', price: '₹29,999' },
  { id: 'drone', num: '05', category: 'Drone', price: '₹8,000' },
];

export default function HomePackagesSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getWhatsAppBookingUrl = (pkgName: string, categoryTitle: string, price: string) => {
    const text = [
      'Hello The SR Pictures! 📸',
      `I am inquiring about booking the *${pkgName}* (${categoryTitle}) - ${price}.`,
      'Could you please share your date availability and booking procedure?',
    ].join('\n\n');
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const isCoreSelected = CORE_STARTING_PACKAGES.some((p) => p.id === selectedFilter);

  return (
    <section className="section-home-pricing relative bg-[#050507] pt-14 sm:pt-20 lg:pt-24">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large pt-8 sm:pt-12">
            
            {/* SECTION HEADER */}
            <div className="w-layout-grid top-content-grid">
              <div id="w-node-_072086c7-c350-009a-e9b2-16293ebef924-805165a1" className="heading-wrap">
                <Subtitle>Bengaluru Packages · Starting Rates</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2 text-white">Starting</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2 text-white">Packages</h2>
                  </div>
                </div>
              </div>
              <div id="w-node-_072086c7-c350-009a-e9b2-16293ebef92d-805165a1" className="content-item">
                <MainButton to="/pricing">All Packages</MainButton>
              </div>
            </div>

            <div className="spacer-medium"></div>

            {/* QUICK CATEGORY SWITCHER PILLS (BULLETPROOF HIGH-CONTRAST) */}
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 pt-1 border-b border-white/10">
              {/* All Packages Pill */}
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                data-active-pill={selectedFilter === 'all' ? 'true' : 'false'}
                className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'all'
                    ? 'filter-pill-active font-bold shadow-md'
                    : 'bg-[#18181c] text-neutral-300 hover:text-white hover:bg-[#25252b] border border-white/15'
                }`}
              >
                <span className={selectedFilter === 'all' ? 'text-white font-bold' : 'text-neutral-300'}>
                  All Packages
                </span>
              </button>

              {/* 5 Specific Package Pills */}
              {FILTER_PILLS.map((tab) => {
                const isSelected = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedFilter(tab.id)}
                    data-active-pill={isSelected ? 'true' : 'false'}
                    className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'filter-pill-active font-bold shadow-md'
                        : 'bg-[#18181c] text-neutral-300 hover:text-white hover:bg-[#25252b] border border-white/15'
                    }`}
                  >
                    <span className={isSelected ? 'text-amber-400 font-bold' : 'text-neutral-500'}>
                      {tab.num}.
                    </span>
                    <span className={isSelected ? 'text-white font-bold' : 'text-neutral-300'}>
                      {tab.category}
                    </span>
                    <span className={isSelected ? 'text-amber-300/90 font-medium ml-1' : 'text-neutral-400 ml-1'}>
                      · {tab.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="spacer-large"></div>

            {/* 1. CORE 4 STARTING PACKAGES DISPLAY (When All or specific core category is active) */}
            {(selectedFilter === 'all' || isCoreSelected) && (
              <div
                className={`grid gap-6 ${
                  selectedFilter === 'all'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 max-w-2xl mx-auto'
                }`}
              >
                {CORE_STARTING_PACKAGES.filter(
                  (pkg) => selectedFilter === 'all' || selectedFilter === pkg.id
                ).map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`home-package-card relative overflow-hidden rounded-2xl border transition-all duration-500 group flex flex-col justify-between ${
                      pkg.isPopular
                        ? 'border-white/35 bg-[#121217] shadow-2xl shadow-black ring-1 ring-white/20'
                        : 'border-white/15 bg-[#0f0f13] hover:border-white/30 shadow-xl shadow-black/60'
                    }`}
                  >
                    {/* Top Visual Preview Frame */}
                    <div>
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                        <img
                          src={pkg.image}
                          alt={`${pkg.category} - ${pkg.packageName}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/50 to-transparent" />

                        {/* Floating Category & Duration Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-bold bg-black/90 text-white border border-white/25 backdrop-blur-md">
                            {pkg.num}. {pkg.category}
                          </span>
                          {pkg.isPopular && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold bg-amber-400 text-black border border-amber-300 flex items-center gap-1 shadow-md">
                              <Sparkles className="w-2.5 h-2.5 fill-black" />
                              POPULAR
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium text-neutral-100 bg-black/85 border border-white/20 backdrop-blur-sm">
                            {pkg.duration}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Header */}
                      <div className="p-5 sm:p-6 pb-2">
                        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                          <span className="text-amber-300 font-semibold">{pkg.badge}</span>
                          <span className="text-neutral-300">{pkg.teamSummary}</span>
                        </div>

                        {/* Package Name (Balanced typography that never truncates) */}
                        <div className="package-card-title text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mt-2 mb-0 group-hover:text-amber-200 transition-colors">
                          {pkg.packageName}
                        </div>

                        <p className="text-sm text-neutral-200 mt-2.5 leading-relaxed line-clamp-2">
                          {pkg.idealFor}
                        </p>

                        {/* Starting Price Box */}
                        <div className="mt-4 pt-3.5 border-t border-white/15 flex items-baseline justify-between">
                          <div>
                            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                              {pkg.priceNote}
                            </div>
                            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-tight mt-0.5">
                              {pkg.startingPrice}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-mono text-neutral-300">
                              {pkg.fullRange}
                            </div>
                          </div>
                        </div>

                        {/* Key Inclusions Highlights */}
                        <div className="mt-4 pt-3.5 border-t border-white/15">
                          <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-2.5 flex items-center gap-1.5">
                            <span>Key Inclusions:</span>
                          </div>
                          <ul className="space-y-2.5 text-sm text-neutral-100">
                            {pkg.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 leading-snug">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="font-normal">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Actions: Prominent View More Packages Button */}
                    <div className="p-5 sm:p-6 pt-4 border-t border-white/15 mt-5 flex flex-col gap-2.5">
                      <Link
                        to={pkg.pricingAnchor}
                        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-white/20 active:scale-[0.98]"
                      >
                        <span>View More Packages</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>

                      <a
                        href={getWhatsAppBookingUrl(pkg.packageName, pkg.category, pkg.startingPrice)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white text-xs font-mono uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. FULL-WIDTH DRONE CINEMATOGRAPHY BANNER CARD (Placed directly after Resort cards or when Drone tab is active) */}
            {(selectedFilter === 'all' || selectedFilter === 'drone') && (
              <div className={selectedFilter === 'all' ? 'mt-8' : ''}>
                <div
                  id="home-drone"
                  className="w-full relative overflow-hidden rounded-2xl border border-white/15 bg-[#141416] p-6 sm:p-8 lg:p-10 group shadow-2xl shadow-black/80"
                >
                  {/* Aerial Drone Background Image */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                      src="/assets/categories/resort/resort-01.webp"
                      alt="Drone Aerial Cinematography"
                      loading="lazy"
                      className="w-full h-full object-cover object-right sm:object-center opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/90 via-55% to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="/assets/695c47e4e7da0bba805165b3_star-icon.svg"
                          alt="SR Pictures emblem"
                          className="star-icon inline-block w-4 h-4"
                        />
                        <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                          05. AERIAL PERSPECTIVE · 3–4 HOURS DURATION
                        </span>
                      </div>
                      <h3 className="heading-style-h3 text-white m-0">
                        Drone Cinematography
                      </h3>
                      <div className="spacer-tiny"></div>
                      <p className="text-size-regular text-color-secondary m-0">
                        Elevate your visuals with breathtaking 4K aerial shots. Sweeping reveals, vehicle rolling sequences, outdoor venue geography, and sunset landscape coverage.
                      </p>
                      
                      <div className="dark-line my-4"></div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-neutral-300">
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>Duration: 3–4 Hours on-site flight coverage</div>
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>4K 60fps high dynamic range capture</div>
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>Sweeping reveals, rolling shots &amp; overheads</div>
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>Included in Luxury Wedding &amp; Grand Resort</div>
                      </div>

                      <div className="spacer-small"></div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        * Drone availability depends on location permissions, DGCA airspace restrictions, and local weather safety.
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <div className="text-left lg:text-right">
                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                          Coverage Package · 3–4 Hours
                        </div>
                        <div className="text-3xl sm:text-4xl font-mono font-bold text-white mb-2">
                          ₹8,000
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link
                          to="/pricing#drone"
                          className="px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-white/20 active:scale-[0.98]"
                        >
                          <span>View in Pricing</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </Link>
                        <a
                          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello The SR Pictures! 📸 I would like to inquire about Drone Cinematography coverage (₹8,000 · 3–4 Hours).')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                          <span>Inquire Drone</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Reset Button if single filter active */}
            {selectedFilter !== 'all' && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedFilter('all')}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
                >
                  ← Show All 5 Starting Packages
                </button>
              </div>
            )}

            {/* TRUST & GUARANTEE BANNER */}
            <div className="spacer-xlarge"></div>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#08080a] border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="client-rating-block shrink-0">
                  <img alt="The SR Pictures bride" src="/assets/1Y9A5246-1024x683.jpg" className="client-avatar _01" />
                  <img alt="The SR Pictures couple" src="/assets/RSD_8118-1024x683.jpg" className="client-avatar _02" />
                  <img alt="The SR Pictures wedding" src="/assets/RSD_8625-1024x683.jpg" className="client-avatar _03" />
                  <img alt="The SR Pictures celebration" src="/assets/RSD_1969-1024x683.jpg" className="client-avatar _05" />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="text-white font-mono text-sm font-bold ml-1.5">4.9 / 5</span>
                  </div>
                  <div className="text-xs text-neutral-300 mt-1">
                    Over 500+ weddings, vehicle unveils, resorts &amp; commercial productions captured across Bengaluru.
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  to="/pricing"
                  className="py-3 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-1.5 shadow-lg active:scale-[0.98]"
                >
                  Explore All 15+ Packages
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="spacer-large"></div>
          </div>
          <div className="dividing-line"></div>
        </div>
      </div>
    </section>
  );
}
