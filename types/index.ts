export interface BlogPost {
  id: number | string
  slug: string
  title: string
  excerpt: string
  content?: string
  category: BlogCategory
  tags: string[]
  publishedAt: string
  updatedAt?: string
  readTime: number
  featured: boolean
  coverEmoji?: string
  coverColor?: string
  author: Author
  seo?: SEOMeta
}

export type BlogCategory = 'backend' | 'frontend' | 'devops' | 'architecture' | 'ai'

export interface BlogCategoryConfig {
  label: string
  slug: BlogCategory
  color: string
  bgColor: string
  borderColor: string
}

export interface Project {
  id: number | string
  slug: string
  name: string
  description: string
  longDescription?: string
  status: 'production' | 'open-source' | 'archived' | 'wip'
  featured: boolean
  stars?: number
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  npmUrl?: string
  coverEmoji: string
  coverGradient: string
  previewImage?: string
  period: string
  role: string
  stack: string
  highlights?: string[]
  content?: string
}

export type TechFilter = 'all' | 'go' | 'typescript' | 'python' | 'nuxt' | 'oss'

export interface Author {
  name: string
  avatar?: string
  initials: string
  title: string
  twitter?: string
  github?: string
  linkedin?: string
}

export interface ContactForm {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  firstName?: string
  email?: string
  message?: string
}

export interface SEOMeta {
  title?: string
  description?: string
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  technologies?: string[]
  current?: boolean
}

export interface Skill {
  id: string
  name: string
  description: string
  icon: string
  tags: string[]
  color?: string
}

export interface Stat {
  value: string
  label: string
}

export interface NavLink {
  label: string
  to: string
  external?: boolean
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

export interface ApiResult<T = unknown> {
  data: T | null
  error: string | null
  success: boolean
}
