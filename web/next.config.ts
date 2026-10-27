import type { NextConfig } from "next";

const config: NextConfig = {
  // Static HTML in out/, like the WordPress copy; any static hosting will do.
  output: "export",
  // WordPress URLs end with a slash: /products/ovsyanoe/
  trailingSlash: true,
  images: { unoptimized: true },
  // A stray package-lock.json higher up (in ~) would otherwise be taken for the workspace root.
  turbopack: { root: __dirname },
};

export default config;
