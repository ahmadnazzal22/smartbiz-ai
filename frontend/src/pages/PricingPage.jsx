import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Sparkles, Star, HelpCircle, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const plans = [
  {
    name: 'Starter',
    monthly: '$0',
    yearly: '$0',
    desc: 'Perfect for small businesses testing AI automation.',
    cta: 'Start Free',
    popular: false,
    features: {
      'AI Conversations': '500/mo',
      'WhatsApp Integration': true,
      'Booking System': 'Basic',
      'Lead Scoring': true,
      'Dashboard': true,
      'AI Daily Report': false,
      'Calendar View': false,
      'Custom AI Training': false,
      'Team Members': '1',
      'API Access': false,
      'Priority Support': false,
      'SLA Guarantee': false,
    },
  },
  {
    name: 'Growth',
    monthly: '$49',
    yearly: '$39',
    desc: 'For growing businesses that need advanced automation.',
    cta: 'Start Free Trial',
    popular: true,
    badge: 'Most Popular',
    features: {
      'AI Conversations': 'Unlimited',
      'WhatsApp Integration': true,
      'Booking System': 'Advanced',
      'Lead Scoring': 'Smart AI',
      'Dashboard': 'Advanced',
      'AI Daily Report': true,
      'Calendar View': true,
      'Custom AI Training': true,
      'Team Members': '5',
      'API Access': true,
      'Priority Support': '24/7',
      'SLA Guarantee': false,
    },
  },
  {
    name: 'Enterprise',
    monthly: '$149',
    yearly: '$119',
    desc: 'For large teams with custom requirements.',
    cta: 'Contact Sales',
    popular: false,
    features: {
      'AI Conversations': 'Unlimited',
      'WhatsApp Integration': true,
      'Booking System': 'Full Suite',
      'Lead Scoring': 'Advanced AI',
      'Dashboard': 'Custom',
      'AI Daily Report': true,
      'Calendar View': true,
      'Custom AI Training': 'Dedicated',
      'Team Members': 'Unlimited',
      'API Access': true,
      'Priority Support': 'Dedicated Manager',
      'SLA Guarantee': '99.9%',
    },
  },
]

const allFeatures = ['AI Conversations', 'WhatsApp Integration', 'Booking System', 'Lead Scoring', 'Dashboard', 'AI Daily Report', 'Calendar View', 'Custom AI Training', 'Team Members', 'API Access', 'Priority Support', 'SLA Guarantee']

