'use client'

import { useState } from 'react'
import { Bell, LayoutDashboard, Mail, ShieldCheck, Wallet } from 'lucide-react'

import { MOCK_SETTINGS_DATA } from './settings.data'
import PreferenceItem from './PreferenceItem'

const INITIAL_PREFERENCES = {
	...MOCK_SETTINGS_DATA.preferences,
}

function PreferenceGroup({ title, description, icon: Icon, children }) {
	return (
		<div>
			<div className='mb-2 flex items-start gap-3'>
				<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
					<Icon size={18} />
				</div>

				<div>
					<h3 className='text-sm font-semibold text-[#202B49]'>
						{title}
					</h3>

					<p className='mt-1 text-sm text-[#6B7280]'>{description}</p>
				</div>
			</div>

			<div className='divide-y divide-[#E2E5F0] pl-0 sm:pl-12'>
				{children}
			</div>
		</div>
	)
}

export default function PreferencesSection() {
	const [preferences, setPreferences] = useState(INITIAL_PREFERENCES)

	const handlePreferenceChange = (name, value) => {
		setPreferences((previous) => ({
			...previous,
			[name]: value,
		}))
	}

	return (
		<section className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'>
			<div className='border-b border-[#E2E5F0] px-5 py-5 sm:px-7'>
				<h2 className='text-lg font-semibold text-[#202B49]'>
					Preferences
				</h2>

				<p className='mt-1 text-sm text-[#6B7280]'>
					Customize your notifications and dashboard experience.
				</p>
			</div>

			<div className='space-y-8 px-5 py-6 sm:px-7'>
				<PreferenceGroup
					title='Notifications'
					description='Choose which notifications you want to receive.'
					icon={Bell}
				>
					<PreferenceItem
						title='Email notifications'
						description='Receive important account updates and general notifications by email.'
						checked={preferences.emailNotifications}
						onChange={(value) =>
							handlePreferenceChange('emailNotifications', value)
						}
					/>

					<PreferenceItem
						title='Transaction alerts'
						description='Receive notifications about deposits, withdrawals, and transfers.'
						checked={preferences.transactionAlerts}
						onChange={(value) =>
							handlePreferenceChange('transactionAlerts', value)
						}
					/>

					<PreferenceItem
						title='Security alerts'
						description='Receive notifications about important account security events.'
						checked={preferences.securityAlerts}
						onChange={(value) =>
							handlePreferenceChange('securityAlerts', value)
						}
					/>

					<PreferenceItem
						title='Promotional emails'
						description='Receive product announcements, offers, and promotional updates.'
						checked={preferences.promotionalEmails}
						onChange={(value) =>
							handlePreferenceChange('promotionalEmails', value)
						}
					/>
				</PreferenceGroup>

				<div className='border-t border-[#E2E5F0]' />

				<PreferenceGroup
					title='Dashboard'
					description='Adjust how information is displayed on your dashboard.'
					icon={LayoutDashboard}
				>
					<PreferenceItem
						title='Compact dashboard'
						description='Use a more compact layout to display more information in less space.'
						checked={preferences.dashboardCompactMode}
						onChange={(value) =>
							handlePreferenceChange(
								'dashboardCompactMode',
								value,
							)
						}
					/>
				</PreferenceGroup>

				<div className='rounded-lg border border-[#E2E5F0] bg-[#F4F6FB] px-4 py-3'>
					<div className='flex items-start gap-3'>
						<ShieldCheck
							size={17}
							className='mt-0.5 shrink-0 text-[#4F46E5]'
						/>

						<p className='text-xs leading-5 text-[#6B7280]'>
							These preferences are currently stored only in this
							page's temporary state. Changes will not be saved
							after refreshing or leaving the page. Notification
							preferences also do not disable essential backend
							security protections.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}