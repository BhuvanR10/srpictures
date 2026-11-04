import json

with open('public/assets/car_delivery/car_delivery_images.json', 'r') as f:
    car_delivery_items = json.load(f)

ts_content = f'''export interface CategoryImage {{
  id: string;
  src: string;
  alt?: string;
  caption?: string;
}}

export interface CategoryData {{
  id: string;
  slug: string;
  name: string;
  code: string;
  thumbnail: string;
  images: CategoryImage[];
}}

export const CAR_DELIVERY_IMAGES: CategoryImage[] = {json.dumps(car_delivery_items, indent=2)};

export const CATEGORIES_DATA: CategoryData[] = [
  {{
    id: 'car-delivery',
    slug: 'car-delivery',
    name: 'Car Delivery',
    code: '01',
    thumbnail: '/assets/car_delivery/car-delivery-02.jpg',
    images: CAR_DELIVERY_IMAGES,
  }},
  {{
    id: 'commercials',
    slug: 'commercials',
    name: 'Commercials',
    code: '02',
    thumbnail: '/assets/695dad3f0ac964e0b5734ca9_view-black-white-light-projector-theatre.jpg',
    images: [],
  }},
  {{
    id: 'family',
    slug: 'family',
    name: 'Family',
    code: '03',
    thumbnail: '/assets/RSD_1111.jpg',
    images: [],
  }},
  {{
    id: 'maternity',
    slug: 'maternity',
    name: 'Maternity',
    code: '04',
    thumbnail: '/assets/RSD_8625.jpg',
    images: [],
  }},
  {{
    id: 'model-influencer',
    slug: 'model-influencer',
    name: 'Model & Influencer',
    code: '05',
    thumbnail: '/assets/SRP_0350.jpg',
    images: [],
  }},
  {{
    id: 'pre-wedding',
    slug: 'pre-wedding',
    name: 'Pre-Wedding',
    code: '06',
    thumbnail: '/assets/RSD_8118.jpg',
    images: [],
  }},
  {{
    id: 'resort',
    slug: 'resort',
    name: 'Resort',
    code: '07',
    thumbnail: '/assets/RSD_3655.jpg',
    images: [],
  }},
  {{
    id: 'wedding',
    slug: 'wedding',
    name: 'Wedding',
    code: '08',
    thumbnail: '/assets/RSD_0734.jpg',
    images: [],
  }},
];
'''

with open('src/data/categoriesData.ts', 'w', encoding='utf-8') as out:
    out.write(ts_content)

print("Successfully updated src/data/categoriesData.ts with all 35 images!")

