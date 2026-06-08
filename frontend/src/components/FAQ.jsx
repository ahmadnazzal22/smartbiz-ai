import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'Do I need any technical skills to set up SmartBiz AI?', a: 'No. SmartBiz AI is designed for non-technical business owners. You just connect your WhatsApp Business number, customize your AI responses, and you\'re live. Setup takes less than 10 minutes.' },
  { q: 'How does the WhatsApp integration work?', a: 'You link your WhatsApp Business account with one click. The AI assistant automatically responds to incoming messages, answers FAQs, captures lead info, and books appointments — just like a human sales rep.' },
  { q: 'Can I customize the AI responses?', a: 'Yes. You can train the AI on your specific business info — pricing, services, hours, FAQs. The Pro plan lets you upload custom data so the AI sounds exactly like your brand.' },
  { q: 'Is there a long-term contract?', a: 'No. All plans are month-to-month. You can cancel anytime. There are no cancellation fees or hidden charges. Your data is yours.' },
  { q: 'What if I need help?', a: 'All plans include email support. Pro and Enterprise plans include 24/7 priority support via WhatsApp and phone. Our average response time is under 2 minutes.' },
  { q: 'Can I try before I buy?', a: 'Yes! Start a 14-day free trial. No credit card required. You get full access to all Pro features. If you don\'t love it, simply cancel.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/10 to-dark-950" />
      <div className="hero-glow" style={{ background: '#14b8a6', top: '60%', left: '70%' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20 text-sm text-brand-300">
            <Sparkles className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            Got questions?{' '}
            <span className="gradient-text">We have answers</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-sm font-medium text-slate-900 pr-4">{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-[#F0F4FF] flex items-center justify-center shrink-0">
                  {openIndex === i ? <Minus className="w-4 h-4 text-accent-400" /> : <Plus className="w-4 h-4 text-dark-400" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <p className="px-5 pb-5 text-sm text-dark-300 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
