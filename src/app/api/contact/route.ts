import { NextRequest, NextResponse } from 'next/server';

// EmailJS configuration
// Sign up at https://www.emailjs.com/ and create:
// 1. Email Service (for info@eltechcapital.com)
// 2. Email Template
// 3. Get your Service ID, Template ID, and Public Key

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || '';
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || '';

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
        throw new Error('EMAILJS_PRIVATE_KEY is not available in server runtime (Vercel env mismatch)');
      }

      const templateParams = {
        from_first_name: data.firstName,
        from_last_name: data.lastName,
        from_phone: data.phone || 'Not provided',
        from_email: data.email,
        message: data.message || 'No message provided',
        to_email: 'info@eltechcapital.com',
      };

      const payloadCandidates = [
        // EmailJS REST format (most common)
        {
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          accessToken: EMAILJS_PRIVATE_KEY,
          template_params: templateParams,
        },
        // Alternate strict-mode key names used in some setups
        {
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          public_key: EMAILJS_PUBLIC_KEY,
          private_key: EMAILJS_PRIVATE_KEY,
          template_params: templateParams,
        },
      ];

      let lastErrorText = 'Unknown EmailJS error';
      let sent = false;

      for (const payload of payloadCandidates) {
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (emailjsResponse.ok) {
          sent = true;
          break;
        }

        lastErrorText = await emailjsResponse.text();
      }

      if (!sent) {
        console.error('EmailJS error:', lastErrorText);
        throw new Error(`Failed to send email via EmailJS: ${lastErrorText}`);
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
