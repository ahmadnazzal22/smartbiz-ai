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
import { StatsSkeleton, TableSkeleton } from '../components/Skeleton'

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
  { name: 'AI WhatsApp', value: 45, color: '#7C3AED' },
  { name: 'Smart Booking', value: 30, color: '#F59E0B' },
  { name: 'Lead Mgmt', value: 15, color: '#9B6AFF' },
  { name: 'Full Suite', value: 10, color: '#D97706' },
]

const recentActivity = [
  { action: 'Hot Lead Captured', detail: 'Sarah Johnson — Interested in Pro plan', time: '2 min ago', icon: Users, color: 'text-red-400' },
  { action: 'Appointment Booked', detail: 'Mike Chen — Consultation at 2:30 PM', time: '15 min ago', icon: Calendar, color: 'text-accent-500' },
  { action: 'AI Conversation', detail: 'Customer asked about pricing → Auto-responded', time: '1 hour ago', icon: Bot, color: 'text-brand-500' },
  { action: 'New Review', detail: 'Emily Watson rated 5 stars', time: '2 hours ago', icon: Star, color: 'text-accent-400' },
  { action: 'Lead Qualified', detail: 'Robert Kim moved to Hot', time: '3 hours ago', icon: Target, color: 'text-green-400' },
]

const aiInsights = [
  { icon: Clock, title: 'Peak Hours', desc: 'Most bookings occur between 10AM-2PM', color: 'from-brand-500 to-accent-500' },
  { icon: Target, title: 'Top Service', desc: 'AI WhatsApp Bot — 45% of all requests', color: 'from-accent-400 to-accent-600' },
  { icon: TrendingUp, title: 'Best Source', desc: 'WhatsApp leads convert 3x better than web', color: 'from-brand-400 to-accent-400' },
]


