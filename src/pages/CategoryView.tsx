import { useState, useMemo, useEffect, Component, type ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { preloadDomeImages } from '../lib/domeImageCache';
import ApertureLoader from '../components/ApertureLoader';

const InvertedDome = lazy(() => import('../components/InvertedDome'));
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import Subtitle from '../components/Subtitle';
import { usePageSeo } from '../lib/usePageSeo';
import { CATEGORIES_DATA, type CategoryImage } from '../data/categoriesData';
import { WHATSAPP_PHONE } from '../lib/whatsapp';


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
  const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  // Prevent background scrolling when mobile fullscreen dome or lightbox modal is active
  useEffect(() => {
    if (isMobileFullscreen || lightboxIndex !== null) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
        document.documentElement.style.overflow = '';
      };
    }
  }, [isMobileFullscreen, lightboxIndex]);

  const category = CATEGORIES_DATA.find((c) => c.slug === slug || c.id === slug);

  // Jumble & distribute images so identical shoots/bursts are never side-by-side
  const jumbledImages = useMemo(() => {
    if (!category?.images) return [];
    const arr = [...category.images];
    // Deterministic pseudo-random shuffle using category slug as seed
    const seed = category.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let s = seed || 42;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [category]);

  const imageSources = useMemo(() => jumbledImages.map((img) => img.src), [jumbledImages]);

  // Instantly warm up image cache for the current category on mount
  useEffect(() => {
    if (imageSources.length > 0) {
      preloadDomeImages(imageSources.slice(0, 8));
    }
  }, [imageSources]);

  // Pre-cache adjacent images in lightbox for 0ms arrow clicks
  useEffect(() => {
    if (lightboxIndex !== null && jumbledImages.length > 0) {
      const nextIdx = (lightboxIndex + 1) % jumbledImages.length;
      const prevIdx = (lightboxIndex - 1 + jumbledImages.length) % jumbledImages.length;
      const p1 = new Image();
      p1.src = jumbledImages[nextIdx].src;
      const p2 = new Image();
      p2.src = jumbledImages[prevIdx].src;
    }
  }, [lightboxIndex, jumbledImages]);

  const categoryTitle = useMemo(() => {
    if (!category) return 'Visual Gallery | The SR Pictures Bengaluru';
    switch (category.slug) {
      case 'car-delivery':
        return 'Car Delivery Shoot Bangalore | Showroom Delivery Photography & 4K Reels | The SR Pictures';
      case 'wedding':
        return 'Best Wedding Photography Bangalore | Luxury Wedding Cinematography | The SR Pictures';
      case 'resort':
        return 'Resort Promotional Video Shoot Karnataka | Luxury Villa Cinematography | The SR Pictures';
      case 'pre-wedding':
        return 'Pre Wedding Photoshoot Bangalore | Romantic Couple Cinema & 4K Reels | The SR Pictures';
      case 'commercials':
        return 'Commercial Video Production Bangalore | Brand Films & Ad Shoots | The SR Pictures';
      case 'portraits':
        return 'Portrait Photography Bangalore | Fashion & Editorial Shoots | The SR Pictures';
      case 'family':
        return 'Family Photoshoot Bangalore | Milestone Celebrations & Portraits | The SR Pictures';
      case 'maternity':
        return 'Maternity Photoshoot Bangalore | Pregnancy & Motherhood Photography | The SR Pictures';
      default:
        return `${category.name} Photography & Cinematography | The SR Pictures Bengaluru`;
    }
  }, [category]);

  const categoryDesc = useMemo(() => {
    if (!category) return 'Visual gallery by The SR Pictures.';
    switch (category.slug) {
      case 'car-delivery':
        return "Bengaluru's #1 Car Delivery photoshoot & cinematic reels studio. Showroom car unveiling, key handover ceremonies, rolling 4K tracking, and viral Instagram reels. Book today!";
      case 'wedding':
        return 'Top-rated luxury wedding cinematography & candid photography in Bangalore by The SR Pictures. 4K Sony FX cinema cameras, emotional muhurtham highlights, candid moments & luxury albums.';
      case 'resort':
        return 'Premier resort & boutique hotel promotional filmmaking in Karnataka, Coorg, Chikmagalur, Kabini, Ooty & Goa. Architectural walkthroughs, guest experience storytelling & 4K drone cinematography.';
      case 'pre-wedding':
        return 'Cinematic pre-wedding photoshoots & romantic story films in Bangalore & exotic Karnataka locations by The SR Pictures. Concept storytelling, 4K aerial drone, and timeless aesthetics.';
      case 'commercials':
        return 'High-impact commercial video production, brand stories, and product cinematography in Bangalore by The SR Pictures. Cinematic lighting and creative storytelling.';
      case 'portraits':
        return 'Studio and outdoor portrait photography in Bangalore by The SR Pictures. Fashion editorials, model portfolios, corporate headshots, and creative conceptual portraits.';
      case 'family':
        return 'Heartwarming family portrait sessions, anniversary celebrations, and milestone memories captured candidly by The SR Pictures in Bangalore.';
      case 'maternity':
        return 'Graceful, artistic maternity photoshoots in Bangalore by The SR Pictures. Studio & outdoor sunset sessions celebrating new beginnings with timeless aesthetics.';
      default:
        return `Discover authentic ${category.name} visual moments captured with natural aesthetics and high-end cinema lenses by The SR Pictures studio.`;
    }
  }, [category]);

  const categoryKeywords = useMemo(() => {
    if (!category) return 'The SR Pictures, Bangalore photography';
    switch (category.slug) {
      case 'car-delivery':
        return 'car delivery shoot bangalore, car delivery photoshoot bangalore, car delivery photography bangalore, showroom car delivery photoshoot, new car delivery shoot bangalore, car delivery video bangalore, car delivery reels instagram bangalore, automotive photographer bangalore, car delivery shoot price, luxury car delivery shoot, The SR Pictures car delivery';
      case 'wedding':
        return 'best wedding photographer in bangalore, luxury wedding cinematography bengaluru, candid wedding photographer bangalore, wedding videography bangalore, destination wedding photographer karnataka, south indian wedding photography bangalore, brahmin wedding photography bangalore, wedding photography packages bangalore, The SR Pictures wedding';
      case 'resort':
        return 'resort promotional video shoot karnataka, resort photography bangalore, luxury villa videography coorg chikmagalur kabini ooty, hospitality video production south india, resort drone videography, hotel promotional video shoot, The SR Pictures resort';
      case 'pre-wedding':
        return 'pre wedding photoshoot bangalore, pre wedding shoot locations bangalore, romantic couple shoot bangalore, pre wedding video shoot bangalore, pre wedding photoshoot cost bangalore, The SR Pictures pre wedding';
      case 'commercials':
        return 'commercial video production bangalore, brand films bangalore, ad photoshoot bangalore, corporate videographer bangalore, product shoot bangalore, The SR Pictures commercials';
      case 'portraits':
        return 'portrait photography bangalore, fashion photoshoot bangalore, model portfolio shoot bangalore, editorial photographer bangalore, headshots bangalore, The SR Pictures portraits';
      case 'family':
        return 'family photoshoot bangalore, family portrait photography bangalore, celebration photography bangalore, candid family photographer, The SR Pictures family';
      case 'maternity':
        return 'maternity photoshoot bangalore, pregnancy photoshoot bangalore, outdoor maternity photoshoot bangalore, motherhood photography bangalore, The SR Pictures maternity';
      default:
        return `${category.name} photography, ${category.name} cinematography Bengaluru, The SR Pictures ${category.slug}, Bangalore photoshoot`;
    }
  }, [category]);

  usePageSeo({
    title: categoryTitle,
    description: categoryDesc,
    keywords: categoryKeywords,
    canonicalPath: category ? `/category/${category.slug}` : '/categories',
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
    lightboxIndex !== null ? jumbledImages[lightboxIndex] : undefined;

  const handleNext = () => {
    if (lightboxIndex === null || jumbledImages.length === 0) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % jumbledImages.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null || jumbledImages.length === 0) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + jumbledImages.length) % jumbledImages.length);
  };

  // Desktop keyboard navigation: right and left arrow keys to navigate images, Escape to close
  useEffect(() => {
    if (lightboxIndex === null || jumbledImages.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Right') {
        e.preventDefault();
        setLightboxIndex((prev) => ((prev ?? 0) + 1) % jumbledImages.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        e.preventDefault();
        setLightboxIndex((prev) => ((prev ?? 0) - 1 + jumbledImages.length) % jumbledImages.length);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, jumbledImages.length]);

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

                  {/* Mobile Only: Fit to Full Screen Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFullscreen(true)}
                    className="md:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-mono text-xs border border-white/20 shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Maximize2 size={13} className="text-amber-400" />
                    <span>Fit to Full Screen</span>
                  </button>

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
          /* Full-viewport interactive dome — with Mobile Fullscreen Fit */
          <div
            className={`w-full transition-all duration-300 ${
              isMobileFullscreen
                ? 'fixed inset-0 z-[1000] w-screen h-[100dvh] bg-black m-0 p-0'
                : 'relative'
            }`}
            style={
              isMobileFullscreen
                ? { height: '100dvh', width: '100vw', minHeight: '100dvh', maxHeight: '100dvh' }
                : { height: 'calc(100vh - 220px)', minHeight: 560, maxHeight: 960 }
            }
          >
            {/* Mobile Only: Floating 'Fit Screen' button when in standard view */}
            {!isMobileFullscreen && domeLoaded && (
              <button
                type="button"
                onClick={() => setIsMobileFullscreen(true)}
                className="md:hidden absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/75 hover:bg-black/90 active:bg-white active:text-black text-white font-mono text-[11px] uppercase tracking-wider border border-white/25 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                aria-label="Fit dome to full screen"
              >
                <Maximize2 size={13} className="text-amber-400" />
                <span>Fit Screen</span>
              </button>
            )}

            {/* Mobile Only: Top Bar in Fullscreen Mode */}
            {isMobileFullscreen && (
              <div className="md:hidden absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-white">
                  {category.name}
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFullscreen(false)}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/85 hover:bg-black text-white font-mono text-xs uppercase tracking-wider border border-white/30 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  aria-label="Exit full screen"
                >
                  <Minimize2 size={14} className="text-amber-400" />
                  <span>Exit Full Screen</span>
                </button>
              </div>
            )}

            <DomeErrorBoundary>
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center w-full h-[600px] min-h-[60vh] bg-black">
                    <ApertureLoader size="lg" label="Initializing 3D Visual Dome..." />
                  </div>
                }
              >
                <InvertedDome
                images={imageSources}
                tileWidth={isMobileScreen ? 190 : 260}
                tileHeight={isMobileScreen ? 142 : 195}
                gap={isMobileScreen ? 10 : 14}
                borderRadius={isMobileScreen ? 14 : 18}
                curve={0.38}
                curveRadius={1.4}
                zoom={0.09}
                grayscale={0}
                vignette={0.0}
                autoScrollX={10}
                segments={isMobileScreen ? 8 : 12}
                dpr={isMobileScreen ? 1.5 : 1.75}
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
              <div className="text-white font-mono text-xs tracking-wider uppercase flex items-center gap-2">
                <span>{category.name}</span>
                <span className="text-neutral-500">—</span>
                <span>Frame {(lightboxIndex ?? 0) + 1} / {category.images.length}</span>
                <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] text-neutral-400 bg-white/10 px-2.5 py-0.5 rounded-full ml-2 border border-white/10">
                  <span className="text-amber-400">←</span> / <span className="text-amber-400">→</span> keys to navigate • ESC to exit
                </span>
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
