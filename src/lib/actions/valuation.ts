'use server';

import prisma from '@/lib/prisma';
import { PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

const phoneRegex = /^[0-9+\-\s()]{8,30}$/;

const ValuationSchema = z.object({
  propertyType: z.nativeEnum(PropertyType),
  areaName: z
    .string()
    .trim()
    .min(2, 'Area/Neighborhood is required')
    .max(100, 'Area name exceeds maximum allowed length'),
  areaSize: z
    .number()
    .positive('Area size must be greater than 0')
    .max(100000, 'Area size is outside valid assessment range'),
  areaUnit: z.nativeEnum(AreaUnit).default(AreaUnit.SQYD),
  bedrooms: z.number().int().min(0).max(50).default(0),
  bathrooms: z.number().int().min(0).max(50).default(0),
  condition: z.nativeEnum(PropertyCondition).default(PropertyCondition.GOOD),
  ownerName: z
    .string()
    .trim()
    .min(2, 'Owner name is required')
    .max(100, 'Owner name exceeds maximum allowed length'),
  ownerPhone: z
    .string()
    .trim()
    .min(8, 'Phone number is required')
    .max(30, 'Phone number is too long')
    .regex(phoneRegex, 'Please enter a valid telephone number'),
  ownerEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email('Valid email address is required')
    .max(150, 'Email exceeds maximum allowed length'),
  estimatedMin: z.number().nonnegative().optional(),
  estimatedMax: z.number().nonnegative().optional(),
  // Honeypot field for bot filtering
  website_hp: z.string().max(100).optional(),
});

export type ValuationInput = z.infer<typeof ValuationSchema>;

export async function submitValuationAction(input: ValuationInput) {
  try {
    const validated = ValuationSchema.parse(input);

    // 1. Honeypot Anti-Spam Check
    if (validated.website_hp && validated.website_hp.trim().length > 0) {
      // Silently accept without writing to database to deflect automated spambots
      return {
        success: true,
        id: 'val_ack',
        message: 'Your instant valuation assessment dossier has been generated and saved.',
      };
    }

    // 2. Server-side Rate Limiting (5 valuation requests per 10 minutes per IP)
    const clientIp = await getClientIp();
    const rateLimitKey = `valuation_form:${clientIp}`;
    const rateCheck = checkRateLimit(rateLimitKey, 5, 10 * 60 * 1000);

    if (!rateCheck.success) {
      return {
        success: false,
        error: `Assessment limit reached. For security, please wait ${rateCheck.retryAfterSeconds} seconds before submitting again, or contact our valuation desk directly.`,
      };
    }

    const record = await prisma.valuationRequest.create({
      data: {
        propertyType: validated.propertyType,
        areaName: validated.areaName,
        areaSize: validated.areaSize,
        areaUnit: validated.areaUnit,
        bedrooms: validated.bedrooms,
        bathrooms: validated.bathrooms,
        condition: validated.condition,
        ownerName: validated.ownerName,
        ownerPhone: validated.ownerPhone,
        ownerEmail: validated.ownerEmail,
        estimatedMin: validated.estimatedMin || null,
        estimatedMax: validated.estimatedMax || null,
      },
    });

    return {
      success: true,
      id: record.id,
      message: 'Your instant valuation assessment dossier has been generated and saved.',
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid form input data.',
      };
    }
    return {
      success: false,
      error: 'An error occurred while registering the valuation request.',
    };
  }
}
