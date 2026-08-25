'use server';

import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth/admin';
import { InquiryStatus, ValuationStatus } from '@prisma/client';
import { revalidatePath, updateTag } from 'next/cache';

export async function getAdminInquiriesAction() {
  try {
    await requireAuthUser();

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        property: {
          select: { id: true, title: true, slug: true },
        },
      },
    });

    return { success: true, data: inquiries };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to load inquiries' };
  }
}

export async function updateInquiryStatusAction(inquiryId: string, status: InquiryStatus) {
  try {
    await requireAuthUser();

    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status },
    });

    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');
    updateTag('admin-inquiries');
    updateTag('admin-dashboard');

    return { success: true, message: `Inquiry status changed to ${status}` };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update inquiry status' };
  }
}

export async function deleteInquiryAction(inquiryId: string) {
  try {
    await requireAuthUser();

    await prisma.inquiry.delete({
      where: { id: inquiryId },
    });

    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');
    updateTag('admin-inquiries');
    updateTag('admin-dashboard');

    return { success: true, message: 'Inquiry record deleted' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete inquiry' };
  }
}

export async function getAdminValuationsAction() {
  try {
    await requireAuthUser();

    const valuations = await prisma.valuationRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: valuations.map((v) => ({
        ...v,
        areaSize: Number(v.areaSize),
        estimatedMin: v.estimatedMin ? Number(v.estimatedMin) : null,
        estimatedMax: v.estimatedMax ? Number(v.estimatedMax) : null,
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to load valuations' };
  }
}

export async function updateValuationStatusAction(valuationId: string, status: ValuationStatus) {
  try {
    await requireAuthUser();

    await prisma.valuationRequest.update({
      where: { id: valuationId },
      data: { status },
    });

    revalidatePath('/admin/valuations');
    revalidatePath('/admin');
    updateTag('admin-valuations');
    updateTag('admin-dashboard');

    return { success: true, message: `Valuation status changed to ${status}` };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update valuation status' };
  }
}
