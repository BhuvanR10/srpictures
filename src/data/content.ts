export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  rating: string;
  quote: string;
  image: string;
  poster: string;
  video: string;
  duration: string;
  seconds: number;
  logo?: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Manjunath Gowda",
    role: "DRONE & EVENT CINEMATOGRAPHY, BENGALURU",
    rating: "5.0/5",
    quote: "Very good professional photography and drone team! The aerial drone shots and overall event cinematography came out extraordinarily well. Best of luck to the entire SR Pictures crew!",
    image: "/assets/testimonials/testimonial-8-poster.jpg",
    poster: "/assets/testimonials/testimonial-8-poster.jpg",
    video: "/videos/testimonials/testimonial-8.mp4",
    duration: "0:26",
    seconds: 26.6
  },
  {
    id: 2,
    name: "Rohit & Megha",
    role: "WEDDING CINEMATOGRAPHY, BENGALURU",
    rating: "5.0/5",
    quote: "The coordination, attentiveness, and patience of the photography crew were outstanding. They were always at the right place at the right moment without ever getting in the way.",
    image: "/assets/testimonials/testimonial-2-poster.jpg",
    poster: "/assets/testimonials/testimonial-2-poster.jpg",
    video: "/videos/testimonials/testimonial-2.mp4",
    duration: "0:41",
    seconds: 41.2
  },
  {
    id: 3,
    name: "Vortex Infra Projects",
    role: "COMMERCIAL & INDUSTRIAL PRODUCTION, BENGALURU",
    rating: "5.0/5",
    quote: "SR Pictures handled our industrial production shoot with remarkable professionalism. From manufacturing machinery to corporate branding, their visuals gave our business an elevated presence.",
    image: "/assets/testimonials/testimonial-3-poster.jpg",
    poster: "/assets/testimonials/testimonial-3-poster.jpg",
    video: "/videos/testimonials/testimonial-3.mp4",
    duration: "1:02",
    seconds: 62.0
  },
  {
    id: 4,
    name: "Deepa & Vikram Mehta",
    role: "MATERNITY & COUPLE SHOOT, BENGALURU",
    rating: "5.0/5",
    quote: "We booked our outdoor photoshoot with SR Pictures and the experience was truly awesome. Looking at the camera preview and shots, the emotion and frames came out really great!",
    image: "/assets/testimonials/testimonial-4-poster.jpg",
    poster: "/assets/testimonials/testimonial-4-poster.jpg",
    video: "/videos/testimonials/testimonial-4.mp4",
    duration: "0:31",
    seconds: 31.2
  },
  {
    id: 5,
    name: "Abhishek & Family",
    role: "CAR DELIVERY & AUTOMOTIVE REEL, BENGALURU",
    rating: "5.0/5",
    quote: "Found SR Pictures through Google Reviews and booked them for our new car delivery. The personal attention, rapid turnaround, and cinematic reel that Shashi delivered were top-notch!",
    image: "/assets/testimonials/testimonial-5-poster.jpg",
    poster: "/assets/testimonials/testimonial-5-poster.jpg",
    video: "/videos/testimonials/testimonial-5.mp4",
    duration: "1:19",
    seconds: 79.6
  },
  {
    id: 6,
    name: "Sujay & Friends",
    role: "AUTOMOTIVE & SUPERBIKE CINEMATOGRAPHY, BENGALURU",
    rating: "5.0/5",
    quote: "Extremely budget-friendly without compromising on cinematic quality. From rolling drone tracking shots to high-speed bike closeups, they delivered pure visual adrenaline.",
    image: "/assets/testimonials/testimonial-6-poster.jpg",
    poster: "/assets/testimonials/testimonial-6-poster.jpg",
    video: "/videos/testimonials/testimonial-6.mp4",
    duration: "1:11",
    seconds: 71.0
  },
  {
    id: 7,
    name: "Balaji & Swathi",
    role: "CAR DELIVERY & SURPRISE EVENT, BENGALURU",
    rating: "5.0/5",
    quote: "I wanted to surprise my wife on Valentine's Day with our new XUV700. Even when the Mahindra CEO arrived unexpectedly, Shashi captured every priceless reaction. Completely satisfied!",
    image: "/assets/testimonials/testimonial-7-poster.jpg",
    poster: "/assets/testimonials/testimonial-7-poster.jpg",
    video: "/videos/testimonials/testimonial-7.mp4",
    duration: "1:05",
    seconds: 65.6
  },
  {
    id: 8,
    name: "Aishwarya & Karthik",
    role: "PRE-WEDDING & COUPLE SHOOT, BENGALURU",
    rating: "5.0/5",
    quote: "Looking back at the footage takes us right back to those beautiful moments. With minimal takes, the team captured genuine raw emotions and effortless candid chemistry.",
    image: "/assets/testimonials/testimonial-1-poster.jpg",
    poster: "/assets/testimonials/testimonial-1-poster.jpg",
    video: "/videos/testimonials/testimonial-1.mp4",
    duration: "0:54",
    seconds: 54.5
  }
];
export const faqItems = [
  {
    "q": "1. What photography and cinematography services does The SR Pictures provide?",
    "a": "We specialize in luxury Indian wedding films, showroom car delivery shoots, resort and luxury hospitality promotional films, pre-wedding couple shoots, and 4K aerial drone cinematography."
  },
  {
    "q": "2. Where are you based and what geographic locations do you cover?",
    "a": "The SR Pictures is based in Bengaluru, Karnataka, India. We regularly film across Bengaluru, Mysore, Coorg, Chikmagalur, Kabini, Ooty, Goa, Kerala, and travel across India and internationally for destination shoots."
  },
  {
    "q": "3. What is included in a Car Delivery Shoot with The SR Pictures?",
    "a": "Our car delivery packages start at ₹14,999 (Classic) and ₹24,999 (Signature Cine). Coverage includes showroom unveiling, key handover ceremony, family celebrations, rolling vehicle tracking, 4K Instagram reels, and an optional ₹8,000 4K drone upgrade."
  },
  {
    "q": "4. How do you produce Resort and Hospitality promotional films?",
    "a": "We produce 4K cinematic showcases combining interior and exterior architectural tours, villa lifestyle storytelling, fine dining and amenity highlights, and sweeping aerial drone vistas designed for high-conversion social campaigns and websites."
  },
  {
    "q": "5. What is the delivery timeline for edited photos and cinematic films?",
    "a": "Next-day teaser reels are delivered within 24 to 48 hours for instant social sharing. Full retouched photo galleries are delivered within 2 to 3 weeks, and master 4K cinematic films within 3 to 4 weeks."
  },
  {
    "q": "6. How can I reserve a wedding date or book a shoot with The SR Pictures?",
    "a": "You can reach us directly via WhatsApp at +91 96322 08050, email thesrpictures17@gmail.com, or submit our online contact form to check date availability and receive a custom proposal."
  }
];
export const testimonialIds = {
  "home": [
    [
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b0d0-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b0d2-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b0e3-805165a1"
    ],
    [
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b0ee-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b0f0-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b101-805165a1"
    ],
    [
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b10c-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b10e-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b11f-805165a1"
    ],
    [
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b12a-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b12c-805165a1",
      "w-node-_13b75589-1ed7-6d9c-5b18-094d91b3b13d-805165a1"
    ]
  ],
  "pricing": [
    [
      "w-node-_2980f196-9156-606d-9b25-297d85c44cac-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44cae-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44cbf-85c44ca6"
    ],
    [
      "w-node-_2980f196-9156-606d-9b25-297d85c44cca-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44ccc-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44cdd-85c44ca6"
    ],
    [
      "w-node-_2980f196-9156-606d-9b25-297d85c44ce8-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44cea-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44cfb-85c44ca6"
    ],
    [
      "w-node-_2980f196-9156-606d-9b25-297d85c44d06-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44d08-85c44ca6",
      "w-node-_2980f196-9156-606d-9b25-297d85c44d19-85c44ca6"
    ]
  ]
};
