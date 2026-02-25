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
  return sanityClient.fetch(query)
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
  return sanityClient.fetch(query)
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const query = `*[_type == "property" && slug.current == $slug][0] {
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
  return sanityClient.fetch(query, { slug })
}
