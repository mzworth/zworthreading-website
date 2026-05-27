import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast | Zworth Reading',
  description: 'AI-generated audio summaries of the Zworth Reading newsletter. Listen on Spotify, Apple Podcasts, or YouTube.',
}

export default function PodcastPage() {
  const spotifyUrl = process.env.SPOTIFY_URL || '#'
  const appleUrl = process.env.APPLE_PODCASTS_URL || '#'
  const youtubeUrl = process.env.YOUTUBE_URL || '#'

  const platforms = [
    {
      name: 'Spotify',
      url: spotifyUrl,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.237-.433.101-.862-.17-.963-.601-.101-.434.17-.862.601-.963 4.91-1.121 9.13-.64 12.541 1.431.38.249.49.73.244 1.129zm1.47-3.29c-.301.461-.939.601-1.4.301-3.461-2.129-8.732-2.75-12.822-1.499-.521.16-1.069-.14-1.229-.66-.16-.52.141-1.07.66-1.231 4.671-1.42 10.471-.731 14.451 1.71.46.3.6.94.34 1.379zm.127-3.43c-4.16-2.469-11.03-2.698-15.001-1.492-.637.194-1.312-.168-1.505-.805-.194-.637.168-1.312.805-1.505 4.56-1.385 12.14-1.118 16.939 1.727.575.34.766 1.083.426 1.659-.34.574-1.084.764-1.664.416z"/>
        </svg>
      ),
      color: '#1DB954',
      textColor: 'text-white',
      bg: 'bg-[#1DB954] hover:bg-[#1aa34a]',
    },
    {
      name: 'Apple Podcasts',
      url: appleUrl,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c2.619 0 4.714 2.095 4.714 4.714 0 1.89-1.119 3.524-2.746 4.275.177.658.284 1.334.284 2.011 0 .933-.201 1.815-.534 2.625H10.28a6.728 6.728 0 01-.534-2.625c0-.677.107-1.353.284-2.011-1.627-.751-2.746-2.385-2.746-4.275C7.284 6.595 9.379 4.5 12 4.5zm0 1.5c-1.783 0-3.214 1.431-3.214 3.214S10.217 12.428 12 12.428s3.214-1.431 3.214-3.214S13.783 6 12 6z"/>
        </svg>
      ),
      color: '#9933CC',
      textColor: 'text-white',
      bg: 'bg-[#9933CC] hover:bg-[#8822bb]',
    },
    {
      name: 'YouTube',
      url: youtubeUrl,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: '#FF0000',
      textColor: 'text-white',
      bg: 'bg-[#FF0000] hover:bg-[#e60000]',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-3">The Zworth Reading Podcast</h1>
        <p className="text-lg text-gray-500 mb-10">
          AI-generated audio summaries of each week&rsquo;s newsletter. Listen on your platform of choice.
        </p>

        <div className="space-y-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 ${platform.bg} ${platform.textColor} rounded-xl px-6 py-4 font-semibold text-base transition-colors`}
            >
              {platform.icon}
              <span>Listen on {platform.name}</span>
              <svg className="w-4 h-4 ml-auto opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
