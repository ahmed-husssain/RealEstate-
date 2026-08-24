'use server';

import prisma from '@/lib/prisma';
import { InquiryType } from '@prisma/client';
import { z } from 'zod';

const InquirySchema = z.object({
  propertyId: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number'),
  type: z.nativeEnum(InquiryType).default(InquiryType.GENERAL),
  preferredDate: z.string().optional(),
  timeSlot: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export async function submitInquiryAction(input: InquiryInput) {
  try {
    const validated = InquirySchema.parse(input);

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId: validated.propertyId || null,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        type: validated.type,
        preferredDate: validated.preferredDate || null,
        timeSlot: validated.timeSlot || null,
        message: validated.message || null,
      },
    });

    return {
      success: true,
      inquiryId: inquiry.id,
      message: 'Your confidential inquiry has been received. A Senior Partner will respond within four business hours.',
    };
  } catch (error: any) {
    console.error('Inquiry submission error:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }
    return {
      success: false,
      error: 'An error occurred while saving your inquiry. Please contact us directly via WhatsApp or phone.',
    };
  }
}
