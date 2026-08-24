'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Route transition finished
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Only trigger for internal local routes
      if (href.startsWith('/') && !href.startsWith('/#') && !href.startsWith('//')) {
        const url = new URL(href, window.location.origin);
        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          setLoading(true);
          setProgress(25);

          setTimeout(() => {
            setProgress((prev) => (prev < 80 ? prev + 45 : prev));
          }, 80);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-transparent overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#d8cebe] via-[#c59d5f] to-[#5c3822] transition-all duration-300 ease-out shadow-[0_0_8px_#c59d5f]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? 'width 200ms ease-out, opacity 250ms ease-in' : 'width 300ms ease-out',
        }}
      />
    </div>
  );
}

export default RouteProgressBar;
