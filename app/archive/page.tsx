import Link from 'next/link'
import archiveData from '@/data/archive.json'
import GlanceList from '@/components/GlanceList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive | Zworth Reading',
  description: 'All past editions of Zworth Reading: Max\'s EM Weekly Update.',
}

export default function ArchivePage() {
  const issues = [...archiveData].sort((a, b) => b.issueNumber - a.issueNumber)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-2">Archive</h1>
        <p className="text-gray-500">Every edition of Zworth Reading, from the beginning.</p>
      </div>

      <div className="space-y-3">
        {issues.map((issue) => (
          // TODO: gate content here — check subscription status and conditionally render a paywall
          <Link
            key={issue.slug}
            href={`/archive/${issue.slug}`}
            className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 bg-white rounded-xl border border-gray-200 px-5 py-4 hover:shadow-md transition-shadow group"
          >
            <div className="flex-shrink-0 flex flex-col items-start sm:items-center sm:min-w-[80px]">
              <span className="text-xs font-bold text-[#C0392B] uppercase tracking-wide">
                Issue #{issue.issueNumber}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">{issue.weekOf}</span>
            </div>
            <div className="flex-1 min-w-0">
              <GlanceList sections={issue.sections} />
            </div>
            <div className="hidden sm:flex items-center flex-shrink-0">
              <svg className="w-4 h-4 text-gray-300 group-hover:text-[#C0392B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
