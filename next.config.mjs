// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "akyexhpupmywrrexjtpm.supabase.co", // 👈 must match your URL
        pathname: "/storage/v1/object/public/cabinimages/**", // 👈 no dash, matches bucket
      },
    ],
  },
};

export default nextConfig;
