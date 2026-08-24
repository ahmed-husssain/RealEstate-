'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import {
  verifyPassword,
  hashPassword,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getCurrentAdminUser,
  requireAuthUser,
} from '@/lib/auth/admin';
import { checkRateLimit, resetRateLimit, getClientIp } from '@/lib/security/rate-limit';
import { revalidatePath } from 'next/cache';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(150, 'Email address exceeds maximum length'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(62, 'Password exceeds maximum allowed length'),
});

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Current password is required').max(62),
    newPassword: z.string().min(6, 'New password must be at least 6 characters').max(62),
    confirmPassword: z.string().min(6, 'Please confirm your new password').max(62),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New passwords do not match',
    path: ['confirmPassword'],
  });

export async function loginAdminAction(data: { email: string; password: string }) {
  try {
    const validated = loginSchema.parse(data);

    // 1. Rate Limiting Protection (5 failed attempts per 15 minutes per IP + normalized email)
    const clientIp = await getClientIp();
    const rateLimitKey = `admin_login:${clientIp}:${validated.email}`;
    const rateCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);

    if (!rateCheck.success) {
      return {
        success: false,
        error: `Too many failed login attempts. For security protection, please try again in ${rateCheck.retryAfterSeconds} seconds.`,
      };
    }

    const user = await prisma.adminUser.findUnique({
      where: { email: validated.email },
    });

    // Constant-time check mitigation: generic rejection for nonexistent or inactive user
    if (!user || !user.isActive) {
      return { success: false, error: 'Invalid email or password. Access denied.' };
    }

    const isValid = await verifyPassword(validated.password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Invalid email or password. Access denied.' };
    }

    // Reset rate limiter on successful authentication
    resetRateLimit(rateLimitKey);

    // Set Secure Session Cookie
    await setAdminSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Update lastLoginAt
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: 'An error occurred during authentication. Access denied.' };
  }
}

export async function logoutAdminAction() {
  try {
    await clearAdminSessionCookie();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMyPasswordAction(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const currentUser = await requireAuthUser();
    const validated = updatePasswordSchema.parse(data);

    // Fetch user with password hash
    const user = await prisma.adminUser.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const isCurrentValid = await verifyPassword(validated.currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      return { success: false, error: 'Current password is incorrect' };
    }

    const newHash = await hashPassword(validated.newPassword);

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    });

    return { success: true, message: 'Password updated successfully' };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: error.message || 'Failed to update password' };
  }
}

export async function updateMyProfileAction(data: { name: string }) {
  try {
    const currentUser = await requireAuthUser();
    if (!data.name || data.name.trim().length < 2) {
      return { success: false, error: 'Name must be at least 2 characters' };
    }

    await prisma.adminUser.update({
      where: { id: currentUser.id },
      data: { name: data.name.trim() },
    });

    revalidatePath('/admin');
    return { success: true, message: 'Profile updated successfully' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update profile' };
  }
}
