'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin, Lock } from 'lucide-react';
import { Property } from '@/lib/sanity';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Contact for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-200">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Hide image on error, show fallback
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-slate-400 text-sm">No Image Available</span>
        </div>
        {property.hasOM && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Lock className="h-3 w-3" />
            OM Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {property.city}, {property.state} {property.zipCode}
        </div>

        <div className="flex items-center gap-4 text-slate-600 mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
          )}
          {property.squareFeet > 0 && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span className="text-sm">{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-800">
            {formatPrice(property.price)}
          </span>
          <Link
            href={`/portfolio/${property.slug}`}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
