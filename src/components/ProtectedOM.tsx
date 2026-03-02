'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, FileText, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ProtectedOMProps {
  propertyTitle: string;
  omUrl?: string;
}

export default function ProtectedOM({ propertyTitle, omUrl }: ProtectedOMProps) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-navy-900 border border-gold-500/30 rounded-lg p-4 mb-4">
        <div className="animate-pulse flex items-center gap-2 text-gold-400">
          <Lock className="h-4 w-4" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-navy-900 border border-gold-500/30 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-gold-400 font-medium mb-2">
          <Lock className="h-4 w-4" />
          Investor Only
        </div>
        <p className="text-sm text-white/60 mb-3">
          Login to access the Offering Memorandum for {propertyTitle}.
        </p>
        <Link
          href="/login"
          className="block w-full px-4 py-2 bg-gold-500 text-navy-900 text-center rounded-lg font-medium hover:bg-gold-400 transition-colors"
        >
          Login to Access OM
        </Link>
      </div>
    );
  }

  // User is logged in - show the OM
  return (
    <div className="bg-navy-900 border border-green-500/30 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
        <FileText className="h-4 w-4" />
        Offering Memorandum Available
      </div>
      <p className="text-sm text-white/60 mb-3">
        You have access to the OM for {propertyTitle}.
      </p>
      {omUrl ? (
        <a
          href={omUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-600 text-white text-center rounded-lg font-medium hover:bg-green-500 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download OM
        </a>
      ) : (
        <div className="text-sm text-white/50 text-center py-2">
          OM coming soon
        </div>
      )}
    </div>
  );
}
