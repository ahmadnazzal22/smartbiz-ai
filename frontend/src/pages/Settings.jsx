import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Building2, Save, Loader2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import { businessHoursApi } from '../utils/api'

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function toBackend(hours) {
  return hours.map(h => ({
    day_of_week: h.day,
    open_time: h.open,
    close_time: h.close,
    is_available: h.enabled,
  }))
}

function fromBackend(data) {
  if (!data || data.length === 0) return dayNames.map((_, i) => ({ day: i, enabled: true, open: '09:00', close: '17:00' }))
  return data.map(h => ({
    day: h.day_of_week,
    enabled: h.is_available,
    open: h.open_time,
    close: h.close_time,
  }))
}

function WorkHoursEditor({ hours, onChange }) {
  const toggleDay = (dayIdx) => {
    const updated = hours.map((h, i) => i === dayIdx ? { ...h, enabled: !h.enabled } : h)
    onChange(updated)
  }

  const updateTime = (dayIdx, field, value) => {
    const updated = hours.map((h, i) => i === dayIdx ? { ...h, [field]: value } : h)
    onChange(updated)
  }

  return (
    <div className="space-y-2">
      {dayNames.map((day, i) => {
        const h = hours[i] || { day: i, enabled: true, open: '09:00', close: '17:00' }
        const isToday = new Date().getDay() === (i + 1) % 7
        return (
          <div key={day} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${h.enabled ? 'bg-surface-alt' : 'bg-surface-alt/50'} ${isToday ? 'ring-1 ring-accent-500/20' : ''}`}>
            <button onClick={() => toggleDay(i)}
              className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold transition-all ${
                h.enabled ? 'text-white' : 'text-dark-500 border border-cream-dark'
              }`}
              style={h.enabled ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)' } : {}}>
              {h.enabled ? '✓' : ''}
            </button>
            <span className={`text-sm w-24 font-medium ${h.enabled ? 'text-slate-900' : 'text-dark-500'} ${isToday ? 'text-accent-400' : ''}`}>
              {day}
            </span>
            {h.enabled ? (
              <div className="flex items-center gap-2">
                <input type="time" value={h.open} onChange={e => updateTime(i, 'open', e.target.value)}
                  className="bg-white border border-cream-dark rounded-lg px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-brand-500/50 w-24" />
                <span className="text-dark-400">→</span>
                <input type="time" value={h.close} onChange={e => updateTime(i, 'close', e.target.value)}
                  className="bg-white border border-cream-dark rounded-lg px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-brand-500/50 w-24" />
              </div>
            ) : (
              <span className="text-xs text-dark-500">Closed</span>
            )}
            {isToday && <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400">Today</span>}
          </div>
        )
      })}
    </div>
  )
}

export default function Settings() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [hours, setHours] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    business_name: user?.business_name || '',
    whatsapp: user?.whatsapp || '',
    timezone: 'America/New_York',
  })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState('hours')

  useEffect(() => {
    (async () => {
      const res = await businessHoursApi.getAll()
      setHours(fromBackend(res.data))
      setLoading(false)
    })()
  }, [])

  const saveHours = async () => {
    setSaving(true)
    try {
      await businessHoursApi.update(toBackend(hours))
      showToast('Business hours saved', 'success')
    } catch {
      showToast('Failed to save hours', 'error')
    }
    setSaving(false)
  }

  const saveProfile = () => {
    localStorage.setItem('smartbiz_profile', JSON.stringify(profile))
    showToast('Profile saved', 'success')
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 p-4 sm:p-8 pb-20 lg:pb-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-dark-400 mt-1">Manage your business hours and profile</p>
          </motion.div>

          <div className="flex gap-1 p-1 rounded-xl bg-surface-alt border border-cream-dark w-fit">
            <button onClick={() => setTab('hours')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'hours' ? 'text-slate-900' : 'text-dark-400 hover:text-slate-900'}`}
              style={tab === 'hours' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.08))' } : {}}>
              <Clock className="w-4 h-4" /> Business Hours
            </button>
            <button onClick={() => setTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'profile' ? 'text-slate-900' : 'text-dark-400 hover:text-slate-900'}`}
              style={tab === 'profile' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.08))' } : {}}>
              <Building2 className="w-4 h-4" /> Company Profile
            </button>
          </div>

          {tab === 'hours' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-deep p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Business Hours</h2>
                  <p className="text-sm text-dark-400">Set your weekly availability for bookings</p>
                </div>
                <button onClick={saveHours} disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                  <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Hours'}
                </button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
                </div>
              ) : (
                <WorkHoursEditor hours={hours} onChange={setHours} />
              )}
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-deep p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Company Profile</h2>
                <button onClick={saveProfile}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Business Name</label>
                  <input value={profile.business_name} onChange={e => setProfile({ ...profile, business_name: e.target.value })}
                    className="w-full bg-surface-alt border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">WhatsApp Number</label>
                  <input value={profile.whatsapp} onChange={e => setProfile({ ...profile, whatsapp: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-surface-alt border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-brand-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Timezone</label>
                  <select value={profile.timezone} onChange={e => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full bg-surface-alt border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500/50">
                    <option value="America/New_York">Eastern (EST/EDT)</option>
                    <option value="America/Chicago">Central (CST/CDT)</option>
                    <option value="America/Denver">Mountain (MST/MDT)</option>
                    <option value="America/Los_Angeles">Pacific (PST/PDT)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Riyadh">Riyadh (AST)</option>
                  </select>
                </div>
              </div>
              {profile.business_name && (
                <div className="p-4 rounded-xl bg-surface-alt border border-cream-dark">
                  <p className="text-xs text-dark-400 mb-2">Preview — Booking Page</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                      {profile.business_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{profile.business_name}</p>
                      <p className="text-xs text-dark-400">{profile.whatsapp || 'No WhatsApp number'}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
