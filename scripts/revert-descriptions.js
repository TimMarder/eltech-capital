const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'bgwibw1w',
  dataset: 'production',
  token: 'skCEX9PCccWrYBFY9IVyrgLdE06HQCUhGy7aPeO15DSNgstgRHxY1BLrNh6Yqq3vKsjz0FjTUnLaUxwXCFuEugM8yJx6OkeQyJz3BnVSlLXnS74mRr7P6qHKdSHd3PnLshD5Gy8IFfQBEbfXHwkYg0xSUXE2TxnxeerKx2iCId8U0KiqsXWv',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function revertDescriptions() {
  try {
    // Revert 118 Surrey Dr description
    const surreyQuery = `*[_type == "property" && slug.current == "118-surrey-dr"][0] { _id }`;
    const surrey = await client.fetch(surreyQuery);
    
    const surreyOriginalDesc = `This stunning modern villa offers luxury living with 4 bedrooms and 3 bathrooms across approximately 3,690 sq ft. Features include a gourmet kitchen with premium appliances, spacious living areas, smart home technology, and energy-efficient construction. Located in the gated Hemlock Farms community with access to pools, golf, tennis, and more.`;
    
    await client.patch(surrey._id).set({ description: surreyOriginalDesc }).commit();
    console.log('✅ Reverted 118 Surrey Dr description');
    
    // Revert 127 Lakewood Dr description
    const lakewoodQuery = `*[_type == "property" && slug.current == "127-lakewood-dr"][0] { _id }`;
    const lakewood = await client.fetch(lakewoodQuery);
    
    const lakewoodOriginalDesc = `Expansive 5-bedroom, 3-bathroom luxury villa spanning approximately 4,548 sq ft. This exceptional property features multiple living areas, a gourmet kitchen, smart home technology, and premium finishes throughout. Perfect for large families or those seeking ample space in a prestigious community.`;
    
    await client.patch(lakewood._id).set({ description: lakewoodOriginalDesc }).commit();
    console.log('✅ Reverted 127 Lakewood Dr description');
    
    console.log('\n✅ Both descriptions reverted successfully!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

revertDescriptions();
