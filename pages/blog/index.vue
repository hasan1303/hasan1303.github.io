<template>
  <div>
    <section class="pt-28 pb-24 px-6 md:px-8">
      <div class="max-w-wide mx-auto">
        <!-- Header -->
        <div class="section-label reveal">Writing</div>
        <h1 class="font-display font-extrabold tracking-tighter text-5xl md:text-6xl mb-4 reveal reveal-delay-1">
          Technical Blog
        </h1>
        <p class="text-lg mb-10 max-w-md reveal reveal-delay-2" style="color: var(--text2)">
          Deep dives, tutorials, and opinions on modern web development.
        </p>

        <!-- Search -->
        <div class="relative mb-6 reveal reveal-delay-3">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style="color: var(--text3)">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="form-input pl-10"
          >
        </div>

        <!-- Category filters -->
        <div class="flex flex-wrap gap-2 mb-10 reveal">
          <button
            key="all"
            class="px-4 py-2 rounded-full font-mono text-xs transition-all duration-200"
            :style="{
              background: activeCategory === 'all' ? 'var(--accent)' : 'transparent',
              border: `1px solid ${activeCategory === 'all' ? 'var(--accent)' : 'var(--border)'}`,
              color: activeCategory === 'all' ? '#fff' : 'var(--text2)'
            }"
            @click="activeCategory = 'all'"
          >
            All
          </button>
          <button
            v-for="cat in blogCategories"
            :key="cat.slug"
            class="px-4 py-2 rounded-full font-mono text-xs transition-all duration-200"
            :style="{
              background: activeCategory === cat.slug ? 'var(--accent)' : 'transparent',
              border: `1px solid ${activeCategory === cat.slug ? 'var(--accent)' : 'var(--border)'}`,
              color: activeCategory === cat.slug ? '#fff' : 'var(--text2)'
            }"
            @click="activeCategory = cat.slug"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Blog grid -->
        <div
          v-if="filteredPosts.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <BlogCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            class="reveal"
          />
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="text-center py-20 font-mono text-sm"
          style="color: var(--text3)"
        >
          No articles found.
          <button
            class="block mx-auto mt-3 underline text-xs"
            style="color: var(--accent2)"
            @click="searchQuery = ''; activeCategory = 'all'"
          >
            Clear filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { blogPosts, blogCategories } from '~/utils/data'

useSEO({
  title: 'Blog',
  description: 'Technical articles on Go, TypeScript, Nuxt 3, cloud architecture, and modern web development.',
})

const searchQuery = ref('')
const activeCategory = ref<string>('all')

const filteredPosts = computed(() => {
  let posts = blogPosts
  if (activeCategory.value !== 'all') {
    posts = posts.filter(p => p.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  return posts
})
</script>
