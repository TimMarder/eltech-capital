import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bgwibw1w',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export interface Property {
  _id: string
  title: string
  slug: { current: string }
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  yearBuilt: number
  description: string
  features: string[]
  images: string[]
  featured: boolean
  hasOM: boolean
}

function slugValue(property: Property) {
  return property?.slug?.current || ''
}

function applyPortfolioOverrides(properties: Property[]): Property[] {
  const combined = properties.find(
    (p) => slugValue(p) === '1739-grand-ave' || p.title.toLowerCase().includes('1719 marmion')
  )

  const withoutCombined = properties.filter(
    (p) => !(slugValue(p) === '1739-grand-ave' || p.title.toLowerCase().includes('1719 marmion'))
  )

  const baseCity = combined?.city || 'Bronx'
  const baseState = combined?.state || 'NY'
  const baseZip = combined?.zipCode || '10457'
  const baseDescription =
    combined?.description ||
    'Prime multifamily investment opportunity in the Bronx with strong rental demand and long-term upside.'

  const p1739: Property = {
    _id: combined?._id ? `${combined._id}-1739` : 'manual-1739-grand-ave',
    title: '1739 Grand Ave',
    slug: { current: '1739-grand-ave' },
    address: '1739 Grand Ave',
    city: baseCity,
    state: baseState,
    zipCode: baseZip,
    price: combined?.price || 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 26428,
    yearBuilt: 2022,
    description:
      'Verified multifamily asset in the Bronx (NYC MapPLUTO). This standalone entry includes 31 residential units and approximately 26,428 gross building square feet.',
    features: [
      'Multifamily',
      '31 Residential Units (verified)',
      '26,428 Building Sq Ft (verified)',
      'Lot Area: 5,577 Sq Ft (verified)',
      'Building Class: D1',
      'Bronx Submarket',
    ],
    images: [
      '/images/properties/1739-1.jpeg',
      '/images/properties/1739-2.jpeg',
      '/images/properties/1739-3.jpeg',
    ],
    featured: false,
    hasOM: false,
  }

  const p1719: Property = {
    _id: combined?._id ? `${combined._id}-1719` : 'manual-1719-marmion-ave',
    title: '1719 Marmion Ave',
    slug: { current: '1719-marmion-ave' },
    address: '1719 Marmion Ave',
    city: baseCity,
    state: baseState,
    zipCode: baseZip,
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 2400,
    yearBuilt: 0,
    description:
      'Multifamily asset in the Bronx, NY. This entry is split out with dedicated imagery. Current square footage is listed as an unverified third-party estimate while official public-record metrics are being finalized.',
    features: [
      'Multifamily',
      'Bronx Submarket',
      'Income-Producing Asset',
      'Estimated Building Size: ~2,400 Sq Ft (unverified third-party source)',
      'Official records pending final verification',
    ],
    images: ['/images/properties/1719-1.jpeg'],
    featured: false,
    hasOM: false,
  }

  const p167: Property = {
    _id: 'manual-167-beaumont-st',
    title: '167 Beaumont St',
    slug: { current: '167-beaumont-st' },
    address: '167 Beaumont St',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11235',
    price: 935000,
    bedrooms: 6,
    bathrooms: 6,
    squareFeet: 2488,
    yearBuilt: 2020,
    description:
      'Exceptional fully rebuilt residence in prime Brooklyn offering refined modern finishes, efficient layout, and strong long-term value. This professionally executed property features 6 bedrooms and 6 bathrooms, curated for both comfortable end-user living and durable investment performance in one of NYC\'s most resilient submarkets. Positioned with convenient access to neighborhood retail, transit corridors, and lifestyle amenities, 167 Beaumont St combines design quality with disciplined asset fundamentals.',
    features: [
      '6 Bedrooms',
      '6 Bathrooms',
      'Property Type: Single-Family (1 Residential Unit, verified)',
      'Building Area: 2,488 Sq Ft (verified)',
      'Lot Area: 4,000 Sq Ft (verified)',
      'Fully Rebuilt: 2020',
      'Acquired: 2016',
      'Purchase Price: $935K',
      'Day-1 Appraised Value: $1.35M',
      'Renovation Cost: $780K',
      'Stabilized: 2018',
      'Current Appraised Value: $4.3M',
      'Holding Plan: Minimum 10 years',
    ],
    images: [
      '/images/properties/167-1.jpeg',
      '/images/properties/167-2.jpeg',
      '/images/properties/167-3.jpeg',
      '/images/properties/167-4.jpeg',
      '/images/properties/167-5.jpeg',
      '/images/properties/167-6.jpeg',
      '/images/properties/167-7.jpeg',
      '/images/properties/167-8.jpeg',
      '/images/properties/167-9.jpeg',
    ],
    featured: false,
    hasOM: false,
  }

  const without167 = withoutCombined.filter((p) => slugValue(p) !== '167-beaumont-st')

  const legacyImagesBySlug: Record<string, string[]> = {
    '328-forest-dr': [
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-01.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-02.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-03.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-04.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-05.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-06.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-07.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-08.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-09.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-10.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-11.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-12.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-13.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-14.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-15.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-16.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-17.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-18.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-19.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/30/img_328-Forest-Dr-20.jpg',
    ],
    '118-surrey-dr': [
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_1.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_2.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_3.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_4.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_5.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_6.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_7.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_8.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_9.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_10.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_11.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_15.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_20.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_21.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_22.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_23.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_24.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_28.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_31.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/32/img_32.jpg',
    ],
    '104-cedar-ln': [
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-01-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-02-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-03-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-04-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-05-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-06-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-07-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-08-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-09-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-10-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-11-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-12-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-13-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-14-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-15-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-16-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-17-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-18-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-19-Large.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/48/img_104-Cedar-Ln-20-Large.jpg',
    ],
    '127-lakewood-dr': [
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_00.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_01.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_1.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_2.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_3.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_4.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_5.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_6.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_7.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_8.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_9.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_10.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_11.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_12.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_14.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_15.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_16.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_17.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_18.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/50/img_19.jpg',
    ],
    '801-maple-ridge-ct': [
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-52-38.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-53-22.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-53-42.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-53-54.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-54-05.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-54-19.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-54-47.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-54-57.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-55-30.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-55-57.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-56-04.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-56-34.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-57-13.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-57-21.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-57-35.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-57-44.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-57-54.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-58-03.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-58-20.jpg',
      'https://eltechdev.com/wp-content/uploads/WPL/49/img_Photo-Sep-28-2022_-12-58-29.jpg',
    ],
  }

  const patched = without167.map((p) => {
    const slug = slugValue(p)
    const overrideImages = legacyImagesBySlug[slug]
    return overrideImages?.length ? { ...p, images: overrideImages } : p
  })

  return [p1739, p1719, ...patched, p167]
}

export async function getProperties(): Promise<Property[]> {
  const query = `*[_type == "property"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    address,
    city,
    state,
    "zipCode": zipCode,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    description,
    features,
    images,
    featured,
    hasOM
  }`
  const properties: Property[] = await sanityClient.fetch(query)
  return applyPortfolioOverrides(properties)
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const query = `*[_type == "property" && featured == true][0...3] {
    _id,
    title,
    slug,
    address,
    city,
    state,
    "zipCode": zipCode,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    description,
    features,
    images,
    featured,
    hasOM
  }`
  const properties: Property[] = await sanityClient.fetch(query)
  return applyPortfolioOverrides(properties)
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const properties = await getProperties()
  return properties.find((p) => slugValue(p) === slug) || null
}
