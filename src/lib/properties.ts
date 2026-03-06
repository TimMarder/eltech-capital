// Static property data - will be replaced with Sanity CMS
export interface Property {
  id: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  hasOM: boolean;
}

export const properties: Property[] = [
  {
    id: '1',
    title: '328 Forest Dr, Lords Valley, PA',
    slug: '328-forest-dr',
    address: '328 Forest Dr',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 999999,
    bedrooms: 6,
    bathrooms: 3,
    squareFeet: 4790,
    yearBuilt: 2025,
    description: `This brand-new, one-of-a-kind, ultra-modern, energy-efficient luxury SMART European-style villa spans three floors, offering approximately 4,790 sq ft of living space with cathedral ceilings. The villa includes 6 bedrooms, 3 full bathrooms, and an office that can be used as an additional bedroom. Other key features include a dry Finnish sauna, a living room with a fireplace, multiple storage spaces, a dining area, and a modern Italian-designed custom kitchen with granite countertops.`,
    features: [
      'Heating System',
      'Cooling System',
      'Balcony',
      'Kitchen',
      'Security System',
      'Parking',
      'Smart Home Features',
      'Finnish Sauna',
      'Radiant Heated Floors',
      'Central HVAC',
      'Wine Cooler',
      'Smart WiFi Garage Door',
    ],
    images: [
      'https://eltechdev.com/wp-content/uploads/WPL/30/thimg_328-Forest-Dr-03_300x300.jpg',
    ],
    featured: true,
    hasOM: false,
  },
  {
    id: '2',
    title: '118 Surrey Dr, Lords Valley, PA',
    slug: '118-surrey-dr',
    address: '118 Surrey Dr',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 799999,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3690,
    yearBuilt: 2026,
    description: `This contemporary, luxurious SMART home offers approximately 3,690 sq ft of living space, spread across two floors. The residence features 4 bedrooms, 3 full bathrooms, and a spacious 2-car garage. The home is designed with open spaces, high ceilings, and large windows, allowing for plenty of natural light. The modern kitchen is equipped with top-of-the-line appliances, perfect for culinary enthusiasts.

Built with energy-efficient materials, this home is designed to reduce energy consumption. Advanced insulation and modern HVAC systems ensure the house remains comfortable year-round while minimizing utility costs.

This home boasts high-end finishes and modern design elements, including: custom European-style doors, glass railings for a sleek, open feel, energy-efficient central HVAC system, modern waterproof vinyl plank flooring, tankless water heater for on-demand hot water, and stylish, modern bathroom fixtures with LED lighting.

Advanced SMART HOME features include: security system with video doorbell, smart locks, and outdoor camera system; voice-activated system to control lights, thermostats, and garage doors with ease.

Key features include: living room with modern fireplace, open concept kitchen with island, granite countertops and high-end appliances, formal dining area with access to the backyard deck, large master suite with private bath and walk-in closet, large outdoor spaces including deck and landscaped yard, and heated 2-car garage with smart features.`,
    features: [
      'Custom European-style doors',
      'Glass railings for sleek, open feel',
      'Energy-efficient central HVAC system',
      'Modern waterproof vinyl plank flooring',
      'Tankless water heater',
      'Modern bathroom fixtures with LED lighting',
      'Video doorbell',
      'Smart locks',
      'Outdoor camera system',
      'Voice-activated system',
      'Modern fireplace',
      'Open concept kitchen with island',
      'Granite countertops',
      'High-end appliances',
      'Formal dining area',
      'Backyard deck access',
      'Master suite with private bath',
      'Walk-in closet',
      'Large outdoor spaces',
      'Landscaped yard',
      'Heated 2-car garage',
      'High ceilings',
      'Large windows',
      'Laundry room with utility sink',
      'Private balcony (master suite)',
      'Home office',
      'Spacious yard',
      'Close to schools and amenities',
      'Heating System',
      'Cooling System',
      'Kitchen',
      'Parking',
      'Smart Home Features',
      'Central HVAC',
    ],
    images: [
      'https://eltechdev.com/wp-content/uploads/WPL/32/thimg_118-Surrey-Dr-01_300x300.jpg',
    ],
    featured: true,
    hasOM: false,
  },
  {
    id: '3',
    title: '104 Cedar Ln, Lords Valley, PA',
    slug: '104-cedar-ln',
    address: '104 Cedar Ln',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 549999,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3300,
    yearBuilt: 2025,
    description: `HOLIDAY SPECIAL! PRICE REDUCED! COMPLETED and READY to MOVE IN! This beautiful 4-bedroom, 3-bathroom villa in the desirable Hemlock Farms community offers approximately 3,300 sq ft of luxury living. This modern home features an open floor plan, gourmet kitchen with premium finishes throughout, living room with fireplace, modern open concept kitchen with island and stainless-steel appliances, formal dining room, radiant heated floors throughout, combo A/C split system for cooling and heating, laundry/utility room on the 1st floor, bonus rooms (office/family room) on the 1st floor, master suite with private bath and walk-in closet, large deck and porch, heated 2-car garage with circular driveway, and advanced smart home security system. Perfect for families seeking luxury living in a secure gated community with resort-style amenities.`,
    features: [
      'Living Room with Fireplace',
      'Modern Open Concept Kitchen with Island',
      'Stainless-Steel Appliances',
      'Formal Dining Room',
      'Radiant Heated Floors Throughout',
      'Combo A/C Split System (Cooling/Heating)',
      'Laundry/Utility Room on 1st Floor',
      'Bonus Rooms (Office/Family Room) on 1st Floor',
      'Master Suite with Private Bath and Walk-in Closet',
      'Large Deck and Porch',
      'Heated 2-Car Garage',
      'Circular Driveway',
      'Advanced SMART HOME Security System',
      'Video Doorbell',
      'Outdoor Security Camera',
      'Interior Smart Burglar Alarm System',
      'SMART Lock',
      'Voice-Activated Smart Home Control',
      'Heating System',
      'Cooling System',
      'Kitchen',
      'Parking',
      'Smart Home Features',
    ],
    images: [
      'https://eltechdev.com/wp-content/uploads/WPL/48/thimg_104-Cedar-Ln-01_300x300.jpg',
    ],
    featured: true,
    hasOM: false,
  },
  {
    id: '4',
    title: '127 Lakewood Dr, Dingmans Ferry, PA',
    slug: '127-lakewood-dr',
    address: '127 Lakewood Dr',
    city: 'Dingmans Ferry',
    state: 'PA',
    zipCode: '18328',
    price: 799999,
    bedrooms: 5,
    bathrooms: 3,
    squareFeet: 4548,
    yearBuilt: 2026,
    description: `A brand-new, energy-efficient modern lakefront home in a gated community with custom modifications available. Home built with energy-efficient SIP framing, ensuring reduced energy consumption and comfortable living year-round. Flexible interior designs with potential adjustments to wall locations, flooring, and window sizes.

Extremely rare and unique opportunity to own a brand-new energy-efficient modern lakefront home directly from the developer in one of the best communities in the area. The construction is projected to be fully completed by the end of winter 2026, with advanced SIP framing technology ensuring year-round comfort and energy efficiency.

The ground floor features a sauna, mechanical room, large entertainment area with patio access, and customizable bedroom options. The first floor includes a living room with vaulted ceilings, a large family room with a fireplace, a custom-built kitchen with granite countertops and stainless steel appliances, and access to a full-size deck overlooking the lake. The second floor houses the master suite with a walk-in closet and jacuzzi, plus additional bedrooms and bathrooms.

Located in the Wild Acres community with numerous amenities including lakes, skiing, fitness centers, and more. Price: $799,999 with flexible down-payment options and potential discounts for pre-payment.`,
    features: [
      'Energy-efficient SIP framing',
      'Modern lakefront home',
      'Customizable interior design',
      'Flexible wall locations',
      'Custom flooring options',
      'Adjustable window sizes',
      'Full-size deck with lake access',
      'Spacious ground floor',
      'High ceilings',
      'Sauna',
      'Mechanical room',
      'Large entertainment area',
      'Patio access',
      'Living room with vaulted ceilings',
      'Family room with fireplace',
      'Custom-built kitchen',
      'Granite countertops',
      'Stainless steel appliances',
      'Master suite with walk-in closet',
      'Master suite with jacuzzi',
      'Gated community',
      '24/7 security',
      'Multiple lakes for swimming',
      'Fishing lakes',
      'Skiing nearby',
      'Snowboarding nearby',
      'Hiking trails',
      'ATV trails',
      'Fitness center',
      'Sports facilities',
      'Close to NYC',
      'Close to NJ',
      'Heating System',
      'Cooling System',
      'Balcony',
      'Kitchen',
      'Security System',
      'Parking',
      'Smart Home Features',
      'Multiple Living Areas',
    ],
    images: [
      'https://eltechdev.com/wp-content/uploads/WPL/50/thimg_127-Lakewood-Dr-01_300x300.jpg',
    ],
    featured: false,
    hasOM: false,
  },
  {
    id: '5',
    title: '801 Maple Ridge Ct, Lords Valley, PA',
    slug: '801-maple-ridge-ct',
    address: '801 Maple Ridge Ct',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 600000,
    bedrooms: 5,
    bathrooms: 3,
    squareFeet: 3800,
    yearBuilt: 2024,
    description: `Elegant 5-bedroom, 3-bathroom villa offering approximately 3,800 sq ft of luxury living. Features include an open-concept design, modern kitchen with premium appliances, spacious bedrooms, and a private backyard. Located in the gated Hemlock Farms community with world-class amenities.`,
    features: [
      'Heating System',
      'Cooling System',
      'Kitchen',
      'Parking',
      'Smart Home Features',
    ],
    images: [
      'https://eltechdev.com/wp-content/uploads/WPL/49/thimg_801-Maple-Ridge-Ct-01_300x300.jpg',
    ],
    featured: false,
    hasOM: false,
  },
  {
    id: '6',
    title: '1739 Grand Ave & 1719 Marmion Ave, Bronx, NY',
    slug: '1739-grand-ave',
    address: '1739 Grand Ave & 1719 Marmion Ave',
    city: 'Bronx',
    state: 'NY',
    zipCode: '10465',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    yearBuilt: 0,
    description: `Prime multifamily investment opportunity in the Bronx. This property represents a strong investment opportunity in a desirable NYC location with strong rental demand.`,
    features: [
      'Multifamily',
      'Investment Property',
      'Prime Location',
    ],
    images: [
      '/images/1739-grand-1.jpg',
      '/images/1739-grand-2.jpg',
    ],
    featured: false,
    hasOM: true,
  },
];

export const featuredProperties = properties.filter((p) => p.featured);
