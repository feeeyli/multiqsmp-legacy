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
			{
				protocol: "https",
				hostname: "yt3.googleusercontent.com",
				port: "",
				pathname: "/*",
			},
		],
	},
};

module.exports = nextConfig;
