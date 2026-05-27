import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Zworth Reading',
  description: 'About Max Zworth, Emergency Physician in Toronto and author of Zworth Reading.',
}

const publications = [
  {
    citation: 'Bhatt C, Zworth M, Rosenberg H. Should emergency departments be prescribing buprenorphine/naloxone? CJEM. 2023.',
    title: 'Should emergency departments be prescribing buprenorphine/naloxone?',
    url: 'https://doi.org/10.1007/s43678-023-00594-z',
  },
  {
    citation: 'Zworth M, Kareemi H, Boroumand S, et al. Machine learning for the diagnosis of acute coronary syndrome using a 12-lead ECG: a systematic review. CJEM. 2023.',
    title: 'Machine learning for the diagnosis of acute coronary syndrome using a 12-lead ECG: a systematic review.',
    url: 'https://doi.org/10.1007/s43678-023-00572-5',
  },
  {
    citation: 'Zworth M, Saleh C, Ball I, et al. The provision of medical assistance in dying: a scoping review. BMJ Open. 2020.',
    title: 'The provision of medical assistance in dying: a scoping review.',
    url: 'https://doi.org/10.1136/bmjopen-2019-036054',
  },
  {
    citation: 'Vernooij RW, Zeraatkar D, Han MA, Zworth M, et al. Patterns of red and processed meat consumption and risk for cardiometabolic and cancer outcomes. Ann Intern Med. 2019.',
    title: 'Patterns of red and processed meat consumption and risk for cardiometabolic and cancer outcomes.',
    url: 'https://doi.org/10.7326/M19-1583',
  },
  {
    citation: 'Han MA, Zeraatkar D, Guyatt GH, Zworth M, et al. Reduction of red and processed meat intake and cancer mortality and incidence. Ann Intern Med. 2019.',
    title: 'Reduction of red and processed meat intake and cancer mortality and incidence.',
    url: 'https://doi.org/10.7326/M19-0699',
  },
  {
    citation: 'Zeraatkar D, Han MA, Guyatt GH, Zworth M, et al. Red and processed meat consumption and risk for all-cause mortality and cardiometabolic outcomes. Ann Intern Med. 2019.',
    title: 'Red and processed meat consumption and risk for all-cause mortality and cardiometabolic outcomes.',
    url: 'https://doi.org/10.7326/M19-0655',
  },
  {
    citation: 'Zeraatkar D, Cheung K, Milio K, Zworth M, et al. Methods for the selection of covariates in nutritional epidemiology studies. Curr Dev Nutr. 2019.',
    title: 'Methods for the selection of covariates in nutritional epidemiology studies.',
    url: 'https://doi.org/10.1093/cdn/nzz104',
  },
  {
    citation: 'Zworth M, Selick A, Durbin J, et al. Improving care for adults with developmental disabilities. Can Fam Physician. 2019.',
    title: 'Improving care for adults with developmental disabilities.',
    url: 'https://www.cfp.ca/content/65/suppl_1/s8.full',
  },
]

const foamEntries = [
  {
    citation: 'Zworth M. Law and Disorder: Navigating Medicolegal Issues in Emergency Medicine. EMOttawa Blog. April 2025.',
    title: 'Law and Disorder: Navigating Medicolegal Issues in Emergency Medicine.',
    url: 'https://emottawablog.com/2025/04/law-and-disorder-navigating-medicolegal-issues-part-1/',
  },
  {
    citation: 'Zworth M. Invasive Group A Strep Infections: A Primer for ED Physicians. EMOttawa Blog. July 2024.',
    title: 'Invasive Group A Strep Infections: A Primer for ED Physicians.',
    url: 'https://emottawablog.com/2024/07/invasive-group-a-strep-igas-its-backkkk-part-1/',
  },
  {
    citation: 'Bhat C, Zworth M. Topical NSAIDs for Acute Pain Management. EMOttawa Blog. May 2023.',
    title: 'Topical NSAIDs for Acute Pain Management.',
    url: 'https://emottawablog.com/2023/05/topical-nsaids-for-acute-pain-management/',
  },
  {
    citation: 'Zworth M, Seliga R. Buprenorphine: A Guide for ED Providers. EMOttawa Blog. March 2023.',
    title: 'Buprenorphine: A Guide for ED Providers.',
    url: 'https://emottawablog.com/2023/03/buprenorphine-a-guide-for-ed-providers/',
  },
  {
    citation: 'Reviewer. ED Toolkit for Opioid Use Disorder. METAPHI. 2021.',
    title: 'ED Toolkit for Opioid Use Disorder.',
    url: 'https://www.metaphi.ca/toolkits/#ED-OUD',
  },
]

function CitationEntry({
  citation,
  title,
  url,
}: {
  citation: string
  title: string
  url: string
}) {
  const beforeTitle = citation.substring(0, citation.indexOf(title))
  const afterTitle = citation.substring(citation.indexOf(title) + title.length)

  return (
    <li className="py-3 border-b border-gray-100 last:border-0 text-[15px] leading-relaxed text-gray-700">
      {beforeTitle}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C0392B] hover:underline font-medium"
      >
        {title}
      </a>
      {afterTitle}
    </li>
  )
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Bio section */}
      <div className="flex flex-col sm:flex-row gap-8 mb-14">
        <div className="flex-shrink-0">
          {/* Circular MZ avatar — placeholder until real headshot */}
          <div className="w-28 h-28 rounded-full bg-[#C0392B] flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-2xl tracking-tight select-none">MZ</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] mb-4">Max Zworth</h1>
          <p className="text-[17px] text-gray-600 leading-relaxed">
            Max Zworth is an Emergency Physician{' '}
            <span className="em-badge align-middle" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', verticalAlign: 'middle' }}>EM</span>{' '}
            in Toronto, Ontario. He completed medical school
            at McMaster University and his five-year Royal College Emergency Medicine residency at
            the University of Ottawa. Zworth Reading is his effort to make keeping up with the EM
            literature less overwhelming — and more useful — for practicing physicians.
          </p>
        </div>
      </div>

      {/* Selected Publications */}
      <section className="mb-12">
        <h2 className="section-heading mb-6">Selected Publications</h2>
        <ul className="divide-y divide-gray-100">
          {publications.map((pub, i) => (
            <CitationEntry key={i} {...pub} />
          ))}
        </ul>
      </section>

      {/* FOAM & Medical Education */}
      <section>
        <h2 className="section-heading mb-6">FOAM &amp; Medical Education</h2>
        <ul className="divide-y divide-gray-100">
          {foamEntries.map((entry, i) => (
            <CitationEntry key={i} {...entry} />
          ))}
        </ul>
      </section>
    </div>
  )
}
