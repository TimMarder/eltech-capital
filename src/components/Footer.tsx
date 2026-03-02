'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Facebook, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-navy-900 text-white border-t border-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-24 w-[250px]">
              <Image
                src="/images/CLEAR Horizontal Banner without margins.png"
                alt="ELTECH Capital"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/70 text-sm mt-3">
              We simplify the investment process to help you build wealth through strategic multifamily real estate investments.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3 text-gold-400">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/#about', label: 'About Us' },
                { href: '/#contact', label: 'Contact Us' },
              ].map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-gold-400 transition-colors inline-block hover:translate-x-1 transition-transform duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-3 text-gold-400">Contact Info</h3>
            <ul className="space-y-2">
              <motion.li 
                className="flex items-center gap-2 text-white/70"
                whileHover={{ x: 5, color: '#d4b06a' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Mail className="h-4 w-4" />
                info@eltechcapital.com
              </motion.li>
              <motion.li 
                className="flex items-center gap-2 text-white/70"
                whileHover={{ x: 5, color: '#d4b06a' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Phone className="h-4 w-4" />
                +1 (888) 886-1021
              </motion.li>
            </ul>
            <div className="flex items-center gap-4 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-white/70 hover:text-gold-400 transition-colors"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    color: '#d4b06a',
                    textShadow: '0 0 8px rgba(197, 160, 89, 0.8)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 300
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gold-500/20 mt-6 pt-4 text-center text-white/50 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© {new Date().getFullYear()} ELTECH Capital. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
