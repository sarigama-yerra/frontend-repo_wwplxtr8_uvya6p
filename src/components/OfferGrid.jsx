import { useEffect, useState } from 'react'
import OfferCard from './OfferCard'

export default function OfferGrid({ query }) {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const controller = new AbortController()
    async function fetchOffers() {
      setLoading(true)
      setError('')
      try {
        const url = new URL(`${baseUrl}/offers`)
        if (query) url.searchParams.set('city', query)
        const res = await fetch(url.toString(), { signal: controller.signal })
        if (!res.ok) throw new Error('Failed to load offers')
        const data = await res.json()
        setOffers(data)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
    return () => controller.abort()
  }, [query])

  const handleReserve = async (offer) => {
    try {
      const res = await fetch(`${baseUrl}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer_id: offer.id, user_name: 'Guest', user_phone: 'N/A' })
      })
      if (!res.ok) throw new Error('Reservation failed')
      const data = await res.json()
      alert(`Reserved! Pickup code: ${data.pickup_code}`)
      // refresh list
      const url = new URL(`${baseUrl}/offers`)
      if (query) url.searchParams.set('city', query)
      const refreshed = await fetch(url)
      setOffers(await refreshed.json())
    } catch (e) {
      alert(e.message)
    }
  }

  if (loading) return <p className="text-center py-10">Loading offers…</p>
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>
  if (!offers.length) return <p className="text-center py-10">No offers found right now. Check back soon!</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map(o => (
        <OfferCard key={o.id} offer={o} onReserve={handleReserve} />
      ))}
    </div>
  )
}
