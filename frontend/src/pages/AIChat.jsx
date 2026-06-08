import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles, MessageSquare, Brain, TrendingUp, Clock, Star, Zap, BarChart3 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { aiApi } from '../utils/api'

const quickActions = [
  { label: '💰 Pricing', msg: 'Tell me about your pricing plans' },
  { label: '📅 Book Demo', msg: 'I want to book a product demo' },
  { label: '✨ Features', msg: 'What features do you offer?' },
  { label: '⚡ Quick Start', msg: 'How do I get started?' },
  { label: '📊 Analytics', msg: 'What analytics do you provide?' },
  { label: '🔒 Security', msg: 'How secure is the platform?' },
]

const insights = [
  { icon: Clock, label: 'Peak Hours', value: '10AM-2PM', change: '+45% activity' },
  { icon: Star, label: 'Top Service', value: 'AI WhatsApp Bot', change: '45% of requests' },
  { icon: TrendingUp, label: 'Conversion', value: '23.5%', change: '+5.2% this week' },
  { icon: Zap, label: 'Response Time', value: '1.2s avg', change: '98% satisfaction' },
]

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm the SmartBiz AI assistant. I can help you with pricing, booking, features, and anything about the platform. How can I help you today? 🚀" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setInput('')
    setShowQuick(false)
    setLoading(true)
    try {
      const res = await aiApi.chat({ message: text, conversation_history: [] })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data?.reply || "Thanks for your question! Let me help you with that. Our platform is designed to automate your business communication through AI. Would you like to see a demo?" }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I appreciate your question! Our platform offers AI-powered WhatsApp automation, smart booking, lead management, and detailed analytics. Would you like me to walk you through any specific feature?" }])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 flex pb-16 lg:pb-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-cream-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">AI Business Assistant</h2>
                <p className="text-xs text-dark-400">Powered by SmartBiz AI Engine</p>
              </div>
            </div>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-accent-500' : 'bg-gradient-to-br from-brand-500 to-accent-500'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-slate-900" /> : <Bot className="w-4 h-4 text-slate-900" />}
                  </div>
                  <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white rounded-tr-sm'
                      : 'bg-surface-alt text-dark-200 rounded-tl-sm'
                  }`}>{msg.content}</div>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-slate-900" />
                  </div>
                  <div className="bg-surface-alt rounded-2xl px-5 py-3 rounded-tl-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showQuick && (
            <div className="px-6 pb-3">
              <p className="text-xs text-dark-500 mb-2">Quick Actions</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map(qa => (
                  <button key={qa.label} onClick={() => sendMessage(qa.msg)}
                    className="text-xs px-4 py-2 rounded-full glass-card text-dark-300 hover:text-slate-900 hover:border-brand-500/30 transition-all">
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 border-t border-cream-dark">
            <div className="flex items-center gap-2 rounded-2xl bg-surface-alt border border-cream-dark p-1.5 focus-within:border-brand-500/50 transition-all">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask anything about SmartBiz AI..."
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none" />
              <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-40">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Insights Sidebar */}
        <div className="w-72 border-l border-cream-dark p-5 hidden xl:block">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-brand-400" />
            <h3 className="text-sm font-semibold text-slate-900">AI Insights</h3>
          </div>
          <div className="space-y-3 mb-8">
            {insights.map((ins, i) => (
              <div key={i} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ins.icon className="w-4 h-4 text-brand-400" />
                  <span className="text-xs text-dark-400">{ins.label}</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{ins.value}</p>
                <p className="text-xs text-accent-400">{ins.change}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-brand-400" />
              <span className="text-xs text-dark-400">Today's Activity</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Conversations', value: '12' },
                { label: 'AI Responses', value: '48' },
                { label: 'Leads Captured', value: '8' },
                { label: 'Accuracy Rate', value: '96%' },
              ].map(d => (
                <div key={d.label} className="flex justify-between">
                  <span className="text-dark-400">{d.label}</span>
                  <span className="text-slate-900 font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
