import { motion } from 'framer-motion'
import { Star, Shield, Award, Users } from 'lucide-react'

const logos = ['TechVista', 'CloudNest', 'DataPulse', 'NovaSoft', 'QuantumLeap', 'ApexDigital']

export default function TrustBar() {
  return (
    <section className="relative py-16 border-y border-cream-dark">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-transparent to-accent-500/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-xs text-dark-500 uppercase tracking-widest mb-8 font-medium">
          Trusted by innovative companies worldwide
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-10">
          {logos.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="text-xl font-bold text-dark-600 hover:text-dark-400 transition-colors font-display tracking-tight">
              {name}
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Star, label: '4.9/5 Rating', sub: 'From 500+ reviews' },
            { icon: Shield, label: 'SOC 2 Certified', sub: 'Enterprise security' },
            { icon: Award, label: 'Best AI Platform', sub: '2025 Award winner' },
            { icon: Users, label: '3,000+ Teams', sub: 'Across 45 countries' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}
              className="text-center">
              <item.icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-xs text-dark-500 mt-0.5">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
