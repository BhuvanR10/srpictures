import ContactForm from '../components/ContactForm';
import CtaWrapper from '../components/CtaWrapper';
import Faq from '../components/Faq';
import SocialLinks from '../components/SocialLinks';
import Subtitle from '../components/Subtitle';
import { usePageSeo } from '../lib/usePageSeo';

export default function Contact() {
  usePageSeo({
    title: 'Book Your Date | Contact',
    description: 'Get in touch with The SR Pictures studio. Check dates availability, request custom quotes, and book your wedding or commercial production.',
  });
  return (
    <>
    <div id="top" className="top"></div>
    <header className="section-contact-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-top-header">
            <div className="heading-wrap is-center">
              <Subtitle>{"Let’s Talk"}</Subtitle>
              <div className="title-wrapper">
                <h2 className="heading-style-h2">Get in</h2>
              </div>
              <div className="title-wrapper">
                <h2 className="heading-style-h2">Touch</h2>
              </div>
            </div>
            <div className="spacer-small"></div>
            <div className="max-width-medium align-center">
              <div className="text-align-center">
                <p className="text-size-medium text-color-secondary">{"Tell us about your wedding, portrait session, or commercial assignment. Based in Bengaluru, Karnataka, we're ready to travel worldwide to capture your story."}</p>
              </div>
            </div>
            <div className="spacer-small"></div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/919986155516?text=Hi%20The%20SR%20Pictures!%20I'd%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-emerald-950/50"
              >
                <span>💬 WhatsApp: +91 99861 55516</span>
              </a>
              <a
                href="tel:+919986155516"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium tracking-wide transition-all"
              >
                <span>📞 Call Studio</span>
              </a>
            </div>
            <div className="spacer-small"></div>
            <SocialLinks />
          </div>
          <div className="spacer-huge"></div>
        </div>
      </div>
    </header>
    <div className="circle-container">
      <div className="circle-opacity is-left"></div>
      <CtaWrapper />
      <div className="circle-opacity is-right"></div>
    </div>
    <section className="section-contact-form">
      <div className="padding-global">
        <div className="container-large">
          <div className="contact-form-block">
            <ContactForm />
          </div>
          <div className="spacer-large"></div>
          <div className="dividing-line"></div>
        </div>
      </div>
    </section>
    <section className="section-contact-faq">
      <div className="padding-global">
        <div className="container-large">
          <div className="dividing-line"></div>
          <div className="padding-section-large">
            <div className="heading-wrap is-center">
              <Subtitle>FAQ</Subtitle>
              <div className="title-wrapper">
                <div className="top-title">
                  <h2 className="heading-style-h2">Quick</h2>
                </div>
              </div>
              <div className="title-wrapper">
                <div className="bottom-title">
                  <h2 className="heading-style-h2">Answers</h2>
                </div>
              </div>
            </div>
            <div className="spacer-xlarge"></div>
            <div className="faq-wrapper">
              <Faq />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
