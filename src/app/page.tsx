import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getFeaturedProperties } from '@/lib/sanity';

export const revalidate = 60;

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-navy-900/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Building Wealth Through{' '}
                <span className="text-gold-400">Strategic Real Estate</span>
              </h1>
              <p className="text-xl text-white/80 max-w-lg">
                We identify high-performing multifamily investment opportunities backed by data, experience, and integrity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-6 py-3 bg-gold-500 text-navy-900 rounded-lg font-medium hover:bg-gold-400 transition-colors"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-gold-500 text-gold-400 rounded-lg font-medium hover:bg-gold-500 hover:text-navy-900 transition-colors"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-navy-800/80 backdrop-blur p-8 rounded-2xl border border-gold-500/30 text-center">
                <div className="text-5xl font-bold text-gold-400 mb-2">18+</div>
                <div className="text-white/80">Years Of Experience</div>
              </div>
              <div className="bg-navy-800/80 backdrop-blur p-8 rounded-2xl border border-gold-500/30 text-center">
                <div className="text-5xl font-bold text-gold-400 mb-2">50+</div>
                <div className="text-white/80">Investment Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Investment Process</h2>
            <p className="text-xl text-white/70">We make real estate investing simple and profitable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'PLAN', desc: 'Success begins with smart planning.' },
              { title: 'ACQUIRE', desc: 'Strong returns start with great deals.' },
              { title: 'EXECUTE', desc: 'We take charge of every step in our business plan.' },
              { title: 'EXIT', desc: 'Maximizing investor returns is our priority.' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/30">
                  <span className="text-3xl font-bold text-gold-400">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Properties</h2>
            <p className="text-xl text-white/70 mb-8">Discover our premium investment opportunities</p>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-gold-400 font-medium hover:text-gold-300"
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
      <section id="about" className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Building Wealth Through Strategic Real Estate Investments
              </h2>
              <p className="text-lg text-white/70 mb-6">
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
                    <CheckCircle2 className="h-5 w-5 text-gold-400" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 bg-navy-800 rounded-2xl overflow-hidden border border-gold-500/30">
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
      <section id="contact" className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Let&apos;s Connect</h2>
            <p className="text-lg text-white/70 mb-8">
              Ready to build wealth through real estate? Get in touch with us today.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-white/20 text-white placeholder-white/50 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-white/20 text-white placeholder-white/50 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-white/20 text-white placeholder-white/50 focus:border-gold-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gold-500 text-navy-900 rounded-lg font-medium hover:bg-gold-400 transition-colors"
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
