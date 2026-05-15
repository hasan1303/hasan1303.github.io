<template>
  <div v-if="post">
    <div class="reading-progress">
      <div class="reading-progress-bar" :style="{ width: `${progress}%` }" />
    </div>

    <div class="pt-24 pb-10 px-6 md:px-8" style="background: var(--surface); border-bottom: 1px solid var(--border)">
      <div class="max-w-content mx-auto">
        <NuxtLink to="/blog" class="inline-flex items-center gap-2 font-mono text-sm mb-8 transition-colors duration-200" style="color: var(--text2)">
          ← Back to Blog
        </NuxtLink>

        <div class="flex gap-2 mb-6">
          <span
            class="px-3 py-1 rounded-full font-mono text-xs"
            :style="{
              color: categoryConfig?.color,
              background: categoryConfig?.bgColor,
              border: `1px solid ${categoryConfig?.borderColor}`
            }"
          >
            {{ categoryConfig?.label }}
          </span>
        </div>

        <h1 class="font-display font-extrabold tracking-tighter leading-extra-tight mb-6" style="font-size: clamp(1.75rem, 4vw, 3rem)">
          {{ post.title }}
        </h1>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
            style="background: linear-gradient(135deg, var(--accent), var(--cyan))">
            AM
          </div>
          <div>
            <div class="font-medium text-sm">Alex Mercer</div>
            <div class="font-mono text-xs" style="color: var(--text3)">
              {{ formatDate(post.publishedAt) }} · {{ post.readTime }} min read
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-14 px-6 md:px-8">
      <article class="prose max-w-content mx-auto">
        <div class="flex flex-wrap gap-2 mb-10 not-prose">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <ContentRenderer v-if="contentDoc" :value="contentDoc" />
        <div v-else v-html="fallbackContent" />

        <div class="not-prose flex items-center justify-between gap-4 pt-10 mt-10" style="border-top: 1px solid var(--border)">
          <NuxtLink to="/blog" class="btn-secondary text-sm">← All Articles</NuxtLink>
          <button class="btn-secondary text-sm" @click="copyLink">
            {{ copied ? 'Copied! ✓' : 'Copy Link' }}
          </button>
        </div>
      </article>
    </div>
  </div>

  <div v-else class="pt-40 pb-24 px-6 text-center">
    <div class="font-mono text-6xl mb-4">404</div>
    <h1 class="font-display font-bold text-2xl mb-4">Article not found</h1>
    <NuxtLink to="/blog" class="btn-secondary">← Back to Blog</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { blogPosts, blogCategories } from '~/utils/data'

const route = useRoute()
const { progress } = useReadingProgress()

const post = computed(() => blogPosts.find(p => p.slug === route.params.slug as string))

const categoryConfig = computed(() =>
  blogCategories.find(c => c.slug === post.value?.category)
)

const { data: contentDoc } = await useAsyncData(
  `blog-${route.params.slug}`,
  () => queryContent(`/blog/${route.params.slug}`).findOne().catch(() => null)
)

const fallbackContent = computed(() => `
  <p>This article is managed through <strong>Strapi CMS</strong> or as a Markdown file in <code>content/blog/</code>.</p>
  <h2>Add your content</h2>
  <p>Create the file <code>content/blog/${route.params.slug}.md</code> with your article content, or connect Strapi CMS by setting the environment variables in <code>.env</code>.</p>
  <pre><code>---
title: ${post.value?.title || 'Your Post Title'}
slug: ${route.params.slug}
---

Your article content goes here...</code></pre>
  <blockquote>"The best documentation is the kind that actually gets written."</blockquote>
`)

const copied = ref(false)
async function copyLink() {
  if (!import.meta.client) return
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

watchEffect(() => {
  if (post.value) {
    useHead({
      title: post.value.title,
      meta: [{ name: 'description', content: post.value.excerpt }],
    })
  }
})
</script>
