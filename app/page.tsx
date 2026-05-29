import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import archiveData from '@/data/archive.json'
import GlanceList from '@/components/GlanceList'

export default function HomePage() {
  const recentIssues = archiveData.slice(0, 3)

  return (
    <div>
      {/* Hero — white */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
                Zworth Reading
              </h1>
              <span className="em-badge text-sm">EM</span>
            </div>
            <p className="text-xl md:text-2xl text-gray-500 font-medium italic mb-6">
              What&rsquo;s worth reading in Emergency Medicine, this week.
            </p>
            <p className="text-[17px] text-gray-600 leading-relaxed max-w-xl">
              Keeping up with the EM literature is a lot. Each week, Max Zworth curates and appraises the week&rsquo;s most important EM content, so you know exactly what&rsquo;s worth reading, and why.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe — red */}
      <section id="subscribe" className="bg-[#C0392B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <p className="text-white font-bold text-lg md:text-xl mb-6 flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-white opacity-70 flex-shrink-0"></span>
            Join 100+ emergency physicians who read it every week.
          </p>
          <SubscribeForm />
        </div>
      </section>

      {/* Recent editions preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Recent Editions</h2>
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
              <GlanceList sections={issue.sections} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
