const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'bgwibw1w',
  dataset: 'production',
  token: 'skCEX9PCccWrYBFY9IVyrgLdE06HQCUhGy7aPeO15DSNgstgRHxY1BLrNh6Yqq3vKsjz0FjTUnLaUxwXCFuEugM8yJx6OkeQyJz3BnVSlLXnS74mRr7P6qHKdSHd3PnLshD5Gy8IFfQBEbfXHwkYg0xSUXE2TxnxeerKx2iCId8U0KiqsXWv',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function updateProperty() {
  try {
    const query = `*[_type == "property" && slug.current == "118-surrey-dr"][0] {
      _id,
      title,
      bedrooms,
      squareFeet,
      yearBuilt,
      description
    }`;
    
    const prop = await client.fetch(query);
    console.log('Found property:', prop);

    const newDescription = `This contemporary, luxurious SMART home offers approximately 3,690 sq ft of living space, spread across two floors. The residence features 4 bedrooms, 3 full bathrooms, and a spacious 2-car garage. The home is designed with open spaces, high ceilings, and large windows, allowing for plenty of natural light. The modern kitchen is equipped with top-of-the-line appliances, perfect for culinary enthusiasts.

### Energy Efficiency:
Built with energy-efficient materials, this home is designed to reduce energy consumption. Advanced insulation and modern HVAC systems ensure the house remains comfortable year-round while minimizing utility costs.

### High-Quality Materials and Modern Design:
This home boasts high-end finishes and modern design elements, including:
• Custom European-style doors
• Glass railings for a sleek, open feel
• Energy-efficient central HVAC system
• Modern waterproof vinyl plank flooring
• Tankless water heater for on-demand hot water
• Stylish, modern bathroom fixtures with LED lighting

### Advanced SMART HOME Features:
• Security System: Includes a video doorbell, smart locks, and an outdoor camera system.
• Voice-Activated System: Control lights, thermostats, and garage doors with ease.

### Key Features:
• Living Room: Features a modern fireplace and ample space for relaxation.
• Open Concept Kitchen: Includes an island, granite countertops, and high-end appliances.
• Formal Dining Area: With access to the backyard deck.
• Large Master Suite: With a private bath and walk-in closet.
• Large Outdoor Spaces: Perfect for entertaining, including a deck and a landscaped yard.
• Heated Garage: Spacious enough for two cars, with smart features.

### First Floor:
• Foyer: Inviting entrance with high ceilings.
• Living Room: Cozy fireplace and large windows.
• Guest Bedroom: Conveniently located with a nearby full bathroom.
• Kitchen: Modern design with granite countertops and stainless-steel appliances.
• Laundry Room: Equipped with washer, dryer, and utility sink.

### Second Floor:
• Master Suite: Luxurious space with a private balcony and en-suite bathroom.
• Three Additional Bedrooms: Each with ample closet space.
• Home Office: Could also serve as an additional bedroom.
• Full Bathroom: Stylish and functional with modern fixtures.

### Lot:
• Spacious Yard: Perfect for outdoor activities and gardening.
• Attached Garage: 2-car capacity with smart features.

### Location:
Located in a serene, family-friendly neighborhood with convenient access to local amenities and top-rated schools. The property is within close proximity to shopping, dining, and recreational areas, making it an ideal home for families and professionals alike.`;

    const newFeatures = [
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
    ];

    await client
      .patch(prop._id)
      .set({ 
        bedrooms: 4,
        squareFeet: 3690,
        yearBuilt: 2026,
        description: newDescription,
        features: newFeatures
      })
      .commit();
    
    console.log('✅ Updated 118 Surrey Dr successfully!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateProperty();
