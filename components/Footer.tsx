import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-[#1A1A1A]">Zworth Reading</span>
              <span className="em-badge">EM</span>
            </div>
            <p className="text-sm text-gray-500 italic">
              What&rsquo;s worth reading in Emergency Medicine, this week.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <Link href="/archive" className="hover:text-[#C0392B] transition-colors">Archive</Link>
            <Link href="/podcast" className="hover:text-[#C0392B] transition-colors">Podcast</Link>
            <Link href="/about" className="hover:text-[#C0392B] transition-colors">About</Link>
            <Link href="/#subscribe" className="hover:text-[#C0392B] transition-colors font-medium">Subscribe</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
          &copy; 2026 Max Zworth. Zworth Reading.
        </div>
      </div>
    </footer>
  )
}
