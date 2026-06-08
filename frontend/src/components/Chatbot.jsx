import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronRight, Star } from 'lucide-react'
import { aiApi } from '../utils/api'

const leadQuestions = [
  { key: 'name', question: "Great! Let's get started. What's your name?", placeholder: 'Enter your name...' },
  { key: 'phone', question: 'Thanks! And your phone number?', placeholder: 'Enter your phone...' },
  { key: 'service', question: 'Which service interests you?', options: ['AI WhatsApp Bot', 'Smart Booking', 'Lead Management', 'Full Suite'], placeholder: 'Type or select...' },
  { key: 'time', question: 'Perfect! What time works best for a call?', options: ['Morning (9-12)', 'Afternoon (12-5)', 'Evening (5-8)'], placeholder: 'Enter preferred time...' },
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey there! 👋 I'm your AI sales assistant. I can help you learn about SmartBiz AI, get pricing, or book a demo. What's on your mind?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [leadStage, setLeadStage] = useState(-1)
  const [leadData, setLeadData] = useState({})
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typingText])

  const typeMessage = async (text, cb) => {
    setIsTyping(true)
    setTypingText('')
    for (let i = 0; i < text.length; i++) {
      setTypingText(text.slice(0, i + 1))
      await new Promise(r => setTimeout(r, 10 + Math.random() * 20))
    }
    setIsTyping(false)
    setTypingText('')
    if (cb) cb()
  }

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { role: 'assistant', content: text }])
  }

  const handleLeadFlow = (answer) => {
    const stage = leadStage
    const newLeadData = { ...leadData }

    if (stage === 0) newLeadData.name = answer
    else if (stage === 1) newLeadData.phone = answer
    else if (stage === 2) newLeadData.service = answer
    else if (stage === 3) {
      newLeadData.time = answer
      setLeadData(newLeadData)
      setLeadStage(-1)
      setShowSuggestions(false)

      const summary = `🎉 Awesome ${newLeadData.name}! I've saved your info:\n\n📋 **Lead Summary**\n👤 Name: ${newLeadData.name}\n📞 Phone: ${newLeadData.phone}\n📌 Service: ${newLeadData.service}\n🕐 Time: ${newLeadData.time}\n\nOne of our team will contact you shortly. In the meantime, check out our dashboard!`
      addBotMessage(summary)
      return
    }

    setLeadData(newLeadData)
    const nextStage = stage + 1
    setLeadStage(nextStage)

    setTimeout(() => {
      const q = leadQuestions[nextStage]
      if (q.options) {
        addBotMessage(q.question + '\n\n' + q.options.map((o, i) => `${i+1}. ${o}`).join('\n'))
      } else {
        addBotMessage(q.question)
      }
    }, 500)
  }

  const sendMessage = async (text) => {
    if (!text.trim() || loading || isTyping) return

    if (leadStage >= 0) {
      setMessages(prev => [...prev, { role: 'user', content: text }])
      setInput('')
      handleLeadFlow(text)
      return
    }

    setMessages(prev => [...prev, { role: 'user', content: text }])
    setInput('')
    setShowSuggestions(false)
    setLoading(true)

    try {
      const res = await aiApi.chat({ message: text, conversation_history: [] })
      const reply = res.data?.reply || "Thanks for your message! I'd love to help you get started. Would you like to book a demo call or learn more about our pricing?"
      addBotMessage(reply)
    } catch {
      addBotMessage("Thanks for reaching out! I'm here to help. Would you like to schedule a quick demo call to see SmartBiz AI in action?")
    }
    setLoading(false)
  }

  const startBooking = () => {
    setShowSuggestions(false)
    setLeadStage(0)
    addBotMessage("Perfect! Let me collect some quick info to get you booked. 📋")
    setTimeout(() => addBotMessage(leadQuestions[0].question), 800)
  }

  const suggestions = [
    { label: '💬 Book a Demo', action: startBooking },
    { label: '💰 View Pricing', action: () => sendMessage('What are your pricing plans?') },
    { label: '✨ How it Works', action: () => sendMessage('How does SmartBiz AI work?') },
    { label: '⭐ See Features', action: () => sendMessage('What features do you offer?') },
  ]

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 80, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 80, scale: 0.95, x: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[560px] z-50 flex flex-col overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(160deg, rgba(15,23,42,0.97), rgba(30,27,75,0.95))',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.1)',
            }}>
            {/* Header */}
            <div className="p-4 relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(20,184,166,0.2))',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-dark-900" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">AI Sales Assistant</p>
                  <p className="text-xs text-green-400">● Online — Ready to help</p>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-[#F0F4FF] flex items-center justify-center text-dark-400 hover:text-slate-900 hover:bg-[#F0F4FF] transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-tr-sm'
                        : 'bg-[#F0F4FF] text-dark-200 rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-[#F0F4FF] rounded-2xl px-4 py-3 rounded-tl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-[#F0F4FF] rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {showSuggestions && messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.map((s) => (
                    <button key={s.label} onClick={s.action}
                      className="text-xs px-3 py-2.5 rounded-xl glass-card text-dark-300 hover:text-slate-900 hover:border-primary-500/30 transition-all text-left flex items-center gap-1.5">
                      {s.label}
                      <ChevronRight className="w-3 h-3 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lead questions helper */}
            {leadStage >= 0 && leadQuestions[leadStage]?.options && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {leadQuestions[leadStage].options.map((opt) => (
                  <button key={opt} onClick={() => sendMessage(opt)}
                    className="text-xs px-3 py-1.5 rounded-full glass-card text-dark-300 hover:text-slate-900 hover:border-primary-500/30 transition-all">
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-[#DBEAFE]">
              <div className="flex items-center gap-2 rounded-2xl bg-[#F0F4FF] border border-[#DBEAFE] p-1.5 focus-within:border-primary-500/50 transition-all">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder={leadStage >= 0 ? leadQuestions[leadStage]?.placeholder || 'Type your answer...' : 'Ask me anything...'}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-dark-400 outline-none" />
                <button onClick={() => sendMessage(input)} disabled={loading || isTyping || !input.trim()}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-40 shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-dark-500 mt-1.5 text-center">Powered by SmartBiz AI — Your AI Sales Team</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-white flex items-center justify-center shadow-xl z-40 btn-premium"
        style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}>
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  )
}
