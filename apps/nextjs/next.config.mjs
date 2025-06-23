import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@packages/libs",
    "@packages/ui",
    "@packages/drizzle",
    "@packages/ddd-kit",
  ],
};

const withNextIntl = createNextIntlPlugin("./common/i18n/request.ts");

export default withNextIntl(nextConfig);
