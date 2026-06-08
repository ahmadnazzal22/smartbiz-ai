import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SEO from '../components/SEO'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '', name: '', business_name: '' })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await register(form)
      } else {
        await login(form.email, form.password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-glow" style={{ background: '#7c3aed', top: '20%', left: '-10%' }} />
        <div className="hero-glow" style={{ background: '#14b8a6', bottom: '20%', right: '-10%' }} />
      </div>

      <SEO title={isRegister ? 'Create Account' : 'Sign In'}
        description="Sign in to SmartBiz AI dashboard or create a free account. No credit card required."
        url="/login" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-white">Smart</span>
            <span className="gradient-text">Biz</span>
            <span className="text-white"> AI</span>
          </span>
        </Link>

        <div className="glass-card-deep p-8" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-dark-400 text-sm mb-8">
            {isRegister ? 'Start your 14-day free trial' : 'Sign in to your dashboard'}
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <input type="text" placeholder="Full Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50 focus:bg-white/10 transition-all" required />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <input type="text" placeholder="Business Name (optional)" value={form.business_name}
                    onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50 focus:bg-white/10 transition-all" />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input type="email" placeholder="Email address" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50 focus:bg-white/10 transition-all" required />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-sm text-white placeholder-dark-400 outline-none focus:border-brand-500/50 focus:bg-white/10 transition-all" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm btn-premium disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
              {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => { setIsRegister(!isRegister); setError('') }}
              className="text-sm text-dark-400 hover:text-white transition-colors">
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
