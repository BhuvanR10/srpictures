import { Link } from 'react-router-dom';
import { upArrow } from '../data/icons';
import LinkButton from './LinkButton';
import SocialLinks from './SocialLinks';
import MainButton from './MainButton';

const pages: Array<[string, string]> = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/case-studies', 'Case Studies'], ['/categories', 'Categories'], ['/pricing', 'Pricing'], ['/contact', 'Contact'], ['/blog', 'Blog']];

export default function Footer() {
  return (
    <footer>
      <div className="padding-global">
        <div className="container-large">
          <div className="dividing-line"></div>
          <div className="footer-padding">
            <div className="w-layout-grid footer-component-grid">
              <div id="w-node-_4ea88ba4-5dbd-e916-1d69-e37341450b6f-41450b6a" className="footer-content">
                <Link to="/" className="brand-link w-inline-block" aria-label="The SR Pictures home">
                  <div className="brand-wrap">
                    <img src="/assets/srpictures-logo-clean.png" alt="The SR Pictures" className="footer-logo" />
                    <div className="dot is-footer"></div>
                  </div>
                </Link>
                <div className="max-width-small">
                  <p className="text-size-medium text-color-secondary">Bengaluru's premier photography &amp; cinematography studio. Crafting timeless wedding films, portraits, and cinematic visual stories.</p>
                </div>
                <div className="spacer-small"></div>
                <div className="link-wrapper"><LinkButton to="tel:+919632208050">+91 96322 08050</LinkButton></div>
                <div className="link-wrapper"><LinkButton to="mailto:thesrpictures@gmail.com">thesrpictures@gmail.com</LinkButton></div>
                <div className="spacer-small"></div>
                <SocialLinks />
              </div>
              <div id="w-node-_4ea88ba4-5dbd-e916-1d69-e37341450b86-41450b6a" className="footer-content menu">
                <div className="text-size-regular text-color-secondary">PAGES:</div>
                <div className="spacer-tiny"></div>
                {pages.map(([to, l]) => (
                  <div className="link-wrapper" key={to}><LinkButton to={to}>{l}</LinkButton></div>
                ))}
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
          <div className="w-layout-grid footer-grid">
            <div className="footer-content-block">
              <div className="footer-block">
                <div className="footer-text">© The SR Pictures</div>
                <div className="footer-text hide-mobile" aria-hidden="true">│</div>
              </div>
              <div className="footer-block">
                <div className="footer-text">Bengaluru, India</div>
              </div>
            </div>
            <div className="footer-content-block large-gap">
              <div className="footer-link-wrap">
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem('sr_cinema_intro_seen');
                    window.dispatchEvent(new CustomEvent('replay-sr-intro'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="link-text text-neutral-400 hover:text-amber-400 transition-colors uppercase font-mono text-[11px] tracking-wider cursor-pointer bg-transparent border-0 p-0"
                  aria-label="Replay Cinematic Intro"
                >
                  Replay Intro ↺
                </button>
              </div>
              {[['/template-info/style-guide', 'Style Guide'], ['/template-info/licenses', 'Licenses'], ['/template-info/changelog', 'Changelog']].map(([to, l]) => (
                <div className="footer-link-wrap" key={to}><LinkButton to={to}>{l}</LinkButton></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
