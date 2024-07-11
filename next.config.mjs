/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: "https://bridge-psi-six.vercel.app//api/:path*",
      },
    ];
  },
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "assets.coingecko.com",
  //         port: "",
  //         pathname: "/**",
  //       },
  //     ],
  //   },
};

export default nextConfig;
