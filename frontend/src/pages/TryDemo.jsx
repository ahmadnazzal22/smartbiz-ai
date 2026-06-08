import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function TryDemo() {
  const { demoLogin, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
      return
    }
    demoLogin().then(() => {
      navigate('/dashboard', { replace: true })
    })
  }, [user, demoLogin, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#050508' }}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center animate-pulse"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(245,158,11,0.2))' }}>
          <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
        </div>
        <p className="text-dark-300 text-lg">Loading demo environment...</p>
        <p className="text-dark-500 text-sm mt-2">Redirecting you to the dashboard</p>
      </div>
    </div>
  )
}
