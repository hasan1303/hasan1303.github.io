import { projects } from '~/utils/data'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // =============================================
  // STRAPI CMS Integration
  // =============================================
  if (config.strapiUrl && config.strapiToken) {
    try {
      const params = new URLSearchParams({
        'populate': 'technologies',
        'sort': 'featured:desc,createdAt:desc',
        'pagination[pageSize]': '50',
        ...(query.tech ? { 'filters[technologies][name][$containsi]': String(query.tech) } : {}),
        ...(query.featured ? { 'filters[featured][$eq]': 'true' } : {}),
      })

      const data = await $fetch<{
        data: Array<{ id: number; attributes: Record<string, unknown> }>
      }>(`${config.strapiUrl}/api/projects?${params}`, {
        headers: { Authorization: `Bearer ${config.strapiToken}` },
      })

      return {
        projects: data.data.map(({ id, attributes }) => ({ id, ...attributes })),
        source: 'strapi',
      }
    } catch (err) {
      console.warn('[API/projects] Strapi fetch failed, using local data:', err)
    }
  }

  // Fallback: local data
  let result = [...projects]
  if (query.featured) result = result.filter(p => p.featured)
  if (query.tech && query.tech !== 'all') {
    const tech = String(query.tech).toLowerCase()
    result = result.filter(p =>
      p.technologies.some(t => t.toLowerCase().includes(tech)) ||
      p.status.includes(tech)
    )
  }

  return { projects: result, source: 'local' }
})
