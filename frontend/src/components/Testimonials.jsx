import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Luxe Spa',
    avatar: 'SC',
    content: 'SmartBiz AI transformed our customer service. We went from 50 missed calls a day to 24/7 instant responses. Our booking rate increased by 340% in the first month.',
    rating: 5,
    metric: '340% booking increase',
  },
  {
    name: 'Marcus Johnson',
    role: 'Owner, Johnson Dental',
    avatar: 'MJ',
    content: 'The AI assistant handles 80% of our patient inquiries automatically. It books appointments, answers questions, and follows up — all through WhatsApp. Game changer.',
    rating: 5,
    metric: '80% automated inquiries',
  },
  {
    name: 'Aisha Patel',
    role: 'Director, Patel Law Firm',
    avatar: 'AP',
    content: 'We were skeptical about AI for our legal practice, but SmartBiz proved us wrong. It qualifies leads perfectly and never misses a potential client. ROI was immediate.',
    rating: 5,
    metric: '2.5x lead conversion',
  },
  {
    name: 'David Kim',
    role: 'Founder, FitLife Studio',
    avatar: 'DK',
    content: 'Setup took 10 minutes. Within a week, our WhatsApp was fully automated. Members love the instant responses and the booking system is seamless.',
    rating: 5,
    metric: '10-minute setup',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const next = () => setActive((a) => (a + 1) % testimonials.length)
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/20 to-dark-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary-500/20 text-sm text-primary-300">
            <Quote className="w-4 h-4" />
            Trusted by Industry Leaders
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">
            What our <span className="gradient-text">customers</span> say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }} className="w-full">
                <div className="glass-card-deep p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xl font-bold text-white">
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{testimonials[active].name}</h4>
                      <p className="text-sm text-dark-400">{testimonials[active].role}</p>
                    </div>
                    <div className="ml-auto hidden sm:block">
                      <span className="px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-xs text-accent-400">
                        {testimonials[active].metric}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-5">
                    {[...Array(testimonials[active].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  <p className="text-lg text-dark-200 leading-relaxed italic">
                    "{testimonials[active].content}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-dark-300 hover:text-white hover:border-primary-500/30 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-primary-400 w-8' : 'bg-dark-600 hover:bg-dark-400'
                  }`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-dark-300 hover:text-white hover:border-primary-500/30 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
