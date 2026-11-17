/**
 * Global image cache & preloader for the visual dome gallery.
 * Decoupled from Three.js to prevent pulling the 900+ KB 3D engine into route bundles.
 */

export const imageCache = new Map<string, HTMLImageElement>();

export const preloadDomeImages = (urls: string[]) => {
  if (typeof window === 'undefined') return;
  urls.forEach((u) => {
    if (!imageCache.has(u)) {
      const img = new Image();
      if (u.startsWith('http://') || u.startsWith('https://')) {
        img.crossOrigin = 'anonymous';
      }
      img.decoding = 'async';
      img.onload = () => imageCache.set(u, img);
      img.src = u;
    }
  });
};

export const loadImage = (src: string): Promise<HTMLImageElement | null> => {
  if (!src) return Promise.resolve(null);
  const cached = imageCache.get(src);
  if (cached && (cached.complete || (cached.naturalWidth && cached.naturalWidth > 0))) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve) => {
    const img = new Image();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.decoding = 'async';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      if (img.crossOrigin) {
        const fallback = new Image();
        fallback.onload = () => {
          imageCache.set(src, fallback);
          resolve(fallback);
        };
        fallback.onerror = () => resolve(null);
        fallback.src = src;
      } else {
        resolve(null);
      }
    };
    img.src = src;
  });
};
