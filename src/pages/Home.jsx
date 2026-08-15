import ContactSection from '../components/ContactSection'
import Features from '../components/Features'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import PartnerMarquee from '../components/PartnerMarquee'
import WalletsPreview from '../components/WalletsPreview'

function Home() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <Features />
      <HowItWorks />
      <WalletsPreview />
      <ContactSection />
    </>
  )
}

export default Home
