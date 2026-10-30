import SettingsLayout from '@/components/application/layout/layout'

import ProfileSection from '@/components/application/settings/ProfileSection'
import PreferencesSection from '@/components/application/settings/PreferencesSection'
import SecuritySection from '@/components/application/settings/SecuritySection'

export default function Settings() {
	return (
		<SettingsLayout
			title='Settings'
			description='Manage your profile, preferences, and account security'
		>
			<main className='mx-auto w-full max-w-360 space-y-8'>
				<ProfileSection />
				<PreferencesSection />
				<SecuritySection />
			</main>
		</SettingsLayout>
	)
}