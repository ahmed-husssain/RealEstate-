import { validateImageBuffer } from './validation';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary';
import { UploadedMedia, OptimizeImageOptions } from './types';

export class MediaService {
  /**
   * Validates and uploads a property photo to Cloudinary.
   */
  static async uploadPropertyPhoto(
    buffer: Buffer,
    declaredMimeType?: string
  ): Promise<UploadedMedia> {
    // 1. Strict validation (size & magic bytes)
    const validation = validateImageBuffer(buffer, declaredMimeType);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid image file.');
    }

    // 2. Upload to Cloudinary properties folder
    return await uploadToCloudinary(buffer, 'amber-property-corner/properties');
  }

  /**
   * Validates and uploads an Area guide hero photo to Cloudinary.
   */
  static async uploadAreaPhoto(
    buffer: Buffer,
    declaredMimeType?: string
  ): Promise<UploadedMedia> {
    const validation = validateImageBuffer(buffer, declaredMimeType);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid image file.');
    }

    return await uploadToCloudinary(buffer, 'amber-property-corner/areas');
  }

  /**
   * Deletes an image from Cloudinary by its publicId.
   */
  static async deleteAsset(publicId: string | null | undefined): Promise<boolean> {
    if (!publicId) return true;
    const res = await deleteFromCloudinary(publicId);
    return res.success;
  }

  /**
   * Generates an optimized Cloudinary delivery URL with responsive dimensions and auto-format.
   */
  static getOptimizedUrl(url: string, options: OptimizeImageOptions = {}): string {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }

    const { width, height, crop = 'fill', format = 'auto', quality = 'auto' } = options;

    const transformations: string[] = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (width || height) transformations.push(`c_${crop}`);
    transformations.push(`f_${format}`);
    transformations.push(`q_${quality}`);

    const transformString = transformations.join(',');

    // Cloudinary standard URL: https://res.cloudinary.com/<cloud>/image/upload/v<version>/<publicId>
    return url.replace('/upload/', `/upload/${transformString}/`);
  }
}
