import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Trailing slashes off keeps one canonical URL shape across the whole site.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Sized for the hero full-bleed down to the 5-up service card grid.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [96, 128, 192, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        // Immutable brand assets. Logos and photography never change under the same filename.
        source: "/logos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
