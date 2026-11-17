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

export const SITE_URL = 'https://photoportfolio-lake.vercel.app';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero-cinematic-poster-v3.jpg`;

const PATH_LABELS: Record<string, string> = {
  about: 'About Studio',
  services: 'Services',
  pricing: 'Pricing & Packages',
  categories: 'Visual Gallery',
  category: 'Visual Gallery',
  reels: 'Cinematic Reels',
  blog: 'Journal',
  contact: 'Contact & Booking',
  'case-studies': 'Featured Films',
  project: 'Featured Films',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'cancellation-refund': 'Cancellation & Refund',
  'grievance-redressal': 'Grievance Redressal',
};

function buildBreadcrumbList(path: string, pageTitle: string) {
  const clean = path.replace(/^\/|\/$/g, '');
  if (!clean) return null;

  const parts = clean.split('/');
  const items: Array<{ '@type': string; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  if (parts.length === 1) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: PATH_LABELS[parts[0]] || pageTitle.split('|')[0].trim(),
      item: `${SITE_URL}/${parts[0]}`,
    });
  } else if (parts.length === 2) {
    const parentSection = parts[0] === 'category' ? 'categories' : parts[0];
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: PATH_LABELS[parentSection] || parentSection,
      item: `${SITE_URL}/${parentSection}`,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle.split('|')[0].trim(),
      item: `${SITE_URL}/${parts[0]}/${parts[1]}`,
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

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

    const finalImage = image
      ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`)
      : DEFAULT_OG_IMAGE;

    // Primary Meta Tags
    const descMeta = setMeta('meta[name="description"]', 'description', description);
    const keywordsMeta = setMeta('meta[name="keywords"]', 'keywords', keywords);

    // Open Graph
    const ogTitleMeta = setMeta('meta[property="og:title"]', 'og:title', finalTitle);
    const ogDescMeta = setMeta('meta[property="og:description"]', 'og:description', description);
    const ogTypeMeta = setMeta('meta[property="og:type"]', 'og:type', type);
    const ogImgMeta = setMeta('meta[property="og:image"]', 'og:image', finalImage);
    const ogImgWidthMeta = setMeta('meta[property="og:image:width"]', 'og:image:width', '1920');
    const ogImgHeightMeta = setMeta('meta[property="og:image:height"]', 'og:image:height', '1080');
    const ogImgTypeMeta = setMeta('meta[property="og:image:type"]', 'og:image:type', 'image/jpeg');
    const ogImgAltMeta = setMeta('meta[property="og:image:alt"]', 'og:image:alt', finalTitle);
    const ogSiteMeta = setMeta('meta[property="og:site_name"]', 'og:site_name', 'The SR Pictures');

    // Twitter Card (Summary Large Image)
    const twCardMeta = setMeta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image');
    const twTitleMeta = setMeta('meta[name="twitter:title"]', 'twitter:title', finalTitle);
    const twDescMeta = setMeta('meta[name="twitter:description"]', 'twitter:description', description);
    const twImgMeta = setMeta('meta[name="twitter:image"]', 'twitter:image', finalImage);
    const twSiteMeta = setMeta('meta[name="twitter:site"]', 'twitter:site', '@thesrpictures');
    const twCreatorMeta = setMeta('meta[name="twitter:creator"]', 'twitter:creator', '@thesrpictures');

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

    // Schema.org Dynamic Page JSON-LD (AEO, Breadcrumbs & Rich Snippets)
    let pageSchemaScript: HTMLScriptElement | null = null;
    const breadcrumbs = buildBreadcrumbList(currentPath, finalTitle);

    const schemaGraph: Array<Record<string, unknown>> = [];
    if (schemaJson) {
      if (Array.isArray(schemaJson)) {
        schemaGraph.push(...schemaJson);
      } else if (typeof schemaJson === 'object') {
        if ('@graph' in schemaJson && Array.isArray(schemaJson['@graph'])) {
          schemaGraph.push(...(schemaJson['@graph'] as Array<Record<string, unknown>>));
        } else {
          schemaGraph.push(schemaJson as Record<string, unknown>);
        }
      }
    }

    if (breadcrumbs) {
      schemaGraph.push(breadcrumbs);
    }

    if (schemaGraph.length > 0) {
      pageSchemaScript = document.createElement('script');
      pageSchemaScript.type = 'application/ld+json';
      pageSchemaScript.id = 'dynamic-page-schema';
      pageSchemaScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemaGraph,
      });
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
