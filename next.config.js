/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: process.env.NEXT_PUBLIC_PROTOCOL,
				hostname: process.env.NEXT_PUBLIC_HOST,
				port: process.env.NEXT_PUBLIC_PORT,
				pathname: '/storage/**',
			},
		],
	},
};

module.exports = nextConfig;
