// Server-side EmailJS sender (REST API with private-key access token).
// Requires "Allow EmailJS API for non-browser applications" enabled in
// EmailJS Account → Security.

export async function sendEmail(templateParams) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_BOOKING_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return { sent: false, reason: 'EmailJS not fully configured (missing EMAILJS_BOOKING_TEMPLATE_ID?)' };
  }

  const body = JSON.stringify({
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey,
    template_params: templateParams,
  });

  // EmailJS' Gmail integration intermittently 412s ("Invalid Cc header") and can
  // rate-limit; retry transient failures a couple of times before giving up.
  const TRANSIENT = new Set([408, 412, 425, 429, 500, 502, 503, 504]);
  let lastReason = 'EmailJS: unknown error';
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (res.ok) return { sent: true };

    const text = await res.text().catch(() => '');
    lastReason = `EmailJS ${res.status}: ${text.slice(0, 300)}`;
    if (!TRANSIENT.has(res.status) || attempt === 3) return { sent: false, reason: lastReason };
    await new Promise((r) => setTimeout(r, 500 * attempt));
  }
  return { sent: false, reason: lastReason };
}
