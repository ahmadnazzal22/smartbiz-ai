import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, Calendar, MessageSquare, Bot, TrendingUp, ArrowUpRight, Star, Activity, Target, Brain, Clock, Mail, Smartphone, Download, X, CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import NotificationCenter from '../components/NotificationCenter'
import SEO from '../components/SEO'
import GuidedTour from '../components/GuidedTour'
import { statsApi, aiApi } from '../utils/api'

const weeklyData = [
  { name: 'Mon', messages: 45, bookings: 5, leads: 12 },
  { name: 'Tue', messages: 52, bookings: 8, leads: 18 },
  { name: 'Wed', messages: 38, bookings: 4, leads: 9 },
  { name: 'Thu', messages: 65, bookings: 9, leads: 22 },
  { name: 'Fri', messages: 58, bookings: 7, leads: 15 },
  { name: 'Sat', messages: 30, bookings: 3, leads: 6 },
  { name: 'Sun', messages: 25, bookings: 2, leads: 4 },
]

const serviceData = [
  { name: 'AI WhatsApp', value: 45, color: '#6366f1' },
  { name: 'Smart Booking', value: 30, color: '#14b8a6' },
  { name: 'Lead Mgmt', value: 15, color: '#8b5cf6' },
  { name: 'Full Suite', value: 10, color: '#f59e0b' },
]

const recentActivity = [
  { action: 'Hot Lead Captured', detail: 'Sarah Johnson — Interested in Pro plan', time: '2 min ago', icon: Users, color: 'text-red-400' },
  { action: 'Appointment Booked', detail: 'Mike Chen — Consultation at 2:30 PM', time: '15 min ago', icon: Calendar, color: 'text-accent-400' },
  { action: 'AI Conversation', detail: 'Customer asked about pricing → Auto-responded', time: '1 hour ago', icon: Bot, color: 'text-primary-400' },
  { action: 'New Review', detail: 'Emily Watson rated 5 stars', time: '2 hours ago', icon: Star, color: 'text-yellow-400' },
  { action: 'Lead Qualified', detail: 'Robert Kim moved to Hot', time: '3 hours ago', icon: Target, color: 'text-green-400' },
]

const aiInsights = [
  { icon: Clock, title: 'Peak Hours', desc: 'Most bookings occur between 10AM-2PM', color: 'from-blue-500 to-cyan-500' },
  { icon: Target, title: 'Top Service', desc: 'AI WhatsApp Bot — 45% of all requests', color: 'from-primary-500 to-purple-500' },
  { icon: TrendingUp, title: 'Best Source', desc: 'WhatsApp leads convert 3x better than web', color: 'from-accent-500 to-emerald-500' },
]


