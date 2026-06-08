import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Phone, Star, X, ChevronLeft, ChevronRight, LayoutGrid, List, CheckCircle2, AlertTriangle, Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const demoBookings = [
  { id: 1, customer_name: 'Sarah Johnson', customer_phone: '+1 (555) 123-4567', service: 'Consultation', date: '2025-01-20', time: '10:00', status: 'confirmed', notes: 'First time client', rating: 5, review: 'Excellent service!' },
  { id: 2, customer_name: 'Mike Chen', customer_phone: '+1 (555) 234-5678', service: 'Product Demo', date: '2025-01-21', time: '10:00', status: 'confirmed', notes: '', rating: null, review: null },
  { id: 3, customer_name: 'Emily Watson', customer_phone: '+1 (555) 345-6789', service: 'Consultation', date: '2025-01-19', time: '11:00', status: 'completed', notes: 'Interested in Pro plan', rating: 5, review: 'Very professional!' },
  { id: 4, customer_name: 'John Doe', customer_phone: '+1 (555) 456-7890', service: 'Support', date: '2025-01-18', time: '15:00', status: 'cancelled', notes: 'Rescheduled', rating: null, review: null },
  { id: 5, customer_name: 'Lisa Park', customer_phone: '+1 (555) 567-8901', service: 'Consultation', date: '2025-01-18', time: '09:00', status: 'completed', notes: '', rating: 4, review: 'Great experience.' },
]

const services = ['Consultation', 'Product Demo', 'Support', 'Meeting', 'Other']
const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']

const serviceColors = {
  Consultation: { bg: 'rgba(124,58,237,0.15)', dot: '#7c3aed', text: '#a78bfa' },
  'Product Demo': { bg: 'rgba(20,184,166,0.15)', dot: '#14b8a6', text: '#5eead4' },
  Support: { bg: 'rgba(99,102,241,0.15)', dot: '#6366f1', text: '#a5b4fc' },
  Meeting: { bg: 'rgba(234,179,8,0.15)', dot: '#eab308', text: '#fde047' },
  Other: { bg: 'rgba(136,136,136,0.15)', dot: '#888', text: '#aaa' },
}

const statusColors = {
  confirmed: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

const loadBookings = () => {
  try { const saved = localStorage.getItem('smartbiz_bookings'); if (saved) return JSON.parse(saved) } catch {}
  return demoBookings
}
const saveBookings = (data) => localStorage.setItem('smartbiz_bookings', JSON.stringify(data))

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return days
}

