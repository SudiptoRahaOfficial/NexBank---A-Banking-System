import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'

export default function CallToAction() {
	return (
		<section
			aria-labelledby='cta-title'
			className='px-4 py-12 sm:px-6 sm:py-14 lg:px-10'
		>
			<div className='relative mx-auto max-w-280 overflow-hidden rounded-3xl bg-linear-to-br from-[#312E81] via-[#4338CA] to-[#4F46E5] px-5 py-8 text-center shadow-xl shadow-indigo-950/10 sm:px-10 sm:py-10 lg:px-16'>
				<div
					aria-hidden='true'
					className='pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10'
				/>

				<div
					aria-hidden='true'
					className='pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full border border-white/10'
				/>

				<div className='relative mx-auto max-w-2xl'>
					<div className='mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white'>
						<ShieldCheck
							size={23}
							aria-hidden='true'
						/>
					</div>

					<h2
						id='cta-title'
						className='mt-4 text-2xl leading-tight font-bold tracking-tight text-white sm:text-3xl lg:text-4xl'
					>
						Ready for a simpler banking experience?
					</h2>

					<p className='mx-auto mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base'>
						Explore a more organized way to manage accounts, review
						transactions, and take control of your everyday banking
						activities.
					</p>

					<div className='mt-6 flex flex-col justify-center gap-3 sm:flex-row'>
						<Link
							href='/signup'
							className='inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#4338CA] transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							Create your account
							<ArrowRight
								size={16}
								aria-hidden='true'
							/>
						</Link>

						<Link
							href='/signin'
							className='inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							Already a customer?
							<ArrowUpRight
								size={16}
								aria-hidden='true'
							/>
						</Link>
					</div>

					<p className='mt-4 text-xs leading-5 text-indigo-200'>
						Account registration and sign-in will be connected to
						the backend in Phase 2.
					</p>
				</div>
			</div>
		</section>
	)
}