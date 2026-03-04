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
    squareFeet: 0,
    yearBuilt: combined?.yearBuilt || 0,
    description: `${baseDescription} This asset is presented as a standalone entry in the portfolio.`,
    features: [
      'Multifamily',
      'Bronx Submarket',
      'Value-Add Potential',
      'Portfolio Asset',
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
    squareFeet: 0,
    yearBuilt: 0,
    description:
      'Multifamily asset in the Bronx, NY. Added as a separate portfolio entry with dedicated imagery.',
    features: [
      'Multifamily',
      'Bronx Submarket',
      'Income-Producing Asset',
      'Portfolio Asset',
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
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    yearBuilt: 0,
    description:
      'Single-family project in Brooklyn, NY. Acquired in 2016 for $935K with a day-1 appraised value of $1.35M. Renovation investment totaled $780K, stabilized in 2018, and current appraised value is $4.3M with a minimum 10-year hold plan.',
    features: [
      'Acquired: 2016',
      'Purchase Price: $935K',
      'Day-1 Appraised Value: $1.35M',
      'Renovation Cost: $780K',
      'Stabilized: 2018',
      'Current Appraised Value: $4.3M',
      'Holding Plan: Minimum 10 years',
    ],
    images: ['/images/properties/167-1.jpeg', '/images/properties/167-2.jpeg'],
    featured: false,
    hasOM: false,
  }

  const without167 = withoutCombined.filter((p) => slugValue(p) !== '167-beaumont-st')

  return [p1739, p1719, ...without167, p167]
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
