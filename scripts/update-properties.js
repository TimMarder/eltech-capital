const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'bgwibw1w',
  dataset: 'production',
  token: 'skCEX9PCccWrYBFY9IVyrgLdE06HQCUhGy7aPeO15DSNgstgRHxY1BLrNh6Yqq3vKsjz0FjTUnLaUxwXCFuEugM8yJx6OkeQyJz3BnVSlLXnS74mRr7P6qHKdSHd3PnLshD5Gy8IFfQBEbfXHwkYg0xSUXE2TxnxeerKx2iCId8U0KiqsXWv',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function updateProperties() {
  try {
    // Find properties by slug
    const query = `*[_type == "property" && (slug.current == "328-forest-dr" || slug.current == "104-cedar-ln")] {
      _id,
      title,
      slug,
      yearBuilt,
      squareFeet,
      features
    }`;
    
    const properties = await client.fetch(query);
    console.log('Found properties:', properties.map(p => ({ id: p._id, slug: p.slug.current, title: p.title })));

    for (const prop of properties) {
      const slug = prop.slug.current;
      
      if (slug === '328-forest-dr') {
        // Update 328 Forest Dr - year built to 2025
        console.log(`Updating ${prop.title}...`);
        await client
          .patch(prop._id)
          .set({ yearBuilt: 2025 })
          .commit();
        console.log(`✓ Updated ${prop.title}: yearBuilt = 2025`);
      }
      
      if (slug === '104-cedar-ln') {
        // Update 104 Cedar Ln - sqft, year, features
        console.log(`Updating ${prop.title}...`);
        const newFeatures = [
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
        ];
        
        await client
          .patch(prop._id)
          .set({ 
            squareFeet: 3300,
            yearBuilt: 2025,
            features: newFeatures
          })
          .commit();
        console.log(`✓ Updated ${prop.title}: squareFeet = 3300, yearBuilt = 2025, features updated`);
      }
    }
    
    console.log('\n✅ All updates complete!');
  } catch (error) {
    console.error('Error updating properties:', error);
    process.exit(1);
  }
}

updateProperties();
