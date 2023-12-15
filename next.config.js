/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //agar rect component not run twice, default true untuk next js
  transpilePackages: ["mui-file-input"],
  // useFileSystemPublicRoutes: false, //untuk custom server cpanel
};

module.exports = nextConfig;
