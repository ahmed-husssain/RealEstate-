import React from 'react';
import { requireAuthUserPage } from '@/lib/auth/admin';
import { AdminNavClient } from './AdminNavClient';
import { AdminSessionGuard } from './AdminSessionGuard';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuthUserPage();

  return (
    <div className="min-h-screen bg-[#f5efe6] flex flex-col md:flex-row text-[#1F1B16]">
      {/* Client-Side BFCache Recovery Guard */}
      <AdminSessionGuard />

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
