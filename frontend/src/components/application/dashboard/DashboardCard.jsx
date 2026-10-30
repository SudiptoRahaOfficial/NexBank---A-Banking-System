export default function DashboardCard({ children, className = '' }) {
	return (
		<section
			className={[
				'rounded-2xl border border-[#E2E5F0]',
				'bg-white p-5 sm:p-6',
				className,
			].join(' ')}
		>
			{children}
		</section>
	)
}