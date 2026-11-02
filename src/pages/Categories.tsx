import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import Subtitle from '../components/Subtitle';
import MainButton from '../components/MainButton';
import { usePageSeo } from '../lib/usePageSeo';
import { CATEGORIES_DATA } from '../data/categoriesData';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Categories() {
  usePageSeo({
    title: 'Archive Categories | The SR Pictures',
    description:
      'Explore The SR Pictures categorized archives: Car Delivery, Commercials, Pre - Wedding, Resort, Wedding, Family, Maternity, and Model- Influencer.',
  });

  return (
    <>
      <div id="top" className="top"></div>

      {/* Header */}
      <header className="pt-28 pb-12 sm:pt-36 sm:pb-16 relative overflow-hidden">
        <div className="padding-global relative z-10">
          <div className="container-large">
            <div className="heading-wrap is-center text-center">
              <Subtitle>Curated Collections</Subtitle>
              <div className="title-wrapper mt-2">
                <h1 className="heading-style-h2 text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
                  Categories
                </h1>
              </div>
            </div>

            <div className="spacer-small"></div>

            <div className="max-w-xl mx-auto text-center">
              <p className="text-size-medium text-color-secondary">
                Select a collection to explore dedicated galleries, behind-the-scenes cinema, and
                portfolio stills.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                to="/#gallery"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-neutral-300 transition-all"
              >
                <span>← Back to Video Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <section className="pb-28 sm:pb-36">
        <div className="padding-global">
          <div className="container-large">
            <div className="dividing-line mb-12"></div>

            {/* Bespoke Framer Motion Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {CATEGORIES_DATA.map((cat) => (
                <motion.div
                  key={cat.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  className="h-full"
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className="relative block h-full rounded-3xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/10 hover:border-amber-400/50 p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] group overflow-hidden select-none"
                    aria-label={`Open ${cat.name} category gallery`}
                  >
                    {/* Background Index Watermark Number */}
                    <div className="absolute right-4 bottom-2 font-mono text-6xl sm:text-7xl font-black text-white/[0.03] group-hover:text-amber-400/[0.08] transition-colors pointer-events-none select-none tracking-tighter">
                      {cat.code}
                    </div>

                    {/* Top Section */}
                    <div>
                      {/* Code Tag & Status */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-amber-400 transition-colors">
                          // {cat.code}
                        </span>

                        <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-amber-400 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-all" />
                      </div>

                      {/* Category Title */}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors font-sans mb-2">
                        {cat.name}
                      </h2>

                      {/* Tagline */}
                      <p className="text-xs text-neutral-400 font-medium tracking-wide mb-4 line-clamp-1">
                        {cat.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                        View Collection
                      </span>

                      <div className="w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-amber-400 text-neutral-300 group-hover:text-black flex items-center justify-center transition-all group-hover:translate-x-1">
                        <span className="text-sm font-bold">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Inquiries CTA */}
            <div className="mt-16 text-center">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MainButton to="/contact">Book Consultation</MainButton>
                <MainButton to="/pricing">Pricing Packages</MainButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
