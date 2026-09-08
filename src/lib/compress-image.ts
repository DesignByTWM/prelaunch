"use client";

/**
 * Browser-side image compression.
 *
 * Server actions cap request bodies at 1MB by default. Phone photos run
 * 3 to 12MB. Compressing before submission is what makes uploads work at
 * all, not an optimisation.
 *
 * Resized to 2000px on the long edge at quality 0.8, which brings a
 * typical phone photo under 1MB with no visible loss on the reference
 * images these are used for.
 */

const MAX_EDGE = 2000;
const QUALITY = 0.8;

export interface CompressedImage {
  filename: string;
  /** Base64 without the data URL prefix, ready for an email attachment. */
  content: string;
}

export async function compressImage(file: File): Promise<CompressedImage | null> {
  try {
    const bitmap = await createImageBitmap(file);

    let { width, height } = bitmap;
    if (width > MAX_EDGE || height > MAX_EDGE) {
      const scale = MAX_EDGE / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
    const content = dataUrl.split(",")[1];
    if (!content) return null;

    const base = file.name.replace(/\.[^.]+$/, "") || "reference";
    return { filename: `${base}.jpg`, content };
  } catch {
    // A single unreadable image must never block a lead.
    return null;
  }
}
