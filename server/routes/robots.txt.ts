export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://alexmercer.dev'

  setHeader(event, 'Content-Type', 'text/plain')

  return `User-agent: *
Allow: /

# Disallow admin-specific paths
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`
})
