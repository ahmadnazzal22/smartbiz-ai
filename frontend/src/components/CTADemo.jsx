import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTADemo() {
  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />
      <div className="hero-glow" style={{ background: '#14b8a6', top: '20%', left: '30%' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(10,10,18,0.9), rgba(20,184,166,0.15))' }} />
          <div className="absolute inset-0 backdrop-blur-3xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(20,184,166,0.05))' }} />

          <div className="relative px-8 py-20 sm:px-20 sm:py-28 text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20 text-sm text-brand-300">
              <Star className="w-4 h-4" />
              Join 3,000+ businesses already growing with AI
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold max-w-4xl mx-auto leading-tight">
              Ready to transform your{' '}
              <span className="gradient-text">business communication?</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-lg text-dark-300 max-w-2xl mx-auto">
              Set up in minutes. No coding. No complexity. Start your 14-day free trial today.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/login"
                className="group btn-premium px-10 py-5 rounded-full text-white font-semibold text-lg flex items-center gap-2 hover:shadow-xl transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features"
                className="px-10 py-5 glass-card rounded-full text-dark-200 font-semibold text-lg flex items-center gap-2 hover:text-white hover:border-brand-500/30 transition-all duration-300">
                <Play className="w-5 h-5" /> See How It Works
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-dark-400 pt-4">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-400" /> 14-day free trial</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent-400" /> No credit card</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> Cancel anytime</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
