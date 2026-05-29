import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.KIT_API_KEY
  const formId = process.env.KIT_FORM_ID

  if (!apiKey || !formId) {
    return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 })
  }

  const kitRes = await fetch(
    `https://api.kit.com/v4/forms/${formId}/subscribers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email_address: email }),
    }
  )

  if (kitRes.ok || kitRes.status === 201) {
    return NextResponse.json({ success: true })
  }

  const errorText = await kitRes.text().catch(() => '')
  console.error('Kit subscribe error', kitRes.status, errorText)
  return NextResponse.json({ success: false }, { status: 502 })
}
