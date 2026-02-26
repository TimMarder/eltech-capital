import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white border-t border-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="text-left">
            <div className="relative h-[346px] w-[194px] mb-4">
              <Image
                src="/images/CLEAR Horizontal Banner NO MARGINS.jpeg"
                alt="ELTECH Capital"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/70">
              We simplify the investment process to help you build wealth through strategic multifamily real estate investments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-white/70 hover:text-gold-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-gold-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-gold-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4" />
                info@eltechcapital.com
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="h-4 w-4" />
                +1 (888) 886-1021
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-white/70 hover:text-gold-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-8 pt-8 text-center text-white/50">
          <p>© {new Date().getFullYear()} ELTECH Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
