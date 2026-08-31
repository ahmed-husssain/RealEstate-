'use client';

import { useEffect } from 'react';

export function AdminSessionGuard() {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // event.persisted is true when the page is restored from browser BFCache (e.g. Back/Forward button)
      if (event.persisted) {
        // Force a fresh network request so middleware, server authentication, and database session validation execute
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return null;
}
