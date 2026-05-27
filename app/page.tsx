import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import archiveData from '@/data/archive.json'

export default function HomePage() {
  const recentIssues = archiveData.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
                Zworth Reading
              </h1>
              <span className="em-badge text-sm">EM</span>
            </div>
            <p className="text-xl md:text-2xl text-gray-500 font-medium italic mb-6">
              What&rsquo;s worth reading in Emergency Medicine, this week.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              A weekly curated digest of the most important Emergency Medicine literature,
              critically appraised and delivered every Sunday. Written for Canadian EM physicians
              by a Canadian EM physician.
            </p>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C0392B]"></span>
              Join 100+ emergency physicians who read it every week.
            </p>

            {/* Subscribe form */}
            <div id="subscribe">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* Recent editions preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Editions</h2>
          <Link href="/archive" className="text-sm text-[#C0392B] font-semibold hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recentIssues.map((issue) => (
            <Link
              key={issue.slug}
              href={`/archive/${issue.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#C0392B] uppercase tracking-wide">
                  Issue #{issue.issueNumber}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">{issue.weekOf}</span>
              </div>
              <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug mb-2 group-hover:text-[#C0392B] transition-colors">
                ⭐ {issue.highlightTitle}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                {issue.highlightSummary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
