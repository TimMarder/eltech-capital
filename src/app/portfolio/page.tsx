import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/sanity';
import { Lock, Download } from 'lucide-react';

export const revalidate = 60;

export default async function PortfolioPage() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our collection of premium multifamily properties. 
            <span className="block mt-2 text-sm text-slate-500">
              <Lock className="inline h-4 w-4 mr-1" />
              Login to download Offer Memorandums
            </span>
          </p>
        </div>

        {/* Login Banner for OM Access */}
        {properties.some(p => p.hasOM) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-amber-600" />
              <span className="text-amber-800">
                Some properties have Offer Memorandums available. 
                <a href="/login" className="underline font-medium ml-1">Login</a> to access.
              </span>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property._id} className="relative">
              <PropertyCard property={property} />
              {property.hasOM && (
                <div className="absolute top-4 left-4 bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Investor Only
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
