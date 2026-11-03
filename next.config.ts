import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.shizenapp.com" }],
        destination: "https://shizenapp.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shizenapp.com" }],
        destination: "https://shizenapp.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
