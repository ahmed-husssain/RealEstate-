import React from 'react';
import { getCurrentAdminUser } from '@/lib/auth/admin';
import { AdminNavClient } from './AdminNavClient';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentAdminUser();

  // If on login page or unauthenticated, render children directly (middleware will guard protected paths)
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f5efe6] flex flex-col md:flex-row text-[#1F1B16]">
      {/* Sidebar Navigation */}
      <AdminNavClient user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
