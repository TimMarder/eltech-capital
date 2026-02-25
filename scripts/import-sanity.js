import { createClient } from '@sanity/client'
import groq from 'groq'

const client = createClient({
  projectId: 'bgwibw1w',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skCEX9PCccWrYBFY9IVyrgLdE06HQCUhGy7aPeO15DSNgstgRHxY1BLrNh6Yqq3vKsjz0FjTUnLaUxwXCFuEugM8yJx6OkeQyJz3BnVSlLXnS74mRr7P6qHKdSHd3PnLshD5Gy8IFfQBEbfXHwkYg0xSUXE2TxnxeerKx2iCId8U0KiqsXWv'
})

// Property data from the existing site
const properties = [
  {
    _id: 'property-328-forest-dr',
    _type: 'property',
    title: '328 Forest Dr, Lords Valley, PA',
    slug: { _type: 'slug', current: '328-forest-dr' },
    address: '328 Forest Dr',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 999999,
    bedrooms: 6,
    bathrooms: 3,
    squareFeet: 4790,
    yearBuilt: 2024,
    description: 'This brand-new, one-of-a-kind, ultra-modern, energy-efficient luxury SMART European-style villa spans three floors, offering approximately 4,790 sq ft of living space with cathedral ceilings. The villa includes 6 bedrooms, 3 full bathrooms, and an office that can be used as an additional bedroom. Other key features include a dry Finnish sauna, a living room with a fireplace, multiple storage spaces, a dining area, and a modern Italian-designed custom kitchen with granite countertops.',
    features: ['Heating System', 'Cooling System', 'Balcony', 'Kitchen', 'Security System', 'Parking', 'Smart Home Features', 'Finnish Sauna', 'Radiant Heated Floors', 'Central HVAC', 'Wine Cooler', 'Smart WiFi Garage Door'],
    images: ['https://eltechdev.com/wp-content/uploads/WPL/30/thimg_328-Forest-Dr-03_300x300.jpg'],
    featured: true,
    hasOM: false
  },
  {
    _id: 'property-118-surrey-dr',
    _type: 'property',
    title: '118 Surrey Dr, Lords Valley, PA',
    slug: { _type: 'slug', current: '118-surrey-dr' },
    address: '118 Surrey Dr',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 799999,
    bedrooms: 6,
    bathrooms: 3,
    squareFeet: 4200,
    yearBuilt: 2024,
    description: 'This stunning modern villa offers luxury living with 6 bedrooms and 3 bathrooms across approximately 4,200 sq ft. Features include a gourmet kitchen with premium appliances, spacious living areas, smart home technology, and energy-efficient construction. Located in the gated Hemlock Farms community with access to pools, golf, tennis, and more.',
    features: ['Heating System', 'Cooling System', 'Balcony', 'Kitchen', 'Security System', 'Parking', 'Smart Home Features', 'Central HVAC'],
    images: ['https://eltechdev.com/wp-content/uploads/WPL/32/thimg_118-Surrey-Dr-01_300x300.jpg'],
    featured: true,
    hasOM: false
  },
  {
    _id: 'property-104-cedar-ln',
    _type: 'property',
    title: '104 Cedar Ln, Lords Valley, PA',
    slug: { _type: 'slug', current: '104-cedar-ln' },
    address: '104 Cedar Ln',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 549999,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    yearBuilt: 2024,
    description: 'Beautiful 4-bedroom, 3-bathroom villa in the desirable Hemlock Farms community. This modern home features an open floor plan, gourmet kitchen, and premium finishes throughout. Perfect for families seeking luxury living in a secure gated community with resort-style amenities.',
    features: ['Heating System', 'Cooling System', 'Kitchen', 'Parking', 'Smart Home Features'],
    images: ['https://eltechdev.com/wp-content/uploads/WPL/48/thimg_104-Cedar-Ln-01_300x300.jpg'],
    featured: true,
    hasOM: false
  },
  {
    _id: 'property-127-lakewood-dr',
    _type: 'property',
    title: '127 Lakewood Dr, Dingmans Ferry, PA',
    slug: { _type: 'slug', current: '127-lakewood-dr' },
    address: '127 Lakewood Dr',
    city: 'Dingmans Ferry',
    state: 'PA',
    zipCode: '18328',
    price: 799999,
    bedrooms: 7,
    bathrooms: 4,
    squareFeet: 5100,
    yearBuilt: 2024,
    description: 'Expansive 7-bedroom, 4-bathroom luxury villa spanning approximately 5,100 sq ft. This exceptional property features multiple living areas, a gourmet kitchen, smart home technology, and premium finishes throughout. Perfect for large families or those seeking ample space in a prestigious community.',
    features: ['Heating System', 'Cooling System', 'Balcony', 'Kitchen', 'Security System', 'Parking', 'Smart Home Features', 'Multiple Living Areas'],
    images: ['https://eltechdev.com/wp-content/uploads/WPL/50/thimg_127-Lakewood-Dr-01_300x300.jpg'],
    featured: false,
    hasOM: false
  },
  {
    _id: 'property-801-maple-ridge-ct',
    _type: 'property',
    title: '801 Maple Ridge Ct, Lords Valley, PA',
    slug: { _type: 'slug', current: '801-maple-ridge-ct' },
    address: '801 Maple Ridge Ct',
    city: 'Lords Valley',
    state: 'PA',
    zipCode: '18428',
    price: 600000,
    bedrooms: 5,
    bathrooms: 3,
    squareFeet: 3800,
    yearBuilt: 2024,
    description: 'Elegant 5-bedroom, 3-bathroom villa offering approximately 3,800 sq ft of luxury living. Features include an open-concept design, modern kitchen with premium appliances, spacious bedrooms, and a private backyard. Located in the gated Hemlock Farms community with world-class amenities.',
    features: ['Heating System', 'Cooling System', 'Kitchen', 'Parking', 'Smart Home Features'],
    images: ['https://eltechdev.com/wp-content/uploads/WPL/49/thimg_801-Maple-Ridge-Ct-01_300x300.jpg'],
    featured: false,
    hasOM: false
  },
  {
    _id: 'property-1739-grand-ave',
    _type: 'property',
    title: '1739 Grand Ave & 1719 Marmion Ave, Bronx, NY',
    slug: { _type: 'slug', current: '1739-grand-ave' },
    address: '1739 Grand Ave & 1719 Marmion Ave',
    city: 'Bronx',
    state: 'NY',
    zipCode: '10465',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    yearBuilt: 0,
    description: 'Prime multifamily investment opportunity in the Bronx. This property represents a strong investment opportunity in a desirable NYC location with strong rental demand.',
    features: ['Multifamily', 'Investment Property', 'Prime Location'],
    images: ['/images/1739-grand-1.jpg', '/images/1739-grand-2.jpg'],
    featured: false,
    hasOM: true
  }
]

async function importProperties() {
  console.log('Importing properties to Sanity...')
  
  for (const property of properties) {
    try {
      const result = await client.createOrReplace(property)
      console.log(`✓ Created: ${property.title}`)
    } catch (err) {
      console.error(`✗ Error creating ${property.title}:`, err)
    }
  }
  
  console.log('\n✅ Done importing properties!')
  
  // Verify
  const query = groq`*[_type == "property"]{title, price, featured}`
  const props = await client.fetch(query)
  console.log(`\nTotal properties in Sanity: ${props.length}`)
}

importProperties()
