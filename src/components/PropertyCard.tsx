'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin, Lock } from 'lucide-react';
import { Property } from '@/lib/sanity';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const slug = typeof property.slug === 'string' ? property.slug : property.slug?.current;

  return (
    <motion.div 
      className="bg-[#1a1f26] rounded-xl shadow-lg overflow-hidden border border-[#d4a33b]/20 property-card"
      whileHover={{ 
        y: -10,
        borderColor: 'rgba(212, 163, 59, 0.5)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 163, 59, 0.2)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#232830]">
        {property.images[0] ? (
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </motion.div>
        ) : null}
        {property.hasOM && (
          <motion.div 
            className="absolute top-4 right-4 bg-[#d4a33b] text-[#0d1117] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            <Lock className="h-3 w-3" />
            OM Available
          </motion.div>
        )}

      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <motion.h3 
            className="text-lg font-bold text-[#f4f3f1] line-clamp-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {property.title}
          </motion.h3>
        </div>
        
        <motion.div 
          className="flex items-center text-[#f4f3f1]/60 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MapPin className="h-4 w-4 mr-1" />
          {property.city}, {property.state} {property.zipCode}
        </motion.div>

        <motion.div 
          className="flex items-center gap-4 text-[#f4f3f1]/60 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
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
              <span className="text-sm">{property.squareFeet.toLocaleString()}</span>
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-between">
          <span className="text-[#e0bd6b] font-semibold">
            {property.price ? `$${property.price.toLocaleString()}` : 'Contact for Pricing'}
          </span>
          <Link href={`/portfolio/${slug}`}>
            <motion.div
              className="flex items-center gap-1 text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium transition-colors cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Details
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
