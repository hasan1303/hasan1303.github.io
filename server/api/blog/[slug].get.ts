import { blogPosts } from '~/utils/data'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const config = useRuntimeConfig()

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  // =============================================
  // STRAPI CMS Integration
  // =============================================
  if (config.strapiUrl && config.strapiToken) {
    try {
      const data = await $fetch<{
        data: Array<{ id: number; attributes: Record<string, unknown> }>
      }>(
        `${config.strapiUrl}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers: { Authorization: `Bearer ${config.strapiToken}` },
        }
      )

      const post = data.data[0]
      if (post) {
        return { post: { id: post.id, ...post.attributes }, source: 'strapi' }
      }
    } catch (err) {
      console.warn('[API/blog/:slug] Strapi fetch failed:', err)
    }
  }

  // Fallback: local data
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  return { post, source: 'local' }
})
