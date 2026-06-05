import { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
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
  )
}
