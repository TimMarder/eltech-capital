'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogOut, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = '/';
  };

  const getFirstName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    return 'User';
  };

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsOpen(false);
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#14181f]/98 backdrop-blur-xl border-b border-[#d4a33b]/40 shadow-lg' 
          : 'bg-[#14181f]/95 backdrop-blur-md border-b border-[#d4a33b]/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="relative h-28 w-72"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/images/CLEAR Horizontal Banner.png"
                alt="ELTECH Capital"
                fill
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#home"
              onClick={(e) => handleSmoothScroll(e, '/#home')}
              className="text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0bd6b] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#about"
              onClick={(e) => handleSmoothScroll(e, '/#about')}
              className="text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0bd6b] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#process"
              onClick={(e) => handleSmoothScroll(e, '/#process')}
              className="text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium transition-colors relative group"
            >
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0bd6b] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/portfolio"
              className="text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium transition-colors relative group"
            >
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0bd6b] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#contact"
              onClick={(e) => handleSmoothScroll(e, '/#contact')}
              className="text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium transition-colors relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e0bd6b] transition-all duration-300 group-hover:w-full" />
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#f4f3f1]/80">
                  <User className="h-4 w-4" />
                  <span>Hi, {getFirstName()}</span>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-[#f4f3f1]/20 text-[#f4f3f1]/80 rounded-lg font-medium hover:bg-[#f4f3f1]/10 hover:text-[#f4f3f1] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link href="/login">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 text-[#e0bd6b] hover:text-[#edd791] font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Investor Login
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-[#f4f3f1]"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-[#d4a33b]/30 bg-[#14181f]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/#home"
                onClick={(e) => handleSmoothScroll(e, '/#home')}
                className="block py-3 text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium"
              >
                Home
              </Link>
              <Link
                href="/#about"
                onClick={(e) => handleSmoothScroll(e, '/#about')}
                className="block py-3 text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium"
              >
                About
              </Link>
              <Link
                href="/#process"
                onClick={(e) => handleSmoothScroll(e, '/#process')}
                className="block py-3 text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium"
              >
                Process
              </Link>
              <Link
                href="/portfolio"
                className="block py-3 text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium"
              >
                Portfolio
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleSmoothScroll(e, '/#contact')}
                className="block py-3 text-[#f4f3f1]/80 hover:text-[#e0bd6b] font-medium"
              >
                Contact
              </Link>
              {user ? (
                <motion.button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="block mt-4 w-full px-4 py-2 border border-[#f4f3f1]/20 text-[#f4f3f1]/80 rounded-lg font-medium text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Logout
                </motion.button>
              ) : (
                <Link href="/login">
                  <motion.div
                    className="block mt-4 px-4 py-2 text-[#e0bd6b] font-medium text-center"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Investor Login
                  </motion.div>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
