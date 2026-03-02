'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] text-[#f4f3f1] border-t border-[#d4a33b]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-48">
                <Image
                  src="/images/CLEAR Horizontal Banner.png"
                  alt="ELTECH Capital"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.p 
            className="text-[#f4f3f1]/50 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            © {new Date().getFullYear()} ELTECH Capital. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
