import { getProperties, getPropertyBySlug } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, Bath, Square, MapPin, Check, Mail, Phone } from 'lucide-react';
import ProtectedOM from '@/components/ProtectedOM';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({
    slug: property.slug.current,
  }));
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const omUrlBySlug: Record<string, string> = {
    '1739-grand-ave': '/om/1739-grand-ave-1719-marmion-ave-offering-memorandum.pdf',
  };
  const omUrl = omUrlBySlug[slug];

  return (
    <div className="min-h-screen bg-[#14181f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-[#e0bd6b] hover:text-gold-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] bg-[#1a1f26] rounded-2xl overflow-hidden mb-8 border border-[#d4a33b]/30">
          {property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-[#f4f3f1]/40">No Image Available</span>
            </div>
          )}
          {property.hasOM && (
            <div className="absolute top-4 right-4 bg-[#d4a33b] text-[#14181f] px-4 py-2 rounded-full font-medium flex items-center gap-2">
              <Check className="h-4 w-4" />
              OM Available
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[#f4f3f1] mb-4">
              {property.title}
            </h1>
            
            <div className="flex items-center text-[#f4f3f1]/60 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2 bg-[#1a1f26] px-4 py-2 rounded-lg border border-white/10">
                  <Bed className="h-5 w-5 text-[#e0bd6b]" />
                  <span className="font-medium text-[#f4f3f1]">{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-2 bg-[#1a1f26] px-4 py-2 rounded-lg border border-white/10">
                  <Bath className="h-5 w-5 text-[#e0bd6b]" />
                  <span className="font-medium text-[#f4f3f1]">{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.squareFeet > 0 && (
                <div className="flex items-center gap-2 bg-[#1a1f26] px-4 py-2 rounded-lg border border-white/10">
                  <Square className="h-5 w-5 text-[#e0bd6b]" />
                  <span className="font-medium text-[#f4f3f1]">{property.squareFeet.toLocaleString()} sqft</span>
                </div>
              )}
              {property.yearBuilt > 0 && (
                <div className="flex items-center gap-2 bg-[#1a1f26] px-4 py-2 rounded-lg border border-white/10">
                  <span className="font-medium text-[#f4f3f1]">Built {property.yearBuilt}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-[#1a1f26] rounded-2xl p-6 border border-white/10 mb-8">
              <h2 className="text-xl font-bold text-[#f4f3f1] mb-4">Description</h2>
              <p className="text-[#f4f3f1]/70 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-[#1a1f26] rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-[#f4f3f1] mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#f4f3f1]/70">
                      <Check className="h-4 w-4 text-[#e0bd6b]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1f26] rounded-2xl p-6 border border-[#d4a33b]/30 sticky top-24">
              {property.hasOM && (
                <ProtectedOM propertyTitle={property.title} omUrl={omUrl} />
              )}

              <Link
                href="/#contact"
                className="block w-full px-4 py-3 bg-[#d4a33b] text-[#14181f] text-center rounded-lg font-medium hover:bg-[#e0bd6b] transition-colors"
              >
                Inquire About This Property
              </Link>

              <div className="mt-4 space-y-3">
                <a
                  href="mailto:eltechcapital@gmail.com"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-white/20 text-[#f4f3f1]/80 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
                <a
                  href="tel:+18888861021"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-white/20 text-[#f4f3f1]/80 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (888) 886-1021
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
