import { Suspense } from 'react';
import LoginPageClient from './LoginPageClient';

function LoginPageFallback() {
  return (
    <div className="min-h-screen bg-[#14181f] flex items-center justify-center pt-20 pb-16">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#1a1f26] rounded-2xl shadow-lg p-8 border border-[#d4a33b]/30 text-center text-[#f4f3f1]/80">
          Loading...
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginPageClient />
    </Suspense>
  );
}
