import { headers } from 'next/headers';

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory rate limiting store
// Note: In serverless environments, this store is isolated per runtime instance.
const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic cleanup of stale entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  for (const [key, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

/**
 * Checks and records a rate limit attempt using a sliding window.
 *
 * @param key Unique identifier (e.g., `login:ip:email` or `inquiry:ip`)
 * @param limit Maximum allowed requests within the window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  cleanupStaleEntries(windowMs);

  const now = Date.now();
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Retain only timestamps within the active sliding window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= limit) {
    const oldestTimestamp = activeTimestamps[0];
    const retryAfterMs = oldestTimestamp + windowMs - now;
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));

    return {
      success: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(key, { timestamps: activeTimestamps });

  return {
    success: true,
    remaining: limit - activeTimestamps.length,
    retryAfterSeconds: 0,
  };
}

/**
 * Resets the rate limit counter for a specific key upon successful action.
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Safely extracts client IP address from request headers.
 */
export async function getClientIp(): Promise<string> {
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    const realIp = headerList.get('x-real-ip') || headerList.get('cf-connecting-ip');
    if (realIp) {
      return realIp.trim();
    }
  } catch {
    // In contexts where headers() is unavailable
  }
  return 'anonymous';
}
