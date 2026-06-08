import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Bot, User, Smartphone, Send, Check, CheckCheck, Phone, Video, MoreVertical, ArrowLeft, Image, Paperclip, Sparkles, Calendar, Clock, CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { aiApi } from '../utils/api'

const contacts = [
  { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', lastMsg: 'See you tomorrow at 2pm!', time: '09:41', unread: 2, avatar: 'SJ', online: true, typing: false, status: 'hot' },
  { id: 2, name: 'Mike Chen', phone: '+1 (555) 234-5678', lastMsg: 'Perfect, thanks for the info', time: '09:15', unread: 0, avatar: 'MC', online: true, typing: true, status: 'warm' },
  { id: 3, name: 'Emily Watson', phone: '+1 (555) 345-6789', lastMsg: 'Do you offer weekend appointments?', time: '08:50', unread: 1, avatar: 'EW', online: false, typing: false, lastSeen: '10:30 PM', status: 'warm' },
  { id: 4, name: 'Ahmed Hassan', phone: '+971 50 123 4567', lastMsg: 'شكراً جزيلاً', time: '08:20', unread: 0, avatar: 'AH', online: true, typing: false, status: 'warm' },
  { id: 5, name: 'Lisa Park', phone: '+1 (555) 567-8901', lastMsg: 'What services do you offer?', time: 'Yesterday', unread: 3, avatar: 'LP', online: false, typing: false, lastSeen: '8:00 PM', status: 'cold' },
  { id: 6, name: 'Robert Kim', phone: '+1 (555) 678-9012', lastMsg: 'Ready to sign up for Pro!', time: 'Yesterday', unread: 0, avatar: 'RK', online: true, typing: false, status: 'hot' },
  { id: 7, name: 'Noor Alí', phone: '+966 55 123 4567', lastMsg: 'كم سعر الباقة؟', time: 'Yesterday', unread: 1, avatar: 'NA', online: false, typing: false, lastSeen: '6:30 PM', status: 'cold' },
]

const initialChats = {
  1: [
    { id: 1, sender: 'them', content: 'Hi! I\'m interested in your services. What are your pricing plans?', time: '09:30', status: 'read' },
    { id: 2, sender: 'me', content: 'Hello Sarah! Our pricing starts at $29/month for Starter. The Pro plan at $79/month is our most popular.', time: '09:31', status: 'read' },
    { id: 3, sender: 'them', content: 'That sounds great! Can we do a demo tomorrow?', time: '09:35', status: 'read' },
    { id: 4, sender: 'me', content: 'Absolutely! I\'ve noted the demo for tomorrow at 2:00 PM.', time: '09:36', status: 'read' },
    { id: 5, sender: 'them', content: 'Perfect, see you at 2pm!', time: '09:40', status: 'read' },
  ],
  2: [
    { id: 1, sender: 'them', content: 'Hi there! I need help with booking a consultation.', time: '08:45', status: 'read' },
    { id: 2, sender: 'me', content: 'Hi Mike! What date works for you?', time: '08:46', status: 'read' },
    { id: 3, sender: 'them', content: 'This Friday at 2:30 PM?', time: '08:50', status: 'read' },
    { id: 4, sender: 'me', content: 'Friday 2:30 PM is available — confirmed! ✅', time: '08:52', status: 'read' },
    { id: 5, sender: 'them', content: 'Perfect, thanks for the info', time: '09:15', status: 'read' },
  ],
  3: [
    { id: 1, sender: 'them', content: 'Good morning! Do you offer weekend appointments?', time: '08:45', status: 'read' },
    { id: 2, sender: 'me', content: 'Good morning Emily! Yes, Saturday appointments are available.', time: '08:46', status: 'read' },
    { id: 3, sender: 'them', content: 'Next Saturday at 11 AM? I\'d like to book.', time: '08:48', status: 'read' },
    { id: 4, sender: 'me', content: 'Next Saturday at 11:00 AM is all yours! ✅', time: '08:50', status: 'read' },
  ],
  4: [
    { id: 1, sender: 'them', content: 'السلام عليكم، عندي استفسار', time: '08:10', status: 'read' },
    { id: 2, sender: 'me', content: 'وعليكم السلام! مرحباً أحمد. كيف أقدر أساعدك؟', time: '08:11', status: 'read' },
    { id: 3, sender: 'them', content: 'كم تكلفة الباقة الشهرية؟', time: '08:12', status: 'read' },
    { id: 4, sender: 'me', content: 'الباقات تبدأ من 29 دولار شهرياً. الباقة الاحترافية 79 دولار.', time: '08:13', status: 'read' },
    { id: 5, sender: 'them', content: 'شكراً جزيلاً', time: '08:20', status: 'read' },
  ],
}

const services = ['Consultation', 'Product Demo', 'Business Strategy', 'Technical Support', 'Custom Development']
const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
const today = () => new Date().toISOString().split('T')[0]
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r.toISOString().split('T')[0] }

