import CtaButton from '../components/CtaButton';
import CtaWrapper from '../components/CtaWrapper';
import MainButton from '../components/MainButton';
import { WHATSAPP_GET_IN_TOUCH_URL } from '../lib/whatsapp';
import RollNumber from '../components/RollNumber';
import SocialLinks from '../components/SocialLinks';
import Subtitle from '../components/Subtitle';
import Video from '../components/Video';
import { usePageSeo } from '../lib/usePageSeo';

export default function About() {
  usePageSeo({
    title: 'About the Studio & Philosophy',
    description: 'Learn about The SR Pictures story, our craft philosophy, and our journey capturing milestone celebrations and cinematic moments.',
  });
  return (
    <>
    <div id="top" className="top"></div>
    <header className="section-about-header">
      <div className="w-layout-grid header-component-grid">
        <div id="w-node-fbcdfacd-fa25-e9a8-a4a7-d3296fa0cf8c-805165a6" className="background-video-wrapper">
          <Video className="background-video" poster="/assets/692764d4fd31a6bc0c913752_12566516_3840_2160_30fps_poster.0000000.jpg" src="/assets/692764d4fd31a6bc0c913752_12566516_3840_2160_30fps_mp4.mp4" />
          <div className="video-opacity"></div>
        </div>
        <div id="w-node-a0f59835-e3c8-2b95-55df-bbdd6ecd3983-805165a6" className="heading-wrap is-center">
          <Subtitle>About Us</Subtitle>
          <div className="title-wrapper">
            <h2 className="heading-style-h2">We are</h2>
          </div>
          <div className="title-wrapper">
            <h2 className="heading-style-h2">{"SR Pictures®"}</h2>
          </div>
        </div>
        <div id="w-node-_275a040b-1c9a-52d8-3771-12d2d51d5209-805165a6" className="w-layout-grid _3d-video-grid">
          <div id="w-node-_275a040b-1c9a-52d8-3771-12d2d51d520a-805165a6" className="_3d-video-wrapper">
            <div className="_3d-video-container">
              <div className="_3d-video-block">
                <div className="_3d-video-wrap _9">
                  <img src="/assets/1Y9A5246.jpg" alt="The SR Pictures Wedding" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _8">
                  <img src="/assets/RSD_8118.jpg" alt="The SR Pictures Cinema" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _7">
                  <img src="/assets/SRP_7885.jpg" alt="The SR Pictures Portraits" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _6">
                  <img src="/assets/RSD_8625.jpg" alt="The SR Pictures Aerial Drone" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _5">
                  <img src="/assets/RSD_2730.jpg" alt="The SR Pictures Ceremonies" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _4">
                  <img src="/assets/RSD_2215.jpg" alt="The SR Pictures Pre-Wedding" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _3">
                  <img src="/assets/IMG_1102.jpg" alt="The SR Pictures Celebrations" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _2">
                  <img src="/assets/RSD_1969.jpg" alt="The SR Pictures Haldi" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
                <div className="_3d-video-wrap _1">
                  <img src="/assets/SRP_0350.jpg" alt="The SR Pictures Reception" loading="eager" decoding="async" className="video is-about" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="w-node-bfdf0234-6824-ff40-5de2-30f215e92921-805165a6" className="padding-global">
          <div className="container-large">
            <div className="w-layout-grid header-content-grid">
              <div id="w-node-bfdf0234-6824-ff40-5de2-30f215e92924-805165a6" className="scroll-down-wrap">
                <div className="scroll-down-block">
                  <div className="arrow-down w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
                    </svg>
                  </div>
                  <div className="scroll-down-border"></div>
                  <div className="border-wrap">
                    <div className="glow-border scroll-down"></div>
                  </div>
                  <div className="scroll-down-background"></div>
                  <div className="scroll-down-background _02"></div>
                </div>
                <div className="header-text">SCROLL DOWN</div>
              </div>
              <div id="w-node-bfdf0234-6824-ff40-5de2-30f215e9292e-805165a6" className="location-wrap">
                <div className="header-text">BASED IN BENGALURU, INDIA</div>
                <div className="location-icon w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-xhuge"></div>
      <div className="padding-global">
        <div className="container-large">
          <div className="dividing-line"></div>
        </div>
      </div>
      <div className="spacer-xhuge"></div>
    </header>
    <section className="section-about-intro">
      <div className="intro-opacity"></div>
      <div className="intro-background about-page">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="intro-content-wrapper">
                <div className="intro-container">
                  <div className="intro-content-block">
                    <img src="/assets/695c47e4e7da0bba805165b3_star-icon.svg" alt="SR Pictures star emblem" className="star-icon" />
                    <div className="text-align-center">
                      <p className="text-size-large">Founded in 2018 in Bengaluru, The SR Pictures is a premier photography and cinematography studio driven by storytelling, light, and visual craft. Our mission is to transform life’s most precious moments and brand visions into timeless cinematic experiences.</p>
                    </div>
                    <div className="w-layout-grid number-grid">
                      <div id="w-node-_48358447-0a1d-98cc-8d59-5e29e61537ac-805165a6" className="number-block _01">
                        <RollNumber prefix="+" />
                        <div className="text-size-regular">Years of Experience</div>
                      </div>
                      <div id="w-node-_48358447-0a1d-98cc-8d59-5e29e61537dc-805165a6" className="number-block _02">
                        <RollNumber suffix="%" />
                        <div className="text-size-regular">Client Satisfaction</div>
                      </div>
                    </div>
                    <SocialLinks />
                    <MainButton to={WHATSAPP_GET_IN_TOUCH_URL}>Get in touch</MainButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-opacity is-bottom"></div>
    </section>
    <section className="section-about-process">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="w-layout-grid top-content-grid">
              <div id="w-node-c598fa92-4359-fee7-5361-ee957e150c89-805165a6" className="heading-wrap">
                <Subtitle>Production Steps</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">Work</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Process</h2>
                  </div>
                </div>
              </div>
              <div id="w-node-c598fa92-4359-fee7-5361-ee957e150c96-805165a6" className="content-item">
                <MainButton to="/contact">Contact us</MainButton>
              </div>
            </div>
            <div className="spacer-xlarge"></div>
            <div className="process-component">
              <div className="w-layout-grid process-component-grid">
                <div className="process-content-wrap _01">
                  <div className="process-content">
                    <div className="process-number">01</div>
                    <div className="process-title-wrap">
                      <h2 className="heading-style-h4">{"Concept &"}</h2>
                      <h2 className="heading-style-h4">Planning</h2>
                    </div>
                    <div className="spacer-medium"></div>
                    <p className="text-size-medium text-color-secondary">We begin by understanding your brand, goals, and audience. This phase includes creative brainstorming, script development, and visual planning to ensure a clear direction before production starts.</p>
                  </div>
                </div>
                <div className="process-content-wrap _02">
                  <div className="process-content">
                    <div className="process-number">02</div>
                    <div className="process-title-wrap">
                      <h2 className="heading-style-h4">Production</h2>
                      <h2 className="heading-style-h4">{"& Filming"}</h2>
                    </div>
                    <div className="spacer-medium"></div>
                    <p className="text-size-medium text-color-secondary">Our team captures high-quality footage using professional equipment and cinematic techniques. Every shot is carefully directed to translate the concept into visually compelling scenes.</p>
                  </div>
                </div>
                <div className="process-content-wrap _03">
                  <div className="process-content">
                    <div className="process-number">03</div>
                    <div className="process-title-wrap">
                      <h2 className="heading-style-h4">{"Editing &"}</h2>
                      <h2 className="heading-style-h4">Delivery</h2>
                    </div>
                    <div className="spacer-medium"></div>
                    <p className="text-size-medium text-color-secondary">We refine the footage through advanced editing, color grading, and sound design. The final video is delivered in optimized formats, ready to perform across digital platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dividing-line"></div>
        </div>
      </div>
    </section>
    <section className="section-about-team">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="w-layout-grid top-content-grid">
              <div id="w-node-_6fd90214-ea0d-47da-db8d-d776e9ac74cc-805165a6" className="heading-wrap">
                <Subtitle>Studio Team</Subtitle>
                <div className="title-wrapper">
                  <div className="top-title">
                    <h2 className="heading-style-h2">Visual</h2>
                  </div>
                </div>
                <div className="title-wrapper">
                  <div className="bottom-title">
                    <h2 className="heading-style-h2">Experts</h2>
                  </div>
                </div>
              </div>
              <div id="w-node-_6fd90214-ea0d-47da-db8d-d776e9ac74d9-805165a6" className="content-item">
                <MainButton to={WHATSAPP_GET_IN_TOUCH_URL}>Get in touch</MainButton>
              </div>
            </div>
            <div className="spacer-xlarge"></div>
            <div className="w-layout-grid team-component-grid">
              <div className="member-content-wrapper">
                <div className="member-content">
                  <img src="/assets/RSD_5879.jpg" alt="The SR Pictures Team" className="member-picture" style={{ objectFit: 'cover' }} />
                  <div className="member-content-wrap">
                    <div className="text-size-large">Olivia Parker</div>
                    <div className="text-size-regular text-color-secondary">Creative Director</div>
                  </div>
                </div>
              </div>
              <div className="member-content-wrapper">
                <div className="member-content">
                  <img src="/assets/RSD_6016.jpg" alt="The SR Pictures Team" className="member-picture" style={{ objectFit: 'cover' }} />
                  <div className="member-content-wrap">
                    <div className="text-size-large">Daniel Miller</div>
                    <div className="text-size-regular text-color-secondary">Lead Cinematographer</div>
                  </div>
                </div>
              </div>
              <div className="member-content-wrapper">
                <div className="member-content">
                  <img src="/assets/SRP_1277.jpg" alt="The SR Pictures Team" className="member-picture" style={{ objectFit: 'cover' }} />
                  <div className="member-content-wrap">
                    <div className="text-size-large">Amelia Hughes</div>
                    <div className="text-size-regular text-color-secondary">Chief Colorist &amp; Editor</div>
                  </div>
                </div>
              </div>
              <div className="member-content-wrapper">
                <div className="member-content">
                  <img src="/assets/SRP_1520.jpg" alt="The SR Pictures Team" className="member-picture" style={{ objectFit: 'cover' }} />
                  <div className="member-content-wrap">
                    <div className="text-size-large">Ethan Moore</div>
                    <div className="text-size-regular text-color-secondary">Lead Photographer</div>
                  </div>
                </div>
              </div>
              <div className="member-content-wrapper">
                <div className="member-content">
                  <img src="/assets/SRP_1582.jpg" alt="The SR Pictures Team" className="member-picture" style={{ objectFit: 'cover' }} />
                  <div className="member-content-wrap">
                    <div className="text-size-large">Sophia Reynolds</div>
                    <div className="text-size-regular text-color-secondary">Drone &amp; Aerial Specialist</div>
                  </div>
                </div>
              </div>
              <div className="member-content-wrapper">
                <div className="member-content">
                  <img src="/assets/SRP_1769.jpg" alt="The SR Pictures Team" className="member-picture" style={{ objectFit: 'cover' }} />
                  <div className="member-content-wrap">
                    <div className="text-size-large">Lucas Bennett</div>
                    <div className="text-size-regular text-color-secondary">Production Manager</div>
                  </div>
                </div>
              </div>
            </div>
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
