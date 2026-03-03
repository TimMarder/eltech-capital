'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash fragment from the URL
        const hash = window.location.hash;
        
        // Check if there's an error in the URL
        const params = new URLSearchParams(hash.substring(1));
        const error = params.get('error');
        const errorCode = params.get('error_code');
        
        if (error) {
          setStatus('error');
          if (errorCode === 'otp_expired') {
            setMessage('This confirmation link has expired. Please request a new one.');
          } else {
            setMessage(`Error: ${error}`);
          }
          return;
        }

        // Exchange the code for a session
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          setStatus('error');
          setMessage('Failed to confirm your email. Please try again.');
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Your email has been confirmed! Redirecting you...');
          
          // Redirect to portfolio after a short delay
          setTimeout(() => {
            router.push('/portfolio');
          }, 2000);
        } else {
          // Try to exchange the code from the URL
          const code = params.get('code');
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              setStatus('error');
              setMessage('Invalid or expired confirmation link.');
            } else {
              setStatus('success');
              setMessage('Your email has been confirmed! Redirecting you...');
              setTimeout(() => {
                router.push('/portfolio');
              }, 2000);
            }
          } else {
            setStatus('error');
            setMessage('Invalid confirmation link.');
          }
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#14181f] flex items-center justify-center pt-20 pb-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#1a1f26] rounded-2xl shadow-lg p-8 border border-[#d4a33b]/30 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-16 w-16 text-[#e0bd6b] mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold text-[#f4f3f1] mb-2">Confirming your email...</h1>
              <p className="text-[#f4f3f1]/70">{message}</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-[#f4f3f1] mb-2">Email Confirmed!</h1>
              <p className="text-[#f4f3f1]/70 mb-6">{message}</p>
              <Link
                href="/portfolio"
                className="inline-block px-6 py-3 bg-[#d4a33b] text-[#14181f] rounded-lg font-medium hover:bg-[#e0bd6b] transition-colors"
              >
                Go to Portfolio
              </Link>
            </>
          )}
          
          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-[#f4f3f1] mb-2">Confirmation Failed</h1>
              <p className="text-[#f4f3f1]/70 mb-6">{message}</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-[#d4a33b] text-[#14181f] rounded-lg font-medium hover:bg-[#e0bd6b] transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
