import { blogPosts } from '~/utils/data'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // =============================================
  // STRAPI CMS Integration
  // =============================================
  if (config.strapiUrl && config.strapiToken) {
    try {
      const params = new URLSearchParams({
        'populate': 'author,cover',
        'sort': 'publishedAt:desc',
        'pagination[pageSize]': String(query.limit || 20),
        ...(query.category ? { 'filters[category][$eq]': String(query.category) } : {}),
        ...(query.search ? { 'filters[$or][0][title][$containsi]': String(query.search) } : {}),
      })

      const data = await $fetch<{
        data: Array<{
          id: number
          attributes: {
            slug: string
            title: string
            excerpt: string
            category: string
            tags: string[]
            publishedAt: string
            readTime: number
            featured: boolean
            coverEmoji: string
            coverColor: string
          }
        }>
      }>(`${config.strapiUrl}/api/blog-posts?${params}`, {
        headers: {
          Authorization: `Bearer ${config.strapiToken}`,
        },
      })

      return {
        posts: data.data.map(({ id, attributes }) => ({
          id,
          ...attributes,
          author: {
            name: 'Alex Mercer',
            initials: 'AM',
            title: 'Senior Full-Stack Engineer',
          },
        })),
        source: 'strapi',
      }
    } catch (err) {
      console.warn('[API/blog] Strapi fetch failed, falling back to local data:', err)
    }
  }

  // Fallback: return local static data
  let posts = [...blogPosts]

  if (query.category && query.category !== 'all') {
    posts = posts.filter(p => p.category === query.category)
  }

  if (query.search) {
    const q = String(query.search).toLowerCase()
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  return {
    posts,
    source: 'local',
  }
})
