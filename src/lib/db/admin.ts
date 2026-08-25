import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { InquiryStatus, ValuationStatus } from '@prisma/client';

export interface AdminDashboardMetrics {
  totalProperties: number;
  featuredProperties: number;
  totalInquiries: number;
  newInquiries: number;
  totalValuations: number;
  totalAreas: number;
  totalUsers: number;
  recentInquiries: Array<{
    id: string;
    name: string;
    phone: string;
    email: string;
    message: string | null;
    status: InquiryStatus;
    createdAt: Date;
    property: {
      title: string;
      slug: string;
    } | null;
  }>;
}

// 1. Database Fetcher: Dashboard KPI Metrics
async function fetchAdminDashboardMetrics(): Promise<AdminDashboardMetrics> {
  try {
    const [
      totalProperties,
      featuredProperties,
      totalInquiries,
      newInquiries,
      totalValuations,
      totalAreas,
      totalUsers,
      recentInquiries,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { isFeatured: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.valuationRequest.count(),
      prisma.area.count(),
      prisma.adminUser.count(),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          property: {
            select: { title: true, slug: true },
          },
        },
      }),
    ]);

    return {
      totalProperties,
      featuredProperties,
      totalInquiries,
      newInquiries,
      totalValuations,
      totalAreas,
      totalUsers,
      recentInquiries,
    };
  } catch (error) {
    console.error('Error in fetchAdminDashboardMetrics:', error);
    throw new Error('DATABASE_READ_ERROR: Unable to load dashboard metrics from PostgreSQL.');
  }
}

export const getAdminDashboardMetrics = async (): Promise<AdminDashboardMetrics> => {
  return unstable_cache(
    fetchAdminDashboardMetrics,
    ['admin-dashboard-metrics'],
    { revalidate: 30, tags: ['admin-dashboard'] }
  )();
};

// 2. Database Fetcher: Properties List
async function fetchAdminPropertiesList() {
  try {
    return await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        area: true,
        images: {
          where: { isHero: true },
          take: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error in fetchAdminPropertiesList:', error);
    throw new Error('DATABASE_READ_ERROR: Unable to load property portfolio from PostgreSQL.');
  }
}

export const getAdminPropertiesList = async () => {
  return unstable_cache(
    fetchAdminPropertiesList,
    ['admin-properties-list'],
    { revalidate: 30, tags: ['admin-properties'] }
  )();
};

// 3. Database Fetcher: Inquiries List
async function fetchAdminInquiriesList() {
  try {
    return await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        property: {
          select: { id: true, title: true, slug: true },
        },
      },
    });
  } catch (error) {
    console.error('Error in fetchAdminInquiriesList:', error);
    throw new Error('DATABASE_READ_ERROR: Unable to load customer inquiries from PostgreSQL.');
  }
}

export const getAdminInquiriesList = async () => {
  return unstable_cache(
    fetchAdminInquiriesList,
    ['admin-inquiries-list'],
    { revalidate: 20, tags: ['admin-inquiries'] }
  )();
};

// 4. Database Fetcher: Valuations List
async function fetchAdminValuationsList() {
  try {
    const valuations = await prisma.valuationRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return valuations.map((v) => ({
      ...v,
      areaSize: Number(v.areaSize),
      estimatedMin: v.estimatedMin ? Number(v.estimatedMin) : null,
      estimatedMax: v.estimatedMax ? Number(v.estimatedMax) : null,
    }));
  } catch (error) {
    console.error('Error in fetchAdminValuationsList:', error);
    throw new Error('DATABASE_READ_ERROR: Unable to load property valuations from PostgreSQL.');
  }
}

export const getAdminValuationsList = async () => {
  return unstable_cache(
    fetchAdminValuationsList,
    ['admin-valuations-list'],
    { revalidate: 20, tags: ['admin-valuations'] }
  )();
};

// 5. Database Fetcher: Areas List
async function fetchAdminAreasList() {
  try {
    return await prisma.area.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { properties: true },
        },
      },
    });
  } catch (error) {
    console.error('Error in fetchAdminAreasList:', error);
    throw new Error('DATABASE_READ_ERROR: Unable to load Karachi areas from PostgreSQL.');
  }
}

export const getAdminAreasList = async () => {
  return unstable_cache(
    fetchAdminAreasList,
    ['admin-areas-list'],
    { revalidate: 60, tags: ['admin-areas'] }
  )();
};

// 6. Database Fetcher: Team Users List
async function fetchAdminUsersList() {
  try {
    return await prisma.adminUser.findMany({
      orderBy: [{ role: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error('Error in fetchAdminUsersList:', error);
    throw new Error('DATABASE_READ_ERROR: Unable to load administrative team users from PostgreSQL.');
  }
}

export const getAdminUsersList = async () => {
  return unstable_cache(
    fetchAdminUsersList,
    ['admin-users-list'],
    { revalidate: 30, tags: ['admin-users'] }
  )();
};
