import MainButton from './MainButton';
import VybnParallaxGrid from './gallery/VybnParallaxGrid';

export default function GallerySection() {
  return (
    <div className="gallery-section-wrapper">
      {/* VYBN Visuals 6-Column Parallax on Scroll Grid with Aperture Diaphragms & Mixed Media */}
      <VybnParallaxGrid />

      {/* Bottom Studio CTA */}
      <div className="gallery-bottom-cta mt-14 text-center">
        <p className="text-size-medium text-color-secondary">
          Capturing lifetime memories with natural aesthetics and cinematic craft.
        </p>
        <div className="spacer-small"></div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MainButton to="/categories">View All Categories</MainButton>
          <MainButton to="/contact">Book Your Date</MainButton>
        </div>
      </div>
    </div>
  );
}
