import GallerySection from '../components/GallerySection';
import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import Subtitle from '../components/Subtitle';
import { usePageSeo } from '../lib/usePageSeo';

export default function CaseStudies() {
  usePageSeo({
    title: 'Featured Films & Real Stories | The SR Pictures Bengaluru',
    description: 'Explore cinematic films, wedding highlights, and celebration visual stories crafted by The SR Pictures in Bengaluru and Karnataka.',
    keywords: 'wedding films Bengaluru, real wedding videos Bangalore, cinematic films Karnataka, The SR Pictures case studies',
    canonicalPath: '/case-studies',
    schemaJson: {
      '@type': 'CollectionPage',
      name: 'The SR Pictures Featured Films & Case Studies',
      description: 'Documentary wedding cinema, family milestone ceremonies, and couple stories across Karnataka.',
    },
  });
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-case-study-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top-header">
              <div className="heading-wrap is-center">
                <Subtitle>Capturing Moments, Creating Memories</Subtitle>
                <div className="title-wrapper">
                  <h2 className="heading-style-h2">Studio</h2>
                </div>
                <div className="title-wrapper">
                  <h2 className="heading-style-h2">Gallery</h2>
                </div>
              </div>
              <div className="spacer-small"></div>
              <div className="max-width-medium align-center">
                <div className="text-align-center">
                  <p className="text-size-medium text-color-secondary">Explore our authentic wedding moments, pre-wedding films, maternity stories, and traditional celebrations across Bengaluru and Karnataka.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="section-case-study-content">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-bottom padding-xhuge">
              <div className="spacer-huge"></div>
              <GallerySection />
            </div>
            <div className="dividing-line"></div>
          </div>
        </div>
      </section>
      <section className="call-to-action">
        <div className="circle-opacity is-left"></div>
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top padding-xhuge">
              <div className="heading-wrap is-center">
                <Subtitle>Start Project</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">{"Let’s"}</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Produce</h2>
                  </div>
                </div>
              </div>
              <div className="spacer-huge"></div>
            </div>
          </div>
        </div>
        <CtaWrapper />
        <div className="circle-opacity is-right"></div>
        <div className="cta-content-wrap">
          <CtaButton to="/contact">Book a call</CtaButton>
        </div>
      </section>
    </>
  );
}
