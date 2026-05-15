/**
 * Dynamic OG image generator
 * GET /og?title=...&desc=...&type=post|project|page
 *
 * Returns an SVG that browsers and social crawlers accept as og:image.
 * For production, replace with @vercel/og or satori for PNG output.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const title = String(query.title || 'Hasan — Frontend Developer').slice(0, 80)
  const desc = String(query.desc || 'Building with Vue.js, Nuxt 3, and Tailwind CSS').slice(0, 120)
  const type = String(query.type || 'page')

  const accent = '#7b6ef6'
  const cyan = '#22d3ee'
  const bg = '#0a0a0f'
  const surface = '#1c1c28'
  const text = '#e8e8f0'
  const text2 = '#9090a8'
  const border = 'rgba(255,255,255,0.1)'

  const typeLabel: Record<string, string> = {
    post: 'Blog Post',
    project: 'Project',
    page: 'Portfolio',
  }

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${cyan}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${bg}"/>

  <!-- Grid pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Glow -->
  <ellipse cx="300" cy="200" rx="400" ry="300" fill="${accent}" fill-opacity="0.06"/>
  <ellipse cx="1000" cy="500" rx="300" ry="200" fill="${cyan}" fill-opacity="0.04"/>

  <!-- Card -->
  <rect x="60" y="60" width="1080" height="510" rx="20" fill="${surface}" fill-opacity="0.7" stroke="${border}" stroke-width="1"/>

  <!-- Top accent line -->
  <rect x="60" y="60" width="1080" height="4" rx="2" fill="url(#accentGrad)"/>

  <!-- Type badge -->
  <rect x="100" y="130" width="${typeLabel[type].length * 10 + 32}" height="32" rx="16" fill="${accent}" fill-opacity="0.15"/>
  <rect x="100" y="130" width="${typeLabel[type].length * 10 + 32}" height="32" rx="16" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="${116}" y="151" font-family="monospace" font-size="13" fill="${accent}">${typeLabel[type]}</text>

  <!-- Title -->
  <text x="100" y="240" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="${title.length > 40 ? 38 : 48}" font-weight="800" fill="${text}" letter-spacing="-1">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>

  <!-- Description -->
  <text x="100" y="305" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" fill="${text2}">${desc.slice(0, 70).replace(/&/g, '&amp;')}</text>
  ${desc.length > 70 ? `<text x="100" y="335" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" fill="${text2}">${desc.slice(70, 140).replace(/&/g, '&amp;')}</text>` : ''}

  <!-- Divider -->
  <line x1="100" y1="420" x2="1100" y2="420" stroke="${border}" stroke-width="1"/>

  <!-- Author avatar circle -->
  <circle cx="130" cy="480" r="28" fill="${accent}" fill-opacity="0.2"/>
  <circle cx="130" cy="480" r="28" fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>
  <text x="130" y="487" font-family="monospace" font-size="16" font-weight="700" fill="${accent}" text-anchor="middle">H</text>

  <!-- Author info -->
  <text x="172" y="473" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="600" fill="${text}">Hasan</text>
  <text x="172" y="494" font-family="monospace" font-size="13" fill="${text2}">github.com/hasan1303</text>

  <!-- Tech tags -->
  <rect x="800" y="455" width="80" height="26" rx="13" fill="rgba(123,110,246,0.1)" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="840" y="473" font-family="monospace" font-size="12" fill="${accent}" text-anchor="middle">Vue.js</text>

  <rect x="892" y="455" width="68" height="26" rx="13" fill="rgba(123,110,246,0.1)" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="926" y="473" font-family="monospace" font-size="12" fill="${accent}" text-anchor="middle">Nuxt 3</text>

  <rect x="972" y="455" width="128" height="26" rx="13" fill="rgba(34,211,238,0.1)" stroke="${cyan}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="1036" y="473" font-family="monospace" font-size="12" fill="${cyan}" text-anchor="middle">Tailwind CSS</text>
</svg>`

  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')
  return svg
})
