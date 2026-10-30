'use client'

import { useState } from 'react'
import { CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react'

import SecurityActionCard from './SecurityActionCard'
import SecurityConfirmationDialog from './SecurityConfirmationDialog'

const SECURITY_ACTIONS = {
	signout: {
		title: 'Sign out',
		description:
			'You will be signed out of your current session and redirected to the sign-in page.',
		confirmLabel: 'Sign out',
	},

	signoutAll: {
		title: 'Sign out from all devices',
		description:
			'This action will revoke all active sessions, including your current session. You will need to sign in again.',
		confirmLabel: 'Sign out everywhere',
	},
}

export default function SecuritySection() {
	const [activeAction, setActiveAction] = useState(null)
	const [message, setMessage] = useState('')

	const selectedAction = activeAction ? SECURITY_ACTIONS[activeAction] : null

	const handleOpenDialog = (action) => {
		setMessage('')
		setActiveAction(action)
	}

	const handleCloseDialog = () => {
		setActiveAction(null)
	}

	const handleConfirmAction = () => {
		// UI-only phase: no authentication API is called.
		setActiveAction(null)

		setMessage(
			'This security action is currently a UI preview. Authentication integration will be added later.',
		)
	}

	return (
		<section className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'>
			<div className='border-b border-[#E2E5F0] px-5 py-5 sm:px-7'>
				<h2 className='text-lg font-semibold text-[#202B49]'>
					Security
				</h2>

				<p className='mt-1 text-sm text-[#6B7280]'>
					Manage your account access and active sign-in sessions.
				</p>
			</div>

			<div className='space-y-6 px-5 py-6 sm:px-7'>
				<div className='rounded-xl border border-[#E2E5F0] bg-[#F4F6FB] p-4 sm:p-5'>
					<div className='flex items-start gap-3'>
						<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
							<ShieldCheck size={20} />
						</div>

						<div className='min-w-0 flex-1'>
							<h3 className='text-sm font-semibold text-[#202B49]'>
								Account security
							</h3>

							<p className='mt-1 text-sm leading-5 text-[#6B7280]'>
								Your account security is managed by NexBank's
								authentication system.
							</p>

							<div className='mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#15803D]'>
								<CheckCircle2 size={13} />
								Authentication enabled
							</div>
						</div>
					</div>
				</div>

				<div>
					<div className='mb-4'>
						<h3 className='text-sm font-semibold text-[#202B49]'>
							Session management
						</h3>

						<p className='mt-1 text-sm text-[#6B7280]'>
							Control access to your NexBank account.
						</p>
					</div>

					<div className='space-y-3'>
						<SecurityActionCard
							title='Sign out'
							description='End your current session on this device.'
							buttonLabel='Sign out'
							onAction={() => handleOpenDialog('signout')}
							variant='default'
						/>

						<SecurityActionCard
							title='Sign out from all devices'
							description='End all active sessions associated with your account.'
							buttonLabel='Sign out everywhere'
							onAction={() => handleOpenDialog('signoutAll')}
							variant='danger'
						/>
					</div>
				</div>

				{message && (
					<div
						role='status'
						className='rounded-lg border border-[#E2E5F0] bg-[#F4F6FB] px-4 py-3 text-sm text-[#6B7280]'
					>
						{message}
					</div>
				)}
			</div>

			<SecurityConfirmationDialog
				isOpen={Boolean(activeAction)}
				title={selectedAction?.title}
				description={selectedAction?.description}
				confirmLabel={selectedAction?.confirmLabel}
				onConfirm={handleConfirmAction}
				onClose={handleCloseDialog}
			/>
		</section>
	)
}