import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing', external: true },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Demo', href: '#demo' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-cream/90 backdrop-blur-xl border-b border-cream-dark shadow-lg shadow-dark-50/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-dark-50">Smart</span>
              <span className="gradient-text">Biz</span>
              <span className="text-dark-50"> AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <Link key={link.label} to={link.href}
                  className="text-sm text-dark-400 hover:text-brand-600 transition-colors duration-300 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <a key={link.label} href={link.href}
                  className="text-sm text-dark-400 hover:text-brand-600 transition-colors duration-300 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-400 group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
            <Link to="/login"
              className="text-sm text-dark-400 hover:text-brand-600 transition-colors duration-300">
              Sign In
            </Link>
            <Link to="/login"
              className="px-6 py-2.5 text-sm font-medium text-white rounded-full btn-premium shadow-lg shadow-brand-500/25">
              Get Started Free
            </Link>
          </div>

          <button className="md:hidden text-dark-50 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-cream-dark bg-cream/95 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                link.external ? (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
                    className="block py-2 text-dark-400 hover:text-brand-600 transition-colors">{link.label}</Link>
                ) : (
                  <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    className="block py-2 text-dark-400 hover:text-brand-600 transition-colors">{link.label}</a>
                )
              ))}
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="block py-2 text-dark-400 hover:text-brand-600 transition-colors">Sign In</Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 text-sm font-medium text-white rounded-full btn-premium">
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
