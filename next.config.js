/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static-cdn.jtvnw.net",
				port: "",
				pathname: "/jtv_user_pictures/*",
			},
		],
	},
};

module.exports = nextConfig;
