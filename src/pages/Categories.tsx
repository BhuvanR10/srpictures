import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import Subtitle from '../components/Subtitle';
import MainButton from '../components/MainButton';
import { usePageSeo } from '../lib/usePageSeo';
import { WHATSAPP_PHONE } from '../lib/whatsapp';

interface DriveCategory {
  id: string;
  name: string;
  countLabel?: string;
}

// 8 Categories directly from the Google Drive archive
const categories: DriveCategory[] = [
  { id: 'car-del', name: 'Car del' },
  { id: 'commercial', name: 'commercial' },
  { id: 'family', name: 'Family' },
  { id: 'maternity', name: 'Maternity' },
  { id: 'model-influencer', name: 'Model- Influencer' },
  { id: 'pre-wed', name: 'Pre wed' },
  { id: 'resort-pics', name: 'resort pics' },
  { id: 'wedding', name: 'Wedding' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
    },
  },
};

export default function Categories() {
  usePageSeo({
    title: 'Archive Categories | The SR Pictures',
    description:
      'Browse The SR Pictures archive folders: Wedding, Pre wed, commercial, Car del, Family, Maternity, Model- Influencer, and resort pics.',
  });

  return (
    <>
      <div id="top" className="top"></div>

      <header className="pt-28 pb-10 sm:pt-36 sm:pb-14">
        <div className="padding-global">
          <div className="container-large">
            <div className="heading-wrap is-center text-center">
              <Subtitle>Archive</Subtitle>
              <div className="title-wrapper mt-2">
                <h1 className="heading-style-h2 text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Categories
                </h1>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                to="/#gallery"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-neutral-300 transition-all"
              >
                <span>← Back to Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="pb-24 sm:pb-32">
        <div className="padding-global">
          <div className="container-large">
            <div className="dividing-line mb-10"></div>

            {/* Clean, Slop-Free Drive Folder Cards with Framer Motion (NO IMAGES per instructions) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {categories.map((cat) => {
                const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  `Hi The SR Pictures! 📸 I would like to inquire about your "${cat.name}" category.`
                )}`;

                return (
                  <motion.a
                    key={cat.id}
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.025, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 px-5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-amber-400/50 transition-colors shadow-lg group select-none cursor-pointer"
                  >
                    {/* Left: Folder Icon + Category Name */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] group-hover:bg-amber-400/10 text-neutral-300 group-hover:text-amber-400 flex items-center justify-center shrink-0 transition-colors">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path d="M4 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2H4zm8 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 7c2.33 0 7 1.17 7 3.5V20H5v-.5c0-2.33 4.67-3.5 7-3.5z" />
                        </svg>
                      </div>
                      <span className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                        {cat.name}
                      </span>
                    </div>

                    {/* Right: Three Dots context menu icon */}
                    <div className="text-neutral-500 group-hover:text-neutral-300 transition-colors pl-2">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Bottom Actions */}
            <div className="mt-14 text-center">
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
