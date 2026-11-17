import { useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePageSeo } from '../lib/usePageSeo';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { preloadDomeImages } from '../lib/domeImageCache';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 28,
    },
  },
};

export default function Categories() {
  usePageSeo({
    title: 'Visual Portfolio Categories | The SR Pictures Bengaluru',
    description: 'Explore our specialized portfolio: Car Delivery moments, Luxury Weddings, Resort & Villa films, Pre-Wedding stories, Commercials, and Portraits in Bengaluru.',
    keywords: 'car delivery photos Bangalore, wedding cinematography gallery Bengaluru, resort films showcase Karnataka, commercial photography portfolio, Bengaluru visual studio',
    canonicalPath: '/categories',
    image: '/assets/categories/wedding/wedding-01.webp',
    schemaJson: {
      '@type': 'CollectionPage',
      name: 'The SR Pictures Portfolio Categories',
      description: 'Curated visual galleries spanning Weddings, Car Delivery, Resort Films, Pre-Wedding, Commercials, and Portraits.',
    },
  });

  // Warms up InvertedDome global imageCache on hover or touch so gallery dome displays with zero delay
  const preloadCategory = (images: { src: string }[]) => {
    preloadDomeImages(images.slice(0, 12).map((img) => img.src));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 1. Immediately warm up CategoryView and Three.js chunk in memory
    import('./CategoryView');

    // 2. Pre-cache initial images of popular categories during idle time for instantaneous dome unveiling
    const idleTimer = setTimeout(() => {
      const popularSlugs = ['car-delivery', 'wedding', 'resort', 'pre-wedding'];
      popularSlugs.forEach((slug) => {
        const cat = CATEGORIES_DATA.find((c) => c.slug === slug);
        if (cat) {
          preloadDomeImages(cat.images.slice(0, 6).map((img) => img.src));
        }
      });
    }, 100);

    return () => clearTimeout(idleTimer);
  }, []);

  return (
    <>
      <div id="top" className="top"></div>

      {/* Tightened Luxury Editorial Header */}
      <header className="pt-24 sm:pt-28 pb-4 sm:pb-6">
        <div className="padding-global">
          <div className="container-large">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-1">
                  Archive Collections
                </div>
                <h1
                  className="font-extrabold uppercase tracking-tight text-white m-0"
                  style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', lineHeight: '1.1' }}
                >
                  Categories
                </h1>
              </div>

              {/* Inline Back to Gallery Button Aligned with Header Baseline */}
              <Link
                to="/#gallery"
                className="inline-flex items-center gap-2 self-start sm:self-end sm:mb-1 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-xs font-mono text-neutral-300 hover:text-white transition-all duration-200"
              >
                <span>← Back to Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Grid - High-Impact Full-Bleed Photography Cards */}
      <section className="pb-12 sm:pb-16">
        <div className="padding-global">
          <div className="container-large">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {CATEGORIES_DATA.map((cat) => (
                <motion.div
                  key={cat.id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  className="h-full"
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    onMouseEnter={() => preloadCategory(cat.images)}
                    onTouchStart={() => preloadCategory(cat.images)}
                    className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-neutral-900 border border-white/10 hover:border-white/40 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden min-h-[260px] sm:min-h-[290px] select-none"
                    aria-label={`Open ${cat.name} category`}
                  >
                    {/* Subtle Top-Edge Highlight Line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                    {/* Eye-Catching Full-Bleed Photography Thumbnail: 100% Natural, Unfiltered */}
                    {cat.thumbnail && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-neutral-950">
                        <img
                          src={cat.thumbnail}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover opacity-100 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        {/* Gentle bottom-only gradient strictly behind text so photo stays 100% natural and bright */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Top Row: Clean Glassmorphic Action Indicator (No distracting logos) */}
                    <div className="relative z-10 flex items-center justify-end">
                      <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-lg">
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>

                    {/* Bottom: Crisp Label + Bold Category Title */}
                    <div className="relative z-10">
                      <span className="inline-block font-mono text-[10px] tracking-[0.2em] text-white/80 uppercase mb-2 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 drop-shadow">
                        {cat.code} — EXPLORE
                      </span>
                      <div
                        className="font-extrabold text-white group-hover:text-amber-200 transition-colors duration-300 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                        style={{ fontSize: '1.35rem', lineHeight: '1.2' }}
                      >
                        {cat.name}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
