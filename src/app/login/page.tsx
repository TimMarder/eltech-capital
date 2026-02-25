'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo - just redirect to portfolio
    router.push('/portfolio');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20 pb-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-6">
            Login to Your Account
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Username or Email Address
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-800 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-800 focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-slate-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-slate-800 font-medium hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
