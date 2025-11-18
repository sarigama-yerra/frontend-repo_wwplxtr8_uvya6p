import { motion } from 'framer-motion'
import { Store, Tag, Clock, MapPin } from 'lucide-react'

export default function OfferCard({ offer, onReserve }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100"
    >
      <div className="relative h-44 bg-slate-100">
        {offer.image_url ? (
          <img src={offer.image_url} alt={offer.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            <Store className="w-10 h-10" />
          </div>
        )}
        <div className="absolute top-3 left-3 px-2 py-1 text-xs bg-white/90 rounded-full">
          {Math.round(((offer.original_price - offer.price) / offer.original_price) * 100)}% off
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">{offer.title}</h3>
            <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin className="w-4 h-4" />{offer.city}</p>
          </div>
          <div className="text-right">
            <div className="text-emerald-600 font-bold text-lg">${offer.price.toFixed(2)}</div>
            <div className="text-xs text-slate-500 line-through">${offer.original_price.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {offer.tags?.slice(0,3).map((t)=> (
            <span key={t} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
              <Tag className="w-3 h-3" />{t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />Pickup till {new Date(offer.pickup_end).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
          <span className="font-medium">{offer.quantity} left</span>
        </div>

        <button
          onClick={() => onReserve?.(offer)}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2 font-semibold transition-colors"
        >
          Reserve
        </button>
      </div>
    </motion.div>
  )
}
