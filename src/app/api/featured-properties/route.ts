import { NextResponse } from 'next/server'
import { getFeaturedProperties } from '@/lib/sanity'

export async function GET() {
  try {
    const properties = await getFeaturedProperties()
    return NextResponse.json({ properties })
  } catch (error) {
    console.error('Failed to fetch featured properties:', error)
    return NextResponse.json({ properties: [] }, { status: 200 })
  }
}
