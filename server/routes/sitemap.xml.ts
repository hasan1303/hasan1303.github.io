import { blogPosts, projects } from '~/utils/data'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://hasan1303.github.io'
  const now = new Date().toISOString()

  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'yearly' },
  ]

  const blogRoutes = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.updatedAt || post.publishedAt,
  }))

  const projectRoutes = projects.map(project => ({
    url: `/projects/${project.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: now,
  }))

  const allRoutes = [...staticRoutes, ...blogRoutes, ...projectRoutes]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => `  <url>
    <loc>${baseUrl}${r.url}</loc>
    <lastmod>${(r as any).lastmod || now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return xml
})
