import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Film,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import Faq from '../components/Faq';
import MainButton from '../components/MainButton';
import Subtitle from '../components/Subtitle';
import TestimonialSlider from '../components/TestimonialSlider';
import { usePageSeo } from '../lib/usePageSeo';
import { WHATSAPP_PHONE } from '../lib/whatsapp';

interface PackageItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  badge?: string;
  isPopular?: boolean;
  idealFor: string;
  highlights: string[];
  cardBg?: string;
  team?: {
    photography?: string;
    videography?: string;
  };
  features: string[];
  coverage?: string;
}

interface PricingCategory {
  id: string;
  num: string;
  title: string;
  shortTitle: string;
  slug: string;
  priceRange: string;
  tagline: string;
  image: string;
  gallerySlug: string;
  packages: PackageItem[];
  droneUpgrade?: {
    title: string;
    price: string;
    description: string;
    features: string[];
    note: string;
  };
}

const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'car-delivery',
    num: '01',
    title: 'Car Delivery Cinematography',
    shortTitle: 'Car Delivery',
    slug: 'car-delivery',
    priceRange: '₹8,000 – ₹24,999',
    tagline: 'Milestone vehicle reveals, key handover ceremonies & cinematic reels.',
    image: '/assets/car_delivery/car-delivery-02.jpg',
    gallerySlug: 'car-delivery',
    packages: [
      {
        id: 'car-delivery-reel',
        name: 'Delivery Reel',
        price: '₹8,000',
        duration: 'Up to 1 hour',
        badge: 'ENTRY LEVEL',
        idealFor: 'Customers who want a punchy, stylish Instagram delivery reel for social media.',
        cardBg: '/assets/car_delivery/car-delivery-02.jpg',
        highlights: [
          '1 Cinematic Instagram Reel (30–60s)',
          'Up to 1 hour showroom coverage',
          'Key handover & reveal moments',
        ],
        features: [
          'Up to 1 hour of professional on-site coverage',
          'Professional car delivery videography',
          '1 cinematic Instagram reel (30–60 seconds in 9:16 vertical 4K)',
          'Creative exterior and interior reveal angles',
          'Key handover and family celebration moments',
          'Basic cinematic colour grading',
          'Curated background music & sound editing',
          'Raw footage not included',
        ],
      },
      {
        id: 'car-cinematic-delivery',
        name: 'Cinematic Delivery',
        price: '₹15,000',
        duration: '2–3 hours',
        badge: 'MOST RECOMMENDED',
        isPopular: true,
        idealFor: 'Complete dual-coverage experience with both cinematic 4K film and high-res photography.',
        cardBg: '/assets/car_delivery/car-delivery-05.jpg',
        highlights: [
          '4K Film (2–3 min) + 1 Instagram Reel',
          '20 Master Edited Photos + All Raw Photos',
          'Dedicated Videographer + Stills Photographer',
        ],
        team: {
          videography: '1 Dedicated Cinematic Videographer',
          photography: '1 Professional Stills Photographer',
        },
        features: [
          'Dedicated cinematic videographer & stills photographer',
          '4K cinematic delivery film (2–3 minutes)',
          '1 cinematic Instagram reel (30–60 seconds)',
          '20 professionally edited high-resolution photographs',
          'All usable raw photographs provided via Google Drive',
          'Car exterior, interior and macro detail shots',
          'Family candid moments, key handover & celebration',
          'Professional cinematic colour grading & audio mastering',
        ],
      },
      {
        id: 'car-signature-delivery',
        name: 'Signature Delivery',
        price: '₹24,999',
        duration: '3–4 hours',
        badge: 'PREMIUM EXPERIENCE',
        idealFor: 'Collector unveilings, luxury automotive reveals, and flagship milestone celebrations.',
        cardBg: '/assets/car_delivery/car-delivery-12.jpg',
        highlights: [
          '4K Master Film (3–4 min) + 2 Reels',
          '30 Master Edited Photos + All Raw Photos',
          'Dedicated Videographer + Candid Photographer',
        ],
        team: {
          videography: '1 Dedicated Cinematic Videographer',
          photography: '1 Dedicated Candid Photographer',
        },
        features: [
          'Dedicated cinematic videographer + candid photographer',
          '4K cinematic delivery film (3–4 minutes)',
          '2 cinematic Instagram reels (vertical format)',
          '30 professionally edited luxury photographs',
          'All usable raw high-resolution photographs',
          'Creative car detail, showroom and lifestyle shots',
          'Advanced multi-node colour grading & sound design',
          'Priority post-production & expedited delivery',
        ],
      },
    ],
    droneUpgrade: {
      title: 'Drone Cinematography Upgrade',
      price: '+₹5,000',
      description: 'Sweeping 4K aerials capturing the showroom reveal, overhead tracking, and exit drive.',
      features: [
        'Aerial vehicle tracking and overhead reveal shots',
        'Showroom and location establishing visuals',
        'Cinematic overhead and dynamic rolling footage',
        'Professionally edited 4K drone sequences',
      ],
      note: 'Premium package with drone: ₹29,999. Drone operations subject to local airspace clearances and weather.',
    },
  },
  {
    id: 'wedding',
    num: '02',
    title: 'Wedding Photography & Films',
    shortTitle: 'Weddings',
    slug: 'wedding',
    priceRange: '₹79,999 – ₹1,69,999',
    tagline: 'Cinematic wedding films, candid storytelling & handcrafted lay-flat heirloom albums.',
    image: '/assets/1Y9A5246.jpg',
    gallerySlug: 'wedding',
    packages: [
      {
        id: 'wedding-essential',
        name: 'Essential Wedding',
        price: '₹79,999',
        duration: 'Up to 8 hours / day',
        badge: 'RECOMMENDED STARTING',
        idealFor: 'Intimate ceremonies and couples looking for complete dual-team photo & cinema coverage.',
        cardBg: '/assets/categories/wedding/wedding-01.webp',
        highlights: [
          '4-Artist Crew (2 Photo + 2 Video)',
          '4K Wedding Highlight Film (4–6 min)',
          '12×30 or 12×36 Lay-Flat Album (30 Sheets)',
        ],
        team: {
          photography: '1 Traditional Photographer + 1 Candid Photographer',
          videography: '1 Traditional Videographer + 1 Cinematic Videographer',
        },
        features: [
          'Traditional and candid wedding photography',
          '4K cinematic wedding highlight film (4–6 minutes)',
          'Full HD traditional complete wedding video',
          '12×30 or 12×36 inch premium lay-flat album (30 sheets / 60 pages)',
          '300–400 professionally edited high-res photographs',
          'All final edited photographs in print-ready resolution',
          'Cinematic colour grading and professional audio editing',
          'Online digital delivery through Google Drive',
          '1 short wedding teaser / Instagram reel',
        ],
        coverage: 'Wedding & reception, or two mutually agreed wedding functions (up to 8 hours per day).',
      },
      {
        id: 'wedding-signature',
        name: 'Signature Wedding',
        price: '₹1,09,999',
        duration: 'Up to 9 hours / day',
        badge: 'MOST RECOMMENDED · BEST VALUE',
        isPopular: true,
        idealFor: 'Comprehensive weddings seeking expanded candid coverage, 2 reels, and a 40-sheet photobook.',
        cardBg: '/assets/1Y9A5246.jpg',
        highlights: [
          '5-Artist Crew (3 Photo + 2 Video)',
          '4K Film (5–7 min) + 2 Instagram Reels',
          'Premium Lay-Flat Album (40 Sheets / 80 Pages)',
        ],
        team: {
          photography: '1 Traditional Photographer + 2 Candid Photographers',
          videography: '1 Traditional Videographer + 1 Cinematic Videographer',
        },
        features: [
          '4K Cinematic Wedding Film (5–7 minutes)',
          'Full HD Traditional Wedding Video',
          '2 Instagram Reels / wedding teasers',
          '500–600 professionally edited photographs',
          '1 Premium 12×30 or 12×36 inch Lay-Flat Album (40 Sheets Photobook)',
          'All final edited photographs in high resolution',
          'Professional cinematic colour grading',
          'Online digital delivery with cloud backup',
        ],
        coverage: 'Wedding + Reception / Sangeet (up to 9 hours per day).',
      },
      {
        id: 'wedding-luxury',
        name: 'Luxury Wedding',
        price: '₹1,69,999',
        duration: 'Two Full Days (9 hrs/day)',
        badge: 'COMPLETE EXPERIENCE',
        idealFor: 'Grand multi-day weddings requiring complete five-artist cinema crew, 2 albums, and drone visuals.',
        cardBg: '/assets/categories/wedding/wedding-03.webp',
        highlights: [
          'Two Full Days Coverage · 5 Artists',
          '2 Premium Lay-Flat Albums (40 Sheets each)',
          'Drone Cinematography Included',
        ],
        team: {
          photography: '1 Traditional Photographer + 2 Candid Photographers',
          videography: '1 Traditional Videographer + 2 Cinematic Videographers',
        },
        features: [
          '4K Cinematic Wedding Film (8–10 minutes)',
          'Full HD Traditional Wedding Film',
          '3 Cinematic Instagram Reels',
          '700–800 professionally edited photographs',
          '2 Premium 12×30 or 12×36 inch Lay-Flat Albums (40 Sheets per album)',
          'Drone Cinematography included (subject to permissions)',
          'Dedicated couple portraits and family portraits',
          'Professional cinematic colour grading and sound design',
          'Priority teaser editing within 48–72 hours',
          'High-resolution digital delivery',
        ],
        coverage: 'Two wedding days / functions: Haldi, Mehendi, Sangeet, Wedding or Reception (up to 9 hours/day).',
      },
    ],
  },
  {
    id: 'couple',
    num: '03',
    title: 'Couple Photoshoots',
    shortTitle: 'Couples',
    slug: 'couple',
    priceRange: '₹24,999 – ₹49,999',
    tagline: 'Pre-wedding narratives, scenic romantic getaways & concept portraits.',
    image: '/assets/RSD_8118.jpg',
    gallerySlug: 'pre-wedding',
    packages: [
      {
        id: 'couple-memories',
        name: 'Couple Memories',
        price: '₹24,999',
        duration: '3–4 hours · Single Location',
        badge: 'ENTRY LEVEL',
        idealFor: 'Couples looking for an elegant, relaxed, and memorable single-location outdoor photoshoot.',
        cardBg: '/assets/categories/pre_wedding/pre_wedding-01.webp',
        highlights: [
          '30–50 Master Retouched Photos',
          '1 Cinematic 4K Film (2–3 min)',
          '1 Instagram Reel (30–60s)',
        ],
        team: {
          photography: '1 Professional Photographer',
          videography: '1 Cinematic Videographer',
        },
        features: [
          '1 Professional Photographer + 1 Cinematic Videographer',
          '30–50 professionally edited photographs',
          '1 cinematic couple film (2–3 minutes in 4K)',
          '1 Instagram reel (30–60 seconds)',
          'Creative couple portraits and candid moments',
          'Guidance on posing, styling, and location scouting',
          'Digital delivery of final photographs and videos',
        ],
      },
      {
        id: 'couple-signature',
        name: 'Signature Love Story',
        price: '₹34,999',
        duration: '5–6 hours · Up to 2 Locations',
        badge: 'SIGNATURE EXPERIENCE',
        isPopular: true,
        idealFor: 'Couples who want a complete concept narrative with multiple outfit changes across 2 locations.',
        cardBg: '/assets/RSD_8118.jpg',
        highlights: [
          '60–80 Master Edited Photos',
          '1 Cinematic 4K Film (3–4 min) + 2 Reels',
          'Up to 2 Locations & Outfit Changes',
        ],
        team: {
          photography: '1 Candid Photographer',
          videography: '1 Dedicated Cinematographer',
        },
        features: [
          '1 Candid Photographer + 1 Dedicated Cinematographer',
          '60–80 professionally edited photographs',
          '1 cinematic 4K film (3–4 minutes)',
          '2 Instagram reels',
          'Creative storytelling and couple portraits',
          'Multiple outfit changes',
          'Professional colour grading and sound design',
          'Online gallery and digital delivery',
        ],
      },
      {
        id: 'couple-grand',
        name: 'Grand Love Story',
        price: '₹49,999',
        duration: 'Full Day · Up to 2 Locations',
        badge: 'FULL-DAY COVERAGE',
        idealFor: 'Grand cinematic production with full-day coverage, scenic destination concepts, and aerial drone visuals.',
        cardBg: '/assets/categories/pre_wedding/pre_wedding-03.webp',
        highlights: [
          'Full Day Production · 100–120 Photos',
          '1 Cinematic 4K Film (4–5 min) + 3 Reels',
          'Drone Cinematography Included',
        ],
        team: {
          photography: '1 Professional Photographer',
          videography: '1 Dedicated Cinematographer',
        },
        features: [
          '1 Professional Photographer + 1 Dedicated Cinematographer',
          '100–120 professionally edited photographs',
          '1 cinematic 4K film (4–5 minutes)',
          '3 Instagram reels',
          'Drone cinematography included (subject to permissions)',
          'Advanced cinematic colour grading',
          'Creative storytelling and detailed couple portraits',
          'Multiple outfit changes',
          'Priority editing and delivery',
        ],
      },
    ],
  },
  {
    id: 'resort',
    num: '04',
    title: 'Resort & Hospitality Films',
    shortTitle: 'Resorts',
    slug: 'resort',
    priceRange: '₹29,999 – ₹89,999',
    tagline: 'Architectural showcases, hospitality promotional films & destination campaigns.',
    image: '/assets/categories/resort/resort-04.webp',
    gallerySlug: 'resort',
    packages: [
      {
        id: 'resort-essentials',
        name: 'Resort Essentials',
        price: '₹29,999',
        duration: '4–5 hours · Single Resort',
        badge: 'ENTRY LEVEL',
        idealFor: 'Boutique resorts, homestays, and eco-retreats needing sharp promotional stills and a brand film.',
        cardBg: '/assets/categories/resort/resort-02.webp',
        highlights: [
          '40–50 Retouched Commercial Stills',
          '1 Cinematic 4K Resort Film (2–3 min)',
          '1 Instagram Promotional Reel',
        ],
        team: {
          photography: '1 Professional Photographer',
          videography: '1 Cinematic Videographer',
        },
        features: [
          '1 Professional Photographer + 1 Cinematic Videographer',
          '40–50 edited photographs',
          '1 cinematic 4K resort film (2–3 minutes)',
          '1 Instagram promotional reel',
          'Rooms, interiors, exteriors and amenities',
          'Digital delivery',
        ],
      },
      {
        id: 'resort-signature',
        name: 'Resort Signature',
        price: '₹49,999',
        duration: 'Full Day · Single Resort',
        badge: 'MOST RECOMMENDED',
        isPopular: true,
        idealFor: 'Established resorts, hotels, and destination properties seeking full-day commercial lifestyle coverage.',
        cardBg: '/assets/categories/resort/resort-04.webp',
        highlights: [
          'Full Day Shoot · 70–80 Commercial Stills',
          '1 Cinematic 4K Film (3–4 min) + 3 Reels',
          'Dynamic 3-Axis Gimbal Cinematography',
        ],
        team: {
          photography: '1 Professional Photographer',
          videography: '1 Dedicated Cinematographer',
        },
        features: [
          '1 Professional Photographer + 1 Dedicated Cinematographer',
          '70–80 edited photographs',
          '1 cinematic 4K resort film (3–4 minutes)',
          '3 promotional Instagram reels',
          'Interior, exterior, amenities and lifestyle coverage',
          'Gimbal cinematography',
          'Professional colour grading and sound design',
          'Digital delivery',
        ],
      },
      {
        id: 'resort-grand',
        name: 'Resort Grand Experience',
        price: '₹89,999',
        duration: '2-Day Production',
        badge: 'PREMIUM PRODUCTION',
        idealFor: 'Luxury resort chains, 5-star properties, and hospitality brands requiring full 2-day aerial & lifestyle campaigns.',
        cardBg: '/assets/categories/resort/resort-01.webp',
        highlights: [
          '2-Day Complete Production · 100+ Stills',
          '1 Brand Master Film (4–6 min) + 5 Reels',
          'Drone Cinematography Included',
        ],
        team: {
          photography: '2 Professional Photographers',
          videography: '1 Dedicated Cinematographer',
        },
        features: [
          '2 Professional Photographers + 1 Dedicated Cinematographer',
          '100+ edited photographs',
          '1 cinematic 4K brand film (4–6 minutes)',
          '5 promotional Instagram reels',
          'Drone cinematography included (subject to permissions)',
          'Sunrise and sunset property coverage',
          'Rooms, dining, activities and lifestyle coverage',
          'Advanced cinematic colour grading',
          'Professional sound design',
          'Priority post-production',
        ],
      },
    ],
  },
];

