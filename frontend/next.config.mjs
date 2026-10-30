/** @type {import('next').NextConfig} */
const nextConfig = {
	allowedDevOrigins: ['192.168.1.104'],
	cacheComponents: true,
	partialPrefetching: true,
	reactCompiler: true,
	turbopack: {
		rules: {
			'*.css': {
				loaders: ['@tailwindcss/turbopack'],
				as: '*.css',
			},
		},
	},
}

export default nextConfig