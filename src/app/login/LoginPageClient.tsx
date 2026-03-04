'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  // Sync form mode with URL (?mode=signup | ?mode=login)
  useEffect(() => {
    const mode = searchParams.get('mode');
    setIsSignUp(mode === 'signup');
  }, [searchParams]);

  const handleAuthModeToggle = () => {
    const nextIsSignUp = !isSignUp;
    setIsSignUp(nextIsSignUp);
    setError('');
    setMessage('');
    router.replace(`/login?mode=${nextIsSignUp ? 'signup' : 'login'}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        // Get the current site URL for the redirect
        const siteUrl = typeof window !== 'undefined' 
          ? `${window.location.origin}/auth/callback`
          : 'https://eltech-capital-website.vercel.app/auth/callback';
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: siteUrl,
            data: {
              full_name: `${firstName} ${lastName}`.trim(),
              first_name: firstName,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            email,
            full_name: `${firstName} ${lastName}`.trim(),
          });
        }

        setMessage('Check your email to confirm your account! The email will come from info@eltechcapital.com.');
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
    <div className="min-h-screen bg-[#14181f] flex items-center justify-center pt-20 pb-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#1a1f26] rounded-2xl shadow-lg p-8 border border-[#d4a33b]/30">
          <h1 className="text-2xl font-bold text-[#f4f3f1] text-center mb-6">
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
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none"
                    required={isSignUp}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#f4f3f1]/80 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#14181f] border border-white/20 text-[#f4f3f1] placeholder-white/50 focus:border-[#d4a33b] focus:outline-none"
                required
                minLength={6}
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-[#f4f3f1]/60">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-[#e0bd6b] hover:text-gold-300">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#d4a33b] text-[#14181f] rounded-lg font-medium hover:bg-[#e0bd6b] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <p className="mt-6 text-center text-[#f4f3f1]/60">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={handleAuthModeToggle}
              className="text-[#e0bd6b] font-medium hover:text-[#d4a33b] cursor-pointer underline"
            >
              {isSignUp ? 'Log In' : 'Register Now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
