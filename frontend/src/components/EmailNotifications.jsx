import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Mail, Smartphone, Calendar, TrendingUp, AlertTriangle, X, CheckCheck } from 'lucide-react'

const emailTemplates = [
  { id: 'hot-lead', icon: AlertTriangle, title: 'Hot Lead Captured!', desc: 'Robert Kim (Score: 95) is ready to buy. Follow up now.', time: '2 min ago', color: 'text-red-400', bg: 'rgba(239,68,68,0.1)' },
  { id: 'booking-reminder', icon: Calendar, title: 'Booking Reminder', desc: 'Sarah Johnson — Consultation at 2:00 PM in 2 hours', time: '10 min ago', color: 'text-accent-400', bg: 'rgba(20,184,166,0.1)' },
  { id: 'daily-report', icon: TrendingUp, title: 'Daily AI Report Ready', desc: 'Your business snapshot for today — +12 new leads, 3 bookings', time: '8:00 AM', color: 'text-brand-400', bg: 'rgba(124,58,237,0.1)' },
  { id: 'ai-summary', icon: Mail, title: 'Weekly AI Summary', desc: 'Your team handled 892 conversations this week. 23% growth!', time: 'Mon 9:00 AM', color: 'text-blue-400', bg: 'rgba(99,102,241,0.1)' },
  { id: 'lead-warm', icon: AlertTriangle, title: 'Lead Warming Up', desc: 'Lisa Park (Score: 71) engaged with pricing page. Send follow-up.', time: '1 hour ago', color: 'text-yellow-400', bg: 'rgba(234,179,8,0.1)' },
]

export default function EmailNotifications() {
  const [showPanel, setShowPanel] = useState(false)
  const [notifs, setNotifs] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * emailTemplates.length)
      setNotifs(prev => {
        const next = [{ ...emailTemplates[idx], id: Date.now() }, ...prev].slice(0, 20)
        return next
      })
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  const unread = notifs.length

  return (
    <>
      <button onClick={() => setShowPanel(!showPanel)}
        className="relative w-10 h-10 rounded-xl bg-[#F0F4FF] border border-[#DBEAFE] flex items-center justify-center hover:bg-[#F0F4FF] transition-all">
        <Mail className="w-4 h-4 text-dark-300" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold text-slate-900 flex items-center justify-center"
            style={{ background: '#ef4444' }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showPanel && (
          <>
            <div onClick={() => setShowPanel(false)} className="fixed inset-0 z-40" />
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-14 w-80 sm:w-96 z-50 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: '#0a0a12', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="p-4 border-b border-[#DBEAFE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-400" />
                  <h3 className="text-sm font-semibold text-slate-900">Email Notifications</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-dark-400">{notifs.length} notifications</span>
                  {notifs.length > 0 && (
                    <button onClick={() => setNotifs([])} className="text-[10px] text-dark-500 hover:text-dark-300 transition-colors">Clear</button>
                  )}
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifs.length === 0 ? (
                  <div className="text-center py-10">
                    <Mail className="w-8 h-8 text-dark-600 mx-auto mb-2" />
                    <p className="text-xs text-dark-400">No email notifications yet</p>
                    <p className="text-[10px] text-dark-500 mt-1">They'll appear here as they arrive</p>
                  </div>
                ) : (
                  notifs.map(n => (
                    <div key={n.id} className="flex items-start gap-3 p-3 border-b border-[#DBEAFE] hover:bg-[#F0F4FF] transition-colors">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: n.bg }}>
                        <n.icon className={`w-4 h-4 ${n.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-900">{n.title}</p>
                        <p className="text-[11px] text-dark-400 mt-0.5">{n.desc}</p>
                        <p className="text-[10px] text-dark-500 mt-1">{n.time}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: n.color.replace('text-', '').replace('400', '500') }} />
                    </div>
                  ))
                )}
              </div>
              {notifs.length > 0 && (
                <div className="p-3 border-t border-[#DBEAFE] text-center">
                  <button className="text-xs text-brand-400 hover:text-brand-300 transition-colors">View all notifications →</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
