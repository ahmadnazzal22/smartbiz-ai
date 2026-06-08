import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, X, Info, XCircle } from 'lucide-react'

const ToastContext = createContext()

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  success: { bg: 'bg-green-50 border-green-200', text: 'text-green-700', icon: 'text-green-500' },
  error: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: 'text-red-500' },
  warning: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', icon: 'text-yellow-500' },
  info: { bg: 'bg-brand-50 border-brand-200', text: 'text-brand-700', icon: 'text-brand-500' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = icons[t.type]
            const c = colors[t.type]
            return (
              <motion.div key={t.id} initial={{ opacity: 0, x: 80, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 80, scale: 0.9 }}
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm ${c.bg}`}>
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${c.icon}`} />
                <p className={`text-sm font-medium flex-1 ${c.text}`}>{t.message}</p>
                <button onClick={() => removeToast(t.id)} className={`shrink-0 ${c.text} hover:opacity-70`}>
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}