export default function Pricing() {
  usePageSeo({
    title: 'Packages & Pricing | The SR Pictures',
    description:
      'Transparent photography & cinematography packages for weddings, car deliveries, couple photoshoots, and resort films in Bengaluru.',
  });

  // Default: View All
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const togglePackage = (pkgId: string) => {
    setExpandedPackage((prev) => (prev === pkgId ? null : pkgId));
  };

  const getWhatsAppBookingUrl = (pkgName: string, categoryTitle: string, price: string) => {
    const text = [
      'Hello The SR Pictures! 📸',
      `I am inquiring about booking the *${pkgName}* (${categoryTitle}) - ${price}.`,
      'Could you please share your date availability and booking procedure?',
    ].join('\n\n');
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById('pricing-categories-root');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div id="top" className="top"></div>

      {/* ========================================================= */}
      {/* 1. HERO HEADER                                            */}
      {/* ========================================================= */}
      <header className="section-service-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top-header">
              <div className="heading-wrap is-center">
                <Subtitle>Studio Investments</Subtitle>
                <div className="title-wrapper">
                  <h1 className="heading-style-h2 text-white m-0">Transparent</h1>
                </div>
                <div className="title-wrapper">
                  <h1 className="heading-style-h2 text-white m-0">Pricing</h1>
                </div>
              </div>
              <div className="spacer-small"></div>
              <div className="max-width-medium align-center">
                <div className="text-align-center">
                  <p className="text-size-medium text-color-secondary m-0">
                    Transparent pricing in INR (₹) across our 4 core visual specializations. Dedicated multi-camera crews, 4K Sony cinema lines, and handcrafted lay-flat heirloom photobooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. CATEGORY SELECTOR (View All FIRST, then Categories)    */}
      {/* ========================================================= */}
      <div
        id="pricing-categories-root"
        className="sticky top-16 sm:top-20 z-40 bg-[#080808]/95 backdrop-blur-xl border-y border-white/10 py-3 transition-all"
      >
        <div className="padding-global">
          <div className="container-large">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                
                {/* 1. VIEW ALL FIRST */}
                <button
                  type="button"
                  onClick={() => handleTabClick('all')}
                  className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                    activeTab === 'all'
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  View All
                </button>

                {/* 2. THEN PACKAGE CATEGORIES */}
                {PRICING_CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleTabClick(cat.id)}
                      className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-md'
                          : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className={isActive ? 'text-neutral-600 mr-1.5' : 'text-neutral-500 mr-1.5'}>
                        {cat.num}.
                      </span>
                      <span>{cat.shortTitle}</span>
                    </button>
                  );
                })}

                {/* 3. DRONE CINEMATOGRAPHY TAB */}
                <button
                  type="button"
                  onClick={() => handleTabClick('drone')}
                  className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                    activeTab === 'drone'
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={activeTab === 'drone' ? 'text-neutral-600 mr-1.5' : 'text-neutral-500 mr-1.5'}>
                    05.
                  </span>
                  <span>Drone</span>
                </button>
              </div>

              {/* Quick WhatsApp Assistance Link */}
              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span>Need custom quote?</span>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello Shashidhar! I need help choosing the right photography package for my upcoming event.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-neutral-300"
                >
                  Chat on WhatsApp →
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. CATEGORIES & PACKAGES (Enhanced Architecture)          */}
      {/* ========================================================= */}
      <section className="section-service-content pt-8 sm:pt-12">
        <div className="padding-global">
          <div className="container-large">
            <div className="space-y-16 sm:space-y-24">
              
              {/* DRONE TAB VIEW (When 'drone' tab is selected) */}
              {activeTab === 'drone' ? (
                <div className="scroll-mt-36">
                  <div
                    className="package-content-block relative overflow-hidden group"
                    style={{
                      padding: '2.5rem',
                      borderRadius: '1.25rem',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: '#0a0a0c',
                    }}
                  >
                    {/* Drone Aerial Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                      <img
                        src="/assets/categories/resort/resort-01.webp"
                        alt="Aerial Drone Cinematography"
                        className="w-full h-full object-cover object-right sm:object-center opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 via-50% to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-2">
                          <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures emblem" className="star-icon inline-block w-4 h-4" />
                          <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                            AERIAL PERSPECTIVE
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-300">
                          <div><span className="text-neutral-500 mr-2">{"◉"}</span>DGCA certified pilot &amp; safety protocols</div>
                          <div><span className="text-neutral-500 mr-2">{"◉"}</span>4K 60fps high dynamic range capture</div>
                          <div><span className="text-neutral-500 mr-2">{"◉"}</span>Available as +₹5,000 upgrade on single sessions</div>
                          <div><span className="text-neutral-500 mr-2">{"◉"}</span>Included in Luxury Wedding &amp; Grand Resort</div>
                        </div>
                        <div className="spacer-small"></div>
                        <div className="text-[11px] font-mono text-neutral-400">
                          * Drone availability depends on location permissions, DGCA airspace restrictions, and local weather safety.
                        </div>
                      </div>

                      <div className="shrink-0 text-left lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                          Standalone Add-On
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-4">
                          +₹5,000
                        </div>
                        <MainButton to={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello The SR Pictures! I would like to inquire about Drone Cinematography coverage.')}`}>
                          Inquire Drone
                        </MainButton>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* CATEGORIES LIST */
                PRICING_CATEGORIES
                  .filter((cat) => activeTab === 'all' || activeTab === cat.id)
                  .map((category) => (
                    <div
                      key={category.id}
                      id={category.id}
                      className="pricing-category-card scroll-mt-36"
                    >
                      {/* Category Header Bar with Category Cover & Metadata */}
                      <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10 border-b border-white/10 bg-[#080808] group">
                        {/* Matching Category Ambient Background */}
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                          <img
                            src={category.image}
                            alt=""
                            className="w-full h-full object-cover object-right sm:object-center opacity-80 group-hover:opacity-95 transition-all duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 via-50% to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          
                          {/* Left Info */}
                          <div className="lg:col-span-8">
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <span className="text-[11px] font-mono tracking-widest text-neutral-300 bg-white/10 px-3 py-1 rounded border border-white/10 uppercase">
                                {"◉"} CATEGORY {category.num}
                              </span>
                              <span className="text-xs font-mono text-neutral-400">
                                Investment: {category.priceRange}
                              </span>
                            </div>

                            <h3 className="pricing-cat-title text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              {category.title}
                            </h3>
                            <p className="text-sm text-neutral-200 font-light leading-relaxed mt-2 mb-0 max-w-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                              {category.tagline}
                            </p>
                          </div>

                          {/* Right Visual Snippet & Gallery Link */}
                          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-4">
                            <div className="w-28 h-18 sm:w-40 sm:h-24 rounded-lg overflow-hidden border border-white/30 shrink-0 relative shadow-2xl group-hover:border-white/50 transition-colors">
                              <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link
                              to={`/category/${category.gallerySlug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-neutral-200 hover:text-white transition-colors bg-black/60 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm"
                            >
                              <span>View Stills</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                        </div>
                      </div>

                      {/* 3 Package Tier Columns */}
                      <div className="p-6 sm:p-8 lg:p-10 bg-[#141416]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {category.packages.map((pkg) => {
                            const isExpanded = expandedPackage === pkg.id;

                            return (
                              <div
                                key={pkg.id}
                                className={`pricing-pkg-card relative overflow-hidden group flex flex-col justify-between ${
                                  pkg.isPopular ? 'is-popular ring-1 ring-white/20' : ''
                                }`}
                              >
                                {/* Matching Category Background Image for Card */}
                                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                                  <img
                                    src={pkg.cardBg || category.image}
                                    alt=""
                                    className="w-full h-full object-cover object-top sm:object-center opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#0b0b0e]/80 to-[#0b0b0e]/96" />
                                </div>

                                <div className="relative z-10 flex flex-col justify-between h-full">
                                  <div>
                                    {/* Badge & Duration Row */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                      {pkg.badge ? (
                                        <span
                                          className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded font-semibold shadow-md ${
                                            pkg.isPopular
                                              ? 'bg-white text-black'
                                              : 'bg-black/70 text-neutral-200 border border-white/20 backdrop-blur-sm'
                                          }`}
                                        >
                                          {pkg.badge}
                                        </span>
                                      ) : (
                                        <span />
                                      )}
                                      <span className="text-[11px] font-mono text-neutral-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                                        <Clock className="w-3 h-3 text-neutral-300" />
                                        {pkg.duration.split('·')[0]}
                                      </span>
                                    </div>

                                    {/* Title & Price */}
                                    <h4 className="pricing-pkg-title text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                      {pkg.name}
                                    </h4>

                                    <div className="my-2.5 flex items-baseline gap-2">
                                      <div className="pricing-pkg-price text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        {pkg.price}
                                      </div>
                                    </div>

                                    <p className="text-xs text-neutral-300 font-sans leading-relaxed m-0 mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                      {pkg.idealFor}
                                    </p>

                                    {/* Quick Inclusions Snapshot Pills (Zero-confusion comparison) */}
                                    <div className="p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 space-y-1.5 mb-4 shadow-lg">
                                      {pkg.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-1.5 text-[11px] font-mono text-neutral-100">
                                          <Check className="w-3 h-3 text-neutral-300 shrink-0 mt-0.5" />
                                          <span>{h}</span>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Team On-Site (if specified) */}
                                    {pkg.team && (
                                      <div className="space-y-1 text-xs font-mono text-neutral-200 mb-3 pt-2 border-t border-white/10">
                                        {pkg.team.videography && (
                                          <div className="text-neutral-200 leading-tight">
                                            <span className="text-neutral-400 mr-1.5">{"◉"}</span>
                                            {pkg.team.videography}
                                          </div>
                                        )}
                                        {pkg.team.photography && (
                                          <div className="text-neutral-200 leading-tight">
                                            <span className="text-neutral-400 mr-1.5">{"◉"}</span>
                                            {pkg.team.photography}
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Expandable Deliverables Details */}
                                    <div className="pt-2 border-t border-white/10">
                                      <button
                                        type="button"
                                        onClick={() => togglePackage(pkg.id)}
                                        className="text-xs font-mono text-neutral-300 hover:text-white flex items-center justify-between w-full transition-colors py-1.5"
                                      >
                                        <span>{isExpanded ? 'Hide itemized list' : 'View all deliverables'}</span>
                                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                      </button>

                                      {isExpanded && (
                                        <div className="mt-2 space-y-2 pt-2 border-t border-white/10 animate-in fade-in duration-200">
                                          {pkg.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
                                              <span className="text-neutral-400 text-[10px] mt-0.5">{"◉"}</span>
                                              <span>{feat}</span>
                                            </div>
                                          ))}

                                          {pkg.coverage && (
                                            <div className="text-[11px] font-mono text-neutral-300 pt-2 border-t border-white/10">
                                              <span className="text-neutral-400">Coverage: </span>{pkg.coverage}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Booking CTA */}
                                  <div className="pt-4 border-t border-white/10 mt-4">
                                    <MainButton to={getWhatsAppBookingUrl(pkg.name, category.title, pkg.price)}>
                                      Book Package
                                    </MainButton>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Optional Drone Upgrade for Car Delivery */}
                        {category.droneUpgrade && (
                          <div className="mt-8 relative overflow-hidden rounded-xl bg-[#0f0f11] border border-white/10 group">
                            {/* Matching Drone Background */}
                            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                              <img
                                src="/assets/categories/resort/resort-01.webp"
                                alt="Drone Aerial"
                                className="w-full h-full object-cover object-right opacity-65 group-hover:opacity-85 transition-all duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f11] via-[#0f0f11]/80 via-50% to-transparent" />
                            </div>

                            <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                              <div className="max-w-2xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                                    {"◉"} OPTIONAL UPGRADE
                                  </span>
                                  <span className="text-base font-mono font-bold text-white">
                                    {category.droneUpgrade.price}
                                  </span>
                                </div>
                                <h4 className="text-sm font-cinema-sub text-white font-semibold uppercase tracking-wide m-0">
                                  {category.droneUpgrade.title}
                                </h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed mt-1 mb-2">
                                  {category.droneUpgrade.description}
                                </p>
                                <p className="text-[11px] text-neutral-400 font-mono italic m-0">
                                  {category.droneUpgrade.note}
                                </p>
                              </div>

                              <div className="shrink-0">
                                <MainButton to={getWhatsAppBookingUrl('Car Delivery with Drone Upgrade', 'Car Delivery', '₹29,999')}>
                                  Add Drone (+₹5,000)
                                </MainButton>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DEDICATED DRONE CINEMATOGRAPHY (When not on drone tab) */}
      {/* ========================================================= */}
      {activeTab !== 'drone' && (
        <section id="drone-cinematography" className="section-service-content scroll-mt-36">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-bottom padding-xhuge">
                <div
                  className="package-content-block relative overflow-hidden group"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: '#141416',
                  }}
                >
                  {/* Aerial Drone Background Image */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                      src="/assets/categories/resort/resort-01.webp"
                      alt="Drone Aerial Cinematography"
                      className="w-full h-full object-cover object-right sm:object-center opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 via-50% to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures emblem" className="star-icon inline-block w-4 h-4" />
                        <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                          AERIAL PERSPECTIVE
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-300">
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>DGCA certified pilot &amp; safety protocols</div>
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>4K 60fps high dynamic range capture</div>
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>Available as +₹5,000 upgrade on single sessions</div>
                        <div><span className="text-neutral-500 mr-2">{"◉"}</span>Included in Luxury Wedding &amp; Grand Resort</div>
                      </div>
                      <div className="spacer-small"></div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        * Drone availability depends on location permissions, DGCA airspace restrictions, and local weather safety.
                      </div>
                    </div>

                    <div className="shrink-0 text-left lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                        Standalone Add-On
                      </div>
                      <div className="text-3xl font-mono font-bold text-white mb-4">
                        +₹5,000
                      </div>
                      <MainButton to={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello The SR Pictures! I would like to inquire about Drone Cinematography coverage.')}`}>
                        Inquire Drone
                      </MainButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dividing-line"></div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 5. STUDIO COMMITMENTS / INCLUDED IN EVERY PACKAGE         */}
      {/* ========================================================= */}
      <section className="section-service-content">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-bottom padding-large">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#141416] border border-white/10">
                  <Film className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-sm font-semibold text-white uppercase font-cinema-sub mb-1">
                    4K Sony Cinema Rigs
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed m-0">
                    Dual-card redundancy, prime cinema glass, and 10-bit S-Log3 colour depth.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#141416] border border-white/10">
                  <Sparkles className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-sm font-semibold text-white uppercase font-cinema-sub mb-1">
                    Studio Colour Grade
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed m-0">
                    Precision DaVinci Resolve grading, dialogue cleanup, and licensed music scoring.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#141416] border border-white/10">
                  <Clock className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-sm font-semibold text-white uppercase font-cinema-sub mb-1">
                    48h Teaser Turnaround
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed m-0">
                    Rapid Instagram teasers and reels delivered within 48–72 hours of wrap.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#141416] border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-sm font-semibold text-white uppercase font-cinema-sub mb-1">
                    Private Cloud Vault
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed m-0">
                    High-speed Google Drive gallery with permanent cloud backup of master files.
                  </p>
                </div>
              </div>
            </div>
            <div className="dividing-line"></div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. TESTIMONIALS SLIDER                                    */}
      {/* ========================================================= */}
      <div className="padding-global">
        <div className="container-large">
          <TestimonialSlider page="pricing" withDivider />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7. FAQ (Website Native Component)                         */}
      {/* ========================================================= */}
      <section className="section-service-faq">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid top-content-grid">
                <div id="w-node-_7b6f59d4-613e-4d1d-1c00-f836bb437708-6a229097" className="heading-wrap">
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
                <div id="w-node-_7b6f59d4-613e-4d1d-1c00-f836bb437715-6a229097" className="content-item">
                  <h2 className="section-number">(05)</h2>
                </div>
              </div>
              <div className="spacer-huge"></div>
              <div className="w-layout-grid faq-component-grid">
                <div id="w-node-_7b6f59d4-613e-4d1d-1c00-f836bb43771a-6a229097" className="faq-content-item">
                  <div className="w-layout-grid faq-inner-grid">
                    <div id="w-node-_7b6f59d4-613e-4d1d-1c00-f836bb43771c-6a229097" className="faq-content">
                      <Faq />
                    </div>
                    <div id="w-node-_7b6f59d4-613e-4d1d-1c00-f836bb43771e-6a229097" className="faq-content">
                      <div className="question-block">
                        <div className="text-size-regular">{"◉ Need custom requirements or multi-day itineraries?"}</div>
                        <MainButton to="/contact">Contact Our Team</MainButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="w-node-_7b6f59d4-613e-4d1d-1c00-f836bb437724-6a229097" className="faq-content-item">
                  <div className="faq-image-wrap">
                    <img
                      src="/assets/1Y9A5246-1024x683.jpg"
                      alt="The SR Pictures Wedding Photography"
                      className="faq-image"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BOTTOM CTA                                             */}
      {/* ========================================================= */}
      <section className="section-cta">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top padding-xhuge padding-bottom padding-xhuge">
              <div className="heading-wrap is-center">
                <Subtitle>Reserve Your Date</Subtitle>
                <div className="title-wrapper">
                  <h2 className="heading-style-h2">Let&apos;s Create</h2>
                </div>
                <div className="title-wrapper">
                  <h2 className="heading-style-h2">Something Timeless</h2>
                </div>
                <div className="spacer-small"></div>
                <div className="max-width-medium align-center">
                  <p className="text-size-medium text-color-secondary text-align-center">
                    Tell us about your upcoming car delivery, wedding celebration, couple story, or hospitality property. We&apos;ll craft the perfect cinematic narrative.
                  </p>
                </div>
                <div className="spacer-large"></div>
                <MainButton to="/contact">Get in Touch</MainButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
