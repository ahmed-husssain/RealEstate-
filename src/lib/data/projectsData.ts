export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  category: 'turnkey' | 'renovation' | 'estate';
  area: string;
  gazSize: string;
  sqftArea: string;
  durationMonths: number;
  beforeImage: string;
  afterImage: string;
  beforeDescription: string;
  afterDescription: string;
  clientReview: {
    clientName: string;
    clientRole: string;
    rating: number;
    quote: string;
  };
  highlights: string[];
}

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-1',
    slug: 'north-nazimabad-block-d-240-gaz-turnkey',
    title: '240 Gaz Luxury Turnkey Construction',
    category: 'turnkey',
    area: 'North Nazimabad, Block D',
    gazSize: '240 Gaz (30 × 72 ft)',
    sqftArea: '2,160 Sq Ft Covered',
    durationMonths: 7.5,
    beforeImage: '/images/projects/project1_before.jpg',
    afterImage: '/images/projects/project1_after.jpg',
    beforeDescription: 'Raw structural excavation & demolition of a 1970s dilapidated single-storey unit.',
    afterDescription: 'Finished double-storey luxury bungalow with travertine stone facade and Italian porcelain interior.',
    clientReview: {
      clientName: 'Tariq Mehmood',
      clientRole: 'Overseas Pakistani (UAE)',
      rating: 5,
      quote: 'Syed Sikander Waqar supervised the foundation to the rooftop Italian tile finishing while I was in Dubai with transparent milestone billing.',
    },
    highlights: ['Grade-60 Steel Reinforcement', 'SBCA Approved Layout Plan', 'Concealed PPRC Plumbing', 'Double-Glazed Soundproof Glass'],
  },
  {
    id: 'proj-2',
    slug: 'gulshan-block-13c-120-gaz-renovation',
    title: '120 Gaz Complete Structural & Interior Renovation',
    category: 'renovation',
    area: 'Gulshan-e-Iqbal, Block 13-C',
    gazSize: '120 Gaz (24 × 45 ft)',
    sqftArea: '1,080 Sq Ft Covered',
    durationMonths: 1.5,
    beforeImage: '/images/projects/project2_before.jpg',
    afterImage: '/images/projects/project2_after.jpg',
    beforeDescription: 'Outdated 1990s layout, obsolete wiring, and broken terrazzo flooring.',
    afterDescription: 'Ultra-modern living space with Calacatta marble-look flooring, acrylic modular kitchen, and cove ambient lighting.',
    clientReview: {
      clientName: 'Dr. Asim Farooqui',
      clientRole: 'Resident Homeowner',
      rating: 5,
      quote: 'The transformation was complete in 45 days. The entire floor plan was modernized to open-concept perfection.',
    },
    highlights: ['Open-Concept Living Area', 'High-Gloss Italian Tiles', 'Gypsum False Ceilings', 'Custom Modular Wardrobes'],
  },
  {
    id: 'proj-3',
    slug: 'scheme-33-500-gaz-luxury-estate',
    title: '500 Gaz Corner Villa Build & Sanad Clearance',
    category: 'estate',
    area: 'Scheme 33 (Gulzar-e-Hijri)',
    gazSize: '500 Gaz Corner Plot',
    sqftArea: '4,500 Sq Ft Built-up',
    durationMonths: 9.0,
    beforeImage: '/images/projects/project3_before.jpg',
    afterImage: '/images/projects/project3_after.jpg',
    beforeDescription: 'Unfenced vacant corner plot with boundary dispute and delayed layout map.',
    afterDescription: 'Spanish architecture villa with terracotta tiles, arched galleries, boundary perimeter, and landscaped lawn.',
    clientReview: {
      clientName: 'Muhammad Salman',
      clientRole: 'Business Investor',
      rating: 5,
      quote: 'Handled both the legal due diligence with the society registrar and the full A-to-Z construction.',
    },
    highlights: ['Boundary Wall Demarcation', 'Sub-Registrar Title Sanad Verification', 'Spanish Clay Roof Tiles', 'Servant Quarters & 3-Car Porch'],
  },
];
