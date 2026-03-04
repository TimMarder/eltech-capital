import { NextRequest, NextResponse } from 'next/server';

// EmailJS configuration
const EMAILJS_SERVICE_ID = (process.env.EMAILJS_SERVICE_ID || '').trim();
const EMAILJS_TEMPLATE_ID = (process.env.EMAILJS_TEMPLATE_ID || '').trim();
const EMAILJS_PUBLIC_KEY = (process.env.EMAILJS_PUBLIC_KEY || '').trim();
const EMAILJS_PRIVATE_KEY = (process.env.EMAILJS_PRIVATE_KEY || '').trim();

interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // If EmailJS is configured, send email
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      if (!EMAILJS_PRIVATE_KEY) {
        throw new Error('EMAILJS_PRIVATE_KEY is missing in server runtime');
      }

      const templateParams = {
        from_first_name: data.firstName,
        from_last_name: data.lastName,
        from_phone: data.phone || 'Not provided',
        from_email: data.email,
        message: data.message || 'No message provided',
        to_email: 'info@eltechcapital.com',
      };

      // Strict-mode compatible payload: send both key naming variants
      // to satisfy different EmailJS account/API configurations.
      const strictPayload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        public_key: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        private_key: EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      };

      const legacyPayload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      };

      let emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(strictPayload),
      });

      // fallback to legacy payload
      if (!emailjsResponse.ok) {
        emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(legacyPayload),
        });
      }

      if (!emailjsResponse.ok) {
        const errorText = await emailjsResponse.text();
        console.error('EmailJS error:', errorText);
        throw new Error(
          `Failed to send email via EmailJS: ${errorText} | env(service=${!!EMAILJS_SERVICE_ID}, template=${!!EMAILJS_TEMPLATE_ID}, public=${!!EMAILJS_PUBLIC_KEY}, private=${!!EMAILJS_PRIVATE_KEY})`
        );
      }
    } else {
      // EmailJS not configured - just log the submission
      console.log('Contact form submission (EmailJS not configured):', {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        message: data.message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
