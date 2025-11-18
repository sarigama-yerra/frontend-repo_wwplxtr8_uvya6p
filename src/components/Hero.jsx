import { motion } from 'framer-motion'
import { Utensils, Leaf, MapPin, Clock } from 'lucide-react'

export default function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500" />
      <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_20%_10%,white,transparent_30%),radial-gradient(circle_at_80%_30%,white,transparent_35%),radial-gradient(circle_at_40%_90%,white,transparent_35%)]" />

      <div className="max-w-6xl mx-auto px-6 py-16 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm"
        >
          Save delicious food, not the planet's resources
        </motion.h1>

        <p className="mt-4 max-w-2xl text-white/90">
          Discover last-minute surprise bags from local spots at up to 70% off. Fresh, tasty, and rescued from going to waste.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <input onKeyDown={(e)=>{ if(e.key==='Enter') onSearch?.(e.target.value) }} placeholder="Search by city or area" className="flex-1 bg-transparent placeholder-white/70 outline-none" />
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3">
            <Leaf className="w-5 h-5" />
            <span className="text-sm">Sustainable savings</span>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <span className="text-sm">Pickup today</span>
          </div>
        </div>
      </div>
    </section>
  )
}
