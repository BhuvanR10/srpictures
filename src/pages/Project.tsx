import { useParams } from 'react-router-dom';
import LinkButton from '../components/LinkButton';
import MainButton from '../components/MainButton';
import Subtitle from '../components/Subtitle';
import { projects } from '../data/projects';
import { usePageSeo } from '../lib/usePageSeo';
import NotFound from './NotFound';

export default function Project() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);

  usePageSeo({
    title: p ? `${p.name} — ${p.service} | The SR Pictures Bengaluru` : 'Project Story',
    description: p ? p.summary : 'Cinematic film project by The SR Pictures.',
    keywords: p ? `${p.name}, ${p.service}, ${p.industry}, The SR Pictures, Bengaluru film project` : 'The SR Pictures',
    canonicalPath: p ? `/project/${p.slug}` : '/case-studies',
    image: p?.poster,
    schemaJson: p ? {
      '@type': 'VideoObject',
      name: `${p.name} - ${p.service}`,
      description: p.summary,
      thumbnailUrl: p.poster.startsWith('http') ? p.poster : `https://photoportfolio-lake.vercel.app${p.poster}`,
      uploadDate: `${p.year}-01-01T08:00:00+05:30`,
      embedUrl: p.vimeo,
      publisher: {
        '@type': 'PhotographyStudio',
        name: 'The SR Pictures',
      },
    } : undefined,
  });

  if (!p) return <NotFound />;
  const next = projects.find((x) => x.slug === p.next) ?? projects[0];
  const meta: Array<[string, string]> = [['Service:', p.service], ['Industry:', p.industry], ['Year:', p.year]];
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-case-study-header">
        <div className="padding-global"><div className="container-large"><div className="padding-top-header">
          <div className="heading-wrap is-center">
            <Subtitle>Case Study:</Subtitle>
            <div className="title-wrapper"><h1 className="heading-style-h2">{p.name}</h1></div>
          </div>
          <div className="spacer-small"></div>
          <div className="max-width-medium align-center"><div className="text-align-center"><p className="text-size-medium text-color-secondary">{p.summary}</p></div></div>
          <div className="spacer-medium"></div>
          <div className="w-layout-grid case-study-grid">
            {meta.map(([k, v]) => (
              <div className="case-study-content-wrap" key={k}><div className="case-study-content-item"><div className="case-study-content-block">
                <div className="text-size-medium text-color-secondary">{k}</div><div className="text-size-medium">{v}</div>
              </div></div></div>
            ))}
            <div className="case-study-content-wrap"><div className="case-study-content-item"><div className="case-study-content-block">
              <div className="text-size-medium text-color-secondary">View Live:</div>
              <LinkButton to={p.liveUrl} external>{p.liveLabel}</LinkButton>
            </div></div></div>
          </div>
          <div className="spacer-medium"></div>
          <div className="case-video-wrapper"><div className="case-video-item">
            <iframe className="embedly-embed" src={p.vimeo} title={`${p.name} case study video`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" style={{ width: '100%', height: '100%', border: 0 }}></iframe>
          </div></div>
        </div></div></div>
      </header>
      <section className="section-case-study-content">
        <div className="padding-global"><div className="container-medium"><div className="padding-section-medium">
          {p.blocks.map((b, i) => (
            <div key={i}>
              {b.type === 'text' && <div className="max-width-xlarge align-center"><div className="text-rich-text" dangerouslySetInnerHTML={{ __html: b.html }} /></div>}
              {b.type === 'image' && <div className="image-wrapper"><div className="case-study-image-wrap"><img className="cover-image" src={b.src} alt={b.alt} loading="lazy" /></div></div>}
              {b.type === 'quote' && (
                <div className="max-width-xlarge align-center"><div className="client-content-wrap">
                  <div className="client-content-block"><img className="client-image" src={b.image} alt={b.name} /></div>
                  <div className="client-content">
                    <div className="text-rich-text"><blockquote>{`"${b.quote}"`}</blockquote></div>
                    <div className="text-size-regular">{b.name}</div>
                    <div className="text-size-small text-color-secondary">{b.role}</div>
                  </div>
                </div></div>
              )}
              <div className="spacer-xlarge"></div>
            </div>
          ))}
        </div></div>
        <div className="container-large"><div className="dividing-line"></div></div></div>
      </section>
      <section className="section-next-case-study">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="heading-wrap is-center">
            <Subtitle>Discover More</Subtitle>
            <div className="title-wrapper"><h2 className="heading-style-h2">{next.name}</h2></div>
          </div>
          <div className="spacer-medium"></div>
          <div className="next-case-block"><MainButton to={`/project/${next.slug}`}>Next Case</MainButton></div>
        </div></div></div>
      </section>
    </>
  );
}
