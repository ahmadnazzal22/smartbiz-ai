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

const MOCK = {
  stats: { total_leads: 128, new_leads: 34, total_bookings: 45, today_bookings: 8, total_messages: 892, ai_messages: 534 },
  leads: [
    { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', email: 'sarah@email.com', source: 'whatsapp', status: 'hot', notes: 'Interested in Pro plan', created_at: '2025-01-15T10:30:00' },
    { id: 2, name: 'Mike Chen', phone: '+1 (555) 234-5678', email: 'mike@email.com', source: 'whatsapp', status: 'new', notes: 'Asked about pricing', created_at: '2025-01-15T09:15:00' },
    { id: 3, name: 'Emily Watson', phone: '+1 (555) 345-6789', email: 'emily@email.com', source: 'web', status: 'qualified', notes: 'Booked consultation', created_at: '2025-01-14T16:45:00' },
  ],
  bookings: [
    { id: 1, customer_name: 'Sarah Johnson', customer_phone: '+1 (555) 123-4567', customer_email: '', service: 'Consultation', date: '2025-01-20', time: '10:00', status: 'confirmed', notes: '', created_at: '2025-01-15T10:30:00' },
    { id: 2, customer_name: 'Mike Chen', customer_phone: '+1 (555) 234-5678', customer_email: '', service: 'Product Demo', date: '2025-01-21', time: '14:30', status: 'confirmed', notes: '', created_at: '2025-01-15T09:15:00' },
  ],
  messages: [
    { id: 1, lead_id: 1, sender: '+1 (555) 123-4567', content: 'Hi! What are your pricing plans?', direction: 'incoming', is_ai: false, created_at: '2025-01-15T10:30:00' },
    { id: 2, lead_id: 1, sender: 'SmartBiz AI', content: 'Our pricing starts at $29/month for the Starter plan...', direction: 'outgoing', is_ai: true, created_at: '2025-01-15T10:30:01' },
  ],
  slots: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  aiReply: "Thank you for your message! I'd be happy to help you with that. Our platform offers AI-powered WhatsApp automation, smart booking, and lead management. Would you like to learn more about a specific feature?",
  aiReport: {
    summary: "Good morning! Here's your Monday, June 8 business snapshot. Your team is performing well with consistent engagement across all channels.",
    key_metrics: [
      { label: "New Leads", value: 12, change: "+23%" },
      { label: "Bookings", value: 3, change: "+8%" },
      { label: "Messages", value: 45, change: "+15%" },
      { label: "Hot Leads", value: 3, change: "+12%" },
    ],
    hot_leads: [
      { name: "Robert Kim", score: 95, note: "Visited pricing page 3 times. Ready for follow-up.", status: "hot" },
      { name: "Lisa Park", score: 71, note: "Engaged with WhatsApp demo bot", status: "warm" },
      { name: "James Wilson", score: 88, note: "Asked about enterprise plan", status: "hot" },
    ],
    recommendations: [
      { time: "9:00 AM", task: "Follow up with hot leads", description: "Contact Robert Kim and James Wilson for personalized demos" },
      { time: "12:00 PM", task: "Review weekly analytics", description: "Check conversion rates and adjust WhatsApp campaigns" },
      { time: "3:00 PM", task: "Team sync", description: "Review booking conflicts and optimize service slots" },
    ],
    focus_area: "Lead response time - current avg is 4.2min, target is under 2min",
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

export default api
