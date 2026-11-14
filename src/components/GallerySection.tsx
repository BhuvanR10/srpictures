import { motion } from 'framer-motion';
import MainButton from './MainButton';
import VybnParallaxGrid from './gallery/VybnParallaxGrid';
import BeyondOrdinaryMarquee from './gallery/BeyondOrdinaryMarquee';

export default function GallerySection() {
  return (
    <div className="gallery-section-wrapper">
      {/* 4x3 Parallax Video Grid with Fluid Framer Motion Physics */}
      <VybnParallaxGrid />

      {/* ── BEYOND THE ORDINARY SHOWCASE ── */}
      <div className="beyond-ordinary-section mt-20 sm:mt-28 pt-10 sm:pt-14 border-t border-white/10">
        <div className="heading-wrap mb-8 sm:mb-12">
          <div className="title-wrapper overflow-hidden">
            <div className="top-title">
              <h2 className="heading-style-h2 !text-[clamp(2.2rem,6vw,5.5rem)] !leading-[1.05]">
                Beyond
              </h2>
            </div>
          </div>
          <div className="title-wrapper overflow-hidden">
            <div className="bottom-title">
              <h2 className="heading-style-h2 !text-[clamp(2.2rem,6vw,5.5rem)] !leading-[1.05]">
                The Ordinary
              </h2>
            </div>
          </div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed tracking-wide">
            A collection of our most creative, unconventional and visually striking shots.
          </p>
        </div>

        {/* Animated Moving Images: Continuous Right-to-Left Infinite Showcase */}
        <div id="beyond-ordinary-gallery" className="w-full">
          <BeyondOrdinaryMarquee />
        </div>
      </div>

      {/* Gallery Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="gallery-bottom-cta mt-12 sm:mt-16 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MainButton
            to="/categories"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
          >
            View All Categories →
          </MainButton>
          <MainButton to="/contact">Book Your Date</MainButton>
        </div>
      </motion.div>
    </div>
  );
}
