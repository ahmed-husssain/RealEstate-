'use server';

import prisma from '@/lib/prisma';
import { InquiryType } from '@prisma/client';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

const phoneRegex = /^[0-9+\-\s()]{8,30}$/;

const InquirySchema = z.object({
  propertyId: z.string().trim().max(50).optional(),
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(150, 'Email must not exceed 150 characters'),
  phone: z
    .string()
    .trim()
    .min(8, 'Phone number must be at least 8 digits')
    .max(30, 'Phone number is too long')
    .regex(phoneRegex, 'Please enter a valid telephone number'),
  type: z.nativeEnum(InquiryType).default(InquiryType.GENERAL),
  preferredDate: z.string().trim().max(50).optional(),
  timeSlot: z.string().trim().max(50).optional(),
  message: z.string().trim().max(2000, 'Message must not exceed 2,000 characters').optional(),
  // Honeypot field: must remain empty for legitimate human submissions
  website_hp: z.string().max(100).optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export async function submitInquiryAction(input: InquiryInput) {
  try {
    const validated = InquirySchema.parse(input);

    // 1. Honeypot Anti-Spam Check
    if (validated.website_hp && validated.website_hp.trim().length > 0) {
      // Silently accept without writing to database to deflect automated spambots
      return {
        success: true,
        inquiryId: 'inq_ack',
        message: 'Your confidential inquiry has been received. A Senior Partner will respond within four business hours.',
      };
    }

    // 2. Server-side Rate Limiting (5 submissions per 10 minutes per IP)
    const clientIp = await getClientIp();
    const rateLimitKey = `inquiry_form:${clientIp}`;
    const rateCheck = checkRateLimit(rateLimitKey, 5, 10 * 60 * 1000);

    if (!rateCheck.success) {
      return {
        success: false,
        error: `Submission limit reached. For security, please wait ${rateCheck.retryAfterSeconds} seconds before submitting again, or reach us directly on WhatsApp.`,
      };
    }

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
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data provided.',
      };
    }
    return {
      success: false,
      error: 'An error occurred while saving your inquiry. Please contact us directly via WhatsApp or phone.',
    };
  }
}
