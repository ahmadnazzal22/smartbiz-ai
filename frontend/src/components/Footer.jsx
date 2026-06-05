import { Sparkles, Mail, Github, Twitter, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Demo', 'Integrations', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Documentation', 'Tutorials', 'Support', 'Status', 'Community'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies', 'GDPR'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-500/20"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1, #14b8a6)' }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Smart</span>
                <span className="gradient-text">Biz</span>
                <span className="text-white"> AI</span>
              </span>
            </Link>
            <p className="text-sm text-dark-400 mb-6 max-w-xs leading-relaxed">
              Turn your WhatsApp into a smart AI sales system. Automate, engage, and grow your business 24/7.
            </p>
            <div className="flex gap-3">
              {[Mail, Github, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-dark-400 hover:text-white hover:border-brand-500/30 transition-all hover:scale-110">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-dark-400 hover:text-white transition-colors hover:translate-x-1 inline-block">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-500">© 2025 SmartBiz AI. All rights reserved. <span className="inline-flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-400" /> for businesses</span></p>
          <div className="flex items-center gap-2 text-xs text-dark-500">
            <span className="brand-dot animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
