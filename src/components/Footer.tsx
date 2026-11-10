import { Link, useNavigate, useLocation } from 'react-router-dom';
import { upArrow } from '../data/icons';
import LinkButton from './LinkButton';
import SocialLinks from './SocialLinks';
import MainButton from './MainButton';

const pages: Array<[string, string]> = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/case-studies', 'Case Studies'], ['/categories', 'Categories'], ['/pricing', 'Pricing'], ['/contact', 'Contact'], ['/blog', 'Blog']];

const legalPages: Array<[string, string]> = [
  ['/privacy-policy', 'Privacy Policy (DPDP)'],
  ['/terms-of-service', 'Terms of Service'],
  ['/cancellation-refund', 'Cancellation & Refund'],
  ['/grievance-redressal', 'Grievance Redressal'],
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem('sr_intro_seen');
      sessionStorage.removeItem('sr_cinema_intro_seen');
    } catch {}
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('replay-sr-intro'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.dispatchEvent(new CustomEvent('replay-sr-intro'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="padding-global">
        <div className="container-large">
          <div className="dividing-line"></div>
          <div className="footer-padding">
            <div className="w-layout-grid footer-component-grid">
              <div id="w-node-_4ea88ba4-5dbd-e916-1d69-e37341450b6f-41450b6a" className="footer-content">
                <Link to="/" className="brand-link w-inline-block group" aria-label="The SR Pictures home">
                  <div className="brand-wrap items-center flex gap-3">
                    <img
                      src="/assets/sr-pictures-emblem.png"
                      alt="The SR Pictures"
                      className="footer-logo h-12 w-12 object-contain rounded-full border border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex flex-col justify-center">
                      <span className="font-sans font-extrabold text-[18px] sm:text-[20px] tracking-tight leading-none text-white uppercase">
                        The SR Pictures
                      </span>
                      <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase mt-1">
                        Photography & Cinema
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="max-width-small">
                  <p className="text-size-medium text-color-secondary">Bengaluru's premier photography &amp; cinematography studio. Crafting timeless wedding films, portraits, and cinematic visual stories.</p>
                </div>
                <div className="spacer-small"></div>
                <div className="link-wrapper"><LinkButton to="tel:+919986155516">+91 99861 55516</LinkButton></div>
                <div className="link-wrapper"><LinkButton to="mailto:thesrpictures@gmail.com">thesrpictures@gmail.com</LinkButton></div>
                <div className="spacer-small"></div>
                <SocialLinks />
              </div>
              <div id="w-node-_4ea88ba4-5dbd-e916-1d69-e37341450b86-41450b6a" className="footer-content menu">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  <div>
                    <div className="text-size-regular text-color-secondary font-mono text-xs uppercase tracking-wider mb-2">Pages:</div>
                    {pages.map(([to, l]) => (
                      <div className="link-wrapper" key={to}><LinkButton to={to}>{l}</LinkButton></div>
                    ))}
                  </div>
                  <div>
                    <div className="text-size-regular text-color-secondary font-mono text-xs uppercase tracking-wider mb-2">Legal (India):</div>
                    {legalPages.map(([to, l]) => (
                      <div className="link-wrapper" key={to}>
                        <LinkButton to={to}>{l}</LinkButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div id="w-node-_4ea88ba4-5dbd-e916-1d69-e37341450b9c-41450b6a" className="footer-content">
                <div className="footer-inner-grid">
                  <div className="footer-item">
                    <div className="back-to-top-wrapper">
                      <div className="back-to-top-text">Back to top</div>
                      <a
                        href="#top"
                        className="back-to-top-link w-inline-block"
                        aria-label="Back to top"
                        onClick={(e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
                        }}
                      >
                        <div className="up-arrow w-embed" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d={upArrow}></path></svg>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="footer-item">
                    <MainButton to="/contact">Let's Talk</MainButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dividing-line"></div>
          <div className="w-layout-grid footer-grid items-center">
            <div className="footer-content-block">
              <div className="footer-block">
                <div className="footer-text">© The SR Pictures</div>
                <div className="footer-text hide-mobile" aria-hidden="true">│</div>
              </div>
              <div className="footer-block">
                <div className="footer-text">Bengaluru, India</div>
                <div className="footer-text hide-mobile" aria-hidden="true">│</div>
              </div>
              <div className="footer-block">
                <div className="footer-text text-neutral-400 font-mono text-[11px]">DPDP Act, 2023 Compliant</div>
              </div>
            </div>
            <div className="footer-content-block large-gap">
              <div className="footer-link-wrap">
                <button
                  type="button"
                  onClick={handleReplayIntro}
                  className="link-text text-neutral-400 hover:text-amber-400 transition-colors uppercase font-mono text-[11px] tracking-wider cursor-pointer bg-transparent border-0 p-0"
                  aria-label="Replay Cinematic Intro"
                >
                  Replay Intro ↺
                </button>
              </div>
              {[['/privacy-policy', 'Privacy'], ['/terms-of-service', 'Terms'], ['/cancellation-refund', 'Refunds'], ['/grievance-redressal', 'Grievance']].map(([to, l]) => (
                <div className="footer-link-wrap" key={to}>
                  <LinkButton to={to}>{l}</LinkButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
