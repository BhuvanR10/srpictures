import { motion } from 'framer-motion';
import MainButton from './MainButton';
import VybnParallaxGrid from './gallery/VybnParallaxGrid';

export default function GallerySection() {
  return (
    <div className="gallery-section-wrapper">
      {/* 4x3 Parallax Video Grid with Fluid Framer Motion Physics */}
      <VybnParallaxGrid />

      {/* Gallery Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="gallery-bottom-cta mt-12 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MainButton to="/categories">View All Categories →</MainButton>
          <MainButton to="/contact">Book Your Date</MainButton>
        </div>
      </motion.div>
    </div>
  );
}
