import { notFound } from 'next/navigation'
import Link from 'next/link'
import archiveData from '@/data/archive.json'
import type { Metadata } from 'next'

interface Section {
  id: string
  emoji: string
  title: string
  content: string
}

interface Issue {
  slug: string
  issueNumber: number
  weekOf: string
  highlightTitle: string
  highlightSummary: string
  sections: Section[]
}

export async function generateStaticParams() {
  return archiveData.map((issue) => ({ slug: issue.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const issue = archiveData.find((i) => i.slug === slug) as Issue | undefined
  if (!issue) return {}
  return {
    title: `Issue #${issue.issueNumber} — ${issue.highlightTitle} | Zworth Reading`,
    description: issue.highlightSummary,
  }
}

export default async function EditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const issue = archiveData.find((i) => i.slug === slug) as Issue | undefined
  if (!issue) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/archive" className="hover:text-[#C0392B] transition-colors">Archive</Link>
        <span>/</span>
        <span className="text-gray-600">Issue #{issue.issueNumber}</span>
      </div>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-[#C0392B] uppercase tracking-wide">
            Issue #{issue.issueNumber}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-500">Week of {issue.weekOf}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] leading-tight">
            Zworth Reading
          </h1>
          <span className="em-badge">EM</span>
        </div>
        <p className="text-gray-500 text-sm italic">Max&rsquo;s EM Weekly Update</p>
      </header>

      {/* First section (Highlight of the Week) */}
      {issue.sections[0] && (
        <section className="mb-6">
          <SectionCard section={issue.sections[0]} />
        </section>
      )}

      {/* TODO: gate content here — insert subscribe wall between first and remaining sections */}

      {/* Remaining sections */}
      {issue.sections.slice(1).map((section) => (
        <section key={section.id} className="mb-6">
          <SectionCard section={section} />
        </section>
      ))}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
        <Link
          href="/archive"
          className="text-sm text-gray-500 hover:text-[#C0392B] transition-colors font-medium"
        >
          &larr; All editions
        </Link>
        <Link
          href="/#subscribe"
          className="bg-[#C0392B] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#A93226] transition-colors"
        >
          Subscribe Free
        </Link>
      </div>
    </div>
  )
}

function SectionCard({ section }: { section: Section }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex items-center gap-2">
        <span className="text-lg" role="img" aria-label={section.title}>
          {section.emoji}
        </span>
        <h2 className="font-bold text-[#1A1A1A] text-sm tracking-wide uppercase">
          {section.title}
        </h2>
      </div>
      <div
        className="px-5 py-5 prose-newsletter"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  )
}
