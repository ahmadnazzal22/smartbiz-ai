import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: '29',
    description: 'Perfect for small businesses starting with AI automation.',
    features: ['WhatsApp integration', 'AI assistant (1,000 convos/mo)', 'Basic booking system', 'Lead capture & scoring', 'Dashboard analytics', 'Email support', '14-day free trial'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: '79',
    description: 'For growing businesses that need advanced automation.',
    features: ['Everything in Starter', 'Unlimited AI conversations', 'Advanced booking + calendar', 'Smart lead scoring + CRM', 'Custom AI training', 'Priority support 24/7', 'API access + webhooks', 'Customer feedback system'],
    cta: 'Start Free Trial',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '199',
    description: 'For large teams with custom requirements.',
    features: ['Everything in Pro', 'Unlimited everything', 'Dedicated AI model', 'Full CRM integration', 'Custom development', 'SLA guarantee 99.9%', 'Dedicated account manager', 'White-label option', 'On-premise deployment'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/20 to-dark-950" />
      <div className="hero-glow" style={{ background: '#7c3aed', top: '30%', left: '50%' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20 text-sm text-brand-300">
            <Sparkles className="w-4 h-4" />
            Simple Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
            Transparent pricing,{' '}
            <span className="gradient-text">no hidden fees</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className={`relative glass-card p-8 flex flex-col group hover:bg-[#F0F4FF] ${
                plan.popular ? 'scale-105' : ''
              }`}
              style={plan.popular ? { borderColor: 'rgba(124,58,237,0.3)', background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.05))' } : {}}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-semibold text-slate-900 flex items-center gap-1.5 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
                  <Star className="w-3 h-3" /> {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-dark-400">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-dark-300">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(20,184,166,0.1)' }}>
                      <Check className="w-3 h-3 text-accent-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={plan.name === 'Enterprise' ? '#contact' : '/login'}
                className={`w-full py-3.5 rounded-full text-sm font-semibold text-center transition-all duration-300 btn-premium ${
                  plan.popular
                    ? 'text-slate-900 hover:shadow-xl'
                    : 'glass-card text-dark-200 hover:text-slate-900 hover:border-brand-500/30'
                }`}
                style={plan.popular ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' } : {}}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-12 text-sm text-dark-400">
          <p>All plans include a 14-day free trial · No credit card required · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}