export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [showReport, setShowReport] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  const [showReportBanner, setShowReportBanner] = useState(true)
  const [aiReport, setAiReport] = useState(null)

  function buildReportText() {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const s = aiReport?.summary || `${stats?.total_leads || 0} total leads, ${stats?.today_bookings || 0} bookings today`
    const recs = aiReport?.recommendations || []
    const hots = aiReport?.hot_leads || []
    return `SmartBiz AI — Daily Report (${date})\n\n${s}\n\nRecommendations:\n${recs.map(r => `  ${r.time} — ${r.task}: ${r.description}`).join('\n')}\n\nHot Leads:\n${hots.map(l => `  ${l.name} (${l.score}): ${l.note}`).join('\n')}\n\n— SmartBiz AI`
  }

  function handleSendEmail() {
    window.open(`mailto:?subject=SmartBiz AI Daily Report&body=${encodeURIComponent(buildReportText())}`)
    setReportSent(true); setTimeout(() => setReportSent(false), 2000)
  }

  function handleSendWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(buildReportText())}`, '_blank')
    setReportSent(true); setTimeout(() => setReportSent(false), 2000)
  }

  function handleDownloadPDF() {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const m = aiReport?.key_metrics || []
    const recs = aiReport?.recommendations || []
    const hots = aiReport?.hot_leads || []
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>SmartBiz AI Report</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#FDF0E0;color:#1e293b;padding:40px}
      h1{font-size:28px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#F59E0B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
      .date{color:#78716c;font-size:14px;margin-bottom:24px}
      .summary{background:#fff;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #E0D7E6;line-height:1.6}
      .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:24px}
      .card{background:#fff;border-radius:12px;padding:16px;border:1px solid #E0D7E6}
      .card .lbl{font-size:12px;color:#78716c;text-transform:uppercase;letter-spacing:0.5px}
      .card .val{font-size:22px;font-weight:700;margin-top:4px}
      .card .chg{font-size:13px;font-weight:500}
      h2{font-size:16px;font-weight:700;margin:20px 0 12px;color:#7C3AED}
      .rec,.hot{background:#fff;border-radius:12px;padding:14px 16px;margin-bottom:8px;border:1px solid #E0D7E6;display:flex;justify-content:space-between;align-items:center}
      .rec .time{color:#F59E0B;font-weight:600;font-size:13px}
      .hot .score{color:#DC2626;font-weight:600;font-size:13px}
      .footer{margin-top:32px;color:#78716c;font-size:13px;text-align:center;border-top:1px solid #E0D7E6;padding-top:16px}
    </style></head><body>
      <h1>SmartBiz AI</h1>
      <div class="date">Daily Report — ${date}</div>
      <div class="summary">${aiReport?.summary || 'Your daily business performance overview.'}</div>
      <div class="grid">${m.map(c => `<div class="card"><div class="lbl">${c.label}</div><div class="val">${c.value}</div><div class="chg" style="color:${parseInt(c.change) >= 0 ? '#16a34a' : '#dc2626'}">${c.change}% vs last week</div></div>`).join('')}</div>
      ${recs.length ? `<h2>Recommendations</h2>${recs.map(r => `<div class="rec"><div><strong>${r.task}</strong><br><span style="color:#78716c;font-size:13px">${r.description}</span></div><div class="time">${r.time}</div></div>`).join('')}` : ''}
      ${hots.length ? `<h2>Hot Leads</h2>${hots.map(l => `<div class="hot"><div><strong>${l.name}</strong><br><span style="color:#78716c;font-size:13px">${l.note}</span></div><div class="score">Score: ${l.score}</div></div>`).join('')}` : ''}
      <div class="footer">Generated by SmartBiz AI — smartbiz-ai.com</div>
    </body></html>`
    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    w.focus()
    setTimeout(() => w.print(), 500)
  }

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    const fetchStats = async () => {
      try { const res = await statsApi.get(); setStats(res.data) } catch {}
      setLoading(false)
    }
    fetchStats()
    aiApi.report().then(res => setAiReport(res.data))
  }, [])

  const statCards = [
    { label: 'Total Leads', value: stats?.total_leads ?? 128, icon: Users, change: '+12.5%', color: 'from-brand-500 to-brand-700', suffix: '' },
    { label: 'Total Bookings', value: stats?.total_bookings ?? 45, icon: Calendar, change: '+8.2%', color: 'from-accent-400 to-accent-600', suffix: '' },
    { label: 'Active Customers', value: 89, icon: Activity, change: '+15.3%', color: 'from-brand-400 to-accent-500', suffix: '' },
    { label: 'Conversion Rate', value: '75', icon: TrendingUp, change: '+5.1%', color: 'from-accent-500 to-accent-700', suffix: '%' },
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
          {loading ? (
            <div className="pt-8">
              <div className="skeleton h-8 w-56 mb-4" />
              <StatsSkeleton />
              <div className="mt-8"><TableSkeleton rows={4} /></div>
            </div>
          ) : (
          <>
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-brand-700 transition-all bg-brand-50 border border-brand-200 hover:bg-brand-100">
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
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(245,158,11,0.06))', border: '1px solid rgba(124,58,237,0.15)' }}>
                <button onClick={() => setShowReportBanner(false)} className="absolute top-3 right-3 text-dark-400 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-brand-500 to-accent-500">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-slate-900">AI Daily Report</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-50 text-accent-600 border border-accent-200">Delivered 8:00 AM</span>
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
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white shrink-0 transition-all hover:shadow-lg btn-premium">
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
                  className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-6 bg-white shadow-2xl"
                  style={{ border: '1px solid rgba(79,70,229,0.15)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-500 to-accent-500">
                    <Sparkles className="w-5 h-5 text-white" />
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
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-alt">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white btn-premium">{i + 1}</div>
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
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-alt">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ background: 'linear-gradient(135deg, #DC2626, #EA580C)' }}>{l.name.split(' ').map(n => n[0]).join('')}</div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-900">{l.name}</p>
                              <p className="text-xs text-dark-400">{l.score && `Score: ${l.score}`}</p>
                              <p className="text-xs text-red-300 mt-0.5">{l.note}</p>
                            </div>
                            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-red-50 text-red-600 border border-red-200">
                              Score: {l.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={handleSendEmail}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white btn-premium">
                      {reportSent ? <CheckCircle2 className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                      {reportSent ? 'Sent to Email' : 'Send to Email'}
                    </button>
                    <button onClick={handleSendWhatsApp}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white btn-premium">
                      <Smartphone className="w-4 h-4" /> Send to WhatsApp
                    </button>
                    <button onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white btn-premium">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Today's Summary Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card-deep p-6 bg-gradient-to-r from-brand-500/10 via-transparent to-accent-400/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-brand-500" />
                <div>
                  <p className="text-sm text-dark-400">Today's Summary</p>
                  <p className="text-2xl font-bold text-slate-900">8 bookings · 12 new leads · 75% conversion</p>
                </div>
              </div>
              <span className="px-4 py-2 rounded-full bg-accent-50 border border-accent-200 text-sm text-accent-600">
                ↑ 23% vs yesterday
              </span>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div id="stat-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="glass-card p-6 group hover:bg-surface-alt">
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
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500" /> Messages</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-400" /> Bookings</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-300" /> Leads</span>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0D7E6" />
                    <XAxis dataKey="name" stroke="#7A6B8A" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#7A6B8A" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '12px', color: '#1A1225', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="messages" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bookings" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="leads" fill="#9B6AFF" radius={[4, 4, 0, 0]} />
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
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '12px', color: '#1A1225', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
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
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-alt transition-colors group">
                    <div className={`w-10 h-10 rounded-xl bg-surface-alt flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
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
                <Brain className="w-5 h-5 text-brand-500" />
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="glass-card p-4">
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
              <div className="mt-6 pt-6 border-t border-cream-dark">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-400' },
                    { label: 'Response Time', value: '1.2s', icon: Clock, color: 'text-brand-500' },
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
          </>
          )}
        </div>
        <GuidedTour />
      </main>
    </div>
    </>
  )
}
