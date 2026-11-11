import { Link, useParams } from 'react-router-dom';
import MainButton from '../components/MainButton';
import Subtitle from '../components/Subtitle';
import SocialLinks from '../components/SocialLinks';
import { authorSocials } from '../data/icons';
import { blogPosts } from '../data/blog';
import { usePageSeo } from '../lib/usePageSeo';
import NotFound from './NotFound';

export function PostCard({ slug }: { slug: string }) {
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return null;
  return (
    <div className="w-dyn-item" role="listitem">
      <div className="blog-content-wrapper">
        <div className="post-container">
          <div className="blog-inner-grid">
            <Link to={`/blog-post/${p.slug}`} className="blog-image-wrap w-inline-block" aria-label={p.title}>
              <img className="cover-image" src={p.image} alt={p.title} loading="lazy" />
            </Link>
            <div className="blog-content">
              <div className="w-layout-grid blog-grid">
                <div className="blog-content-item">
                  <Subtitle>{p.category}</Subtitle>
                  <h2 className="blog-title">{p.title}</h2>
                </div>
                <div className="dividing-line"></div>
                <div className="blog-content-item">
                  <Link to={`/blog-post/${p.slug}`} className="button w-button">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  usePageSeo({
    title: post ? `${post.title} | The SR Pictures Journal` : 'Creative Journal',
    description: post ? post.summary : 'Cinematography journal article by The SR Pictures.',
    keywords: post ? `${post.title}, ${post.category}, cinematography Bengaluru, wedding filming techniques` : 'The SR Pictures',
    canonicalPath: post ? `/blog/${post.slug}` : '/blog',
    image: post?.image,
    type: 'article',
    schemaJson: post ? {
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      image: post.image.startsWith('http') ? post.image : `https://photoportfolio-lake.vercel.app${post.image}`,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
      },
      publisher: {
        '@type': 'PhotographyStudio',
        name: 'The SR Pictures',
      },
      articleSection: post.category,
    } : undefined,
  });

  if (!post) return <NotFound />;
  return (
    <>
      <div id="top" className="top"></div>
      <header className="section-blog-post-header">
        <div className="padding-global"><div className="container-large"><div className="padding-top-header">
          <div className="blog-post-info-block"><div className="blog-post-block"><Subtitle>{post.category}</Subtitle></div></div>
          <div className="spacer-small"></div>
          <div className="max-width-xlarge"><h1 className="blog-post-title">{post.title}</h1></div>
          <div className="spacer-medium"></div>
          <div className="blog-info-wrap">
            <div className="max-width-medium"><p className="text-size-medium text-color-secondary">{post.summary}</p></div>
            <div className="blog-post-block">
              <div className="text-size-regular text-color-secondary">Reading Time:</div>
              <div className="text-size-regular">{post.readTime}</div>
            </div>
          </div>
          <div className="spacer-medium"></div>
          <div className="image-wrapper"><img className="blog-image" src={post.image} alt={post.title} /></div>
        </div></div></div>
      </header>
      <section className="section-blog-post-content">
        <div className="padding-global"><div className="container-large"><div className="padding-section-small">
          <div className="w-layout-grid blog-post-content-grid">
            <div className="blog-post-author-wrapper">
              <div className="author-content-wrapper">
                <div className="author-picture-wrap"><img className="author-picture" src={post.author.image} alt={post.author.name} /></div>
                <div className="spacer-xsmall"></div>
                <div className="text-size-regular">{post.author.name}</div>
                <div className="text-size-tiny text-color-secondary">{post.author.role}</div>
                <div className="spacer-small"></div>
                <div className="author-s-social-media-block"><SocialLinks items={authorSocials} /></div>
              </div>
            </div>
            <div className="blog-post-body">
              <div className="text-rich-text" dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          </div>
          <div className="spacer-xlarge"></div>
          <div className="dividing-line"></div>
        </div></div></div>
      </section>
      <section className="section-blog-other-posts">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="w-layout-grid top-content-grid">
            <div className="heading-wrap">
              <Subtitle>Explore More</Subtitle>
              <div className="title-wrapper"><div className="top-title"><h2 className="heading-style-h2">Recent</h2></div></div>
              <div className="title-wrapper"><div className="bottom-title"><h2 className="heading-style-h2">Articles</h2></div></div>
            </div>
            <div className="content-item"><MainButton to="/blog">All Posts</MainButton></div>
          </div>
          <div className="spacer-xlarge"></div>
          <div className="w-dyn-list">
            <div className="w-layout-grid other-posts-grid" role="list">
              {post.related.map((s) => <PostCard key={s} slug={s} />)}
            </div>
          </div>
        </div></div></div>
      </section>
    </>
  );
}
