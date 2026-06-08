import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bot, User, Smartphone, Send, Check, CheckCheck, Phone, Video, MoreVertical, ArrowLeft, Image, Paperclip } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const contacts = [
  { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', lastMsg: 'See you tomorrow at 2pm!', time: '09:41', unread: 2, avatar: 'SJ', online: true, typing: false },
  { id: 2, name: 'Mike Chen', phone: '+1 (555) 234-5678', lastMsg: 'Perfect, thanks for the info', time: '09:15', unread: 0, avatar: 'MC', online: true, typing: true },
  { id: 3, name: 'Emily Watson', phone: '+1 (555) 345-6789', lastMsg: 'Do you offer weekend appointments?', time: '08:50', unread: 1, avatar: 'EW', online: false, typing: false, lastSeen: '10:30 PM' },
  { id: 4, name: 'Ahmed Hassan', phone: '+971 50 123 4567', lastMsg: 'شكراً جزيلاً على المساعدة', time: '08:20', unread: 0, avatar: 'AH', online: true, typing: false },
  { id: 5, name: 'Lisa Park', phone: '+1 (555) 567-8901', lastMsg: 'What services do you offer?', time: 'Yesterday', unread: 3, avatar: 'LP', online: false, typing: false, lastSeen: '8:00 PM' },
  { id: 6, name: 'Robert Kim', phone: '+1 (555) 678-9012', lastMsg: 'Ready to sign up for Pro!', time: 'Yesterday', unread: 0, avatar: 'RK', online: true, typing: false },
  { id: 7, name: 'Noor Alí', phone: '+966 55 123 4567', lastMsg: 'كم سعر الباقة الاحترافية؟', time: 'Yesterday', unread: 1, avatar: 'NA', online: false, typing: false, lastSeen: '6:30 PM' },
  { id: 8, name: 'John Doe', phone: '+1 (555) 456-7890', lastMsg: 'Thanks for the information!', time: '2 days ago', unread: 0, avatar: 'JD', online: false, typing: false, lastSeen: '3:00 PM' },
]

const chatMessages = {
  1: [
    { id: 1, sender: 'them', content: 'Hi! I\'m interested in your services. What are your pricing plans?', time: '09:30', status: 'read' },
    { id: 2, sender: 'me', content: 'Hello Sarah! Our pricing starts at $29/month for Starter. The Pro plan at $79/month is our most popular with unlimited conversations and advanced analytics.', time: '09:31', status: 'read' },
    { id: 3, sender: 'them', content: 'That sounds great! Can we do a demo tomorrow?', time: '09:35', status: 'read' },
    { id: 4, sender: 'me', content: 'Absolutely! I\'ve booked a demo for tomorrow at 2:00 PM. You\'ll receive a confirmation shortly.', time: '09:36', status: 'read' },
    { id: 5, sender: 'them', content: 'Perfect, see you tomorrow!', time: '09:40', status: 'read' },
    { id: 6, sender: 'me', content: 'See you tomorrow at 2pm! 🎉', time: '09:41', status: 'read' },
  ],
  2: [
    { id: 1, sender: 'them', content: 'Hi there! I need help with booking a consultation.', time: '08:45', status: 'read' },
    { id: 2, sender: 'me', content: 'Hi Mike! I\'d be happy to help. What date works for you?', time: '08:46', status: 'read' },
    { id: 3, sender: 'them', content: 'How about this Friday at 2:30 PM?', time: '08:50', status: 'read' },
    { id: 4, sender: 'me', content: 'Friday at 2:30 PM is available! Let me confirm that for you.', time: '08:52', status: 'read' },
    { id: 5, sender: 'me', content: '✅ Confirmed! Consultation this Friday at 2:30 PM. You\'ll get a reminder.', time: '08:52', status: 'read' },
    { id: 6, sender: 'them', content: 'Perfect, thanks for the info', time: '09:15', status: 'read' },
  ],
  3: [
    { id: 1, sender: 'them', content: 'Good morning! Do you offer weekend appointments?', time: '08:45', status: 'read' },
    { id: 2, sender: 'me', content: 'Good morning Emily! Yes, we offer limited Saturday appointments. Would you like to book one?', time: '08:46', status: 'read' },
    { id: 3, sender: 'them', content: 'Yes please! Next Saturday at 11 AM?', time: '08:48', status: 'read' },
    { id: 4, sender: 'me', content: 'Let me check availability... Yes, next Saturday at 11:00 AM is available!', time: '08:50', status: 'read' },
  ],
  4: [
    { id: 1, sender: 'them', content: 'السلام عليكم، عندي استفسار عن الخدمات', time: '08:10', status: 'read' },
    { id: 2, sender: 'me', content: 'وعليكم السلام! مرحباً أحمد. كيف أقدر أساعدك؟', time: '08:11', status: 'read' },
    { id: 3, sender: 'them', content: 'كم تكلفة الباقة الشهرية؟', time: '08:12', status: 'read' },
    { id: 4, sender: 'me', content: 'الباقات تبدأ من 29 دولار شهرياً للباقة الأساسية. الباقة الاحترافية 79 دولار وتشمل محادثات غير محدودة.', time: '08:13', status: 'read' },
    { id: 5, sender: 'them', content: 'شكراً جزيلاً على المساعدة', time: '08:20', status: 'read' },
  ],
}

export default function WhatsAppViewer() {
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch] = useState('')
  const [newMsg, setNewMsg] = useState('')
  const [showMobileList, setShowMobileList] = useState(true)

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  const selected = contacts.find(c => c.id === selectedId)
  const messages = chatMessages[selectedId] || []

  const getStatusIcon = (status) => {
    if (status === 'read') return <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
    if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-dark-400" />
    return <Check className="w-3.5 h-3.5 text-dark-400" />
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 flex pb-16 lg:pb-0" style={{ height: '100vh' }}>
        {/* Contact List */}
        <div className={`w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col shrink-0 ${showMobileList ? 'flex' : 'hidden lg:flex'}`}>
          <div className="p-3 border-b border-slate-200 flex items-center gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">WhatsApp</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-dark-500 px-2 py-1 rounded-full bg-surface-alt border border-slate-200">{contacts.filter(c => c.online).length} online</span>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-surface-alt border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50"
                placeholder="Search or start new chat" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button key={conv.id} onClick={() => { setSelectedId(conv.id); setShowMobileList(false) }}
                className={`w-full p-3 text-left transition-all border-b border-slate-100 hover:bg-surface-alt ${
                  selectedId === conv.id ? 'bg-surface-alt' : ''
                }`}>
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>{conv.avatar}</div>
                    {conv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: '#4F46E5' }} />
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
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center shrink-0"
                          style={{ background: '#4F46E5' }}>{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className={`flex-1 flex flex-col ${!showMobileList ? 'flex' : 'hidden lg:flex'}`}>
          {/* Chat Header */}
          {selected && (
            <div className="p-3 bg-white border-b border-slate-200 flex items-center gap-3">
              <button onClick={() => setShowMobileList(true)} className="lg:hidden text-dark-400 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>{selected.avatar}</div>
                {selected.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: '#4F46E5' }} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{selected.name}</p>
                <p className="text-[10px]" style={{ color: selected.online ? '#4F46E5' : '#6b7280' }}>
                  {selected.online ? 'online' : selected.lastSeen ? `last seen ${selected.lastSeen}` : 'offline'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-dark-400 hover:text-slate-900 cursor-pointer transition-colors" />
                <Video className="w-5 h-5 text-dark-400 hover:text-slate-900 cursor-pointer transition-colors" />
                <MoreVertical className="w-5 h-5 text-dark-400 hover:text-slate-900 cursor-pointer transition-colors" />
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1"
            style={{ background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.03), transparent)' }}>
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-dark-300 font-medium">WhatsApp Business</p>
              <p className="text-xs text-dark-500 mt-0.5">Messages and calls are end-to-end encrypted.</p>
            </div>
            {messages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-1`}>
                <div className={`relative max-w-[75%] lg:max-w-[60%] px-3.5 py-2.5 ${
                  msg.sender === 'me'
                    ? 'rounded-2xl rounded-tr-sm shadow-md'
                    : 'bg-white rounded-2xl rounded-tl-sm shadow-sm border border-slate-100'
                }`}
                  style={msg.sender === 'me' ? { background: 'linear-gradient(135deg, #4F46E5, #6366F1)' } : {}}>
                  {msg.sender !== 'me' && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-brand-500 rounded-l-2xl" />
                  )}
                  <p className={`text-sm leading-relaxed ${msg.sender === 'me' ? 'text-white' : 'text-slate-800'}`}>{msg.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-[10px] ${msg.sender === 'me' ? 'text-white/60' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                    {msg.sender === 'me' && (
                      <span className="text-white/60">{getStatusIcon(msg.status)}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button className="p-2 text-dark-400 hover:text-slate-900 transition-colors"><Image className="w-5 h-5" /></button>
              <button className="p-2 text-dark-400 hover:text-slate-900 transition-colors"><Paperclip className="w-5 h-5" /></button>
              <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && setNewMsg('')}
                placeholder="Type a message"
                className="flex-1 bg-surface-alt border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-md hover:shadow-lg transition-shadow"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
