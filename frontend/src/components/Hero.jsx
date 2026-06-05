import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, MessageCircle, CalendarCheck, Bot, TrendingUp, Sparkles, Shield, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '10x', label: 'Faster Responses' },
  { value: '98%', label: 'Satisfaction' },
  { value: '24/7', label: 'AI Support' },
  { value: '3k+', label: 'Active Users' },
]

const floatingCards = [
  { icon: MessageCircle, label: 'WhatsApp AI', x: 15, y: 10, delay: 0, color: 'from-brand-500 to-primary-500' },
  { icon: CalendarCheck, label: 'Smart Booking', x: 72, y: 8, delay: 0.5, color: 'from-accent-500 to-emerald-500' },
  { icon: TrendingUp, label: 'Analytics', x: 10, y: 60, delay: 1, color: 'from-purple-500 to-pink-500' },
  { icon: Bot, label: 'AI Assistant', x: 75, y: 58, delay: 1.5, color: 'from-primary-500 to-violet-500' },
]

const chatPreview = [
  { side: 'left', text: 'Hi! What are your pricing plans?', delay: 1.5 },
  { side: 'right', text: 'Our plans start at $29/mo! 🎉', delay: 2.2 },
  { side: 'left', text: 'Can I book a consultation?', delay: 3.0 },
  { side: 'right', text: 'Sure! How about tomorrow at 2pm?', delay: 3.8 },
]

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      <div className="hero-glow" style={{ background: '#7c3aed', top: '5%', left: '-10%' }} />
      <div className="hero-glow" style={{ background: '#14b8a6', bottom: '10%', right: '-5%' }} />
      <div className="hero-glow" style={{ background: '#6366f1', top: '40%', left: '40%' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
              </span>
              <span className="text-sm text-brand-300 font-medium">Now with Cosmic AI Engine</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1]">
              Turn your WhatsApp into a{' '}
              <span className="gradient-text">24/7 AI sales team</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-dark-300 max-w-xl leading-relaxed">
              SmartBiz AI automatically responds to customers, books appointments, captures leads, and closes sales — 
              all through WhatsApp. <span className="text-brand-300 font-medium">No coding. No complexity. 10-minute setup.</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4">
              <Link to="/login"
                className="group btn-premium px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center gap-2 glow-brand hover:scale-105 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
                <Sparkles className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#demo"
                className="px-8 py-4 glass-card rounded-full text-dark-200 font-semibold text-lg flex items-center gap-2 hover:text-white hover:border-brand-500/30 transition-all duration-300">
                <Play className="w-5 h-5" />
                Watch Demo
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-dark-950 bg-gradient-to-br ${
                    ['from-brand-400 to-brand-600','from-accent-400 to-accent-600','from-purple-400 to-purple-600','from-blue-400 to-blue-600'][i-1]
                  }`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-dark-400 mt-0.5">Trusted by <span className="text-white font-semibold">3,000+</span> businesses</p>
              </div>
            </motion.div>
          </div>

          {/* ─── 3D Dashboard Preview ─── */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block">
            <div className="tilt-card relative"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
                transition: 'transform 0.1s ease-out',
              }}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10,10,18,0.95), rgba(30,27,75,0.85))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)',
                }}>
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-dark-400 font-medium">SmartBiz AI — Executive Dashboard</span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {['Total Leads', 'Bookings', 'Revenue'].map(label => (
                        <div key={label} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-dark-300">{label}</div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-dark-400">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: '128', label: 'Leads', change: '+12%', color: 'from-brand-500 to-purple-500' },
                      { value: '45', label: 'Bookings', change: '+8%', color: 'from-accent-500 to-emerald-500' },
                      { value: '$12.4k', label: 'Revenue', change: '+23%', color: 'from-blue-500 to-cyan-500' },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl bg-white/[0.03] p-3 border border-white/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg font-bold text-white">{s.value}</span>
                          <span className="text-xs text-green-400">{s.change}</span>
                        </div>
                        <p className="text-xs text-dark-400">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-3.5 h-3.5 text-brand-400" />
                      <span className="text-xs text-dark-400">Live WhatsApp Activity</span>
                    </div>
                    <div className="space-y-1.5">
                      {chatPreview.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: msg.side === 'left' ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }} transition={{ delay: msg.delay }}
                          className={`flex ${msg.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`px-3 py-1.5 rounded-xl text-xs max-w-[80%] ${
                            msg.side === 'left' ? 'bg-white/5 text-dark-300' : 'bg-gradient-to-r from-brand-600 to-accent-600 text-white'
                          }`}>{msg.text}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-dark-500 pt-1">
                    <span>AI Response Rate: <span className="text-accent-400">96%</span></span>
                    <span>Avg. Response: <span className="text-brand-400">1.2s</span></span>
                  </div>
                </div>
              </div>

              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/10 via-transparent to-accent-500/10 rounded-3xl blur-2xl -z-10" />
            </div>

            {floatingCards.map(({ icon: Icon, label, x, y, delay, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + delay, type: 'spring' }}
                className="absolute pointer-events-none"
                style={{
                  left: `${x}%`, top: `${y}%`,
                  transform: `translate(${mousePos.x * (10 + i * 5)}px, ${mousePos.y * (10 + i * 5)}px)`,
                }}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card border-white/10 backdrop-blur-xl whitespace-nowrap">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-dark-200">{label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }} className="text-center">
              <div className="text-3xl font-bold gradient-text font-display">{s.value}</div>
              <div className="text-sm text-dark-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  )
}
