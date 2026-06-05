import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Phone, Star, X, ChevronLeft, ChevronRight, LayoutGrid, List, CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const demoBookings = [
  { id: 1, customer_name: 'Sarah Johnson', customer_phone: '+1 (555) 123-4567', service: 'Consultation', date: '2025-01-20', time: '10:00', status: 'confirmed', notes: 'First time client', rating: 5, review: 'Excellent service!' },
  { id: 2, customer_name: 'Mike Chen', customer_phone: '+1 (555) 234-5678', service: 'Product Demo', date: '2025-01-21', time: '14:30', status: 'confirmed', notes: '', rating: null, review: null },
  { id: 3, customer_name: 'Emily Watson', customer_phone: '+1 (555) 345-6789', service: 'Consultation', date: '2025-01-19', time: '11:00', status: 'completed', notes: 'Interested in Pro plan', rating: 5, review: 'Very professional!' },
  { id: 4, customer_name: 'John Doe', customer_phone: '+1 (555) 456-7890', service: 'Support', date: '2025-01-18', time: '15:00', status: 'cancelled', notes: 'Rescheduled', rating: null, review: null },
  { id: 5, customer_name: 'Lisa Park', customer_phone: '+1 (555) 567-8901', service: 'Consultation', date: '2025-01-18', time: '09:00', status: 'completed', notes: '', rating: 4, review: 'Great experience.' },
]

