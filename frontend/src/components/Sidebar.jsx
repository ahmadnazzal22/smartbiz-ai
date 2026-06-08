import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Calendar, MessageSquare, Users, Bot, LogOut, Sparkles, Activity, Smartphone, Menu, X, FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import DemoBanner from './DemoBanner'

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/whatsapp', icon: Smartphone, label: 'WhatsApp', badge: 'Live' },
  { to: '/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/ai-chat', icon: Bot, label: 'AI Chat' },
  { to: '/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/ai-report', icon: FileText, label: 'AI Report', badge: 'Daily' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile Toggle */}
      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-dark-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col z-50
        transition-transform duration-300
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-500/20"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Smart</span>
              <span className="text-sm font-bold gradient-text">Biz</span>
              <span className="text-sm font-bold text-white"> AI</span>
            </div>
          </NavLink>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-dark-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {links.map(({ to, icon: Icon, label, badge }) => (
            <NavLink key={to} to={to} onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white border shadow-sm'
                    : 'text-dark-400 hover:text-white hover:bg-white/5'
                } ${isActive ? 'border-brand-500/20' : 'border-transparent'}`
              }
              style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.1))' } : {}}>
              <Icon className="w-4 h-4" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white font-medium"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>{badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.1)' }}>
            <Activity className="w-3 h-3 text-accent-400" />
            <span className="text-[10px] text-accent-400">Active</span>
          </div>
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #14b8a6)' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate font-medium">{user?.name || 'User'}</p>
              <p className="text-[10px] text-dark-400 truncate">{user?.email || 'user@smartbiz.ai'}</p>
            </div>
          </div>
          <button onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs text-dark-400 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <DemoBanner />

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-dark-900/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 py-1 safe-area-bottom">
        {links.slice(0, 5).map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all ${
                isActive ? 'text-white' : 'text-dark-400'
              }`
            }
            style={({ isActive }) => isActive ? { color: '#7c3aed' } : {}}>
            <Icon className="w-4 h-4" />
            <span className="text-[9px] font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
