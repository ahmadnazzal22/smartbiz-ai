import { createContext, useContext, useState, useEffect } from 'react'

const DEMO_USER = {
  id: 1,
  email: 'demo@smartbiz.ai',
  name: 'Demo User',
  business_name: 'SmartBiz Inc.',
  whatsapp_number: '+1 (555) 000-0000',
  created_at: new Date().toISOString(),
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch { localStorage.removeItem('user') }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const userData = { ...DEMO_USER, email }
    localStorage.setItem('token', 'demo-token-123')
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (data) => {
    const userData = { ...DEMO_USER, email: data.email, name: data.name, business_name: data.business_name }
    localStorage.setItem('token', 'demo-token-123')
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
