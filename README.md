# Zworth Reading

**What's worth reading in Emergency Medicine, this week.**

A Next.js 14 website for the Zworth Reading newsletter.

---

## Running locally

```bash
npm install
cp .env.local.example .env.local
# Fill in your env variables (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding a new edition

1. Open `data/archive.json`.
2. Add a new object at the **top** of the array (most recent first):

```json
{
  "slug": "issue-3",
  "issueNumber": 3,
  "weekOf": "May 25, 2025",
  "highlightTitle": "Your Highlight Title Here",
  "highlightSummary": "One-line summary for the archive list.",
  "sections": [
    {
      "id": "highlight",
      "emoji": "⭐",
      "title": "Highlight of the Week",
      "content": "<p>HTML content here.</p>"
    },
    {
      "id": "practice-changing",
      "emoji": "🧬",
      "title": "Practice-Changing EM",
      "content": "<p>HTML content here.</p>"
    },
    {
      "id": "foam-radar",
      "emoji": "📡",
      "title": "FOAM Radar",
      "content": "<p>HTML content here.</p>"
    },
    {
      "id": "adjacent-specialties",
      "emoji": "🔗",
      "title": "Adjacent Specialties",
      "content": "<p>HTML content here.</p>"
    },
    {
      "id": "major-journals",
      "emoji": "🌐",
      "title": "Major Journals Scan",
      "content": "<ul><li><strong>NEJM:</strong> ...</li></ul>"
    },
    {
      "id": "methodology-flag",
      "emoji": "⚠️",
      "title": "Methodology Flag",
      "content": "<p>HTML content here.</p>"
    }
  ]
}
```

3. The new issue will automatically appear on the homepage preview, archive page, and at `/archive/issue-3`.

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `SPOTIFY_URL` | Podcast URL on Spotify |
| `APPLE_PODCASTS_URL` | Podcast URL on Apple Podcasts |
| `YOUTUBE_URL` | Podcast URL on YouTube |

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add the four variables above.
4. Deploy. Vercel auto-detects Next.js — no build config needed.

Future deploys happen automatically on every push to `main`.
