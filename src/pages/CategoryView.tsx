import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Subtitle from '../components/Subtitle';
import MainButton from '../components/MainButton';
import { usePageSeo } from '../lib/usePageSeo';
import { CATEGORIES_DATA, type CategoryImage } from '../data/categoriesData';
import { WHATSAPP_PHONE } from '../lib/whatsapp';

export default function CategoryView() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const category = CATEGORIES_DATA.find((c) => c.slug === slug || c.id === slug);

  usePageSeo({
    title: category ? `${category.name} | Archive` : 'Category',
    description: category
      ? `${category.name} photography and cinematography portfolio by The SR Pictures. ${category.description}`
      : 'Visual category gallery by The SR Pictures.',
  });

  if (!category) {
    return <Navigate to="/categories" replace />;
  }

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hello The SR Pictures! 📸 I am viewing your "${category.name}" portfolio collection and would like to inquire about package details and availability.`
  )}`;

  const currentImage: CategoryImage | undefined =
    lightboxIndex !== null ? category.images[lightboxIndex] : undefined;

  const handleNext = () => {
    if (lightboxIndex === null || category.images.length === 0) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % category.images.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null || category.images.length === 0) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + category.images.length) % category.images.length);
  };

  return (
    <>
      <div id="top" className="top"></div>

      {/* Category Hero Header */}
      <header className="pt-28 pb-12 sm:pt-36 sm:pb-16 relative overflow-hidden">
        {/* Subtle Ambient Backlight Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ backgroundColor: category.accentColor }}
        />

        <div className="padding-global relative z-10">
          <div className="container-large">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all group"
              >
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                <span>All Categories</span>
              </Link>

              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                ARCHIVE // {category.code}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="max-w-3xl">
              <Subtitle>{category.tagline}</Subtitle>
              <div className="title-wrapper mt-3">
                <h1 className="heading-style-h2 text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
                  {category.name}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-neutral-300 mt-4 leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition-all shadow-xl shadow-emerald-950/40"
                >
                  <span>Inquire for {category.name} via WhatsApp</span>
                  <span>→</span>
                </a>
                <MainButton to="/contact">Book Consultation</MainButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="pb-28 sm:pb-36">
        <div className="padding-global">
          <div className="container-large">
            <div className="dividing-line mb-12"></div>

            {/* When Images Are Available: Masonry Grid */}
            {category.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.025, y: -4 }}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-amber-400/40 cursor-pointer group shadow-xl aspect-[4/5]"
                  >
                    <img
                      src={img.src}
                      alt={img.alt || `${category.name} photograph`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <p className="text-sm font-medium text-white">{img.caption || img.alt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* When Awaiting Images: Sleek Viewfinder Placeholder Grid */
              <div className="flex flex-col items-center">
                <div className="w-full text-center mb-10">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Collection Ready for Image Assets
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 font-sans">
                    {category.name} Gallery Frame
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto mt-2">
                    Share your Google Drive or image links to populate this gallery with high-res
                    master photographs and cinematic stills.
                  </p>
                </div>

                {/* 6 Viewfinder Wireframe Slots ready for user images */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl aspect-[4/5] bg-neutral-900/40 border border-dashed border-white/15 flex flex-col items-center justify-center p-6 text-center select-none"
                    >
                      {/* Corner marks */}
                      <span className="absolute top-3 left-3 font-mono text-[9px] text-neutral-600">
                        ┌ 4K STILL
                      </span>
                      <span className="absolute top-3 right-3 font-mono text-[9px] text-neutral-600">
                        SLOT {String(i + 1).padStart(2, '0')} ┐
                      </span>
                      <span className="absolute bottom-3 left-3 font-mono text-[9px] text-neutral-600">
                        └ 3:2
                      </span>
                      <span className="absolute bottom-3 right-3 font-mono text-[9px] text-neutral-600">
                        {category.name.toUpperCase()} ┘
                      </span>

                      <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-600 mb-3">
                        <Camera size={20} />
                      </div>
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Image Slot {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-neutral-600 font-mono mt-1">
                        Ready for asset drop
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white font-mono text-xs">
                {category.name} // {(lightboxIndex ?? 0) + 1} of {category.images.length}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all border border-white/20"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image Preview */}
            <div
              className="relative flex-1 flex items-center justify-center my-auto w-full max-h-[80vh] px-4 sm:px-12"
              onClick={(e) => e.stopPropagation()}
            >
              {category.images.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[75vh] max-w-[85vw] rounded-2xl border border-white/20 shadow-2xl object-contain"
              />

              {category.images.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div
              className="border-t border-white/10 pt-4 text-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-neutral-300 font-medium">
                {currentImage.caption || currentImage.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
