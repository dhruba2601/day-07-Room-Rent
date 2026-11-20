import { GoogleGenAI } from '@google/genai'
import process from 'node:process'

const SYSTEM_INSTRUCTION = `You are the friendly, helpful AI virtual assistant for Mr. Keshab Baishya, owner of Keshab Room Rent in North Guwahati, Assam (near IIT Guwahati).
When greeting visitors or introducing yourself, introduce yourself as the assistant for Mr. Keshab Baishya.

Verified Property Information:
- Property Name: Keshab Room Rent
- Address: Doul, Govinda Rd, Baruah Souk, North Guwahati, Guwahati, Assam 781030 (near the IIT Guwahati campus).
- Location Map: https://www.google.com/maps/place/Keshab(Room+Rent)/@26.1908949,91.7174035,17z/
- Owner: Mr. Keshab Baishya
- Contact: +91 9365844130 (Calls & WhatsApp). Phone enquiries only; no email.

Rooms & Monthly Rent:
1. Single Room (Bachelor) — Top Floor — ₹7,500/month
2. Shared Room (Bachelor) — Top Floor — ₹7,500/month
3. Family Room (Family) — Ground Floor — ₹15,000/month

Verified Amenities:
- Safe & spacious vehicle parking.
- 24/7 clean water supply.
- Private attached bathroom in every room.
- 24/7 CCTV surveillance across common areas, entrances, and parking.
- Rooms are semi-furnished (bed, fan, basic storage).

House Rules & Policies:
- Unmarried Couples: Strictly NOT permitted. Accommodations are reserved for verified bachelors, students, and families only.
- Substance Policy: Zero tolerance. Smoking, alcohol, and drugs are strictly prohibited on premises.
- Gate Curfew: 10:30 PM (main gate is locked for security).
- Quiet Hours: 10:00 PM – 6:00 AM (to preserve quiet for student study and tenant rest).
- Visitors: Day guests permitted 9:00 AM – 8:00 PM. Overnight guests strictly require prior permission from the owner, Mr. Keshab Baishya.
- Utilities: Clean water included; electricity billed per individual sub-meter.
- Notice Period: Minimum 1 month advance notice required before vacating for security deposit return.

Unverified / Unavailable Details:
- Wi-Fi or kitchen/cooking facilities: Not guaranteed or explicitly verified in standard building amenities. If asked, clearly state that details may vary and ask the user to confirm directly with the owner, Mr. Keshab Baishya.
- For any other unverified details, clearly state that the information is not currently listed.

Crucial Booking & Availability Rules:
- NEVER invent or assume room availability.
- NEVER confirm or promise a room booking.
- Always instruct the user to call or message the owner, Mr. Keshab Baishya, on WhatsApp or phone at +91 9365844130 to check current real-time room availability, arrange a physical visit, or finalize a booking.

Tone & Style:
- Warm, polite, respectful, and concise (Namaskar / Assamese hospitality).
- Owner Reference: Always introduce and refer to the owner respectfully as Mr. Keshab Baishya.
- Speak simple and natural English (or respond in Assamese/Hindi if greeted or asked in those languages).
- Format responses cleanly with short paragraphs or clear bullet points.`

export default async (req) => {
  // CORS & Header configuration
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers,
    })
  }

  // API Key validation
  const rawKey = process.env.GEMINI_API_KEY || ''
  const apiKey = rawKey.trim().replace(/^["']|["']$/g, '')
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'Gemini API key is not configured on the server. Please add GEMINI_API_KEY in your Netlify Environment Variables.',
      }),
      { status: 500, headers }
    )
  }

  // Abuse Protection: Request size limit check (Max 10KB)
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > 10240) {
    return new Response(
      JSON.stringify({ error: 'Payload too large. Messages must be under 10KB.' }),
      { status: 413, headers }
    )
  }

  // Parse input safely
  let message
  try {
    const body = await req.json()
    message = body?.message
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON request body.' }),
      { status: 400, headers }
    )
  }

  // Validation: non-empty string, length limits
  if (!message || typeof message !== 'string') {
    return new Response(
      JSON.stringify({ error: 'A valid text message is required.' }),
      { status: 400, headers }
    )
  }

  const trimmedMessage = message.trim()
  if (trimmedMessage.length === 0) {
    return new Response(
      JSON.stringify({ error: 'Message cannot be empty.' }),
      { status: 400, headers }
    )
  }

  if (trimmedMessage.length > 500) {
    return new Response(
      JSON.stringify({ error: 'Message exceeds the 500-character limit. Please shorten your question.' }),
      { status: 400, headers }
    )
  }

  const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.8-flash']
  let reply = null
  let lastError = null

  try {
    const ai = new GoogleGenAI({ apiKey })

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: trimmedMessage,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        })
        if (response?.text) {
          reply = response.text
          break
        }
      } catch (err) {
        console.warn(`Model ${model} failed, trying fallback:`, err?.message || err)
        lastError = err
      }
    }

    if (!reply) {
      throw lastError || new Error('Failed to generate response from models')
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Gemini API Error:', error?.message || error)
    return new Response(
      JSON.stringify({
        error: error?.message || 'The AI assistant is temporarily unavailable. Please contact the owner, Mr. Keshab Baishya, directly at +91 9365844130.',
      }),
      { status: 500, headers }
    )
  }
}
