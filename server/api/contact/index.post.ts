import type { ContactForm } from '~/types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ContactForm>(event)

  // Validate
  if (!body.firstName || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address',
    })
  }

  // =============================================
  // OPTION 1: Send via Resend (recommended)
  // =============================================
  if (config.resendApiKey) {
    try {
      await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          from: config.emailFrom || 'contact@alexmercer.dev',
          to: [config.emailTo || 'hello@alexmercer.dev'],
          reply_to: body.email,
          subject: body.subject
            ? `[Portfolio] ${body.subject}`
            : `[Portfolio] New message from ${body.firstName} ${body.lastName}`,
          html: `
            <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #111; color: #e8e8f0; border-radius: 12px;">
              <h2 style="color: #a394ff; margin: 0 0 24px;">New contact form submission</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9090a8; width: 120px;">Name</td>
                  <td style="padding: 8px 0;">${body.firstName} ${body.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9090a8;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${body.email}" style="color: #a394ff;">${body.email}</a></td>
                </tr>
                ${body.subject ? `<tr><td style="padding: 8px 0; color: #9090a8;">Subject</td><td style="padding: 8px 0;">${body.subject}</td></tr>` : ''}
              </table>
              
              <hr style="border: 1px solid #1c1c28; margin: 24px 0;">
              
              <h3 style="color: #9090a8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Message</h3>
              <div style="background: #1c1c28; padding: 16px; border-radius: 8px; line-height: 1.7;">
                ${body.message.replace(/\n/g, '<br>')}
              </div>
              
              <p style="color: #5a5a72; font-size: 12px; margin-top: 24px;">
                Sent from alexmercer.dev contact form
              </p>
            </div>
          `,
        },
      })
    } catch (err) {
      console.error('Resend error:', err)
      throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })
    }
  }

  // =============================================
  // OPTION 2: Store in Strapi CMS
  // =============================================
  // if (config.strapiUrl && config.strapiToken) {
  //   await $fetch(`${config.strapiUrl}/api/contact-submissions`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${config.strapiToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: {
  //       data: {
  //         firstName: body.firstName,
  //         lastName: body.lastName,
  //         email: body.email,
  //         subject: body.subject,
  //         message: body.message,
  //         submittedAt: new Date().toISOString(),
  //       },
  //     },
  //   })
  // }

  return {
    success: true,
    message: 'Message received! I\'ll get back to you within 24 hours.',
  }
})