const services = ['Consultation', 'Product Demo', 'Support', 'Meeting', 'Other']
const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']

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
  const [selectedWeek, setSelectedWeek] = useState(null)

  const handleCreate = (e) => {
    e.preventDefault()
    const newBooking = { id: Date.now(), ...form, status: 'confirmed', created_at: new Date().toISOString(), rating: null, review: null }
    setBookings(prev => [newBooking, ...prev]); setShowForm(false)
    setForm({ customer_name: '', customer_phone: '', service: 'Consultation', date: '', time: '', notes: '' })
  }
  const handleCancel = (id) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
  const handleComplete = (id) => { setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed' } : b)); setShowFeedback(id) }
  const handleFeedback = (id) => { setBookings(prev => prev.map(b => b.id === id ? { ...b, ...feedbackForm } : b)); setShowFeedback(null); setFeedbackForm({ rating: 5, review: '' }) }

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
              <h1 className="text-3xl font-bold text-white">Bookings</h1>
              <p className="text-dark-400 mt-1">Manage your appointments and customer feedback.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                <button onClick={() => setView('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'table' ? 'text-white' : 'text-dark-400 hover:text-white'}`}
                  style={view === 'table' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' } : {}}>
                  <List className="w-4 h-4" />
                </button>
                <button onClick={() => setView('calendar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'calendar' ? 'text-white' : 'text-dark-400 hover:text-white'}`}
                  style={view === 'calendar' ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))' } : {}}>
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
                <p className="text-2xl font-bold text-white">{s.value}{s.suffix || ''}</p>
                <p className="text-xs text-dark-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Feedback Modal */}
          {showFeedback && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-card-deep p-6 border-primary-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Rate this booking ⭐</h3>
              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map(r => (
                  <button key={r} onClick={() => setFeedbackForm({ ...feedbackForm, rating: r })}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      r <= feedbackForm.rating ? 'bg-yellow-500/20 text-yellow-400 scale-110' : 'bg-white/5 text-dark-500'
                    }`}>
                    <Star className={`w-5 h-5 ${r <= feedbackForm.rating ? 'fill-yellow-500' : ''}`} />
                  </button>
                ))}
              </div>
              <textarea value={feedbackForm.review} onChange={e => setFeedbackForm({ ...feedbackForm, review: e.target.value })}
                placeholder="Write a review..." rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-dark-400 outline-none focus:border-primary-500/50 mb-4" />
              <div className="flex gap-3">
                <button onClick={() => handleFeedback(showFeedback)} className="px-5 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-sm text-white">Submit</button>
                <button onClick={() => setShowFeedback(null)} className="px-5 py-2 glass-card rounded-xl text-sm text-dark-300">Skip</button>
              </div>
            </motion.div>
          )}

          {/* Create Form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-deep p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Create New Booking</h3>
              <form onSubmit={handleCreate} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div><label className="block text-xs text-dark-400 mb-1">Name</label>
                  <input type="text" value={form.customer_name} required onChange={e => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50" /></div>
                <div><label className="block text-xs text-dark-400 mb-1">Phone</label>
                  <input type="text" value={form.customer_phone} onChange={e => setForm({ ...form, customer_phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50" /></div>
                <div><label className="block text-xs text-dark-400 mb-1">Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50">
                    {services.map(s => <option key={s}>{s}</option>)}</select></div>
                <div><label className="block text-xs text-dark-400 mb-1">Date</label>
                  <input type="date" value={form.date} min={today} required onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50" /></div>
                <div><label className="block text-xs text-dark-400 mb-1">Time</label>
                  <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50">
                    <option value="">Select</option>
                    {timeSlots.map(s => <option key={s}>{s}</option>)}</select></div>
                <div className="md:col-span-3"><label className="block text-xs text-dark-400 mb-1">Notes</label>
                  <input type="text" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary-500/50" /></div>
                <div className="md:col-span-4 flex gap-3">
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-sm text-white">Create Booking</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 glass-card rounded-xl text-sm text-dark-300">Cancel</button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Calendar View */}
          {view === 'calendar' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2 glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={prevMonth} className="p-2 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-white">{monthNames[calMonth]} {calYear}</h3>
                  <button onClick={nextMonth} className="p-2 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {dayNames.map(d => (
                    <div key={d} className="text-center text-xs text-dark-400 font-medium py-2">{d}</div>
                  ))}
                  {calendarDays.map((day, i) => {
                    const dateStr = day ? `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null
                    const hasBookings = dateStr && bookingsByDate[dateStr]
                    const isToday = day === todayNum && calMonth === new Date().getMonth() && calYear === new Date().getFullYear()
                    const isSelected = day === selectedDay
                    return (
                      <button key={i} onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                        disabled={!day}
                        className={`relative aspect-square rounded-xl text-sm font-medium transition-all flex items-center justify-center ${
                          !day ? 'invisible' :
                          isSelected ? 'text-white scale-105' :
                          isToday ? 'text-accent-400 border border-accent-500/30' :
                          'text-dark-300 hover:text-white hover:bg-white/5'
                        }`}
                        style={isSelected ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)' } : isToday ? { background: 'rgba(20,184,166,0.1)' } : {}}>
                        {day}
                        {hasBookings && !isSelected && (
                          <div className="absolute bottom-1.5 flex gap-0.5">
                            {bookingsByDate[dateStr].slice(0, 3).map((b, j) => (
                              <div key={j} className="w-1.5 h-1.5 rounded-full"
                                style={{ background: b.status === 'confirmed' ? '#14b8a6' : b.status === 'completed' ? '#3b82f6' : b.status === 'cancelled' ? '#ef4444' : '#eab308' }} />
                            ))}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-dark-400">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-500" /> Confirmed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Completed</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Cancelled</span>
                </div>
              </div>

              {/* Selected Day Bookings */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {selectedDay ? `${monthNames[calMonth]} ${selectedDay}, ${calYear}` : 'Select a date'}
                </h3>
                {dayBookings.length > 0 ? (
                  <div className="space-y-3">
                    {dayBookings.map(b => {
                      const badge = statusBadge(b.status)
                      return (
                        <div key={b.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #14b8a6)' }}>
                                {b.customer_name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm text-white font-medium">{b.customer_name}</span>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color }}>{badge.text}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-dark-400">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.time}</span>
                            <span>{b.service}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                            {b.status === 'confirmed' && (
                              <>
                                <button onClick={() => handleComplete(b.id)} className="text-[10px] px-2 py-1 rounded-md text-accent-400 hover:bg-accent-500/10">Complete</button>
                                <button onClick={() => handleCancel(b.id)} className="text-[10px] px-2 py-1 rounded-md text-red-400 hover:bg-red-500/10">Cancel</button>
                              </>
                            )}
                            {b.status === 'completed' && !b.rating && (
                              <button onClick={() => setShowFeedback(b.id)} className="text-[10px] px-2 py-1 rounded-md text-yellow-400 hover:bg-yellow-500/10">Rate</button>
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
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Table View */}
          {view === 'table' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
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
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm text-white">{b.customer_name}</p>
                          <p className="text-xs text-dark-400">{b.customer_phone}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-200">{b.service}</td>
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
