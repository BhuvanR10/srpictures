export interface CategoryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface CategoryData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  code: string;
  description: string;
  accentColor: string;
  images: CategoryImage[];
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: 'car-delivery',
    slug: 'car-delivery',
    name: 'Car Delivery',
    tagline: 'Automotive & Supercar Handover Cinema',
    code: '01',
    description: 'High-octane delivery moments, supercar reveals, and dealership handover films.',
    accentColor: '#f59e0b',
    images: [],
  },
  {
    id: 'commercials',
    slug: 'commercials',
    name: 'Commercials',
    tagline: 'Brand Campaigns & Visual Production',
    code: '02',
    description: 'High-impact commercial advertisements, corporate brand films, and creative campaigns.',
    accentColor: '#3b82f6',
    images: [],
  },
  {
    id: 'family',
    slug: 'family',
    name: 'Family',
    tagline: 'Portraits & Milestone Celebrations',
    code: '03',
    description: 'Heirloom family portraits, birthdays, anniversaries, and heartfelt reunions.',
    accentColor: '#ec4899',
    images: [],
  },
  {
    id: 'maternity',
    slug: 'maternity',
    name: 'Maternity',
    tagline: 'Motherhood & New Life Memories',
    code: '04',
    description: 'Intimate maternity sessions, baby showers, and newborn cinematic captures.',
    accentColor: '#a855f7',
    images: [],
  },
  {
    id: 'model-influencer',
    slug: 'model-influencer',
    name: 'Model- Influencer',
    tagline: 'Fashion Editorial & Creator Portfolios',
    code: '05',
    description: 'Fashion editorial lookbooks, influencer video reels, and aesthetic model portfolios.',
    accentColor: '#10b981',
    images: [],
  },
  {
    id: 'pre-wedding',
    slug: 'pre-wedding',
    name: 'Pre - Wedding',
    tagline: 'Destination Couple Stories & Cinema',
    code: '06',
    description: 'Romantic destination shoots, scenic couple films, and sunset engagements in 4K.',
    accentColor: '#f43f5e',
    images: [],
  },
  {
    id: 'resort',
    slug: 'resort',
    name: 'Resort',
    tagline: 'Hospitality Architecture & Travel',
    code: '07',
    description: 'Luxury resort architecture, hotel showcases, scenic travel, and hospitality visuals.',
    accentColor: '#06b6d4',
    images: [],
  },
  {
    id: 'wedding',
    slug: 'wedding',
    name: 'Wedding',
    tagline: 'Signature Wedding Cinematography',
    code: '08',
    description: 'Grand Indian weddings, multi-camera Muhurtham coverage, candid emotion, and heirloom albums.',
    accentColor: '#eab308',
    images: [],
  },
];
