module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["asset-a.grid.id"],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/transactions",
				permanent: true,
			},
		];
	},
};
