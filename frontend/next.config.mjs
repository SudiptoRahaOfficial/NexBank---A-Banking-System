/** @type {import('next').NextConfig} */
const nextConfig = {
	allowedDevOrigins: ['192.168.1.103'],
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