import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = (process.env.RESEND_API_KEY || '').trim();
const RESEND_FROM_EMAIL = (process.env.RESEND_FROM_EMAIL || 'ELTECH Capital <info@eltechcapital.com>').trim();
const CONTACT_TEAM_EMAIL = (process.env.CONTACT_TEAM_EMAIL || 'info@eltechcapital.com').trim();

interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

async function sendResendEmail(payload: Record<string, unknown>) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error: ${errorText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing in server runtime');
    }

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const safeMessage = data.message?.trim() || 'No message provided';
    const safePhone = data.phone?.trim() || 'Not provided';

    // 1) Confirmation email to submitter
    const confirmationHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; background:#1a1f26; border:1px solid #d4a33b; border-radius:12px; overflow:hidden; color:#f4f3f1;">
        <div style="padding:28px 24px 18px; text-align:center; background:#14181f;">
          <img src="https://eltech-capital-website.vercel.app/images/CLEAR%20Horizontal%20Banner.png" alt="ELTECH Capital" width="260" style="max-width:260px; height:auto; display:block; margin:0 auto;" />
        </div>
        <div style="height:1px; background:#d4a33b;"></div>
        <div style="padding:26px 24px; text-align:center;">
          <h2 style="margin:0 0 12px; color:#f4f3f1;">Message Received</h2>
          <p style="margin:0 0 10px; color:#c7c7c7; line-height:1.6;">Hi ${data.firstName}, thank you for contacting ELTECH Capital.</p>
          <p style="margin:0 0 16px; color:#c7c7c7; line-height:1.6;">We received your submission and will respond within <strong style="color:#f4f3f1;">3 business days</strong>.</p>
          <p style="margin:0; color:#9a9a9a; font-size:13px;">If urgent, email us at <a href="mailto:${CONTACT_TEAM_EMAIL}" style="color:#d4a33b; text-decoration:none;">${CONTACT_TEAM_EMAIL}</a>.</p>
        </div>
      </div>
    `;

    // 2) Internal notification email to ELTECH team inbox
    const internalHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color:#111;">
        <h2 style="margin-bottom:16px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong><br/>${safeMessage.replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    await Promise.all([
      sendResendEmail({
        from: RESEND_FROM_EMAIL,
        to: [data.email],
        subject: 'We received your message — ELTECH Capital',
        html: confirmationHtml,
        reply_to: CONTACT_TEAM_EMAIL,
      }),
      sendResendEmail({
        from: RESEND_FROM_EMAIL,
        to: [CONTACT_TEAM_EMAIL],
        subject: `New contact form submission — ${fullName}`,
        html: internalHtml,
        reply_to: data.email,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
