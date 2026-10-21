import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Renamed page — keep the old address (live since PR #6) working.
      { source: "/parts/vin", destination: "/find-parts-by-vin", permanent: true },
    ];
  },
};

export default nextConfig;