const statusColors = { hot: 'text-red-400', warm: 'text-yellow-400', cold: 'text-dark-400' }

export default function Messages() {
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch] = useState('')
  const [chats, setChats] = useState(initialChats)
  const [newMsg, setNewMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [showMobileList, setShowMobileList] = useState(true)
  const [aiMode, setAiMode] = useState(true)
  const [simOpen, setSimOpen] = useState(false)
  const [simPhone, setSimPhone] = useState('+971 50 000 0000')
  const [simName, setSimName] = useState('')
  const [simMsg, setSimMsg] = useState('')
  const [simChat, setSimChat] = useState([])
  const [bookingStep, setBookingStep] = useState(null)
  const [bookingData, setBookingData] = useState({})
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  )

  const selected = contacts.find(c => c.id === selectedId)
  const messages = chats[selectedId] || []

  const getStatusIcon = (status) => {
    if (status === 'read') return <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
    if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-dark-400" />
    return <Check className="w-3.5 h-3.5 text-dark-400" />
  }

  const sendMessage = () => {
    if (!newMsg.trim()) return
    const conv = chats[selectedId] || []
    const msg = { id: Date.now(), sender: 'me', content: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'sent' }
    setChats({ ...chats, [selectedId]: [...conv, msg] })
    setNewMsg('')

    if (aiMode) {
      setSending(true)
      setTimeout(() => {
        const aiReplies = {
          'pricing': "Our pricing: Starter $29/mo, Growth $79/mo, Enterprise $149/mo. All plans include AI chat. Which fits your needs?",
          'book': "I'd be happy to help you book! Let me transfer you to our booking assistant.",
          'demo': "You can book a demo right now — just say 'book' and I'll help you set it up!",
          'hello': "Hello! 👋 How can I help you today?",
          'default': "Thanks for reaching out! I can help with pricing, booking, or any questions about SmartBiz AI.",
        }
        const lower = msg.content.toLowerCase()
        let replyContent = aiReplies.default
        if (lower.includes('price') || lower.includes('cost') || lower.includes('plan') || lower.includes('pricing')) replyContent = aiReplies.pricing
        else if (lower.includes('book') || lower.includes('appointment') || lower.includes('حجز')) replyContent = aiReplies.book
        else if (lower.includes('demo')) replyContent = aiReplies.demo
        else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('مرحب')) replyContent = aiReplies.hello

        const reply = { id: Date.now() + 1, sender: 'them', content: replyContent, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'read' }
        setChats(prev => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), reply] }))
        setSending(false)
      }, 1000 + Math.random() * 1000)
    }
  }

  const handleSimBooking = (text) => {
    const lower = text.toLowerCase()
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
        if (input.includes('بعد غد')) return addDays(today(), 2)
        if (input.includes('غد') || input.includes('tomorrow')) return addDays(today(), 1)
        if (input.includes('today') || input.includes('اليوم')) return today()
        return null
      }
      const parsed = parseDate(lower)
      if (parsed) {
        setBookingData(prev => ({ ...prev, date: parsed }))
        setBookingStep('time')
        return `تم تسجيل التاريخ: ${parsed} 📅\n\nاختر الوقت المناسب:\n\n${timeSlots.map(t => `🕐 ${t}`).join('\n')}`
      }
      return 'الرجاء إدخال التاريخ (مثال: غداً, 2026-06-06)'
    }
    if (bookingStep === 'time') {
      const matched = timeSlots.find(t => lower.includes(t))
      if (matched) {
        setBookingData(prev => ({ ...prev, time: matched }))
        setBookingStep(null)
        const bd = { ...bookingData, time: matched }
        setConfirmedBooking(bd)
        const newBooking = {
          id: Date.now(), customer_name: simName || 'WhatsApp Client', customer_phone: simPhone,
          service: bd.service || 'Consultation', date: bd.date || today(), time: matched, status: 'confirmed',
          notes: 'Booked via WhatsApp', created_at: new Date().toISOString(), rating: null, review: null,
        }
        try {
          const existing = JSON.parse(localStorage.getItem('smartbiz_bookings') || '[]')
          localStorage.setItem('smartbiz_bookings', JSON.stringify([newBooking, ...existing]))
        } catch {}
        return `✅ تم تأكيد الحجز بنجاح!\n━━━━━━━━━━━━━\n📋 ${bd.service || 'Consultation'}\n📅 ${bd.date || today()}\n⏰ ${matched}\n👤 ${simName || 'Guest'}\n━━━━━━━━━━━━━\n\nشكراً لك! 🙏`
      }
      return `الرجاء اختيار وقت:\n\n${timeSlots.map(t => `🕐 ${t}`).join('\n')}`
    }
    if (['book', 'appointment', 'حجز', 'موعد', 'احجز', 'schedule', 'booking'].some(k => lower.includes(k))) {
      setBookingStep('service'); setConfirmedBooking(null); setBookingData({})
      return `أهلاً بك! 👋\n\nاختر الخدمة:\n\n${services.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
    }
    return null
  }

  const sendSimulated = () => {
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
    const reply = { id: Date.now() + 1, sender: 'ai', content: "Hi! I'm the SmartBiz AI assistant. I can help with pricing, booking appointments, or learning about our services. Try sending 'book' or 'حجز'!", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setTimeout(() => setSimChat(prev => [...prev, reply]), 800)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 flex pb-16 lg:pb-0" style={{ height: '100vh' }}>
        {/* Contact List */}
        <div className={`w-80 lg:w-96 border-r border-[#DBEAFE] flex flex-col shrink-0 ${showMobileList ? 'flex' : 'hidden lg:flex'}`}
          style={{ background: '#0a0a12' }}>
          <div className="p-3 border-b border-[#DBEAFE] flex items-center gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                <Smartphone className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">WhatsApp</h2>
                <p className="text-[10px] text-dark-400">{contacts.filter(c => c.online).length} online</p>
              </div>
            </div>
            <button onClick={() => setSimOpen(!simOpen)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-medium transition-all ${simOpen ? ' text-slate-900' : 'text-dark-400 hover:text-slate-900'}`}
              style={simOpen ? { background: 'linear-gradient(135deg, rgba(37,211,102,0.2), rgba(18,140,126,0.1))', border: '1px solid rgba(37,211,102,0.2)' } : { border: '1px solid rgba(255,255,255,0.1)' }}>
              {simOpen ? '✕ Close Simulator' : '📱 Simulator'}
            </button>
          </div>
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50"
                placeholder="Search conversations..." />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button key={conv.id} onClick={() => { setSelectedId(conv.id); setShowMobileList(false) }}
                className={`w-full p-3 text-left transition-all border-b border-[#DBEAFE] hover:bg-[#F0F4FF] ${
                  selectedId === conv.id ? 'bg-[#F0F4FF]' : ''
                }`}>
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-slate-900"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>{conv.avatar}</div>
                    {conv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2" style={{ background: '#25D366', borderColor: '#0a0a12' }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900">{conv.name}</span>
                      <span className="text-[10px] text-dark-500">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-dark-400 truncate max-w-[160px]">
                        {conv.typing ? (
                          <span className="text-accent-400">typing...</span>
                        ) : conv.lastMsg}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-medium ${statusColors[conv.status]}`}>{conv.status}</span>
                        {conv.unread > 0 && (
                          <span className="w-5 h-5 rounded-full text-[10px] text-slate-900 flex items-center justify-center shrink-0"
                            style={{ background: '#25D366' }}>{conv.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Area */}
        <div className={`flex-1 flex flex-col ${!showMobileList ? 'flex' : 'hidden lg:flex'}`}>
          {simOpen ? (
            <>
              {/* Simulator Header */}
              <div className="p-3 border-b border-[#DBEAFE] flex items-center gap-3" style={{ background: '#0a0a12' }}>
                <button onClick={() => setSimOpen(false)} className="lg:hidden text-dark-300 hover:text-slate-900">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <Smartphone className="w-5 h-5 text-slate-900" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">WhatsApp Booking Simulator</p>
                  <p className="text-xs text-dark-400">Send "book" or "حجز" to start booking</p>
                </div>
                {bookingStep && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/20">
                    {bookingStep === 'service' ? 'Select Service' : bookingStep === 'date' ? 'Select Date' : 'Select Time'}
                  </span>
                )}
              </div>

              {/* Simulator Contact Info */}
              <div className="p-3 border-b border-[#DBEAFE] flex gap-2" style={{ background: '#0a0a12' }}>
                <input value={simName} onChange={e => setSimName(e.target.value)} placeholder="Your name"
                  className="flex-1 bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
                <input value={simPhone} onChange={e => setSimPhone(e.target.value)}
                  className="flex-1 bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
              </div>

              {/* Simulator Chat */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1"
                style={{ background: 'radial-gradient(ellipse at center, rgba(37,211,102,0.02), transparent)' }}>
                {simChat.length === 0 && (
                  <div className="text-center py-12">
                    <Smartphone className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                    <p className="text-sm text-dark-300 font-medium">📱 WhatsApp Simulator</p>
                    <p className="text-xs text-dark-500 mt-1">Type <strong className="text-brand-300">"book"</strong> or <strong className="text-brand-300">"حجز"</strong> to test booking flow</p>
                  </div>
                )}
                {simChat.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'} mb-0.5`}>
                    <div className={`max-w-[80%] rounded-lg px-3.5 py-2 ${
                      msg.sender === 'ai'
                        ? 'rounded-tl-none'
                        : 'rounded-tr-none'
                    }`}
                      style={{
                        background: msg.sender === 'ai'
                          ? 'linear-gradient(135deg, #075E54, #128C7E)'
                          : 'rgba(255,255,255,0.08)',
                        borderTopRightRadius: msg.sender === 'ai' ? '8px' : '4px',
                        borderTopLeftRadius: msg.sender === 'customer' ? '8px' : '4px',
                      }}>
                      <p className="text-sm text-slate-900 whitespace-pre-line leading-relaxed">{msg.content}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: msg.sender === 'ai' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)' }}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {confirmedBooking && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center my-4">
                    <div className="bg-[#F0F4FF] border border-accent-500/20 rounded-2xl p-4 text-center max-w-xs">
                      <CheckCircle2 className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-900 mb-1">Booking Confirmed! 🎉</p>
                      <p className="text-xs text-dark-400">{confirmedBooking.service} — {confirmedBooking.date} @ {confirmedBooking.time}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Simulator Input */}
              <div className="p-3 border-t border-[#DBEAFE] space-y-2" style={{ background: '#0a0a12' }}>
                {!bookingStep && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    <button onClick={() => setSimMsg('I want to book an appointment')}
                      className="shrink-0 text-[10px] px-3 py-1.5 rounded-full bg-[#F0F4FF] border border-[#DBEAFE] text-dark-300 hover:text-slate-900 transition-colors">
                      📅 Book now
                    </button>
                    <button onClick={() => setSimMsg('What services do you offer?')}
                      className="shrink-0 text-[10px] px-3 py-1.5 rounded-full bg-[#F0F4FF] border border-[#DBEAFE] text-dark-300 hover:text-slate-900 transition-colors">
                      📋 Services
                    </button>
                    <button onClick={() => setSimMsg('How much does it cost?')}
                      className="shrink-0 text-[10px] px-3 py-1.5 rounded-full bg-[#F0F4FF] border border-[#DBEAFE] text-dark-300 hover:text-slate-900 transition-colors">
                      💰 Pricing
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input value={simMsg} onChange={e => setSimMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendSimulated()}
                    placeholder={bookingStep ? 'Type your response...' : 'Type a message...'}
                    className="flex-1 bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
                  <button onClick={sendSimulated}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-900 shrink-0"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Chat Header */}
              {selected && (
                <div className="p-3 border-b border-[#DBEAFE] flex items-center gap-3" style={{ background: '#0a0a12' }}>
                  <button onClick={() => setShowMobileList(true)} className="lg:hidden text-dark-300 hover:text-slate-900">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-slate-900"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>{selected.avatar}</div>
                    {selected.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: '#25D366', borderColor: '#0a0a12' }} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{selected.name}</p>
                    <p className="text-[10px] flex items-center gap-2" style={{ color: selected.online ? '#25D366' : '#6b7280' }}>
                      {selected.online ? 'online' : selected.lastSeen ? `last seen ${selected.lastSeen}` : 'offline'}
                      {aiMode && <span className="text-brand-400">· AI assistant active</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAiMode(!aiMode)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] transition-all ${aiMode ? 'bg-brand-500/15 text-brand-300 border border-brand-500/20' : 'bg-[#F0F4FF] text-dark-400 border border-transparent'}`}>
                      <Bot className="w-3 h-3" /> AI
                    </button>
                    <Phone className="w-5 h-5 text-dark-400 hover:text-slate-900 cursor-pointer transition-colors" />
                    <Video className="w-5 h-5 text-dark-400 hover:text-slate-900 cursor-pointer transition-colors" />
                    <MoreVertical className="w-5 h-5 text-dark-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1"
                style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.03), transparent)' }}>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                    <Smartphone className="w-8 h-8 text-slate-900" />
                  </div>
                  <p className="text-sm text-dark-300 font-medium">WhatsApp Business</p>
                  <p className="text-xs text-dark-500 mt-0.5">Messages are end-to-end encrypted.</p>
                </div>
                {messages.map((msg, i) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-0.5`}>
                    <div className={`max-w-[75%] lg:max-w-[60%] rounded-lg px-3.5 py-2 ${
                      msg.sender === 'me' ? 'rounded-tr-none' : 'rounded-tl-none'
                    }`}
                      style={{
                        background: msg.sender === 'me'
                          ? 'linear-gradient(135deg, #075E54, #128C7E)'
                          : 'rgba(255,255,255,0.06)',
                        borderTopRightRadius: msg.sender === 'me' ? '4px' : '8px',
                        borderTopLeftRadius: msg.sender === 'them' ? '4px' : '8px',
                      }}>
                      <p className="text-sm text-slate-900 leading-relaxed">{msg.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <span className="text-[10px]" style={{ color: msg.sender === 'me' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)' }}>
                          {msg.time}
                        </span>
                        {msg.sender === 'me' && getStatusIcon(msg.status)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {sending && (
                  <div className="flex justify-start mb-0.5">
                    <div className="max-w-[75%] rounded-lg px-3.5 py-3 rounded-tl-none"
                      style={{ background: 'rgba(255,255,255,0.06)', borderTopLeftRadius: '4px' }}>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-[#DBEAFE]" style={{ background: '#0a0a12' }}>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-dark-400 hover:text-slate-900 transition-colors"><Image className="w-5 h-5" /></button>
                  <button className="p-2 text-dark-400 hover:text-slate-900 transition-colors"><Paperclip className="w-5 h-5" /></button>
                  <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder={aiMode ? "Type a message (AI will auto-reply)..." : "Type a message..."}
                    className="flex-1 bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
                  <button onClick={sendMessage}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-900 shrink-0"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
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
