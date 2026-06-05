import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, User, Phone, Mail, Tag, Star, Flame, Thermometer, Snowflake, ArrowUpRight, MessageCircle, Calendar } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const leadsData = [
  { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', email: 'sarah@email.com', source: 'whatsapp', status: 'hot', score: 92, notes: 'Interested in Pro plan — ready to buy', lastContact: '2 min ago', avatar: 'SJ', msgs: 12 },
  { id: 2, name: 'Mike Chen', phone: '+1 (555) 234-5678', email: 'mike@email.com', source: 'whatsapp', status: 'warm', score: 68, notes: 'Asked about pricing, wants demo', lastContact: '15 min ago', avatar: 'MC', msgs: 8 },
  { id: 3, name: 'Emily Watson', phone: '+1 (555) 345-6789', email: 'emily@email.com', source: 'web', status: 'warm', score: 72, notes: 'Booked consultation — qualified lead', lastContact: '1 hour ago', avatar: 'EW', msgs: 6 },
  { id: 4, name: 'John Doe', phone: '+1 (555) 456-7890', email: 'john@email.com', source: 'whatsapp', status: 'cold', score: 25, notes: 'Initial inquiry, needs nurturing', lastContact: '3 hours ago', avatar: 'JD', msgs: 3 },
  { id: 5, name: 'Lisa Park', phone: '+1 (555) 567-8901', email: 'lisa@email.com', source: 'web', status: 'cold', score: 18, notes: 'Visited website, no response yet', lastContact: '1 day ago', avatar: 'LP', msgs: 1 },
  { id: 6, name: 'Robert Kim', phone: '+1 (555) 678-9012', email: 'robert@email.com', source: 'whatsapp', status: 'hot', score: 95, notes: 'Ready to purchase — sent proposal', lastContact: '5 min ago', avatar: 'RK', msgs: 15 },
]

const statusConfig = {
  hot: { label: 'Hot 🔥', color: 'badge-hot', icon: Flame, score: '75-100' },
  warm: { label: 'Warm 🟡', color: 'badge-warm', icon: Thermometer, score: '40-74' },
  cold: { label: 'Cold ⚪', color: 'badge-cold', icon: Snowflake, score: '0-39' },
}

const pipelineStages = ['cold', 'warm', 'hot']

export default function Leads() {
  const [leads, setLeads] = useState(leadsData)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeLead, setActiveLead] = useState(null)

  const filtered = leads
    .filter(l => statusFilter === 'all' || l.status === statusFilter)
    .filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search))

  const moveToNextStage = (id) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== id) return l
      const idx = pipelineStages.indexOf(l.status)
      const next = pipelineStages[Math.min(idx + 1, 2)]
      return { ...l, status: next, score: next === 'hot' ? 85 + Math.floor(Math.random() * 15) : next === 'warm' ? 50 + Math.floor(Math.random() * 24) : 10 + Math.floor(Math.random() * 29) }
    }))
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 p-4 sm:p-8 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Lead Pipeline</h1>
              <p className="text-dark-400 mt-1">Score, qualify, and convert your leads.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-dark-400 outline-none focus:border-primary-500/50 w-56" placeholder="Search leads..." />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50">
                <option value="all">All Status</option>
                <option value="hot">Hot 🔥</option>
                <option value="warm">Warm 🟡</option>
                <option value="cold">Cold ⚪</option>
              </select>
            </div>
          </motion.div>

          {/* Pipeline Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4">
            {pipelineStages.map(stage => {
              const count = leads.filter(l => l.status === stage).length
              const config = statusConfig[stage]
              const Icon = config.icon
              return (
                <div key={stage} className={`glass-card p-5 ${stage === 'hot' ? 'ring-1 ring-red-500/20' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${stage === 'hot' ? 'text-red-400' : stage === 'warm' ? 'text-yellow-400' : 'text-dark-400'}`} />
                    <span className="text-sm font-medium text-white">{config.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{count}</p>
                  <p className="text-xs text-dark-400 mt-1">Score range: {config.score}</p>
                </div>
              )
            })}
          </motion.div>

          {/* Lead Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((lead, i) => {
              const config = statusConfig[lead.status]
              const Icon = config.icon
              return (
                <motion.div key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 group cursor-pointer hover:bg-white/[0.04]"
                  onClick={() => setActiveLead(activeLead === lead.id ? null : lead.id)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white">
                        {lead.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{lead.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1 ${config.color}`}>
                          <Icon className="w-3 h-3" /> {config.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{lead.score}</div>
                      <div className="text-[10px] text-dark-500">Score</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-3 text-xs text-dark-400">
                    <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{lead.phone}</div>
                    <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{lead.email}</div>
                    <div className="flex items-center gap-2"><MessageCircle className="w-3 h-3" />{lead.msgs} messages</div>
                  </div>

                  {lead.notes && (
                    <p className="text-xs text-dark-400 bg-white/[0.03] rounded-lg p-3 mb-3">{lead.notes}</p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-dark-500">{lead.lastContact}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); moveToNextStage(lead.id) }}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-all">
                        Promote
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-full bg-accent-500/10 text-accent-400 hover:bg-accent-500/20 transition-all">
                        Contact
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <User className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400">No leads found matching your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
