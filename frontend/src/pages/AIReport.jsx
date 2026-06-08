import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Sparkles, TrendingUp, TrendingDown, Users, Calendar, MessageSquare, AlertTriangle, Bot, Target, Clock, Mail, Smartphone, Download, CheckCircle2, ArrowRight, Star, Activity, RefreshCw } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { aiApi } from '../utils/api'

const weekData = [
  { day: 'Mon', leads: 12, bookings: 5, msgs: 45 },
  { day: 'Tue', leads: 18, bookings: 8, msgs: 52 },
  { day: 'Wed', leads: 9, bookings: 4, msgs: 38 },
  { day: 'Thu', leads: 22, bookings: 9, msgs: 65 },
  { day: 'Fri', leads: 15, bookings: 7, msgs: 58 },
  { day: 'Sat', leads: 6, bookings: 3, msgs: 30 },
  { day: 'Sun', leads: 4, bookings: 2, msgs: 25 },
]

const prevWeekData = [
  { day: 'Mon', leads: 10, bookings: 4, msgs: 38 },
  { day: 'Tue', leads: 14, bookings: 6, msgs: 44 },
  { day: 'Wed', leads: 8, bookings: 3, msgs: 32 },
  { day: 'Thu', leads: 18, bookings: 7, msgs: 52 },
  { day: 'Fri', leads: 12, bookings: 5, msgs: 48 },
  { day: 'Sat', leads: 5, bookings: 2, msgs: 25 },
  { day: 'Sun', leads: 3, bookings: 1, msgs: 20 },
]

function calcChange(current, prev) {
  const currTotal = current.reduce((s, d) => s + d, 0)
  const prevTotal = prev.reduce((s, d) => s + d, 0)
  if (prevTotal === 0) return 100
  return Math.round(((currTotal - prevTotal) / prevTotal) * 100)
}

