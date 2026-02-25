'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin, Lock } from 'lucide-react';
import { Property } from '@/lib/sanity';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const slug = typeof property.slug === 'string' ? property.slug : property.slug?.current;

  return (
    <div className="bg-navy-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gold-500/20">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-navy-800">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : null}
        {property.hasOM && (
          <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Lock className="h-3 w-3" />
            OM Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white line-clamp-1">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-white/60 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {property.city}, {property.state} {property.zipCode}
        </div>

        <div className="flex items-center gap-4 text-white/60 mb-4">
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

        <div className="flex items-center justify-end">
          <Link
            href={`/portfolio/${slug}`}
            className="px-4 py-2 bg-gold-500 text-navy-900 rounded-lg font-medium hover:bg-gold-400 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
