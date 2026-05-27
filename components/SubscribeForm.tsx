'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const formUrl = process.env.NEXT_PUBLIC_BEEHIIV_FORM_URL

    if (!formUrl) {
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white/15 rounded-lg px-6 py-5 text-center max-w-md">
        <p className="text-white font-bold text-xl">You&rsquo;re in. See you Sunday.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3.5 border-0 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-[#1A1A1A] placeholder-gray-400 shadow-sm"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#D4A017] text-[#1A1A1A] font-bold px-7 py-3.5 rounded-lg hover:bg-[#c09010] transition-colors text-[15px] disabled:opacity-60 whitespace-nowrap shadow-sm"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-white/80 text-sm mt-2">Something went wrong. Please try again.</p>
      )}
      <p className="text-white/60 text-sm mt-3">
        Free. Every Sunday. Unsubscribe anytime.
      </p>
    </div>
  )
}
