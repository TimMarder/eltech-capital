'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // Try to save to Supabase (may fail if table doesn't exist yet)
      try {
        const { error: dbError } = await supabase.from('contact_submissions').insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone || null,
          email: formData.email,
          message: formData.message || null,
        });

        if (dbError) {
          console.log('Note: contact_submissions table may need to be created in Supabase');
        }
      } catch (dbErr) {
        console.log('Note: Supabase table not available yet');
      }

      // Send email via API route (which uses EmailJS)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        className="bg-green-900/30 border border-green-500/30 rounded-xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-xl font-bold text-[#f4f3f1] mb-2">Message Sent!</h3>
        <p className="text-[#f4f3f1]/70 mb-4">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <motion.button
          onClick={() => setStatus('idle')}
          className="text-[#e0bd6b] hover:text-gold-300 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send another message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AnimatePresence>
        {status === 'error' && (
          <motion.div 
            className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-start gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-medium">Failed to send message</p>
              <p className="text-red-400/70 text-sm">{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
            placeholder="John"
          />
        </motion.div>
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
            placeholder="Doe"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
            placeholder="(555) 123-4567"
          />
        </motion.div>
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
            placeholder="john@example.com"
          />
        </motion.div>
      </div>

      <motion.div
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none transition-all"
          placeholder="Tell us about your investment goals..."
        />
      </motion.div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#d4a33b] text-[#14181f] rounded-lg font-medium hover:bg-[#e0bd6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: '0 0 30px rgba(197, 160, 89, 0.4)' }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Sending...
          </>
        ) : (
          <>
            Submit
            <Send className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}
