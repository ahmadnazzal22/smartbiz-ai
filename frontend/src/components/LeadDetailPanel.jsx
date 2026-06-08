import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, MessageCircle, Calendar, Star, Clock, TrendingUp, ThumbsUp, Bot, CheckCircle2, ArrowRight } from 'lucide-react'

const conversations = {
  1: [
    { role: 'ai', text: 'Hello! Welcome to SmartBiz. How can I help you today?' },
    { role: 'lead', text: 'Hi! I\'m interested in your Pro plan.' },
    { role: 'ai', text: 'Great choice! The Pro plan includes AI chat, lead scoring, WhatsApp integration, and detailed analytics. Would you like a demo?' },
    { role: 'lead', text: 'Yes, please! Can we schedule one for this week?' },
    { role: 'ai', text: 'Absolutely! I\'ll have our team reach out to you shortly.' },
  ],
  2: [
    { role: 'ai', text: 'Welcome! How can I assist you today?' },
    { role: 'lead', text: 'I saw your pricing page. Can you tell me more about the plans?' },
    { role: 'ai', text: 'Sure! We have 3 plans: Starter (free), Growth ($49/mo), and Enterprise ($149/mo). Which fits your needs?' },
    { role: 'lead', text: 'What\'s included in Growth?' },
    { role: 'ai', text: 'Growth includes unlimited leads, AI chat, WhatsApp integration, and priority support. Would you like to see a demo?' },
    { role: 'lead', text: 'Yes, schedule one for me please.' },
  ],
  4: [
    { role: 'ai', text: 'Hello! Welcome to SmartBiz. How can I help?' },
    { role: 'lead', text: 'Just browsing your website. Looks interesting.' },
    { role: 'ai', text: 'Thanks! We help businesses automate their customer communication with AI. Would you like to learn more?' },
    { role: 'lead', text: 'Maybe later. Just looking around.' },
  ],
}

const leadBookings = {
  1: [
    { service: 'Pro Plan Demo', date: '2026-06-10', time: '14:00', status: 'upcoming' },
    { service: 'Discovery Call', date: '2026-06-03', time: '11:00', status: 'completed' },
  ],
  2: [
    { service: 'Product Demo', date: '2026-06-12', time: '15:30', status: 'upcoming' },
  ],
}

export default function LeadDetailPanel({ lead, onClose }) {
  if (!lead) return null

  const msgs = conversations[lead.id] || conversations[1]
  const bookings = leadBookings[lead.id] || []
  const isHot = lead.status === 'hot'
  const isWarm = lead.status === 'warm'

  const recommendation = isHot
    ? 'Send proposal now and schedule closing call'
    : isWarm
    ? 'Send case study and offer free demo'
    : 'Send educational content and nurture'

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-dark-900/95 backdrop-blur-xl border-l border-white/5 z-50 overflow-y-auto shadow-2xl">
            
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-lg font-bold text-white">
                    {lead.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{lead.name}</h2>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      isHot ? 'bg-red-500/10 text-red-400' : isWarm ? 'bg-yellow-500/10 text-yellow-400' : 'bg-white/5 text-dark-400'
                    }`}>
                      {isHot && '🔥'} {isWarm && '🟡'} {!isHot && !isWarm && '⚪'} {lead.status.toUpperCase()} · Score {lead.score}
                    </span>
                  </div>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                  <X className="w-4 h-4 text-dark-400" />
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-400" />
                  <div>
                    <p className="text-[10px] text-dark-500 uppercase tracking-wider">Phone</p>
                    <p className="text-sm text-white">{lead.phone}</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-400" />
                  <div>
                    <p className="text-[10px] text-dark-500 uppercase tracking-wider">Email</p>
                    <p className="text-sm text-white">{lead.email}</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-[10px] text-dark-500 uppercase tracking-wider">Source</p>
                    <p className="text-sm text-white capitalize">{lead.source}</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-[10px] text-dark-500 uppercase tracking-wider">Last Contact</p>
                    <p className="text-sm text-white">{lead.lastContact}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Notes</h3>
                <p className="text-sm text-dark-300 bg-white/[0.03] rounded-xl p-4">{lead.notes}</p>
              </div>

              {/* AI Recommendation */}
              <div className={`rounded-xl p-4 ${isHot ? 'bg-red-500/5 border border-red-500/10' : isWarm ? 'bg-yellow-500/5 border border-yellow-500/10' : 'bg-white/[0.02] border border-white/5'}`}>
                <div className="flex items-start gap-3">
                  <Bot className={`w-5 h-5 ${isHot ? 'text-red-400' : isWarm ? 'text-yellow-400' : 'text-dark-400'}`} />
                  <div>
                    <p className="text-sm font-semibold text-white">AI Recommendation</p>
                    <p className="text-xs text-dark-300 mt-1">{recommendation}</p>
                  </div>
                </div>
              </div>

              {/* Conversations */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-brand-400" />
                  Recent Conversations
                </h3>
                <div className="space-y-2">
                  {msgs.slice(-4).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'ai'
                          ? 'bg-white/[0.06] text-dark-200 rounded-tl-sm'
                          : 'bg-brand-500/20 text-brand-200 rounded-tr-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bookings */}
              {bookings.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent-400" />
                    Bookings
                  </h3>
                  <div className="space-y-2">
                    {bookings.map((b, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-3">
                        <div>
                          <p className="text-sm text-white">{b.service}</p>
                          <p className="text-xs text-dark-400">{b.date} at {b.time}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                          b.status === 'upcoming' ? 'bg-brand-500/10 text-brand-300' : 'bg-green-500/10 text-green-400'
                        }`}>
                          {b.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                  <Phone className="w-4 h-4" /> Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-dark-200 bg-white/5 hover:bg-white/10 transition-all">
                  <Mail className="w-4 h-4" /> Email
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
