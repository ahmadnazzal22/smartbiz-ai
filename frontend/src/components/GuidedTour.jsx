import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronRight, ChevronLeft, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    title: 'Welcome to SmartBiz AI!',
    desc: 'Let us show you around your new business command center. This quick tour will take just 30 seconds.',
    target: null,
    position: 'center',
    icon: Sparkles,
  },
  {
    title: 'Navigation Menu',
    desc: 'Access all sections from the sidebar — Dashboard, Messages, Bookings, Leads, AI Chat, and Reports.',
    target: 'sidebar-nav',
    position: 'right',
    icon: null,
  },
  {
    title: 'Your Key Metrics',
    desc: 'See your business performance at a glance — total leads, bookings, messages, and satisfaction rate.',
    target: 'stat-cards',
    position: 'bottom',
    icon: null,
  },
  {
    title: 'Weekly Activity Chart',
    desc: 'Track trends with interactive charts. Compare leads, bookings, and message volume day by day.',
    target: 'activity-chart',
    position: 'top',
    icon: null,
  },
  {
    title: 'AI Daily Report',
    desc: 'Get a personalized AI-generated report every morning with hot leads, recommendations, and focus areas.',
    target: 'ai-report-banner',
    position: 'top',
    icon: null,
  },
  {
    title: 'You\'re All Set! 🚀',
    desc: 'Start exploring! Check your messages, manage bookings, or review the AI report.',
    target: null,
    position: 'center',
    icon: Sparkles,
  },
]

export default function GuidedTour({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('guided_tour_seen')
    if (!seen) {
      setTimeout(() => setVisible(true), 800)
    }
  }, [])

  const go = (dir) => {
    const next = current + dir
    if (next < 0 || next >= steps.length) return
    setCurrent(next)
    scrollToTarget(steps[next].target)
  }

  const scrollToTarget = (targetId) => {
    if (!targetId) return
    setTimeout(() => {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('guided_tour_seen', 'true')
    if (onComplete) onComplete()
  }

  const step = steps[current]
  const isFirst = current === 0
  const isLast = current === steps.length - 1

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]" style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={dismiss} />

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-[101]"
            style={{
              top: step.position === 'center' ? '50%' : '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(90vw, 420px)',
            }}>
            <div className="rounded-2xl p-6 shadow-2xl"
              style={{ background: '#0f0f1a', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {step.icon && (
                    <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-[10px] text-dark-400 font-medium px-2 py-0.5 rounded-full bg-white/5">
                    {current + 1} / {steps.length}
                  </span>
                </div>
                <button onClick={dismiss} className="text-dark-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-dark-300 leading-relaxed mb-6">{step.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-4 bg-brand-400' : 'bg-white/10'
                    }`} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {!isFirst && (
                    <button onClick={() => go(-1)}
                      className="px-3 py-2 rounded-xl text-xs text-dark-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-all flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                  )}
                  {isLast ? (
                    <button onClick={dismiss}
                      className="px-5 py-2 rounded-xl text-xs font-medium text-white transition-all hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                      Get Started <ArrowRight className="w-3 h-3 inline ml-1" />
                    </button>
                  ) : (
                    <button onClick={() => go(1)}
                      className="px-5 py-2 rounded-xl text-xs font-medium text-white transition-all hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                      Next <ChevronRight className="w-3 h-3 inline ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