function getWeekDays(date) {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function findConflicts(bookings, date, time) {
  return bookings.filter(b => b.date === date && b.time === time && b.status !== 'cancelled')
}

export default function Bookings() {
  const [bookings, setBookings] = useState(loadBookings)
  useEffect(() => { saveBookings(bookings) }, [bookings])
  const [showForm, setShowForm] = useState(false)
  const [showFeedback, setShowFeedback] = useState(null)
  const [form, setForm] = useState({ customer_name: '', customer_phone: '', service: 'Consultation', date: '', time: '', notes: '' })
  const [feedbackForm, setFeedbackForm] = useState({ rating: 5, review: '' })
  const [view, setView] = useState('table')
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState(null)
  const [weekStart, setWeekStart] = useState(new Date())

  const handleCreate = (e) => {
    e.preventDefault()
    const conflicts = findConflicts(bookings, form.date, form.time)
    if (conflicts.length > 0 && !window.confirm(`⚠️ Conflict detected! ${conflicts[0].customer_name} already booked at ${form.time}. Create anyway?`)) return
    const newBooking = { id: Date.now(), ...form, status: 'confirmed', created_at: new Date().toISOString(), rating: null, review: null }
    setBookings(prev => [newBooking, ...prev]); setShowForm(false)
    setForm({ customer_name: '', customer_phone: '', service: 'Consultation', date: '', time: '', notes: '' })
  }
  const handleCancel = (id) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
  const handleComplete = (id) => { setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed' } : b)); setShowFeedback(id) }
  const handleFeedback = (id) => { setBookings(prev => prev.map(b => b.id === id ? { ...b, ...feedbackForm } : b)); setShowFeedback(null); setFeedbackForm({ rating: 5, review: '' }) }

  const quickBook = (date, time) => {
    setForm({ ...form, date, time })
    setShowForm(true)
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    avgRating: bookings.filter(b => b.rating).reduce((acc, b) => acc + b.rating, 0) / (bookings.filter(b => b.rating).length || 1) || 0,
  }

  const today = new Date().toISOString().split('T')[0]
  const todayNum = new Date().getDate()

  const calendarDays = getCalendarDays(calYear, calMonth)
  const bookingsByDate = {}
  bookings.forEach(b => {
    if (!bookingsByDate[b.date]) bookingsByDate[b.date] = []
    bookingsByDate[b.date].push(b)
  })

  const selectedDate = selectedDay ? `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}` : null
  const dayBookings = selectedDate ? (bookingsByDate[selectedDate] || []) : []

  const prevMonth = () => { if (calMonth === 0) { setCalYear(calYear - 1); setCalMonth(11) } else setCalMonth(calMonth - 1); setSelectedDay(null) }
  const nextMonth = () => { if (calMonth === 11) { setCalYear(calYear + 1); setCalMonth(0) } else setCalMonth(calMonth + 1); setSelectedDay(null) }

  const weekDays = getWeekDays(weekStart)
  const weekDateStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

  const statusBadge = (status) => {
    const colors = { confirmed: '#14b8a6', completed: '#3b82f6', cancelled: '#ef4444', pending: '#eab308' }
    return { bg: `${colors[status]}15`, color: colors[status], text: status }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="lg:ml-64 flex-1 p-4 sm:p-8 pb-20 lg:pb-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
              <p className="text-dark-400 mt-1">Manage appointments, schedules, and feedback.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F0F4FF] border border-[#DBEAFE]">
                <button onClick={() => setView('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'table' ? 'text-slate-900' : 'text-dark-400 hover:text-slate-900'}`}
                  style={view === 'table' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' } : {}}>
                  <List className="w-4 h-4" />
                </button>
                <button onClick={() => setView('month')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'month' ? 'text-slate-900' : 'text-dark-400 hover:text-slate-900'}`}
                  style={view === 'month' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' } : {}}>
                  <CalendarIcon className="w-4 h-4" />
                </button>
                <button onClick={() => setView('week')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'week' ? 'text-slate-900' : 'text-dark-400 hover:text-slate-900'}`}
                  style={view === 'week' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' } : {}}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              <button onClick={() => setShowForm(!showForm)}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-sm font-medium text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> New Booking
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total', value: stats.total, color: 'from-primary-500 to-purple-500' },
              { label: 'Confirmed', value: stats.confirmed, color: 'from-accent-500 to-emerald-500' },
              { label: 'Completed', value: stats.completed, color: 'from-blue-500 to-cyan-500' },
              { label: 'Cancelled', value: stats.cancelled, color: 'from-red-500 to-orange-500' },
              { label: 'Avg Rating', value: stats.avgRating.toFixed(1), color: 'from-yellow-500 to-amber-500', suffix: '⭐' },
            ].map(s => (
              <div key={s.label} className={`glass-card p-4 bg-gradient-to-br ${s.color}/5`}>
                <p className="text-2xl font-bold text-slate-900">{s.value}{s.suffix || ''}</p>
                <p className="text-xs text-dark-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Feedback Modal */}
          {showFeedback && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-card-deep p-6 border-primary-500/20">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Rate this booking ⭐</h3>
              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map(r => (
                  <button key={r} onClick={() => setFeedbackForm({ ...feedbackForm, rating: r })}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      r <= feedbackForm.rating ? 'bg-yellow-500/20 text-yellow-400 scale-110' : 'bg-[#F0F4FF] text-dark-500'
                    }`}>
                    <Star className={`w-5 h-5 ${r <= feedbackForm.rating ? 'fill-yellow-500' : ''}`} />
                  </button>
                ))}
              </div>
              <textarea value={feedbackForm.review} onChange={e => setFeedbackForm({ ...feedbackForm, review: e.target.value })}
                placeholder="Write a review..." rows={2}
                className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-dark-400 outline-none focus:border-primary-500/50 mb-4" />
              <div className="flex gap-3">
                <button onClick={() => handleFeedback(showFeedback)} className="px-5 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-sm text-white">Submit</button>
                <button onClick={() => setShowFeedback(null)} className="px-5 py-2 glass-card rounded-xl text-sm text-dark-300">Skip</button>
              </div>
            </motion.div>
          )}

          {/* Create Form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-deep p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Booking</h3>
              <form onSubmit={handleCreate} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div><label className="block text-xs text-dark-400 mb-1">Name</label>
                  <input type="text" value={form.customer_name} required onChange={e => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500/50" /></div>
                <div><label className="block text-xs text-dark-400 mb-1">Phone</label>
                  <input type="text" value={form.customer_phone} onChange={e => setForm({ ...form, customer_phone: e.target.value })}
                    className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500/50" /></div>
                <div><label className="block text-xs text-dark-400 mb-1">Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500/50">
                    {services.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className="block text-xs text-dark-400 mb-1">Date</label>
                  <input type="date" value={form.date} min={today} required onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500/50" /></div>
                <div><label className="block text-xs text-dark-400 mb-1">Time</label>
                  <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required
                    className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500/50">
                    <option value="">Select</option>
                    {timeSlots.map(s => <option key={s}>{s}</option>)}</select></div>
                <div className="md:col-span-3"><label className="block text-xs text-dark-400 mb-1">Notes</label>
                  <input type="text" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#F0F4FF] border border-[#DBEAFE] rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500/50" /></div>
                <div className="md:col-span-4 flex gap-3">
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-sm text-white">Create Booking</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 glass-card rounded-xl text-sm text-dark-300">Cancel</button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Monthly Calendar View */}
          {view === 'month' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={prevMonth} className="p-2 rounded-xl text-dark-400 hover:text-slate-900 hover:bg-[#F0F4FF] transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-slate-900">{monthNames[calMonth]} {calYear}</h3>
                  <button onClick={nextMonth} className="p-2 rounded-xl text-dark-400 hover:text-slate-900 hover:bg-[#F0F4FF] transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {dayNames.map(d => (
                    <div key={d} className="text-center text-xs text-dark-400 font-medium py-2">{d}</div>
                  ))}
                  {calendarDays.map((day, i) => {
                    const dateStr = day ? `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null
                    const dayBks = dateStr ? (bookingsByDate[dateStr] || []) : []
                    const isToday = day === todayNum && calMonth === new Date().getMonth() && calYear === new Date().getFullYear()
                    const isSelected = day === selectedDay
                    const conflictCount = dayBks.some(b => {
                      const others = dayBks.filter(o => o.id !== b.id && o.time === b.time && o.status !== 'cancelled')
                      return others.length > 0
                    })
                    return (
                      <button key={i} onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                        disabled={!day}
                        className={`relative aspect-square rounded-xl text-sm font-medium transition-all flex flex-col items-center justify-center ${
                          !day ? 'invisible' :
                          isSelected ? 'text-slate-900 scale-105 shadow-lg' :
                          isToday ? 'text-accent-400 border border-accent-500/30' :
                          'text-dark-300 hover:text-slate-900 hover:bg-[#F0F4FF]'
                        }`}
                        style={isSelected ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)' } : isToday ? { background: 'rgba(20,184,166,0.1)' } : {}}>
                        <span>{day}</span>
                        {dayBks.length > 0 && !isSelected && (
                          <div className="flex gap-0.5 mt-1">
                            {dayBks.slice(0, 4).map((b, j) => (
                              <div key={j} className="w-1.5 h-1.5 rounded-full"
                                style={{ background: (serviceColors[b.service] || serviceColors.Other).dot }} />
                            ))}
                            {dayBks.length > 4 && <span className="text-[8px] text-dark-400">+{dayBks.length - 4}</span>}
                          </div>
                        )}
                        {conflictCount && isSelected && (
                          <AlertTriangle className="w-3 h-3 text-red-400 absolute top-1 right-1" />
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#DBEAFE]">
                  <div className="flex items-center gap-4 text-xs text-dark-400">
                    {Object.entries(serviceColors).slice(0, 4).map(([svc, c]) => (
                      <span key={svc} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: c.dot }} /> {svc}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-dark-500">{bookings.length} total bookings</span>
                </div>
              </div>

              {/* Day Detail Sidebar */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {selectedDay ? `${monthNames[calMonth]} ${selectedDay}, ${calYear}` : 'Select a date'}
                </h3>
                {/* Time Slot Grid */}
                {selectedDay && (
                  <div className="space-y-1 mb-4">
                    <p className="text-xs text-dark-400 mb-2 font-medium">Time Slots</p>
                    <div className="grid grid-cols-3 gap-1">
                      {timeSlots.map(slot => {
                        const bks = dayBookings.filter(b => b.time === slot && b.status !== 'cancelled')
                        const conflict = bks.length > 1
                        return (
                          <button key={slot} onClick={() => quickBook(selectedDate, slot)}
                            className={`relative text-[10px] py-1.5 rounded-lg transition-all ${
                              bks.length === 0
                                ? 'text-dark-500 hover:text-dark-300 hover:bg-[#F0F4FF] border border-dashed border-[#DBEAFE]'
                                : conflict
                                ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                                : 'bg-[#F0F4FF] text-dark-200 border border-[#DBEAFE]'
                            }`}
                            title={bks.map(b => `${b.customer_name} — ${b.service} (${b.status})`).join('\n')}>
                            {slot}
                            {bks.length > 0 && (
                              <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${conflict ? 'bg-red-500' : 'bg-green-500'}`} />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                {dayBookings.length > 0 ? (
                  <div className="space-y-2">
                    {dayBookings.map(b => {
                      const sc = serviceColors[b.service] || serviceColors.Other
                      const badge = statusBadge(b.status)
                      return (
                        <div key={b.id} className="p-3 rounded-xl" style={{ background: sc.bg, borderColor: sc.dot + '30' }}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900"
                                style={{ background: `linear-gradient(135deg, ${sc.dot}, ${sc.dot}88)` }}>
                                {b.customer_name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm text-slate-900 font-medium">{b.customer_name}</span>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color }}>{badge.text}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs ml-9" style={{ color: sc.text }}>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.time}</span>
                            <span>{b.service}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1.5 ml-9">
                            {b.status === 'confirmed' && (
                              <>
                                <button onClick={() => handleComplete(b.id)} className="text-[10px] px-2 py-0.5 rounded-md text-accent-400 hover:bg-accent-500/10">Complete</button>
                                <button onClick={() => handleCancel(b.id)} className="text-[10px] px-2 py-0.5 rounded-md text-red-400 hover:bg-red-500/10">Cancel</button>
                              </>
                            )}
                            {b.status === 'completed' && !b.rating && (
                              <button onClick={() => setShowFeedback(b.id)} className="text-[10px] px-2 py-0.5 rounded-md text-yellow-400 hover:bg-yellow-500/10">Rate</button>
                            )}
                            {b.rating && (
                              <span className="flex items-center gap-1 text-xs text-yellow-400"><Star className="w-3 h-3 fill-yellow-500" />{b.rating}</span>
                            )}
                          </div>
                        </div>
                      )})}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-10 h-10 text-dark-600 mx-auto mb-3" />
                    <p className="text-sm text-dark-400">{selectedDay ? 'No bookings this day' : 'Click a date to see bookings'}</p>
                    {selectedDay && (
                      <button onClick={() => quickBook(selectedDate, '')}
                        className="mt-3 px-4 py-2 rounded-xl text-xs font-medium text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 transition-all flex items-center gap-1.5 mx-auto">
                        <Plus className="w-3 h-3" /> Add Booking
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Weekly View */}
          {view === 'week' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d) }}
                  className="p-2 rounded-xl text-dark-400 hover:text-slate-900 hover:bg-[#F0F4FF] transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <p className="text-xs text-dark-400">Week view — click a slot to book</p>
                </div>
                <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d) }}
                  className="p-2 rounded-xl text-dark-400 hover:text-slate-900 hover:bg-[#F0F4FF] transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header Row */}
                  <div className="grid grid-cols-[70px_repeat(7,1fr)] gap-px mb-px">
                    <div className="text-xs text-dark-500 p-2" />
                    {weekDays.map((d, i) => {
                      const isToday = d.toDateString() === new Date().toDateString()
                      return (
                        <div key={i} className={`text-center p-2 rounded-t-lg ${isToday ? 'bg-accent-500/10' : ''}`}>
                          <p className="text-xs text-dark-400">{dayNames[i]}</p>
                          <p className={`text-lg font-bold ${isToday ? 'text-accent-400' : 'text-slate-900'}`}>{d.getDate()}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Time Slots */}
                  {timeSlots.map(slot => (
                    <div key={slot} className="grid grid-cols-[70px_repeat(7,1fr)] gap-px">
                      <div className="text-[10px] text-dark-500 p-2 flex items-start justify-end pt-2.5">{slot}</div>
                      {weekDays.map((d, col) => {
                        const ds = weekDateStr(d)
                        const bks = bookingsByDate[ds]?.filter(b => b.time === slot && b.status !== 'cancelled') || []
                        const conflict = bks.length > 1
                        return (
                          <button key={col} onClick={() => quickBook(ds, slot)}
                            className={`relative min-h-[48px] rounded-lg transition-all ${
                              bks.length === 0
                                ? 'hover:bg-[#F0F4FF] border border-dashed border-transparent hover:border-[#DBEAFE]'
                                : conflict
                                ? 'bg-red-500/10 border border-red-500/20'
                                : 'bg-[#F0F4FF] border border-[#DBEAFE]'
                            }`}>
                            {bks.map(b => (
                              <div key={b.id} className="px-1.5 py-0.5 rounded text-[9px] leading-tight truncate"
                                style={{ background: (serviceColors[b.service] || serviceColors.Other).bg, color: (serviceColors[b.service] || serviceColors.Other).text }}>
                                {b.customer_name.split(' ')[0]}
                                {conflict && <span className="text-red-400 ml-1">⚠</span>}
                              </div>
                            ))}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#DBEAFE]">
                <div className="flex items-center gap-4 text-xs text-dark-400">
                  {Object.entries(serviceColors).map(([svc, c]) => (
                    <span key={svc} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: c.dot }} /> {svc}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-dark-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Booked</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Conflict</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Table View */}
          {view === 'table' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#DBEAFE]">
                      <th className="text-left px-6 py-4 text-xs font-medium text-dark-400 uppercase">Customer</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-dark-400 uppercase">Service</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-dark-400 uppercase">Date</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-dark-400 uppercase">Time</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-dark-400 uppercase">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-dark-400 uppercase">Rating</th>
                      <th className="text-right px-6 py-4 text-xs font-medium text-dark-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                        className="border-b border-[#DBEAFE] hover:bg-[#F0F4FF] transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-900">{b.customer_name}</p>
                          <p className="text-xs text-dark-400">{b.customer_phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ background: (serviceColors[b.service] || serviceColors.Other).dot }} />
                            {b.service}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-200">{b.date}</td>
                        <td className="px-6 py-4 text-sm text-dark-200">{b.time}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[b.status] || statusColors.pending}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {b.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm text-dark-200">{b.rating}</span>
                            </div>
                          ) : <span className="text-xs text-dark-500">—</span>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {b.status === 'confirmed' && (
                              <>
                                <button onClick={() => handleComplete(b.id)} className="text-xs text-accent-400 hover:text-accent-300">Complete</button>
                                <button onClick={() => handleCancel(b.id)} className="text-xs text-red-400 hover:text-red-300">Cancel</button>
                              </>
                            )}
                            {b.status === 'completed' && !b.rating && (
                              <button onClick={() => setShowFeedback(b.id)} className="text-xs text-yellow-400 hover:text-yellow-300">Rate</button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
