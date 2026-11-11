import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  image?: string;
  exactTitle?: boolean;
  type?: string;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = 'https://photoportfolio-lake.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`;

export function usePageSeo({
  title,
  description,
  keywords,
  canonicalPath,
  image,
  exactTitle,
  type = 'website',
  schemaJson,
}: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title;
    const finalTitle = exactTitle || title.includes('|') ? title : `${title} | The SR Pictures`;
    document.title = finalTitle;

    // Helper to safely set meta tag content
    const setMeta = (selector: string, attr: string, value?: string) => {
      if (!value) return null;
      let el = document.querySelector(selector);
      const prevVal = el?.getAttribute('content') || null;
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          el.setAttribute('name', attr);
        } else if (selector.startsWith('meta[property=')) {
          el.setAttribute('property', attr);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
      return { el, prevVal };
    };

    // Track original values for cleanup
    const descMeta = setMeta('meta[name="description"]', 'description', description);
    const keywordsMeta = setMeta('meta[name="keywords"]', 'keywords', keywords);
    const ogTitleMeta = setMeta('meta[property="og:title"]', 'og:title', finalTitle);
    const ogDescMeta = setMeta('meta[property="og:description"]', 'og:description', description);
    const ogTypeMeta = setMeta('meta[property="og:type"]', 'og:type', type);
    const ogImgMeta = setMeta('meta[property="og:image"]', 'og:image', image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE);
    const twTitleMeta = setMeta('meta[name="twitter:title"]', 'twitter:title', finalTitle);
    const twDescMeta = setMeta('meta[name="twitter:description"]', 'twitter:description', description);
    const twImgMeta = setMeta('meta[name="twitter:image"]', 'twitter:image', image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE);

    // Canonical link management
    const currentPath = canonicalPath || window.location.pathname;
    const finalCanonicalUrl = `${SITE_URL}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalLink?.getAttribute('href') || null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonicalUrl);
    setMeta('meta[property="og:url"]', 'og:url', finalCanonicalUrl);
    setMeta('meta[name="twitter:url"]', 'twitter:url', finalCanonicalUrl);

    // Schema.org Dynamic Page JSON-LD (AEO & SEO)
    let pageSchemaScript: HTMLScriptElement | null = null;
    if (schemaJson) {
      pageSchemaScript = document.createElement('script');
      pageSchemaScript.type = 'application/ld+json';
      pageSchemaScript.id = 'dynamic-page-schema';
      const payload = Array.isArray(schemaJson)
        ? { '@context': 'https://schema.org', '@graph': schemaJson }
        : ('@context' in (schemaJson as Record<string, unknown>)
            ? schemaJson
            : { '@context': 'https://schema.org', ...schemaJson });
      pageSchemaScript.text = JSON.stringify(payload);
      document.head.appendChild(pageSchemaScript);
    }

    return () => {
      document.title = prevTitle;
      if (descMeta?.el && descMeta.prevVal !== null) descMeta.el.setAttribute('content', descMeta.prevVal);
      if (keywordsMeta?.el && keywordsMeta.prevVal !== null) keywordsMeta.el.setAttribute('content', keywordsMeta.prevVal);
      if (ogTitleMeta?.el && ogTitleMeta.prevVal !== null) ogTitleMeta.el.setAttribute('content', ogTitleMeta.prevVal);
      if (ogDescMeta?.el && ogDescMeta.prevVal !== null) ogDescMeta.el.setAttribute('content', ogDescMeta.prevVal);
      if (ogTypeMeta?.el && ogTypeMeta.prevVal !== null) ogTypeMeta.el.setAttribute('content', ogTypeMeta.prevVal);
      if (ogImgMeta?.el && ogImgMeta.prevVal !== null) ogImgMeta.el.setAttribute('content', ogImgMeta.prevVal);
      if (twTitleMeta?.el && twTitleMeta.prevVal !== null) twTitleMeta.el.setAttribute('content', twTitleMeta.prevVal);
      if (twDescMeta?.el && twDescMeta.prevVal !== null) twDescMeta.el.setAttribute('content', twDescMeta.prevVal);
      if (twImgMeta?.el && twImgMeta.prevVal !== null) twImgMeta.el.setAttribute('content', twImgMeta.prevVal);
      if (canonicalLink && prevCanonical !== null) canonicalLink.setAttribute('href', prevCanonical);
      if (pageSchemaScript && pageSchemaScript.parentNode) {
        pageSchemaScript.parentNode.removeChild(pageSchemaScript);
      }
    };
  }, [title, description, keywords, canonicalPath, image, exactTitle, type, schemaJson]);
}
