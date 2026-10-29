import LandingHeader from './LandingHeader'
import HeroSection from './HeroSection'
import DashboardPreview from './DashboardPreview'
import FeaturesSection from './FeaturesSection'
import HowItWorksSection from './HowItWorksSection'
import SecuritySection from './SecuritySection'
import CallToAction from './CallToAction'
import LandingFooter from './LandingFooter'

export default function LandingPage() {
	return (
		<div className='min-h-screen overflow-x-clip bg-[#FAFAF7] text-[#202B49]'>
			<LandingHeader />

			<main>
				<HeroSection />
				<DashboardPreview />
				<FeaturesSection />
				<HowItWorksSection />
				<SecuritySection />
				<CallToAction />
			</main>

			<LandingFooter />
		</div>
	)
}