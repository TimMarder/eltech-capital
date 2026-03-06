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
    const query = `*[_type == "property" && slug.current == "127-lakewood-dr"][0] {
      _id,
      title,
      bedrooms,
      bathrooms,
      squareFeet,
      yearBuilt,
      description
    }`;
    
    const prop = await client.fetch(query);
    console.log('Found property:', prop);

    const newDescription = `### Overview:
A brand-new, energy-efficient modern lakefront home in a gated community with custom modifications available.

### Construction Details:
Home built with energy-efficient SIP framing, ensuring reduced energy consumption and comfortable living year-round.

### Customization Options:
Flexible interior designs, with potential adjustments to wall locations, flooring, and window sizes.

### Community Amenities:
Includes lakes, skiing, hiking, fitness center, and more.

Price: $799,999 (with potential down-payment options and discounts for pre-payment).

### Property Description:
Extremely rare and unique opportunity to own a brand-new energy-efficient modern lakefront home directly from the developer in one of the best communities in the area. This custom-built home offers flexible interior designs to accommodate personalized desires and necessities. The construction is projected to be fully completed by the end of winter 2026, with advanced SIP framing technology ensuring year-round comfort and energy efficiency.

The ground floor features a sauna, mechanical room, large entertainment area with patio access, and customizable bedroom options. The first floor includes a living room with vaulted ceilings, a large family room with a fireplace, a custom-built kitchen with granite countertops and stainless steel appliances, and access to a full-size deck overlooking the lake. The second floor houses the master suite with a walk-in closet and jacuzzi, plus additional bedrooms and bathrooms.

Located in the Wild Acres community, this home offers numerous amenities including lakes, skiing, fitness centers, and more. For just $799,999, with flexible down-payment options and potential discounts for pre-payment, this is the hottest deal on the market.

### Property Features:
– Energy-efficient modern lakefront home
– Customizable interior design
– Full-size deck with lake access
– Spacious ground floor with high ceilings
– Master suite with walk-in closet and jacuzzi
– Modern kitchen with stainless steel appliances
– Gated community with 24/7 security

### Community Amenities:
– Multiple lakes for swimming and fishing
– Skiing and snowboarding nearby
– Hiking and ATV trails
– Fitness center and sports facilities
– Close to NYC and NJ`;

    const newFeatures = [
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
    ];

    await client
      .patch(prop._id)
      .set({ 
        bedrooms: 5,
        bathrooms: 3,
        squareFeet: 4548,
        yearBuilt: 2026,
        description: newDescription,
        features: newFeatures
      })
      .commit();
    
    console.log('✅ Updated 127 Lakewood Dr successfully!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateProperty();
