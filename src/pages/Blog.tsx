import { Link } from 'react-router-dom';
import Subtitle from '../components/Subtitle';
import { blogPosts } from '../data/blog';
import { usePageSeo } from '../lib/usePageSeo';

export default function Blog() {
  usePageSeo({
    title: 'Creative Insights & Cinematography Journal | The SR Pictures Bengaluru',
    description: 'Expert cinematography insights, wedding filming guides, pre-wedding location ideas in Bengaluru, drone techniques, and visual craft essays.',
    keywords: 'wedding videography blog Bengaluru, drone aerial tips, pre-wedding shoot locations Bangalore, cinematography insights',
    canonicalPath: '/blog',
    schemaJson: {
      '@type': 'Blog',
      name: 'The SR Pictures Cinematography Journal',
      description: 'Educational and behind-the-scenes cinematography articles from The SR Pictures studio.',
      publisher: {
        '@type': 'PhotographyStudio',
        name: 'The SR Pictures',
      },
    },
  });
  return (
    <>
    <div id="top" className="top"></div>
    <header className="section-blog-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-top-header">
            <div className="heading-wrap is-center">
              <Subtitle>Video Journal</Subtitle>
              <div className="title-wrapper">
                <h2 className="heading-style-h2">Creative</h2>
              </div>
              <div className="title-wrapper">
                <h2 className="heading-style-h2">Insights</h2>
              </div>
            </div>
            <div className="spacer-small"></div>
            <div className="max-width-medium align-center">
              <div className="text-align-center">
                <p className="text-size-medium text-color-secondary">Insights, stories, and ideas about video production, cinematography, and creative storytelling from our studio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section className="section-blog-content">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="w-dyn-list">
              <div role="list" className="blog-content-grid w-dyn-items">
                {blogPosts.map((post) => (
                  <div role="listitem" className="w-dyn-item" key={post.slug}>
                    <div className="blog-content-wrapper">
                      <div className="post-container">
                        <div className="w-layout-grid blog-inner-grid">
                          <Link to={`/blog-post/${post.slug}`} className="blog-image-wrap w-inline-block">
                            <img src={post.image} alt={post.title} className="cover-image" loading="lazy" />
                          </Link>
                          <div className="blog-content">
                            <div className="w-layout-grid blog-grid">
                              <div className="blog-content-item">
                                <Subtitle>{post.category}</Subtitle>
                                <h2 className="blog-title">{post.title}</h2>
                              </div>
                              <div className="dividing-line"></div>
                              <div className="blog-content-item">
                                <Link to={`/blog-post/${post.slug}`} className="button w-button">
                                  Read More
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="spacer-large"></div>
          </div>
          <div className="dividing-line"></div>
        </div>
      </div>
    </section>
    </>
  );
}
