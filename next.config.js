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
		];
	},
	env: {
		YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		BE_API_URL: process.env.BE_API_URL,
		BE_API_URL_LOCAL: process.env.BE_API_URL_LOCAL,
		DEFAULT_PROFILE: process.env.DEFAULT_PROFILE,
	},
};
