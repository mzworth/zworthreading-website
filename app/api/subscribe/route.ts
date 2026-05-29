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

  const headers = {
    'Content-Type': 'application/json',
    'X-Kit-Api-Key': apiKey,
  }

  // Step 1: Create (upsert) the subscriber
  const createRes = await fetch('https://api.kit.com/v4/subscribers', {
    method: 'POST',
    headers,
    body: JSON.stringify({ email_address: email }),
  })

  if (!createRes.ok && createRes.status !== 201) {
    const errorText = await createRes.text().catch(() => '')
    console.error('Kit create subscriber error', createRes.status, errorText)
    return NextResponse.json({ success: false }, { status: 502 })
  }

  // Step 2: Add the subscriber to the form
  const formRes = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email_address: email }),
  })

  if (formRes.ok || formRes.status === 201) {
    return NextResponse.json({ success: true })
  }

  const errorText = await formRes.text().catch(() => '')
  console.error('Kit add to form error', formRes.status, errorText)
  return NextResponse.json({ success: false }, { status: 502 })
}
