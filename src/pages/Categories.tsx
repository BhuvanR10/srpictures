import { Link } from 'react-router-dom';
import Subtitle from '../components/Subtitle';
import MainButton from '../components/MainButton';
import { usePageSeo } from '../lib/usePageSeo';
import { WHATSAPP_PHONE } from '../lib/whatsapp';

interface CategoryItem {
  id: string;
  folderName: string;
  displayTitle: string;
  subtitle: string;
  code: string;
  description: string;
  inquiryKeyword: string;
}

// 8 Categories directly from Google Drive archive
const categories: CategoryItem[] = [
  {
    id: 'car-del',
    folderName: 'Car del',
    displayTitle: 'Car del',
    subtitle: 'Automotive & Delivery Films',
    code: 'SR-CAT-01',
    description:
      'High-octane automotive handover films, supercar reveals, and dealership cinematic deliveries.',
    inquiryKeyword: 'Car Delivery & Automotive Cinematography',
  },
  {
    id: 'commercial',
    folderName: 'commercial',
    displayTitle: 'commercial',
    subtitle: 'Brand & Commercial Campaigns',
    code: 'SR-CAT-02',
    description:
      'High-impact commercial advertisements, corporate brand films, and visual product storytelling.',
    inquiryKeyword: 'Commercial & Brand Video Production',
  },
  {
    id: 'family',
    folderName: 'Family',
    displayTitle: 'Family',
    subtitle: 'Family Portraits & Celebrations',
    code: 'SR-CAT-03',
    description:
      'Heartfelt family reunions, milestone anniversaries, birthdays, and timeless heirloom portraits.',
    inquiryKeyword: 'Family Portraits & Milestone Events',
  },
  {
    id: 'maternity',
    folderName: 'Maternity',
    displayTitle: 'Maternity',
    subtitle: 'Maternity & New Life Stories',
    code: 'SR-CAT-04',
    description:
      'Intimate maternity sessions celebrating motherhood, baby showers, and newborn cinematic memories.',
    inquiryKeyword: 'Maternity & Baby Cinematography',
  },
  {
    id: 'model-influencer',
    folderName: 'Model- Influencer',
    displayTitle: 'Model- Influencer',
    subtitle: 'Editorial & Creator Portfolios',
    code: 'SR-CAT-05',
    description:
      'Fashion editorial lookbooks, influencer video portfolios, and agency-ready aesthetic reels.',
    inquiryKeyword: 'Model Portfolio & Influencer Visuals',
  },
  {
    id: 'pre-wed',
    folderName: 'Pre wed',
    displayTitle: 'Pre wed',
    subtitle: 'Pre-Wedding & Couple Cinema',
    code: 'SR-CAT-06',
    description:
      'Romantic destination couple shoots, engagement films, and visual love stories filmed in 4K RAW.',
    inquiryKeyword: 'Pre-Wedding Film & Shoot',
  },
  {
    id: 'resort-pics',
    folderName: 'resort pics',
    displayTitle: 'resort pics',
    subtitle: 'Resorts, Travel & Architecture',
    code: 'SR-CAT-07',
    description:
      'Architectural visual captures, luxury resort cinematography, destination hospitality showcases.',
    inquiryKeyword: 'Resort & Architectural Photography/Film',
  },
  {
    id: 'wedding',
    folderName: 'Wedding',
    displayTitle: 'Wedding',
    subtitle: 'Flagship Wedding Cinematography',
    code: 'SR-CAT-08',
    description:
      'Grand Indian weddings, multi-camera Muhurtham coverage, candid emotion, and heirloom albums.',
    inquiryKeyword: 'Wedding Photography & Cinema Packages',
  },
];

