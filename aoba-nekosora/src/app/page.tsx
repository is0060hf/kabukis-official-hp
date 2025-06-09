import Navigation from '@/components/common/Navigation'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedMusic from '@/components/home/FeaturedMusic'
import LiveSchedule from '@/components/home/LiveSchedule'
import LatestContent from '@/components/home/LatestContent'
import CallToAction from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <FeaturedMusic />
        <LiveSchedule />
        <LatestContent />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
} 