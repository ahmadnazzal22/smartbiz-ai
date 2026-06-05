import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bot, User, Smartphone, Send, Calendar, Clock, CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { aiApi } from '../utils/api'

const demoConversations = [
  { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', lastMsg: 'What are your pricing plans?', time: '2 min ago', unread: 2, avatar: 'SJ', status: 'hot', online: true },
  { id: 2, name: 'Mike Chen', phone: '+1 (555) 234-5678', lastMsg: "I'd like to book a consultation", time: '15 min ago', unread: 0, avatar: 'MC', status: 'warm', online: true },
  { id: 3, name: 'Emily Watson', phone: '+1 (555) 345-6789', lastMsg: 'Do you offer weekend appointments?', time: '1 hour ago', unread: 1, avatar: 'EW', status: 'warm', online: false },
  { id: 4, name: 'John Doe', phone: '+1 (555) 456-7890', lastMsg: 'Thanks for the information!', time: '3 hours ago', unread: 0, avatar: 'JD', status: 'cold', online: false },
  { id: 5, name: 'Lisa Park', phone: '+1 (555) 567-8901', lastMsg: 'What services do you offer?', time: '5 hours ago', unread: 3, avatar: 'LP', status: 'cold', online: false },
]

const demoChats = {
  1: [
    { id: 1, sender: 'customer', content: 'Hi! I\'m interested in your services. What are your pricing plans?', time: '2:30 PM' },
    { id: 2, sender: 'ai', content: 'Hello Sarah! Thanks for reaching out. Our pricing starts at $29/month for the Starter plan with 1,000 conversations. The Pro plan at $79/month includes unlimited conversations, advanced analytics, and priority support.', time: '2:30 PM' },
    { id: 3, sender: 'customer', content: 'That sounds great! Can you tell me more about the Pro plan?', time: '2:32 PM' },
    { id: 4, sender: 'ai', content: 'Absolutely! The Pro plan includes unlimited AI conversations, smart booking, custom AI training, lead scoring, and 24/7 priority support. Would you like to book a demo?', time: '2:32 PM' },
  ],
}

const services = ['Consultation', 'Product Demo', 'Business Strategy', 'Technical Support', 'Custom Development']
const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']

const statusColors = { hot: 'text-red-400', warm: 'text-yellow-400', cold: 'text-dark-400' }

const today = () => new Date().toISOString().split('T')[0]
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r.toISOString().split('T')[0] }

