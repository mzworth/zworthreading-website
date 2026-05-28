/**
 * GlanceList
 * Renders a compact "This Week at a Glance" summary for an issue card.
 * Used on the homepage recent-editions preview and the archive list page.
 */

type Section = {
  id: string
  emoji: string
  title: string
  content: string
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
}

function getFirstArticleTitle(html: string): string {
  // Primary: first <a> tag (all real newsletter sections)
  const aMatch = html.match(/<a[^>]*>([\s\S]*?)<\/a>/)
  if (aMatch) {
    return decodeHtmlEntities(
      aMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    )
  }
  // Fallback: first <h3> (older placeholder entries)
  const h3Match = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)
  if (h3Match) {
    return decodeHtmlEntities(
      h3Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    )
  }
  return ''
}

export default function GlanceList({ sections }: { sections: readonly Section[] }) {
  const items = sections
    .map((s) => ({ id: s.id, emoji: s.emoji, title: s.title, articleTitle: getFirstArticleTitle(s.content) }))
    .filter((s) => s.articleTitle.length > 0)

  if (items.length === 0) return null

  return (
    <div>
      <p className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
        This Week at a Glance
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id} className="text-[0.95rem] leading-tight text-gray-500">
            <span className="mr-0.5">{item.emoji}</span>
            <span className="font-semibold text-gray-700">{item.title}:</span>
            {' '}{item.articleTitle}
          </li>
        ))}
      </ul>
    </div>
  )
}