const faqs = [
  { q: 'Can I switch plans later?', a: 'Yes! You can upgrade or downgrade anytime. Changes take effect immediately.' },
  { q: 'Is there a free trial?', a: 'All paid plans come with a 14-day free trial. No credit card required.' },
  { q: 'What happens when I hit my AI conversation limit?', a: 'You\'ll be notified. You can upgrade or purchase additional conversations.' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all paid plans.' },
  { q: 'Can I use my own WhatsApp number?', a: 'Absolutely! You can connect your existing WhatsApp Business number.' },
  { q: 'Is my data secure?', a: 'Yes. We use end-to-end encryption and are SOC 2 compliant.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.06), transparent 60%), #050508' }}>
      <SEO title="Pricing" description="Simple, transparent pricing for SmartBiz AI. Start free, upgrade as you grow. No hidden fees." url="/pricing" />

      {/* Hero */}
      <div className="text-center pt-24 pb-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20 text-sm text-brand-300 mb-6">
          <Sparkles className="w-4 h-4" />
          Simple, Transparent Pricing
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-4">
          The right plan for{' '}
          <span className="gradient-text">your business</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-dark-300 max-w-xl mx-auto text-lg">
          Start free, upgrade as you grow. No hidden fees, no surprises.
        </motion.p>

        {/* Toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 mt-10">
          <span className={`text-sm font-medium ${!annual ? 'text-slate-900' : 'text-dark-400'}`}>Monthly</span>
          <button onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-all ${annual ? 'bg-brand-500' : 'bg-surface-alt'}`}>
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${annual ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-slate-900' : 'text-dark-400'}`}>
            Annual <span className="text-accent-400 text-xs">Save 20%</span>
          </span>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              className={`relative glass-card p-8 flex flex-col ${plan.popular ? 'scale-105 ring-1 ring-brand-500/30' : ''}`}
              style={plan.popular ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.04))' } : {}}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-semibold text-slate-900 flex items-center gap-1.5 shadow-lg whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #F59E0B)' }}>
                  <Star className="w-3 h-3" /> {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-dark-400 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-slate-900">{annual ? plan.yearly : plan.monthly}</span>
                  {plan.monthly !== '$0' && <span className="text-dark-400">/month</span>}
                </div>
                {annual && plan.monthly !== '$0' && (
                  <p className="text-xs text-accent-400 mt-1">Billed annually (${parseInt(plan.yearly.replace('$', '')) * 12}/yr)</p>
                )}
              </div>

              <Link to={plan.name === 'Enterprise' ? '#contact' : '/login'}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-300 mb-8 ${
                  plan.popular
                    ? 'text-slate-900 hover:shadow-lg hover:scale-[1.02]'
                    : 'glass-card text-dark-200 hover:text-slate-900 hover:border-brand-500/30'
                }`}
                style={plan.popular ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)' } : {}}>
                {plan.cta}
              </Link>

              <ul className="space-y-3 flex-1">
                {allFeatures.map(f => {
                  const val = plan.features[f]
                  return (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      {val === true ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(245,158,11,0.1)' }}>
                          <Check className="w-3 h-3 text-accent-400" />
                        </div>
                      ) : val === false ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.1)' }}>
                          <X className="w-3 h-3 text-red-400" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(124,58,237,0.1)' }}>
                          <span className="text-[8px] text-brand-400 font-bold">{val.includes('$') ? '$' : '#'}</span>
                        </div>
                      )}
                      <span className={val === false ? 'text-dark-500' : 'text-dark-200'}>{f}</span>
                      {typeof val === 'string' && !['true', 'false'].includes(val) && (
                        <span className="ml-auto text-xs text-brand-300 font-medium">{val}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-3xl font-display font-bold text-slate-900 text-center mb-12">
          Full Feature <span className="gradient-text">Comparison</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left px-6 py-4 text-dark-400 font-medium">Feature</th>
                  {plans.map(p => (
                    <th key={p.name} className={`px-6 py-4 text-center font-semibold ${p.popular ? 'text-brand-300' : 'text-slate-900'}`}>
                      {p.name}
                      {p.popular && <span className="block text-[10px] text-brand-400 font-normal">Most Popular</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((f, i) => (
                  <tr key={f} className={`${i < allFeatures.length - 1 ? 'border-b border-cream-dark' : ''} hover:bg-surface-alt`}>
                    <td className="px-6 py-4 text-dark-200">{f}</td>
                    {plans.map(p => {
                      const val = p.features[f]
                      return (
                        <td key={p.name} className="px-6 py-4 text-center">
                          {val === true ? <Check className="w-4 h-4 text-accent-400 mx-auto" />
                            : val === false ? <X className="w-4 h-4 text-dark-600 mx-auto" />
                            : <span className="text-brand-300 font-medium">{val}</span>}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 pb-32">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-3xl font-display font-bold text-slate-900 text-center mb-12">
          Frequently Asked <span className="gradient-text">Questions</span>
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="text-sm font-medium text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-dark-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-dark-400">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-32 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
            Still not sure? <span className="gradient-text">Try it free</span>
          </h2>
          <p className="text-dark-300 mb-8">Start your 14-day free trial. No credit card. No commitment.</p>
          <Link to="/try-demo"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-slate-900 font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #F59E0B)' }}>
            Try Free Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
