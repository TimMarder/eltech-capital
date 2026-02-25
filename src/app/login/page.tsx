'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            email,
            full_name: email.split('@')[0],
          });
        }

        setMessage('Check your email to confirm your account!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        router.push('/portfolio');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center pt-20 pb-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-navy-800 rounded-2xl shadow-lg p-8 border border-gold-500/30">
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            {isSignUp ? 'Create Your Account' : 'Login to Your Account'}
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-white/20 text-white placeholder-white/50 focus:border-gold-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-white/20 text-white placeholder-white/50 focus:border-gold-500 focus:outline-none"
                required
                minLength={6}
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-white/60">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-gold-400 hover:text-gold-300">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gold-500 text-navy-900 rounded-lg font-medium hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <p className="mt-6 text-center text-white/60">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
              className="text-gold-400 font-medium hover:text-gold-300"
            >
              {isSignUp ? 'Log In' : 'Register Now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
