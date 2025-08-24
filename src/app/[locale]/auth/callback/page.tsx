"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// This is a client-side component responsible for handling the Supabase auth callback.
// It runs in the browser, detects the session from the URL, and then redirects the user.
export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // This listener waits for the signed-in event.
      if (event === 'SIGNED_IN') {
        // Once the user is signed in, we can safely redirect them.
        // We'll redirect to the generate page, preserving the current locale.
        // The locale is inferred from the URL structure by Next.js.
        // Preserve locale when redirecting
        const locale = window.location.pathname.split('/')[1] || 'en';
        router.push(`/${locale}/generate`);
      }
    });

    // Cleanup the subscription when the component unmounts.
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 mx-auto animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Finalizing authentication, please wait...</p>
      </div>
    </div>
  );
}

