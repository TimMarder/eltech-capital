import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'eltech-capital-studio',
  title: 'ELTECH Capital Studio',
  projectId: 'bgwibw1w',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: 'property',
        title: 'Property',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'address', title: 'Address', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
          { name: 'state', title: 'State', type: 'string' },
          { name: 'zipCode', title: 'Zip Code', type: 'string' },
          { name: 'price', title: 'Price', type: 'number' },
          { name: 'bedrooms', title: 'Bedrooms', type: 'number' },
          { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
          { name: 'squareFeet', title: 'Square Feet', type: 'number' },
          { name: 'yearBuilt', title: 'Year Built', type: 'number' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
          { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] },
          { name: 'featured', title: 'Featured', type: 'boolean' },
          { name: 'hasOM', title: 'Has OM', type: 'boolean' },
        ],
      },
    ],
  },
})
