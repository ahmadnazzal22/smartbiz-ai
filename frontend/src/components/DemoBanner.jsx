import { Link } from 'react-router-dom'
import { Sparkles, X } from 'lucide-react'

export default function DemoBanner() {
  const isDemo = localStorage.getItem('demo_mode') === 'true'
  if (!isDemo) return null

  return (
    <div className="relative z-50 px-4 py-2.5 text-center text-sm"
      style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(245,158,11,0.1))', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-brand-300 font-medium">
          <Sparkles className="w-4 h-4" />
          Demo Mode
        </span>
        <span className="text-dark-300">You're viewing a preview with sample data.</span>
        <Link to="/login"
          className="px-4 py-1 rounded-full text-xs font-medium text-slate-900 transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
          Sign Up Free
        </Link>
        <span className="text-dark-500 text-xs">— No credit card needed</span>
      </div>
    </div>
  )
}
