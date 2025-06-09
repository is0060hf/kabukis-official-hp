import HeroSection from '@/components/home/HeroSection'
import FeaturedMusic from '@/components/home/FeaturedMusic'
import LiveSchedule from '@/components/home/LiveSchedule'
import LatestContent from '@/components/home/LatestContent'
import CallToAction from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedMusic />
      <LiveSchedule />
      <LatestContent />
      <CallToAction />
    </>
  )
} 