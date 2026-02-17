import { changeDpiBlob } from 'changedpi';

/**
 * Set the DPI metadata of an image blob (JPEG or PNG).
 * Uses the changedpi library which correctly modifies both JFIF and EXIF headers for JPEG,
 * and pHYs chunks for PNG.
 */
export async function setImageDpi(blob: Blob, dpi: number): Promise<Blob> {
  return changeDpiBlob(blob, dpi);
}
