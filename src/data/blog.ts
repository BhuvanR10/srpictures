export interface BlogPost { slug: string; category: string; title: string; summary: string; readTime: string; image: string; author: { name: string; role: string; image: string }; related: string[]; body: string }

export const blogPosts: BlogPost[] = [
  {
    "slug": "camera-movement-basics",
    "related": [
      "building-brand-identity",
      "behind-the-scenes"
    ],
    "category": "Cinematography",
    "title": "The Art of Cinematic Wedding Storytelling",
    "summary": "Discover how intentional composition, warm natural lighting, and multi-camera Sony FX rigs turn sacred ceremonies into theatrical films.",
    "readTime": "6 min read",
    "image": "/assets/1Y9A5246.jpg",
    "author": {
      "name": "SR Pictures Crew",
      "role": "Lead Cinematographer",
      "image": "/assets/SRP_1582.jpg"
    },
    "body": "<h2>The Magic of Unscripted Emotion</h2><p>‍</p><p>True wedding cinema isn't about staged poses—it's about anticipating genuine emotion. When a bride exchanges a secret glance with her partner or parents wipe a silent tear during Kanyadaana, our cinematographers capture the moment unobtrusively.</p><p>‍</p><ul><li>Unobtrusive multi-angle camera placements</li><li>Low-light prime lenses for ambient mandap illumination</li><li>Direct high-fidelity audio capture of Vedic mantras</li></ul><p>‍</p><h3>Mastering Movement</h3><p>‍</p><p>Subtle, deliberate camera moves—whether on motorized gimbals or lightweight sliders—add emotional weight without drawing attention away from the sacred rituals.</p>"
  },
  {
    "slug": "building-brand-identity",
    "related": [
      "camera-movement-basics",
      "behind-the-scenes"
    ],
    "category": "Pre-Wedding",
    "title": "Top Pre-Wedding Shoot Locations Around Bengaluru",
    "summary": "From the mist-clad heights of Nandi Hills to vintage heritage corridors, explore the best scenic backdrops in Karnataka.",
    "readTime": "5 min read",
    "image": "/assets/RSD_8118.jpg",
    "author": {
      "name": "Creative Director",
      "role": "Lead Stylist & Director",
      "image": "/assets/SRP_1769.jpg"
    },
    "body": "<h2>Scenic Backdrops Near Bangalore</h2><p>‍</p><p>Bengaluru offers an extraordinary blend of historic stone structures, lush botanical landscapes, and expansive lake shores ideal for couple portraiture.</p><p>‍</p><ul><li>Nandi Hills for sunrise golden hour frames</li><li>Heritage palace corridors for royal ethnic styling</li><li>Lakeside eucalyptus groves for contemporary western ensembles</li></ul><p>‍</p><h3>Concept &amp; Outfit Coordination</h3><p>‍</p><p>We guide each couple through selecting complementary palettes and textures that harmonize effortlessly with natural surroundings.</p>"
  },
  {
    "slug": "behind-the-scenes",
    "related": [
      "camera-movement-basics",
      "building-brand-identity"
    ],
    "category": "Traditions",
    "title": "Documenting South Indian Traditions: Sacred Muhurtham",
    "summary": "Understanding the deep cultural significance of Oonjal, Kanyadaana, and Mangalyadharana to capture every sacred second.",
    "readTime": "8 min read",
    "image": "/assets/RSD_5879.jpg",
    "author": {
      "name": "Traditional Specialist",
      "role": "Culture & Ritual Specialist",
      "image": "/assets/RSD_5879.jpg"
    },
    "body": "<h2>Sacred Timing &amp; Precision</h2><p>‍</p><p>Traditional Hindu and South Indian weddings have pivotal moments governed by auspicious muhurthams. Missing a 30-second window is never an option.</p><p>‍</p><ul><li>Dedicated ritual photographer positioned at the sacred fire</li><li>Candid photographer focused exclusively on family reactions</li><li>Ultra high-speed continuous shooting for akshata showers</li></ul>"
  },
  {
    "slug": "visual-storytelling-principles",
    "related": [
      "camera-movement-basics",
      "building-brand-identity"
    ],
    "category": "Celebrations",
    "title": "Capturing Vibrant Colors: Haldi, Mehendi & Sangeet",
    "summary": "How slow-motion 120fps captures and vibrant color science bring cheerful family celebrations alive.",
    "readTime": "7 min read",
    "image": "/assets/RSD_5132-rotated.jpg",
    "author": {
      "name": "Event Cinematographer",
      "role": "Visual Director",
      "image": "/assets/SRP_1277.jpg"
    },
    "body": "<h2>The Energy of Haldi Ceremonies</h2><p>‍</p><p>Bursting marigolds, turmeric splashes, and exuberant dancing call for high frame-rate cinematography. Filming at 120 frames per second allows us to stretch brief moments of pure joy into breathtaking, cinematic slow motion.</p>"
  },
  {
    "slug": "video-production-workflow",
    "related": [
      "camera-movement-basics",
      "building-brand-identity"
    ],
    "category": "Aerial Cinema",
    "title": "Why 4K Drone Aerials are Essential for Modern Weddings",
    "summary": "Elevating wedding films with grand overhead sweeps of magnificent mandaps, processions, and venue architecture.",
    "readTime": "6 min read",
    "image": "/assets/drone-wedding-aerials.webp",
    "author": {
      "name": "Drone Pilot",
      "role": "Licensed Drone Pilot",
      "image": "/assets/RSD_6016.jpg"
    },
    "body": "<h2>A Royal Bird's Eye Perspective</h2><p>‍</p><p>From dramatic venue fly-overs as guests arrive to tracking grand Baraat and wedding processions from the sky, 4K aerial shots set the epic scale of your wedding film.</p>"
  },
  {
    "slug": "cinematic-lighting-techniques",
    "related": [
      "camera-movement-basics",
      "building-brand-identity"
    ],
    "category": "Heirloom Prints",
    "title": "From Digital Files to Heirlooms: Lay-Flat Photobooks",
    "summary": "Why tactile, handcrafted flush-mount albums remain the ultimate heirloom for generations to come.",
    "readTime": "5 min read",
    "image": "/assets/RSD_2730.jpg",
    "author": {
      "name": "Album Master",
      "role": "Print & Color Master",
      "image": "/assets/SRP_1520.jpg"
    },
    "body": "<h2>Archival Luster &amp; Seamless Spreads</h2><p>‍</p><p>Digital files are vulnerable to lost hard drives and evolving formats. Our handcrafted 12x36 flush-mount photobooks are printed on museum-grade archival paper designed to last for over a century.</p>"
  }
];