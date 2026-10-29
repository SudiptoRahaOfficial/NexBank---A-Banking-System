import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import CurrentYear from '@/components/shared/CurrentYear'

export default function Footer() {
	return (
		<footer className='mt-8 border-t border-[#E2E5F0] bg-white'>
			<div className='mx-auto flex max-w-360 flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8'>
				<p className='text-xs leading-5 text-[#6B7280] sm:text-sm'>
					&copy; <CurrentYear /> NexBank. All rights reserved.
				</p>

				<div className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2'>
					<Link
						href='/settings/security'
						className='inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] sm:text-sm'
					>
						<ShieldCheck
							size={15}
							aria-hidden='true'
						/>
						Security
					</Link>

					<span className='text-xs text-[#9CA3AF]'>
						Personal Banking
					</span>
				</div>
			</div>
		</footer>
	)
}