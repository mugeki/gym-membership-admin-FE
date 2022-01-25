module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			"asset-a.grid.id",
			"images.unsplash.com",
			"firebasestorage.googleapis.com",
			"lh3.googleusercontent.com",
			"img.youtube.com",
		],
	},
	async redirects() {
		return [
			{
				source: "/transactions",
				destination: "/transactions/classes",
				permanent: true,
			},
			{
				source: "/",
				destination: "/transactions/classes",
				permanent: true,
			},
		];
	},
	env: {
		BE_API_URL: process.env.NEXT_PUBLIC_BE_API_URL,
		DEFAULT_PROFILE: process.env.NEXT_PUBLIC_DEFAULT_PROFILE,
		DEFAULT_THUMB: process.env.NEXT_PUBLIC_DEFAULT_THUMB,
	},
};
