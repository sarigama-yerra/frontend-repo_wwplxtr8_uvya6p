import { useState } from 'react'
import Hero from './components/Hero'
import OfferGrid from './components/OfferGrid'

function App() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero onSearch={setQuery} />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Nearby surprise bags</h2>
          <div className="text-slate-600 text-sm">Showing results {query ? `for "${query}"` : 'around you'}</div>
        </div>

        <OfferGrid query={query} />
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>Food Waste Saver — rescue great food and save money</div>
          <div className="flex gap-4">
            <a className="hover:text-slate-900" href="/test">System check</a>
            <span>•</span>
            <a className="hover:text-slate-900" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
