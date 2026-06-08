import { useState, useEffect, useRef, useCallback } from 'react'
import { Bell, X, Users, Calendar, Star, TrendingUp, Bot, MessageCircle, CheckCheck, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const notificationTypes = {
  new_lead: { icon: Users, label: 'New Lead Captured', color: 'text-green-400', bg: 'bg-green-500/10' },
  new_booking: { icon: Calendar, label: 'New Booking', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  booking_completed: { icon: CheckCheck, label: 'Booking Completed', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  new_review: { icon: Star, label: 'New Review', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  lead_converted: { icon: TrendingUp, label: 'Lead Converted', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ai_conversation: { icon: Bot, label: 'AI Conversation', color: 'text-brand-400', bg: 'bg-brand-500/10' },
  new_message: { icon: MessageCircle, label: 'New Message', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
}

const generateNotification = (id) => {
  const types = Object.keys(notificationTypes)
  const type = types[Math.floor(Math.random() * types.length)]
  const details = {
    new_lead: ['Sarah Johnson — Interested in Pro plan', 'Mike Chen — Asked about pricing', 'Emily Watson — Booked demo', 'Robert Kim — Ready to sign up'],
    new_booking: ['Consultation with Sarah @ 2:30 PM', 'Product Demo for Mike @ 10:00 AM', 'Strategy call with Robert @ 4 PM'],
    booking_completed: ['Consultation — Sarah Johnson', 'Product Demo — Mike Chen', 'Support call — John Doe'],
    new_review: ['5⭐ from Emily Watson', '5⭐ from Robert Kim', '4⭐ from Lisa Park'],
    lead_converted: ['Sarah Johnson: Cold → Hot', 'Mike Chen: Warm → Hot', 'Emily Watson: New → Warm'],
    ai_conversation: ['Customer asked pricing → Auto-responded', 'Customer booked via WhatsApp', 'FAQ answered automatically'],
    new_message: ['Sarah: "See you tomorrow!"', 'Mike: "Perfect, thanks!"', 'Ahmed: "شكراً جزيلاً"'],
  }
  const items = details[type] || ['New activity']
  return {
    id,
    type,
    title: notificationTypes[type].label,
    detail: items[Math.floor(Math.random() * items.length)],
    time: 'Just now',
    read: false,
    timestamp: Date.now(),
  }
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('smartbiz_notifications')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setNotifications(parsed)
        setUnread(parsed.filter(n => !n.read).length)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('smartbiz_notifications', JSON.stringify(notifications.slice(0, 20)))
    setUnread(notifications.filter(n => !n.read).length)
  }, [notifications])

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotif = generateNotification(Date.now())
      setNotifications(prev => [newNotif, ...prev].slice(0, 20))
    }, 15000 + Math.random() * 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const markRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    localStorage.removeItem('smartbiz_notifications')
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-xl glass-card flex items-center justify-center text-dark-300 hover:text-slate-900 hover:border-brand-500/30 transition-all">
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] text-slate-900 flex items-center justify-center font-bold"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl z-50 bg-white"
            style={{ border: '1px solid rgba(79,70,229,0.1)' }}>
            <div className="p-4 border-b border-cream-dark flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-400" />
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                {unread > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full text-slate-900" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                    {unread} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-brand-400 hover:text-brand-300">Mark all read</button>
                )}
                <button onClick={clearAll} className="text-dark-400 hover:text-slate-900"><X className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Sparkles className="w-8 h-8 text-dark-600 mx-auto mb-2" />
                  <p className="text-sm text-dark-400">No notifications yet</p>
                  <p className="text-xs text-dark-500 mt-1">You'll see new activity here in real-time</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const nt = notificationTypes[n.type] || notificationTypes.new_message
                  const Icon = nt.icon
                  return (
                    <button key={n.id} onClick={() => markRead(n.id)}
                      className={`w-full p-3 text-left border-b border-cream-dark transition-all hover:bg-surface-alt flex items-start gap-3 ${
                        !n.read ? 'bg-surface-alt' : ''
                      }`}>
                      <div className={`w-8 h-8 rounded-xl ${nt.bg} flex items-center justify-center shrink-0 ${nt.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${!n.read ? 'text-slate-900' : 'text-dark-300'}`}>{n.title}</p>
                        <p className="text-[11px] text-dark-400 mt-0.5 truncate">{n.detail}</p>
                        <p className="text-[10px] text-dark-500 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: '#7c3aed' }} />
                      )}
                    </button>
                  )
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-2 border-t border-cream-dark">
                <button onClick={clearAll}
                  className="w-full py-2 rounded-xl text-xs text-dark-400 hover:text-slate-900 hover:bg-surface-alt transition-all text-center">
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
