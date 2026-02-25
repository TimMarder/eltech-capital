import { getProperties, getPropertyBySlug } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, Bath, Square, MapPin, Lock, Check } from 'lucide-react';

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

  const formatPrice = (price: number) => {
    if (price === 0) return 'Contact for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] bg-slate-200 rounded-2xl overflow-hidden mb-8">
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
              <span className="text-slate-400">No Image Available</span>
            </div>
          )}
          {property.hasOM && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
              <Lock className="h-4 w-4" />
              OM Available
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {property.title}
            </h1>
            
            <div className="flex items-center text-slate-500 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Bed className="h-5 w-5 text-slate-600" />
                  <span className="font-medium">{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Bath className="h-5 w-5 text-slate-600" />
                  <span className="font-medium">{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.squareFeet > 0 && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Square className="h-5 w-5 text-slate-600" />
                  <span className="font-medium">{property.squareFeet.toLocaleString()} sqft</span>
                </div>
              )}
              {property.yearBuilt > 0 && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="font-medium">Built {property.yearBuilt}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-600">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="text-3xl font-bold text-slate-900 mb-6">
                {formatPrice(property.price)}
              </div>

              {property.hasOM && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
                    <Lock className="h-4 w-4" />
                    Investor Only
                  </div>
                  <p className="text-sm text-amber-700">
                    Login to access the Offering Memorandum for this property.
                  </p>
                </div>
              )}

              <Link
                href="/login"
                className="block w-full px-4 py-3 bg-slate-800 text-white text-center rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                {property.hasOM ? 'Login to Access OM' : 'Inquire About This Property'}
              </Link>

              <p className="mt-4 text-sm text-slate-500 text-center">
                Or call us at (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
