import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Building2, Stethoscope, Scissors, Home, GraduationCap, ShoppingBag, Dumbbell, ArrowRight, ArrowLeft, MessageSquare, Code, Sparkles, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import { authApi, businessHoursApi } from '../utils/api'

const businessTypes = [
  { id: 'clinic', icon: Stethoscope, label: 'Clinic / Medical', desc: 'Hospitals, dental clinics, medical centers' },
  { id: 'salon', icon: Scissors, label: 'Salon / Spa', desc: 'Hair salons, barbershops, beauty centers' },
  { id: 'realestate', icon: Home, label: 'Real Estate', desc: 'Property agencies, brokers, developers' },
  { id: 'education', icon: GraduationCap, label: 'Education', desc: 'Tutoring centers, academies, courses' },
  { id: 'retail', icon: ShoppingBag, label: 'Retail / E-commerce', desc: 'Online stores, boutiques, shops' },
  { id: 'fitness', icon: Dumbbell, label: 'Fitness / Wellness', desc: 'Gyms, yoga studios, wellness centers' },
  { id: 'other', icon: Building2, label: 'Other', desc: 'Other business types' },
]

const steps = [
  { id: 1, label: 'Business Type', subtitle: 'What type of business do you run?' },
  { id: 2, label: 'Your Business', subtitle: 'Tell us about your company' },
  { id: 3, label: 'AI Messages', subtitle: 'Customize your AI assistant' },
  { id: 4, label: 'Installation', subtitle: 'Connect SmartBiz AI to your website' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    businessType: '',
    companyName: user?.business_name || '',
    services: '',
    aiGreeting: 'Hello! 👋 Welcome! How can I help you today?',
    aiTone: 'professional',
    installed: false,
  })

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleComplete = async () => {
    setSaving(true)
    try {
      await authApi.updateProfile({ business_name: form.companyName })
      const defaultHours = [0,1,2,3,4,5,6].map(day => ({
        day_of_week: day, open_time: '09:00', close_time: '17:00', is_available: day < 5,
      }))
      await businessHoursApi.update(defaultHours)
      localStorage.setItem('onboarding', JSON.stringify({ ...form, completed: true }))
      showToast('Setup complete! Welcome to SmartBiz AI', 'success')
      navigate('/dashboard', { replace: true })
    } catch {
      showToast('Saved locally — connect backend to sync', 'warning')
      localStorage.setItem('onboarding', JSON.stringify({ ...form, completed: true }))
      navigate('/dashboard', { replace: true })
    }
    setSaving(false)
  }

  const canProceed = () => {
    if (step === 1) return form.businessType
    if (step === 2) return form.companyName.trim().length > 0
    if (step === 3) return form.aiGreeting.trim().length > 0
    return true
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.08), transparent 60%), #050508' }}>

      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {steps.map(s => (
              <div key={s.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${step > s.id ? 'bg-brand-500 text-slate-900' : step === s.id ? 'ring-2 ring-brand-400 bg-brand-500/20 text-brand-300' : 'bg-surface-alt text-dark-400'}
                `}>
                  {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                </div>
                {s.id < 4 && <div className={`w-16 sm:w-24 h-0.5 mx-1 transition-all duration-300 ${step > s.id ? 'bg-brand-500' : 'bg-surface-alt'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-900">{steps[step - 1].label}</p>
            <p className="text-sm text-dark-400">{steps[step - 1].subtitle}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 space-y-6">

            {step === 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {businessTypes.map(bt => {
                  const Icon = bt.icon
                  const selected = form.businessType === bt.id
                  return (
                    <button key={bt.id} onClick={() => update('businessType', bt.id)}
                      className={`p-4 rounded-xl text-center transition-all duration-200 ${
                        selected ? 'ring-2 ring-brand-400 bg-brand-500/10' : 'bg-surface-alt hover:bg-surface-alt border border-cream-dark'
                      }`}>
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${selected ? 'text-brand-400' : 'text-dark-400'}`} />
                      <p className={`text-xs font-medium ${selected ? 'text-slate-900' : 'text-dark-300'}`}>{bt.label}</p>
                      <p className="text-[10px] text-dark-500 mt-1 leading-tight">{bt.desc}</p>
                    </button>
                  )
                })}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Company Name</label>
                  <input value={form.companyName} onChange={e => update('companyName', e.target.value)}
                    className="w-full bg-surface-alt border border-cream-dark rounded-xl px-4 py-3 text-slate-900 placeholder-dark-500 outline-none focus:border-brand-500/50 transition-all"
                    placeholder="e.g. SmartBiz Clinic" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Services Offered</label>
                  <textarea value={form.services} onChange={e => update('services', e.target.value)} rows={3}
                    className="w-full bg-surface-alt border border-cream-dark rounded-xl px-4 py-3 text-slate-900 placeholder-dark-500 outline-none focus:border-brand-500/50 transition-all resize-none"
                    placeholder="e.g. Haircuts, Coloring, Styling, Beard Trimming" />
                  <p className="text-xs text-dark-500 mt-1">Separate with commas</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">AI Greeting Message</label>
                  <textarea value={form.aiGreeting} onChange={e => update('aiGreeting', e.target.value)} rows={3}
                    className="w-full bg-surface-alt border border-cream-dark rounded-xl px-4 py-3 text-slate-900 placeholder-dark-500 outline-none focus:border-brand-500/50 transition-all resize-none"
                    placeholder="Your AI assistant's first message to customers..." />
                  <div className="mt-3 p-3 rounded-xl bg-surface-alt border border-cream-dark">
                    <p className="text-xs text-dark-400 mb-2 flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-brand-400" /> Preview</p>
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex-shrink-0 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                      </div>
                      <p className="text-sm text-dark-200 bg-surface-alt rounded-2xl rounded-tl-sm px-4 py-2.5">{form.aiGreeting || 'Your greeting will appear here'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">AI Tone</label>
                  <div className="flex gap-3">
                    {['professional', 'friendly', 'casual'].map(tone => (
                      <button key={tone} onClick={() => update('aiTone', tone)}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-all ${
                          form.aiTone === tone ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/30' : 'bg-surface-alt text-dark-400 hover:bg-surface-alt'
                        }`}>
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(245,158,11,0.2))' }}>
                  <Code className="w-8 h-8 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">You're all set!</h3>
                  <p className="text-dark-400 text-sm mt-1">Add this code to your website to activate SmartBiz AI</p>
                </div>
                <div className="bg-dark-950 rounded-xl p-4 text-left relative group">
                  <pre className="text-xs text-dark-300 overflow-x-auto font-mono leading-relaxed">
{`<!-- SmartBiz AI Widget -->
<script>
  window.SMARTBIZ_CONFIG = {
    business_id: "sb_${Math.random().toString(36).slice(2, 8)}",
    business_name: "${form.companyName || 'Your Business'}",
    primary_color: "#7c3aed",
    greeting: "${form.aiGreeting}"
  };
</script>
<script src="https://cdn.smartbiz.ai/widget.js" async defer></script>`}
                  </pre>
                  <button onClick={() => { navigator.clipboard?.writeText(document.querySelector('pre')?.textContent || '') }}
                    className="absolute top-2 right-2 px-3 py-1.5 text-xs rounded-lg bg-surface-alt text-dark-300 hover:bg-surface-alt hover:text-slate-900 transition-all">
                    Copy
                  </button>
                </div>
                <p className="text-xs text-dark-500">Or use our WordPress plugin / Shopify app for one-click setup</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-dark-400 hover:text-slate-900 hover:bg-surface-alt transition-all">
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Back' : 'Skip'}
          </button>

          <div className="flex items-center gap-3">
            {step < 4 && (
              <button onClick={() => navigate('/dashboard')}
                className="text-xs text-dark-500 hover:text-dark-300 transition-all">
                Skip setup
              </button>
            )}
            <button onClick={() => step < 4 ? setStep(s => s + 1) : handleComplete()}
              disabled={!canProceed() || saving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-900 transition-all ${
                canProceed() && !saving ? 'hover:shadow-lg hover:scale-105' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ background: canProceed() && !saving ? 'linear-gradient(135deg, #7c3aed, #6366f1)' : '#222' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {step < 4 ? 'Continue' : saving ? 'Saving...' : 'Go to Dashboard'}
              {step < 4 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