export default function AIReport() {
  const [sentTo, setSentTo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState(null)

  useEffect(() => {
    loadReport()
  }, [])

  async function loadReport() {
    setLoading(true)
    const res = await aiApi.report()
    setReport(res.data)
    setLoading(false)
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  const currLeads = weekData.map(d => d.leads)
  const prevLeads = prevWeekData.map(d => d.leads)
  const currBookings = weekData.map(d => d.bookings)
  const prevBookings = prevWeekData.map(d => d.bookings)
  const currMsgs = weekData.map(d => d.msgs)
  const prevMsgs = prevWeekData.map(d => d.msgs)

  const summaryCards = useMemo(() => report ? report.key_metrics.map(m => ({
    label: m.label,
    value: m.value,
    change: parseInt(m.change),
    icon: m.label === 'New Leads' ? Users : m.label === 'Bookings' ? Calendar : m.label === 'Messages' ? MessageSquare : TrendingUp,
    color: m.label === 'New Leads' ? 'text-brand-400' : m.label === 'Bookings' ? 'text-accent-400' : m.label === 'Messages' ? 'text-blue-400' : 'text-green-400',
    bg: m.label === 'New Leads' ? 'rgba(124,58,237,0.1)' : m.label === 'Bookings' ? 'rgba(20,184,166,0.1)' : m.label === 'Messages' ? 'rgba(99,102,241,0.1)' : 'rgba(34,197,94,0.1)',
  })) : [
    { label: 'New Leads', value: currLeads.reduce((s, v) => s + v, 0), change: calcChange(currLeads, prevLeads), icon: Users, color: 'text-brand-400', bg: 'rgba(124,58,237,0.1)' },
    { label: 'Bookings', value: currBookings.reduce((s, v) => s + v, 0), change: calcChange(currBookings, prevBookings), icon: Calendar, color: 'text-accent-400', bg: 'rgba(20,184,166,0.1)' },
    { label: 'Messages', value: currMsgs.reduce((s, v) => s + v, 0), change: calcChange(currMsgs, prevMsgs), icon: MessageSquare, color: 'text-blue-400', bg: 'rgba(99,102,241,0.1)' },
    { label: 'Conversion', value: '24.6%', change: 8, icon: TrendingUp, color: 'text-green-400', bg: 'rgba(34,197,94,0.1)' },
  ], [report])

  const hotLeads = report ? report.hot_leads : [
    { name: 'Robert Kim', phone: '+1 (555) 678-9012', score: 95, service: 'Pro Plan', note: 'Ready to sign — send proposal now', status: 'hot' },
    { name: 'Lisa Park', phone: '+1 (555) 567-8901', score: 88, service: 'Consultation', note: 'High intent — offer demo today', status: 'hot' },
    { name: 'Sarah Johnson', phone: '+1 (555) 123-4567', score: 82, service: 'Growth Plan', note: 'Interested — follow up with pricing', status: 'warm' },
    { name: 'Mike Chen', phone: '+1 (555) 234-5678', score: 71, service: 'Demo', note: 'Asked about features — send case study', status: 'warm' },
  ]

  const recommendations = report ? report.recommendations : [
    { time: '9:00 AM', task: 'Contact Robert Kim', description: 'Send proposal & schedule closing call' },
    { time: '11:00 AM', task: 'Demo with Lisa Park', description: 'Product demo — focus on Growth plan features' },
    { time: '2:00 PM', task: 'Follow up with Sarah', description: 'Send pricing comparison & case study' },
  ]

  const handleShare = (method) => {
    setSentTo(method)
    setTimeout(() => setSentTo(null), 2500)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 p-4 sm:p-8 pb-20 lg:pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-white">AI Daily Report</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-brand-500/15 text-brand-300 border border-brand-500/20">
                  {today}
                </span>
              </div>
              <p className="text-dark-400">{greeting}! Here's your complete business performance overview.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={loadReport} disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-dark-300 bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link to="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-dark-300 bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Dashboard
              </Link>
            </div>
          </motion.div>

          {report && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="relative overflow-hidden rounded-2xl p-6"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(20,184,166,0.05))', border: '1px solid rgba(124,58,237,0.15)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">AI Executive Summary</h3>
                    {report.focus_area && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/20">
                        Focus: {report.focus_area}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-dark-300 leading-relaxed">{report.summary}</p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => {
              const Icon = card.icon
              const isUp = card.change >= 0
              return (
                <div key={i} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(card.change)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                  <p className="text-xs text-dark-400 mt-0.5">{card.label}</p>
                </div>
              )
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white">Weekly Performance</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#7c3aed' }} /> Leads</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#14b8a6' }} /> Bookings</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#6366f1' }} /> Messages</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekData} barSize={18} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.15)" tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: '#0a0a12', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="leads" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bookings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="msgs" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white">Week-over-Week Comparison</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-500" /> This Week</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-dark-500" /> Last Week</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekData.map((d, i) => ({ day: d.day, current: d.leads, previous: prevWeekData[i].leads }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.15)" tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: '#0a0a12', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="current" stroke="#7c3aed" fill="rgba(124,58,237,0.15)" strokeWidth={2} />
                    <Area type="monotone" dataKey="previous" stroke="#555" fill="rgba(255,255,255,0.03)" strokeWidth={2} strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="glass-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Hot Leads — Needs Immediate Follow-up
              </h3>
              <Link to="/leads"
                className="text-xs text-brand-400 hover:text-brand-300 transition-all flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {hotLeads.map((lead, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white ${
                    lead.status === 'hot' ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-yellow-500 to-amber-500'
                  }`}>
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      {lead.score && <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        lead.score >= 80 ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>{lead.score >= 80 ? 'HOT' : 'WARM'}</span>}
                    </div>
                    <p className="text-xs text-dark-400 truncate">{lead.note}</p>
                  </div>
                  {lead.score && (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{lead.score}</p>
                        <p className="text-[10px] text-dark-500">Score</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card p-6"
            style={{ borderColor: 'rgba(20,184,166,0.2)' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(124,58,237,0.1))' }}>
                <Bot className="w-6 h-6 text-accent-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">AI Daily Recommendation</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-500/15 text-accent-300 border border-accent-500/20">Priority</span>
                </div>
                <p className="text-sm text-dark-300 leading-relaxed mb-4">
                  Based on your lead activity and booking patterns, here's your recommended action plan for today:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendations.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-dark-500">{item.time}</span>
                        <span className={`text-[10px] font-medium ${i === 0 ? 'text-red-400' : i === 1 ? 'text-yellow-400' : 'text-accent-400'}`}>
                          {i === 0 ? 'High' : i === 1 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">{item.task}</p>
                      <p className="text-xs text-dark-400 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={() => handleShare('email')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:shadow-lg"
              style={{ background: sentTo === 'email' ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
              {sentTo === 'email' ? <CheckCircle2 className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              {sentTo === 'email' ? 'Sent!' : 'Send to Email'}
            </button>
            <button onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:shadow-lg"
              style={{ background: sentTo === 'whatsapp' ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'linear-gradient(135deg, #25D366, #128C7E)' }}>
              {sentTo === 'whatsapp' ? <CheckCircle2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              {sentTo === 'whatsapp' ? 'Sent!' : 'Send to WhatsApp'}
            </button>
            <button onClick={() => handleShare('pdf')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-dark-200 glass-card hover:bg-white/[0.08] transition-all">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
