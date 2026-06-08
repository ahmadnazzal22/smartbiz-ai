import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import WhatsAppViewer from './pages/WhatsAppViewer'
import Bookings from './pages/Bookings'
import Messages from './pages/Messages'
import Leads from './pages/Leads'
import AIChat from './pages/AIChat'
import AIReport from './pages/AIReport'
import TryDemo from './pages/TryDemo'
import Onboarding from './pages/Onboarding'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/try-demo" element={<TryDemo />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/whatsapp" element={<ProtectedRoute><WhatsAppViewer /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
        <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
        <Route path="/ai-report" element={<ProtectedRoute><AIReport /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}
