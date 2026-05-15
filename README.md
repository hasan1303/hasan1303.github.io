# Alex Mercer — Developer Portfolio + Technical Blog

A production-ready **Developer Portfolio + Technical Blog** built with **Nuxt 3**, **Tailwind CSS**, **Pinia**, and full **Strapi CMS** integration support.

## ✨ Features

- **7 Pages** — Home, About, Projects, Project Detail, Blog, Blog Post, Contact
- **Strapi CMS Integration** — Manage all content without touching code
- **Dark / Light Mode** — System-aware toggle with localStorage persistence
- **SEO Optimized** — Dynamic meta tags, Open Graph, Twitter Cards, sitemap.xml, robots.txt, canonical URLs
- **TypeScript** — Strict typing throughout
- **Hybrid Rendering** — SSR + SSG + ISR per route
- **Nuxt Content** — Markdown blog posts with syntax highlighting
- **Contact Form** — Validation + Resend email integration
- **Animations** — Page transitions, scroll reveals, marquee
- **Performance** — Image optimization, lazy loading, code splitting
- **Fully Responsive** — Mobile-first, looks great on every device

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3 |
| Styling | Tailwind CSS |
| State | Pinia |
| CMS | Strapi (optional) |
| Content | Nuxt Content (Markdown) |
| Auth / DB | Supabase (optional) |
| Email | Resend |
| Images | Nuxt Image |
| Language | TypeScript |
| Utilities | VueUse |

## 📁 Project Structure

```
alex-mercer-portfolio/
├── assets/
│   └── css/
│       └── tailwind.css        # Global styles & design tokens
├── components/
│   ├── blog/
│   │   └── BlogCard.vue        # Blog post card
│   ├── home/
│   │   ├── HomeHero.vue        # Hero section
│   │   ├── HomeTechStrip.vue   # Scrolling tech marquee
│   │   ├── HomeSkills.vue      # Skills grid
│   │   ├── HomeExperience.vue  # Timeline
│   │   ├── HomeFeaturedProjects.vue
│   │   └── HomeCtaBanner.vue   # CTA section
│   ├── layout/
│   │   ├── AppNavbar.vue       # Fixed navigation
│   │   ├── AppFooter.vue       # Site footer
│   │   └── AppToast.vue        # Toast notifications
│   ├── projects/
│   │   └── ProjectsCard.vue    # Project card
│   └── ui/
│       └── UiSkillCard.vue     # Reusable skill card
├── composables/
│   └── index.ts                # useScroll, useSEO, useReadingProgress, useStrapi
├── content/
│   └── blog/                   # Markdown blog posts (Nuxt Content)
│       └── building-1m-rps-api-go.md
├── layouts/
│   └── default.vue             # Main layout with scroll reveal
├── pages/
│   ├── index.vue               # Home (/)
│   ├── about.vue               # About (/about)
│   ├── contact.vue             # Contact (/contact)
│   ├── blog/
│   │   ├── index.vue           # Blog listing (/blog)
│   │   └── [slug].vue          # Blog post (/blog/:slug)
│   └── projects/
│       ├── index.vue           # Projects listing (/projects)
│       └── [slug].vue          # Project detail (/projects/:slug)
├── server/
│   ├── api/
│   │   ├── blog/
│   │   │   ├── index.get.ts    # GET /api/blog
│   │   │   └── [slug].get.ts   # GET /api/blog/:slug
│   │   ├── contact/
│   │   │   └── index.post.ts   # POST /api/contact
│   │   └── projects/
│   │       └── index.get.ts    # GET /api/projects
│   └── routes/
│       ├── sitemap.xml.ts      # /sitemap.xml
│       └── robots.txt.ts       # /robots.txt
├── stores/
│   └── toast.ts                # Pinia toast store
├── types/
│   └── index.ts                # TypeScript interfaces
├── utils/
│   └── data.ts                 # Static data (skills, projects, posts, etc.)
├── .env.example                # Environment variables template
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.ts          # Tailwind configuration
└── error.vue                   # Custom error page
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
# Clone or download this project
cd alex-mercer-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔌 Strapi CMS Setup (Optional)

The portfolio works out-of-the-box with local static data. To connect Strapi:

### 1. Create a Strapi project

```bash
npx create-strapi-app@latest my-cms --quickstart
```

### 2. Create Content Types in Strapi Admin

**Blog Post** (`blog-posts`)
| Field | Type | Required |
|-------|------|----------|
| title | Text | ✓ |
| slug | UID (from title) | ✓ |
| excerpt | Text (long) | ✓ |
| content | Rich Text (markdown) | |
| category | Enumeration (backend, frontend, devops, architecture, ai) | ✓ |
| tags | JSON | |
| publishedAt | DateTime | |
| readTime | Integer | |
| featured | Boolean | |
| coverEmoji | Text | |
| coverColor | Text | |

**Project** (`projects`)
| Field | Type | Required |
|-------|------|----------|
| name | Text | ✓ |
| slug | UID (from name) | ✓ |
| description | Text (long) | ✓ |
| technologies | JSON | |
| status | Enumeration | ✓ |
| featured | Boolean | |
| stars | Integer | |
| githubUrl | Text | |
| demoUrl | Text | |
| coverEmoji | Text | |
| period | Text | |
| role | Text | |

### 3. Generate API Token

In Strapi Admin → Settings → API Tokens → Create new token (Full access).

### 4. Set environment variables

```env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-api-token
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

The API routes automatically fall back to local static data if Strapi is unavailable.

## ✉️ Contact Form Setup

### Using Resend (recommended)

1. Sign up at [resend.com](https://resend.com)
2. Add your domain and get an API key
3. Set in `.env`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=contact@yourdomain.com
EMAIL_TO=hello@yourdomain.com
```

## 📝 Adding Blog Posts

### Option A: Markdown files (Nuxt Content)

Create `content/blog/your-post-slug.md`:

```markdown
---
title: Your Post Title
slug: your-post-slug
excerpt: Brief description...
category: backend
tags: [Go, Performance]
publishedAt: 2025-01-15
readTime: 10
featured: false
coverEmoji: 🔩
coverColor: "linear-gradient(135deg, #0a1428, #050910)"
---

Your content here with full **Markdown** support and syntax highlighting.
```

### Option B: Strapi CMS

Log in to your Strapi admin panel and create posts through the UI. No code changes needed.

## 🚢 Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

Set environment variables in Vercel Dashboard → Settings → Environment Variables.

### Netlify

```bash
npm run generate
# Deploy the .output/public directory
```

### Self-hosted (Node.js)

```bash
npm run build
node .output/server/index.mjs
```

## 🛠 Customization

### Personal Info
Edit `utils/data.ts` to update:
- Author information
- Skills and experience
- Projects
- Blog posts (if not using Strapi)

### Colors & Typography
Edit `assets/css/tailwind.css` CSS variables:
```css
:root {
  --accent: #6457e8;     /* Light mode primary */
}
.dark {
  --accent: #7b6ef6;     /* Dark mode primary */
}
```

### Fonts
Update the Google Fonts link in `nuxt.config.ts` and the font-family variables in `tailwind.config.ts`.

## 📄 License

MIT — feel free to use this as your own portfolio.