export default function Messages() {
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch] = useState('')
  const [chats, setChats] = useState(demoChats)
  const [newMsg, setNewMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [showSimulator, setShowSimulator] = useState(false)
  const [simPhone, setSimPhone] = useState('+971 50 000 0000')
  const [simName, setSimName] = useState('')
  const [simMsg, setSimMsg] = useState('')
  const [simChat, setSimChat] = useState([])
  const [bookingStep, setBookingStep] = useState(null)
  const [bookingData, setBookingData] = useState({})
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  const filtered = demoConversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  )

  const sendMessage = async () => {
    if (!newMsg.trim()) return
    const conv = chats[selectedId] || []
    const msg = { id: Date.now(), sender: 'customer', content: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setChats({ ...chats, [selectedId]: [...conv, msg] })
    setNewMsg('')
    setSending(true)
    try {
      const res = await aiApi.chat({ message: newMsg, conversation_history: [] })
      const reply = { id: Date.now() + 1, sender: 'ai', content: res.data?.reply || "Thanks for your message! I'd be happy to help you further. Would you like to book a demo?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setTimeout(() => { setChats(prev => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), reply] })); setSending(false) }, 1000)
    } catch {
      const fallbackMsg = "Thanks for reaching out! I can help with pricing, booking, and more."
      const reply = { id: Date.now() + 1, sender: 'ai', content: fallbackMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setTimeout(() => { setChats(prev => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), reply] })); setSending(false) }, 1000)
    }
  }

  const handleSimBooking = (text) => {
    const lower = text.toLowerCase()
    const bookingKeywords = ['book', 'appointment', 'حجز', 'موعد', 'احجز', 'schedule', 'reserve', 'booking']

    if (bookingStep === 'service') {
      const matched = services.find(s => lower.includes(s.toLowerCase().split(' ')[0]))
      if (matched) {
        setBookingData(prev => ({ ...prev, service: matched }))
        setBookingStep('date')
        return `خدمة ممتازة! اخترت: ${matched} 👍\n\nالآن، ما هو التاريخ المناسب لك؟\n(مثال: غداً أو ${addDays(today(), 1)})`
      }
      return `من فضلك اختر خدمة:\n\n${services.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
    }

    if (bookingStep === 'date') {
      const parseDate = (input) => {
        const iso = input.match(/(\d{4})-(\d{2})-(\d{2})/)
        if (iso) return iso[0]
        const slash = input.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/)
        if (slash) {
          const d = slash[1].padStart(2, '0')
          const m = slash[2].padStart(2, '0')
          const y = slash[3]?.length === 4 ? slash[3] : '2026'
          return `${y}-${m}-${d}`
        }
        const dash = input.match(/(\d{1,2})-(\d{1,2})(?:-(\d{2,4}))?/)
        if (dash) {
          const d = dash[1].padStart(2, '0')
          const m = dash[2].padStart(2, '0')
          const y = dash[3]?.length === 4 ? dash[3] : '2026'
          return `${y}-${m}-${d}`
        }
        if (input.includes('بعد غد')) return addDays(today(), 2)
        if (input.includes('غد') || input.includes('tomorrow')) return addDays(today(), 1)
        if (input.includes('اليوم') || input.includes('today')) return today()
        return null
      }
      const parsed = parseDate(lower)
      if (parsed) {
        setBookingData(prev => ({ ...prev, date: parsed }))
        setBookingStep('time')
        return `تم تسجيل التاريخ: ${parsed} 📅\n\nاختر الوقت المناسب:\n\n${timeSlots.map(t => `🕐 ${t}`).join('\n')}`
      }
      return 'الرجاء إدخال التاريخ (مثال: غداً, 6/6, 2026-06-06)'
    }

    if (bookingStep === 'time') {
      const matched = timeSlots.find(t => lower.includes(t) || lower.includes(t.replace(':', '')))
      if (matched) {
        setBookingData(prev => ({ ...prev, time: matched }))
        setBookingStep(null)
        const bd = { ...bookingData, time: matched }
        setConfirmedBooking(bd)
        const newBooking = {
          id: Date.now(),
          customer_name: simName || 'WhatsApp Client',
          customer_phone: simPhone,
          customer_email: '',
          service: bd.service || 'Consultation',
          date: bd.date || today(),
          time: matched,
          status: 'confirmed',
          notes: 'Booked via WhatsApp',
          created_at: new Date().toISOString(),
          rating: null,
          review: null,
        }
        try {
          const existing = JSON.parse(localStorage.getItem('smartbiz_bookings') || '[]')
          localStorage.setItem('smartbiz_bookings', JSON.stringify([newBooking, ...existing]))
        } catch {}
        return `✅ تم تأكيد الحجز بنجاح!\n━━━━━━━━━━━━━━━━\n📋 الخدمة: ${bd.service || 'Consultation'}\n📅 التاريخ: ${bd.date || today()}\n⏰ الوقت: ${matched}\n👤 الاسم: ${simName || 'Guest'}\n📱 الرقم: ${simPhone}\n━━━━━━━━━━━━━━━━\n\nشكراً لك! سنرسل لك تذكير قبل الموعد. نراكم قريباً 🙏`
      }
      return `الرجاء اختيار وقت:\n\n${timeSlots.map(t => `🕐 ${t}`).join('\n')}`
    }

    if (bookingKeywords.some(k => lower.includes(k))) {
      setBookingStep('service')
      setConfirmedBooking(null)
      setBookingData({})
      return `أهلاً بك! 👋 سأساعدك في الحجز.\n\nاختر الخدمة التي تريدها:\n\n${services.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nاكتب اسم الخدمة: `
    }

    return null
  }

  const sendSimulated = async () => {
    if (!simMsg.trim()) return
    const msg = simMsg.trim()
    const userMsg = { id: Date.now(), sender: 'customer', content: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setSimChat(prev => [...prev, userMsg])
    setSimMsg('')

    const bookingReply = handleSimBooking(msg)
    if (bookingReply) {
      const reply = { id: Date.now() + 1, sender: 'ai', content: bookingReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setTimeout(() => setSimChat(prev => [...prev, reply]), 800)
      return
    }

    try {
      const res = await aiApi.chat({ message: msg, conversation_history: [] })
      const reply = { id: Date.now() + 1, sender: 'ai', content: res.data?.reply || "Thanks! I'm your SmartBiz AI assistant. I can help with pricing, booking, or any questions.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setTimeout(() => setSimChat(prev => [...prev, reply]), 800)
    } catch {
      const reply = { id: Date.now() + 1, sender: 'ai', content: "Hi! I'm the SmartBiz AI assistant. I can help you with pricing, booking appointments, or learning about our services. What can I assist you with?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setTimeout(() => setSimChat(prev => [...prev, reply]), 800)
    }
  }

  const selectedConv = demoConversations.find(c => c.id === selectedId)

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 flex pb-16 lg:pb-0">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Inbox</h2>
              <button onClick={() => setShowSimulator(!showSimulator)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(18,140,126,0.1))', border: '1px solid rgba(37,211,102,0.2)', color: '#25D366' }}>
                <Smartphone className="w-3 h-3" /> WhatsApp
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50" placeholder="Search..." />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button key={conv.id} onClick={() => setSelectedId(conv.id)}
                className={`w-full p-4 text-left transition-all border-b border-white/5 hover:bg-white/[0.02] ${selectedId === conv.id ? 'bg-white/[0.04] border-l-2' : ''}`}
                style={selectedId === conv.id ? { borderLeftColor: '#7c3aed' } : {}}>
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #14b8a6)' }}>{conv.avatar}</div>
                    {conv.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-dark-900" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium text-white truncate">{conv.name}</span>
                      <span className="text-xs text-dark-500">{conv.time}</span>
                    </div>
                    <p className="text-xs text-dark-400 truncate mb-0.5">{conv.lastMsg}</p>
                    <span className={`text-[10px] font-medium ${statusColors[conv.status]}`}>{conv.status}</span>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>{conv.unread}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat / Simulator */}
        <div className="flex-1 flex flex-col">
          {showSimulator ? (
            <>
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">WhatsApp Booking</p>
                    <p className="text-xs text-dark-400">Send "book" or "حجز" to start</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {bookingStep && (
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/20">
                      Booking: {bookingStep === 'service' ? 'Select Service' : bookingStep === 'date' ? 'Select Date' : 'Select Time'}
                    </span>
                  )}
                  <button onClick={() => setShowSimulator(false)} className="text-xs text-dark-400 hover:text-white">Close</button>
                </div>
              </div>

              <div className="p-4 border-b border-white/5 flex gap-3">
                <input value={simName} onChange={e => setSimName(e.target.value)} placeholder="Your name"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50" />
                <input value={simPhone} onChange={e => setSimPhone(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50" />
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: 'rgba(37,211,102,0.02)' }}>
                {simChat.length === 0 && (
                  <div className="text-center py-12">
                    <Smartphone className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                    <p className="text-sm text-dark-400">📱 WhatsApp Booking Simulator</p>
                    <p className="text-xs text-dark-500 mt-1">Type <strong className="text-brand-300">"book"</strong> or <strong className="text-brand-300">"حجز"</strong> to book via WhatsApp</p>
                    <p className="text-xs text-dark-500">Or ask about pricing, services, hours</p>
                  </div>
                )}
                {simChat.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      msg.sender === 'customer'
                        ? 'bg-white/10 text-dark-200 rounded-tl-sm'
                        : 'text-white rounded-tr-sm'
                    }`} style={msg.sender === 'ai' ? { background: 'linear-gradient(135deg, #075E54, #128C7E)' } : {}}>
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      <p className="text-[10px] mt-1 opacity-60">{msg.time}</p>
                    </div>
                  </motion.div>
                ))}
                {confirmedBooking && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center">
                    <div className="bg-white/5 border border-green-500/20 rounded-2xl p-4 text-center max-w-xs">
                      <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-white mb-1">Booking Confirmed! 🎉</p>
                      <p className="text-xs text-dark-400">{confirmedBooking.service} — {confirmedBooking.date} @ {confirmedBooking.time}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-4 border-t border-white/5 space-y-2">
                {!bookingStep && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    <button onClick={() => { setSimMsg('Hi, I want to book an appointment'); document.getElementById('whatsapp-input')?.focus() }}
                      className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-dark-300 hover:text-white transition-colors">
                      📅 Book now
                    </button>
                    <button onClick={() => { setSimMsg('What services do you offer?') }}
                      className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-dark-300 hover:text-white transition-colors">
                      📋 Services
                    </button>
                    <button onClick={() => { setSimMsg('How much does it cost?') }}
                      className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-dark-300 hover:text-white transition-colors">
                      💰 Pricing
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-1.5">
                  <input id="whatsapp-input" value={simMsg} onChange={e => setSimMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendSimulated()}
                    placeholder={bookingStep === 'service' ? 'Type service name...' : bookingStep === 'date' ? 'Enter date...' : bookingStep === 'time' ? 'Enter time...' : 'Type a WhatsApp message...'}
                    className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-dark-400 outline-none" />
                  <button onClick={sendSimulated}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {selectedConv && (
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #14b8a6)' }}>{selectedConv.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{selectedConv.name}</p>
                    <p className="text-xs text-dark-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-dark-400">AI Powered</span>
                    <Bot className="w-4 h-4 text-brand-400" />
                  </div>
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(chats[selectedId] || []).map((msg, i) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex items-start gap-2 max-w-[75%] ${msg.sender === 'customer' ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'customer' ? 'bg-accent-500' : ''}`}
                        style={msg.sender === 'ai' ? { background: 'linear-gradient(135deg, #7c3aed, #14b8a6)' } : {}}>
                        {msg.sender === 'customer' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2.5 ${msg.sender === 'customer' ? 'bg-white/5 text-dark-200' : 'text-white'}`}
                        style={msg.sender === 'ai' ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)' } : {}}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === 'customer' ? 'text-dark-500' : 'text-white/60'}`}>{msg.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {sending && (
                  <div className="flex justify-end">
                    <div className="rounded-2xl px-4 py-3 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-1.5">
                  <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..." className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-dark-400 outline-none" />
                  <button onClick={sendMessage}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
