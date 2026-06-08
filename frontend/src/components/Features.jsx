import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Bot, Calendar, Users, BarChart3, Shield, Zap, Brain, Target, Clock } from 'lucide-react'

const features = [
  { icon: Brain, title: 'AI Sales Assistant', desc: 'Never miss a lead again. AI answers every WhatsApp message instantly — qualifies leads, answers FAQs, and books appointments while you sleep.', gradient: 'from-brand-500 to-purple-500', stats: '4.8/5 avg. rating' },
  { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Connect your number in one click. Every conversation gets an instant AI reply. No more missed calls or slow responses.', gradient: 'from-brand-500 to-accent-400', stats: '3,200+ conversations/mo' },
  { icon: Calendar, title: 'Smart Booking Engine', desc: 'Customers book directly from WhatsApp. AI checks availability, confirms instantly, and sends automatic reminders. No double bookings.', gradient: 'from-accent-500 to-accent-600', stats: '98% booking accuracy' },
  { icon: Target, title: 'Lead Scoring & CRM', desc: 'Know exactly who to call. AI scores every lead as Hot, Warm, or Cold based on engagement and intent. Focus on the ones ready to buy.', gradient: 'from-orange-500 to-red-500', stats: '3x conversion rate' },
  { icon: BarChart3, title: 'Executive Analytics', desc: 'See exactly what\'s working. Real-time dashboard shows leads, bookings, revenue, and AI-powered insights. Make data-driven decisions.', gradient: 'from-pink-500 to-rose-500', stats: 'Live insights dashboard' },
  { icon: Clock, title: '24/7 Automated Follow-up', desc: 'AI never sleeps. Automatically follows up with prospects, sends appointment reminders, and nurtures leads until they book.', gradient: 'from-indigo-500 to-violet-500', stats: '78% faster response' },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />
      <div className="hero-glow" style={{ background: '#7c3aed', top: '20%', left: '-5%' }} />
      <div className="hero-glow" style={{ background: '#F59E0B', bottom: '30%', right: '-5%' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20 text-sm text-brand-300">
            <Zap className="w-4 h-4" />
            Powerful Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
            Everything you need to{' '}
            <span className="gradient-text">dominate</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            From AI sales to smart scheduling — we give you the tools of a Fortune 500 sales team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}
              className="group relative glass-card p-8 cursor-default"
              style={{
                transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : '',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 relative overflow-hidden`}>
                <feature.icon className="w-full h-full text-slate-900 relative z-10" />
                {hoveredIndex === index && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 2 }}
                    className="absolute inset-0 bg-surface-alt rounded-full" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-dark-300 leading-relaxed text-sm">{feature.desc}</p>
              <div className="mt-5 pt-4 border-t border-cream-dark flex items-center justify-between">
                <span className="text-xs text-accent-400 font-medium">{feature.stats}</span>
                <span className="text-dark-500 group-hover:text-brand-400 transition-colors text-sm">Learn more →</span>
              </div>
              <div className={`absolute inset-0 rounded-2xl ring-1 ring-inset transition-all duration-500 ${
                hoveredIndex === index ? 'ring-brand-500/30 ring-2' : 'ring-white/0'
              }`} style={hoveredIndex === index ? { boxShadow: '0 0 30px rgba(124,58,237,0.08)' } : {}} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
