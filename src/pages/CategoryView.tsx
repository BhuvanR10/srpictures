import { useState, useMemo, Component, type ReactNode, lazy, Suspense } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import Subtitle from '../components/Subtitle';
import ApertureLoader from '../components/ApertureLoader';
import { usePageSeo } from '../lib/usePageSeo';
import { CATEGORIES_DATA, type CategoryImage } from '../data/categoriesData';
import { WHATSAPP_PHONE } from '../lib/whatsapp';

const InvertedDome = lazy(() => import('../components/InvertedDome'));

class DomeErrorBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  state: { hasError: boolean; error?: Error } = { hasError: false };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(err: unknown) {
    console.error('InvertedDome encountered an issue:', err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-black text-white">
          <p className="text-sm font-medium text-neutral-400 mb-4">
            Unable to initialize interactive gallery view.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: undefined })}
            style={{ color: '#000000' }}
            className="px-5 py-2.5 rounded-full bg-white font-semibold text-xs tracking-wider uppercase shadow-lg hover:bg-neutral-200 transition-all cursor-pointer"
          >
            Reload Gallery
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function CategoryView() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [domeLoaded, setDomeLoaded] = useState(false);

  const category = CATEGORIES_DATA.find((c) => c.slug === slug || c.id === slug);
  const imageSources = useMemo(() => category?.images.map((img) => img.src) || [], [category?.images]);

  const categoryTitle = useMemo(() => {
    if (!category) return 'Visual Gallery | The SR Pictures';
    if (category.slug === 'car-delivery') return 'Car Delivery Shoots & Automotive Visuals | The SR Pictures Bengaluru';
    if (category.slug === 'wedding') return 'Luxury Wedding Cinematography & Photography | The SR Pictures Bengaluru';
    if (category.slug === 'resort') return 'Resort & Luxury Hospitality Films | The SR Pictures Karnataka';
    if (category.slug === 'pre-wedding') return 'Pre-Wedding & Couple Story Shoots | The SR Pictures Bengaluru';
    return `${category.name} Photography & Cinematography | The SR Pictures Bengaluru`;
  }, [category]);

  const categoryDesc = useMemo(() => {
    if (!category) return 'Visual gallery by The SR Pictures.';
    if (category.slug === 'car-delivery') {
      return 'Cinematic showroom car delivery moments in Bengaluru. Unveiling celebrations, key handover ceremonies, family portraits, and 4K reels.';
    }
    if (category.slug === 'wedding') {
      return 'Grand Indian wedding films and candid photography by The SR Pictures. Preserving sacred muhurtham rituals, sangeet energy, and intimate vows.';
    }
    if (category.slug === 'resort') {
      return 'Luxury resort, boutique hotel, and private villa promotional films in Coorg, Chikmagalur, Kabini, Ooty, and Goa by The SR Pictures.';
    }
    return `Discover authentic ${category.name} visual moments captured with natural aesthetics and high-end cinema lenses by The SR Pictures studio.`;
  }, [category]);

  usePageSeo({
    title: categoryTitle,
    description: categoryDesc,
    keywords: category ? `${category.name} photography, ${category.name} cinematography Bengaluru, The SR Pictures ${category.slug}, Bangalore photoshoot` : 'The SR Pictures',
    canonicalPath: category ? `/categories/${category.slug}` : '/categories',
    image: category?.thumbnail,
    schemaJson: category ? {
      '@type': 'ImageGallery',
      name: `${category.name} Portfolio - The SR Pictures`,
      description: categoryDesc,
      provider: {
        '@type': 'PhotographyStudio',
        name: 'The SR Pictures',
      },
    } : undefined,
  });

  if (!category) {
    return <Navigate to="/categories" replace />;
  }

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hello The SR Pictures, I would like to inquire about booking your ${category.name} photography.`
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

      {/* Header */}
      <header className="pt-26 sm:pt-32 pb-6 sm:pb-8">
        <div className="padding-global">
          <div className="container-large">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-neutral-300 transition-all"
              >
                <span>← All Categories</span>
              </Link>

              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                {category.code}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Subtitle>Visual Archive</Subtitle>
                <div className="title-wrapper mt-2">
                  <h1
                    className="font-extrabold uppercase tracking-tight text-white"
                    style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: '1.1' }}
                  >
                    {category.name}
                  </h1>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-wide transition-all shadow-lg"
                  >
                    <span>Inquire on WhatsApp</span>
                    <span>→</span>
                  </a>

                  <span className="text-xs font-mono text-neutral-400 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                    {category.images.length} Photographs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Content — Full-bleed inverted dome, no padding container */}
      <section className="pb-0">
        {category.images.length > 0 ? (
          /* Full-viewport interactive dome — edge-to-edge */
          <div className="relative w-full" style={{ height: 'calc(100vh - 220px)', minHeight: 560, maxHeight: 960 }}>
            <DomeErrorBoundary>
              <Suspense
                fallback={
                  <div className="w-full h-full min-h-[560px] flex items-center justify-center bg-black">
                    <ApertureLoader label="Loading 3D Visual Optics..." size="lg" />
                  </div>
                }
              >
                <InvertedDome
                  images={imageSources}
                  tileWidth={260}
                  tileHeight={195}
                  gap={14}
                  borderRadius={18}
                  curve={0.38}
                  curveRadius={1.4}
                  zoom={0.09}
                  grayscale={0}
                  vignette={0.0}
                  autoScrollX={10}
                  backgroundColor="#000000"
                  enableDrag={true}
                  enableWheel={true}
                  openOnClick={false}
                  onLoad={() => setDomeLoaded(true)}
                  onTileClick={(idx) => setLightboxIndex(idx)}
                />
              </Suspense>
            </DomeErrorBoundary>

            {/* Subtle editorial hint — fades in only after dome is loaded */}
            {domeLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-5 right-6 z-20 pointer-events-none text-[11px] font-mono tracking-widest uppercase text-white/35"
              >
                Drag to explore • Click to open
              </motion.div>
            )}
          </div>
        ) : (
          /* Minimal waiting state */
          <div className="padding-global">
            <div className="container-large">
              <div className="py-20 text-center flex flex-col items-center justify-center rounded-2xl bg-neutral-900/40 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-white/[0.04] text-neutral-500 flex items-center justify-center mb-3">
                  <ImageIcon size={22} />
                </div>
                <div className="text-sm font-semibold text-neutral-300">
                  Ready for {category.name} photos
                </div>
              </div>
            </div>
          </div>
        )}
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
            <div
              className="flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white font-mono text-xs tracking-wider uppercase">
                {category.name} <span className="text-neutral-500 mx-2">—</span> Frame {(lightboxIndex ?? 0) + 1} / {category.images.length}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all border border-white/15 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="relative flex-1 flex items-center justify-center my-auto w-full max-h-[80vh] px-4 sm:px-12"
              onClick={(e) => e.stopPropagation()}
            >
              {category.images.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <img
                src={currentImage.src}
                alt={currentImage.alt || category.name}
                className="max-h-[75vh] max-w-[85vw] rounded-2xl border border-white/15 shadow-2xl object-contain"
              />

              {category.images.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {currentImage.caption && (
              <div
                className="border-t border-white/10 pt-4 text-center z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-sm text-neutral-300 font-medium">{currentImage.caption}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
