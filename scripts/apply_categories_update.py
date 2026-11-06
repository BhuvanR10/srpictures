with open('src/data/categoriesData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

with open('portraits_ts_chunk.txt', 'r', encoding='utf-8') as f:
    portraits_chunk = f.read()

marker = "export const CATEGORIES_DATA: CategoryData[] = ["
if marker not in content:
    print("Error: marker not found")
    exit(1)

parts = content.split(marker)
before_categories = parts[0]

new_categories_data = """export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: 'car-delivery',
    slug: 'car-delivery',
    name: 'Car Delivery',
    code: '01',
    thumbnail: '/assets/car_delivery/car-delivery-02.webp',
    images: CAR_DELIVERY_IMAGES,
  },
  {
    id: 'wedding',
    slug: 'wedding',
    name: 'Wedding',
    code: '02',
    thumbnail: '/assets/categories/wedding/wedding-01.webp',
    images: WEDDING_IMAGES,
  },
  {
    id: 'pre-wedding',
    slug: 'pre-wedding',
    name: 'Pre-Wedding',
    code: '03',
    thumbnail: '/assets/categories/pre_wedding/pre_wedding-01.webp',
    images: PRE_WEDDING_IMAGES,
  },
  {
    id: 'resort',
    slug: 'resort',
    name: 'Resort',
    code: '04',
    thumbnail: '/assets/categories/resort/resort-01.webp',
    images: RESORT_IMAGES,
  },
  {
    id: 'portraits',
    slug: 'portraits',
    name: 'Portraits',
    code: '05',
    thumbnail: '/assets/categories/portraits/portrait-01.webp',
    images: PORTRAITS_IMAGES,
  },
  {
    id: 'commercials',
    slug: 'commercials',
    name: 'Commercials',
    code: '06',
    thumbnail: '/assets/categories/commercials/commercials-01.webp',
    images: COMMERCIALS_IMAGES,
  },
  {
    id: 'family',
    slug: 'family',
    name: 'Family',
    code: '07',
    thumbnail: '/assets/categories/family/family-01.webp',
    images: FAMILY_IMAGES,
  },
  {
    id: 'maternity',
    slug: 'maternity',
    name: 'Maternity',
    code: '08',
    thumbnail: '/assets/categories/maternity/maternity-01.webp',
    images: MATERNITY_IMAGES,
  },
];
"""

new_content = before_categories + portraits_chunk + "\n" + new_categories_data

with open('src/data/categoriesData.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated src/data/categoriesData.ts!")

