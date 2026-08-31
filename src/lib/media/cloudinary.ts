import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadedMedia } from './types';

let isConfigured = false;

function ensureCloudinaryConfigured(): boolean {
  if (isConfigured) return true;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  isConfigured = true;
  return true;
}

export async function uploadToCloudinary(
  buffer: Buffer,
  folder = 'amber-property-corner/properties'
): Promise<UploadedMedia> {
  const configured = ensureCloudinaryConfigured();
  if (!configured) {
    throw new Error(
      'CLOUDINARY_CONFIG_ERROR: Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured in environment variables.'
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(error || new Error('Upload failed with no result from Cloudinary.'));
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          originalFilename: result.original_filename,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<{ success: boolean; result?: string }> {
  const configured = ensureCloudinaryConfigured();
  if (!configured) {
    console.warn('Skipping Cloudinary deletion: credentials not configured in environment.');
    return { success: false, result: 'NOT_CONFIGURED' };
  }

  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return { success: res.result === 'ok', result: res.result };
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error);
    return { success: false };
  }
}
