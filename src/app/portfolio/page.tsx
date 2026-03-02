import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/sanity';
import { Lock } from 'lucide-react';

export const revalidate = 60;

export default async function PortfolioPage() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen bg-[#14181f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#e0bd6b] text-sm font-medium uppercase tracking-wider mb-2">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f4f3f1] mb-4">
            Featured Projects
          </h1>
          <p className="text-xl text-[#f4f3f1]/70 max-w-2xl mx-auto">
            Transforming opportunities into high-performing assets.
          </p>
        </div>

        {/* Login Banner for OM Access */}
        {properties.some(p => p.hasOM) && (
          <div className="bg-[#1a1f26] border border-[#d4a33b]/30 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-[#e0bd6b]" />
              <span className="text-[#f4f3f1]/80">
                Some properties have Offer Memorandums available. 
                <a href="/login" className="text-[#e0bd6b] underline font-medium ml-1">Login</a> to access.
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
                <div className="absolute top-4 left-4 bg-[#d4a33b] text-[#0d1117] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
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
