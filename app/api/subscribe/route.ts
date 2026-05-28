import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 })
  }

  const beehiivRes = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: false,
      }),
    }
  )

  if (beehiivRes.ok || beehiivRes.status === 201) {
    return NextResponse.json({ success: true })
  }

  const errorText = await beehiivRes.text().catch(() => '')
  console.error('Beehiiv subscribe error', beehiivRes.status, errorText)
  return NextResponse.json({ success: false }, { status: 502 })
}
