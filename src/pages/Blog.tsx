import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
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
      
      {/* Blog Hero Header */}
      <header className="section-blog-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-top-header">
              <div className="heading-wrap is-center max-w-full overflow-visible">
                <Subtitle>Video Journal</Subtitle>
                <div className="title-wrapper !overflow-visible max-w-full">
                  <h1 className="heading-style-h2 blog-hero-heading text-white m-0">Creative</h1>
                </div>
                <div className="title-wrapper !overflow-visible max-w-full">
                  <h1 className="heading-style-h2 blog-hero-heading text-white m-0">Insights</h1>
                </div>
              </div>
              <div className="spacer-small"></div>
              <div className="max-width-medium align-center">
                <div className="text-align-center">
                  <p className="text-size-medium text-color-secondary m-0">
                    Insights, stories, and ideas about video production, cinematography, and creative storytelling from our studio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Articles Grid Section */}
      <section className="section-blog-content pt-4 sm:pt-8 pb-16 sm:pb-24">
        <div className="padding-global">
          <div className="container-large">
            {/* Fully responsive layout: 1 column on mobile, 2 columns on tablet & desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="blog-card group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0d10] hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-xl"
                >
                  <div>
                    {/* Cover Image Container */}
                    <Link
                      to={`/blog-post/${post.slug}`}
                      className="block relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900"
                      aria-label={post.title}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-60" />
                      
                      {/* Category Tag Badge */}
                      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-black/80 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-md">
                        {post.category}
                      </span>
                    </Link>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 lg:p-7 flex flex-col">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400 mb-2.5">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          {post.readTime}
                        </span>
                        <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                          The SR Pictures Journal
                        </span>
                      </div>

                      <h2 className="blog-card-title text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-200 leading-snug tracking-tight m-0 mb-3">
                        <Link to={`/blog-post/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="blog-card-summary text-xs sm:text-sm text-neutral-300 leading-relaxed font-light m-0 line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Author + Read Button */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7 pt-0 flex items-center justify-between gap-4 border-t border-white/5 mt-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-white leading-tight truncate">
                          {post.author.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 truncate">
                          {post.author.role}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/blog-post/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-white/15 transition-all duration-200 group-hover:border-amber-400/40 group-hover:text-amber-300 shrink-0"
                    >
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="spacer-large"></div>
          </div>
          <div className="dividing-line"></div>
        </div>
      </section>
    </>
  );
}
