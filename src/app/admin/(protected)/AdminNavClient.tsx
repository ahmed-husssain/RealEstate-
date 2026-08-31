'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Badge } from '@/ui/Badge';
import {
  LayoutDashboard,
  Building2,
  Inbox,
  Calculator,
  FileText,
  MapPin,
  Users,
  KeyRound,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { logoutAdminAction } from '@/lib/actions/admin-auth';

interface AdminNavClientProps {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function AdminNavClient({ user }: AdminNavClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isAdmin = user.role === 'ADMIN';

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Properties', href: '/admin/properties', icon: Building2 },
    { name: 'Client Inquiries', href: '/admin/inquiries', icon: Inbox },
    { name: 'Valuation Leads', href: '/admin/valuations', icon: Calculator },
    { name: 'Website Text CMS', href: '/admin/content', icon: FileText },
    { name: 'Karachi Areas', href: '/admin/areas', icon: MapPin },
    ...(isAdmin ? [{ name: 'Team Users & Admins', href: '/admin/users', icon: Users }] : []),
    { name: 'My Profile & Password', href: '/admin/profile', icon: KeyRound },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAdminAction();
    window.location.replace('/admin/login?loggedOut=1');
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#fbf6f0] border-b border-[#d8cebe] p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <BrandLogo href="/admin" imageClassName="h-7" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl border border-[#d8cebe] text-[#1F1B16] hover:bg-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#fbf6f0] border-r border-[#d8cebe] p-5 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-none'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo & Header */}
          <div className="space-y-3">
            <div className="hidden md:block">
              <BrandLogo href="/admin" imageClassName="h-8" />
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-[#d8cebe] shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#5c3822]/15 text-[#5c3822] flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#1F1B16] truncate">{user.name}</p>
                <div className="flex items-center gap-1">
                  <Badge variant={isAdmin ? 'exclusive' : 'stone'} size="sm" className="text-[9px] py-0 px-1.5">
                    {user.role}
                  </Badge>
                  <span className="text-[10px] text-[#7e7365] font-mono">Portal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-semibold'
                      : 'text-[#1F1B16] hover:bg-white hover:text-[#5c3822]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-[#d8cebe]/60">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-[#7e7365] hover:text-[#1F1B16] hover:bg-white transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
