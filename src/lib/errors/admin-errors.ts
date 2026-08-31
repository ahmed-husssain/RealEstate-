import { z } from 'zod';
import { Prisma } from '@prisma/client';

export type ErrorCategory =
  | 'VALIDATION'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'DATABASE'
  | 'SERVER_ERROR';

export interface StandardErrorResult {
  category: ErrorCategory;
  message: string;
}

export function classifyAdminError(error: unknown, fallbackMessage = 'An unexpected server error occurred.'): StandardErrorResult {
  // 1. Zod Validation Errors
  if (error instanceof z.ZodError) {
    const firstIssue = error.issues[0];
    return {
      category: 'VALIDATION',
      message: firstIssue?.message || 'Please check the highlighted fields and try again.',
    };
  }

  // 2. Auth / Permission Errors
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes('unauthorized') || msg.includes('log in') || msg.includes('session')) {
      return {
        category: 'UNAUTHORIZED',
        message: 'Your session has expired. Please log in again to continue.',
      };
    }
    if (msg.includes('forbidden') || msg.includes('permission') || msg.includes('super admin')) {
      return {
        category: 'FORBIDDEN',
        message: 'Forbidden. You do not have permission to perform this administrative action.',
      };
    }
    if (msg.includes('not found')) {
      return {
        category: 'NOT_FOUND',
        message: error.message || 'The requested record no longer exists. Please refresh the page.',
      };
    }
  }

  // 3. Prisma Known Request Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          category: 'CONFLICT',
          message: 'A record with this information already exists in the database.',
        };
      case 'P2025':
        return {
          category: 'NOT_FOUND',
          message: 'The requested record was not found or has already been deleted.',
        };
      case 'P2003':
        return {
          category: 'DATABASE',
          message: 'Cannot delete or modify this item because other records depend on it.',
        };
      default:
        return {
          category: 'DATABASE',
          message: 'A database constraint error occurred. Please try again.',
        };
    }
  }

  // 4. Prisma Connection / Initialization Errors
  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    return {
      category: 'DATABASE',
      message: 'Unable to connect to the database server. Please check your connection and try again.',
    };
  }

  // 5. Generic Safe Fallback (never expose raw stack traces or internal SQL)
  return {
    category: 'SERVER_ERROR',
    message: fallbackMessage,
  };
}
