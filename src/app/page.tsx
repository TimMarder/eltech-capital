'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Compass, Calculator, ShieldCheck, KeyRound, Wrench, BarChart3, Handshake } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import ContactForm from '@/components/ContactForm';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Counter Component
function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' });
  const processInView = useInView(processRef, { once: true, margin: '-100px' });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: '-100px' });
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' });

  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);

  useEffect(() => {
    // Fetch properties client-side
    import('@/lib/sanity').then(({ getFeaturedProperties }) => {
      getFeaturedProperties().then(setFeaturedProperties);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Gradient Background (fallback for video) */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#14181f] via-[#1a1f26] to-[#14181f] animate-gradient" />
        
        {/* Video Background */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: heroOpacity }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </motion.video>
        
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#14181f]/70" />
        
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          style={{ scale: heroScale }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold text-[#f4f3f1] leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Building Wealth Through{' '}
                <span className="text-[#e0bd6b] luxury-text">Strategic Real Estate</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-[#f4f3f1]/80 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We identify high-performing multifamily investment opportunities backed by data, experience, and integrity.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-6 py-3 bg-[#d4a33b] text-[#14181f] rounded-lg font-medium hover:bg-[#e0bd6b] hover:scale-105 hover:shadow-gold transition-all duration-300"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-[#d4a33b] text-[#e0bd6b] rounded-lg font-medium hover:bg-[#d4a33b] hover:text-[#14181f] hover:scale-105 transition-all duration-300"
                >
                  Let&apos;s Connect
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats with Animated Counters */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div 
                className="bg-[#1a1f26]/80 backdrop-blur p-8 rounded-2xl border border-[#d4a33b]/30 text-center stat-card"
                whileHover={{ scale: 1.05, borderColor: 'rgba(197, 160, 89, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-5xl font-bold text-[#e0bd6b] mb-2">
                  <AnimatedCounter end={18} suffix="+" />
                </div>
                <div className="text-[#f4f3f1]/80">Years Of Experience</div>
              </motion.div>
              <motion.div 
                className="bg-[#1a1f26]/80 backdrop-blur p-8 rounded-2xl border border-[#d4a33b]/30 text-center stat-card"
                whileHover={{ scale: 1.05, borderColor: 'rgba(197, 160, 89, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-5xl font-bold text-[#e0bd6b] mb-2">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div className="text-[#f4f3f1]/80">Investment Projects</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section with Scroll Animations */}
      <section id="about" ref={aboutRef} className="py-20 bg-[#14181f] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={aboutInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-[#f4f3f1] mb-6">
                Building Wealth Through Strategic Real Estate Investments
              </h2>
              <p className="text-lg text-[#f4f3f1]/70 mb-6">
                At ELTECH Capital, we specialize in creating lasting value through strategic real estate investments. Our mission is to help investors build wealth and stability by identifying high-performing multifamily and commercial opportunities backed by data, experience, and integrity.
              </p>
              <ul className="space-y-4">
                {[
                  'Proven investment strategies',
                  'Data-driven property selection',
                  'Experienced management team',
                  'Transparent investor communications',
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center gap-3"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#e0bd6b]" />
                    <span className="text-[#f4f3f1]/70">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="relative h-96 bg-[#1a1f26] rounded-2xl overflow-hidden border border-[#d4a33b]/30"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: 'rgba(197, 160, 89, 0.5)' }}
            >
              <Image
                src="/images/about-image.webp"
                alt="Real estate partnership"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section with Step Animations */}
      <section id="process" ref={processRef} className="py-20 bg-[#1a1f26] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#f4f3f1] mb-4">Our Investment Process</h2>
            <p className="text-xl text-[#f4f3f1]/70">We make real estate investing simple and profitable</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? 'visible' : 'hidden'}
          >
            {[
              {
                title: 'PLAN',
                desc: 'Define strategy, target markets, investment criteria, and capital stack.',
                Icon: Compass,
              },
              {
                title: 'ANALYZE',
                desc: 'Underwrite NOI, DSCR, IRR, and run sensitivity analysis before making offers.',
                Icon: Calculator,
              },
              {
                title: 'SECURE',
                desc: 'Finalize debt, raise equity, and lock in the right capital structure.',
                Icon: ShieldCheck,
              },
              {
                title: 'ACQUIRE',
                desc: 'Complete due diligence, close, transition operations, and take ownership.',
                Icon: KeyRound,
              },
              {
                title: 'IMPROVE / OPERATE',
                desc: 'Execute value-add upgrades and asset-manage performance to grow NOI.',
                Icon: Wrench,
              },
              {
                title: 'STABILIZE / REFINANCE',
                desc: 'Achieve stabilized occupancy, optimize debt costs, and recapitalize when needed.',
                Icon: BarChart3,
              },
              {
                title: 'EXIT / DISPOSITION',
                desc: 'Time the exit, market the asset, and close the sale or refinance transaction.',
                Icon: Handshake,
              },
            ].map((step, index) => (
              <motion.div 
                key={step.title} 
                className="bg-[#14181f] rounded-2xl p-6 border border-[#d4a33b]/20 process-step"
                variants={itemVariants}
                whileHover={{ y: -10, borderColor: 'rgba(197, 160, 89, 0.5)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-[#1a1f26] rounded-xl flex items-center justify-center border border-[#d4a33b]/30"
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: '0 0 20px rgba(197, 160, 89, 0.35)'
                    }}
                  >
                    <step.Icon className="h-5 w-5 text-[#e0bd6b]" />
                  </motion.div>
                  <span className="text-sm font-semibold tracking-wider text-[#e0bd6b]/80">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-bold text-[#f4f3f1] mb-2">{step.title}</h3>
                <p className="text-sm text-[#f4f3f1]/65 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties with Stagger Animation */}
      <section ref={portfolioRef} className="py-20 bg-[#14181f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#f4f3f1] mb-4">Featured Projects</h2>
            <p className="text-xl text-[#f4f3f1]/70 mb-8">Discover our premium investment opportunities</p>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-[#e0bd6b] font-medium hover:text-gold-300 transition-colors"
            >
              View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={portfolioInView ? 'visible' : 'hidden'}
          >
            {featuredProperties.slice(0, 3).map((property, index) => (
              <motion.div key={property._id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section with Form Animations */}
      <section id="contact" ref={contactRef} className="py-20 bg-[#1a1f26] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate={contactInView ? 'visible' : 'hidden'}
          >
            <motion.h2 
              className="text-4xl font-bold text-[#f4f3f1] mb-6"
              variants={itemVariants}
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.p 
              className="text-lg text-[#f4f3f1]/70 mb-8"
              variants={itemVariants}
            >
              Ready to build wealth through real estate? Get in touch with us today.
            </motion.p>
            <motion.div variants={itemVariants}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
