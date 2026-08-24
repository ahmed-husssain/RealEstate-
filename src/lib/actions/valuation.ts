'use server';

import prisma from '@/lib/prisma';
import { PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import { z } from 'zod';

const ValuationSchema = z.object({
  propertyType: z.nativeEnum(PropertyType),
  areaName: z.string().min(2, 'Area/Neighborhood is required'),
  areaSize: z.number().positive('Area size must be greater than 0'),
  areaUnit: z.nativeEnum(AreaUnit).default(AreaUnit.SQYD),
  bedrooms: z.number().int().nonnegative().default(0),
  bathrooms: z.number().int().nonnegative().default(0),
  condition: z.nativeEnum(PropertyCondition).default(PropertyCondition.GOOD),
  ownerName: z.string().min(2, 'Owner name is required'),
  ownerPhone: z.string().min(8, 'Phone number is required'),
  ownerEmail: z.string().email('Valid email is required'),
  estimatedMin: z.number().optional(),
  estimatedMax: z.number().optional(),
});

export type ValuationInput = z.infer<typeof ValuationSchema>;

export async function submitValuationAction(input: ValuationInput) {
  try {
    const validated = ValuationSchema.parse(input);

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
    console.error('Valuation submission error:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid form input',
      };
    }
    return {
      success: false,
      error: 'An error occurred while registering the valuation request.',
    };
  }
}
