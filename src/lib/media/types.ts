export interface UploadedMedia {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  originalFilename?: string;
}

export interface MediaValidationResult {
  valid: boolean;
  error?: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | number | string;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'scale' | 'fit' | 'limit' | 'thumb';
}
