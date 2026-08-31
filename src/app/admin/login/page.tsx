import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdminUser } from '@/lib/auth/admin';
import { AdminLoginFormClient } from './AdminLoginFormClient';

export const dynamic = 'force-dynamic';

interface AdminLoginPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminLoginPage(props: AdminLoginPageProps) {
  // Authoritative server-side session check: if already authenticated, go directly to /admin
  const user = await getCurrentAdminUser();
  if (user && user.isActive) {
    redirect('/admin');
  }

  const searchParams = props.searchParams ? await props.searchParams : {};
  const isLoggedOut = searchParams.loggedOut === '1';

  return <AdminLoginFormClient isLoggedOut={isLoggedOut} />;
}
