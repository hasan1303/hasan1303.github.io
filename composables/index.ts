// ===== useScroll =====
export function useScroll() {
  const isScrolled = ref(false)
  const scrollY = ref(0)

  if (import.meta.client) {
    const handleScroll = () => {
      scrollY.value = window.scrollY
      isScrolled.value = window.scrollY > 20
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    })
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
  }

  return { isScrolled, scrollY }
}

// ===== useReadingProgress =====
export function useReadingProgress() {
  const progress = ref(0)

  if (import.meta.client) {
    const handleScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      progress.value = total > 0 ? (el.scrollTop / total) * 100 : 0
    }
    onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
  }

  return { progress }
}

// ===== useSEO — with dynamic OG image =====
export function useSEO(options: {
  title?: string
  description?: string
  ogImage?: string
  type?: 'page' | 'post' | 'project'
  canonical?: string
}) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string
  const route = useRoute()

  const fullTitle = options.title
    ? `${options.title} — Hasan`
    : 'Hasan — Frontend Developer'

  const description = options.description
    || 'Frontend Developer specializing in Vue.js. Building clean, performant web apps.'

  // Build OG image URL — use dynamic SVG generator
  const ogParams = new URLSearchParams({
    title: options.title || 'Hasan',
    desc: description.slice(0, 100),
    type: options.type || 'page',
  })
  const ogImage = options.ogImage
    || `${siteUrl}/og?${ogParams.toString()}`

  const canonical = options.canonical || `${siteUrl}${route.path}`

  useHead({
    title: options.title || 'Hasan — Frontend Developer',
    meta: [
      { name: 'description', content: description },
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      // Twitter
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ],
    link: [
      { rel: 'canonical', href: canonical },
    ],
  })
}

// ===== useStrapi (optional CMS integration) =====
export function useStrapi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.strapiUrl as string

  async function fetchMany<T>(endpoint: string, params?: Record<string, string>): Promise<T[]> {
    try {
      const query = new URLSearchParams({ populate: '*', ...params }).toString()
      const data = await $fetch<{ data: Array<{ id: number; attributes: T }> }>(
        `${baseUrl}/api/${endpoint}?${query}`
      )
      return data?.data?.map(item => item.attributes) ?? []
    } catch {
      return []
    }
  }

  return { fetchMany }
}
