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
      <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-5 text-center">
        <p className="text-green-800 font-semibold text-lg">You&rsquo;re in. See you Sunday.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B] focus:border-transparent bg-white text-[#1A1A1A] placeholder-gray-400"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#C0392B] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#A93226] transition-colors text-sm disabled:opacity-60 whitespace-nowrap"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-xs mt-1 w-full">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
