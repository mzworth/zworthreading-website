'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/archive', label: 'Archive' },
    { href: '/podcast', label: 'Podcast' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-[#1A1A1A] font-bold text-lg tracking-tight group-hover:text-[#C0392B] transition-colors">
              Zworth Reading
            </span>
            <span className="em-badge">EM</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-[#C0392B]'
                    : 'text-[#1A1A1A] hover:text-[#C0392B]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#subscribe"
              className="bg-[#C0392B] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#A93226] transition-colors"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded text-[#1A1A1A] hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2.5 text-sm font-medium rounded transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-[#C0392B] bg-red-50'
                    : 'text-[#1A1A1A] hover:text-[#C0392B] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#subscribe"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 bg-[#C0392B] text-white text-sm font-semibold px-4 py-2.5 rounded hover:bg-[#A93226] transition-colors text-center"
            >
              Subscribe
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
