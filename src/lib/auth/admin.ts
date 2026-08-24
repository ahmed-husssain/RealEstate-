import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { AdminRole } from '@prisma/client';

const COOKIE_NAME = 'amber_admin_session';

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      'CRITICAL SECURITY CONFIGURATION ERROR: ADMIN_SESSION_SECRET environment variable is not defined. Set a secure secret of at least 32 characters in your server environment.'
    );
  }
  if (secret.length < 32) {
    throw new Error(
      'CRITICAL SECURITY CONFIGURATION ERROR: ADMIN_SESSION_SECRET must be at least 32 characters in length for secure HMAC-SHA256 session signing.'
    );
  }
  return secret;
}

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Sign payload with HMAC SHA-256
export function signSessionPayload(payload: AdminSessionPayload): string {
  const secret = getSessionSecret();
  const base64Data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(base64Data)
    .digest('base64url');
  return `${base64Data}.${signature}`;
}

// Verify and decode payload
export function verifySessionToken(token: string): AdminSessionPayload | null {
  try {
    const secret = getSessionSecret();
    const [base64Data, signature] = token.split('.');
    if (!base64Data || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(base64Data)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const payload: AdminSessionPayload = JSON.parse(
      Buffer.from(base64Data, 'base64url').toString('utf-8')
    );

    if (Date.now() > payload.exp) {
      return null; // Expired session
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function setAdminSessionCookie(payload: AdminSessionPayload) {
  const token = signSessionPayload(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days session
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentAdminUser() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAME);
    if (!tokenCookie?.value) return null;

    const payload = verifySessionToken(tokenCookie.value);
    if (!payload) return null;

    // Verify user is still active in database
    const user = await prisma.adminUser.findUnique({
      where: { id: payload.userId },
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

    if (!user || !user.isActive) {
      await clearAdminSessionCookie();
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error verifying admin session:', error);
    return null;
  }
}

export async function requireAuthUser() {
  const user = await getCurrentAdminUser();
  if (!user) {
    throw new Error('Unauthorized. Please log in to access the admin panel.');
  }
  return user;
}

export async function requireSuperAdminRole() {
  const user = await requireAuthUser();
  if (user.role !== AdminRole.ADMIN) {
    throw new Error('Forbidden. Only Super Admin has permission to perform this action.');
  }
  return user;
}
