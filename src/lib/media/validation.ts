import { MediaValidationResult } from './types';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

/**
 * Validates image buffer magic bytes to ensure file is genuinely a JPEG, PNG, or WebP image.
 */
function verifyMagicBytes(buffer: Buffer): { valid: boolean; detectedMime?: string } {
  if (buffer.length < 12) {
    return { valid: false };
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedMime: 'image/jpeg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { valid: true, detectedMime: 'image/png' };
  }

  // WebP: RIFF (bytes 0-3) and WEBP (bytes 8-11)
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff === 'RIFF' && webp === 'WEBP') {
    return { valid: true, detectedMime: 'image/webp' };
  }

  return { valid: false };
}

export function validateImageBuffer(buffer: Buffer, declaredMimeType?: string): MediaValidationResult {
  // 1. Check size
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'Empty file provided.' };
  }

  if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10 MB limit (${(buffer.length / (1024 * 1024)).toFixed(2)} MB).`,
    };
  }

  // 2. Check Magic Bytes (anti-spoofing)
  const magicCheck = verifyMagicBytes(buffer);
  if (!magicCheck.valid) {
    return {
      valid: false,
      error: 'Invalid file format. Only genuine JPEG, PNG, and WebP images are allowed.',
    };
  }

  // 3. Check MIME type
  const effectiveMime = magicCheck.detectedMime || declaredMimeType;
  if (!effectiveMime || !ALLOWED_MIME_TYPES.has(effectiveMime)) {
    return {
      valid: false,
      error: 'Unsupported image type. Only JPEG, PNG, and WebP are allowed.',
    };
  }

  return {
    valid: true,
    mimeType: effectiveMime,
    sizeBytes: buffer.length,
  };
}
