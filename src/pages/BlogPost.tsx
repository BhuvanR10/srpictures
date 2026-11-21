import { Link, useParams } from 'react-router-dom';
import MainButton from '../components/MainButton';
import { ArrowUpRight } from 'lucide-react';
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
    <article className="blog-card group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0d10] hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-xl">
      <div>
        <Link
          to={`/blog-post/${p.slug}`}
          className="block relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900"
          aria-label={p.title}
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-60" />
          <span className="absolute top-3 left-3 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-black/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            {p.category}
          </span>
        </Link>
        <div className="p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400 mb-2">
            <span>{p.readTime}</span>
          </div>
          <h3 className="blog-card-title text-base sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-200 leading-snug tracking-tight m-0 mb-2">
            <Link to={`/blog-post/${p.slug}`} className="hover:underline">
              {p.title}
            </Link>
          </h3>
          <p className="text-xs text-neutral-300 leading-relaxed font-light m-0 line-clamp-2">
            {p.summary}
          </p>
        </div>
      </div>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center justify-between gap-4 border-t border-white/5 mt-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={p.author.image}
            alt={p.author.name}
            className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
          />
          <span className="text-xs font-medium text-white truncate">{p.author.name}</span>
        </div>
        <Link
          to={`/blog-post/${p.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-white/15 transition-all duration-200 group-hover:border-amber-400/40 group-hover:text-amber-300 shrink-0"
        >
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
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
      image: post.image.startsWith('http') ? post.image : `https://thesrpictures.in${post.image}`,
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
              <div className="text-rich-text blog-article-rich-text" dangerouslySetInnerHTML={{ __html: post.body }} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {post.related.map((s) => <PostCard key={s} slug={s} />)}
          </div>
        </div></div></div>
      </section>
    </>
  );
}
