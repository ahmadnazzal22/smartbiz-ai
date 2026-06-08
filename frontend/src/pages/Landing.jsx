import { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import CTADemo from '../components/CTADemo'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import Particles from '../components/Particles'

export default function Landing() {
  const { scrollY } = useScroll()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <SEO title="Automated Business Assistant Platform"
        description="Turn your WhatsApp into a 24/7 AI sales team. Automate bookings, leads, and customer communication with SmartBiz AI."
        keywords="AI business assistant, WhatsApp automation, smart booking, lead management, AI chatbot, small business AI"
        url="/" />
      <div className="min-h-screen bg-dark-950">
      <Particles />
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTADemo />
      <Footer />
      <Chatbot />
    </div>
    </>
  )
}
