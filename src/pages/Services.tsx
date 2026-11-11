import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import Subtitle from '../components/Subtitle';
import { usePageSeo } from '../lib/usePageSeo';

export default function Services() {
  usePageSeo({
    title: 'Cinematography & Photography Services | The SR Pictures Bengaluru',
    description: 'Explore our core services: Wedding Cinema & Candid Photography, Car Delivery Shoots, Resort Promotional Films, and 4K Aerial Drone Cinematography across South India.',
    keywords: 'Wedding cinematography Bengaluru, car delivery shoot Bangalore, resort films Karnataka, drone videography, commercial photography services Bangalore',
    canonicalPath: '/services',
    schemaJson: {
      '@type': 'ItemList',
      name: 'The SR Pictures Production Services',
      itemListElement: [
        {
          '@type': 'Service',
          position: 1,
          name: 'Wedding Cinematography & Candid Photography',
          description: 'Comprehensive Indian wedding film production with multi-camera Sony FX cinema rigs, drone aerials, and handcrafted flush-mount lay-flat albums.',
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Car Delivery Shoots & Automotive Reels',
          description: 'Cinematic showroom reveal coverage, key handover celebration, rolling highway shots, and 4K Instagram reels starting at ₹14,999.',
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Resort & Hospitality Promotional Films',
          description: 'Luxury architectural walkthroughs, villa experiences, and high-end drone landscape captures for resorts in Coorg, Chikmagalur, Kabini, and Goa.',
        },
        {
          '@type': 'Service',
          position: 4,
          name: '4K Aerial Drone Cinematography',
          description: 'DGCA certified drone piloting providing 4K 60fps HDR overhead video for grand events, venues, and automotive tracking.',
        },
      ],
    },
  });
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-service-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top-header">
              <div className="heading-wrap is-center">
                <Subtitle>What We Do</Subtitle>
                <div className="title-wrapper">
                  <h2 className="heading-style-h2">Studio</h2>
                </div>
                <div className="title-wrapper">
                  <h2 className="heading-style-h2">Services</h2>
                </div>
              </div>
              <div className="spacer-small"></div>
              <div className="max-width-medium align-center">
                <div className="text-align-center">
                  <p className="text-size-medium text-color-secondary">We offer end-to-end photography and cinematography services designed to craft timeless wedding films, portraits, aerial drone visuals, and brand campaigns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    <section className="section-service-content">
      <div className="spacer-xlarge"></div>
      <div className="service-content-wrapper">
        <div className="service-content-block _01">
          <div className="service-image-opacity"></div>
          <div className="service-container-wrap">
            <div className="service-content">
              <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures emblem" className="star-icon" />
              <h2 className="heading-style-h3">{"◉ Wedding Cinema"}</h2>
              <div className="text-size-medium">Timeless love stories</div>
              <div className="text-color-secondary">
                <p className="text-size-large text-align-center">End-to-end wedding photography and cinematic films capturing every sacred ritual, emotional tear, and joyous celebration.</p>
              </div>
            </div>
            <div className="service-overlay-image"></div>
            <div className="service-image-opacity bottom-opacity"></div>
          </div>
        </div>
      </div>
      <div className="service-content-wrapper">
        <div className="service-content-block _02">
          <div className="service-image-opacity"></div>
          <div className="service-container-wrap">
            <div className="service-content">
              <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures emblem" className="star-icon" />
              <h2 className="heading-style-h3">{"◉ Pre-Wedding & Portraits"}</h2>
              <div className="text-size-medium">Romantic outdoor & scenic narratives</div>
              <div className="text-color-secondary">
                <p className="text-size-large text-align-center">Capturing a couple's natural connection, chemistry, and love in scenic Bengaluru backdrops and destination getaways before their wedding day.</p>
              </div>
            </div>
            <div className="service-overlay-image"></div>
            <div className="service-image-opacity bottom-opacity"></div>
          </div>
        </div>
      </div>
      <div className="service-content-wrapper">
        <div className="service-content-block _03">
          <div className="service-image-opacity"></div>
          <div className="service-container-wrap">
            <div className="service-content">
              <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures emblem" className="star-icon" />
              <h2 className="heading-style-h3">{"◉ Maternity Photography"}</h2>
              <div className="text-size-medium">Celebrating new beginnings & motherhood</div>
              <div className="text-color-secondary">
                <p className="text-size-large text-align-center">Artistic maternity shoots preserving the warmth, quiet anticipation, and joyful arrival of your bundle of joy.</p>
              </div>
            </div>
            <div className="service-overlay-image"></div>
            <div className="service-image-opacity bottom-opacity"></div>
          </div>
        </div>
      </div>
      <div className="service-content-wrapper">
        <div className="service-content-block _04">
          <div className="service-image-opacity"></div>
          <div className="service-container-wrap">
            <div className="service-content">
              <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures emblem" className="star-icon" />
              <h2 className="heading-style-h3">{"◉ Birthdays & Ceremonies"}</h2>
              <div className="text-size-medium">Milestones, housewarmings & celebrations</div>
              <div className="text-color-secondary">
                <p className="text-size-large text-align-center">Comprehensive coverage for 1st birthdays, thread ceremonies, housewarming pujas, and family gatherings across Karnataka.</p>
              </div>
            </div>
            <div className="service-overlay-image"></div>
            <div className="service-image-opacity bottom-opacity"></div>
          </div>
        </div>
      </div>
      <div className="spacer-xhuge"></div>
        <div className="padding-global">
          <div className="container-large">
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
