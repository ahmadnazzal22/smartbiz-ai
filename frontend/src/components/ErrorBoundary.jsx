import { Component } from 'react'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
          <div className="text-center max-w-md space-y-6">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>
              <p className="text-dark-400 text-sm">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-dark-300 bg-surface-alt hover:text-slate-900 transition-all">
                <ArrowLeft className="w-4 h-4" /> Go Home
              </button>
              <button onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}>
                <RefreshCw className="w-4 h-4" /> Reload
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