export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [greeting, setGreeting] = useState('')
  const [showReport, setShowReport] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  const [showReportBanner, setShowReportBanner] = useState(true)
  const [aiReport, setAiReport] = useState(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    const fetchStats = async () => {
      try { const res = await statsApi.get(); setStats(res.data) } catch {}
    }
    fetchStats()
    aiApi.report().then(res => setAiReport(res.data))
  }, [])

  const statCards = [
    { label: 'Total Leads', value: stats?.total_leads ?? 128, icon: Users, change: '+12.5%', color: 'from-primary-500 to-purple-500', suffix: '' },
    { label: 'Total Bookings', value: stats?.total_bookings ?? 45, icon: Calendar, change: '+8.2%', color: 'from-accent-500 to-emerald-500', suffix: '' },
    { label: 'Active Customers', value: 89, icon: Activity, change: '+15.3%', color: 'from-blue-500 to-cyan-500', suffix: '' },
    { label: 'Conversion Rate', value: '75', icon: TrendingUp, change: '+5.1%', color: 'from-orange-500 to-red-500', suffix: '%' },
  ]

  return (
    <>
      <SEO title="Dashboard"
        description="SmartBiz AI business dashboard — manage leads, bookings, messages, and AI conversations in one place."
        url="/dashboard" />
      <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 p-4 sm:p-8 pb-20 lg:pb-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{greeting} 👋</h1>
              <p className="text-dark-400 mt-1">Here's your business overview for today.</p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationCenter />
              <button onClick={() => setShowReport(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-900 transition-all"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(20,184,166,0.1))', border: '1px solid rgba(124,58,237,0.2)' }}>
                <Sparkles className="w-4 h-4 text-brand-400" />
                AI Report
              </button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-dark-300">All Systems Active</span>
              </div>
            </div>
          </motion.div>

          {/* Daily AI Report Banner */}
          <AnimatePresence>
            {showReportBanner && (
              <motion.div id="ai-report-banner" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
                className="relative overflow-hidden rounded-2xl p-5"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(20,184,166,0.06))', border: '1px solid rgba(124,58,237,0.15)' }}>
                <button onClick={() => setShowReportBanner(false)} className="absolute top-3 right-3 text-dark-400 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                    <Sparkles className="w-6 h-6 text-slate-900" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-slate-900">AI Daily Report</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/20">Delivered 8:00 AM</span>
                    </div>
                    <p className="text-sm text-dark-300">Good morning! Here's your business snapshot for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {(aiReport?.key_metrics || [
                        { label: 'New Leads', value: '12', change: '+23%' },
                        { label: 'Today Bookings', value: '3', change: '+8%' },
                        { label: 'Hot Leads', value: '3', change: '+12%' },
                      ]).slice(0, 3).map(item => (
                        <div key={item.label} className="flex items-center gap-1.5 text-sm">
                          <span className="font-bold text-green-400">{item.value}</span>
                          <span className="text-dark-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/ai-report"
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-900 shrink-0 transition-all hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                    View Full Report
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Report Modal */}
          <AnimatePresence>
            {showReport && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}
                onClick={() => setShowReport(false)}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-6"
                  style={{ background: '#0a0a12', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                        <Sparkles className="w-5 h-5 text-slate-900" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">AI Daily Report</h2>
                        <p className="text-xs text-dark-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowReport(false)} className="text-dark-400 hover:text-slate-900">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl text-sm text-dark-200 leading-relaxed"
                    style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.1)' }}>
                    <Bot className="w-4 h-4 text-brand-400 inline mr-2" />
                    {aiReport?.summary || 'Your business is performing well today. Lead generation is up 23% compared to yesterday.'}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-bold text-slate-900">{stats?.total_leads ?? 128}</p>
                      <p className="text-xs text-dark-400 mt-1">Total Customers</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-bold text-accent-400">{stats?.today_bookings ?? 3}</p>
                      <p className="text-xs text-dark-400 mt-1">Today Bookings</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-bold text-red-400">{aiReport?.hot_leads?.length ?? 3}</p>
                      <p className="text-xs text-dark-400 mt-1">Hot Leads</p>
                    </div>
                  </div>

                  {aiReport?.recommendations && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-400" /> Today's Recommendations
                      </h3>
                      <div className="space-y-2">
                        {aiReport.recommendations.map((r, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F0F4FF]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                              style={{ background: 'linear-gradient(135deg, #7c3aed, #14b8a6)' }}>{i + 1}</div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-900">{r.task}</p>
                              <p className="text-xs text-dark-400">{r.description}</p>
                            </div>
                            <span className="text-sm text-accent-400 font-medium">{r.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {aiReport?.hot_leads && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" /> Hot Leads — Needs Follow-up
                      </h3>
                      <div className="space-y-2">
                        {aiReport.hot_leads.map((l, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F0F4FF]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                              style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>{l.name.split(' ').map(n => n[0]).join('')}</div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-900">{l.name}</p>
                              <p className="text-xs text-dark-400">{l.score && `Score: ${l.score}`}</p>
                              <p className="text-xs text-red-300 mt-0.5">{l.note}</p>
                            </div>
                            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                              Score: {l.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={() => { setReportSent(true); setTimeout(() => setReportSent(false), 2000) }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-900 transition-all"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                      {reportSent ? <CheckCircle2 className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                      {reportSent ? 'Sent to Email' : 'Send to Email'}
                    </button>
                    <button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-900 transition-all"
                      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                      <Smartphone className="w-4 h-4" /> Send to WhatsApp
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-dark-300 glass-card">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Today's Summary Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card-deep p-6 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-primary-400" />
                <div>
                  <p className="text-sm text-dark-400">Today's Summary</p>
                  <p className="text-2xl font-bold text-slate-900">8 bookings · 12 new leads · 75% conversion</p>
                </div>
              </div>
              <span className="px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-sm text-accent-400">
                ↑ 23% vs yesterday
              </span>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div id="stat-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="glass-card p-6 group hover:bg-[#F0F4FF]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-full h-full text-slate-900" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-sm text-dark-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div id="activity-chart" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Weekly Activity</h3>
                <div className="flex items-center gap-3 text-xs text-dark-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-500" /> Messages</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-500" /> Bookings</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Leads</span>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc' }} />
                    <Bar dataKey="messages" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bookings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="leads" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Service Distribution</h3>
                <span className="text-xs text-dark-400">Most requested: AI WhatsApp Bot</span>
              </div>
              <div className="h-72 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={serviceData} cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                      paddingAngle={3} dataKey="value">
                      {serviceData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {serviceData.map(s => (
                    <div key={s.name} className="flex items-center gap-2 text-sm">
                      <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                      <span className="text-dark-300">{s.name}</span>
                      <span className="text-slate-900 font-medium ml-auto">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Activity Center</h3>
                <Activity className="w-5 h-5 text-dark-400" />
              </div>
              <div className="space-y-1">
                {recentActivity.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.05 }}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#F0F4FF] transition-colors group">
                    <div className={`w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{item.action}</p>
                      <p className="text-xs text-dark-400 mt-0.5">{item.detail}</p>
                    </div>
                    <span className="text-xs text-dark-500 shrink-0">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">AI Insights</h3>
                <Brain className="w-5 h-5 text-primary-400" />
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="glass-card p-4 border-[#DBEAFE]">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${insight.color} p-2.5 shrink-0`}>
                        <insight.icon className="w-full h-full text-slate-900" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{insight.title}</p>
                        <p className="text-xs text-dark-400 mt-1">{insight.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#DBEAFE]">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-400' },
                    { label: 'Response Time', value: '1.2s', icon: Clock, color: 'text-primary-400' },
                  ].map(q => (
                    <div key={q.label} className="text-center">
                      <q.icon className={`w-5 h-5 ${q.color} mx-auto mb-1`} />
                      <p className="text-xl font-bold text-slate-900">{q.value}</p>
                      <p className="text-xs text-dark-400">{q.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <GuidedTour />
      </main>
    </div>
    </>
  )
}
