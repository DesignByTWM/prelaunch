"use client";

import { useState } from "react";
import { compressImage, type CompressedImage } from "@/lib/compress-image";

/**
 * PhotoUpload
 *
 * Optional reference photos on the consumer forms. Up to three images,
 * compressed in the browser before they ever reach the server.
 *
 * Anything that fails to read is dropped silently rather than blocking
 * the submission. A lead is worth more than an image.
 */

const MAX_FILES = 3;

export function PhotoUpload({
  images,
  onChange,
}: {
  images: CompressedImage[];
  onChange: (images: CompressedImage[]) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);

    const room = MAX_FILES - images.length;
    const incoming = Array.from(list).slice(0, room);
    const compressed: CompressedImage[] = [];

    for (const file of incoming) {
      const result = await compressImage(file);
      if (result) compressed.push(result);
    }

    onChange([...images, ...compressed]);
    setBusy(false);
  }

  return (
    <div className="field">
      <label htmlFor="photos">Send us your references photos (optional)</label>
      <input
        id="photos"
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif"
        multiple
        disabled={busy || images.length >= MAX_FILES}
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <p className="upload-note">
        {busy
          ? "Preparing images…"
          : images.length
            ? `${images.length} of ${MAX_FILES} added. Inspiration, reference shots, or your vehicle as it is now.`
            : `Up to ${MAX_FILES} images. Inspiration, reference shots, or your vehicle as it is now.`}
      </p>
      {images.length > 0 && (
        <ul className="upload-list">
          {images.map((image, index) => (
            <li key={`${image.filename}-${index}`}>
              <span>{image.filename}</span>
              <button
                type="button"
                onClick={() => onChange(images.filter((_, i) => i !== index))}
                aria-label={`Remove ${image.filename}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
