import '@/styles/globals.css'

export const metadata = {
	title: {
		default: 'NexBank | Modern Digital Banking',
		template: '%s | NexBank',
	},
	description:
		'NexBank is a modern digital banking platform designed to provide secure account management, seamless fund transfers, and a reliable banking experience.',
	applicationName: 'NexBank',
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	),
	robots: {
		index: false,
		follow: false,
	},
}

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			data-scroll-behavior='smooth'
			className='h-full antialiased'
		>
			<body className='flex min-h-full flex-col'>{children}</body>
		</html>
	)
}