export default function Categories() {
  usePageSeo({
    title: 'Visual Categories | Studio Archive',
    description:
      'Browse The SR Pictures archive categories including Weddings, Pre-Wedding, Commercials, Automotive, Maternity, Resorts, and Editorial shoots.',
  });

  return (
    <>
      <div id="top" className="top"></div>

      {/* Page Header */}
      <header className="section-categories-header pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="padding-global">
          <div className="container-large">
            <div className="heading-wrap is-center text-center">
              <Subtitle>Studio Drive Archive</Subtitle>
              <div className="title-wrapper mt-2">
                <h1 className="heading-style-h2 text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
                  Visual Categories
                </h1>
              </div>
            </div>

            <div className="spacer-small"></div>

            <div className="max-w-2xl mx-auto text-center">
              <p className="text-size-medium text-color-secondary">
                Explore our categorized archives across commercial productions, luxury weddings,
                and specialized editorial sessions. Click any category to inquire directly.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                to="/#gallery"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-neutral-300 transition-all"
              >
                <span>← Back to Video Gallery</span>
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  'Hi The SR Pictures! I am exploring your Categories archive and would like to ask a question.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-mono text-emerald-300 transition-all"
              >
                <span>💬 WhatsApp Hotline: +91 96322 08050</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Grid Section */}
      <section className="section-categories-grid pb-24 sm:pb-32">
        <div className="padding-global">
          <div className="container-large">
            <div className="dividing-line mb-12"></div>

            {/* Grid of 8 Category Cards (NO IMAGES per instructions) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((cat, idx) => {
                const waInquiryUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  `Hi The SR Pictures! 📸 I am interested in inquiring about your "${cat.folderName}" category (${cat.subtitle}). Could you please share package details and availability?`
                )}`;

                return (
                  <div
                    key={cat.id}
                    className="group relative rounded-3xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/[0.08] hover:border-amber-400/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
                  >
                    {/* Top Row: Folder Meta & Three-Dots Menu Icon */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          {/* Folder Icon matching Google Drive UI */}
                          <div className="w-10 h-10 rounded-2xl bg-white/[0.05] group-hover:bg-amber-400/10 border border-white/10 group-hover:border-amber-400/30 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 transition-colors">
                            <svg
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill="currentColor"
                            >
                              <path d="M4 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2H4zm8 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 7c2.33 0 7 1.17 7 3.5V20H5v-.5c0-2.33 4.67-3.5 7-3.5z" />
                            </svg>
                          </div>
                          <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-500 group-hover:text-amber-400/80 transition-colors">
                            {cat.code}
                          </span>
                        </div>

                        {/* Three-dots icon from Drive UI */}
                        <div className="text-neutral-500 group-hover:text-neutral-300 transition-colors p-1">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Folder Name / Title */}
                      <div className="mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 block mb-1">
                          FOLDER // {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors font-sans">
                          {cat.displayTitle}
                        </h2>
                      </div>

                      <div className="text-xs text-neutral-400 font-medium mb-3">
                        {cat.subtitle}
                      </div>

                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    {/* Viewfinder Media Slot Placeholder (NO IMAGES per instructions) */}
                    <div className="my-6 rounded-2xl bg-black/40 border border-white/[0.06] p-4 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden group-hover:border-amber-500/20 transition-all">
                      {/* Cine Viewfinder Corner Brackets */}
                      <span className="absolute top-2 left-2 text-[10px] font-mono text-neutral-600 select-none">
                        ┌ 4K RAW
                      </span>
                      <span className="absolute top-2 right-2 text-[10px] font-mono text-neutral-600 select-none">
                        24 FPS ┐
                      </span>
                      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-600 select-none">
                        └ 2.39:1
                      </span>
                      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-600 select-none">
                        ARCHIVE ┘
                      </span>

                      {/* Center Clapperboard/Camera Graphic */}
                      <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-500 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-all mb-2">
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M2 8h20" />
                          <path d="m6 4 3 4" />
                          <path d="m11 4 3 4" />
                          <path d="m16 4 3 4" />
                          <circle cx="12" cy="14" r="2.5" />
                        </svg>
                      </div>

                      <div className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase">
                        Archive Placeholder
                      </div>
                      <div className="text-[9px] text-neutral-600 font-mono mt-0.5">
                        Awaiting media assets
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
                        Ready to book
                      </span>

                      <a
                        href={waInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                        aria-label={`Inquire about ${cat.folderName} on WhatsApp`}
                      >
                        <span>Inquire</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-white/10 text-center flex flex-col items-center">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
                  Need a Customized Assignment?
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Whether you are planning a multi-day destination wedding, corporate film,
                  or personal shoot, we craft bespoke cinematography packages.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <MainButton to="/contact">Get in Touch</MainButton>
                  <MainButton to="/pricing">Explore Pricing</MainButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
