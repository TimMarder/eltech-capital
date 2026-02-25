import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getFeaturedProperties } from '@/lib/sanity';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Tap Into the Power of{' '}
                <span className="text-slate-700">Multifamily Real Estate</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-lg">
                We simplify the investment process to help you build wealth through strategic real estate investments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-slate-800 text-slate-800 rounded-lg font-medium hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-slate-800 mb-2">18+</div>
                <div className="text-slate-600">Years Of Experience</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-5xl font-bold text-slate-800 mb-2">50+</div>
                <div className="text-slate-600">Investment Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Investment Process</h2>
            <p className="text-xl text-slate-600">We make real estate investing simple and profitable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'PLAN', desc: 'Success begins with smart planning.' },
              { title: 'ACQUIRE', desc: 'Strong returns start with great deals.' },
              { title: 'EXECUTE', desc: 'We take charge of every step in our business plan.' },
              { title: 'EXIT', desc: 'Maximizing investor returns is our priority.' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-slate-700">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-slate-600 mb-8">Discover our premium investment opportunities</p>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-slate-800 font-medium hover:text-slate-600"
            >
              View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Building Wealth Through Strategic Real Estate Investments
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                At ELTECH Capital, we specialize in creating lasting value through strategic real estate investments. Our mission is to help investors build wealth and stability by identifying high-performing multifamily and commercial opportunities backed by data, experience, and integrity.
              </p>
              <ul className="space-y-4">
                {[
                  'Proven investment strategies',
                  'Data-driven property selection',
                  'Experienced management team',
                  'Transparent investor communications',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-slate-700" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 bg-slate-200 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                alt="Luxury real estate"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Let&apos;s Connect</h2>
            <p className="text-lg text-slate-600 mb-8">
              Ready to build wealth through real estate? Get in touch with us today.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-800 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-800 focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
