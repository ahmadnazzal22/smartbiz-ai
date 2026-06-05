import { motion } from 'framer-motion'
import { Smartphone, MessageCircle, CalendarCheck, BarChart3, ArrowDown, Sparkles } from 'lucide-react'

const steps = [
  { icon: Smartphone, title: 'Connect WhatsApp', desc: 'Link your WhatsApp Business number in 1 click. No technical setup needed.', color: 'from-brand-500 to-purple-500', step: '01' },
  { icon: MessageCircle, title: 'AI Handles Conversations', desc: 'Your AI assistant automatically responds to customers 24/7 — answers questions, captures leads, books appointments.', color: 'from-primary-500 to-cyan-500', step: '02' },
  { icon: CalendarCheck, title: 'Smart Booking', desc: 'Customers book directly from WhatsApp. AI checks availability, confirms instantly, sends reminders.', color: 'from-accent-500 to-emerald-500', step: '03' },
  { icon: BarChart3, title: 'Track & Grow', desc: 'Monitor leads, bookings, and revenue in your Executive Dashboard. AI gives daily insights and recommendations.', color: 'from-orange-500 to-pink-500', step: '04' },
]

export default function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/10 to-dark-950" />
      <div className="hero-glow" style={{ background: '#6366f1', top: '40%', left: '60%' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20 text-sm text-brand-300">
            <Sparkles className="w-4 h-4" />
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
            Get started in{' '}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            From zero to fully automated in under 10 minutes. No coding, no technical skills required.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-accent-500/50 to-transparent hidden lg:block" />

          {steps.map((step, i) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex-col lg:flex-row`}>
              <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                <span className="text-6xl font-display font-bold text-white/5 block mb-2">{step.step}</span>
                <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-dark-300 leading-relaxed max-w-md mx-auto lg:mx-0">{step.desc}</p>
              </div>

              <div className="relative shrink-0">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 flex items-center justify-center shadow-xl relative z-10`}>
                  <step.icon className="w-full h-full text-white" />
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 hidden lg:block">
                    <ArrowDown className="w-5 h-5 text-brand-400/40 mt-4" />
                  </div>
                )}
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
