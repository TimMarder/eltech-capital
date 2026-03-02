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

  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-gold-400 hover:text-gold-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] bg-navy-800 rounded-2xl overflow-hidden mb-8 border border-gold-500/30">
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
              <span className="text-white/40">No Image Available</span>
            </div>
          )}
          {property.hasOM && (
            <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 px-4 py-2 rounded-full font-medium flex items-center gap-2">
              <Check className="h-4 w-4" />
              OM Available
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {property.title}
            </h1>
            
            <div className="flex items-center text-white/60 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-lg border border-white/10">
                  <Bed className="h-5 w-5 text-gold-400" />
                  <span className="font-medium text-white">{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-lg border border-white/10">
                  <Bath className="h-5 w-5 text-gold-400" />
                  <span className="font-medium text-white">{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.squareFeet > 0 && (
                <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-lg border border-white/10">
                  <Square className="h-5 w-5 text-gold-400" />
                  <span className="font-medium text-white">{property.squareFeet.toLocaleString()} sqft</span>
                </div>
              )}
              {property.yearBuilt > 0 && (
                <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-lg border border-white/10">
                  <span className="font-medium text-white">Built {property.yearBuilt}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-navy-800 rounded-2xl p-6 border border-white/10 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Description</h2>
              <p className="text-white/70 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-navy-800 rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/70">
                      <Check className="h-4 w-4 text-gold-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-navy-800 rounded-2xl p-6 border border-gold-500/30 sticky top-24">
              {property.hasOM && (
                <ProtectedOM propertyTitle={property.title} />
              )}

              <Link
                href="/login"
                className="block w-full px-4 py-3 bg-gold-500 text-navy-900 text-center rounded-lg font-medium hover:bg-gold-400 transition-colors"
              >
                {property.hasOM ? 'Login to Access OM' : 'Inquire About This Property'}
              </Link>

              <div className="mt-4 space-y-3">
                <a
                  href="mailto:eltechcapital@gmail.com"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-white/20 text-white/80 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
                <a
                  href="tel:+18888861021"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-white/20 text-white/80 rounded-lg font-medium hover:bg-white/10 transition-colors"
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
